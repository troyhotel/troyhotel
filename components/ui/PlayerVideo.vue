<template>
  <div class="video-player" ref="container">
    <video ref="video" class="video-player__media" :muted="muted" preload="none" webkit-playsInline playsInline
      controlslist="nodownload" :poster="poster" @click="onVideoClick">
      <source :src="src" type="video/mp4">
      <track kind="subtitles" label="Русские субтитры" srclang="ru" default>
    </video>



    <!-- Центральная кнопка Play -->
    <button v-if="!isPlaying && !hasStarted" class="video-player__play-button" @click="play"
      aria-label="Воспроизвести видео">
      <svg class="video-player__icon" aria-hidden="true">
        <use :xlink:href="'/svg/icons/inlineSprite.svg#play'" />
      </svg>
    </button>

    <div v-if="isBuffering" class="video-player__spinner">
      <svg stroke="#f5f5f5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g>
          <circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3" stroke-linecap="round">
            <animate attributeName="stroke-dasharray" dur="1.5s" calcMode="spline" values="0 150;42 150;42 150;42 150"
              keyTimes="0;0.475;0.95;1" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
              repeatCount="indefinite" />
            <animate attributeName="stroke-dashoffset" dur="1.5s" calcMode="spline" values="0;-16;-59;-59"
              keyTimes="0;0.475;0.95;1" keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
              repeatCount="indefinite" />
          </circle>
          <animateTransform attributeName="transform" type="rotate" dur="2s" values="0 12 12;360 12 12"
            repeatCount="indefinite" />
        </g>
      </svg>
    </div>

    <!-- Контролы -->
    <div
      :class="['video-player__controls', { 'video-player__controls--fullscreen': isFullscreen, 'video-player__controls--hidden': !showControls }]"
      role="group" aria-label="Управление видео">
      <div class="video-player__progress-controls-wrapper"
        :class="{ 'video-player__progress-controls-wrapper--fullscreen': isFullscreen }">
        <div class="video-player__controls-bottom">
          <!-- Play / Pause -->
          <button class="video-player__control video-player__control--playpause" @click="togglePlay"
            :aria-label="isPlaying ? 'Пауза' : 'Воспроизвести'">
            <svg class="video-player__icon" aria-hidden="true">
              <use :xlink:href="isPlaying ? '/svg/icons/inlineSprite.svg#pause' : '/svg/icons/inlineSprite.svg#play'" />
            </svg>
          </button>

          <!-- Fullscreen -->
          <button class="video-player__control video-player__control--fullscreen" @click="toggleFullScreen"
            aria-label="Полноэкранный режим">
            <svg class="video-player__icon-fulls" aria-hidden="true">
              <use
                :xlink:href="isFullscreen ? '/svg/icons/inlineSprite.svg#fullscreen-exit' : '/svg/icons/inlineSprite.svg#fullscreen'" />
            </svg>
          </button>
        </div>
        <div v-if="isFullscreen" class="video-player__progress-container" @click="seekClick($event)">
          <div class="video-player__buffered-bar" :style="{ width: bufferedPercent + '%' }"></div>
          <div class="video-player__progress-bar" :style="{ '--progress': ((currentTime / duration) * 100) + '%' }">
          </div>
        </div>

        <!-- Time -->
        <!-- Volume -->
        <div style="display: flex; gap: 0.5rem;">
          <div v-if="!isMobile" class="video-player__volume-container" @mouseenter="showVolume = true"
            @mouseleave="showVolume = false">
            <button class="video-player__control video-player__control--mute" @click="toggleMute"
              :aria-label="muted ? 'Включить звук' : 'Выключить звук'">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <!-- Динамик -->
                <path
                  d="M1.53479 10.9704C1.60847 9.76158 1.64531 9.15717 1.95854 8.57582C2.24473 8.04466 2.7923 7.52945 3.33988 7.2761C3.93921 6.99882 4.62617 6.99882 6.00008 6.99882C6.51215 6.99882 6.76819 6.99882 7.0162 6.95694C7.26138 6.91553 7.50046 6.84381 7.72795 6.74341C7.95806 6.64186 8.17181 6.50091 8.59932 6.21904L8.81825 6.07469C11.3612 4.39801 12.6327 3.55966 13.7001 3.9239C13.9047 3.99373 14.1028 4.09454 14.2797 4.21887C15.2024 4.86732 15.2725 6.37601 15.4127 9.39342C15.4646 10.5107 15.5 11.4669 15.5 11.9988C15.5 12.5307 15.4646 13.4869 15.4127 14.6042C15.2725 17.6216 15.2024 19.1303 14.2797 19.7787C14.1028 19.9031 13.9047 20.0039 13.7001 20.0737C12.6327 20.4379 11.3612 19.5996 8.81825 17.9229L8.59932 17.7786C8.17181 17.4967 7.95806 17.3557 7.72795 17.2542C7.50046 17.1538 7.26138 17.0821 7.0162 17.0407C6.76819 16.9988 6.51215 16.9988 6.00008 16.9988C4.62617 16.9988 3.93921 16.9988 3.33988 16.7215C2.7923 16.4682 2.24473 15.9529 1.95854 15.4218C1.64531 14.8404 1.60847 14.236 1.53479 13.0272C1.51299 12.6696 1.5 12.3212 1.5 11.9988C1.5 11.6764 1.51299 11.328 1.53479 10.9704Z"
                  stroke="white" stroke-width="1.5" />

                <!-- Дуга большая (самая дальняя) -->
                <path d="M20 6C20 6 21.5 7.8 21.5 12C21.5 16.2 20 18 20 18" stroke="white" stroke-width="1.5"
                  stroke-linecap="round" :opacity="volume > 0.6 ? 1 : 0" />

                <!-- Дуга маленькая (ближе к динамику) -->
                <path d="M18 9C18 9 18.5 9.9 18.5 12C18.5 14.1 18 15 18 15" stroke="white" stroke-width="1.5"
                  stroke-linecap="round" :opacity="volume > 0.3 ? 1 : 0" />
              </svg>
            </button>
            <input type="range" min="0" max="1" step="0.01" v-model="volume" @input="changeVolume"
              class="video-player__volume-slider" :class="{ 'video-player__volume-slider--visible': showVolume }"
              aria-label="Регулировка громкости" />
          </div>
          <span class="video-player__progress-time">
            {{ formatTime(currentTime) }} – {{ formatTime(duration) }}
          </span>
        </div>
      </div>
      <!-- Прогресс без бегунка -->
      <div v-if="!isFullscreen" class="video-player__progress-container" @click="seekClick($event)">
        <div class="video-player__progress-bar" :style="{ '--progress': ((currentTime / duration) * 100) + '%' }"></div>
      </div>

    </div>

  </div>

