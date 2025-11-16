<template>
  <section class="hero">
    <div class="container-fluid">
      <div class="hero__wrapper">
        <!-- картинка + контент -->
        <div class="hero__visual">
          <!-- Вариант без слайдера -->
          <img
            v-if="!useSlider"
            :src="currentImage"
            :alt="title"
            class="hero__image"
          />

          <!-- Вариант со слайдером -->
          <div v-else class="hero__slides">
            <div
              v-for="(img, i) in images"
              :key="i"
              :class="['hero__slide', { active: i === currentIndex }]"
            >
              <img :src="img" :alt="title" class="hero__image" />
            </div>
          </div>

          <div class="hero__overlay">
            <div
              class="hero__content"
              :class="{ 'hero__content--booking': showBooking }"
            >
              <div class="hero__block-text">
                <div v-if="pageName" class="hero__page-name">
                  {{ pageName }}
                </div>
                <h1 class="hero__title" v-html="title"></h1>
                <p class="hero__description" v-html="subtitle"></p>
                <!-- Кнопка под описанием -->
                <div
                  v-if="
                    showBookingButton && (buttonHref || buttonTag === 'button')
                  "
                  :style="{
                    maxWidth: props.bookingButtonMaxWidth ?? '28rem',
                    marginTop: '2rem',
                  }"
                  class="hero__button-wrapper"
                >
                  <Button
                    style="min-height: 5rem"
                    :custom-class="'hero__cta'"
                    :icon-class="'hero__cta-icon'"
                    :label="bookingButtonText"
                    @click="() => handleClick()"
                    :tag="buttonTag"
                    :href="buttonHref"
                    target="_blank"
                  />
                </div>
              </div>
              <widget
                v-if="showBooking"
                containerId="widget_desktop"
                :minWidth="1025"
                :widgetOptions="{ type: 'horizontal' }"
                :showBooking="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import Button from "~/components/ui/VButton.vue";
import widget from "~/components/widget.vue";

const props = defineProps<{
  title: string;
  subtitle?: string;
  pageName?: string;
  image?: string;
  images?: string[];
  responsiveImages?: { src: string; maxWidth: number }[];
  useSlider?: boolean;
  sliderDelay?: number;
  showBooking?: boolean;
  showBookingButton?: boolean;
  bookingButtonText?: string;
  bookingButtonMaxWidth?: string;
  align?: "side" | "center";
  buttonTag?: "button" | "a";
  buttonHref?: string | null;
}>();

const emit = defineEmits<{ (e: "open-modal"): void }>();

const bookingButtonText = props.bookingButtonText ?? "Кнопка";
const buttonTag = props.buttonTag ?? "button";
const buttonHref = props.buttonHref ?? undefined;

const currentImage = ref(props.image ?? "");
const images = props.images ?? [];
const useSlider = props.useSlider ?? false;

const currentIndex = ref(-1);
let timerId: number | null = null;
const sliderDelay = props.sliderDelay ?? 4000;

function scheduleNext() {
  if (!useSlider || images.length <= 1) return;
  if (timerId) clearTimeout(timerId);
  timerId = window.setTimeout(goNext, sliderDelay);
}

function goNext() {
  if (images.length <= 1) {
    scheduleNext();
    return;
  }
  currentIndex.value = (currentIndex.value + 1) % images.length;
  scheduleNext();
}

function updateResponsiveImage() {
  if (!props.responsiveImages?.length) return;
  const width = window.innerWidth;
  const found = props.responsiveImages
    .filter((img) => width <= img.maxWidth)
    .sort((a, b) => a.maxWidth - b.maxWidth)[0];
  currentImage.value = found?.src ?? props.image ?? "";
}

onMounted(() => {
  if (useSlider && images.length > 1) {
    nextTick(() => {
      currentIndex.value = 0;
      scheduleNext();
    });
  }

  updateResponsiveImage();
  window.addEventListener("resize", updateResponsiveImage);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateResponsiveImage);
  if (timerId) clearTimeout(timerId);
});

const handleClick = () => {
  if (buttonTag === "button") emit("open-modal");
};
</script>

<style scoped>
.hero__slides {
  position: relative;
  width: 100%;
  height: clamp(650px, 40vw, 780px);
  /* или 100vh */
  overflow: hidden;
  border-radius: 6rem;
}

.hero__slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transform: scale(1.15);
  /* начальный зум */
  transition: opacity 1s ease, transform 7s ease;
  /* opacity быстрее, scale медленнее */
  z-index: 1;
}

.hero__slide.active {
  opacity: 1;
  transform: scale(1);
  /* до нормального размера */
  z-index: 2;
}

@keyframes zoomOverlay {
  0% {
    opacity: 0;
    transform: scale(1.15);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
#_bn_widget_ iframe {
  width: 100% !important;
}
/* изображение */
.hero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* === БАЗА === */
.container-fluid {
  width: 100%;
  max-width: 1880px;
  padding: 0 2rem;
  margin: 0 auto;
  position: relative;
}

.hero__wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
}

.hero__visual {
  position: relative;
  width: 100%;
  overflow: visible;
  border-radius: 6rem;
}

.hero__iframe {
  overflow: visible;
  height: 124px;
  border: 1px solid #dce1e6;
  box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.4);
}

.hero__image {
  width: 100%;
  height: clamp(650px, 40vw, 780px);
  object-fit: cover;
  display: block;
  border-radius: 6rem;
  filter: brightness(0.75);
  transition: height 0.3s ease transform 1.2s ease, opacity 1.2s ease;
}

