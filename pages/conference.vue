<template>
  <main class="main">
    <Hero title="Пространство для идей, решений и роста"
      subtitle="Современный конференц-зал в парк-отеле «Троя» для деловых мероприятий любого уровня"
      pageName="Конференции" image="/conference/XXXL1.jpg" @open-modal="isModalOpen = true" :showBookingButton="true"
      bookingButtonText="Заказать зал" align="center" />


    <section class="conference">
      <div class="container">
        <div class="conference__inner">
          <div class="conference__intro">
            <div class="conference__gallery">
              <FullscreenImage src="/conference/conference-1.png" alt="Конференц-зал парк-отеля Троя — вид с проектором"
                class="conference__image" />
              <ClientOnly>
                <swiper-container ref="conferenceRef" :init="false" class="conference__slider">
                  <swiper-slide v-for="(item, idx) in items" :key="idx" class="conference__slide">
                    <FullscreenImage class="conference__image" :src="item.image" :alt="item.alt" loading="lazy" />
                  </swiper-slide>
                </swiper-container>
              </ClientOnly>
            </div>

            <div class="conference__content">
              <h2 class="conference__title title">Организуете деловую встречу, тренинг или презентацию?</h2>
              <p class="conference__text">
                Конференц-зал парк-отеля «Троя» оснащён всем необходимым для продуктивных мероприятий до 50 гостей —
                просторно, светло, современно.
              </p>

              <div class="conference__equipment">
                <h3 class="conference__subtitle">В зале всё уже готово:</h3>
                <ul class="conference__list">
                  <li class="conference__item">Проектор и большой экран</li>
                  <li class="conference__item">Акустическая система и микрофоны</li>
                  <li class="conference__item">Магнитная доска, лазерная указка</li>
                  <li class="conference__item">Бутылированная вода для участников</li>
                  <li class="conference__item">Ноутбук, принтер, сканер</li>
                  <li class="conference__item">Блокнот и ручка каждому участнику</li>
                  <li class="conference__item">Парковка (количество мест ограничено)</li>
                </ul>
              </div>

              <p class="conference__text1">
                Помещение легко адаптируется под нужный формат — от переговоров до конференций, а команда «Троя»
                берёт на себя все организационные вопросы.
              </p>
            </div>
          </div>

          <div class="conference__seating">
            <div class="conference__seating-info">
              <h3 class="conference__subtitle">Форматы рассадки:</h3>
              <ul class="conference__list">
                <li class="conference__item">Театр — максимальная вместимость, идеально для презентаций</li>
                <li class="conference__item">Класс — комфорт для обучения и мастер-классов</li>
                <li class="conference__item">Box — вариант для групповой работы и дискуссий</li>
                <li class="conference__item">П-форма — для встреч и обсуждений лицом к лицу</li>
              </ul>
              <Button @click="isModalOpenConferencePrice = true" custom-class="conference__button" color="yellow" size="large"
                label="Узнать стоимость" />
            </div>

            <div class="conference__seating-image">
              <!-- основное изображение -->
              <img :src="`/conference/conference-seating.jpg`" alt="Форматы рассадки в конференц-зале парк-отеля Троя"
                class="conference__image main-image">

              <!-- переборка без лишнего div -->
              <template v-for="(item, idx) in seatingImg" :key="idx">
                <img class="conference__image extra-image" :src="item.image" :alt="item.alt" loading="lazy" />
              </template>
            </div>
          </div>

        </div>
      </div>
    </section>

    <section class="conference-events">
      <div class="container">
        <div class="conference-events__inner">
          <h2 class="conference-events__title title">Для каких событий подходит конференц-зал</h2>

          <div class="conference-events__items">
            <article class="conference-events__item" v-for="(event, idx) in events" :key="idx" itemscope
              itemtype="https://schema.org/Event">
              <img class="conference-events__icon" :src="event.icon" :alt="event.title" itemprop="image" />

              <h3 class="conference-events__subtitle" itemprop="name">{{ event.title }}</h3>
              <p class="conference-events__description" itemprop="description">{{ event.description }}</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="conference-extra">
      <div class="conference-extra__container container">
        <div class="conference-extra__inner">

          <!-- Вступительный блок -->
          <div class="conference-extra__intro">
            <div class="conference-extra__text">
              <h2 class="conference-extra__title title">Вы получаете больше, чем просто зал</h2>
              <p class="conference-extra__description">
                Организационная команда «Троя» сопровождает мероприятие на каждом этапе — от заявки до фуршета,
                предоставляя дополнительные пространства и сервисы отеля.
              </p>
              <Button @click="isModalOpenConferencePrice = true" custom-class="conference-extra__button" color="yellow" size="large"
                label="Узнать стоимость" />
            </div>

            <div class="conference-extra__image-wrapper">
              <!-- <div class="conference-extra__image-bg"></div> -->
              <FullscreenImage src="/conference/conference-extra.jpg" alt="Дополнительные сервисы конференц-зала Троя"
                class="conference-extra__image" />
            </div>
          </div>


          <!-- Перечень дополнительных опций -->
          <div class="conference-extra__items">
            <article class="conference-extra__item" v-for="(item, idx) in extraItems" :key="idx" itemscope
              itemtype="https://schema.org/Service">
              <span class="conference-extra__item-number" itemprop="position">{{ item.number }}</span>
              <h3 class="conference-extra__item-subtitle" itemprop="name">{{ item.title }}</h3>
              <p class="conference-extra__item-text" itemprop="description">{{ item.description }}</p>
            </article>
          </div>

        </div>
      </div>
    </section>

    <Cta title="Хотите узнать стоимость и свободные даты?"
      text="Оставьте заявку или позвоните — наш менеджер свяжется с вами в ближайшее время."
      @click="isModalOpenQuestion = true"
      button-text="Узнать стоимость" />

    <ModalFeedback v-model:show="isModalOpen" title="Хотите заказать зал?"
      subtitle="Оставьте свои контакты, и мы свяжемся с вами для расчета стоимости зала"
      questionLabel="Количество людей и дата" :enableQuestion="true" @submit="handleSubmit" />

    <ModalFeedback v-model:show="isModalOpenConferencePrice" title="Хотите заказать зал?"
      subtitle="Оставьте свои контакты и количество людей, и мы свяжемся с вами для расчета стоимости конфернционного зала"
      questionLabel="Количество людей и дата" :enableQuestion="true" @submit="handleSubmitConferencePrice" />

    <ModalFeedback v-model:show="isModalOpenQuestion" title="Остались вопросы?"
      subtitle="Задайте их, и мы обязательно вам ответим" :enableQuestion="true" @submit="handleSubmitQuestion" />


  </main>
