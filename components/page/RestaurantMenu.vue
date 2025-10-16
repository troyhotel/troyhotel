<script setup lang="ts">
import Button from '~/components/ui/VButton.vue'

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
</script>

<template>
  <section class="restaurant-menu">
    <div class="container">
      <div class="restaurant-menu__inner">

        <!-- Заголовок + кнопки -->
        <div class="restaurant-menu__header">
          <h2 class="restaurant-menu__title title">{{ menuData.title }}</h2>
          <div class="restaurant-menu__buttons">
            <Button custom-class="restaurant-menu__button" color="yellow" size="large" label="Меню" tag="a" href="/menu.pdf" :blank="true" />
            <Button custom-class="restaurant-menu__button" color="yellow" size="large" label="Бар" tag="a" href="/menuBar.pdf" :blank="true" />
          </div>
        </div>

        <!-- Сетка блюд -->
        <div class="restaurant-menu__grid">
          <div v-for="(dish, i) in menuData.dishes" :key="i" class="restaurant-menu__item"
            :class="{ 'restaurant-menu__item--big': dish.type === 'big' }">
            <div class="restaurant-menu__image-wrapper">
              <img :src="dish.img" :alt="dish.title" class="restaurant-menu__image" />
            </div>

            <h3 class="restaurant-menu__subtitle">{{ dish.title }}</h3>
            <p class="restaurant-menu__text">{{ dish.description }}</p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.restaurant-menu__inner {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 40px;
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
  letter-spacing: 0em;
  color: var(--noble-black-600);
}

.restaurant-menu__buttons {
  display: flex;
  gap: 1.5rem;
  min-width: 45.4rem;
  justify-content: end;
}

.restaurant-menu__button {}

/* GRID */
.restaurant-menu__grid {
  columns: 3;
  column-gap: 2.5rem;
}

.restaurant-menu__item {
  display: inline-block;
  width: 100%;
  background: var(--white);
  border-radius: 45px;
  padding: 6.82%;
  margin: 0 0 2.5rem;
  /* отступы снизу */
  text-align: center;
  break-inside: avoid;
}

.restaurant-menu__item--big {
  grid-area: big;
  text-align: left;
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
  .restaurant-menu__grid {
    columns: 2;
    column-gap: 2rem;
  }

  .restaurant-menu__header {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .restaurant-menu__inner {
    padding: 3rem 2rem;
  }
}

@media (max-width: 700px) {
  .restaurant-menu__grid {
    columns: 1;
  }
}

@media (max-width: 575px) {
  .restaurant-menu__inner {
    padding: 2rem 1rem;
  }

  .restaurant-menu__buttons {
    min-width: auto;
  }
}

@media (max-width: 480px) {
  .restaurant-menu__inner {
    padding: 1rem;}
}
</style>
