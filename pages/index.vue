<template>
  <main class="main">
    <Hero title="Парк-отель «Троя»"
      subtitle="20 минут пешком до самого крупного парка юга России – парка Галицкого и стадиона Краснодар"
      image="/home/home-3.jpg" :showBooking="true" />
    <section class="events">
      <div class="container">
        <div class="events__inner">
          <!-- Блок об отеле и изображения -->
          <div class="events__hotel">
            <div class="events__images">
              <FullscreenImage class="events__image" src="/home/about-events/1.jpg" alt="Вид на парк-отель Троя" />
              <FullscreenImage class="events__image" src="/home/about-events/2.jpg" alt="Интерьер банкетного зала" />
            </div>

            <div class="events__info">
              <div class="events__about">
                <h3 class="events__about-title title">Об отеле</h3>
                <div class="events__about-text">
                  <p>Парк-отель «Троя» — это уютное место в Краснодаре рядом с Парком Галицкого.</p>
                  <p>К вашим услугам просторные номера с продуманным оснащением, спа-комплекс с бассейном и банями,
                    ресторан европейской и кавказской кухни, а также удобные залы для банкетов и деловых мероприятий.
                  </p>
                  <p>Здесь всё создано для того, чтобы вы чувствовали себя расслабленно и по-настоящему спокойно.</p>
                </div>
              </div>

              <div class="events__gallery">
                <div class="events__gallery--column">
                  <FullscreenImage class="events__gallery-image events__gallery-image--small1"
                    src="/home/about-events/3.jpg" alt="Спа-комплекс" />
                  <FullscreenImage class="events__gallery-image events__gallery-image--small2"
                    src="/home/about-events/4.jpg" alt="Бассейн" />
                </div>
                <div class="events__gallery--column">
                  <div class="events__gallery-image--small3">
                    <FullscreenImage class="events__gallery-image" src="/home/about-events/2-1.jpg" alt="Ресторан" />
                  </div>
                  <FullscreenImage class="events__gallery-image events__gallery-image--small4"
                    src="/home/about-events/6.jpg" alt="Конференц-зал" />
                </div>
              </div>
            </div>
          </div>
          <!-- Блок описания мероприятий -->
          <div class="events__description">
            <div class="events__block-text">
              <h2 class="events__title">Планируете мероприятие, конференцию или банкет?</h2>
              <p class="events__subtitle">Парк-отель «Троя» — идеальное место для размещения групп до 80 человек.</p>
            </div>

            <div class="events__facilities">
              <h3 class="events__facilities-title">В распоряжении гостей:</h3>
              <div class="events__facilities-list-wrapper">
                <ul class="events__facilities-list">
                  <li class="events__facilities-item">Просторные банкетные и конференц-залы</li>
                  <li class="events__facilities-item">Современное оборудование и гибкая рассадка</li>
                  <li class="events__facilities-item">Организация трансфера и сопровождения</li>
                </ul>
                <div class="events__facilities-additional">
                  <ul class="events__facilities-list">
                    <li class="events__facilities-item">Размещение в комфортабельных номерах</li>
                    <li class="events__facilities-item">Питание по договорённому меню</li>
                  </ul>
                  <p class="events__facilities-text">
                    Наш опытный персонал поможет с организацией любого события — от деловых встреч до торжеств.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="advantages">
      <div class="container">
        <div class="advantages__inner">

          <!-- Заголовок блока -->
          <div class="advantages__header">
            <h2 class="advantages__title">Наши преимущества</h2>
            <p class="advantages__subtitle title">Почему гости выбирают нас</p>
          </div>

          <!-- Список преимуществ -->
          <div class="advantages__features">
            <h3 class="advantages__features-title">Комфорт и удобство в каждом моменте</h3>
            <ul class="advantages__features-list">
              <li class="advantages__features-item">Шаговая доступность до парка «Галицкого», стадиона «Краснодар»,
                Краевой клинической больницы №1 им. проф. С. В. Очаповского</li>
              <li class="advantages__features-item">46 номеров — возможность размещения команд с организацией питания
              </li>
              <li class="advantages__features-item">СПА-комплекс и бассейн для проживающих гостей со скидкой 50%</li>
              <li class="advantages__features-item">Собственный ресторан «Свои люди»</li>
              <li class="advantages__features-item">Бесплатная подземная парковка</li>
              <li class="advantages__features-item">Размещение с маленькими домашними питомцами (по согласованию с
                администратором)</li>
            </ul>
          </div>

          <div class="advantages__ratings">
            <h3 class="advantages__ratings-title">Рейтинги от ведущих сервисов</h3>

            <div class="advantages__ratings-item-wrapper">
              <div class="advantages__rating-item">
                <h4 class="advantages__rating-name">Награды</h4>
                <div class="advantages__rating-card">
                  <img class="advantages__rating-image advantages__rating-image--yandex"
                    src="/home/advantages/yandex-badge.png" alt="Метка на Яндекс.Картах">
                  <div class="advantages__rating-info">
                    <p class="advantages__rating-text">Хорошее место — 2025</p>
                    <div class="advantages__rating-score">
                      <span class="advantages__rating-value">4.8</span>
                      <p class="advantages__rating-description" style="text-align: left;">Наша оценка на Яндекс.Картах
                      </p>
                    </div>
                  </div>
                </div>
                <p class="advantages__rating-description-full">
                  Парк-отель «Троя» помечен на Яндекс.Картах меткой <span>«Хорошее место»</span> — знак, что гости и
                  местные ценят
                  наше расположение и сервис. Удобно посмотреть проезд, отзывы и фото прямо на карте.
                </p>
                <div class="advantages__rating-buttons">
                  <ClientOnly>
                    <Button customClass="advantages__rating-button" label="Перейти в Яндекс.Карты" color="red"
                      size="large" tag="a" href="https://yandex.com/maps/org/troy/1042792426/" :target="true" />
                  </ClientOnly>
                </div>
              </div>

              <div class="advantages__rating-item">
                <p class="advantages__rating-text">
                  Наш парк-отель «Троя» стабильно получает высокие оценки от гостей и ведущих сервисов бронирования
                </p>
                <div class="advantages__rating-card">
                  <img class="advantages__rating-image advantages__rating-image--hotel"
                    src="/home/advantages/hotel-recommend.jpg" alt="101 отель рекомендует">
                  <div class="advantages__rating-info">
                    <p class="advantages__rating-card-text">
                      Гости высоко ценят наше удобное расположение, уровень сервиса и чистоту номеров.
                    </p>
                    <ClientOnly>
                      <Button customClass="advantages__rating-button" label="Подробнее о рейтингах" color="red"
                        size="large" tag="a" :target="true"
                        href="https://101hotels.com/main/cities/krasnodar/otel_troya.html" />
                    </ClientOnly>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
              <article v-for="(item, idx) in infrastructureItems" :key="idx" class="infrastructure__item"
                :class="{ 'infrastructure__item--flip': item.flip }">
                <div class="infrastructure__content">
                  <h3 class="infrastructure__item-title">{{ item.title }}</h3>
                  <p class="infrastructure__item-subtitle">{{ item.subtitle }}</p>
                  <p class="infrastructure__item-text">{{ item.text }}</p>

                  <div class="infrastructure__features">
                    <p class="infrastructure__features-title">{{ item.featuresTitle }}</p>
                    <ul class="infrastructure__features-list">
                      <li v-for="(feature, fIdx) in item.features" :key="fIdx" class="infrastructure__features-item">
                        {{ feature }}
                      </li>
                    </ul>
                  </div>

                  <div class="infrastructure__buttons">
                    <Button customClass="infrastructure__button1" label="Подробнее" color="yellow" size="large"
                      tag="nuxt-link" :href="item.link" />
                    <Button customClass="infrastructure__button2" color="black" size="large" trailIcon="play"
                      tag="button" />
                    <Button customClass="infrastructure__button3" label="Cмотреть видео" color="black" size="large"
                      trailIcon="play" tag="button" />
                  </div>
                </div>

                <div class="infrastructure__media">
                  <FullscreenImage :src="item.image" alt="" class="infrastructure__image-full" />
                </div>
              </article>
            </div>
            <ClientOnly>
              <swiper-container ref="infrastructureRef" :init="false" class="infrastructure__slider">
                <swiper-slide v-for="(item, idx) in infrastructureItems" :key="idx" class="infrastructure__slide">
                  <article class="infrastructure__item" :class="{ 'infrastructure__item--flip': item.flip }">
                    <div class="infrastructure__content">
                      <h3 class="infrastructure__item-title">{{ item.title }}</h3>
                      <p class="infrastructure__item-subtitle">{{ item.subtitle }}</p>
                      <p class="infrastructure__item-text">{{ item.text }}</p>

                      <div class="infrastructure__features">
                        <p class="infrastructure__features-title">{{ item.featuresTitle }}</p>
                        <ul class="infrastructure__features-list">
                          <li v-for="(feature, fIdx) in item.features" :key="fIdx"
                            class="infrastructure__features-item">
                            {{ feature }}
                          </li>
                        </ul>
                      </div>

                      <div class="infrastructure__buttons">
                        <Button customClass="infrastructure__button1" label="Подробнее" color="yellow" size="large"
                          tag="nuxt-link" :href="item.link" />
                        <Button customClass="infrastructure__button2" color="black" size="large" trailIcon="play"
                          tag="button" />
                      </div>
                    </div>
                    <div class="infrastructure__media">
                      <FullscreenImage :src="item.image" :alt="item.text" class="infrastructure__image-full" />
                    </div>
                  </article>
                </swiper-slide>
              </swiper-container>
            </ClientOnly>
          </div>
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
                Принимаем групповые заезды с полной организацией питания — идеальное решение для спортивных команд,
                делегаций и корпоративов.
              </p>

              <div class="group__footer">
                <p class="group__text">
                  Для размещения команд звоните по номеру или оставляйте заявку по кнопке:
                </p>
                <Button @click="openModal" label="Оставить заявку" color="yellow" size="large" tag="button"
                  customClass="group__button" />
              </div>
            </div>
          </div>

          <!-- Изображение -->
          <div class="group__media">
            <FullscreenImage src="/home/group/group-placement.jpg" alt="Групповое размещение команд и делегаций в отеле"
              class="group__image" />
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
              Номерной фонд Парк-отеля «Троя» — это гармония классического уюта и продуманного комфорта.
              Интерьеры выполнены в мягкой, элегантной стилистике, где каждая деталь работает на ощущение
              спокойствия и приватности. Простор, свет и тишина — всё, чтобы вы могли полностью расслабиться
              и насладиться отдыхом без лишних отвлечений.
            </p>
          </div>

          <span class="rooms__line"></span>

          <Tabs :tabs="rooms.map(r => ({ label: r.title }))">
            <template #icon="{ isActive }">
              <svg v-if="isActive" class="tabs__tab-icon" aria-hidden="true">
                <use xlink:href="/svg/icons/inlineSprite.svg#arrow-right" />
              </svg>
            </template>

            <template v-for="(room, index) in rooms" :key="room.slug" #[`tab-${index}`]>
              <article class="rooms__content">
                <div class="rooms__media">
                  <RoomSlider :images="room.images.map(src => ({ src, alt: room.title }))"
                    @slides-count="slidesCount[index] = $event" @active-slide="activeSlide[index] = $event"
                    :ref="el => sliderRefs[index] = el" />

                  <!-- Левая кнопка -->
                  <button @click="sliderRefs[index]?.prev()" :class="[
                    'rooms__images-button rooms__images-button--left',
                    { 'is-hidden': !slidesCount[index] || slidesCount[index] <= 1 || activeSlide[index] === 0 }
                  ]">
                    <svg class="rooms__tab-icon" aria-hidden="true">
                      <use xlink:href="/svg/icons/inlineSprite.svg#arrow-left" />
                    </svg>
                  </button>

                  <!-- Правая кнопка -->
                  <button @click="sliderRefs[index]?.next()" :class="[
                    'rooms__images-button rooms__images-button--right',
                    { 'is-hidden': !slidesCount[index] || slidesCount[index] <= 1 || activeSlide[index] === slidesCount[index] - 1 }
                  ]">
                    <svg class="rooms__tab-icon" aria-hidden="true">
                      <use xlink:href="/svg/icons/inlineSprite.svg#arrow-right" />
                    </svg>
                  </button>

                </div>


                <div class="rooms__details">
                  <div class="rooms__details-header">
                    <h3 class="rooms__room-title">{{ room.title }}</h3>
                    <p class="rooms__room-description">{{ room.description }}</p>
                  </div>

                  <dl class="room-info">
                    <div v-for="roomInfo in room.roomInfo" :key="roomInfo.label" class="room-info__item">
                      <dt class="room-info__label">{{ roomInfo.label }}</dt>
                      <dd class="room-info__value">{{ roomInfo.value }}</dd>
                    </div>
                  </dl>

                  <div class="rooms__actions">
                    <Button label="Подробнее" color="yellow" size="large" tag="nuxt-link" :href="`/rooms/${room.slug}`"
                      customClass="rooms__button" />
                    <p class="rooms__price">Стоимость от {{ room.price }} руб</p>
                  </div>
                </div>
              </article>
            </template>
          </Tabs>
        </div>
      </div>
    </section>

    <gallery v-if="images" title="Галерея" :images="images" />

    <section class="special-offers">
      <div class="container">
        <div class="special-offers__inner">
          <header class="special-offers__header">
            <h2 class="special-offers__title title">Специальные предложения — отдых с привилегиями</h2>
            <p class="special-offers__description">
              Выбирайте акции, которые делают ваш отдых ещё приятнее. Бронируйте с выгодой, получайте бонусы и
              наслаждайтесь
              отдыхом без лишних затрат.
            </p>
          </header>

          <div class="special-offers__items">
            <article class="special-offers__item">
              <div class="special-offers__media">
                <img src="/home/special-offers/1.jpg" alt="Специальное предложение" class="special-offers__image">

                <div class="special-offers__bottom-wrapper">
                  <div class="special-offers__blur"></div>

                  <div class="special-offers__content">
                    <h3 class="special-offers__label">10% скидка при длительном проживании</h3>
                    <p class="special-offers__subtitle">Для тех, кто остаётся подольше — приятный бонус.</p>
                    <p class="special-offers__text">
                      Планируете длительное пребывание? Забронируйте с предоплатой и получите скидку 10%. Идеально для
                      рабочих поездок и неспешного отдыха.
                    </p>
                    <!-- <Button label="Подробнее" color="yellow" size="large" tag="nuxt-link" href="/spa"
                      customClass="special-offers__button" /> -->
                  </div>
                </div>
              </div>
            </article>
            <article class="special-offers__item">
              <div class="special-offers__media">
                <img src="/home/special-offers/2.jpg" alt="Специальное предложение" class="special-offers__image">

                <div class="special-offers__bottom-wrapper">
                  <div class="special-offers__blur"></div>

                  <div class="special-offers__content">
                    <h3 class="special-offers__label">Акция для молодожёнов</h3>
                    <p class="special-offers__subtitle">Создайте идеальное утро после важного дня.</p>
                    <p class="special-offers__text">
                      Романтический завтрак, украшение номера и 1 час в Спа-комплексе — всё для вашего незабываемого
                      начала
                      совместной жизни.
                    </p>
                    <!-- <Button label="Подробнее" color="yellow" size="large" tag="nuxt-link" href="/spa"
                      customClass="special-offers__button" /> -->
                  </div>
                </div>
              </div>
            </article>
            <article class="special-offers__item">
              <div class="special-offers__media">
                <img src="/home/special-offers/3.jpg" alt="Специальное предложение" class="special-offers__image">

                <div class="special-offers__bottom-wrapper">
                  <div class="special-offers__blur"></div>

                  <div class="special-offers__content">
                    <h3 class="special-offers__label">-50% на посещение СПА-комплекса</h3>
                    <p class="special-offers__subtitle">Полный релакс — за полцены.</p>
                    <p class="special-offers__text">
                      Подарите себе час спокойствия и восстановления в нашем СПА. Идеально после дороги или для
                      завершения
                      дня.
                    </p>
                    <!-- <Button label="Подробнее" color="yellow" size="large" tag="nuxt-link" href="/spa"
                      customClass="special-offers__button" /> -->
                  </div>
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
                <a href="tel:+79813333443" class="contacts__link">+7 (981) 333-34-43</a>
              </p>
            </div>

            <div class="contacts__item">
              <h3 class="contacts__item-title">Электронная почта</h3>
              <p class="contacts__item-text">
                <a href="mailto:info@troy-hotel.ru" class="contacts__link">info@troy-hotel.ru</a>
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
            <iframe class="contacts__map"
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A40774ff6fcdfb5ed2c42780bc2cf47cd447f1ba4f73c11a5d234fa41b82c890f&amp;source=constructor"
              width="100%" height="699" frameborder="0" title="Карта расположения Парк-отеля «Троя»"></iframe>
          </div>
        </div>
      </div>
    </section>

    <ModalFeedback v-model:show="isModalOpen" title="Хотите расчитать стоимость размещения команды?"
      subtitle="Оставьте контакты и мы свяжемся с вами для расчета" @submit="handleSubmit" />
  </main>
