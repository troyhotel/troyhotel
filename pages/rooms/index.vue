<template>
  <main class="main">
    <Hero
      title="Номера"
      subtitle="В парк-отеле «Троя» каждый номер создан для вашего удобства — <br>от стандартных до премиальных категорий"
      :showBooking="true"
      align="center"
      :images="[
        '/rooms/xxxl-slider/1.jpg',
        '/rooms/xxxl-slider/2.jpg',
        '/rooms/xxxl-slider/3.jpg',
        '/rooms/xxxl-slider/4.jpg',
        '/rooms/xxxl-slider/5.jpg',
        '/rooms/xxxl-slider/6.jpg',
      ]"
      :useSlider="true"
      :sliderDelay="5000"
    />
    <section class="comfort">
      <div class="comfort__inner">
        <h2 class="comfort__title title">Ваш комфорт в деталях</h2>

        <div class="comfort__slider-wrapper">
          <ClientOnly>
            <swiper-container
              ref="comfortRef"
              :init="false"
              class="comfort__slider"
            >
              <swiper-slide
                v-for="(item, idx) in items"
                :key="idx"
                class="comfort__slide"
              >
                <article class="comfort__item">
                  <FullscreenImage
                    class="comfort__item-image"
                    :src="item.image"
                    :alt="item.title"
                    loading="lazy"
                  />
                  <h3 class="comfort__item-title">{{ item.title }}</h3>
                  <p class="comfort__item-description">
                    {{ item.description }}
                  </p>
                </article>
              </swiper-slide>
            </swiper-container>

            <!-- Кнопки навигации -->
            <button
              class="comfort__nav comfort__nav--prev"
              @click="swiper.prev()"
              :disabled="!canGoPrevCom"
            >
              <svg class="comfort__nav-icon" aria-hidden="true">
                <use xlink:href="/svg/icons/inlineSprite.svg#arrow-left" />
              </svg>
            </button>
            <button
              class="comfort__nav comfort__nav--next"
              @click="swiper.next()"
              :disabled="!canGoNextCom"
            >
              <svg class="comfort__nav-icon" aria-hidden="true">
                <use xlink:href="/svg/icons/inlineSprite.svg#arrow-right" />
              </svg>
            </button>
          </ClientOnly>
        </div>
      </div>
    </section>
    <section class="rooms">
      <div class="container">
        <div class="rooms__inner">
          <h2 class="rooms__title title">Наши номера</h2>

          <div class="rooms__items">
            <article
              v-for="(room, idx) in rooms"
              :key="idx"
              class="rooms__item"
            >
              <div class="rooms__card">
                <div class="rooms__image-wrapper">
                  <div class="rooms__media">
                    <SwiperSlider
                      :images="
                        room.images.map((src) => ({ src, alt: room.title }))
                      "
                      @slides-count="slidesCount[idx] = $event"
                      @active-slide="activeSlide[idx] = $event"
                      ref="el => sliderRefs[idx] = el"
                    />
                  </div>
                </div>
                <div class="rooms__content"></div>
                <!-- <Button color="white" size="large" tag="button" lead-icon="play" customClass="rooms__button-play" /> -->
              </div>

              <div class="rooms__text">
                <div class="rooms__text-header">
                  <h4 class="rooms__text-title">{{ room.title }}</h4>
                  <p class="rooms__text-short">{{ room.shortDescription }}</p>
                </div>
                <span class="rooms__line"></span>
                <div class="rooms__text-body">
                  <p
                    class="rooms__text-description"
                    v-html="room.description"
                  ></p>
                </div>
              </div>

              <div class="rooms__footer">
                <div class="rooms__footer-button">
                  <Button
                    label="Подробнее"
                    color="yellow"
                    size="large"
                    tag="a"
                    :href="`/rooms/${room.slug}`"
                    customClass="rooms__text-button"
                  />
                </div>
                <p class="rooms__price">от {{ room.price }} руб</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import Button from "~/components/ui/VButton.vue";
import FullscreenImage from "~/components/FullScreenImage.vue";
import SwiperSlider from "~/components/page/SwiperSlider.vue";
import { rooms as roomsData } from "~/data/rooms";
import { roomsPageSEO } from "~/seo/rooms";

const { data: roomsImages } = await useAsyncData<Record<string, string[]>>(
  "rooms-images",
  () => $fetch("/api/rooms-images")
);

const slidesCount = ref<number[]>(roomsData.map(() => 0));
const activeSlide = ref<number[]>(roomsData.map(() => 0));
const sliderRefs = ref<any[]>([]);

