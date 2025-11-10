<template>
  <section class="hero">
    <div class="container-fluid">
      <div class="hero__wrapper">
        <!-- картинка + контент -->
        <div class="hero__visual">
          <!-- Вариант без слайдера -->
          <img v-if="!useSlider" :src="currentImage" :alt="title" class="hero__image" />

          <!-- Вариант со слайдером -->
          <div v-else class="hero__slides">
            <div v-for="(img, i) in images" :key="i" :class="['hero__slide', { active: i === currentIndex }]">
              <img :src="img" :alt="title" class="hero__image" />
            </div>
          </div>


          <div class="hero__overlay">
            <div class="hero__content">
              <div class="hero__block-text">
                <div v-if="pageName" class="hero__page-name">{{ pageName }}</div>
                <h1 class="hero__title" v-html="title"></h1>
                <p class="hero__description" v-html="subtitle"></p>
                <!-- Кнопка под описанием -->
                <div v-if="showBookingButton && (buttonHref || buttonTag === 'button')"
                  :style="{ maxWidth: props.bookingButtonMaxWidth ?? '28rem', marginTop: '2rem' }"
                  class="hero__button-wrapper">
                  <Button style="min-height: 5rem;" :custom-class="'hero__cta'" :icon-class="'hero__cta-icon'"
                    :label="bookingButtonText" @click="() => handleClick()" :tag="buttonTag" :href="buttonHref"
                    target="_blank" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- iframe -->
        <div v-if="showBooking" class="hero__iframe-area">
          <div class="hero__iframe-wrapper">
            <div id="_bn_widget_" class="hero__iframe"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>






<script setup lang="ts">
import Button from '~/components/ui/VButton.vue'
import type { CSSProperties } from 'vue'
const props = defineProps<{
  title: string
  subtitle?: string
  pageName?: string
  image?: string
  images?: string[]            // <-- массив картинок для слайдера
  responsiveImages?: { src: string, maxWidth: number }[]
  useSlider?: boolean          // <-- включить слайдер
  sliderDelay?: number         // <-- задержка между сменой (мс)
  showBooking?: boolean
  showBookingButton?: boolean
  bookingButtonText?: string
  bookingButtonMaxWidth?: string
  align?: "side" | "center"
  buttonTag?: 'button' | 'a'
  buttonHref?: string | null
}>()

const emit = defineEmits<{ (e: "open-modal"): void }>()

const bookingButtonText = props.bookingButtonText ?? "Кнопка"
const buttonTag = props.buttonTag ?? "button"
const buttonHref = props.buttonHref ?? undefined
const currentImage = ref(props.image ?? '')


const sliderRef = ref<HTMLElement | null>(null)
const progress = ref(0)
let animationFrame: number
const sliderDelay = props.sliderDelay ?? 4000
const images = props.images ?? []
const useSlider = props.useSlider ?? false

const currentIndex = ref(-1); // начальное значение -1, чтобы ничего не было активным
const overlay = ref(false) // белый слой видим?
const fadeMs = 600 // длительность fade (мс), можно поменять
let timerId: number | null = null

function scheduleNext() {
  if (!useSlider || images.length <= 1) return
  if (timerId) clearTimeout(timerId)
  timerId = window.setTimeout(goNext, sliderDelay)
}

function goNext() {
  if (images.length <= 1) { scheduleNext(); return }

  const prevIndex = currentIndex.value;
  currentIndex.value = (currentIndex.value + 1) % images.length;

  // временно оставляем старый слайд поверх, чтобы он плавно исчез
  setTimeout(() => {
    // старый слайд автоматически станет невидимым через CSS transition
  }, 1000); // совпадает с transition opacity
  scheduleNext();
}

function updateResponsiveImage() {
  if (!props.responsiveImages?.length) return
  const width = window.innerWidth

  // выбираем подходящую картинку: минимальный maxWidth >= width
  const found = props.responsiveImages
    .filter(img => width <= img.maxWidth)
    .sort((a, b) => a.maxWidth - b.maxWidth)[0]

  currentImage.value = found?.src ?? props.image ?? ''
}

