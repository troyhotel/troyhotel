<template>
  <ClientOnly>
    <swiper-container ref="containerRef" :allow-touch-move="false" class="services__slider">
      <swiper-slide v-for="(img, idx) in images" :key="idx" class="services__slide">
        <FullscreenImage :src="img.src" :alt="img.alt" class="services__image" loading="lazy" />
      </swiper-slide>
    </swiper-container>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import FullscreenImage from '~/components/FullScreenImage.vue'

const props = defineProps<{ images: Array<{ src: string; alt: string }> }>()
const emit = defineEmits<{
  (e: 'slides-count', count: number): void
  (e: 'active-slide', index: number): void
}>()

const containerRef = ref(null)

// useSwiper для управления
const { next, prev, activeIndex, getNumberOfSlides } = useSwiper(containerRef, {
  slidesPerView: 1,
  spaceBetween: 15,
})

// отправка числа слайдов
watch(getNumberOfSlides, (count) => {
  if (count > 0) emit('slides-count', count)
}, { immediate: true })

// отправка текущего слайда
watch(activeIndex, (index) => {
  emit('active-slide', index)
}, { immediate: true })

// Доступ к next/prev через ref родителя:
defineExpose({
  next, 
  prev,
  getNumberOfSlides: getNumberOfSlides.value  // сразу число слайдов
})
</script>






<style scoped>
swiper-slide {
  width: 100% !important;
  display: flex;
  align-items: center;
}

.services__image {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  border-radius: 4.5rem;
}

.services__content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.services__title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
}

.services__description {
  flex: 1;
}

.services__text {
  margin-bottom: 0.8rem;
  line-height: 1.6;
  color: #ccc;
}

.services__footer {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.services__price {
  font-weight: bold;
  color: #f0c040;
}

.services__button {
  align-self: flex-start;
  padding: 0.8rem 1.5rem;
  background: #f0c040;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s;
}

.services__button:hover {
  background: #e0b030;
}

@media (max-width: 575px) {
  .services__image {
    border-radius: 3.5rem;
  }
}
</style>
