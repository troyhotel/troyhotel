<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__inner">

        <div class="footer__content">

          <div class="footer__brand">
            <div class="footer__logo">
              <img style="max-height: 90px;" src="/logo.png" alt="Парк-отель Троя логотип">
            </div>
          </div>

          <div class="footer__cont-extra-wrapper">
            <div class="footer__contacts">
              <h4 class="footer__title">Контакты</h4>
              <ul class="footer__list">
                <li class="footer__list-item">
                  <a href="tel:88005337525" class="footer__link">8 800 533 75 25</a>
                </li>
                <li class="footer__list-item">
                  <a href="tel:+79813333443" class="footer__link">8 981 333 34 43</a>
                </li>
                <li class="footer__list-item">
                  <a href="mailto:info@troy-hotel.ru" class="footer__link">info@troy-hotel.ru</a>
                </li>
                <li class="footer__list-item">Краснодар, ул. 1 Мая 131</li>
                <li class="footer__list-item">ООО «Деловой мир плюс»</li>
                <li class="footer__list-item">ИНН-2632810356</li>
                <li class="footer__list-item">КПП-231101001</li>
                <li class="footer__list-item">ОГРН-1132651032986</li>
              </ul>
            </div>
            <div class="footer__extra">
              <div class="footer__info">
                <div class="footer__item">
                  <span class="footer__item-title">Телефон</span>
                  <a href="tel:+79813333443" class="footer__item-text">+7 (981) 333-34-43</a>
                </div>
                <div class="footer__item">
                  <span class="footer__item-title">Почта</span>
                  <a href="mailto:info@troy-hotel.ru" class="footer__item-text">info@troy-hotel.ru</a>
                </div>
              </div>

              <div class="footer__partners">
                <h4 class="footer__subtitle">Наши партнёры</h4>
                <div class="footer__partners-list">
                  <img src="/home/advantages/hotel-recommend.jpg" alt="101 отель рекомендует"
                    class="footer__partner-logo">
                  <div class="footer__partner-map">
                    <img src="/home/advantages/yandex-badge.png" alt="Парк-отель Троя на Яндекс.Картах"
                      class="footer__partner-map-icon">
                    <div class="footer__partner-rating">
                      <div class="footer__partner-title">Хорошее место — 2025</div>
                      <div class="footer__partner-descr">Награда для любимых мест пользователей Яндекс карт</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="footer__bottom">
          <div class="footer__privacy">
            <NuxtLink class="footer__privacy-link" to="/privacy">Политика конфиденциальности</NuxtLink>
            <span class="footer__separator"></span>
            <NuxtLink class="footer__privacy-link" to="/consent">Согласие на обработку персональных данных</NuxtLink>
            <span class="footer__separator"></span>
            <div style="color: var(--noble-black-300);">
              Разработано
              <a class="footer__privacy-link" href="https://t.me/chernyshevskiii">Ильей Чернышевским</a>
            </div>
          </div>
        </div>


      </div>
    </div>
  </footer>
</template>


<script lang="ts" setup>

</script>

<style scoped>
/* Основной блок */
.footer {
  margin-top: 5rem;
  position: relative;
  background: var(--white);
  z-index: 0;
}

.footer__inner {
  border-radius: 60px;
  z-index: 0;
  overflow: hidden;
}

.footer__content {
  padding: 100px;
  display: flex;
  justify-content: space-between;
}

/* Бренд */
.footer__brand {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  max-width: 29rem;
  width: 100%;
}

.footer__logo img {
  /* max-height: 60px;
  width: auto; */
}

.footer__social {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.footer__social-link {}

.footer__social-link {}

/* Контакты */
.footer__contacts {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.footer__title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 22px;
  line-height: 100%;
  color: var(--noble-black-600);
}

.footer__list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer__list-item {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 100%;
  color: var(--noble-black-600);
  white-space: nowrap;
  -webkit-touch-callout: none;
  /* Отключает меню */
  -webkit-user-select: text;
  /* Позволяет выделять */
  -webkit-tap-highlight-color: transparent;
}

.footer__link {
  color: var(--noble-black-600);
}

.footer__link:hover {
  text-decoration: underline;
}

/* Дополнительная информация */
.footer__cont-extra-wrapper {
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 6rem;
}

.footer__extra {
  display: flex;
  flex-direction: column;
  gap: 5rem;
  max-width: 51.4rem;
}

.footer__info {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.footer__item {
  display: flex;
  flex-direction: column;
}

.footer__item-title {
  font-family: var(--second-family);
  font-weight: 350;
  font-size: 18px;
  line-height: 100%;
  color: var(--noble-black-300);
  margin-bottom: 1.3rem;
}

.footer__item-text {
  font-family: var(--second-family);
  font-weight: 350;
  font-size: 24px;
  line-height: 100%;
  text-transform: uppercase;
  color: var(--noble-black-600);
}

.footer__item-text:hover {
  text-decoration: underline;
}

/* Партнёры */
.footer__partners {}

.footer__subtitle {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 22px;
  line-height: 100%;
  color: var(--noble-black-600);
  margin-bottom: 3rem;
}

.footer__partners-list {
  display: flex;
  gap: 4.5rem;
}

.footer__partner-logo {
  border-radius: 15px;
  width: 120px;
  height: 120px;
}

.footer__partner-map {
  display: flex;
  align-items: center;
  gap: 2.4rem;
}

.footer__partner-map-icon {}

.footer__partner-rating {}

.footer__partner-title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 20px;
  line-height: 140%;
  color: var(--noble-black-600);
}

.footer__partner-descr {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 17px;
  line-height: 140%;
  color: var(--noble-black-300);
  min-width: 230px;
}

.footer__bottom {
  padding: 60px;
  display: flex;
  justify-content: center;
}

.footer__privacy {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1rem;
}

.footer__separator {
  width: 2px;
  height: 20px;
  background-color: #999;
  display: inline-block;
}

.footer__privacy-link {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  color: var(--noble-black-600);
  margin: 0 5px;
}

.footer__privacy-link:hover {
  text-decoration: underline;
}

@media (max-width: 1365.98px) {
  .footer__content {
    flex-direction: column;
    gap: 7rem
  }

  .footer__brand {
    flex-direction: row;
    max-width: none;
    justify-content: space-between;
  }
}

@media (max-width: 1300px) {
  .footer__privacy {
    flex-direction: column;
    gap: 2rem;
  }

  .footer__privacy-link {
    text-align: center;
  }

  .footer__separator {
    width: 60px;
    height: 2px;
  }
}

@media (max-width: 1100px) {
  .footer__cont-extra-wrapper {
    flex-direction: column;
  }

  .footer__partner-descr {
    min-width: auto;
  }
}

@media (max-width: 1023.98px) {
  .footer__content {
    padding: 70px;
  }
}

@media (max-width: 1023.98px) {
  .footer__partners-list {
    flex-direction: column;
  }

  .footer__partner-map {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer__partner-descr {
    max-width: 25rem;
  }
}

@media (max-width: 650px) {
  .footer__brand {
    flex-direction: column;
  }

  .footer__content {
    padding: 50px;
  }

  .footer__item-text {
    font-size: 22px;
  }
}

@media (max-width: 575px) {
  .footer__inner {
    border-radius: 45px;
  }

  .footer__content {
    padding: 4rem;
  }

  .footer__item-text {
    font-size: 2rem;
  }
}
</style>