</template>

<script lang="ts" setup>
import gallery from '~/components/Gallery.vue';
import Button from '~/components/ui/VButton.vue';
import Tabs from '~/components/Tabs.vue';
import RoomSlider from '~/components/page/RoomSlider.vue';
import FullscreenImage from '~/components/FullScreenImage.vue'
import { rooms as roomsData } from '~/data/rooms'
import ModalFeedback from '~/components/ModalFeedback.vue';
import { useGallery } from '~/composables/useGallery'

const { images } = await useGallery()

const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const handleSubmit = async (data: { name: string; phone: string; question?: string }) => {
  const res = await $fetch("/api/mail", {
    method: "POST",
    body: {
      type: "groupBooking",
      form: data,
    },
  })

  console.log("Ответ сервера:", res)
}

const { data: roomsImages } = await useAsyncData('rooms-images', () => $fetch('/api/rooms-images'));

// Формируем комнаты с одной картинкой для слайдера
const rooms = roomsData.map(room => {
  const imagesForRoom = roomsImages.value?.[room.slug] || [];
  return {
    ...room,
    images: imagesForRoom
  };
});

const infrastructureRef = ref(null)
const slides = ref(Array.from({ length: 10 }))
const swiper = useSwiper(infrastructureRef, {
  effect: "slide",
  slidesPerView: 1.5,
  spaceBetween: 20,
  breakpoints: {
    600: {
      slidesPerView: 1.2,
      spaceBetween: 20,
    },
    0: {
      slidesPerView: 1.05,
      spaceBetween: 0,
    },
  },
})

