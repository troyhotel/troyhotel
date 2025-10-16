<template>
  <section class="hero">
    <div class="container">
      <div class="hero__inner">
        <img class="hero__image" :src="image" :alt="title" />

        <div class="hero__content" :class="{
          'hero__content--side': align === 'side',
          'hero__content--center': align === 'center',
          'hero__content--booking-bottom': showBooking && align === 'center' && !showBookingButton,
          'hero__content--booking-left': showBooking && align === 'side',
          'hero__content--button-under-text': showBookingButton && !showBooking
        }">

          <div class="hero__block-text">
            <div v-if="pageName" class="hero__page-name">{{ pageName }}</div>
            <h1 class="hero__title">{{ title }}</h1>
            <p class="hero__description">{{ subtitle }}</p>
          </div>

          <div v-if="showBooking || showBookingButton" class="hero__booking">
            <ClientOnly>
              <div v-if="showBooking" class="hero__booking-left" id="_bn_widget_"></div>

              <!-- Кнопка по умолчанию -->
              <component v-else-if="showBookingButton" :is="buttonTag" :href="buttonHref" @click="handleClick"
                class="hero__booking-button">
                {{ bookingButtonText }}
              </component>

            </ClientOnly>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  subtitle: string
  pageName?: string
  image: string
  showBooking?: boolean
  showBookingButton?: boolean
  bookingButtonText?: string
  align?: "side" | "center"
  buttonTag?: 'button' | 'a' // новый пропс для замены тега
  buttonHref?: string       // ссылка для <a>
}>()

const emit = defineEmits<{
  (e: "open-modal"): void
}>()

const align = props.align ?? "side"
const pageName = props.pageName ?? ""
const bookingButtonText = props.bookingButtonText ?? "Кнопка"
const buttonTag = props.buttonTag ?? "button"
const buttonHref = props.buttonHref ?? null

const handleClick = (e: Event) => {
  if (buttonTag === 'button') {
    e.preventDefault()
    emit("open-modal")
  }
}
declare global {
  interface Window {
    Bnovo_Widget?: any
  }
}

onMounted(() => {
  if (!props.showBooking) return

  const script = document.createElement('script')
  script.src = '//widget.reservationsteps.ru/js/bnovo.js'
  script.async = true
  script.onload = () => {
    // @ts-ignore
    if (window.Bnovo_Widget) {
      // @ts-ignore
      Bnovo_Widget.init(() => {
        // @ts-ignore
        Bnovo_Widget.open('_bn_widget_', {
          type: "horizontal",
          uid: "6630067e-2593-4574-b66b-1f7b6b74fdbc",
          lang: "ru",
          currency: "RUB",
          width: 'auto',
          height: 'auto',
          width_mobile: "300",
          background: "#ffffff",
          background_mobile: "#ffffff",
          bg_alpha: "100",
          bg_alpha_mobile: "100",
          border_color_mobile: "#C6CAD3",
          padding: "15",
          padding_mobile: "15",
          border_radius: "20",
          button_font_size: "18",
          button_height: "75",
          font_type: "verdana",
          without_title: "on",
          title_color: "#242742",
          title_color_mobile: "#242742",
          title_size: "22",
          title_size_mobile: "22",
          inp_color: "#242742",
          inp_bordhover: "#BBBBBB",
          inp_bordcolor: "#DDDDDD",
          inp_alpha: "100",
          btn_background: "#FBEC78",
          btn_background_over: "#FBEC78",
          btn_textcolor: "#1A1D21",
          btn_textover: "#1A1D21",
          btn_bordcolor: "#FBEC78",
          btn_bordhover: "#FBEC78",
          arrival: "Заезд",
          departure: "Выезд",
          adults_default: "1",
          btn_text: "Поиск номеров",
          cancel_color: "#FBEC78",
          switch_mobiles_width: "600",
          dates_preset: "on",
          dfrom_tomorrow: "on",
          dto_nextday: "on",
          down_mode: "on",
        })
      })
    }
  }
  document.body.appendChild(script)
})
</script>

