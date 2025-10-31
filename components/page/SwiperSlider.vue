<template>
  <ClientOnly>
    <div class="slider">
      <div class="slider__wrapper">
        <swiper-container ref="containerRef" class="slider__container" :allow-touch-move="false">
          <swiper-slide v-for="(img, idx) in images" :key="idx" class="slider__slide">
            <FullscreenImage :src="img.src" :alt="img.alt + ' ' + (idx + 1)" class="slider__image" loading="lazy" />
          </swiper-slide>
        </swiper-container>

        <!-- Кнопки навигации -->
        <button v-if="!isTouchSwipe && hasSlides && activeIndex > 0" class="slider__btn slider__btn--left"
          @click="prev()" title="Предыдущий слайд" aria-label="Предыдущий слайд">
          <span class="slider__btn-inner">
            <svg class="slider__icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24">
              <use xlink:href="/svg/icons/inlineSprite.svg#arrow-left" />
            </svg>
          </span>
        </button>

        <button v-if="!isTouchSwipe && hasSlides && activeIndex < slidesCount - 1"
          class="slider__btn slider__btn--right" @click="next()" title="Следующий слайд" aria-label="Следующий слайд">
          <span class="slider__btn-inner">
            <svg class="slider__icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24">
              <use xlink:href="/svg/icons/inlineSprite.svg#arrow-right" />
            </svg>
          </span>
        </button>

        <!-- Точки -->
        <div v-if="slidesCount > 1" class="slider__dots">
          <button v-for="(_, idx) in slidesCount" :key="idx" class="slider__dot"
            :class="{ 'is-active': idx === currentIndex }" @click="goTo(idx)"
            :aria-label="`Перейти к слайду ${idx + 1}`" type="button" />
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue'
import FullscreenImage from '~/components/FullScreenImage.vue'
import type { SwiperContainer } from 'swiper/element'

const props = defineProps<{
  images: Array<{ src: string; alt?: string }>
}>()

const emit = defineEmits<{
  (e: 'slides-count', count: number): void
  (e: 'active-slide', index: number): void
}>()

const containerRef = ref<SwiperContainer | null>(null)
const screenWidth = ref(0) // начальное значение для SSR

onMounted(() => {
  screenWidth.value = window.innerWidth
  const onResize = () => (screenWidth.value = window.innerWidth)
  window.addEventListener('resize', onResize)
  onBeforeUnmount(() => window.removeEventListener('resize', onResize))
})

const isTouchSwipe = computed(() => screenWidth.value <= 1024)

const { next, prev, activeIndex, getNumberOfSlides, reset } = useSwiper(containerRef, {
  slidesPerView: 1,
  spaceBetween: 15,
  allowTouchMove: false,
  observer: true,
  observeParents: true,
  watchSlidesProgress: true,
  breakpoints: {
    0: { allowTouchMove: true },
    1025: { allowTouchMove: false }
  }
})

const slidesCount = ref(0)
const hasSlides = ref(false)

// наш источник истины для dots
const currentIndex = ref(0)

// подписываемся на изменение количества слайдов
watch(getNumberOfSlides, (count) => {
  slidesCount.value = count
  hasSlides.value = count > 1
  emit('slides-count', count)
  // если сбросили/подгрузили новые слайды — держим индекс в диапазоне
  if (currentIndex.value >= count) currentIndex.value = Math.max(0, count - 1)
}, { immediate: true })

// если useSwiper всё же обновляет activeIndex — держим currentIndex в sync
watch(activeIndex, (idx) => {
  if (typeof idx === 'number') currentIndex.value = idx
  emit('active-slide', idx)
}, { immediate: true })

// при смене props.images — ресетим слайдер
watch(() => props.images, (imgs) => {
  if (imgs.length) {
    reset()
    // сбрасываем индекс на 0, чтобы dots точно соответствовали после reset
    currentIndex.value = 0
  }
}, { immediate: true })

// подключаем обработчик slideChange нативного swiper
let swiperInstance: any = null
const onSlideChange = () => {
  // prefer realIndex если используется loop, иначе activeIndex
  const idx = swiperInstance?.realIndex ?? swiperInstance?.activeIndex ?? 0
  currentIndex.value = typeof idx === 'number' ? idx : 0
}