onMounted(() => {
  console.log(swiper.instance)
})

const slidesCount = ref<number[]>([])
const activeSlide = ref<number[]>([])
const sliderRefs = ref<any[]>([])
interface InfrastructureItem {
  title: string
  subtitle: string
  text: string
  featuresTitle: string
  features: string[]
  image: string
  flip: boolean
  link: string
  mobileImage?: string // опционально
}

const infrastructureItems = ref<InfrastructureItem[]>([
  {
    title: "Банкет и мероприятия",
    subtitle: "Планируете банкет, свадьбу или корпоратив?",
    text: "Парк-отель «Троя» предлагает просторные залы с красивым интерьером, профессиональным обслуживанием и гибкой рассадкой.",
    featuresTitle: "Возможности:",
    features: [
      "Вместимость до 80 гостей",
      "Индивидуальное меню",
      "Организация выездной регистрации",
      "Оборудование и декор под ключ",
    ],
    image: "/home/infrastructure/infrastructure-1.png",
    mobileImage: "/home/infrastructure/infrastructure-1-1.jpg", // новая картинка для моб
    flip: false,
    link: "/banquet"
  },
  {
    title: "Номера и размещение",
    subtitle: "Комфорт для каждого гостя — от стандартных номеров до просторных люксов.",
    text: "В парк-отеле «Троя» 46 современных номеров, где продумана каждая деталь для вашего отдыха или работы.",
    featuresTitle: "Что вас ждёт:",
    features: [
      "Современный интерьер и удобная мебель",
      "Кондиционер, Wi-Fi, телевизор и мини-бар",
      "Завтраки, включённые в проживание",
      "Скидка 50% на посещение спа-комплекса для проживающих гостей",
      "Ежедневная уборка и room-service",
    ],
    image: "/home/infrastructure/infrastructure-2.jpg",
    flip: true,
    link: "/rooms"
  },
  {
    title: "Ресторан",
    subtitle: "Атмосфера вкуса и уюта.",
    text: "Европейская и кавказская кухня, круглосуточное обслуживание и летняя терраса.",
    featuresTitle: "Что вас ждёт:",
    features: [
      "Индивидуальное и банкетное меню",
      "Завтраки и обслуживание номеров",
      "Просторный зал и уютная веранда",
    ],
    image: "/home/infrastructure/infrastructure-3.png",
    flip: false,
    link: "/restaurant"
  },
  {
    title: "Спа-комплекс и отдых",
    subtitle: "Расслабление в каждой детали.",
    text: "Полноценный отдых в уютной спа-зоне с банями, джакузи и бассейном — отличное завершение дня.",
    featuresTitle: "В спа-комплексе:",
    features: [
      "Финская сауна, бассейн, зона для отдыха",
      "Турецкий хамам, джакузи, инфракрасная кабина",
      "Массажи, обёртывания и spa-программы",
    ],
    image: "/home/infrastructure/infrastructure-4.jpg",
    flip: true,
    link: "/spa"
  },
])