</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{ src: string, poster: string }>()

const video = ref<HTMLVideoElement | null>(null)
const container = ref<HTMLDivElement | null>(null)

const videoVisible = ref(false)

// --- состояние видео ---
const isPlaying = ref(false)
const hasStarted = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(1)
const lastVolume = ref(1)
const muted = ref(false)
const showVolume = ref(false)
const isFullscreen = ref(false)
const isMobile = ref(false)
const showControls = ref(true)
const isBuffering = ref(false)
const bufferedPercent = ref(0) // сколько % видео подгружено

const toggleControls = () => { showControls.value = !showControls.value }

const onVideoClick = () => { togglePlay(); resetControlsTimer() }

// --- Play/Pause ---
const play = async () => {
  if (!video.value) return

  try {
    await video.value.play()
    isPlaying.value = true
    hasStarted.value = true
    resetControlsTimer()
  } catch (err) {
    console.warn('iOS play blocked, retry on user gesture', err)
  }
}

const togglePlay = () => {
  if (!video.value) return

  if (video.value.paused) {
    play()
  } else {
    video.value.pause()
    isPlaying.value = false
  }

  // сбрасываем таймер после изменения состояния
  // но только если видео играет
  if (isPlaying.value) resetControlsTimer()
  else showControls.value = true // видео на паузе — контролы всегда видны
}