onMounted(() => {
  if (!useSlider || images.length <= 1) return;

  // через nextTick активируем первый слайд, чтобы сработала анимация
  nextTick(() => {
    currentIndex.value = 0;
    scheduleNext();
  });
});

onMounted(() => {
  updateResponsiveImage()
  window.addEventListener('resize', updateResponsiveImage)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateResponsiveImage)
})

onBeforeUnmount(() => {
  if (timerId) clearTimeout(timerId)
})

const handleClick = (e?: Event) => {
  if (buttonTag === 'button') {
    emit("open-modal")
  }
}

declare global {
  interface Window {
    Bnovo_Widget?: any
  }
}

const containerId = '_bn_widget_'
const scriptSrc = '//widget.reservationsteps.ru/js/bnovo.js'
const currentType = ref<string | null>(null)
const scriptLoaded = ref(false)
let resizeHandler: ((this: Window, ev: UIEvent) => any) | null = null
let scriptElement: HTMLScriptElement | null = null

function getWidgetTypeByWidth(width: number) {
  return width >= 769 ? 'horizontal' : 'vertical'
}


function debounce<F extends (...args: any[]) => void>(fn: F, ms = 200) {
  let t: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<F>) => {
    if (t) clearTimeout(t)
    t = setTimeout(() => {
      fn(...args)
      t = null
    }, ms)
  }
}

function clearContainer() {
  const el = document.getElementById(containerId)
  if (el) el.innerHTML = ''
}

function tryCloseWidget() {
  try {
    if (window.Bnovo_Widget && typeof window.Bnovo_Widget.close === 'function') {
      // если есть API для закрытия/удаления — вызываем
      window.Bnovo_Widget.close(containerId)
    } else if (window.Bnovo_Widget && typeof window.Bnovo_Widget.destroy === 'function') {
      window.Bnovo_Widget.destroy(containerId)
    } else {
      // иначе просто очищаем DOM контейнера
      clearContainer()
    }
  } catch (e) {
    // в случае ошибки — просто очистим контейнер
    clearContainer()
  }
}

function openWidget(type: string) {
  if (!window.Bnovo_Widget) return
  // сначала попробуем закрыть старый/очистить контейнер
  tryCloseWidget()
  // затем открыть новый
  try {
    window.Bnovo_Widget.open(containerId, {
      type,
      uid: "6630067e-2593-4574-b66b-1f7b6b74fdbc",
      lang: "ru",
      width: "100%",
      width_mobile: "100%",
      background: "#ffffff",
      background_mobile: "#ffffff",
      bg_alpha: "100",
      bg_alpha_mobile: "100",
      border_color_mobile: "#C6CAD3",
      padding: "15",
      padding_mobile: "15",
      border_radius: "25",
      button_font_size: "14",
      button_height: "42",
      font_type: "verdana",
      title_color: "#242742",
      title_color_mobile: "#242742",
      title_size: "22",
      title_size_mobile: "22",
      inp_color: "#242742",
      inp_bordhover: "#BBBBBB",
      inp_bordcolor: "#DDDDDD",
      inp_alpha: "10",
      btn_background: "#fbec78",
      btn_background_over: "#fbec78",
      btn_textcolor: "#1A1D21",
      btn_textover: "#1A1D21",
      btn_bordcolor: "#fbec78",
      btn_bordhover: "#fbec78",
      min_age: "0",
      max_age: "17",
      adults_default: "1",
      dates_preset: "on",
      dfrom_today: "on",
      dfrom_value: "2",
      dto_nextday: "on",
      dto_value: "2",
      cancel_color: "#fbec78",
      switch_mobiles: "on",
      switch_mobiles_width: "800",
    })
  } catch (err) {
    // На случай, если метод требует другой сигнатуры — оставим заглушку
    console.warn('Bnovo_Widget.open failed', err)
  }
}

function initOrReinitWidget() {
  const newType = getWidgetTypeByWidth(window.innerWidth)
  if (newType === currentType.value) return
  currentType.value = newType
  openWidget(newType)
}

