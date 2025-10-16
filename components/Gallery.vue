<template>
  <section class="gallery">
    <div class="container">
      <div class="gallery__inner">
        <h2 class="gallery__title title">{{ title }}</h2>
        <div class="gallery__masonry">
          <FullscreenImage v-for="(image, i) in images" :key="i" :src="image.src" :alt="image.alt"
            class="gallery__image" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import FullscreenImage from '~/components/FullScreenImage.vue'
interface GalleryImage {
  src: string
  alt: string
}

// Props
defineProps<{
  title?: string
  images: GalleryImage[]
}>()
</script>

<style>
.gallery {}

.gallery__inner {
  display: flex;
  flex-direction: column;
  gap: 40px;
  border-radius: 60px;
  padding: 50px;
  background: var(--white);
}

.gallery__title {
  font-family: var(--second-family);
  font-weight: 500;
  line-height: 120%;
  text-align: center;
  color: var(--noble-black-600);
}

.gallery__masonry {
  columns: 3;
  /* количество колонок */
  column-gap: 20px;
}

.gallery__image {
  width: 100%;
  margin-bottom: 20px;
  border-radius: 45px;
  display: block;
  object-fit: cover;
  transition: transform 0.3s ease;
  break-inside: avoid;
  /* чтобы картинка не рвалась */
}

.gallery__image:hover {
  transform: scale(1.03);
}

@media (max-width: 1200px) {
  .gallery__inner {
    padding: 4rem;
  }
}

/* адаптив */
@media (max-width: 998px) {
  .gallery__masonry {
    columns: 2;
  }
}

@media (max-width: 575px) {
  .gallery__masonry {
    columns: 1;
  }

  .gallery__inner {
    padding: 3rem 2rem;
    border-radius: 4.5rem;
  }
}
</style>