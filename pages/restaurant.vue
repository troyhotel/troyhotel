<template>
  <main class="main">
    <Hero title="Ресторан «Свои люди» — здесь вас встречают как родных"
      subtitle="Ресторан «СВОИ ЛЮДИ» — еда, атмосфера и моменты, которые остаются с вами" pageName="Ресторан"
      image="/restaurant/XXXL1.jpg" buttonTag="a"
      buttonHref="https://api.whatsapp.com/send/?phone=79933037525&amp;text=Добрый день! Хочу заказать столик на &amp;type=phone_number&amp;app_absent=0"
      :showBookingButton="true" bookingButtonText="Заказать столик" align="center" />

    <section class="restaurant-info">
      <div class="restaurant-info__container container">
        <div class="restaurant-info__inner">

          <div class="restaurant-info__intro">
            <div class="restaurant-info__images">
              <FullscreenImage v-for="(img, idx) in restaurantData.images" :key="idx" :src="img.src" :alt="img.alt"
                :class="[
                  'restaurant-info__image',
                  idx === 0 ? 'restaurant-info__image1' : '',
                  idx === 1 ? 'restaurant-info__image2' : ''
                ]" />
            </div>

            <div class="restaurant-info__text">
              <h1 class="restaurant-info__title title" itemprop="name">
                {{ restaurantData.title }}
              </h1>
              <p v-for="(desc, i) in restaurantData.description" :key="i" class="restaurant-info__description"
                itemprop="description">
                {{ desc }}
              </p>
            </div>
          </div>

          <div class="restaurant-info__menu-preview">
            <div class="restaurant-info__menu-text">
              <h2 class="restaurant-info__menu-title">
                {{ restaurantData.menu.title }}
              </h2>
              <ul class="restaurant-info__menu-list">
                <li v-for="(item, idx) in restaurantData.menu.items" :key="idx" class="restaurant-info__menu-item">
                  {{ item }}
                </li>
              </ul>
            </div>
            <div class="restaurant-info__menu-image-wrapper">
              <FullscreenImage :src="restaurantData.menu.image.src" :alt="restaurantData.menu.image.alt"
                class="restaurant-info__menu-image" />
            </div>
          </div>

        </div>
      </div>
    </section>

    <section class="advantages">
      <div class="container">
        <div class="advantages__inner">

          <header class="advantages__header">
            <h2 class="advantages__title">Наши преимущества</h2>
            <p class="advantages__subtitle title">Что делает нас особенными</p>
          </header>

          <div class="advantages__videos">
            <article v-for="(video, idx) in videos" :key="idx" class="advantages__video">
              <div class="video-card">
                <transition name="fade" mode="out-in">
                  <template v-if="activeVideo === idx">
                    <VideoPlayer :src="videoSrc" :style="{ width: '100%', height: videoHeight + 'px' }" />
                  </template>

                  <template v-else>
                    <div class="video-card__poster">
                      <img :src="video.poster" :alt="video.title" class="video-card__image" />

                      <div class="video-card__content">
                        <h3 class="video-card__title">{{ video.title }}</h3>
                        <p class="video-card__text">{{ video.text }}</p>
                      </div>

                      <button class="video-card__play-btn" aria-label="Запустить видео" @click="startVideo(idx)">
                        <svg class="video-card__icon" aria-hidden="true">
                          <use :xlink:href="'/svg/icons/inlineSprite.svg#play'" />
                        </svg>
                      </button>
                    </div>
                  </template>
                </transition>
              </div>
            </article>
          </div>


          <div class="advantages__list-wrapper">
            <div class="advantages__list-title">Дополнительные преимущества</div>
            <div class="advantages__list">
              <article class="advantages__item">
                <div class="advantages__number"><img src="/restaurant/frame.png" alt=""><span>1</span></div>
                <div class="advantages__content">
                  <h3 class="advantages__item-title">Организация торжеств под ключ</h3>
                  <p class="advantages__item-text">
                    Банкеты, флористика, ведущие, фотографы — всё в одном месте, без лишней суеты.
                  </p>
                </div>
              </article>

              <article class="advantages__item">
                <div class="advantages__number"><img src="/restaurant/frame.png" alt=""><span>2</span></div>
                <div class="advantages__content">
                  <h3 class="advantages__item-title">Разнообразие развлечений</h3>
                  <p class="advantages__item-text">
                    Бильярд, кино, караоке — выберите формат вечера, который вам по душе.
                  </p>
                </div>
              </article>

              <article class="advantages__item">
                <div class="advantages__number"><img src="/restaurant/frame.png" alt=""><span>3</span></div>
                <div class="advantages__content">
                  <h3 class="advantages__item-title">Пространство для больших событий</h3>
                  <p class="advantages__item-text">
                    Отдельный банкетный зал на 100 гостей с возможностью индивидуального оформления.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>


    <RestaurantMenu :menuData="BanquetMenu" />
    <gallery title="Галерея" :images="[
      { src: '/restaurant/gallery/gallery-1.jpg', alt: 'Фото 1' },
      { src: '/restaurant/gallery/gallery-2.jpg', alt: 'Фото 2' },
      { src: '/restaurant/gallery/gallery-3.jpg', alt: 'Фото 3' },
      { src: '/restaurant/gallery/gallery-4.jpg', alt: 'Фото 4' },
      { src: '/restaurant/gallery/gallery-5.jpg', alt: 'Фото 5' },
      { src: '/restaurant/gallery/gallery-6.jpg', alt: 'Фото 6' },
      { src: '/restaurant/gallery/gallery-7.jpg', alt: 'Фото 7' },
    ]" />

  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import RestaurantMenu from '~/components/page/RestaurantMenu.vue'
