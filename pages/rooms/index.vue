<template>
  <main class="main">
    <Hero title="Комфорт, к которому хочется вернуться"
      subtitle="В парк-отеле «Троя» каждый номер создан для вашего удобства — от стандартных до премиальных категорий."
      pageName="Номера" image="/rooms/XXXL1.jpg" :showBooking="true" align="center" />
    <section class="comfort">
      <div class="comfort__inner">
        <h2 class="comfort__title title">Ваш комфорт в деталях</h2>

        <ClientOnly>
          <swiper-container ref="comfortRef" :init="false" class="comfort__slider">
            <swiper-slide v-for="(item, idx) in items" :key="idx" class="comfort__slide">
              <article class="comfort__item">
                <FullscreenImage class="comfort__item-image" :src="item.image" :alt="item.title" loading="lazy" />
                <h3 class="comfort__item-title">{{ item.title }}</h3>
                <p class="comfort__item-description">{{ item.description }}</p>
              </article>
            </swiper-slide>
          </swiper-container>
        </ClientOnly>
      </div>
    </section>
    <section class="rooms">
      <div class="container">
        <div class="rooms__inner">
          <h2 class="rooms__title title">Наши номера</h2>

          <div class="rooms__items">
            <article v-for="(room, idx) in rooms" :key="idx" class="rooms__item">
              <div class="rooms__card">
                <div class="rooms__image-wrapper">
                  <FullscreenImage :src="room.images[0]" :alt="`Номер ${room.title}`" class="rooms__image" loading="lazy" />
                </div>
                <div class="rooms__content">
                  <div class="rooms__header">
                    <h3 class="rooms__name">{{ room.title }}</h3>
                    <p class="rooms__price">от {{ room.price }} руб</p>
                  </div>
                  <NuxtLink :to="`/rooms/${room.slug}`" class="rooms__button">Подробнее</NuxtLink>
                </div>
                <Button color="white" size="large" tag="button" lead-icon="play" customClass="rooms__button-play" />
              </div>

              <transition name="accordion">
                <div v-show="activeIndex === idx" class="rooms__text">
                  <div class="rooms__text-header">
                    <h4 class="rooms__text-title">{{ room.title }}</h4>
                    <p class="rooms__text-short">{{ room.shortDescription }}</p>
                  </div>
                  <span class="rooms__line"></span>
                  <div class="rooms__text-body">
                    <p class="rooms__text-description" v-html="room.description"></p>
                  </div>
                  <Button label="Подробнее" color="yellow" size="large" tag="a" :href="`/rooms/${room.slug}`"
                    customClass="rooms__text-button" />
                </div>
              </transition>

              <button class="rooms__arrow" @click="toggle(idx)"
                :aria-label="activeIndex === idx ? 'Скрыть описание' : 'Показать описание'">
                <span :class="['rooms__arrow-icon', { 'is-open': activeIndex === idx }]">
                  <svg class="rooms__arrow-svg-icon" aria-hidden="true">
                    <use xlink:href="/svg/icons/inlineSprite.svg#chevron-up" />
                  </svg></span>
              </button>
            </article>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import Button from '~/components/ui/VButton.vue';
import FullscreenImage from '~/components/FullScreenImage.vue'
import { rooms as roomsData } from '~/data/rooms'

const { data: roomsImages } = await useAsyncData<Record<string, string[]>>('rooms-images', () =>
  $fetch('/api/rooms-images')
)

const rooms = computed(() =>
  roomsData.map(room => ({
    ...room,
    images: roomsImages.value?.[room.slug] || [],
  }))
)


const comfortRef = ref(null)
const slides = ref(Array.from({ length: 10 }))
const swiper = useSwiper(comfortRef, {
  effect: "slide",
  slidesPerView: 1.5,
  spaceBetween: 30,
  breakpoints: {
    1300: { slidesPerView: 3.5 },
    950: { slidesPerView: 2.5 },
    768: { slidesPerView: 1.5 },
    0: { slidesPerView: 1.125 },
  },
})

