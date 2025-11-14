<template>
  <main class="main">
    <Hero
      title="Ваша зона комфорта начинается<br>в парк-отеле Троя"
      subtitle="В парк-отеле «Троя» каждый номер создан для вашего удобства — <br>от стандартных до премиальных категорий"
      :images="[
        '/home/home-1.jpg',
        '/home/home-2.jpg',
        '/home/home-3.jpg',
        '/home/home-4.jpg',
        '/home/home-5.jpg',
      ]"
      :showBooking="true"
      :useSlider="true"
      :sliderDelay="5000"
    />
    <section class="advantages">
      <div class="container">
        <div class="advantages__inner">
          <!-- Заголовок блока -->
          <div class="advantages__header">
            <h2 class="advantages__subtitle title">
              Почему гости выбирают нас
            </h2>
          </div>

          <!-- Список преимуществ -->
          <div class="advantages__features">
            <div class="rooms-page__media">
              <VideoPlayer :src="videoSrc" :poster="poster" />
            </div>
            <ul class="advantages__features-list">
              <li class="advantages__features-item">
                Шаговая доступность до парка «Галицкого», стадиона «Краснодар»,
                Краевой клинической больницы №1 им. проф. С. В. Очаповского
              </li>
              <li class="advantages__features-item">
                46 номеров — возможность размещения команд с организацией
                питания
              </li>
              <li class="advantages__features-item">
                СПА-комплекс и бассейн для проживающих гостей по специальному
                тарифу
              </li>
              <li class="advantages__features-item">
                Собственный ресторан «Свои люди»
              </li>
              <li class="advantages__features-item">
                Бесплатная подземная парковка
              </li>
              <li class="advantages__features-item">
                Размещение с маленькими домашними питомцами (по согласованию с
                администратором)
              </li>
            </ul>
          </div>

          <div class="advantages__ratings">
            <h3 class="advantages__ratings-title">
              Рейтинги от ведущих сервисов
            </h3>

            <div class="advantages__ratings-item-wrapper">
              <div class="advantages__rating-item">
                <h4 class="advantages__rating-name">Награды</h4>
                <div class="advantages__rating-card">
                  <img
                    class="advantages__rating-image advantages__rating-image--yandex"
                    src="/home/advantages/yandex-badge.png"
                    alt="Метка на Яндекс.Картах"
                  />
                  <div class="advantages__rating-info">
                    <p class="advantages__rating-text">Хорошее место — 2025</p>
                    <div class="advantages__rating-score">
                      <span class="advantages__rating-value">4.8</span>
                      <p
                        class="advantages__rating-description"
                        style="text-align: left"
                      >
                        Наша оценка на Яндекс.Картах
                      </p>
                    </div>
                  </div>
                </div>
                <p class="advantages__rating-description-full">
                  Парк-отель «Троя» помечен на Яндекс.Картах меткой
                  <span>«Хорошее место»</span> — знак, что гости и местные ценят
                  наше расположение и сервис. Удобно посмотреть проезд, отзывы и
                  фото прямо на карте.
                </p>
                <div class="advantages__rating-buttons">
                  <ClientOnly>
                    <Button
                      customClass="advantages__rating-button"
                      label="Перейти в Яндекс.Карты"
                      color="red"
                      size="large"
                      tag="a"
                      href="https://yandex.com/maps/org/troy/1042792426/"
                      :target="true"
                    />
                  </ClientOnly>
                </div>
              </div>

              <div class="advantages__rating-item">
                <p class="advantages__rating-text">
                  Наш парк-отель «Троя» стабильно получает высокие оценки от
                  гостей и ведущих сервисов бронирования
                </p>
                <div class="advantages__rating-card">
                  <img
                    class="advantages__rating-image advantages__rating-image--hotel"
                    src="/home/advantages/hotel-recommend.jpg"
                    alt="101 отель рекомендует"
                  />
                  <div class="advantages__rating-info">
                    <p class="advantages__rating-card-text">
                      Гости высоко ценят наше удобное расположение, уровень
                      сервиса и чистоту номеров.
                    </p>
                    <ClientOnly>
                      <Button
                        customClass="advantages__rating-button"
                        label="Подробнее о рейтингах"
                        color="red"
                        size="large"
                        tag="a"
                        :target="true"
                        href="https://101hotels.com/main/cities/krasnodar/otel_troya.html"
                      />
                    </ClientOnly>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="rooms">
      <div class="container">
        <div class="rooms__inner">
          <div class="rooms__header">
            <h2 class="rooms__title title">Номера</h2>
            <p class="rooms__description">
              Номерной фонд Парк-отеля «Троя» — это гармония классического уюта
              и продуманного комфорта. Интерьеры выполнены в мягкой, элегантной
              стилистике, где каждая деталь работает на ощущение спокойствия и
              приватности. Простор, свет и тишина — всё, чтобы вы могли
              полностью расслабиться и насладиться отдыхом без лишних
              отвлечений.
            </p>
          </div>

          <span class="rooms__line"></span>

          <Tabs
            :tabs="rooms.map((r) => ({ label: r.title }))"
            v-model:selected="selectedIndex"
          >
            <template #icon="{ isActive }">
              <svg v-if="isActive" class="tabs__tab-icon" aria-hidden="true">
                <use xlink:href="/svg/icons/inlineSprite.svg#arrow-right" />
              </svg>
            </template>

            <template
              v-for="(room, index) in rooms"
              :key="room.slug"
              #[`tab-${index}`]
            >
              <article class="rooms__content">
                <div class="rooms__media">
                  <!-- Слайдер рендерится только на активном табе -->
                  <SwiperSlider
                    ref="roomsSliderRef"
                    :images="
                      room.images.map((img, idx) => ({
                        src: img,
                        alt: room.title + ' ' + (idx + 1),
                      }))
                    "
                    @slides-count="roomsSlidesCount[selectedIndex] = $event"
                    @active-slide="roomsActiveSlide[selectedIndex] = $event"
                  />
                </div>

                <div class="rooms__details">
                  <div class="rooms__details-header">
                    <h3 class="rooms__room-title">{{ room.title }}</h3>
                    <p class="rooms__room-description">
                      {{ room.description }}
                    </p>
                  </div>

                  <dl class="room-info">
                    <div
                      v-for="roomInfo in room.roomInfo"
                      :key="roomInfo.label"
                      class="room-info__item"
                    >
                      <dt class="room-info__label">{{ roomInfo.label }}</dt>
                      <dd class="room-info__value">{{ roomInfo.value }}</dd>
                    </div>
                  </dl>

                  <div class="rooms__actions">
                    <Button
                      label="Подробнее"
                      color="yellow"
                      size="large"
                      tag="nuxt-link"
                      :href="`/rooms/${room.slug}`"
                      customClass="rooms__button"
                    />
                    <p class="rooms__price">
                      Стоимость от {{ room.price }} руб
                    </p>
                  </div>
                </div>
              </article>
            </template>
          </Tabs>
        </div>
      </div>
    </section>

    <section class="group">
      <div class="container">
        <div class="group__inner">
          <!-- Заголовок -->
          <div class="group__header">
            <h2 class="group__title title">
              Групповое размещение команд и делегаций
            </h2>
            <div class="group__content">
              <p class="group__text">
                Принимаем групповые заезды с полной организацией питания —
                идеальное решение для спортивных команд, делегаций и
                корпоративов.
              </p>

              <div class="group__footer">
                <p class="group__text">
                  Для размещения команд звоните по номеру
                  <a
                    style="
                      color: var(--noble-black-600);
                      font-size: 1.9rem;
                      font-weight: 500;
                    "
                    href="tel:+79813333443"
                    >+79813333443</a
                  >
                </p>
                <p class="group__text">или оставляйте заявку по кнопке:</p>
                <div class="group__buttons">
                  <Button
                    @click="openModal"
                    label="Оставить заявку"
                    color="yellow"
                    size="large"
                    tag="button"
                    customClass="group__button"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Изображение -->
          <!-- <div class="group__media">
            <FullscreenImage src="/home/group/group-placement.jpg" alt="Групповое размещение команд и делегаций в отеле"
              class="group__image" />
          </div> -->
        </div>
      </div>
    </section>

    <section class="infrastructure">
      <div class="container">
        <div class="infrastructure__inner">
          <header class="infrastructure__header">
            <h2 class="infrastructure__title title">Инфраструктура отеля</h2>
            <p class="infrastructure__subtitle">
              Всё для вашего комфорта — от отдыха до деловых встреч.
            </p>
          </header>

          <div class="infrastructure__list-wrapper">
            <div class="infrastructure__list">
              <article
                v-for="(item, idx) in infrastructureItems"
                :key="idx"
                class="infrastructure__item"
                :class="{ 'infrastructure__item--flip': item.flip }"
              >
                <div class="infrastructure__content">
                  <h3 class="infrastructure__item-subtitle">
                    {{ item.title }}
                  </h3>
                  <p class="infrastructure__item-text">{{ item.text }}</p>

                  <div class="infrastructure__features">
                    <p class="infrastructure__features-title">
                      {{ item.featuresTitle }}
                    </p>
                    <ul class="infrastructure__features-list">
                      <li
                        v-for="(feature, fIdx) in item.features"
                        :key="fIdx"
                        class="infrastructure__features-item"
                      >
                        {{ feature }}
                      </li>
                    </ul>
                  </div>

                  <div class="infrastructure__buttons">
                    <Button
                      customClass="infrastructure__button1"
                      label="Подробнее"
                      color="yellow"
                      size="large"
                      tag="nuxt-link"
                      :href="item.link"
                    />
                    <!-- <Button customClass="infrastructure__button2" color="black" size="large" trailIcon="play"
                      tag="button" />
                    <Button customClass="infrastructure__button3" label="Cмотреть видео" color="black" size="large"
                      trailIcon="play" tag="button" /> -->
                  </div>
                </div>

                <div class="infrastructure__media">
                  <img
                    :src="item.image"
                    alt=""
                    class="infrastructure__image-full"
                  />
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>

    <gallery v-if="images" title="Галерея" :images="images" />

    <section class="special-offers">
      <div class="container">
        <div class="special-offers__inner">
          <header class="special-offers__header">
            <h2 class="special-offers__title title">
              Специальные предложения — отдых с привилегиями
            </h2>
            <p class="special-offers__description">
              Выбирайте акции, которые сделают ваш отдых ещё приятнее.
              Бронируйте с выгодой, получайте бонусы и наслаждайтесь отдыхом без
              лишних затрат.
            </p>
          </header>

          <div class="special-offers__items">
            <article class="special-offers__item">
              <div class="special-offers__media">
                <img
                  src="/home/special-offers/1.jpg"
                  alt="Специальное предложение"
                  class="special-offers__image"
                />

                <div class="special-offers__content">
                  <h3 class="special-offers__label">
                    10% скидка при длительном проживании (от 10 дней)
                  </h3>
                  <p class="special-offers__subtitle">
                    Для тех, кто остаётся подольше — приятный бонус
                  </p>
                  <p class="special-offers__text">
                    Бронируете от 10 дней? Забронируйте с предоплатой и получите
                    скидку 10%. Идеально для рабочих поездок и неспешного
                    отдыха.
                  </p>
                  <!-- <Button label="Подробнее" color="yellow" size="large" tag="nuxt-link" href="/spa"
                      customClass="special-offers__button" /> -->
                </div>
              </div>
            </article>
            <article class="special-offers__item">
              <div class="special-offers__media">
                <img
                  src="/home/special-offers/2.jpg"
                  alt="Специальное предложение"
                  class="special-offers__image"
                />
                <div class="special-offers__content">
                  <h3 class="special-offers__label">Акция для молодожёнов</h3>
                  <p class="special-offers__subtitle">
                    Номер в подарок и скидка для гостей
                  </p>
                  <p class="special-offers__text">
                    Номер для молодожёнов и скидка для гостей банкета на
                    заселение в отель – 10 % при бронировании банкетного зала и
                    соблюдении условий
                  </p>
                  <!-- <Button label="Подробнее" color="yellow" size="large" tag="nuxt-link" href="/spa"
                      customClass="special-offers__button" /> -->
                </div>
              </div>
            </article>
            <article class="special-offers__item">
              <div class="special-offers__media">
                <img
                  src="/home/special-offers/3.jpg"
                  alt="Специальное предложение"
                  class="special-offers__image"
                />

                <div class="special-offers__content">
                  <h3 class="special-offers__label">
                    Скидка для гостей отеля на посещение СПА-комплекса
                  </h3>
                  <p class="special-offers__subtitle">
                    Полный релакс - за меньшую стоимость
                  </p>
                  <p class="special-offers__text">
                    Подарите себе отдых и восстановление сил. Идеально после
                    дороги или для завершения дня.
                  </p>
                  <!-- <Button label="Подробнее" color="yellow" size="large" tag="nuxt-link" href="/spa"
                      customClass="special-offers__button" /> -->
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
    <section class="contacts">
      <div class="container">
        <div class="contacts__inner">
          <header class="contacts__header">
            <h2 class="contacts__title title">Контакты</h2>
          </header>

          <div class="contacts__info">
            <div class="contacts__item">
              <h3 class="contacts__item-title">Телефон</h3>
              <p class="contacts__item-text">
                <a href="tel:+79813333443" class="contacts__link"
                  >+7 (981) 333-34-43</a
                >
              </p>
            </div>

            <div class="contacts__item">
              <h3 class="contacts__item-title">Электронная почта</h3>
              <p class="contacts__item-text">
                <a href="mailto:info@troy-hotel.ru" class="contacts__link"
                  >info@troy-hotel.ru</a
                >
              </p>
            </div>

            <div class="contacts__item">
              <h3 class="contacts__item-title">Адрес</h3>
              <address class="contacts__item-text">
                Краснодар, ул. 1 Мая, 131
              </address>
            </div>
          </div>

          <div>
            <iframe
              class="contacts__map"
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A40774ff6fcdfb5ed2c42780bc2cf47cd447f1ba4f73c11a5d234fa41b82c890f&amp;source=constructor"
              width="100%"
              height="699"
              frameborder="0"
              title="Карта расположения Парк-отеля «Троя»"
            ></iframe>
          </div>
        </div>
      </div>
    </section>

    <ModalFeedback
      v-model:show="isModalOpen"
      title="Хотите расчитать стоимость размещения команды?"
      subtitle="Оставьте контакты и мы свяжемся с вами для расчета"
      @submit="handleSubmit"
    />
  </main>