/* === Зависимость от высоты экрана === */
@media (max-height: 900px) {
  .hero__slides {
    height: clamp(500px, 70vh, 736px);
  }

  .hero__image {
    height: clamp(500px, 70vh, 736px);
  }
}

@media (max-height: 700px) {
  .hero__slides {
    height: clamp(500px, 60vh, 736px);
  }

  .hero__image {
    height: clamp(500px, 60vh, 736px);
  }
}

/* === Контент === */
.hero__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 3;
  /* добавь это */
}

.hero__content {
  position: absolute;
  bottom: 100px;
  left: 60px;
  /* right: 20px; */
  color: var(--noble-black-600);
}

.hero__content--booking {
  bottom: 30px;
  left: 40px;
  right: 40px;
}

.hero__content--booking > .hero__iframe-area {
  margin-top: 2rem;
}

/* @media (min-width: 1024.01px) {
  .hero__content--booking > .hero__iframe-area {
    position: relative;
    z-index: 5;
  }

  .hero__visual > .hero__iframe-area {
    display: none;
  }
}

@media (max-width: 1023.99px) {
  .hero__content--booking > .hero__iframe-area {
    display: none;
  }

  .hero__visual > .hero__iframe-area {
    position: relative;
    z-index: 5;
  }
} */

.hero__block-text {
  /* width: 1000px; */
  padding-right: 2rem;
}

.hero__page-name {
  font-family: var(--second-family);
  font-weight: 400;
  font-size: 18px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.hero__title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 64px;
  line-height: 112%;
  letter-spacing: -0.02em;
  color: var(--noble-black-0);
  margin-bottom: 15px;
}

.hero__description {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 24px;
  line-height: 142%;
  color: var(--noble-black-0);
}

/* === iframe блок === */

.hero__iframe-wrapper {
  /* padding: 0 120px; */
}

/* === 1440px === */
@media (max-width: 1480px) {
  .hero__block-text {
    width: calc(679px + (1000 - 679) * ((100vw - 768px) / (1440 - 768)));
    max-width: 1000px;
    min-width: 679px;
  }

  .hero__slides {
    height: clamp(580px, 44vw, 650px);
  }

  .hero__image {
    height: clamp(580px, 44vw, 650px);
  }
}

/* === 1400px === */
@media (max-width: 1400px) {
  /* .hero__content {
    bottom: 80px;
    left: 50px;
  } */

  .hero__title {
    font-size: 48px;
  }
}

/* @media (max-width: 1100px) {
  .hero__iframe-wrapper {
    padding: 0 90px;
  }
} */

@media (max-width: 1250px) {
  .hero__slides {
    height: clamp(520px, 47vw, 580px);
  }

  .hero__image {
    height: clamp(520px, 47vw, 580px);
  }
}

/* === 1024px === */
@media (max-width: 1024px) {
  .container-fluid {
    padding: 0 1rem;
  }

  .hero__content {
    left: 40px;
  }

  .hero__title {
    font-size: 40px;
  }

  .hero__description {
    font-size: 2.2rem;
  }

  .hero__slides {
    height: clamp(500px, 45vw, 640px);
  }

  .hero__image {
    height: clamp(500px, 45vw, 640px);
  }

  /* iframe под картинкой */
  /* .hero__iframe-area {
    margin-top: 20px;
  }

  .hero__iframe-wrapper {
    display: block;
    width: 100%;
    padding: 0;
  }

  .hero__iframe {
    width: 100%;
    max-width: none;
    border-radius: 0;
    box-shadow: none;
    height: 316px;
    border: none;
  } */
}

/* @media (max-width: 920px) {
  .hero__iframe-wrapper {
    padding: 0 70px;
  }
} */

/* @media (max-width: 850px) {
  .hero__iframe-wrapper {
    padding: 0 40px;
  }
} */

/* === 768px === */
@media (max-width: 768px) {
  .hero__content {
    position: absolute;
    left: 30px;
    bottom: 40px;
    width: auto;
    min-width: 0;
    margin-right: 1rem;
  }

  .hero__title {
    font-size: clamp(24px, 4vw, 38px);
    word-wrap: break-word;
    line-height: 111%;
  }

  .hero__description {
    font-size: clamp(17px, 2.8vw, 20px);
    line-height: 1.4;
    word-wrap: break-word;
  }

  .hero__slides {
    height: clamp(420px, 60vw, 600px);
  }

  .hero__image {
    height: clamp(420px, 60vw, 600px);
    object-fit: cover;
  }
}

/* === ≥769px (десктоп) === */
@media (min-width: 769px) {
  /* .hero__iframe-area {
    margin-top: -50px;
  } */

  .hero__iframe {
    width: 100%;
    max-width: 100%;
    background: #fff;
    border-radius: 25px;
  }
}

/* === 575px === */
@media (max-width: 575px) {
  .hero__block-text {
    width: auto;
    max-width: none;
    min-width: auto;
    padding-right: 0;
  }

  .hero__content {
    margin-right: 0;
  }

  .hero__content--booking {
    right: 30px;
  }
  .hero__image {
    border-radius: 4.5rem;
  }

  .hero__visual {
    border-radius: 4.5rem;
  }

  .hero__slides {
    border-radius: 4.5rem;
  }
}

/* === 480px === */
@media (max-width: 480px) {
  .hero__content {
    left: 20px;
    right: 20px;
    bottom: 40px;
  }

  .hero__title {
    font-size: 26px;
    line-height: 106%;
  }

  .hero__slides {
    height: clamp(500px, 65vw, 560px);
  }

  .hero__image {
    height: clamp(500px, 65vw, 560px);
  }
}
</style>