import gallery from '~/components/Gallery.vue'
import FullscreenImage from '~/components/FullScreenImage.vue'
import VideoPlayer from '~/components/ui/PlayerVideo.vue'
const videoSrc = '/spa/sample-5s.mp4'  // путь к вашему видео

const videos = [
  {
    poster: '/restaurant/video-card-1.jpg',
    title: 'Основной зал',
    text: 'Каменный зал с особым шармом — здесь можно провести тематический вечер, собравшись за одним большим столом, или устроить душевный ужин в тихом уголке.'
  },
  {
    poster: '/restaurant/video-card-2.jpg',
    title: 'Летний дворик',
    text: 'Зелёная, уютная веранда с живой растительностью и мягким светом. Вечером — романтика как во дворике вечерней Венеции. Летние кинопоказы, мангальная зона, атмосферная музыка.'
  },
  {
    poster: '/restaurant/video-card-3.jpg',
    title: 'VIP-караоке',
    text: 'Отдельный вход, комфортные диваны, вместимость до 15 человек, профессиональная аппаратура «Evolution» и полная приватность — идеальное место для вечера с близкими.'
  }
]

const activeVideo = ref<number | null>(null)
const videoHeight = ref<number>(0)

const startVideo = async (idx: number) => {
  activeVideo.value = idx
  await nextTick()
  updateVideoHeight(idx)
}

const stopVideo = () => {
  activeVideo.value = null
  videoHeight.value = 0
}

// Функция для вычисления высоты постера
const updateVideoHeight = (idx: number) => {
  const poster = document.querySelectorAll<HTMLElement>('.video-card__poster')[idx]
  if (poster) videoHeight.value = poster.offsetHeight
}

// Слушаем изменение активного видео
watch(activeVideo, (newVal) => {
  if (newVal !== null) {
    updateVideoHeight(newVal)
  }
})

// Слушаем ресайз окна
const onResize = () => {
  if (activeVideo.value !== null) {
    updateVideoHeight(activeVideo.value)
  }
}

onMounted(() => {
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})

