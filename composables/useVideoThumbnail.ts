// composables/useVideoThumbnail.ts
import { ref } from 'vue'

export function useVideoThumbnail() {
  const thumbnail = ref<string | null>(null)
  const error = ref<string | null>(null)

  const generateThumbnail = async (videoUrl: string) => {
    return new Promise<string>((resolve, reject) => {
      const video = document.createElement('video')
      video.src = videoUrl
      video.crossOrigin = 'anonymous'
      video.preload = 'metadata'

      video.addEventListener('loadeddata', () => {
        video.currentTime = 0 // первый кадр
      })

      video.addEventListener('seeked', () => {
        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8)
          thumbnail.value = dataUrl
          resolve(dataUrl)
        } else {
          reject('Не удалось получить контекст canvas')
        }
      })

      video.addEventListener('error', (e) => {
        error.value = 'Ошибка при загрузке видео'
        reject(e)
      })
    })
  }

  return { thumbnail, error, generateThumbnail }
}
