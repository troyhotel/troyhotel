<template>
  <main class="main">
    <Hero title="СПА-комплекс"
      subtitle="В парк-отеле «Троя» вы можете отвлечься от суеты и окунуться в атмосферу полного комфорта. Наш спа-комплекс включает две отдельные зоны отдыха — каждая со своим характером и возможностями для релакса."
      image="/spa/XXXL1.jpg" :showBooking="false" align="center" />

    <section class="services">
      <div class="container">
        <div class="services__inner">
          <ul class="services__list">
            <li v-for="(service, index) in services" :key="index" class="services__item">
              <div class="services__slider-wrapper">
                <SwiperSlider :images="service.images" @slides-count="slidesCount[index] = $event"
                  @active-slide="activeSlide[index] = $event" ref="el => sliderRefs[index] = el" />
              </div>
              <div class="services__info">
                <!-- Контент услуги -->
                <div class="services__content-block">
                  <h2 class="services__title">{{ service.title }}</h2>
                  <div class="services__description">
                    <ul v-if="service.list?.length" class="services__list-items">
                      <li v-for="(item, idx) in service.list" :key="idx" class="services__list-item">
                        {{ item }}
                      </li>
                    </ul>
                    <p v-for="(text, i) in service.description" :key="i" class="services__text">
                      {{ text }}
                    </p>
                  </div>
                </div>

                <!-- Футер с ценой и кнопкой -->
                <div class="services__footer">
                  <div class="services__price">{{ service.price }}</div>
                  <div style="max-width: 25rem;">
                    <Button custom-class="services__cta" icon-class="services__cta-icon" :label="service.buttonText"
                      trailIcon="arrow-up-right-tiny" color="yellow" size="large" tag="a" :href="service.buttonHref"
                      :target="service.buttonHref?.includes('wa.me') ? '_blank' : '_self'" />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import Slider from '~/components/Slider.vue';
import Button from '~/components/ui/VButton.vue'
import SwiperSlider from '~/components/page/SwiperSlider.vue';
import { spaSEO } from '~/seo/spa'
// import PlayerVideo from '~/components/ui/PlayerVideo.vue'
// const videoSrc = '/spa/sample-5s.mp4'  // путь к вашему видео
// <PlayerVideo style="max-width: 70rem; height: 57.4rem;" :src="videoSrc" />


const services = [
  {
    title: "Термальная зона",
    images: [
      { src: "/spa/thermal-1.jpg", alt: "Хамам в термальной зоне" },
      { src: "/spa/thermal-2.jpg", alt: "Хамам в термальной зоне" },
      { src: "/spa/thermal-3.jpg", alt: "Хамам в термальной зоне" },
      { src: "/spa/thermal-4.jpg", alt: "Хамам в термальной зоне" },
    ],
    description: [
      "Воспользуйтесь нашим предложением и подарите себе незабываемый отдых и релакс!"
    ],
    list: [
      "Турецкий хамам",
      "Инфракрасная сауна",
      "Джакузи",
    ],
    price: "Стоимость: 2000 ₽ / час (до 6 человек)",
    buttonText: "Позвонить",
    buttonHref: "tel:+79813333443"
  },
  {
    title: "Зона сауны",
    images: [
      { src: "/spa/sauna-1.jpg", alt: "Финская сауна" },
      { src: "/spa/sauna-2.jpg", alt: "Бассейн 3×6 м в зоне сауны" },
      { src: "/spa/sauna-3.jpg", alt: "Бассейн в зоне сауны" },
      { src: "/spa/sauna-4.jpg", alt: "Бассейн в зоне сауны" },
      { src: "/spa/sauna-5.jpg", alt: "Бассейн в зоне сауны" }
    ],
    description: [
      "Авторские коктейли и винная карта порадуют гурманов."
    ],
    list: [
      "Финская сауна",
      "подогреваемый бассейн (3×6 м, ~28 °C)",
    ],
    price: "Стоимость: 2000 ₽ / час",
    buttonText: "Забронировать",
    buttonHref: "https://wa.me/79813333443?text=Здравствуйте!%20Хочу%20забронировать%20СПА"
  },
  {
    title: "Специальное предложение",
    images: [
      { src: "/spa/bassein-1.jpg", alt: "Бассейн под открытым небом" }
    ],
    description: [
      "Скидка на посещение СПА-комплекса",
      "Полный релакс - за меньшую стоимость.",
      "Подарите себе час спокойствия и восстановления в нашем СПА. Идеально после дороги или для завершения дня."
    ],
    price: "Спа-комплекс всего за 1500 ₽ / час",
    buttonText: "Позвонить",
    buttonHref: "tel:+79813333443"
  }
]

const slidesCount = ref<number[]>(services.map(s => s.images.length))
const activeSlide = ref<number[]>(services.map(() => 0))
const sliderRefs = ref<any[]>(services.map(() => null))