const rooms = computed(() =>
  roomsData.map((room) => ({
    ...room,
    images: roomsImages.value?.[room.slug] || [],
  }))
);

const roomsRef = ref(null);
const { next, prev, activeIndex, getNumberOfSlides } = useSwiper(roomsRef, {
  slidesPerView: 1,
  spaceBetween: 15,
  // Отключаем взаимодействие пользователя
  allowTouchMove: false,
  simulateTouch: false,
  mousewheel: false,
  keyboard: false, // если нужно отключить стрелки клавиатуры
});

// const currentSlide = computed(() => activeIndex.value + 1)
// const totalSlides = computed(() => getNumberOfSlides.value)

// <div class="swiper-info">
//   Слайд {{ currentSlide }} из {{ totalSlides }}
// </div>

// const currentSlide = computed(() => activeIndex.value + 1)

// всего слайдов
const totalSlides = computed(() => getNumberOfSlides.value);
// текущий индекс
const currentIndex = computed(() => activeIndex.value);

// кнопка "назад" показывается, если не первый слайд
const canGoPrev = computed(() => currentIndex.value > 0);

// кнопка "вперед" показывается, если не последний слайд
const canGoNext = computed(() => currentIndex.value < totalSlides.value - 1);

const comfortRef = ref(null);
const slides = ref(Array.from({ length: 10 }));
const swiper = useSwiper(comfortRef, {
  effect: "slide",
  slidesPerView: 1.5,
  spaceBetween: 30,
  breakpoints: {
    1300: { slidesPerView: 3.5 },
    950: { slidesPerView: 2.5 },
    768: { slidesPerView: 1.5 },
    575: { slidesPerView: 1.2 },
    0: { slidesPerView: 1 },
  },
});

const canGoNextCom = computed(() => {
  const instance = swiper.instance.value;
  if (!instance) return false;

  const total = swiper.getNumberOfSlides.value || 0;
  const perView =
    typeof instance.params.slidesPerView === "number"
      ? instance.params.slidesPerView
      : 1;

  return instance.activeIndex < total - perView;
});

const canGoPrevCom = computed(() => swiper.activeIndex.value > 0);

onMounted(() => {
  swiper.instance?.value?.init();
});

const items = ref([
  {
    image: "/rooms/comfort/parking.svg",
    title: "Бесплатная парковка",
    description:
      "Удобно и безопасно: оставляйте автомобиль прямо на территории отеля.",
  },
  {
    image: "/rooms/comfort/wifi.svg",
    title: "Высокоскоростной Wi-Fi",
    description: "Всегда на связи, для работы и развлечений без задержек.",
  },
  {
    image: "/rooms/comfort/hotel-heart.svg",
    title: "Большие просторные номера",
    description: "Комфортно отдыхать всей семьёй или продуктивно работать.",
  },
  {
    image: "/rooms/comfort/bed.svg",
    title: "Ортопедические матрасы",
    description: "Качественный сон и полное восстановление после дня.",
  },
  {
    image: "/rooms/comfort/video-file.svg",
    title: "Круглосуточный рум-сервсис",
    description:
      "Обслуживание номеров и доставка еды из ресторана в удобное для вас время.",
  },
  {
    image: "/rooms/comfort/tree-garden.svg",
    title: "Внутренний дворик без комаров и мошек",
    description: "Отдыхайте на свежем воздухе без раздражающих насекомых.",
  },
]);

const imagesHeight = ref(0);

// Функция для установки одинаковой высоты
const updateRoomsImagesHeight = () => {
  const wrappers = document.querySelectorAll<HTMLElement>(
    ".rooms__image-wrapper"
  );
  if (!wrappers.length) return;

  // Собираем все высоты
  const heights: number[] = [];
  wrappers.forEach((wrapper) => {
    const img = wrapper.querySelector<HTMLImageElement>(".rooms__image");
    if (img) heights.push(img.offsetHeight);
  });

  if (!heights.length) return;

  // Находим “самую частую” высоту
  const counts: Record<number, number> = {};
  heights.forEach((h) => (counts[h] = (counts[h] || 0) + 1));

  let popularHeight = heights[0];
  let maxCount = 0;
  Object.entries(counts).forEach(([h, count]) => {
    if (count > maxCount) {
      maxCount = count;
      popularHeight = Number(h);
    }
  });

  imagesHeight.value = popularHeight;

  // Применяем ко всем картинкам, которые выше популярной
  wrappers.forEach((wrapper) => {
    const img = wrapper.querySelector<HTMLImageElement>(".rooms__image");
    if (img && img.offsetHeight > popularHeight) {
      wrapper.style.height = `${popularHeight}px`;
    } else {
      wrapper.style.height = "auto";
    }
  });
};