<style scoped>
.hero__inner {
  position: relative;
}

.hero__image {
  width: 100%;
  height: auto;
  border-radius: 6rem;
  filter: brightness(0.45);
}

.hero__content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-left: 5.4rem;
  padding-right: 5.4rem;
}

/* ===== ВЫРАВНИВАНИЕ ===== */
.hero__content--side {
  align-items: flex-start;
  text-align: left;
}

.hero__content--center {
  justify-content: center;
  align-items: center;
  text-align: center;
}

.hero__content--center>.hero__block-text {
  max-width: 95rem;
  margin-top: 0
}

.hero__content--center.hero__content {
  gap: 6rem;
}

.hero__block-text {
  max-width: 60rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 25rem;
}

.hero__page-name {
  font-family: var(--second-family);
  font-weight: 400;
  font-size: 1.8rem;
  line-height: 100%;
  letter-spacing: 0.20em;
  text-transform: capitalize;
  text-align: center;
  color: var(--white);
}

.hero__title {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 48px;
  line-height: 142%;
  color: var(--noble-black-100);
}

.hero__description {
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 20px;
  line-height: 160%;
  color: var(--noble-black-0);
}

.hero__content--center>.hero__booking {
  margin-top: 0;
  padding-bottom: 0rem;
}

.hero__booking {
  margin-top: auto;
  width: 100%;
  max-width: 100%;
  padding-bottom: 4.4rem;
}

.hero__booking-left {
  width: 100%;
  max-width: 100%;
}

.hero__booking-button {
  background-color: #FBEC78;
  color: #1A1D21;
  font-size: 18px;
  font-family: var(--second-family);
  font-weight: 500;
  border-radius: 20px;
  padding: 15px 39px;
  border: none;
  cursor: pointer;
  width: 100%;
  max-width: 22.7rem;
}

.hero__content.hero__content--center.hero__content--booking-bottom {
  justify-content: space-between;
  align-items: center;
  padding-bottom: 4.4rem;
}

.hero__content.hero__content--center.hero__content--booking-bottom>.hero__block-text {
  height: 100%;
  justify-content: center;
}

@media (max-width: 1366px) {
  .hero__block-text {
    margin-top: 20rem;
  }
}

@media (max-width: 1200px) {
  .hero__block-text {
    margin-top: 17rem;
  }

  .hero__title {
    font-size: 4rem;
  }

  .hero__description {
    font-size: 1.8rem;
  }
}

@media (max-width: 1100px) {
  .hero__inner {
    flex-direction: column-reverse;
    display: flex;
    background: var(--white);
    padding: 4rem;
    border-radius: 60px;
  }

  .hero__block-text {
    margin-top: 0;
  }

  .hero__content {
    position: static;
    padding: 0;
  }

  .hero__title {
    color: var(--noble-black-600);
  }

  .hero__description {
    color: var(--noble-black-600);
  }
}

@media (max-width: 1100px) {
  .hero__inner {
    gap: 5rem;
  }

  .hero__content {
    gap: 1rem;
  }

  .hero__booking {
    padding: 0;
    width: 200px;
    height: 5rem;
  }

  .hero__page-name {
    color: var(--noble-black-600);
  }

  .hero__image {
    filter: none;
  }
}

@media (max-width: 1024px) {
  .hero__inner {
    padding: 3rem;
  }
}

@media (max-width: 768px) {
  .hero__title {
    font-size: 3.6rem;
  }
}

@media (max-width: 575px) {
  .hero__inner {
    padding: 3rem 2rem;
    border-radius: 4.5rem;
  }

  .hero__title {
    text-align: center;
    font-size: 3rem;
  }

  .hero__description {
    text-align: center;
  }

  .hero__content {
    align-items: center;
  }

  .hero__image {
    border-radius: 4rem;
  }

  .hero__content--center.hero__content {
    gap: 3rem;
  }
}

@media (max-width: 480px) {
  .hero__title {
    font-size: 2.6rem;
  }
}
</style>