</template>

<script lang="ts" setup>
import Button from '~/components/ui/VButton.vue'
import FullscreenImage from '~/components/FullScreenImage.vue'
import Cta from '~/components/Cta.vue'
import ModalFeedback from '~/components/ModalFeedback.vue';

const isModalOpen = ref(false);
const isModalOpenQuestion = ref(false);
const isModalOpenConferencePrice = ref(false);

const handleSubmit = async (data: { name: string; phone: string; question?: string }) => {
  const res = await $fetch("/api/mail", {
    method: "POST",
    body: {
      type: "conference",
      form: data,
    },
  })

  console.log("Ответ сервера:", res)
}

const handleSubmitConferencePrice = async (data: { name: string; phone: string; question?: string }) => {
  const res = await $fetch("/api/mail", {
    method: "POST",
    body: {
      type: "conference-price",
      form: data,
    },
  })

  console.log("Ответ сервера:", res)
}


const handleSubmitQuestion = async (data: { name: string; phone: string; question?: string }) => {
  const res = await $fetch("/api/mail", {
    method: "POST",
    body: {
      type: "feedback",
      form: data,
    },
  })

  console.log("Ответ сервера:", res)
}

const conferenceRef = ref(null)
const swiper = useSwiper(conferenceRef, {
  effect: "slide",
  slidesPerView: 1.5,
  spaceBetween: 30,
  breakpoints: {
    1300: { slidesPerView: 3.5 },
    950: { slidesPerView: 2.5 },
    768: { slidesPerView: 2.5 },
    400: {
      slidesPerView: 1.5,
      spaceBetween: 15,
    },
    0: {
      slidesPerView: 1.2,
      spaceBetween: 15,
    },
  },
})

onMounted(() => {
  console.log(swiper.instance)
})

const seatingImg = ref([
  {
    image: "/conference/conference-seating-2.jpg",
    alt: "Конференц-зал парк-отеля Троя — вид с проектором",
  },
  {
    image: "/conference/conference-seating-3.jpg",
    alt: "Современное оборудование конференц-зала Троя",
  },
  {
    image: "/conference/conference-seating-4.jpg",
    alt: "Просторный интерьер конференц-зала Троя",
  },
  {
    image: "/conference/conference-seating-5.jpg",
    alt: "Зона для мероприятий в парк-отеле Троя",
  }
])

const items = ref([
  {
    image: "/conference/conference-1.jpg",
    alt: "Конференц-зал парк-отеля Троя — вид с проектором",
  },
  {
    image: "/conference/conference-2.jpg",
    alt: "Современное оборудование конференц-зала Троя",
  },
  {
    image: "/conference/conference-3.jpg",
    alt: "Просторный интерьер конференц-зала Троя",
  },
  {
    image: "/conference/conference-4.jpg",
    alt: "Зона для мероприятий в парк-отеле Троя",
  }
])