// --- Fullscreen ---
const toggleFullScreen = () => {
  if (!video.value || !container.value) return
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
  if (isIOS) { (video.value as any).webkitEnterFullscreen?.(); return }
  document.fullscreenElement ? document.exitFullscreen() : container.value.requestFullscreen()
}

const onFullscreenChange = () => isFullscreen.value = !!document.fullscreenElement

// --- Время и прогресс ---
const updateTime = () => {
  if (!video.value) return
  currentTime.value = video.value.currentTime
  duration.value = video.value.duration
}

const seekClick = (e: MouseEvent) => {
  if (!video.value || !duration.value) return
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  video.value.currentTime = (e.clientX - rect.left) / rect.width * duration.value
  currentTime.value = video.value.currentTime
}

const formatTime = (time: number) => {
  if (!time || isNaN(time)) return "0:00"
  const h = Math.floor(time / 3600)
  const m = Math.floor((time % 3600) / 60)
  const s = Math.floor(time % 60)
  return h > 0 ? `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}` : `${m}:${s.toString().padStart(2, '0')}`
}

const onEnded = () => { isPlaying.value = false; currentTime.value = 0 }

// --- Громкость ---
watch(volume, (val) => {
  if (!video.value) return
  video.value.volume = val
  localStorage.setItem('video-volume', val.toString())
})

const changeVolume = (e: Event) => { volume.value = Number((e.target as HTMLInputElement).value) }

const toggleMute = () => {
  if (!video.value) return
  if (!muted.value) { lastVolume.value = volume.value; volume.value = 0; video.value.muted = true }
  else { volume.value = lastVolume.value || 1; video.value.muted = false }
  muted.value = !muted.value
}

// --- Автоскрытие контролов ---
let hideControlsTimeout: ReturnType<typeof setTimeout> | null = null;

const resetControlsTimer = () => {
  // Контролы всегда видны на паузе
  if (!isPlaying.value) {
    showControls.value = true
    if (hideControlsTimeout) clearTimeout(hideControlsTimeout)
    return
  }

  // Видео играет — показываем и запускаем таймер
  showControls.value = true
  if (hideControlsTimeout) clearTimeout(hideControlsTimeout)
  hideControlsTimeout = setTimeout(() => {
    showControls.value = false
  }, 5000)
}

const onUserActivity = () => resetControlsTimer()

// --- Буферизация ---
// Буферизация
const onWaiting = () => (isBuffering.value = true)
const onCanPlay = () => (isBuffering.value = false)
const onPlaying = () => (isBuffering.value = false)
const onStalled = () => (isBuffering.value = true)

const updateBuffered = () => {
  if (!video.value || !video.value.buffered.length || !duration.value) return
  const bufferedEnd = video.value.buffered.end(video.value.buffered.length - 1)
  bufferedPercent.value = (bufferedEnd / duration.value) * 100
}

let observer: IntersectionObserver | null = null
onMounted(() => {
  // Lazy-load видео через IntersectionObserver
  observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      videoVisible.value = true
      observer?.disconnect()
      observer = null
    }
  }, { threshold: 0.25 })

  if (container.value) observer.observe(container.value)

  container.value?.addEventListener('mousemove', onUserActivity)
  container.value?.addEventListener('touchstart', onUserActivity)
  document.addEventListener('fullscreenchange', onFullscreenChange)

  // Буферизация
  watch(videoVisible, (visible) => {
    if (!visible) return
    video.value?.addEventListener('waiting', onWaiting)
    video.value?.addEventListener('canplay', onCanPlay)
    video.value?.addEventListener('playing', onPlaying)
    video.value?.addEventListener('stalled', onStalled)
    video.value?.addEventListener('progress', updateBuffered)
    video.value?.addEventListener('timeupdate', updateBuffered)
    video.value?.addEventListener('canplay', updateBuffered)
  })
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null

  container.value?.removeEventListener('mousemove', onUserActivity)
  container.value?.removeEventListener('touchstart', onUserActivity)
  if (hideControlsTimeout) clearTimeout(hideControlsTimeout)
  document.removeEventListener("fullscreenchange", onFullscreenChange)

  if (video.value) {
    video.value.removeEventListener('waiting', onWaiting)
    video.value.removeEventListener('canplay', onCanPlay)
    video.value.removeEventListener('playing', onPlaying)
    video.value.removeEventListener('stalled', onStalled)
    video.value.removeEventListener('progress', updateBuffered)
    video.value.removeEventListener('timeupdate', updateBuffered)
    video.value.removeEventListener('canplay', updateBuffered)
  }
})
</script>