const width = ref(0)

onMounted(() => {
  // только на клиенте window доступен
  width.value = window.innerWidth

  const handleResize = () => {
    width.value = window.innerWidth
  }

  window.addEventListener('resize', handleResize)

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
  })
})

// watch ширины окна, чтобы менять картинку
watch(width, (w) => {
  const first = infrastructureItems.value[0]
  if (first.mobileImage) {
    first.image = w <= 675 ? first.mobileImage : "/home/infrastructure/infrastructure-1.png"
  }
}, { immediate: true })

useHead({
  title: 'Парк-отель «Троя» в Краснодаре — комфортные номера, ресторан, спа и мероприятия',
  meta: [
    {
      name: 'description',
      content:
        'Парк-отель «Троя» в Краснодаре: комфортабельные номера, ресторан европейской и кавказской кухни, спа-комплекс с бассейном, банкетные и конференц-залы. Идеально для отдыха, деловых встреч и мероприятий.',
    },
    {
      name: 'keywords',
      content:
        'парк-отель Троя, отель Краснодар, номера Краснодар, банкетный зал, спа-комплекс, ресторан Краснодар, конференции Краснодар, отдых Краснодар',
    },
    {
      property: 'og:title',
      content: 'Парк-отель «Троя» — отдых, бизнес и мероприятия в Краснодаре',
    },
    {
      property: 'og:description',
      content:
        'Уютные номера, спа, ресторан, банкетные и конференц-залы. 20 минут пешком до Парка Галицкого и стадиона Краснодар. Идеальное место для отдыха и деловых встреч.',
    },
    {
      property: 'og:image',
      content: '/home/XXXL2.png',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://troy-hotel.ru/',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://troy-hotel.ru/',
    },
  ],
})
</script>