</template>

<script lang="ts" setup>
import gallery from "~/components/Gallery.vue";
import Button from "~/components/ui/VButton.vue";
import Tabs from "~/components/Tabs.vue";
import SwiperSlider from "~/components/page/SwiperSlider.vue";
import FullscreenImage from "~/components/FullScreenImage.vue";
import { rooms as roomsData } from "~/data/rooms";
import ModalFeedback from "~/components/ModalFeedback.vue";
import { useGallery } from "~/composables/useGallery";
import { seo } from "~/seo/index";
import VideoPlayer from "~/components/ui/PlayerVideo.vue";

const videoSrc = "/home/IMG_5988.MP4";
const poster = "/home/preview-video.webp";

const { images } = await useGallery();

const isModalOpen = ref(false);
const advantagesSliderRef = ref<InstanceType<typeof SwiperSlider> | null>(null);
const advantagesSlidesCount = ref(0);
const advantagesActiveSlide = ref(0);

const openModal = () => {
  isModalOpen.value = true;
};

const { data: advantagesImages } = await useAsyncData("advantages-images", () =>
  $fetch("/api/advantages-images")
);

const handleSubmit = async (data: {
  name: string;
  phone: string;
  question?: string;
}) => {
  const res = await $fetch("/api/mail", {
    method: "POST",
    body: {
      type: "groupBooking",
      form: data,
    },
  });

  console.log("Ответ сервера:", res);
};