onMounted(() => {
  console.log(swiper.instance)
})

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
    description:
      "Всегда на связи, для работы и развлечений без задержек.",
  },
  {
    image: "/rooms/comfort/hotel-heart.svg",
    title: "Большие просторные номера",
    description:
      "Комфортно отдыхать всей семьёй или продуктивно работать.",
  },
  {
    image: "/rooms/comfort/bed.svg",
    title: "Ортопедические матрасы",
    description:
      "Качественный сон и полное восстановление после дня.",
  },
  {
    image: "/rooms/comfort/video-file.svg",
    title: "Вечерние кино‑показы и трансляции",
    description:
      "Уютная развлекательная программа прямо на территории отеля.",
  },
  {
    image: "/rooms/comfort/tree-garden.svg",
    title: "Внутренний дворик без комаров и мошек",
    description:
      "Отдыхайте на свежем воздухе без раздражающих насекомых.",
  },
])

const activeIndex = ref<number | null>(null)

const toggle = (idx: number) => {
  activeIndex.value = activeIndex.value === idx ? null : idx
}

useHead({
  title: 'Номера — Парк-отель «Троя» в Краснодаре',
  meta: [
    {
      name: 'description',
      content:
        'Номера в парк-отеле «Троя» в Краснодаре: от стандартных до люксов и апартаментов. Бесплатная парковка, Wi-Fi, просторные номера, уют и комфорт.',
    },
    {
      name: 'keywords',
      content:
        'отель Троя Краснодар, номера отеля Краснодар, люкс Краснодар, апартаменты Краснодар, парк-отель Троя',
    },
    {
      property: 'og:title',
      content: 'Номера и комфорт — Парк-отель «Троя» в Краснодаре',
    },
    {
      property: 'og:description',
      content:
        'Выберите свой номер: стандартные, студии, люксы и апартаменты. Бесплатная парковка, Wi-Fi, комфортные условия для отдыха и работы.',
    },
    {
      property: 'og:image',
      content: '/rooms/XXXL1.jpg',
    },
    {
      property: 'og:type',
      content: 'website',
    },
  ],
})
</script>

<style scoped>
.rooms__arrow-svg-icon {
  width: 2.4rem;
  height: 2.4rem;
  stroke: var(--noble-black-600);
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
  padding: 30px 30px 20px 30px;
  display: flex;
  flex-direction: column;
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
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 50%);
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

.rooms__header {}

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
  padding: 0 2rem;
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

.rooms__text-header {
  margin-top: 4.5rem;
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

/* стрелка */
.rooms__arrow {
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
  height: 44px;
  margin-top: 4.5rem;
}

.rooms__arrow-icon {
  display: inline-block;
  transition: transform 0.3s ease;
  transform: rotate(180deg);
}

.rooms__text-button {
  margin-top: 1rem;
  max-width: 25rem !important;
}

.rooms__arrow-icon.is-open {
  transform: rotate(0deg);
}

@media (max-width:768px) {
  .rooms__name {
    font-size: 2.2rem;
  }

  .rooms__text-title {
    font-size: 2.2rem;
  }
}

@media (min-width: 621px) {
  .rooms__text-button {
    display: none;
  }
}

@media (max-width:620px) {
  .rooms__content>.rooms__button {
    display: none;
  }

  .rooms__name {
    font-size: 2rem;
  }

  .rooms__text-title {
    font-size: 2rem;
  }
}

@media (max-width:575px) {
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
    padding: 1.3rem;
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



  .rooms__text-title {
    font-size: 18px;
  }

  .rooms__button {
    font-size: 16px;
    height: 4.5rem;
    max-width: 16.7rem;
    margin-top: 1rem;
  }

  .rooms__arrow {
    margin-top: 2.5rem;
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