<style scoped>
swiper-container {
  width: 100% !important;
}

swiper-slide {
  width: 100% !important;
}





.events {}

.events__inner {
  position: relative;
  z-index: 1;
  background: #1a1a1a;
  border: 1px solid #262626;
  border-radius: 60px;
  padding: 60px;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  position: relative;
  overflow: hidden;
}

.events__inner::before {
  position: absolute;
  content: '';
  background: url(/public/home/about-events/Abstract.png) no-repeat;
  background-size: cover;
  background-position: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1
}


/* Блок об отеле и изображения */
.events__hotel {
  display: flex;
  flex-wrap: wrap;
  /* ✅ чтобы ломалось на мобилках */
  gap: 2rem;
}

.events__images {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1 1 300px;
  /* ✅ колонка с фото будет тянуться */
  margin-bottom: 21.7rem;
}

.events__images img {
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  border-radius: 35px;
}

/* Инфо + галерея */
.events__info {
  display: flex;
  flex-direction: column;
  gap: 6rem;
  flex: 9 1 400px;
}

.events__about {
  padding: 0px 20px 0px 100px;
}

.events__about-title {
  font-family: var(--second-family);
  font-weight: 700;
  line-height: 125%;
  color: var(--noble-black-0);
  margin-bottom: 1.5rem;
}

