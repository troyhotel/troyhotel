<!-- components/CookieBanner.vue -->
<template>
  <transition name="fade">
    <div v-if="showBanner" class="cookie-banner">
      <div class="container">
        <div class="cookie-banner__inner">
          <!-- Левая часть: текст и ссылка -->
          <div class="cookie-left">
            <p class="cookie-text">Мы используем cookies для аналитики и улучшения работы сайта.</p>
            <p class="cookie-text">
              Подробнее в
              <NuxtLink to="/privacy" class="cookie-link">Политике конфиденциальности</NuxtLink>.
            </p>
          </div>

          <!-- Правая часть: кнопки -->
          <div class="cookie-right">
            <button class="cookie-btn reject" @click="rejectCookies">Отклонить</button>
            <button class="cookie-btn accept" @click="acceptCookies">Принять</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showBanner = ref(false)

const acceptCookies = () => {
  localStorage.setItem('cookiesAccepted', 'true')
  showBanner.value = false
}

const rejectCookies = () => {
  localStorage.setItem('cookiesAccepted', 'false')
  showBanner.value = false
}

onMounted(() => {
  if (!localStorage.getItem('cookiesAccepted')) {
    showBanner.value = true
  }
})
</script>

<style>
/* Плавное появление/скрытие */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Баннер */
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: var(--white);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.cookie-banner__inner {
  padding: 40px 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

/* Левая часть */
.cookie-left {
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1 1 60%;
}

.cookie-text {
  margin: 0;
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 16px;
  line-height: 1.5;
  color: var(--noble-black-600);
}

.cookie-link {
  color: #ffd700;
  text-decoration: underline;
}

/* Правая часть */
.cookie-right {
  display: flex;
  gap: 10px;
  flex: 0 0 auto;
}

/* Кнопки */
.cookie-btn {
  padding: 10px 20px;
  border-radius: 12px;
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  border: none;
}

/* Принять */
.cookie-btn.accept {
  background-color: #ffd700;
  color: #1a1a1a;
}

/* Отклонить */
.cookie-btn.reject {
  background: var(--noble-black-600);
  color: #fff;
}

/* Адаптивность */
@media (max-width: 600px) {
  .cookie-banner {
    flex-direction: column;
    text-align: center;
  }

  .cookie-right {
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }

  .cookie-btn {
    flex: 1 1 auto;
  }
}
</style>
