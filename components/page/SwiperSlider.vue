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
        <button type="button" class="slider__btn slider__btn--left"
          :class="{ 'is-hidden': !hasSlides || activeIndex === 0 }" @click="() => prev()" :title="'Предыдущий слайд'"
          aria-label="Предыдущий слайд">
          <span class="slider__btn-inner">
            <svg class="slider__icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24">
              <use xlink:href="/svg/icons/inlineSprite.svg#arrow-left" />
            </svg>
          </span>
        </button>

        <button type="button" class="slider__btn slider__btn--right"
          :class="{ 'is-hidden': !hasSlides || activeIndex === slidesCount - 1 }" @click="() => next()"
          :title="'Следующий слайд'" aria-label="Следующий слайд">
          <span class="slider__btn-inner">
            <svg class="slider__icon" aria-hidden="true" focusable="false" viewBox="0 0 24 24">
              <use xlink:href="/svg/icons/inlineSprite.svg#arrow-right" />
            </svg>
          </span>
        </button>

        <!-- Точки -->
        <div v-if="slidesCount > 1" class="slider__dots">
          <button v-for="(_, idx) in slidesCount" :key="idx" class="slider__dot"
            :class="{ 'is-active': idx === activeIndex }" @click="goTo(idx)" :aria-label="`Перейти к слайду ${idx + 1}`"
            type="button" />
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import FullscreenImage from '~/components/FullScreenImage.vue'
import type { SwiperContainer } from 'swiper/element';

const props = defineProps<{
  images: Array<{ src: string; alt?: string }>
}>()

const emit = defineEmits<{
  (e: 'slides-count', count: number): void
  (e: 'active-slide', index: number): void
}>()

const containerRef = ref(null) as unknown as Ref<SwiperContainer | null>
const { next, prev, activeIndex, getNumberOfSlides, reset } = useSwiper(containerRef, {
  slidesPerView: 1,
  spaceBetween: 15,
  allowTouchMove: false,
  observer: true,              // отслеживать изменения DOM
  observeParents: true,        // отслеживать родителей
  watchSlidesProgress: true,   // следить за прогрессом слайдов
})

const slidesCount = ref(0)
const hasSlides = ref(false)

// следим за количеством
watch(getNumberOfSlides, (count) => {
  slidesCount.value = count
  hasSlides.value = count > 1
  emit('slides-count', count)
}, { immediate: true })

// следим за активным
watch(activeIndex, (index) => {
  emit('active-slide', index)
}, { immediate: true })

watch(() => props.images, (imgs) => {
  if (imgs.length) {
    reset()  // сбрасывает Swiper и пересчитывает слайды
  }
}, { immediate: true })
// переход к конкретному слайду
const goTo = (targetIdx: number) => {
  const diff = targetIdx - activeIndex.value
  if (diff > 0) for (let i = 0; i < diff; i++) next()
  else for (let i = 0; i < -diff; i++) prev()
}

defineExpose({ next, prev, activeIndex, slidesCount })
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