function loadScriptOnce(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (scriptLoaded.value) return resolve()
    // если скрипт уже на странице (возможно добавлен где-то ещё) — не добавляем новый
    const existing = Array.from(document.getElementsByTagName('script')).find(s => s.src.includes('bnovo.js'))
    if (existing) {
      scriptLoaded.value = true
      // возможно скрипт уже загружен, но объект ещё не инициализирован — ждём небольшой таймаут и резолвим
      setTimeout(() => resolve(), 50)
      return
    }

    scriptElement = document.createElement('script')
    scriptElement.src = scriptSrc
    scriptElement.async = true
    scriptElement.onload = () => {
      scriptLoaded.value = true
      resolve()
    }
    scriptElement.onerror = (e) => {
      console.error('Failed to load bnovo script', e)
      reject(e)
    }
    document.body.appendChild(scriptElement)
  })
}

onMounted(async () => {
  if (!props.showBooking) return

  // создаём гарантированно контейнер (в шаблоне он есть, но на ClientOnly он присутствует в DOM)
  const el = document.getElementById(containerId)
  if (!el) {
    // если по какой-то причине контейнер ещё не появился — попробуем ждать чуть-чуть
    console.warn(`#${containerId} not found in DOM on mount`)
  }

  try {
    await loadScriptOnce()

    // если библиотека требует инициализации — вызываем init, затем open
    if (window.Bnovo_Widget && typeof window.Bnovo_Widget.init === 'function') {
      window.Bnovo_Widget.init(() => {
        initOrReinitWidget()
      })
    } else {
      // если init отсутствует — просто откроем
      initOrReinitWidget()
    }

    // слушаем изменения ширины — с дебаунсом
    resizeHandler = debounce(() => {
      // если библиотека ещё не готова — ничего не делаем
      if (!scriptLoaded.value) return
      initOrReinitWidget()
    }, 250)

    window.addEventListener('resize', resizeHandler)
    // также слушаем изменение ориентации / matchMedia (опционально)
    // можно добавить слушатель на matchMedia('max-width: 1100px') если нужно более точное поведение
  } catch (e) {
    console.error('Ошибка при инициализации виджета бронирования', e)
  }
})

onBeforeUnmount(() => {
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
    resizeHandler = null
  }
  // попробуем корректно закрыть виджет
  tryCloseWidget()
  // не удаляем script элемент, т.к. он может использоваться где-то ещё; при необходимости:
  // if (scriptElement && scriptElement.parentNode) scriptElement.parentNode.removeChild(scriptElement)
})
</script>

<style scoped>
.hero__slides {
  position: relative;
  width: 100%;
  height: clamp(500px, 40vw, 736px);
  /* или 100vh */
  overflow: hidden;
}

.hero__slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transform: scale(1.15);
  /* начальный зум */
  transition: opacity 1s ease, transform 7s ease;
  /* opacity быстрее, scale медленнее */
  z-index: 1;
}

.hero__slide.active {
  opacity: 1;
  transform: scale(1);
  /* до нормального размера */
  z-index: 2;
}

@keyframes zoomOverlay {
  0% {
    opacity: 0;
    transform: scale(1.15);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}



/* изображение */
.hero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* === БАЗА === */
.container-fluid {
  width: 100%;
  max-width: 1880px;
  padding: 0 2rem;
  margin: 0 auto;
  position: relative;
}

.hero__wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
}

.hero__visual {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 6rem;
}

.hero__iframe {
  overflow: visible;
  height: 124px;
}

.hero__image {
  width: 100%;
  height: clamp(500px, 40vw, 736px);
  object-fit: cover;
  display: block;
  border-radius: 6rem;
  filter: brightness(0.75);
  transition: height 0.3s ease transform 1.2s ease, opacity 1.2s ease;
}

/* === Зависимость от высоты экрана === */
@media (max-height: 900px) {
  .hero__slides {
    height: clamp(500px, 70vh, 736px);
  }

  .hero__image {
    height: clamp(500px, 70vh, 736px);
  }
}