const { data: roomsImages } = await useAsyncData("rooms-images", () =>
  $fetch("/api/rooms-images")
);

const roomsImagesLoaded = computed(() => !!roomsImages.value);

const rooms = computed(() =>
  roomsData.map((room) => ({
    ...room,
    images: roomsImages.value?.[room.slug] || [],
  }))
);

const selectedIndex = ref(0);
const roomsSliderRef = ref<
  (InstanceType<typeof SwiperSlider> & { update?: () => void }) | null
>(null);
const roomsSlidesCount = ref<number[]>(roomsData.map(() => 0));
const roomsActiveSlide = ref<number[]>(roomsData.map(() => 0));

// обновление Swiper после смены таба
watch(selectedIndex, async () => {
  await nextTick();
  roomsSliderRef.value?.update?.();
});

const infrastructureRef = ref(null);
const slides = ref(Array.from({ length: 10 }));
const swiper = useSwiper(infrastructureRef, {
  effect: "slide",
  slidesPerView: 2.5,
  spaceBetween: 20,
  breakpoints: {
    998: {
      slidesPerView: 1.7,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 1.4,
      spaceBetween: 20,
    },
    600: {
      slidesPerView: 1.2,
      spaceBetween: 20,
    },
    575: {
      slidesPerView: 1.1,
      spaceBetween: 20,
    },
    0: {
      slidesPerView: 1.05,
      spaceBetween: 0,
    },
  },
});

