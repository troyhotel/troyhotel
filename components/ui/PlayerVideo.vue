<template>
  <div class="video-player" ref="container">
    <video ref="video" class="video-player__media" :muted="muted" preload="metadata" webkit-playsInline
      controlslist="nodownload" playsInline poster="" @timeupdate="updateTime" @ended="onEnded">
      <source :src="src" type="video/mp4">


      <track kind="subtitles" label="Русские субтитры" srclang="ru" default>
      Ваш браузер не поддерживает видео.
    </video>

    <!-- Центральная кнопка Play -->
    <button v-if="!isPlaying && !hasStarted" class="video-player__play-button" @click="play"
      aria-label="Воспроизвести видео">
      <svg class="video-player__icon" aria-hidden="true">
        <use :xlink:href="'/svg/icons/inlineSprite.svg#play'" />
      </svg>
    </button>

    <!-- Контролы -->
    <div v-if="isPlaying || hasStarted" class="video-player__controls"
      :class="{ 'video-player__controls--fullscreen': isFullscreen }" role="group" aria-label="Управление видео">
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

          <!-- Volume -->
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
          <div class="video-player__progress-bar" :style="{ '--progress': ((currentTime / duration) * 100) + '%' }">
          </div>
        </div>
        <!-- Time -->
        <span class="video-player__progress-time">
          {{ formatTime(currentTime) }} – {{ formatTime(duration) }}
        </span>
      </div>
      <!-- Прогресс без бегунка -->
      <div v-if="!isFullscreen" class="video-player__progress-container" @click="seekClick($event)">
        <div class="video-player__progress-bar" :style="{ '--progress': ((currentTime / duration) * 100) + '%' }"></div>
      </div>

    </div>

  </div>

</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick, onBeforeUnmount } from 'vue'

const props = defineProps<{ src: string }>()

const video = ref<HTMLVideoElement | null>(null)
const container = ref<HTMLDivElement | null>(null)
const fullscreenContainer = ref<HTMLDivElement | null>(null)

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

let originalParent: HTMLElement | null = null
let originalNextSibling: ChildNode | null = null

// -----------------
// Play / Pause
// -----------------
const play = () => {
  video.value?.play()
  isPlaying.value = true
  hasStarted.value = true
}

const togglePlay = () => {
  if (!video.value) return
  if (video.value.paused) play()
  else {
    video.value.pause()
    isPlaying.value = false
  }
}

// -----------------
// Fullscreen
// -----------------

let resizeListener: (() => void) | null = null;

const toggleFullScreen = () => {
  if (!container.value || !video.value) return;

  isFullscreen.value = !isFullscreen.value;

  if (isFullscreen.value) {
    // Сохраняем исходные стили
    container.value.dataset.origStyle = container.value.getAttribute('style') || '';
    video.value.dataset.origStyle = video.value.getAttribute('style') || '';

    const applyFullScreen = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Контейнер
      container.value!.style.position = 'fixed';
      container.value!.style.top = '0';
      container.value!.style.left = '0';
      container.value!.style.width = w + 'px';
      container.value!.style.height = h + 'px';
      container.value!.style.margin = '0';
      container.value!.style.maxWidth = '100%';
      container.value!.style.zIndex = '20000';
      container.value!.style.borderRadius = '0';

      // Видео
      video.value!.style.width = w + 'px';
      video.value!.style.height = h + 'px';
      video.value!.style.objectFit = 'contain'; // полностью заполняет экран
    };

    // Применяем сразу
    applyFullScreen();

    // Перерисовываем при изменении ориентации или размера
    resizeListener = () => applyFullScreen();
    window.addEventListener('resize', resizeListener);
    window.addEventListener('orientationchange', resizeListener);

  } else {
    // Возвращаем исходные стили
    container.value.setAttribute('style', container.value.dataset.origStyle || '');
    video.value.setAttribute('style', video.value.dataset.origStyle || '');

    if (resizeListener) {
      window.removeEventListener('resize', resizeListener);
      window.removeEventListener('orientationchange', resizeListener);
      resizeListener = null;
    }
  }
};








// -----------------
// Time & Progress
// -----------------
const updateTime = () => {
  if (!video.value) return
  currentTime.value = video.value.currentTime
  duration.value = video.value.duration
}

const seekClick = (e: MouseEvent) => {
  if (!video.value || !duration.value) return
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const clickX = e.clientX - rect.left
  const percent = clickX / rect.width
  const newTime = duration.value * percent
  video.value.currentTime = newTime
  currentTime.value = newTime
}

const formatTime = (time: number) => {
  if (!time || isNaN(time)) return '0:00'
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time % 3600) / 60)
  const seconds = Math.floor(time % 60)
  if (hours > 0) return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const onEnded = () => {
  isPlaying.value = false
  currentTime.value = 0
}

// -----------------
// Volume
// -----------------
onMounted(() => {
  const savedVolume = localStorage.getItem('video-volume')
  if (savedVolume) {
    volume.value = Number(savedVolume)
    lastVolume.value = volume.value
    muted.value = volume.value === 0
  }

  const ua = navigator.userAgent
  const touch = window.matchMedia('(any-pointer: coarse)').matches
  isMobile.value = /Android|iPhone|iPad|iPod/i.test(ua) || touch

  if (video.value) duration.value = video.value.duration
})

watch(volume, (val) => {
  if (!video.value) return
  video.value.volume = val
  localStorage.setItem('video-volume', val.toString())
})

const changeVolume = (e: Event) => {
  const input = e.target as HTMLInputElement
  volume.value = Number(input.value)
}

const toggleMute = () => {
  if (!video.value) return
  if (!muted.value) {
    lastVolume.value = volume.value
    volume.value = 0
    video.value.muted = true
  } else {
    volume.value = lastVolume.value || 1
    video.value.muted = false
  }
  muted.value = !muted.value
}
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
  padding: 10px 15px;
  z-index: 10;
  flex-direction: column-reverse;
  gap: 1rem;
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
