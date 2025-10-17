<template>
  <main class="main">
    <Hero title="Ваш праздник — в лучших традициях гостеприимства"
      subtitle="Свадьбы, юбилеи, корпоративы — с атмосферой, о которой говорят ещё долго." pageName="банкетный зал"
      image="/banquet/XXXL1.jpg" @open-modal="isModalOpenBanquetPrice = true" :showBookingButton="true"
      bookingButtonText="Заказать банкет" align="center" />

    <section class="banquet">
      <div class="container">
        <div class="banquet__inner">

          <!-- Текстовая часть -->
          <div class="banquet__text">
            <h2 class="banquet__title title" itemprop="name">Банкетный зал и ресторан «Свои Люди»</h2>

            <div class="banquet__description" itemprop="description">
              <p>Банкетный зал и ресторан «Свои Люди» — идеальное место для торжеств любого формата: от камерных
                семейных вечеров до роскошных банкетов до 65 гостей.</p>
              <p>Профессиональная команда поможет учесть каждую деталь — от меню до оформления зала. Мы знаем, как
                сделать так, чтобы ваше событие оставило тёплые воспоминания у всех гостей.</p>
            </div>
          </div>

          <!-- Видео часть -->
          <div class="banquet__video">
            <PlayerVideo style="max-width: 66rem; height: 31rem; border-radius: 3.5rem;" :src="videoSrc" />
          </div>

        </div>
      </div>
    </section>

    <section class="celebration-list">
      <div class="container">
        <div class="celebration-list__inner">
          <div v-for="(item, index) in celebrations" :key="index" class="celebration-list__item">
            <div class="celebration-list__image">
              <FullscreenImage :src="item.img" :alt="item.title" />
            </div>

            <div class="celebration-list__content">
              <h3 class="celebration-list__title title" itemprop="name">{{ item.title }}</h3>
              <div class="celebration-list__description" itemprop="description">
                <p v-for="(text, i) in item.description" :key="i">{{ text }}</p>
              </div>

              <ul class="celebration-list__features">
                <li v-for="(feature, i) in item.features" :key="i">
                  <div class="celebration-list__icon-wrapper">
                    <svg class="celebration-list__icon" aria-hidden="true">
                      <use :xlink:href="`/svg/icons/inlineSprite.svg#check`" />
                    </svg>
                  </div>
                  {{ feature.text }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="events">
      <div class="container">
        <div class="events__inner">
          <h2 class="events__main-title title">Под какие события подходит зал</h2>
          <div class="events__list">
            <div v-for="(item, index) in events" :key="index" :class="[
              'events__item',
              {
                'events__item--second': index === 1,   // второй айтем
                'events__item--fourth': index === 3,   // четвёртый айтем
                'events__item--fifth': index === 4     // пятый айтем
              }
            ]">

              <div v-if="item.images" class="events__images">
                <img v-for="(img, i) in item.images" :key="i" :src="img" :alt="item.title" class="events__image" />
              </div>
              <div class="events__content">
                <h3 class="events__title">{{ item.title }}</h3>
                <div class="events__description">
                  <p v-for="(text, i) in item.description" :key="i">{{ text }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="banquet-service">
      <div class="container">
        <div class="banquet-service__inner-row">

          <div class="banquet-service__header">
            <h2 class="banquet-service__title title" itemprop="name">{{ BanquetService.title }}</h2>
            <div class="banquet-service__block-text">
              <div class="banquet-service__description" itemprop="description">
                <p v-for="(item, i) in BanquetService.description" :key="i">
                  <strong v-if="item.strong">{{ item.text }}</strong>
                  <span v-else>{{ item.text }}</span>
                </p>
              </div>
              <div class="banquet-service__buttons">
                <Button custom-class="banquet-service__button" color="yellow" size="large"
                  @click="isModalOpenBanquetPrice = true" label="Заказать банкет" />
                <Button custom-class="banquet-service__button" color="black" size="large" tag="a"
                  href="https://api.whatsapp.com/send/?phone=79933037525& text=Добрый день! Хочу заказть банкет на &amp;type=phone_number&amp;app_absent=0"
                  label="Задать вопрос" />
              </div>
            </div>
          </div>

          <div class="banquet-service__content-title title">Что входит:</div>

          <div class="banquet-service__content">
            <!-- Левый блок -->
            <div class="banquet-service__column banquet-service__column--left">
              <div v-for="(item, index) in leftItems" :key="index" class="banquet-service__item">
                <div class="banquet-service__number">{{ item.number }}</div>
                <h3 class="banquet-service__subtitle">{{ item.title }}</h3>
                <p class="banquet-service__text">{{ item.description }}</p>
              </div>
            </div>

            <!-- Центральное видео -->
            <div class="banquet-service__column banquet-service__column--center">
              <!-- <PlayerVideo :src="videoSrc" class="banquet-service__video" /> -->
                <FullscreenImage src="/banquet/banquet-service.jpg" alt="брачный венок" class="banquet-service__column-image banquet-service__video " />
            </div>

            <!-- Правый блок -->
            <div class="banquet-service__column banquet-service__column--right">
              <div v-for="(item, index) in rightItems" :key="index" class="banquet-service__item">
                <div class="banquet-service__number">{{ item.number }}</div>
                <h3 class="banquet-service__subtitle">{{ item.title }}</h3>
                <p class="banquet-service__text">{{ item.description }}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <RestaurantMenu :menuData="BanquetMenu" />

    <Cta title="Остались вопросы?"
      text="Мы с удовольствием всё покажем, расскажем и подберём идеальный формат именно под ваше мероприятие."
      button-text="Задать вопрос" @click="isModalOpen = true" />

    <ModalFeedback v-model:show="isModalOpen" title="Остались вопросы?"
      subtitle="Задайте их, и мы обязательно вам ответим" :enableQuestion="true" @submit="handleSubmit" />

    <ModalFeedback v-model:show="isModalOpenBanquetPrice" title="Хотите заказать банкет?"
      subtitle="Оставьте свои контакты, и мы свяжемся с вами для расчета стоимости банкета"
      questionLabel="Количество людей и дата" :enableQuestion="true" @submit="handleSubmitBanquetPrice" />

  </main>
</template>

<script lang="ts" setup>
import Button from '~/components/ui/VButton.vue'
import Cta from '~/components/Cta.vue'
import RestaurantMenu from '~/components/page/RestaurantMenu.vue'
import PlayerVideo from '~/components/ui/PlayerVideo.vue'
import FullscreenImage from '~/components/FullScreenImage.vue'
import ModalFeedback from '~/components/ModalFeedback.vue';
const videoSrc = '/spa/sample-5s.mp4'  // путь к вашему видео

const isModalOpen = ref(false);
const isModalOpenBanquetPrice = ref(false);

const handleSubmit = async (data: { name: string; phone: string; question?: string }) => {
  const res = await $fetch("/api/mail", {
    method: "POST",
    body: {
      type: "feedback",
      form: data,
    },
  })

  console.log("Ответ сервера:", res)
}

const handleSubmitBanquetPrice = async (data: { name: string; phone: string; question?: string }) => {
  const res = await $fetch("/api/mail", {
    method: "POST",
    body: {
      type: "banquet-price",
      form: data,
    },
  })

  console.log("Ответ сервера:", res)
}

interface Feature {
  text: string
}

interface Celebration {
  img: string
  title: string
  description: string[]
  features: Feature[]
}

const celebrations: Celebration[] = [
  {
    img: "/banquet/celebration-1.jpg",
    title: "Ваш идеальный банкет — здесь и сейчас",
    description: [
      "Каждое событие мы превращаем в атмосферу праздника: от изысканной сервировки до задумок, отражающих вашу историю.",
      "Организуем торжество «под ключ», создаём комфорт, стиль и настроение, о которых будут говорить гости."
    ],
    features: [
      {
        text: "До 80 гостей"
      }, {
        text: "Номер в подарок"
      }, {
        text: "Современное световое и звуковое оборудование"
      }, {
        text: "Организация «под ключ»"
      }, {
        text: "Скидка 10% на проживание"
      }, {
        text: "Любой формат — свадьба, юбилей, корпоратив"
      },
    ]
  },
  // сюда можно добавить ещё блоки
]


interface EventItem {
  title: string
  description: string[]
  images?: string[]
}

// Объединяем все айтемы в один массив
const events: EventItem[] = [
  { title: "Свадьбы и выездные регистрации", description: ["Красивые истории любви с трогательной атмосферой и идеальным оформлением"], images: ["/banquet/event-1.jpg"] },
  { title: "Юбилеи и семейные торжества", description: ["Уютные праздники для самых родных — со вкусом, теплом и заботой"], images: ["/banquet/event-2.jpg"] },
  { title: "Деловые встречи и вечера для партнеров", description: ["Престижное пространство для делового общения и укрепления связей"], images: ["/banquet/event-3.jpg"] },
  { title: "Фуршеты и дни рождения", description: ["Неформальные встречи с лёгкой подачей, живым настроением и вкусными блюдами"], images: ["/banquet/event-4a.jpg", "/banquet/event-4b.jpg"] },
  { title: "Корпоративы и новогодние вечера", description: ["Яркие события, которые сплачивают команду и создают настроение"] }
]

interface BanquetItem {
  number: string
  title: string
  description: string
}

const BanquetService = {
  title: 'Организация банкета под ключ',
  description: [
    { text: 'Праздник без сюрпризов — понятные пакеты и личный менеджер от заявки до финального тоста.', strong: true },
    { text: 'Мы берем на себя всё: от подбора ведущего, DJ, флориста и кондитера — до светового оформления и развлекательной программы. Ваш персональный менеджер всегда на связи и сопровождает банкет на каждом этапе.', strong: false }
  ]
}

// Левая колонка
const leftItems: BanquetItem[] = [
  { number: '1', title: 'Индивидуальное меню и фиксированная стоимость после бронирования', description: 'Заранее согласованное меню под формат события' },
  { number: '2', title: 'Световое, проекционное и звуковое оборудование', description: 'Свет, звук и проектор для яркой и комфортной атмосферы.' },
  { number: '3', title: 'Ведущий и DJ (по желанию)', description: 'При желании организуем музыку и программу вечера.' },
]

// Правая колонка
const rightItems: BanquetItem[] = [
  { number: '4', title: 'Развлекательная программа', description: 'Сценарий под формат мероприятия и аудиторию.' },
  { number: '5', title: 'Персональный куратор мероприятия', description: 'Один менеджер сопровождает мероприятие от начала до конца.' },
  { number: '6', title: 'Флористика и декор', description: 'Оформление зала с учётом стиля и тематики события.' },
]

const BanquetMenu = {
  title: 'Меню из ресторана “Свои Люди”',
  dishes: [
    {
      type: 'big' as const,
      img: '/banquet/banquet-menu-1.jpg',
      title: 'Горячая сковородка со свининой',
      description: 'Свиная шея, баклажан, томаты, болгарский перец, картофель, лук, шампиньоны'
    },
    {
      type: 'small' as const,
      img: '/banquet/banquet-menu-2.jpg',
      title: 'Горячая сковородка с цыпленком',
      description: 'Куриное филе, баклажан, томаты, болгарский перец, картофель, лук, шампиньоны.'
    },
    {
      type: 'small' as const,
      img: '/banquet/banquet-menu-3.jpg',
      title: 'Том Ям с морепродуктами',
      description: 'Креветки, мидии, кальмар, паста Том Ям, шампьоны, рис, долька лайма'
    },
    {
      type: 'small' as const,
      img: '/banquet/banquet-menu-4.jpg',
      title: 'Стейк-салат',
      description: 'Нежная телятина, руккола, микс салата, вяленые томаты, пармезан, оливково-горчичная перечная заправка'
    },
    {
      type: 'small' as const,
      img: '/banquet/banquet-menu-5.jpg',
      title: 'Сырное мороженое',
      description: 'Сыр творожный, сливки, яйца, орех грецкий,, мята'
    }
  ]
}

useHead({
  title: 'Банкетный зал Парк-отеля «Троя» – свадьбы, юбилеи, корпоративы',
  meta: [
    {
      name: 'description',
      content: 'Банкетный зал и ресторан «Свои Люди» в Парк-отеле «Троя» – идеальное место для свадеб, юбилеев, корпоративов и частных торжеств до 65 гостей. Организация «под ключ», индивидуальное меню, декор, ведущий и музыкальное сопровождение.'
    },
    {
      name: 'keywords',
      content: 'банкетный зал Троя, свадьбы, юбилеи, корпоративы, торжества, ресторан, организация банкета, меню, флористика, ведущий, DJ'
    },
    {
      property: 'og:title',
      content: 'Банкетный зал Парк-отеля «Троя» – свадьбы, юбилеи, корпоративы'
    },
    {
      property: 'og:description',
      content: 'Проведите незабываемый банкет в парк-отеле «Троя»: индивидуальное меню, декор, персональный менеджер, развлекательная программа и комфортная атмосфера для гостей.'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: 'https://troy-hotel.ru/banquet'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://troy-hotel.ru/banquet'
    }
  ]
})
</script>

<style scoped>
.banquet__inner {
  display: flex;
  gap: 4rem;
  align-items: flex-start;
  flex-wrap: wrap;
  border-radius: 60px;
  padding: 40px;
  background: var(--white);
}

.banquet__text {
  flex: 1 1 62rem;
}

.banquet__title {
  font-family: var(--second-family);
  font-weight: 500;
  line-height: 140%;
  color: var(--noble-black-600);
  margin-bottom: 1rem;
}

.banquet__description {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 1.8rem;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: var(--noble-black-600);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.banquet__video {
  flex: 1 1 66rem;
}

@media (max-width: 768px) {
  .banquet__inner {
    padding: 3rem;
  }
}

@media (max-width: 575px) {
  .banquet__inner {
    padding: 3rem 2rem;
    border-radius: 4.5rem;
  }
}

.celebration-list__inner {
  padding: 0px 40px;
}

.celebration-list__item {
  display: flex;
  gap: 4rem;
  margin-bottom: 6rem;
  flex-wrap: wrap;
}

.celebration-list__image {
  flex: 1 1 60rem;
  display: flex;
  align-items: center;
  justify-content: center;
  /* минимальная ширина 40rem */
}

.celebration-list__image img {
  width: 100%;
  height: auto;
  border-radius: 4.5rem;
  display: block;
  max-width: 69.5rem;
}

.celebration-list__content {
  flex: 1 1 50rem;
  /* минимальная ширина 50rem */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.celebration-list__title {
  font-family: var(--second-family);
  font-weight: 500;
  line-height: 140%;
  color: var(--noble-black-600);
  margin-bottom: 1.5rem;
}

.celebration-list__description {
  margin-bottom: 4rem;
}

.celebration-list__description p {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 1.8rem;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: var(--noble-black-600);
}

.celebration-list__features {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.celebration-list__features li {
  display: flex;
  align-items: center;
  border-radius: 15px;
  padding: 15px 20px;
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 1.8rem;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: var(--noble-black-600);
  background: var(--white);
  gap: 2.5rem;
}

.celebration-list__icon-wrapper {
  border-radius: 69px;
  min-width: 3.6rem;
  height: 3.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fbec78;
  flex-shrink: 0;
}

.celebration-list__icon {
  width: 1.6rem;
  height: 1.6rem;
  stroke: var(--noble-black-600);
}

@media (max-width: 1270px) {
  .celebration-list__item {
    flex-direction: column;
  }
}

@media (max-width: 1024px) {
  .celebration-list__item {
    flex-direction: column;
    /* картинка сверху, контент снизу */
    margin-bottom: 4rem;
  }

  .celebration-list__image,
  .celebration-list__content {
    flex: 1 1 100%;
  }
}

@media (max-width: 768px) {
  .celebration-list__inner {
    padding: 3rem 2rem;
  }

  .celebration-list__item {
    gap: 1.5rem;
  }

}

@media (max-width: 575px) {
  .celebration-list__inner {
    padding: 2rem 1rem;
  }

}

@media (max-width: 480px) {
  .celebration-list__inner {
    padding: 1rem;
  }

  .celebration-list__features li {
    padding: 15px 15px;
  }

  .celebration-list__icon-wrapper {
    width: 3rem;
    height: 3rem;
    min-width: 3rem;
  }
}


.events__inner {
  padding: 0px 40px;
}

.events__main-title {
  font-family: var(--second-family);
  font-weight: 500;
  line-height: 140%;
  letter-spacing: 0em;
  color: var(--noble-black-600);
  margin-bottom: 4rem;
}

.events__list {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

/* Десктоп: схема 1–2–1 + 50/50 */
.events__item:nth-child(1),
.events__item:nth-child(3) {
  flex: 1 1 24%;
  min-width: 250px;
}

.events__item:nth-child(2) {
  flex: 1 1 43%;
  min-width: 300px;
}

.events__item:nth-child(4),
.events__item:nth-child(5) {
  flex: 1 1 calc(50% - 1rem);
  min-width: 300px;
}

.events__item--second>.events__content>.events__title {
  font-size: 2.4rem;
}

.events__item--fourth>.events__content>.events__title {
  font-size: 2.4rem;
}

.events__item--fifth>.events__content>.events__title {
  font-size: 3.2rem;
}

.events__item--fifth>.events__content>.events__description p {
  font-size: 2rem;
}

/* Общий стиль карточки */
.events__item {
  border-radius: 45px;
  padding: 37px;
  background: var(--white);
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
}

.events__item--fifth {
  justify-content: center;
}

/* изображения */
.events__images {
  display: flex;
  gap: 1rem;
  margin-top: 3rem;
  align-items: stretch;
  height: 100%;
}

.events__image {
  flex: 1 1 0;
  min-width: 0;
  width: 100%;
  height: 100%;
  height: auto;
  /* сохраняет пропорции */
  object-fit: cover;
  border-radius: 45px;
  display: block;
}

.events__content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.events__title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 2rem;
  line-height: 140%;
  margin-bottom: 1rem;
  color: var(--noble-black-600);
}

.events__description p {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 1.8rem;
  line-height: 150%;
  color: var(--noble-black-600);
}

/* адаптив */
@media (max-width: 1200px) {
  .events__list {
    column-count: 2;
    /* кол-во колонок */
    column-gap: 2rem;
    /* расстояние между ними */
    display: inline-block;
    /* ключ для column */
  }

  .events__item {
    width: 100%;
    margin-bottom: 2rem;
    break-inside: avoid;
    /* предотвращает разрыв карточек */
  }
}


@media (max-width: 1024px) {
  .events__item--fifth>.events__content>.events__title {
    font-size: 2.7rem;
  }
}

@media (max-width: 980px) {
  .events__images {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .events__inner {
    padding: 3rem 2rem;
  }

  .events__list {
    column-count: 1;
  }

  .events__images {
    flex-direction: row;
  }
}

@media (max-width: 575px) {
  .events__inner {
    padding: 2rem 1rem;
  }

  .events__main-title {
    text-align: center;
  }

  .events__images {
    flex-direction: column;
  }

  .events__item:nth-child(1),
  .events__item:nth-child(3) {
    flex: auto;
    min-width: auto;
  }

  .events__item:nth-child(2) {
    flex: auto;
    min-width: auto;
  }

  .events__item:nth-child(4),
  .events__item:nth-child(5) {
    flex: auto;
    min-width: auto;
  }

  .events__item--second>.events__content>.events__title {
    font-size: 2rem;
  }

  .events__item--fourth>.events__content>.events__title {
    font-size: 2rem;
  }

  .events__item--fifth>.events__content>.events__title {
    font-size: 2.4rem;
  }

  .events__item--fifth>.events__content>.events__description p {
    font-size: 1.8rem;
  }

}

@media (max-width: 480px) {
  .events__inner {
    padding: 1rem 0;
  }

  .events__item--fifth>.events__content>.events__title {
    font-size: 2.2rem;
  }

  .events__item {
    padding: 30px 25px;
  }
}

@media (max-width: 400px) {
  .events__item {
    border-radius: 3.5rem;
  }
}


/* Основной ряд */
.banquet-service__inner-row {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  background: var(--white);
  border-radius: 60px;
  padding: 40px;
}

.banquet-service__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 7.5rem;
}

.banquet-service__title {
  font-family: var(--second-family);
  font-weight: 500;
  line-height: 140%;
  letter-spacing: 0em;
  color: var(--noble-black-600);
  flex: 1 1 50%;
}

.banquet-service__block-text {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  flex: 1 1 50%;
}

.banquet-service__description {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: var(--noble-black-600);
}

.banquet-service__description>p>strong {
  font-weight: 500;
}

.banquet-service__buttons {
  display: flex;
  gap: 2.5rem;
}

.banquet-service__button {
  max-width: 25rem !important;
}

/* Колонки */
.banquet-service__content {
  display: grid;
  grid-template-areas:
    "left center right";
  grid-template-columns: 1fr auto 1fr;
  gap: 3rem;
  align-items: start;
}


.banquet-service__content-title {
  font-family: var(--second-family);
  font-weight: 500;
  line-height: 131%;
  text-align: center;
  color: #1d1c20;
  margin-top: 2rem;
}

.banquet-service__column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3.2rem;
}


.banquet-service__column--left {
  grid-area: left;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
}

.banquet-service__column--center {
  grid-area: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.banquet-service__column-image {
  object-fit: cover;
}

.banquet-service__column--right {
  grid-area: right;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
}

.banquet-service__video {
  width: 100% !important;
  max-width: 37rem !important;
  height: 100% !important;
  max-height: 57.4rem !important;
  border-radius: 4.5rem !important;
}

/* Стили айтемов */
.banquet-service__item {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.banquet-service__number {
  font-family: var(--font6);
  font-weight: 600;
  font-size: 20px;
  line-height: 150%;
  letter-spacing: -0.02em;
  text-align: center;
  color: var(--noble-black-600);
  width: 48px;
  height: 48px;
  background: #fbec78;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.6rem;
}

.banquet-service__subtitle {
  margin-bottom: 0.5rem;
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 20px;
  line-height: 150%;
  text-align: center;
  color: #2a3342;
  margin-bottom: 0.8rem;
}

.banquet-service__text {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 133%;
  text-align: center;
  color: #556987;
}

@media (max-width: 1200px) {
  .banquet-service__content {
    grid-template-areas:
      "left"
      "right"
      "center";
    grid-template-columns: 1fr;
  }

  .banquet-service__column--left,
  .banquet-service__column--right {
    flex-direction: row;
  }

  .banquet-service__item {
    width: 100%;
  }

  .banquet-service__video {
    max-width: none !important;
  }

  .banquet-service__title {
    flex: 1 1 40%;
  }
}

@media (max-width: 1024px) {
  .banquet-service__header {
    align-items: normal;
    gap: 3.5rem;
    flex-direction: column;
  }

  .banquet-service__content {
    grid-template-areas:
      "left right"
      "center center";
    grid-template-columns: 1fr 1fr;
  }

  .banquet-service__column--left,
  .banquet-service__column--right {
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
  }
}

@media (max-width: 768px) {
  .banquet-service__inner-row {
    padding: 3rem;
  }

  .banquet-service__content {
    grid-template-areas:
      "left"
      "right"
      "center";
    grid-template-columns: 1fr;
  }

  .banquet-service__item {
    padding: 1rem;
  }
}

@media (max-width: 575px) {
  .banquet-service__inner-row {
    border-radius: 4.5rem;
    padding: 3rem 2rem;
  }
}

@media (max-width: 480px) {
  .banquet-service__inner-row {
    border-radius: 3rem;
  }
}
</style>