const events = [
  {
    icon: '/conference/polygon.png',
    title: 'Бизнес-встречи, тренинги, мероприятия',
    description: 'Профессиональная атмосфера с полным техническим оснащением для эффективной работы.'
  },
  {
    icon: '/conference/polygon.png',
    title: 'Нетворкинги',
    description: 'Пространство, где удобно знакомиться, обмениваться опытом и налаживать деловые связи.'
  },
  {
    icon: '/conference/polygon.png',
    title: 'Мастер-классы и презентации',
    description: 'Удобная рассадка, проектор, экран и зоны для демонстрации продуктов или обучения.'
  },
  {
    icon: '/conference/polygon.png',
    title: 'Форумы',
    description: 'Вместимость до 50 человек, гибкие форматы посадки и сопровождение персонального менеджера.'
  }
]

const extraItems = [
  { number: 1, title: 'Размещение гостей в номерах, групповые тарифы + питание', description: 'Комфортные номера, групповые тарифы и питание на базе отеля.' },
  { number: 2, title: 'Кофе-брейки, фуршеты, бизнес-обеды', description: 'Профессиональная подача блюд и напитков для перерывов и неформального общения.' },
  { number: 3, title: 'Ресторан «Свои люди» для полноценного обеда или ужина', description: 'КПолноценные обеды и ужины с обслуживанием за столом.' },
  { number: 4, title: 'Внутренний дворик для перерывов', description: 'Уютное пространство под открытым небом для отдыха во время паузы.' },
  { number: 5, title: 'Лобби-бар и фотозоны', description: 'Стильные зоны ожидания и красивые локации для снимков.' },
  { number: 6, title: 'Персональный менеджер мероприятия', description: 'Сопровождение вашего мероприятия от заявки до завершения.' },
];



</script>

<style scoped>
.tabs__tab-icon {
  width: 2.4rem;
  height: 2.4rem;
  stroke: #fbec78;
}

.rooms-page__images-button {
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  backdrop-filter: brightness(0.9);
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 1;
}

.rooms-page__images-button--left {
  left: 0;
  border-radius: 4rem 0 0 4rem;
}

.rooms-page__images-button--right {
  right: 0;
  border-radius: 0 4rem 4rem 0;
}

.rooms-page__images-button.is-hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.conference__slider {
  width: 100%;
  display: none;
}

.conference__slide {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
}

.conference {}

.conference__inner {
  border-radius: 60px;
  padding: 40px;
  background: var(--white);
  display: flex;
  flex-direction: column;
  gap: 11rem;
}

/* Вводная часть */
.conference__intro {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 6rem;
  flex-wrap: wrap;
}

.conference__gallery {
  flex: 1 1 40rem;
  max-width: 80rem;
}

.conference__image {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 45px;
}

.conference__content {
  flex: 1 1 30rem;
  max-width: 46.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.conference__title {
  font-family: var(--second-family);
  font-weight: 500;
  line-height: 140%;
  letter-spacing: 0em;
  color: var(--noble-black-600);
}

.conference__text {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 20px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: var(--noble-black-600);
}

.conference__text1 {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: #000;
}

.conference__equipment {}

.conference__subtitle {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 20px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: var(--noble-black-600);
  margin-bottom: 1.5rem;
}

.conference__list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.conference__item {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: #000;
}

/* Варианты рассадки */
.conference__seating {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5rem;
  flex-wrap: wrap;
}

.conference__seating-info {
  flex: 1 1 30rem;
  max-width: 33.7rem;
}


.conference__button {
  margin-top: 4rem;
  max-width: 25rem !important;
}

.conference__seating-image {
  flex: 1 1 50rem;
  max-width: 90.8rem;
}

.conference__seating-image img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
}

.conference__seating-image .extra-image {
  display: none;
}

@media (max-width: 1024px) {
  .conference__inner {
    gap: 6rem;
  }

  .conference__slider {
    display: flex;
  }

  .conference__intro {
    flex-direction: column-reverse;
    gap: 4rem;
  }

  .conference__gallery {
    max-width: 100%;
    flex: none;
  }

  .conference__gallery>img {
    display: none;
  }

  .conference__content {
    max-width: 100%;
  }

  .conference__title {
    margin-bottom: 1.5rem;
  }

  .conference__seating {
    flex-direction: column;
    align-items: start;
    gap: 3rem;
  }

  .conference__seating-info,
  .conference__seating-image {
    max-width: 100%;
    flex: none;
  }

  .conference__button {
    width: 100%;
  }
}


