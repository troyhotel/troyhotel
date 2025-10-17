<template>
  <img :src="src" :alt="alt" @click="openFullscreen" class="cursor-zoom-in" />
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

defineProps<{
  src: string
  alt?: string
}>()

const overlay = ref<HTMLDivElement | null>(null)
const activeImg = ref<HTMLImageElement | null>(null)
let originalImg: HTMLImageElement | null = null

const calculateTargetSize = (img: HTMLImageElement) => {
  const naturalRatio = img.naturalWidth / img.naturalHeight
  const isMobile = window.innerWidth <= 1024

  let maxWidth = isMobile ? window.innerWidth * 0.9 : window.innerWidth * 0.7
  let maxHeight = isMobile ? window.innerHeight * 0.9 : window.innerHeight * 0.7

  if (isMobile) {
    maxWidth = window.innerWidth * 1
    maxHeight = window.innerHeight * 1.4
  }

  let targetWidth = maxWidth
  let targetHeight = targetWidth / naturalRatio

  if (targetHeight > maxHeight) {
    targetHeight = maxHeight
    targetWidth = targetHeight * naturalRatio
  }

  const targetTop = (window.innerHeight - targetHeight) / 2
  const targetLeft = (window.innerWidth - targetWidth) / 2

  return { width: targetWidth, height: targetHeight, top: targetTop, left: targetLeft }
}

const openFullscreen = (event: MouseEvent) => {
  const target = event.target as HTMLImageElement
  if (!target) return

  originalImg = target
  const rect = target.getBoundingClientRect()
  const originalBorderRadius = getComputedStyle(target).borderRadius || '0px'

  target.style.transition = 'opacity 0.3s ease'
  target.style.opacity = '0.2'

  const overlayEl = document.createElement('div')
  overlayEl.style.position = 'fixed'
  overlayEl.style.top = '0'
  overlayEl.style.left = '0'
  overlayEl.style.width = '100vw'
  overlayEl.style.height = '100vh'
  overlayEl.style.background = 'rgba(0,0,0,0)'
  overlayEl.style.display = 'flex'
  overlayEl.style.justifyContent = 'center'
  overlayEl.style.alignItems = 'center'
  overlayEl.style.cursor = 'zoom-out'
  overlayEl.style.zIndex = '99999'
  overlayEl.style.transition = 'background 0.3s ease'

  const img = document.createElement('img')
  img.src = target.src
  img.style.position = 'absolute'
  img.style.top = `${rect.top}px`
  img.style.left = `${rect.left}px`
  img.style.width = `${rect.width}px`
  img.style.height = `${rect.height}px`
  img.style.objectFit = 'contain'
  img.style.borderRadius = originalBorderRadius
  img.style.transition = 'all 0.4s ease, opacity 0.4s ease'

  overlayEl.appendChild(img)
  document.body.appendChild(overlayEl)

  overlay.value = overlayEl
  activeImg.value = img

  const { width, height, top, left } = calculateTargetSize(target)
  requestAnimationFrame(() => {
    overlayEl.style.background = 'rgba(0,0,0,0.5)'
    img.style.width = `${width}px`
    img.style.height = `${height}px`
    img.style.top = `${top}px`
    img.style.left = `${left}px`
  })

  // обработчик ресайза
  const handleResize = () => {
    if (!activeImg.value || !overlay.value) return
    const { width, height, top, left } = calculateTargetSize(target)
    activeImg.value.style.width = `${width}px`
    activeImg.value.style.height = `${height}px`
    activeImg.value.style.top = `${top}px`
    activeImg.value.style.left = `${left}px`
  }

  window.addEventListener('resize', handleResize)

  // ✅ исправленный блок закрытия
  overlayEl.addEventListener('click', () => {
    if (!originalImg) return

    // получаем актуальные координаты оригинала (с учётом скролла и адаптации)
    const currentRect = originalImg.getBoundingClientRect()

    overlayEl.style.background = 'rgba(0,0,0,0)'
    img.style.width = `${currentRect.width}px`
    img.style.height = `${currentRect.height}px`
    img.style.top = `${currentRect.top}px`
    img.style.left = `${currentRect.left}px`
    img.style.opacity = '0'

    if (originalImg) {
      originalImg.style.transition = 'opacity 0.6s ease'
      setTimeout(() => {
        originalImg!.style.opacity = '1'
      }, 50)
    }

    setTimeout(() => {
      overlayEl.remove()
      window.removeEventListener('resize', handleResize)
      activeImg.value = null
      overlay.value = null
    }, 400)
  })
}

onUnmounted(() => {
  if (overlay.value) overlay.value.remove()
  window.removeEventListener('resize', () => { })
})
</script>

<style scoped>
.cursor-zoom-in {
  cursor: zoom-in;
  transition: opacity 0.3s ease;
}
</style>
