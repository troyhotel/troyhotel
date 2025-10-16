<template>
  <section class="cta">
    <div class="container">
      <div class="cta__inner">
        <h2 class="cta__title">{{ title }}</h2>
        <p class="cta__text">{{ text }}</p>
        <button @click="$emit('click')" class="cta__button">{{ buttonText }}</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

defineProps<{
  title: string
  text: string
  buttonText: string
}>()
</script>

<style scoped>
.cta {}

.cta__inner {
  border-radius: 60px;
  padding: 115px;
  background: var(--white);
  text-align: center;
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
  margin: 0 auto;
  margin-bottom: 5.4rem;
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