onMounted(() => {
  console.log(swiper.instance);
});

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

// вычисляем массив изображений для активного таба
const currentRoomImages = computed(() => {
  return rooms.value[selectedIndex.value]?.images || [];
});

// общее количество слайдов для активного таба
const totalSlides = computed(() => currentRoomImages.value.length);

// кнопка "назад" показывается, если больше 1 слайда и текущий индекс > 0
const canGoPrev = computed(
  () => totalSlides.value > 1 && activeIndex.value > 0
);

// кнопка "вперед" показывается, если больше 1 слайда и текущий индекс < последний
const canGoNext = computed(
  () => totalSlides.value > 1 && activeIndex.value < totalSlides.value - 1
);

interface InfrastructureItem {
  title: string;
  text: string;
  featuresTitle: string;
  features: string[];
  image: string;
  flip: boolean;
  link: string;
  mobileImage?: string; // опционально
}

const infrastructureItems = ref<InfrastructureItem[]>([
  {
    title: "Банкеты и мероприятия",
    text: "Ресторан «Свои люди» предлагает готовое решение — организация вашего мероприятия под ключ в наших красивых и просторных залах.",
    featuresTitle: "Возможности:",
    features: [
      "Вместимость до 80 гостей",
      "Индивидуальное меню",
      "Организация выездной регистрации",
      "Оборудование и декор",
      "Мероприятие под ключ",
    ],
    image: "/home/infrastructure/infrastructure-1.jpg",
    flip: false,
    link: "/banquet",
  },
  {
    title: "Ресторан «СВОИ ЛЮДИ»",
    text: "Европейская и кавказская кухня, круглосуточное обслуживание и летняя терраса.",
    featuresTitle: "Что вас ждёт:",
    features: [
      "Индивидуальное и банкетное меню",
      "Завтраки и обслуживание номеров",
      "Просторный зал и уютная веранда",
    ],
    image: "/home/infrastructure/infrastructure-3.png",
    flip: true,
    link: "/restaurant",
  },
  {
    title: "Спа-комплекс и отдых",
    text: "Полноценный отдых в уютной спа-зоне с сауной, джакузи и бассейном — отличное завершение дня.",
    featuresTitle: "В спа-комплексе:",
    features: [
      "Финская сауна, бассейн, зона для отдыха",
      "Турецкий хамам, джакузи, инфракрасная кабина",
      "Массажи, обёртывания и spa-программы",
    ],
    image: "/home/infrastructure/infrastructure-4.jpg",
    flip: false,
    link: "/spa",
  },
]);

const width = ref(0);

onMounted(() => {
  // только на клиенте window доступен
  width.value = window.innerWidth;

  const handleResize = () => {
    width.value = window.innerWidth;
  };

  window.addEventListener("resize", handleResize);

  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
  });
});

// watch ширины окна, чтобы менять картинку
watch(
  width,
  (w) => {
    const first = infrastructureItems.value[0];
    if (first.mobileImage) {
      first.image =
        w <= 675
          ? first.mobileImage
          : "/home/infrastructure/infrastructure-1.png";
    }
  },
  { immediate: true }
);

useHead(seo);

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
swiper-container {
  width: 100% !important;
}

swiper-slide {
  width: 100% !important;
}