const BanquetMenu = {
  title: 'Меню из ресторана “Свои Люди”',
  dishes: [
    {
      type: 'big' as const,
      img: '/banquet/banquet-menu-1.jpg',
      title: 'Горячая сковородка со свининой',
      description: 'Свиная шея, баклажан, томаты, болгарский перец, картофель, лук, шампиньоны'
    },
    {
      type: 'small' as const,
      img: '/banquet/banquet-menu-2.jpg',
      title: 'Горячая сковородка с цыпленком',
      description: 'Куриное филе, баклажан, томаты, болгарский перец, картофель, лук, шампиньоны.'
    },
    {
      type: 'small' as const,
      img: '/banquet/banquet-menu-3.jpg',
      title: 'Том Ям с морепродуктами',
      description: 'Креветки, мидии, кальмар, паста Том Ям, шампьоны, рис, долька лайма'
    },
    {
      type: 'small' as const,
      img: '/banquet/banquet-menu-4.jpg',
      title: 'Стейк-салат',
      description: 'Нежная телятина, руккола, микс салата, вяленые томаты, пармезан, оливково-горчичная перечная заправка'
    },
    {
      type: 'small' as const,
      img: '/banquet/banquet-menu-5.jpg',
      title: 'Сырное мороженое',
      description: 'Сыр творожный, сливки, яйца, орех грецкий,, мята'
    }
  ]
}

const restaurantData = {
  title: "Ресторан Свои Люди",
  description: [
    '«СВОИ ЛЮДИ» — это место, куда приходят за вкусом, уютом и тёплыми эмоциями. Летний дворик с живыми растениями идеально подойдёт для тёплых вечеров, романтических встреч или дружеских посиделок.',
    'Меню ресторана предлагает разнообразные блюда, приготовленные из свежих и качественных продуктов. Гости могут попробовать традиционные супы, салаты, горячие блюда из мяса и рыбы, множество вариантов пиццы, фирменные бургеры а также разнообразные десерты.'
  ],
  images: [
    { src: '/restaurant/restaurant-1.jpg', alt: 'Интерьер ресторана' },
    { src: '/restaurant/restaurant-2.jpg', alt: 'Летний дворик ресторана' }
  ],
  menu: {
    title: 'Горячее и мясо:',
    items: [
      'Сковородка с курицей / со свининой',
      'Филе утки',
      'Стейк из сёмги, говядины',
      'Филе судака в сливочно-шпинатном соусе'
    ],
    image: {
      src: '/restaurant/restaurant-3.jpg',
      alt: 'Горячее и мясо ресторана'
    }
  }
}
</script>

<style scoped>
.advantages {}

.advantages__inner {
  border-radius: 60px;
  padding: 40px;
  background: var(--white);
}

.advantages__header {
  margin-bottom: 6rem;
}

.advantages__title {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 120%;
  letter-spacing: 0.2em;
  text-align: center;
  color: #7e7e7e;
  margin-bottom: 1.5rem;
}

.advantages__subtitle {
  font-family: var(--second-family);
  font-weight: 500;
  line-height: 120%;
  text-align: center;
  color: #1c1c1c;
}

.advantages__videos {
  margin-bottom: 5rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr 1fr;
}

.advantages__video {
  width: 100%;
  display: flex;
}

.advantages__list-wrapper {}

.advantages__list-title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 28px;
  line-height: 120%;
  color: #1c1c1c;
  margin-bottom: 3.5rem;
}

.advantages__list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 5rem;
}

.advantages__item {
  display: flex;
  gap: 2.4rem;
}

.advantages__number {
  position: relative;
  display: inline-block;
  width: 55px;
  height: 55px;
}

.advantages__number>span {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: #000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.advantages__content {}

.advantages__item-title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 20px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: var(--noble-black-600);
  margin-bottom: 1rem;
}

.advantages__item-text {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: #000;
}