@media (max-height: 700px) {
  .hero__slides {
    height: clamp(500px, 60vh, 736px);
  }

  .hero__image {
    height: clamp(500px, 60vh, 736px);
  }
}

/* === Контент === */
.hero__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 3;
  /* добавь это */
}

.hero__content {
  position: absolute;
  bottom: 100px;
  left: 60px;
  color: var(--noble-black-600);
  width: 1000px;
}

.hero__block-text {
  padding-right: 2rem;
}

.hero__page-name {
  font-family: var(--second-family);
  font-weight: 400;
  font-size: 18px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.hero__title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 64px;
  line-height: 112%;
  letter-spacing: -0.02em;
  color: var(--noble-black-0);
  margin-bottom: 15px;
}

.hero__description {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 24px;
  line-height: 142%;
  color: var(--noble-black-0);
}

/* === iframe блок === */
.hero__iframe-area {
  position: relative;
  z-index: 5;
}

.hero__iframe-wrapper {
  padding: 0 120px;
}

/* === 1440px === */
@media (max-width: 1440px) {
  .hero__content {
    width: calc(679px + (1000 - 679) * ((100vw - 768px) / (1440 - 768)));
    max-width: 1000px;
    min-width: 679px;
  }
}

/* === 1400px === */
@media (max-width: 1400px) {
  .hero__content {
    bottom: 80px;
    left: 50px;
  }

  .hero__title {
    font-size: 48px;
  }
}

@media (max-width: 1100px) {
  .hero__iframe-wrapper {
    padding: 0 90px;
  }
}

/* === 1024px === */
@media (max-width: 1024px) {
  .container-fluid {
    padding: 0 1rem;
  }

  .hero__content {
    left: 40px;
  }

  .hero__title {
    font-size: 40px;
  }

  .hero__description {
    font-size: 2.2rem;
  }

  .hero__slides {
    height: clamp(500px, 45vw, 640px);
  }

  .hero__image {
    height: clamp(500px, 45vw, 640px);
  }
}

@media (max-width: 920px) {
  .hero__iframe-wrapper {
    padding: 0 70px;
  }
}

@media (max-width: 850px) {
  .hero__iframe-wrapper {
    padding: 0 40px;
  }
}

/* === 768px === */
@media (max-width: 768px) {
  .hero__content {
    position: absolute;
    left: 30px;
    bottom: 40px;
    width: auto;
    min-width: 0;
    margin-right: 1rem;
  }

  .hero__title {
    font-size: clamp(24px, 4vw, 38px);
    word-wrap: break-word;
    line-height: 111%;
  }

  .hero__description {
    font-size: clamp(17px, 2.8vw, 20px);
    line-height: 1.4;
    word-wrap: break-word;
  }

  .hero__slides {
    height: clamp(420px, 60vw, 600px);
  }

  .hero__image {
    height: clamp(420px, 60vw, 600px);
    object-fit: cover;
  }

  /* iframe под картинкой */
  .hero__iframe-area {
    margin-top: 20px;
  }

  .hero__iframe-wrapper {
    display: block;
    width: 100%;
    padding: 0;
  }

  .hero__iframe {
    width: 100%;
    max-width: none;
    border-radius: 0;
    box-shadow: none;
    height: 316px;
  }
}




/* === ≥769px (десктоп) === */
@media (min-width: 769px) {
  .hero__iframe-area {
    margin-top: -50px;
  }

  .hero__iframe {
    width: 100%;
    max-width: 100%;
    background: #fff;
    border-radius: 25px;
  }
}

/* === 575px === */
@media (max-width: 575px) {
  .hero__image {
    border-radius: 4.5rem;
  }

  .hero__visual {
    border-radius: 4.5rem;
  }
}

/* === 480px === */
@media (max-width: 480px) {
  .hero__content {
    left: 20px;
    bottom: 40px;
  }

  .hero__title {
    font-size: 26px;
    line-height: 106%;
  }

  .hero__slides {
    height: clamp(500px, 65vw, 560px);
  }

  .hero__image {
    height: clamp(500px, 65vw, 560px);
  }
}
</style>