onMounted(() => {
  // если инстанс уже есть — подпишемся, иначе небольшая задержка пока useSwiper инициализирует
  const attach = () => {
    swiperInstance = (containerRef.value as any)?.swiper
    if (!swiperInstance) return
    swiperInstance.on?.('slideChange', onSlideChange)
    // синхронизируем начальное значение
    onSlideChange()
  }

  // попробуем сразу
  attach()
  // и ещё раз через setTimeout 0, если инициализация асинхронна
  setTimeout(attach, 0)
})

onBeforeUnmount(() => {
  if (swiperInstance?.off) swiperInstance.off('slideChange', onSlideChange)
})

// goTo — используем нативный slideTo и синхронизируем currentIndex
const goTo = (targetIdx: number) => {
  const el = containerRef.value as any
  const swiper = el?.swiper
  if (swiper?.slideTo) {
    swiper.slideTo(targetIdx)
    // slideTo может быть асинхронным — но мы заранее ставим индекс, он обновится при событии slideChange
    currentIndex.value = targetIdx
  } else {
    // fallback — используем next/prev
    const diff = targetIdx - (activeIndex as any).value
    if (diff > 0) for (let i = 0; i < diff; i++) next()
    else for (let i = 0; i < -diff; i++) prev()
  }
}

defineExpose({ next, prev, activeIndex, slidesCount, currentIndex })
</script>


<style scoped>
.slider,
.slider__wrapper,
.slider__container,
.slider__slide {
  width: 100%;
  height: 100%;
}

.slider__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 45px;
}

/* Баз */
.slider {
  position: relative;
  width: 100%;
}

.slider__wrapper {
  position: relative;
}

/* Swiper */
.slider__container {
  width: 100% !important;
}

.slider__slide {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100% !important;
}

/* Кнопки обёртка + позиционирование */
.slider__btn {
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 0 1.4rem;
  transition: opacity 0.28s ease, visibility 0.28s ease, transform 0.28s ease;
  z-index: 2;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

/* визуально мягкие границы */
.slider__btn--left {
  left: 0;
  border-radius: 4rem 0 0 4rem;
}

.slider__btn--right {
  right: 0;
  border-radius: 0 4rem 4rem 0;
}

.slider__btn.is-hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

/* Внутренняя обёртка для анимации стрелки */
.slider__btn-inner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.6rem;
  height: 3.6rem;
  /* чтобы при ховере стрелка уезжала внутри "пузырика" */
  transition: transform 0.32s cubic-bezier(.2, .9, .3, 1);
  will-change: transform;
}

/* Иконка */
.slider__icon {
  width: 2.4rem;
  height: 2.4rem;
  stroke: #fbec78;
  display: block;
  /* если нужно, можно управлять цветом через currentColor */
}

/* Ховеры — смещение стрелки в сторону клика */
/* Левая кнопка: смещаем стрелку влево при наведении */
.slider__btn--left:hover .slider__btn-inner,
.slider__btn--left:focus .slider__btn-inner {
  transform: translateX(-6px);
}

/* Правая кнопка: смещаем стрелку вправо при наведении */
.slider__btn--right:hover .slider__btn-inner,
.slider__btn--right:focus .slider__btn-inner {
  transform: translateX(6px);
}

/* При нажатии / активном состоянии слегка "вдавливаем" */
.slider__btn:active .slider__btn-inner {
  transform: translateY(1px) scale(0.99);
}

/* Точки */
.slider__dots {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.6rem;
  z-index: 10;
}

.slider__dot {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: transform 0.28s, background-color 0.28s;
}

.slider__dot.is-active {
  background-color: #fbec78;
  transform: scale(1.3);
}

/* Небольшие улучшения мобильного поведения */
@media (hover: none) {

  /* на тачах — не скрывать кнопки, но оставляем компактнее */
  .slider__btn-inner {
    transition-duration: 0.16s;
  }

  .slider__btn--left:hover .slider__btn-inner,
  .slider__btn--right:hover .slider__btn-inner {
    transform: none;
  }
}
</style>