@media (max-width: 1366px) {
  .advantages__list {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 870px) {
  .advantages__list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .advantages__list-title {
    font-size: 24px;
  }
}

@media (max-width: 675px) {
  .advantages__header {
    margin-bottom: 3.5rem;
  }
}

@media (max-width: 575px) {
  .advantages__inner {
    padding: 3rem 2rem;
  }
}

@media (max-width: 480px) {
  .advantages__item {
    flex-direction: column;
  }
}

.video-card {
  position: relative;
  border-radius: 45px;
  overflow: hidden;
  width: 100%;
}

.video-card__poster {
  position: relative;
}

.video-card__image {
  width: 100%;
  display: block;
  filter: brightness(0.45);
}

.video-card__content {
  position: absolute;
  bottom: 3rem;
  left: 3rem;
  right: 3rem;
  color: #fff;
  border-radius: 10px;
}

.video-card__title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 28px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: var(--white);
  margin-bottom: 1rem;
}

.video-card__text {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: var(--gray-100);
}

.video-card__play-btn {
  position: absolute;
  top: 2.5rem;
  right: 3rem;
  background: #fff;
  border-radius: 50%;
  border: none;
  width: 4.4rem;
  height: 4.4rem;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video-card__icon {
  width: 2.4rem;
  height: 2.4rem;
  stroke: var(--noble-black-600);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 1125px) {
  .advantages__video {
    justify-content: center;
  }

  .advantages__videos {
    justify-content: center;
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .advantages__videos {
    justify-content: center;
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .advantages__videos {
    gap: 4rem;
  }

  .video-card {
    border-radius: 0;
  }

  .video-card__image {
    border-radius: 45px;
    margin-bottom: 2rem;
  }

  .video-card__content {
    position: static;
  }

  .video-card__title {
    font-size: 2.4rem;
    color: var(--noble-black-600);
  }

  .video-card__text {
    color: var(--noble-black-600);
  }
}


/* restaurant-info */
.restaurant-info__container {}

.restaurant-info__inner {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  border-radius: 60px;
  padding: 40px;
  background: var(--white);
}

.restaurant-info__intro {
  display: flex;
  gap: 6rem;
  align-items: flex-start;
}

.restaurant-info__text {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 51.1rem;
  min-width: 0;
}

.restaurant-info__title {
  font-family: var(--second-family);
  font-weight: 500;
  line-height: 140%;
  letter-spacing: 0em;
  color: var(--noble-black-600);
}

.restaurant-info__description {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: var(--noble-black-600);
}

.restaurant-info__menu-preview {
  display: flex;
  justify-content: space-between;
  gap: 4rem;
}

.restaurant-info__menu-text {
  flex: 1 1 50%;
}

.restaurant-info__menu-title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 24px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: var(--noble-black-600);
  margin-bottom: 1.5rem;
}

.restaurant-info__menu-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.restaurant-info__menu-item {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: #000;
}

.restaurant-info__images {
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
  flex: 1 1 50%;
  min-width: 0;
}

.restaurant-info__image {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 45px;
  flex: 1 1 0;
  min-width: 0;
}

.restaurant-info__image1 {
  flex: 1 1 50%;
  max-width: 48rem;
}

.restaurant-info__image2 {
  margin-top: 4rem;
  max-height: 30rem;
  max-width: 40rem;
}

.restaurant-info__image2 {
  flex: 1 1 28%;
}

.restaurant-info__menu-image-wrapper {}

.restaurant-info__menu-image {
  border-radius: 45px;
  max-width: 660px;
  width: 100%;
  height: auto;
  object-fit: cover;
}

@media (max-width: 1272px) {
  .restaurant-info__intro {
    flex-direction: column-reverse;
  }
}

@media (max-width: 998px) {
  .restaurant-info__menu-preview {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .restaurant-info__image1 {
    flex: 1 1 35%;
  }
}

/* Мобильные: на небольших экранах переводим в колонку */
@media (max-width: 575px) {
  .restaurant-info__images {
    flex-direction: column;
    width: 100%;
  }

  .restaurant-info__image2 {
    margin-top: 0;
    margin-left: auto;
  }

  /* в колонке убрать отступ */
  .restaurant-info__text {
    max-width: none;
  }

  /* текст занимает всю ширину */
}
</style>