// Слушаем изменение списка комнат или загрузку изображений
watch(
  () => rooms.value,
  async () => {
    await nextTick();
    updateRoomsImagesHeight();
  },
  { deep: true }
);

// Слушаем ресайз окна
const onResize = () => {
  updateRoomsImagesHeight();
};

onMounted(() => {
  window.addEventListener("resize", onResize);
  nextTick(updateRoomsImagesHeight);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
});

useHead(roomsPageSEO);

definePageMeta({
  pageTransition: {
    name: "fade-soft",
    mode: "out-in",
    css: true,
    duration: { enter: 300, leave: 300 },
  },
});
</script>

<style scoped>
.rooms__tab-icon {
  width: 2.4rem;
  height: 2.4rem;
  stroke: #fbec78;
}

.rooms__image-wrapper {
  position: relative;
  /* нужно для абсолютных кнопок */
  width: 100%;
  height: auto;
  /* пусть высота определяется JS или изображением */
  flex-shrink: 0;
}

.rooms__media {
  position: relative;
  /* кнопки будут внутри */
  width: 100%;
  height: clamp(32rem, 29vw, 42.3rem);
}

.rooms__images-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  border: none;
  width: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.3s ease;
  height: 100%;
}

/* Левая стрелка слегка выезжает при наведении */
.rooms__images-button--left:hover {
  transform: translate(-0.5rem, -50%);
}

/* Правая стрелка слегка выезжает при наведении */
.rooms__images-button--right:hover {
  transform: translate(0.5rem, -50%);
}

/* Для мягкой анимации при клике можно добавить эффект нажатия */
.rooms__images-button:active {
  transform: translateY(-50%) scale(0.95);
}

.rooms__images-button--left {
  left: 0;
}

.rooms__images-button--right {
  right: 0;
}

.rooms__images-button.is-hidden {
  opacity: 0;
  pointer-events: none;
}

.rooms__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 45px;
  display: block;
}

.rooms__footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
}

.rooms__footer-button {
  max-width: 25rem;
  width: 100%;
}

.advantages__features-list {
  flex: 0 1 515px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.rooms__line {
  max-width: 349px;
  width: 100%;
  height: 1px;
  background: var(--noble-black-100);
  display: block;
}

.rooms {
  padding: 6rem 0;
}

.rooms__title {
  font-family: var(--second-family);
  font-weight: 500;
  line-height: 140%;
  letter-spacing: 0em;
  color: var(--noble-black-600);
  margin-bottom: 4rem;
}

.rooms__items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50rem, 1fr));
  gap: 5rem;
  align-items: start;
}

.rooms__item {
  position: relative;
  overflow: hidden;
  background: #fff;
  border-radius: 60px;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 4.5rem;
}

.rooms__card {
  display: flex;
  gap: 2rem;
  position: relative;
}

.rooms__image {
  height: auto;
  width: 100%;
  object-fit: cover;
  border-radius: 45px;
  position: relative;
  z-index: 1;
}

.rooms__image-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 45px;
  width: 100%;
}

.rooms__image-wrapper::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0) 20%
  );
  pointer-events: none;
  z-index: 1;
}

.rooms__content {
  display: flex;
  justify-content: space-between;
  flex: 1;
  position: absolute;
  bottom: 4rem;
  left: 4rem;
  right: 4rem;
  z-index: 1;
  align-items: flex-end;
  gap: 3rem;
}

.rooms__header {
}

.rooms__name {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 24px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: var(--white);
  margin-bottom: 1rem;
}

.rooms__price {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: var(--noble-black-300);
}

