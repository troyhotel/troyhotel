<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from '~/components/ui/VButton.vue'
import FullscreenImage from '~/components/FullScreenImage.vue'

interface Dish {
  title: string
  description: string
  img: string
  type?: 'big' | 'small'
}

interface MenuData {
  title: string
  dishes: Dish[]
}

defineProps<{
  menuData: MenuData
}>()

const conferenceRef = ref(null)

const swiper = useSwiper(conferenceRef, {
  effect: 'slide',
  slidesPerView: 1.5,
  spaceBetween: 30,
  breakpoints: {
    1300: { slidesPerView: 3.5 },
    950: { slidesPerView: 2.5 },
    768: { slidesPerView: 2.5 },
    400: {
      slidesPerView: 1.4,
      spaceBetween: 15,
    },
    0: {
      slidesPerView: 1.1,
      spaceBetween: 15,
    },
  },
})

onMounted(() => {
  swiper.instance?.value?.init()
})
</script>

<template>
  <section class="restaurant-menu">
    <div class="container">
      <div class="restaurant-menu__inner">
        <!-- Заголовок + кнопки -->
        <div class="restaurant-menu__header">
          <h2 class="restaurant-menu__title title">{{ menuData.title }}</h2>

          <div class="restaurant-menu__buttons">
            <Button custom-class="restaurant-menu__button" color="yellow" size="large" label="Меню" tag="a"
              href="/menu.pdf" :blank="true" />
            <Button custom-class="restaurant-menu__button" color="yellow" size="large" label="Бар" tag="a"
              href="/menuBar.pdf" :blank="true" />
          </div>
        </div>

        <!-- Слайдер блюд -->
        <ClientOnly>
          <swiper-container ref="conferenceRef" :init="false" class="restaurant-menu__slider">
            <swiper-slide v-for="(dish, idx) in menuData.dishes" :key="idx" class="restaurant-menu__slide">
              <div class="restaurant-menu__item">
                <div class="restaurant-menu__image-wrapper">
                  <FullscreenImage class="restaurant-menu__image" :src="dish.img" :alt="dish.title" loading="lazy" />
                </div>

                <h3 class="restaurant-menu__subtitle">{{ dish.title }}</h3>
                <p class="restaurant-menu__text">{{ dish.description }}</p>
              </div>
            </swiper-slide>
          </swiper-container>
        </ClientOnly>
      </div>
    </div>
  </section>
</template>

<style scoped>
.restaurant-menu__inner {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.restaurant-menu__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.restaurant-menu__title {
  font-family: var(--second-family);
  font-weight: 500;
  line-height: 140%;
  color: var(--noble-black-600);
}

.restaurant-menu__buttons {
  display: flex;
  gap: 1.5rem;
  min-width: 45.4rem;
  justify-content: end;
}

/* --- Swiper --- */
.restaurant-menu__slider {
  width: 100%;
  overflow: visible;
}

.restaurant-menu__slide {
  display: flex;
  justify-content: center;
}

.restaurant-menu__item {
  width: 100%;
  max-width: 420px;
  background: var(--white);
  border-radius: 45px;
  padding: 6.82%;
  text-align: center;
}

.restaurant-menu__image-wrapper {
  padding: 5.27%;
}

.restaurant-menu__image {
  width: 100%;
  border-radius: 45px;
  object-fit: cover;
  margin-bottom: 1rem;
}

.restaurant-menu__subtitle {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 20px;
  line-height: 140%;
  text-align: center;
  color: var(--noble-black-600);
}

.restaurant-menu__text {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0.01em;
  text-align: center;
  color: #000;
  max-width: 40.4rem;
  margin: 0 auto;
}

/* адаптив */
@media (max-width: 1024px) {
  .restaurant-menu__header {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-width: 575px) {

  .restaurant-menu__buttons {
    min-width: auto;
  }
}
</style>