.events__about-text {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: var(--noble-black-100);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Галерея мероприятий */
.events__gallery {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  /* ✅ чтобы картинки переносились на маленьких экранах */
}

.events__gallery--column {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1 1 200px;
  /* ✅ равные колонки */
}

/* Все изображения ведут себя одинаково */
.events__gallery-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 35px;
  flex-grow: 1;
}


/* Если нужно добавить отступ справа для первой картинки в ряду */
.events__gallery--column:first-child {
  flex: 1 1 200px;
  /* max-width: 38rem; */
  /* max-height: 90.7rem; */
}

.events__gallery--column:last-child {
  flex: 2 1 200px;
}

.events__gallery-image--small1 {}

.events__gallery-image--small2 {}

.events__gallery-image--small3 {
  margin-right: 9.8rem;
  margin-top: 5rem;
}

.events__gallery-image--small3>.events__gallery-image {
  height: 100%;
  min-width: 290px;
  min-height: 400px;
  object-position: right center;
}

.events__gallery-image--small4 {
  max-height: 317px;
}

/* Описание мероприятий */
.events__description {}

.events__block-text {
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.events__title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 24px;
  line-height: 150%;
  color: var(--noble-black-0);
}

.events__subtitle {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 150%;
  color: var(--noble-black-0);
}

.events__facilities {}

.events__facilities-title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 18px;
  line-height: 150%;
  color: var(--noble-black-0);
  margin-bottom: 2.5rem;
}