.rooms__button {
  background: rgba(102, 102, 102, 0.7);
  border-radius: 20px;
  padding: 15px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 18px;
  line-height: 133%;
  letter-spacing: 0.01em;
  color: var(--white);
  height: 5.4rem;
  max-width: 22.7rem;
  width: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.rooms__button-play {
  position: absolute;
  top: 4rem;
  right: 4rem;
  z-index: 1;
  width: 4.4rem !important;
  height: 4.4rem !important;
}

.rooms__text {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: var(--noble-black-600);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.rooms__text-title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 24px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: var(--noble-black-600);
  margin-bottom: 1rem;
}

.rooms__text-short {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: var(--noble-black-300);
}

.rooms__text-description {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: var(--noble-black-600);
}

.rooms__text-title,
.rooms__text-description {
  /* padding-top: 1rem;
  padding-bottom: 1rem; */
}

.rooms__text-button {
  max-width: 25rem !important;
}

@media (max-width: 1100px) {
  .rooms__items {
    grid-template-columns: 1fr;
  }

  .rooms__media {
    height: clamp(35rem, 46vw, 50.3rem);
  }
}

@media (max-width: 768px) {
  .rooms__name {
    font-size: 2.2rem;
  }

  .rooms__text-title {
    font-size: 2.2rem;
  }

  .rooms__image {
    height: 450px;
  }

  .rooms__text {
    padding: 0 0.5rem;
  }
}

@media (max-width: 620px) {
  .rooms__content > .rooms__button {
    display: none;
  }

  .rooms__name {
    font-size: 2rem;
  }

  .rooms__text-title {
    font-size: 2rem;
  }
}

@media (max-width: 575px) {
  .rooms__items {
    grid-template-columns: 1fr;
  }

  .rooms__item {
    border-radius: 4.5rem;
  }

  .rooms__image-wrapper {
    border-radius: 3.5rem;
  }

  .rooms__image {
    border-radius: 3.5rem;
  }
}

@media (max-width: 480px) {
  .rooms__item {
    padding: 1.5rem;
    gap: 2.5rem;
  }

  .rooms__name {
    font-size: 1.8rem;
  }

  .rooms__content {
    display: flex;
    justify-content: space-between;
    flex: 1;
    position: absolute;
    bottom: 2rem;
    left: 2rem;
    right: 2rem;
    z-index: 1;
    align-items: flex-end;
  }

  .rooms__button-play {
    position: absolute;
    top: 2rem;
    right: 2rem;
    z-index: 1;
    width: 4.4rem !important;
    height: 4.4rem !important;
  }

  .rooms__text-header {
    margin-top: 2rem;
  }

  .rooms__footer {
    flex-direction: column-reverse;
  }

  .rooms__text-title {
    font-size: 18px;
  }

  .rooms__button {
    font-size: 16px;
    height: 4.5rem;
    max-width: 16.7rem;
    margin-top: 1rem;
  }
}

@media (max-width: 480px) {
  .rooms__image {
    height: 390px;
  }
}

@media (max-width: 380px) {
  .rooms__image {
    height: 350px;
  }
}

/* Анимация аккордеона */
.accordion-enter-active,
.accordion-leave-active {
  transition: max-height 0.35s ease, opacity 0.35s ease;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  max-height: 500px;
  /* подбирай под самый длинный текст */
  opacity: 1;
}

.comfort {
  padding: 3rem 0 0 0;
}

.comfort__inner {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  max-width: 1480px;
  margin: 0px auto;
  padding-left: 2rem;
  height: 100%;
  width: 100%;
}

.comfort__title {
  font-family: var(--second-family);
  font-weight: 500;
  line-height: 140%;
  color: var(--noble-black-600);
}

.comfort__slider-wrapper {
  position: relative;
}

.comfort__slider {
  width: 100%;
}

.comfort__slide {
  display: flex;
  justify-content: center;
  height: auto;
  height: auto;
}

.comfort__item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-radius: 4.5rem;
  padding: 3rem;
  background: var(--white);
}

.comfort__item-image {
  border-radius: 2.5rem;
  padding: 2rem;
  width: 7.2rem;
  height: 7.2rem;
  background: #fbec78;
  margin-bottom: 3.9rem;
}

.comfort__item-title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 2.2rem;
  line-height: 160%;
  text-align: center;
  color: var(--noble-black-600);
  margin-bottom: 1.5rem;
}

.comfort__item-description {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 1.8rem;
  line-height: 200%;
  text-align: center;
  color: var(--noble-black-600);
}

.comfort__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: var(--noble-black-600);
  opacity: 0.75;
  color: #fff;
  border: none;
  font-size: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.comfort__nav:hover:not(:disabled) {
  background: var(--noble-black-600);
  opacity: 0.5;
}

.comfort__nav:disabled {
  opacity: 0;
  cursor: default;
}

.comfort__nav--prev {
  left: 10px;
}

.comfort__nav--next {
  right: 10px;
}

.comfort__nav-icon {
  width: 2.4rem;
  height: 2.4rem;
  stroke: #fbec78;
}

@media (max-width: 767.98px) {
  .comfort__item-title {
    font-size: 2rem;
  }

  .comfort__item-description {
    font-size: 1.8rem;
  }
}

@media (max-width: 420px) {
  .comfort__item {
    padding: 3rem 2rem;
  }

  .comfort__item-title {
    font-size: 1.8rem;
  }

  .comfort__item-description {
    font-size: 1.8rem;
  }
}
</style>