.rooms-page__images-button {
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
.rooms-page__images-button--left:hover {
  transform: translate(-0.5rem, -50%);
}

/* Правая стрелка слегка выезжает при наведении */
.rooms-page__images-button--right:hover {
  transform: translate(0.5rem, -50%);
}

/* Для мягкой анимации при клике можно добавить эффект нажатия */
.rooms-page__images-button:active {
  transform: translateY(-50%) scale(0.95);
}

.rooms-page__images-button--left {
  left: 0;
}

.rooms-page__images-button--right {
  right: 0;
}

.rooms-page__images-button.is-hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.rooms-page__media {
  flex: 0 1 754px;
  max-width: 100%;
  height: 475px;
  position: relative;
  display: flex;
}

.rooms-page__images {
  width: 100%;
  height: 100%;
}

.rooms-page__btn-icon {
  width: 2.4rem;
  height: 2.4rem;
  stroke: #fbec78;
}

.rooms-page__slide,
.rooms-page__slide img,
.rooms-page__slide .rooms-page__image {
  width: 100% !important;
  max-height: 475px;
  object-fit: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 45px;
  height: 100%;
  aspect-ratio: 4 / 3.2;
}

.advantages__features-list {
  flex: 0 1 515px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.advantages {
}

.advantages__inner {
  border-radius: 60px;
  padding: 50px;
  background: var(--white);
  display: flex;
  flex-direction: column;
  gap: 5rem;
}

/* Заголовок блока */
.advantages__header {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.advantages__title {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 120%;
  letter-spacing: 0.2em;
  text-align: center;
  color: #7e7e7e;
}

.advantages__subtitle {
  font-family: var(--second-family);
  font-weight: 500;
  line-height: 120%;
  text-align: center;
  color: #1c1c1c;
}

/* Список преимуществ */
.advantages__features {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4%;
}

.advantages__features-title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 3.2rem;
  line-height: 140%;
  color: var(--noble-black-600);
  flex: 1 1 35%;
  max-width: 37rem;
}

.advantages__features-item {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  color: var(--noble-black-600);
  padding-left: 2.4rem;
  border-left: 1px solid #ffe200;
}

/* Рейтинги и награды */
.advantages__ratings {
  display: flex;
  flex-direction: column;
  gap: 5rem;
}

.advantages__ratings-title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 24px;
  line-height: 140%;
  text-align: center;
  color: var(--noble-black-600);
}

.advantages__ratings-item-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 0px 70px;
  gap: 10rem;
  flex-wrap: wrap;
}

.advantages__rating-item {
  display: flex;
  flex-direction: column;
  flex: 1 1 20%;
}

.advantages__rating-item:first-child {
  /* max-width: 40.4rem; */
  gap: 3rem;
}

.advantages__rating-item:last-child {
  /* max-width: 56.9rem; */
  gap: 9rem;
}

.advantages__rating-name {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 21px;
  line-height: 140%;
  color: #000;
}

.advantages__rating-card {
  display: flex;
  gap: 2.4rem;
  align-items: center;
}

.advantages__rating-image--yandex {
  width: 9.6rem;
  height: 5.5rem;
}

.advantages__rating-image--hotel {
  border-radius: 1.5rem;
  width: 15rem;
  height: 15rem;
}

.advantages__rating-info {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 24px;
  line-height: 140%;
  color: #000;
}

.advantages__rating-text {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 20px;
  line-height: 140%;
  color: #000;
}

.advantages__rating-score {
  display: flex;
  gap: 2.5rem;
  align-items: center;
}

.advantages__rating-value {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 60px;
  line-height: 100%;
  text-align: right;
  color: var(--noble-black-600);
}

.advantages__rating-description {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 130%;
  color: var(--noble-black-600);
  opacity: 0.65;
  max-width: 14.1rem;
}

.advantages__rating-description-full {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  color: var(--noble-black-600);
}

.advantages__rating-description-full > span {
  font-weight: 500;
}

.advantages__rating-card-text {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  color: var(--noble-black-600);
  margin-bottom: 3rem;
}

.advantages__rating-buttons {
  width: 100%;
  display: flex;
}

.advantages__rating-button {
  max-width: 28rem !important;
  white-space: nowrap;
}

@media (max-width: 1366px) {
  .advantages__rating-item:last-child {
    gap: 4rem;
  }

  .advantages__ratings-item-wrapper {
    gap: 7rem;
    padding: 0px 40px;
  }
}

@media (max-width: 1200px) {
  .advantages__inner {
    padding: 4rem;
  }

  .advantages__features {
    padding: 0;
    gap: 5rem;
    flex-direction: column;
  }

  .advantages__features-list {
    flex: none;
  }

  .rooms-page__media {
    flex: none;
    height: 520px;
  }

  /* .advantages__features {
    padding: 0 40px;
  } */

  /* .advantages__features-title {
    flex: 1 1 20%;
  }

  .advantages__features-list {
    flex: 1 1 40%;
  } */
}

@media (max-width: 1130px) {
  .advantages__ratings-item-wrapper {
    flex-direction: column;
    flex-wrap: nowrap;
  }

  .advantages__rating-item {
    flex: 1;
  }
}

@media (max-width: 1024px) {
  .advantages__ratings-item-wrapper {
    padding: 0;
  }
}

@media (max-width: 920px) {
  .advantages__header {
    margin-bottom: 2rem;
  }

  .advantages__features {
    flex-direction: column;
    align-items: normal;
  }

  .advantages__features-title {
    flex: 1 1 0;
  }

  .advantages__features-list {
    flex: 1 1 0;
    max-width: none;
  }
}

@media (max-width: 768px) {
  .advantages__features-title {
    font-size: 2.7rem;
  }

  .rooms-page__slide,
  .rooms-page__slide img,
  .rooms-page__slide .rooms-page__image {
    max-height: 440px;
  }

  .rooms-page__media {
    max-height: 440px;
  }
}