@media (max-width: 575px) {
  .conference__inner {
    padding: 3rem 2rem;
    border-radius: 4.5rem;
  }

  .conference__seating-image .main-image {
    display: none;
  }

  .conference__seating-image .extra-image {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 1rem;
  }

  .conference__seating-image {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    align-items: center;
    gap: 1rem;
  }
}


.conference-events {}

.conference-events__inner {
  border-radius: 60px;
  padding: 60px;
  background: var(--white);
}

.conference-events__title {
  font-family: var(--second-family);
  font-weight: 500;
  line-height: 140%;
  color: #121127;
  margin-bottom: 4rem;
  max-width: 60.4rem;
}

.conference-events__items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 2rem;
}

.conference-events__item {
  display: flex;
  flex-direction: column;
  border-radius: 35px;
  padding: 56px 24px;
  box-shadow: 0 4px 25px 0 rgba(0, 0, 0, 0.1);
  background: var(--noble-black-0);
  transition: all 0.3s;
}

.conference-events__item:hover {
  transform: scale(1.035);
}

.conference-events__icon {
  width: 3.4rem;
  height: 3.4rem;
  object-fit: contain;
  margin-bottom: 2.4rem;
}

.conference-events__subtitle {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 18px;
  line-height: 140%;
  color: #121127;
  margin-bottom: 1.6rem;
}

.conference-events__description {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 150%;
  color: rgba(18, 17, 39, 0.56);
}


@media (max-width: 1024px) {
  .conference-events__inner {
    padding: 45px;
  }
}

@media (max-width: 768px) {
  .conference-events__inner {
    padding: 35px;
  }
}

@media (max-width: 575px) {
  .conference-events__inner {
    padding: 3rem 2rem;
    border-radius: 45px;
  }

  .conference-events__items {
    grid-template-columns: 1fr;
  }
}

.conference-extra {}

.conference-extra__container {}

.conference-extra__inner {
  border-radius: 60px;
  padding: 60px;
  background: var(--white);
  position: relative;
  overflow: hidden;
}

.conference-extra__intro {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  gap: 5rem;
  flex-wrap: nowrap;
  /* пока не переносим */
}

.conference-extra__text {
  flex: 1 1 300px;
  /* текст растягивается */
  max-width: 554px;
  z-index: 2;
}


.conference-extra__title {
  font-family: var(--second-family);
  font-weight: 500;
  line-height: 140%;
  letter-spacing: -0.02em;
  color: #2a3342;
  margin-bottom: 2rem;
}

.conference-extra__description {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 167%;
  color: #556987;
  margin-bottom: 2rem;
}

.conference-extra__button {
  max-width: 25rem !important;
}

.conference-extra__image-wrapper {
  position: relative;
  flex: 0 1 50%;
  display: flex;
  justify-content: flex-end;
  z-index: 1;
  /* transform: translateX(-55px); */

}


/* .conference-extra__image-bg {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 554px;
  background-color: #f2f2f2;
  border-radius: 12px;
  z-index: 1;
} */

.conference-extra__image {
  display: block;
  max-width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 25px;
  position: relative;
  z-index: 2;
  /* смещаем картинку чуть под текст */
  /* transform: translateX(20%); */
  /* transition: transform 0.3s ease; */
}

/* Перечень опций */
.conference-extra__items {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 5rem;
  margin-top: 7.3rem;
}

.conference-extra__item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.conference-extra__item-number {
  border-radius: 24px;
  width: 48px;
  height: 48px;
  background: #fbec78;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font6);
  font-weight: 600;
  font-size: 20px;
  line-height: 150%;
  letter-spacing: -0.02em;
  text-align: center;
  color: var(--noble-black-600);
  margin-bottom: 1.6rem;
}

.conference-extra__item-subtitle {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 20px;
  line-height: 150%;
  color: #2a3342;
  margin-bottom: 0.8rem;
}

.conference-extra__item-text {
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 18px;
  line-height: 133%;
  color: #556987;
}

@media (max-width: 1024px) {
  .conference-extra__inner {
    padding: 45px;
  }

  .conference-extra__intro {
    display: flex;
    /* justify-content: space-between; */
    align-items: flex-start;
    position: relative;
    gap: 5rem;
    /* flex-wrap: nowrap; */
    flex-direction: column;
  }

  .conference-extra__text {
    flex: none;
    max-width: 750px;
  }

  .conference-extra__image-wrapper {
    flex: none;
    justify-content: flex-start;
    z-index: 1;
    width: 100%;
    max-width: 780px;
  }

  .conference-extra__image {
    width: 100%;
  }

  .conference-extra__items {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .conference-extra__inner {
    padding: 35px;
  }
}

@media (max-width: 700px) {
  .conference-extra__items {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 575px) {
  .conference-extra__inner {
    padding: 3rem 2rem;
    border-radius: 45px;
  }
}
</style>