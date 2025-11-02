<template>
  <section class="cta">
    <div class="container">
      <div
        class="cta__inner"
        :class="{ 'cta__inner--has-media': backgroundImage }"
        :style="backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}"
      >
        <h2 class="cta__title">{{ title }}</h2>
        <p class="cta__text">{{ text }}</p>

        <a v-if="href" :href="href" target="_blank" rel="noopener" class="cta__button">
          {{ buttonText }}
        </a>
        <button v-else @click="$emit('click')" class="cta__button">
          {{ buttonText }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  text: string
  buttonText: string
  href?: string
  backgroundImage?: string
}>()
</script>

<style scoped>
.cta__inner {
  position: relative;
  border-radius: 60px;
  padding: 115px;
  text-align: center;
  backdrop-filter: blur(2px);
  background-color: var(--white);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  z-index: 0;
}

/* ✅ затемнение поверх фона */
.cta__inner--has-media::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.2); /* лёгкое затемнение */
  z-index: 1;
}

/* текст и кнопки поверх затемнения */
.cta__title,
.cta__text,
.cta__button {
  position: relative;
  z-index: 2;
}

/* ✅ Когда есть фоновое изображение или видео — делаем белый текст */
.cta__inner--has-media {
  color: var(--white);
}

.cta__inner--has-media .cta__title,
.cta__inner--has-media .cta__text {
  color: var(--white);
}

.cta__title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 36px;
  line-height: 122%;
  letter-spacing: -0.02em;
  text-align: center;
  color: #2a3342;
  margin-bottom: 1.6rem;
}

.cta__text {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 20px;
  line-height: 150%;
  text-align: center;
  color: #556987;
  max-width: 80rem;
  margin: 0 auto 5.4rem;
}

.cta__button {
  max-width: 250px;
  margin: 0 auto;
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 18px;
  line-height: 133%;
  letter-spacing: 0.01em;
  color: var(--noble-black-600);
  border-radius: 20px;
  padding: 15px 20px;
  min-width: 227px;
  height: 54px;
  background: #fbec78;
}

/* адаптив */
@media (max-width: 998px) {
  .cta__inner {
    padding: 8rem 4rem;
  }
  .cta__title {
    font-size: 3rem;
  }
  .cta__text {
    font-size: 1.8rem;
  }
}

@media (max-width: 768px) {
  .cta__title {
    font-size: 2.7rem;
  }
}

@media (max-width: 575px) {
  .cta__title {
    font-size: 2.4rem;
  }
}

@media (max-width: 480px) {
  .cta__inner {
    padding: 4.5rem 2.5rem;
  }
  .cta__text {
    margin-bottom: 3.5rem;
  }
}

@media (max-width: 380px) {
  .cta__inner {
    padding: 3rem 1.5rem;
  }
  .cta__title {
    font-size: 2.2rem;
  }
}
</style>
