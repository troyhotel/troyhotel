<template>
  <header class="header" id="header">
    <div class="container">
      <div class="header__inner">
        <div class="header__logo-wrapper">
          <div class="header__logo">
            <NuxtLink class="header__logo-link" to="/">
              <img src="/logo.png" alt="Парк-отель Троя Краснодар">
            </NuxtLink>
          </div>
          <div class="header__address" itemscope itemtype="https://schema.org/PostalAddress">
            <span itemprop="addressLocality">Краснодар</span>,
            <span itemprop="streetAddress">ул. 1 мая, 131</span>
          </div>
        </div>

        <!-- Бургер -->
        <div class="header__nav-wrapper">
          <a class="header__telephone" href="tel:+79813333443">+7 (981) 333-34-43</a>

          <button class="header__burger" :class="{ 'active': menuOpen }" @click="toggleMenu">
            <span></span>
            <span></span>
            <span></span>
          </button>


          <nav class="header__menu menu" :class="{ 'is-open': menuOpen }">
            <ul class="menu__list">
              <li class="menu__list-item">
                <NuxtLink class="menu__list-item-link" to="/">Главная</NuxtLink>
              </li>
              <li class="menu__list-item">
                <NuxtLink class="menu__list-item-link" to="/rooms">Номера</NuxtLink>
              </li>
              <li class="menu__list-item">
                <NuxtLink class="menu__list-item-link" to="/spa">СПА</NuxtLink>
              </li>
              <li class="menu__list-item">
                <NuxtLink class="menu__list-item-link" to="/banquet">Банкеты</NuxtLink>
              </li>
              <li class="menu__list-item">
                <NuxtLink class="menu__list-item-link" to="/restaurant">Ресторан</NuxtLink>
              </li>
              <li class="menu__list-item">
                <NuxtLink class="menu__list-item-link" to="/conference">Конференции</NuxtLink>
              </li>
            </ul>
            <div class="header__info-about">
              <div class="header__address" itemscope itemtype="https://schema.org/PostalAddress">
                <span itemprop="addressLocality">Краснодар</span>,
                <span itemprop="streetAddress">ул. 1 мая, 131</span>
              </div>
              <a class="header__telephone" href="tel:+79813333443">+7 (981) 333-34-43</a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>


<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const menuOpen = ref(false)
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}

// Закрытие меню при клике вне
const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  const menu = document.querySelector('.header__menu')
  const burger = document.querySelector('.header__burger')

  if (menuOpen.value && menu && burger && !menu.contains(target) && !burger.contains(target)) {
    menuOpen.value = false
  }
}

// Закрытие меню при переходе по ссылке
const router = useRouter()
onMounted(() => {
  document.addEventListener('click', handleClickOutside)

  // Закрываем меню при каждом роуте
  router.afterEach(() => {
    menuOpen.value = false
  })
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>


<style>
.header {
  margin: 2.6rem 1.5rem 3rem 1.5rem;
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(254, 237, 236, 0.09);
  border-radius: 35px;
  padding: 15px 70px;
  background: var(--white);
  z-index: 10000;
  position: relative;
}

.header__logo-wrapper {
  display: flex;
  align-items: center;
  gap: 5rem;
}

.header__logo-link img {
  max-height: 60px;
  width: auto;
}

.header__nav-wrapper {
  position: relative;
  display: flex;
  gap: 4rem;
}

.header__nav-wrapper>.header__menu>.header__info-about>.header__address {
  display: none;
}

.header__nav-wrapper>.header__menu>.header__info-about>.header__telephone {
  display: none;
}

.header__address {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.01em;
  color: var(--noble-black-600);
}

.menu__list {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.menu__list-item {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.menu__list-item-link {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 16px;
  line-height: 111%;
  letter-spacing: 0.01em;
  color: var(--noble-black-600);
  border-radius: 12px;
  padding: 20px 12px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: color 0.3s ease;
}

.menu__list-item-link:hover {
  color: #f1de4e
}

.menu__list-item-link.active {
  background: #f5f6f8;
}

.header__telephone {
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.01em;
  color: var(--noble-black-600);
  transition: color 0.3s ease;
  text-decoration: none;
}

.header__telephone:hover {
  color: #b8860b;
}

.header__burger {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 32px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  position: relative;
  z-index: 10;
}

.header__burger span {
  display: block;
  height: 3px;
  width: 100%;
  background: #242742;
  border-radius: 2px;
  transition: all 0.3s ease;
  position: relative;
}

/* Анимация крестика */
.header__burger.active span:nth-child(1) {
  animation: top 0.7s forwards;
}

.header__burger.active span:nth-child(2) {
  animation: scaled 0.7s forwards;
}

.header__burger.active span:nth-child(3) {
  animation: bottom 0.7s forwards;
}

.header__burger:not(.active) span:nth-child(1) {
  animation: top-2 0.7s forwards;
}

.header__burger:not(.active) span:nth-child(2) {
  animation: scaled-2 0.7s forwards;
}

.header__burger:not(.active) span:nth-child(3) {
  animation: bottom-2 0.7s forwards;
}

/* keyframes для новых размеров */
@keyframes top {
  0% {
    top: 0;
    transform: rotate(0);
  }

  50% {
    top: 11px;
    transform: rotate(0);
  }

  100% {
    top: 11px;
    transform: rotate(45deg);
  }
}

@keyframes top-2 {
  0% {
    top: 11px;
    transform: rotate(45deg);
  }

  50% {
    top: 11px;
    transform: rotate(0);
  }

  100% {
    top: 0;
    transform: rotate(0);
  }
}

@keyframes bottom {
  0% {
    bottom: 0;
    transform: rotate(0);
  }

  50% {
    bottom: 10px;
    transform: rotate(0);
  }

  100% {
    bottom: 10px;
    transform: rotate(-45deg);
  }
}

@keyframes bottom-2 {
  0% {
    bottom: 10px;
    transform: rotate(-45deg);
  }

  50% {
    bottom: 10px;
    transform: rotate(0);
  }

  100% {
    bottom: 0;
    transform: rotate(0);
  }
}

@keyframes scaled {
  50% {
    transform: scale(0);
  }

  100% {
    transform: scale(0);
  }
}

@keyframes scaled-2 {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

.header__info-about {
  padding: 2rem;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  display: none;
}

.header__burger {
  display: flex;
}

.header__menu {
  display: flex;
  transition: max-height 0.3s ease, opacity 0.3s ease;
  position: absolute;
  top: 200%;
  right: 0;
  background: #fff;
  flex-direction: column;
  gap: 0;
  border-radius: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  opacity: 0;
  width: max-content;
  min-width: 200px;
  pointer-events: none;
}

.header__menu.is-open {
  opacity: 1;
  pointer-events: all;
}


@media (max-width: 920px) {
  .header__info-about {
    display: flex;
  }

  .header__logo-wrapper>.header__address {
    display: none;
  }

  .header__nav-wrapper>.header__telephone {
    display: none;
  }

  .header__nav-wrapper>.header__menu>.header__info-about>.header__address {
    display: block;
  }

  .header__nav-wrapper>.header__menu>.header__info-about>.header__telephone {
    display: block;
  }
}

@media (max-width: 768px) {
  .header__inner {
    padding: 15px 45px;
  }
}

@media (max-width: 575px) {
  .header__inner {
    padding: 15px 25px;
  }
}

@media (max-width: 400px) {
  .header {
    margin: 2.6rem 0rem 3rem 0rem;
  }
}
</style>