.events__facilities-list-wrapper {
  display: flex;
  justify-content: space-between;
  gap: 5rem;
}

.events__facilities-list {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.events__facilities-item {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 18px;
  line-height: 150%;
  color: #999;
  position: relative;
  border-left: 1px solid #FBEC78;
  padding: 18px 0 18px 24px;
  align-items: center;
  display: flex;
}

.events__facilities-item::before {
  margin-right: 1rem;
  content: "";
  display: inline-block;
  width: 24px;
  /* ширина svg */
  height: 25px;
  /* высота svg */
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.6152 2.09495C14.9165 2.26289 15.0643 2.61463 14.9736 2.94736L12.982 10.25H20.25C20.5487 10.25 20.8189 10.4272 20.9379 10.7011C21.0569 10.975 21.0021 11.2934 20.7983 11.5118L10.2983 22.7618C10.063 23.0139 9.68604 23.073 9.38481 22.9051C9.08357 22.7372 8.9357 22.3854 9.02644 22.0527L11.0181 14.75H3.75002C3.45137 14.75 3.18118 14.5728 3.06216 14.2989C2.94313 14.025 2.99795 13.7066 3.20173 13.4883L13.7017 2.23829C13.937 1.98615 14.314 1.92701 14.6152 2.09495Z" fill="white"/></svg>');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.events__facilities-additional {
  display: flex;
  flex-direction: column;
  gap: 5rem;
}

.events__facilities-text {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 150%;
  color: var(--noble-black-0);
  max-width: 60rem;
}

@media (max-width: 1200px) {
  .events__images {
    display: none;
  }

  .events__about {
    padding: 0;
  }

  .events__gallery {
    max-width: 86rem;
  }

  .events__gallery-image--small3 {
    margin: 0;
  }

  .events__gallery--column:first-child {
    flex: 1 1 240px;
  }

}

@media (max-width:1024px) {
  .events__inner {
    padding: 45px;
  }
}

@media (max-width:920px) {
  .events__facilities-list-wrapper {
    flex-direction: column;
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .events__inner {
    padding: 35px;
  }

  .events__about-title {
    text-align: center;
  }

  .events__gallery--column {
    max-width: 45rem;
  }

  .events__gallery {
    justify-content: center;
  }
}

@media (max-width: 575px) {
  .events__inner {
    padding: 3rem 2rem;
    border-radius: 45px;
  }

  .events__gallery-image--small3>.events__gallery-image {
    min-width: auto;
  }

  .events__title {
    font-size: 2.2rem;
  }

  .events__subtitle {
    font-size: 1.7rem;
  }

  .events__facilities-item {
    font-size: 1.7rem;
  }

  .events__facilities-text {
    font-size: 1.7rem;
  }
}

@media (max-width: 480px) {
  .events__title {
    font-size: 2rem;
  }
}

.advantages {}


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
  padding: 0px 110px 0px 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8rem;
  flex-wrap: wrap;
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

.advantages__features-list {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  max-width: 54rem;
  flex: 1 1 55%;
}

.advantages__features-item {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  color: var(--noble-black-600);
  padding-left: 2.4rem;
  border-left: 1px solid #FFE200;
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

.advantages__rating-description-full>span {
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
    padding: 0 40px;
  }

  .advantages__features-title {
    flex: 1 1 20%;
  }

  .advantages__features-list {
    flex: 1 1 40%;
  }
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
  .advantages__features {
    padding: 0;
    gap: 6rem;
  }

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
}



.infrastructure {
  overflow: hidden;
}

.infrastructure__inner {
  display: flex;
  flex-direction: column;
  gap: 7rem;
  border-radius: 60px;
  background: var(--white);
  padding: 50px 140px
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
  gap: 7rem;
}

.infrastructure__item {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 10rem;
  flex-wrap: wrap;
  margin: 1rem;
}

.infrastructure__item--flip {
  flex-direction: row-reverse;
}

.infrastructure__content {
  flex: 1 1 45%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
}

.infrastructure__media {
  flex: 1 1 45%;
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
  margin-bottom: 1.3rem;
}

.infrastructure__features-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.infrastructure__features-item {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  color: var(--noble-black-600);
}

.infrastructure__buttons {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.infrastructure__button1 {
  max-width: 25rem !important;
}

.infrastructure__button2 {
  width: 5.5rem !important;
  height: 5.5rem !important;
  border-radius: 1.5rem !important;
  max-width: 25rem !important;
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
  .infrastructure__inner {
    padding: 50px 70px;
  }

  .infrastructure__item {
    gap: 5rem;
  }
}

@media (max-width: 1200px) {
  .infrastructure__inner {
    padding: 50px;
  }
}

@media (max-width: 998px) {
  .infrastructure__list {
    display: none;
  }

  .infrastructure__slider {
    display: flex;
  }

  .infrastructure__inner {
    padding: 0;
    background: transparent;
    gap: 4rem;
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
  .infrastructure__list {
    display: flex;
    flex-direction: column;
  }

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

  /* .infrastructure__inner {
    border-radius: 60px;
    background: var(--white);
    padding: 3rem 2rem;
    gap: 7rem;
  } */

  .infrastructure__item {
    padding: 3rem 2rem;
    border-radius: 45px;
    margin: 0;
  }

  .infrastructure__item-subtitle {
    font-size: 2rem;
  }
}


.group {}

.group__inner {
  border-radius: 60px;
  padding: 50px;
  background: var(--white);
  display: flex;
  flex-direction: column;
  gap: 6rem;
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
  background: var(--gray-100);
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

.group__button {
  margin-top: 2.5rem;
  max-width: 22rem !important;
}

.group__media {}

.group__image {
  border-radius: 35px;
  width: 100%;
  height: auto;
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

@media (max-width: 575px) {
  .group__inner {
    padding: 3rem 2rem;
  }

  .group__title {
    text-align: center;
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
.tabs__tab>.tabs__tab-icon {
  display: none;
}

.tabs__tab.active>.tabs__tab-icon {
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
.rooms {}

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

.room-info__label {}

.room-info__value {}

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

.rooms__images-button--left {
  left: 0;
  border-radius: 4rem 0 0 4rem;
}

.rooms__images-button--right {
  right: 0;
  border-radius: 0 4rem 4rem 0;
}

.rooms__images-button.is-hidden {
  opacity: 0;
  visibility: hidden;
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


@media (max-width: 1024px) {
  .rooms__inner {
    padding: 40px;
  }

  .rooms__content {
    gap: 5rem;
  }
}

@media (max-width: 998px) {
  .rooms__content {
    flex-direction: column;
  }

  .rooms__details {
    flex: none;
  }

  .rooms__media {
    flex: none;
  }

  .rooms__image {
    max-width: 70rem;
  }
}

@media(max-width: 768px) {
  .rooms__images-button {
    padding: 0 1rem;
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

/* ====== SPECIAL OFFERS ====== */
.special-offers {}

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
  grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
}

.special-offers__item {
  position: relative;
  width: 100%;
  margin: 0 auto;
  border-radius: 3.5rem;
}

.special-offers__media {
  position: relative;
  width: 100%;
}

.special-offers__image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 3.5rem;
}

.special-offers__bottom-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
}

.special-offers__blur {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  content: '';
  background: url(/public/home/special-offers/Blur.png);
  border-radius: 35px;
}


.special-offers__content {
  position: relative;
  padding: 2rem;
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
  color: var(--noble-black-0);
}

.special-offers__subtitle {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 16px;
  line-height: 140%;
  color: rgba(255, 255, 255, 0.72);
  margin-bottom: .5rem;
}

.special-offers__text {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 16px;
  line-height: 140%;
  color: var(--noble-black-0);
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
  .special-offers__item {
    padding: 2rem;
    background: var(--white);
    border-radius: 4rem;
  }

  .special-offers__media {
    gap: 1.5rem;
    display: flex;
    flex-direction: column;
  }

  .special-offers__bottom-wrapper {
    position: static;
  }

  .special-offers__blur {
    position: static;
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

.contacts {}

.contacts__inner {
  border-radius: 60px;
  padding: 60px;
  background: var(--white);
  display: flex;
  flex-direction: column;
  gap: 7rem;
}

.contacts__header {}

.contacts__title {
  font-family: var(--second-family);
  font-weight: 500;
  line-height: 100%;
  color: var(--noble-black-600);
}

.contacts__info {
  display: flex;
  gap: 10%;
}

.contacts__item {}

.contacts__item-title {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 160%;
  color: var(--noble-black-300);
}

.contacts__item-text {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 20px;
  line-height: 160%;
  color: var(--noble-black-600);
}

.contacts__link {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 20px;
  line-height: 160%;
  color: var(--noble-black-600);
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
