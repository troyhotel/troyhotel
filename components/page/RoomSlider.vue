<template>
  <ClientOnly>
    <swiper-container ref="containerRef" :allow-touch-move="false" class="rooms-page__images">
      <swiper-slide v-for="(img, idx) in images" :key="idx" class="rooms-page__slide">
        <FullscreenImage :src="img.src" :alt="img.alt + ' ' + (idx + 1)" class="rooms-page__image" loading="lazy" />
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
const { next, prev, activeIndex, getNumberOfSlides } = useSwiper(containerRef, {
  slidesPerView: 1,
  spaceBetween: 15,
  allowTouchMove: false
})

watch(getNumberOfSlides, (count) => {
  if (count > 0) emit('slides-count', count)
}, { immediate: true })

watch(activeIndex, (index) => {
  emit('active-slide', index)
}, { immediate: true })

defineExpose({ next, prev }) // родитель может вызывать next/prev через ref
</script>








<style scoped>
.rooms-page__images-button {
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  backdrop-filter: brightness(0.9);
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 1;
}

.rooms-page__images-button--left {
  left: 0;
  border-radius: 4rem 0 0 4rem;
}

.rooms-page__images-button--right {
  right: 0;
  border-radius: 0 4rem 4rem 0;
}

.rooms-page__images-button.is-hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

swiper-container {
  width: 100% !important;
}

swiper-slide {
  width: 100% !important;
}

.rooms-page__images {
  width: 100%;
  position: relative;
}

.rooms-page__slide {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* растягиваем слайд */
}

.rooms-page__images {
  flex: 1 1 55%;
  /* слайдер тянется на оставшуюся часть */
  display: flex;
  justify-content: center;
  align-items: center;
}

.rooms-page__image {
  width: 100%;
  height: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 45px;
  object-fit: cover;
  position: relative;
}

.tabs__tab-icon {
  width: 2.4rem;
  height: 2.4rem;
  stroke: #fbec78;
}
</style>