@media (max-width: 675px) {
  .advantages__rating-item {
    align-items: center;
  }

  .advantages__rating-card {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 575px) {
  .advantages__inner {
    padding: 3rem 2rem;
    gap: 3.5rem;
    border-radius: 45px;
  }

  .advantages__features {
    gap: 4rem;
  }

  .advantages__features-title {
    font-size: 2.4rem;
  }

  .advantages__features-item {
    font-size: 1.7rem;
  }

  .advantages__ratings-title {
    font-size: 2.2rem;
  }
}

@media (max-width: 480px) {
  .advantages__features-title {
    font-size: 2rem;
  }

  .advantages__ratings-title {
    font-size: 2rem;
  }

  .advantages__rating-name {
    font-size: 1.9rem;
  }

  .advantages__rating-text {
    font-size: 1.8rem;
  }

  .advantages__rating-value {
    font-size: 5rem;
  }

  .advantages__rating-buttons {
    justify-content: center;
  }

  .advantages__rating-info {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 380px) {
  .rooms-page__slide,
  .rooms-page__slide img,
  .rooms-page__slide .rooms-page__image {
    max-height: 380px;
  }

  .rooms-page__media {
    max-height: 380px;
  }
}

.infrastructure {
  margin-top: 3rem;
  overflow: hidden;
}

.infrastructure__inner {
  display: flex;
  flex-direction: column;
  gap: 5rem;
}

.infrastructure__header {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.infrastructure__title {
  font-family: var(--second-family);
  font-weight: 500;
  line-height: 120%;
  text-align: center;
  color: #1c1c1c;
}

.infrastructure__subtitle {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  text-align: center;
  color: #1c1c1c;
}

.infrastructure__list {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.infrastructure__item {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 5rem;
  flex-wrap: wrap;
  background: var(--white);
  padding: 6rem;
  /* box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1); */
  background: var(--noble-black-0);
  border-radius: 60px;
}

.infrastructure__item--flip {
  flex-direction: row-reverse;
}

.infrastructure__content {
  flex: 1 1 35%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
}

.infrastructure__media {
  flex: 1 1 55%;
  min-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.infrastructure__item-title {
  font-family: var(--second-family);
  font-weight: 400;
  font-size: 16px;
  line-height: 112%;
  letter-spacing: 0.2em;
  text-transform: capitalize;
  color: var(--noble-black-600);
  margin-bottom: 1.3rem;
}

.infrastructure__item-subtitle {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 24px;
  line-height: 140%;
  color: var(--noble-black-600);
  margin-bottom: 1.3rem;
  /* text-transform: uppercase; */
  /* background-color: #fbec78;
  display: inline-block;
  align-self: baseline;
  padding: 0.1em 0.3em;
  border-radius: 0.5rem; */
}

.infrastructure__item-text {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  color: var(--noble-black-300);
  margin-bottom: 2rem;
}

.infrastructure__features {
  margin-bottom: 4rem;
}

.infrastructure__features-title {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  color: var(--noble-black-600);
  margin-bottom: 2rem;
}

.infrastructure__features-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.infrastructure__features-item {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  color: var(--noble-black-600);
  border-left: 1px solid #ffcc00;
  padding: 5px 0 5px 20px;
}

.infrastructure__buttons {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  max-width: 27rem;
}

.infrastructure__button1 {
  max-width: 28rem !important;
}

.infrastructure__button2 {
  width: 5.5rem !important;
  height: 5.5rem !important;
  border-radius: 1.5rem !important;
  max-width: 28rem !important;
}

.infrastructure__media {
  display: flex;
  justify-content: center;
  align-items: center;
}

.infrastructure__image-full {
  width: 100%;
  height: auto;
  border-radius: 6rem;
  object-fit: cover;
  aspect-ratio: 4 / 3;
}

.infrastructure__slider {
  width: 100%;
  display: none;
}

.infrastructure__slide {
  display: flex;
  justify-content: center;
}

@media (max-width: 1366px) {
  /* .infrastructure__inner {
    padding: 50px 70px;
  } */

  .infrastructure__item {
    gap: 5rem;
  }
}

/* @media (max-width: 1200px) {
  .infrastructure__inner {
    padding: 50px;
  }
} */

@media (max-width: 1200px) {
  .infrastructure__inner {
    /* padding: 0;
    background: transparent; */
    gap: 4rem;
    /* padding: 3rem; */
  }

  .infrastructure__item {
    flex-direction: column;
    flex-wrap: nowrap;
    background: var(--white);
    padding: 4rem 3rem;
    box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
    background: var(--noble-black-0);
    border-radius: 60px;
  }

  .infrastructure__item--flip {
    flex-direction: column;
  }

  .infrastructure__content {
    flex: none;
  }

  .infrastructure__media {
    flex: none;
    min-width: auto;
  }
}

@media (max-width: 768px) {
  .infrastructure__inner {
    /* padding: 0;
    background: transparent; */
    /* gap: 4rem; */
    /* padding: 3rem 2rem; */
  }
}

@media (max-width: 575px) {
  .advantages__inner {
    border-radius: 45px;
  }

  .infrastructure__item-subtitle {
    font-size: 2.2rem;
  }

  .infrastructure__image-full {
    border-radius: 4.5rem;
  }
}

@media (min-width: 481px) {
  .infrastructure__button3 {
    display: none;
  }
}

@media (max-width: 480px) {
  .infrastructure__slider {
    display: none;
  }

  .infrastructure__content {
    min-width: auto;
  }

  .infrastructure__buttons {
    align-items: flex-start;
    flex-direction: column;
  }

  .infrastructure__button2 {
    display: none;
  }

  .infrastructure__button3 {
    max-width: 25rem !important;
  }

  .infrastructure__inner {
    border-radius: 0;
    background: transparent;
    padding: 0;
    /* gap: 7rem; */
  }

  .infrastructure__item {
    padding: 3rem 2rem;
    border-radius: 45px;
    margin: 0;
  }

  .infrastructure__item-subtitle {
    font-size: 2rem;
  }
}

.group {
}

.group__inner {
  border-radius: 60px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 6rem;
  background-color: var(--white);
}

.group__header {
  padding: 0px 40px 0px 40px;
  display: flex;
  gap: 10rem;
  justify-content: space-between;
  align-items: center;
}

.group__title {
  font-family: var(--second-family);
  font-weight: 500;
  line-height: 140%;
  color: var(--noble-black-600);
  flex: 1 1 35%;
}

.group__content {
  border-radius: 30px;
  padding: 20px 25px;
  background: #f5f5f5;
  flex: 1 1 47%;
}

.group__text {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  color: var(--noble-black-600);
}

.group__footer {
  margin-top: 4rem;
  max-width: 40rem;
}

.group__buttons {
  display: flex;
  gap: 1.5rem;
  margin-top: 2.5rem;
}

.group__button {
  max-width: 22rem !important;
}

.group__media {
}

.group__image {
  border-radius: 35px;
  width: 100%;
  height: auto;
  max-height: 48rem;
  object-fit: cover;
}

@media (max-width: 1200px) {
  .group__inner {
    padding: 4rem;
  }

  .group__header {
    padding: 0;
    gap: 7rem;
  }
}

@media (max-width: 1024px) {
  .group__header {
    flex-direction: column;
    gap: 4rem;
  }
}

@media (max-width: 768px) {
  .group__image {
    height: 437px;
  }

  .group__inner {
    padding: 3rem 2rem;
  }
}

@media (max-width: 575px) {
  .group__title {
    text-align: center;
  }

  .group__buttons {
    flex-direction: column;
  }
}

@media (max-width: 420px) {
  .group__image {
    height: 390px;
  }
}

@media (max-width: 380px) {
  .group__image {
    height: 350px;
  }
}

.tabs__tab {
  transition: all 0.2s;
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 20px;
  line-height: 100%;
  color: var(--noble-black-300);
}

.tabs__tab:hover {
  color: var(--noble-black-600);
}

.tabs__tab.active {
  font-weight: 500;
  color: var(--noble-black-600);
}

/* Стили для иконки */
.tabs__tab > .tabs__tab-icon {
  display: none;
}

.tabs__tab.active > .tabs__tab-icon {
  display: block;
}

.tabs__tab-icon {
  width: 2.4rem;
  height: 2.4rem;
  stroke: #fbec78;
  margin-right: 2rem;
}

.tabs__content {
  margin-top: 1rem;
}

/* ====== ROOMS ====== */
.rooms {
}

.rooms__inner {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  border-radius: 60px;
  padding: 50px;
  background: var(--white);
}

.rooms__header {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 103.4rem;
  margin: 0 auto;
}

.rooms__title {
  font-family: var(--second-family);
  font-weight: 500;
  line-height: 120%;
  text-align: center;
  color: var(--noble-black-600);
}

.rooms__description {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  text-align: center;
  color: var(--noble-black-600);
}

.rooms__content {
  padding-top: 5rem;
  display: flex;
  gap: 7rem;
  justify-content: center;
  align-items: center;
}

.rooms__media {
  max-width: 100%;
  display: flex;
  justify-content: center;
  flex: 1 1 56.5rem;
  height: 487px;
  position: relative;
}

.rooms__image {
  width: 100%;
  object-fit: cover;
  border-radius: 60px;
}

.rooms__details {
  flex: 1 1 40rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.5rem;
}

.rooms__details-header {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.rooms__room-title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 20px;
  line-height: 100%;
  color: var(--noble-black-600);
  text-transform: uppercase;
}

.rooms__room-description {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  color: var(--noble-black-600);
}

.rooms__line {
  max-width: 718px;
  width: 100%;
  height: 1px;
  background: var(--noble-black-100);
  display: block;
  margin: 0 auto;
}

.room-info {
  display: grid;
  grid-template-columns: auto auto;
  gap: 1rem 4rem;
  /* 1rem по вертикали, 4rem по горизонтали */
}

.room-info__item {
  display: contents;
  /* чтобы label и value легли в сетку напрямую */
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 100%;
  color: var(--noble-black-600);
}

.room-info__label {
}

.room-info__value {
}

.rooms__actions {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  margin-top: 3rem;
}

.rooms__button {
  max-width: 25rem !important;
}

.rooms__price {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  color: var(--noble-black-300);
}

.rooms__tab-icon {
  width: 2.4rem;
  height: 2.4rem;
  stroke: #fbec78;
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

.rooms__images {
  width: 100%;
  position: relative;
}

.rooms__slide {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* растягиваем слайд */
}

.rooms__images {
  flex: 1 1 55%;
  /* слайдер тянется на оставшуюся часть */
  display: flex;
  justify-content: center;
  align-items: center;
}

.rooms__image {
  width: 100%;
  height: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 45px;
  object-fit: cover;
  position: relative;
}

/* .rooms__gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
  max-width: 670px;
  margin-top: auto;
} */

/* .rooms__gallery-image {
  width: 100%;
  max-width: 315px;
  aspect-ratio: 315 / 280;
  object-fit: cover;
  border-radius: 35px;
} */

@media (max-width: 1200px) {
  .rooms__content {
    flex-direction: column;
    gap: 5rem;
  }

  .rooms__details {
    flex: none;
  }

  .rooms__media {
    flex: none;
    height: 500px;
  }
}

@media (max-width: 1024px) {
  .rooms__inner {
    padding: 40px;
  }
}

@media (max-width: 998px) {
}

@media (max-width: 768px) {
  .rooms__images-button {
    padding: 0 1rem;
  }

  .rooms__media {
    height: 437px;
  }

  .rooms-page__image {
    aspect-ratio: auto;
  }
}

@media (max-width: 575px) {
  .rooms__inner {
    padding: 3rem 2rem;
  }

  .rooms__actions {
    flex-direction: column-reverse;
  }
}

@media (max-width: 420px) {
  .rooms__images-button {
    padding: 0 1rem;
  }

  .rooms__media {
    height: 380px;
  }
}

@media (max-width: 370px) {
  .rooms__media {
    height: 350px;
  }
}

/* ====== SPECIAL OFFERS ====== */
.special-offers {
}

.special-offers__inner {
  border-radius: 60px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 6rem;
}

.special-offers__header {
  display: flex;
  gap: 7rem;
  justify-content: space-between;
  align-items: center;
}

.special-offers__title {
  font-family: var(--second-family);
  font-weight: 500;
  line-height: 120%;
  color: #1c1c1c;
  flex: 1 1 30rem;
}

.special-offers__description {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  color: #1c1c1c;
  flex: 1 1 33rem;
}

.special-offers__items {
  gap: 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(32rem, 1fr));
}

.special-offers__item {
  position: relative;
  width: 100%;
  margin: 0 auto;
  border-radius: 3.5rem;
  padding: 2rem;
  background: var(--white);
  border-radius: 4rem;
}

.special-offers__media {
  position: relative;
}

.special-offers__media {
  aspect-ratio: 4 / 4;
}

.special-offers__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 3.5rem;
}

.special-offers__content {
  position: relative;
  margin-top: 2rem;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.special-offers__label {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 18px;
  line-height: 120%;
  color: var(--noble-black-600);
}

.special-offers__subtitle {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 16px;
  line-height: 140%;
  color: var(--noble-black-400);
  margin-bottom: 0.5rem;
}

.special-offers__text {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 16px;
  line-height: 140%;
  color: var(--noble-black-600);
  margin-bottom: 1.1rem;
}

.special-offers__button {
  max-width: 25rem;
}

@media (max-width: 1024px) {
  .special-offers__inner {
    padding: 30px;
  }

  .special-offers__header {
    gap: 3rem;
    flex-direction: column;
  }

  .special-offers__title {
    flex: none;
    text-align: center;
  }

  .special-offers__description {
    flex: none;
    text-align: center;
  }
}

@media (max-width: 900px) {
  .special-offers__media {
    gap: 1.5rem;
    display: flex;
    flex-direction: column;
  }

  .special-offers__content {
    padding: 0;
  }

  .special-offers__label {
    color: var(--noble-black-600);
  }

  .special-offers__subtitle {
    color: var(--noble-black-400);
  }

  .special-offers__text {
    color: var(--noble-black-600);
  }
}

@media (max-width: 575px) {
  .special-offers__inner {
    padding: 1rem;
  }

  .special-offers__items {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 575px) {
  .special-offers__inner {
    padding: 0;
  }
}

.contacts {
}

.contacts__inner {
  border-radius: 60px;
  padding: 60px;
  background: var(--white);
  display: flex;
  flex-direction: column;
  gap: 7rem;
}

.contacts__header {
}

.contacts__title {
  font-family: var(--second-family);
  font-weight: 500;
  line-height: 100%;
  color: var(--noble-black-600);
  text-align: center;
}

.contacts__info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 3rem 4rem;
  align-items: start;
}

.contacts__item {
}

.contacts__item-title {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 160%;
  color: var(--noble-black-300);
  font-style: normal;
}

.contacts__item-text {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 20px;
  line-height: 160%;
  color: var(--noble-black-600);
  font-style: normal;
}

.contacts__link {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 20px;
  line-height: 160%;
  color: var(--noble-black-600);
  font-style: normal;
}

.contacts__link:hover {
  text-decoration: underline;
}

.contacts__map {
  border-radius: 45px;
}

@media (max-width: 1024px) {
  .contacts__inner {
    padding: 45px;
  }
}

@media (max-width: 900px) {
  .contacts__info {
    gap: 2rem;
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .contacts__inner {
    padding: 35px;
  }
}

@media (max-width: 575px) {
  .contacts__inner {
    padding: 3rem 2rem;
  }

  .contacts__title {
    text-align: center;
  }

  .contacts__item-text {
    font-size: 1.8rem;
  }

  .contacts__link {
    font-size: 1.8rem;
  }
}
</style>