<style scoped>
path {
  transition: opacity 0.2s ease;
  /* плавное появление дуг */
}

.video-player {
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background: #000;
  overflow: hidden;
  border-radius: 25px;
}

.video-player__media {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.video-player__spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: 60px;
  height: 60px;
}

.video-player__play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 10;
  border: 1px solid #fbec78;
  border-radius: 69px;
  width: 44px;
  height: 44px;
  background: #fbec78;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-player__play-button>svg {
  stroke: var(--noble-black-600);
}

.video-player__progress-controls-wrapper {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.video-player__progress-controls-wrapper--fullscreen {
  align-items: center;
  gap: 2rem;
}

.video-player__controls-bottom {
  display: flex;
  gap: 1rem;
}

.video-player__controls {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 15px 15px;
  z-index: 10;
  flex-direction: column-reverse;
  gap: 1rem;
  opacity: 1;
  transition: opacity 0.5s ease;
}

.video-player__controls--hidden {
  opacity: 0;
  pointer-events: none;
}

.video-player__controls--fullscreen {
  top: auto;
  bottom: 0;
  flex-direction: column;
}

.video-player__control {
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  white-space: nowrap;
  font-size: 14px;
  color: #fff;
  backdrop-filter: blur(10px);
  background: rgba(66, 66, 66, 0.6);
  border-radius: 8px;
  padding: 6px;
  height: 36px;
  width: 36px;
  font-family: var(--second-family);
  font-weight: 400;
  font-size: 13px;
  text-align: center;
  color: #e1e3e6;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-player__progress-container {
  position: relative;
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 3px;
  cursor: pointer;
}

.video-player__progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 3px;
  width: var(--progress, 0%);
  background: #e1e3e6;
  pointer-events: none;
}

.video-player__buffered-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  pointer-events: none;
}

.video-player__progress-time {
  white-space: nowrap;
  font-size: 14px;
  color: #fff;
  backdrop-filter: blur(10px);
  background: rgba(66, 66, 66, 0.6);
  border-radius: 8px;
  padding: 10px 13px;
  height: 36px;
  font-family: var(--second-family);
  font-weight: 400;
  font-size: 13px;
  text-align: center;
  color: #e1e3e6;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-player__volume-container {
  display: flex;
  align-items: center;
  gap: 5px;
  position: relative;
}

.video-player__volume-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 0;
  opacity: 0;
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.35);
  cursor: pointer;
  overflow: hidden;
  transition: width 0.3s ease, opacity 0.3s ease;
  /* плавность */
}

/* Активное состояние (при hover на контейнер) */
.video-player__volume-slider--visible {
  width: 80px;
  opacity: 1;
}

/* трек */
.video-player__volume-slider::-webkit-slider-runnable-track {
  height: 6px;
  background: rgba(255, 255, 255, 0.35);
}

/* бегунок */
.video-player__volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 0;
  height: 6px;
  background: #e1e3e6;
  box-shadow: -100vw 0 0 100vw #e1e3e6;
}

.video-player__volume-slider::-moz-range-thumb {
  width: 0;
  height: 6px;
  background: #e1e3e6;
  border: none;
}

.video-player__volume-slider::-moz-range-progress {
  background: #e1e3e6;
  height: 6px;
  border-radius: 3px;
}

.video-player__control--mute>svg {
  width: 2rem;
  height: 2rem;
  stroke: var(--white);
}

.video-player__icon {
  width: 2rem;
  height: 2rem;
  stroke: var(--white);
}

.video-player__icon-fulls {
  width: 2rem;
  height: 2rem;
  color: white;
}
</style>