useHead(spaSEO)

definePageMeta({
  pageTransition: {
    name: 'fade-soft',
    mode: 'out-in',
    css: true,
    duration: { enter: 300, leave: 300 }
  }
})
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
  display: inline-block;
  position: relative;
}

.slide-fade-enter-from {
  transform: translateY(-20%);
  opacity: 0;
}

.slide-fade-enter-to {
  transform: translateY(0%);
  opacity: 1;
}

.slide-fade-leave-from {
  transform: translateY(0%);
  opacity: 1;
}

.slide-fade-leave-to {
  transform: translateY(20%);
  opacity: 0;
}

.services {}

.services__inner {}

.services__list {
  display: flex;
  flex-direction: column;
  gap: 5rem;
}

.services__item {
  display: flex;
  border-radius: 60px;
  padding: 2.8%;
  background: var(--white);
}

.services__slider-wrapper {
  flex: 1 1 40%;
  max-width: 550px;
  display: flex;
  height: clamp(35rem, 40vw, 60.5rem);
}

/* Слайдер */
.services__slider {
  flex: 1;
}

/* Информация рядом с слайдером */
.services__info {
  border-radius: 35px;
  padding: 5.2% 2.25% 1.5%;
  flex: 1 1 60%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  max-width: 80rem;
}

/* Контент услуги */
.services__content-block {}

/* Заголовок услуги */
.services__title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 32px;
  line-height: 140%;
  letter-spacing: 0em;
  color: var(--noble-black-600);
  margin-bottom: 1rem;
}

/* Описание услуги */
.services__description {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: var(--noble-black-600);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.services__list-items {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 1rem 0 2rem 0;
}

.services__list-item {
  padding-left: 2.4rem;
  border-left: 1px solid #FFE200;
}

.services__text {}

/* Футер с ценой и кнопкой */
.services__footer {
  margin-top: 12.2%;
}

.services__price {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 100%;
  color: var(--noble-black-300);
  margin-bottom: 2.5rem;
}

.services__cta {
  max-width: 25rem !important;
}

/* Кнопки управления слайдером */
.services__slider-controls-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex: 1;
  margin-top: 3rem;
}

.services__item>.services__slider-controls-wrapper {
  display: none;
}

.services__slider-controls {
  display: flex;
  gap: 1rem;
}


.services__button-nav {
  border: 1px solid var(--noble-black-600);
  border-radius: 69px;
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.services__button-nav--right {
  background: var(--noble-black-600);
}

.services__button-nav--left>.services__slider-icon {
  stroke: var(--noble-black-600);
}

.services__button-nav--right>.services__slider-icon {
  stroke: var(--white);
}

.services__slider-icon {
  width: 2.4rem;
  height: 2.4rem;
  stroke: #fbec78;
}

/* Информация о текущем слайде */
.services__slider-info {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 24px;
  line-height: 100%;
  color: var(--noble-black-600);
}

.services__slider-info>span {
  color: var(--noble-black-300);
}

.services__cta-icon {
  border-radius: 69px !important;
  padding: 10px !important;
  width: 44px !important;
  height: 44px !important;
  background: var(--noble-black-600) !important;
}

.services__cta-icon>svg {
  stroke: var(--white) !important;
}


/* @media (max-width: 998px) {
  .services__list {
    gap: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
  }

  .services__item {
    flex-direction: column;
    align-items: center;
  }
} */


@media (max-width: 998px) {
  .services__info {
    max-width: none;
  }

  .services__slider-wrapper {
    max-width: none;
    width: 100%;
    height: clamp(35rem, 48vw, 60.5rem);
  }

  .services__slider-wrapper {
    flex: none;
  }

  .services__info {
    flex: none
  }

  .services__list {
    gap: 2rem;
    display: grid;
    grid-template-columns: 1fr;
  }

  .services__item {
    flex-direction: column;
    align-items: start;
    padding: 4.8%;
  }

  .services__info {
    padding: 5.2% 0 1.5%;
  }


  .services__info>.services__slider-controls-wrapper {
    display: none;
  }

  .services__item>.services__slider-controls-wrapper {
    display: flex;
    width: 100%;
    align-items: center;
  }

  .services__title {
    font-size: 2.95rem;
  }
}

@media (max-width: 768px) {
  .services__title {
    font-size: 2.7rem;
  }
}

@media (max-width: 575px) {
  .services__item {
    border-radius: 4.5rem;
  }
}

@media (max-width: 480px) {
  .services__title {
    font-size: 2.4rem;
  }

  .services__slider-info {
    font-size: 2.2rem;
  }

  .services__button-nav {
    width: 37px;
    height: 37px;
  }

  .services__slider-icon {
    width: 2rem;
    height: 2rem;
  }
}

@media (max-width: 400px) {
  .services__title {
    font-size: 2.2rem;
  }

}
</style>