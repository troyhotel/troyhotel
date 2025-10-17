<template>
  <main class="main">
    <div class="privacy">
      <div class="container">
        <div class="privacy__inner">
          <section class="privacy__content">
            <h1 class="privacy__title">Согласие на обработку персональных данных</h1>
            <p class="privacy__text mb">
              Настоящим субъект персональных данных (посетитель сайта
              <a href="https://troy-hotel.ru" class="privacy__link"><strong>https://troy-hotel.ru</strong></a>),
              действуя свободно, своей волей и в своём интересе,
              подтверждая дееспособность, в соответствии со ст. 9 Федерального закона от 27.07.2006 № 152-ФЗ «О
              персональных данных», даёт согласие оператору –
              <strong>ООО «Деловой мир плюс»</strong> (ОГРН 1132651032986, ИНН 2632810356, адрес: Краснодар, ул.
              Примерная, д. 1) на обработку персональных данных на следующих условиях:
            </p>

            <ul class="privacy__list mb">
              <li class="privacy__item">
                1. Согласие дается на обработку следующих персональных данных: фамилия, имя, отчество, телефон, e-mail и
                иные сведения, которые субъект указывает по собственной инициативе через формы на сайте.
              </li>
              <li class="privacy__item">
                2. Обработка возможна с использованием средств автоматизации и без таковых.
              </li>
              <li class="privacy__item">
                3. Цели обработки: предоставление услуг отеля, обратная связь, информирование о новостях, акциях и
                специальных предложениях, заключение и исполнение договоров.
              </li>
              <li class="privacy__item">
                4. Согласие включает действия: сбор, запись, систематизация, хранение, уточнение, использование,
                передача, обезличивание, блокирование, удаление, уничтожение.
              </li>
              <li class="privacy__item">
                5. Разрешается использование интернет-статистики (cookies) для аналитики и улучшения сайта.
              </li>
              <li class="privacy__item">
                6. Согласие подтверждается проставлением галочки в форме заявки на сайте и нажатием кнопки «Отправить».
              </li>
              <li class="privacy__item">
                7. Срок действия согласия – 30 дней с даты предоставления. Отзыв возможен письменно на <a
                  href="mailto:info@troy-hotel.ru" class="privacy__link"><strong>info@troy-hotel.ru</strong></a>.
              </li>
              <li class="privacy__item">
                8. При отзыве согласия обработка может продолжаться при наличии оснований, указанных в законе.
              </li>
            </ul>

            <p class="privacy__text mb">
              Подтверждаю, что ознакомлен(а) с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных» и
              Политикой конфиденциальности сайта. Права и обязанности в области защиты персональных данных мне понятны.
            </p>
          </section>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useHead } from '#app'

useHead({
  title: 'Согласие на обработку персональных данных – Парк-отель «Троя»',
  meta: [
    {
      name: 'description',
      content: 'Подтвердите согласие на обработку персональных данных на сайте Парк-отеля «Троя». Узнайте, как мы защищаем и обрабатываем информацию гостей для бронирования, обратной связи и информирования о акциях.'
    },
    {
      name: 'keywords',
      content: 'Парк-отель Троя, согласие на обработку данных, персональные данные, защита информации, бронирование отеля, политика конфиденциальности'
    },
    {
      property: 'og:title',
      content: 'Согласие на обработку персональных данных – Парк-отель «Троя»'
    },
    {
      property: 'og:description',
      content: 'Подтверждение согласия на обработку персональных данных гостей Парк-отеля «Троя». Информация о защите и использовании данных для бронирования и акций.'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: 'https://troy-hotel.ru/consent'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://troy-hotel.ru/consent'
    }
  ]
})
</script>


<style scoped>
.privacy {}

.privacy__inner {
  border-radius: 60px;
  padding: 60px;
  background: var(--white);
}

.privacy__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;
}

.privacy__title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 4.8rem;
  line-height: 142%;
  text-align: center;
  color: var(--noble-black-600);
  margin-bottom: 2.5rem;
}

.privacy__subtitle {
  font-family: var(--second-family);
  font-weight: 500;
  line-height: 140%;
  color: var(--noble-black-600);
  margin-bottom: 1.5rem;
}

.privacy__text {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: var(--noble-black-600);
  margin-bottom: 2.5rem;
}

.privacy__contacts {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.privacy__list {
  list-style: disc;
  padding-left: 2.5rem;
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.privacy__item {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  color: var(--noble-black-600);
}

.privacy__link {
  color: var(--noble-black-600);
  text-decoration: underline;
}

.mb {
  margin-bottom: 2.5rem;
}

.mt {
  margin-top: 4rem;
  margin-bottom: 0rem !important;
}

strong {
  font-weight: 600;
}

@media (max-width: 1200px) {
  .privacy__title {
    font-size: 4rem;
  }
}

@media (max-width: 1100px) {
  .privacy__title {
    color: var(--noble-black-600);
  }
}

@media (max-width: 1024px) {
  .privacy__inner {
    padding: 45px;
  }
}

@media (max-width: 768px) {
  .privacy__inner {
    padding: 35px;
  }

  .privacy__title {
    font-size: 3.6rem;
  }
}

@media (max-width: 575px) {
  .privacy__inner {
    padding: 3rem 2rem;
    border-radius: 45px;
  }

  .privacy__title {
    text-align: center;
    font-size: 3rem;
  }
}

@media (max-width: 480px) {
  .privacy__title {
    font-size: 2.6rem;
  }

  .privacy__list {
    padding-left: 1.5rem;
  }
}
</style>