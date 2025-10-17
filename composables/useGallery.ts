// composables/useGallery.ts
import type { GalleryImage } from '~/components/Gallery.vue'

export async function useGallery() {
  const { data, pending, error, refresh } = await useAsyncData<GalleryImage[]>('gallery', () =>
    $fetch('/api/gallery')
  )

  // Теперь data.value — это GalleryImage[] | undefined
  const images = computed(() => data.value || [])

  return { images, pending, error, refresh }
}
