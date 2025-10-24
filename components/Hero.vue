<template>
  <section class="hero">
    <div class="container">
      <div class="hero__inner">

        <div class="hero__media">
          <img class="hero__image" :src="image" :alt="title" />
        </div>

        <div class="hero__content">

          <div class="hero__block-text">
            <div v-if="pageName" class="hero__page-name">{{ pageName }}</div>
            <h1 class="hero__title">{{ title }}</h1>
            <p class="hero__description">{{ subtitle }}</p>
          </div>

          <div v-if="showBooking || showBookingButton" class="hero__booking">
            <ClientOnly>
              <div v-if="showBooking" class="hero__booking-wrapper">
                <div class="hero__booking-left-wrapper">
                  <div id="_bn_widget_" class="hero__booking-left"></div>
                </div>
              </div>

              <!-- Кнопка по умолчанию -->
              <component v-else-if="showBookingButton" :is="buttonTag" :href="buttonHref" @click="handleClick"
                class="hero__booking-button">
                {{ bookingButtonText }}
              </component>

            </ClientOnly>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
  title: string
  subtitle: string
  pageName?: string
  image: string
  showBooking?: boolean
  showBookingButton?: boolean
  bookingButtonText?: string
  align?: "side" | "center"
  buttonTag?: 'button' | 'a'
  buttonHref?: string | null
}>()

const emit = defineEmits<{
  (e: "open-modal"): void
}>()

const bookingButtonText = props.bookingButtonText ?? "Кнопка"
const buttonTag = props.buttonTag ?? "button"
const buttonHref = props.buttonHref ?? null

const handleClick = (e: Event) => {
  if (buttonTag === 'button') {
    e.preventDefault()
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
  // ваша логика брейкпоинтов (можно скорректировать)
  if (width > 1100) return 'vertical'
  if (width > 900) return 'horizontal'
  return 'vertical'
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
      width_mobile: "300",
      background: "#ffffff",
      background_mobile: "#ffffff",
      bg_alpha: "100",
      bg_alpha_mobile: "100",
      border_color_mobile: "#C6CAD3",
      padding: "0",
      padding_mobile: "0",
      border_radius: "16",
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
.hero__inner {
  display: flex;
  flex-direction: row-reverse;
  align-items: stretch;
  justify-content: space-between;
  gap: 5rem;
  padding: 6rem;
  background: var(--white);
  border-radius: 6rem;
  height: 100%;
  /* max-height: 60rem; */
  box-sizing: border-box;
}

/* Контент */
.hero__content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1 1 40%;
  min-width: 0;
  justify-content: start;
}

/* Медиа (картинка) */
.hero__media {
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex: 1 1 60%;
  min-width: 0;
}

/* Картинка */
.hero__image {
  border-radius: 4rem;
  width: 100%;
  height: 100%;
  object-fit: cover;
      aspect-ratio: 4 / 2.5;
}

/* Обертка фиксирует высоту, чтобы ничего не прыгало */
.hero__booking-wrapper {
  position: relative;
  width: 100%;
  max-width: 40rem;
  min-height: 28rem;
  /* Фиксированная высота — место под iframe */
  overflow: visible;
}

/* Внутренняя обертка для стабильного позиционирования */
.hero__booking-left-wrapper {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

/* Сам блок для вставки iframe */
.hero__booking-left {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 8px;
  overflow: visible;
}


/* ===== ВЫРАВНИВАНИЕ ===== */

.hero__block-text {
  max-width: 60rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  /* margin-top: 25rem; */
}

.hero__page-name {
  font-family: var(--second-family);
  font-weight: 400;
  font-size: 1.8rem;
  line-height: 100%;
  letter-spacing: 0.20em;
  text-transform: capitalize;
  text-align: left;
  color: var(--noble-black-600);
}

.hero__title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 42px;
  line-height: 142%;
  color: var(--noble-black-600);
}

.hero__description {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 20px;
  line-height: 160%;
  color: var(--noble-black-600);
}

.hero__content--center>.hero__booking {
  margin-top: 0;
  padding-bottom: 0rem;
}

.hero__booking {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 2rem;
  width: 100%;
  /* margin-top: auto; */
  /* width: 100%;
  max-width: 100%;
    margin-top: 1.5rem; */
  /* padding-bottom: 4.4rem; */
}

.hero__booking-button {
  background-color: #FBEC78;
  color: #1A1D21;
  font-size: 18px;
  font-family: var(--second-family);
  font-weight: 500;
  border-radius: 20px;
  padding: 15px 39px;
  border: none;
  cursor: pointer;
  width: 100%;
  max-width: 22.7rem;
  display: flex;
  min-height: 5.3rem;
  justify-content: center;
  align-items: center;
}

.hero__content.hero__content--center>.hero__block-text {
  max-width: 95rem;
}


.hero__block-text {
  max-width: 60rem;
}

.hero__content.hero__content--side.hero__content--booking-left {
  justify-content: center;
}

.hero__content.hero__content--side.hero__content--booking-left>.hero__block-text {
  max-width: 60rem;
}

.hero__content.hero__content--center.hero__content--booking-bottom {
  /* justify-content: space-between; */
  align-items: center;
  /* padding-bottom: 4.4rem; */
}

.hero__content.hero__content--center.hero__content--booking-bottom>.hero__block-text {
  /* height: 100%; */
  justify-content: center;
}

@media (max-width: 1200px) {

  .hero__title {
    font-size: 4rem;
  }

  .hero__description {
    font-size: 1.8rem;
  }
}

@media (max-width: 1100px) {
  .hero__inner {
    flex-direction: column-reverse;
    align-items: center;
    text-align: center;
    padding: 4rem;
    max-height: none;
  }

  .hero__content {
    align-items: center;
    justify-content: flex-start;
    flex: 1 1 auto;
    width: 100%;
  }

  .hero__media {
    width: 100%;
    flex: 1 1 auto;
    max-height: 50vh;
  }

  .hero__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hero__booking-wrapper {
    max-width: none;
    min-height: 10rem;
  }

  .hero__page-name {
    text-align: center;
  }

  .hero__title {
    color: var(--noble-black-600);
  }

  .hero__description {
    color: var(--noble-black-600);
  }
}

@media (max-width: 1024px) {
  .hero__inner {
    padding: 3rem;
  }
}

@media (max-width: 900px) {
  .hero__booking-wrapper {
    max-width: none;
    min-height: 30rem;
  }
}

@media (max-width: 768px) {
  .hero__title {
    font-size: 3.6rem;
  }
}

@media (max-width: 575px) {
  .hero__inner {
    padding: 3rem 2rem;
    border-radius: 4.5rem;
  }

  .hero__title {
    text-align: center;
    font-size: 3rem;
  }

  .hero__description {
    text-align: center;
  }

  .hero__content {
    align-items: center;
  }

  .hero__image {
    border-radius: 4rem;
  }

  .hero__content--center.hero__content {
    gap: 3rem;
  }
}

@media (max-width: 480px) {
  .hero__title {
    font-size: 2.6rem;
  }
  .hero__image {
    aspect-ratio: 4 / 3;
  }
}

@media (max-width: 391px) {
  .hero__image {
    aspect-ratio: 4 / 3.5;
  }
}
</style>
