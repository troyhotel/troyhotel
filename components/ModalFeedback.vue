<template>
  <transition name="fade">
    <div class="modal-backdrop" v-if="show" @click.self="close">
      <div class="modal">
        <button class="modal__close" @click="close">×</button>

        <h2 class="modal__title title">{{ title }}</h2>
        <p v-if="subtitle" class="modal__subtitle">{{ subtitle }}</p>

        <form class="modal__form" @submit.prevent="onSubmit">
          <!-- Имя -->
          <div class="modal__field">
            <label for="name">Ваше имя</label>
            <Field name="name" id="name" type="text" placeholder="Введите имя" />
            <ErrorMessage name="name" class="error" />
          </div>

          <!-- Телефон -->
          <div class="modal__field">
            <label for="phone">Телефон</label>
            <Field name="phone" id="phone" type="tel" placeholder="+7 (XXX) XXX-XX-XX" @input="onPhoneInput"
              @keydown="onPhoneKeyDown" />
            <ErrorMessage name="phone" class="error" />
          </div>

          <!-- Вопрос -->
          <div v-if="enableQuestion" class="modal__field">
            <label :for="'question'">{{ questionLabel }}</label>
            <Field name="question" id="question" type="text" />
            <ErrorMessage name="question" class="error" />
          </div>

          <!-- Согласие -->
          <div class="modal__field">
            <label class="consent">
              <Field type="checkbox" name="consent" :value="true" :unchecked-value="false" />
              Я ознакомлен(а) с
              <nuxt-link href="/privacy" target="_blank" rel="noopener">Политикой конфиденциальности</nuxt-link>
              и даю <nuxt-link href="/consent" target="_blank" rel="noopener">согласие на обработку моих персональных
                данных</nuxt-link>
            </label>
            <ErrorMessage name="consent" class="error" />
          </div>

          <Button type="submit" label="Отправить" color="yellow" size="large" tag="button"
            custom-class="modal__submit" />
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { Field, ErrorMessage, useForm } from "vee-validate";
import * as yup from "yup";
import Button from "~/components/ui/VButton.vue";
import { phoneValidator } from "~/utils/phoneValidation";
import { formatPhoneNumber } from "~/utils/phoneFormatting";

interface Props {
  show: boolean;
  title?: string;
  subtitle?: string;
  enableQuestion?: boolean;
  questionLabel?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "update:show", value: boolean): void;
  (e: "submit", payload: { name: string; phone: string; question?: string; consent: boolean }): void;
}>();
const phoneValue = ref("");

const questionLabel = props.questionLabel ?? "Ваш вопрос";

const { handleSubmit, errors, meta, setFieldValue, values } = useForm({
  validationSchema: yup.object({
    name: yup.string().required("Введите имя"),
    phone: phoneValidator.required("Введите телефон"),
    question: yup.string().optional(),
    consent: yup.boolean().oneOf([true], "Вы должны дать согласие"),
  }),
  validateOnMount: false,
});

const close = () => {
  emit("update:show", false);
};

const onSubmit = handleSubmit((values) => {
  emit("submit", values as { name: string; phone: string; question?: string; consent: boolean });
  close();
});

// Если нужно, синхронизируем с vee-validate values
watch(phoneValue, (newVal) => {
  values.phone = newVal; // теперь values доступен
});

// Автоформатирование при вводе
const onPhoneInput = (e: Event) => {
  const target = e.target as HTMLInputElement;

  // Убираем все символы кроме цифр
  let digits = target.value.replace(/\D/g, "");

  // Применяем автоформатирование
  const formatted = formatPhoneNumber(digits);

  // Обновляем значение в vee-validate
  setFieldValue("phone", formatted);
};

const onPhoneKeyDown = (e: KeyboardEvent) => {
  // Разрешаем только цифры, Backspace, Delete, стрелки, Tab
  if (
    !/[0-9]/.test(e.key) &&
    e.key !== "Backspace" &&
    e.key !== "Delete" &&
    e.key !== "ArrowLeft" &&
    e.key !== "ArrowRight" &&
    e.key !== "Tab"
  ) {
    e.preventDefault();
  }
};

</script>


<style scoped>
.error {
  font-family: var(--second-family);
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: var(--red-power-600);
  margin-top: 4px;
}

.consent>a {
  color: var(--noble-black-600);
}

.consent>a:hover {
  text-decoration: underline;
}

/* Анимация появления */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Фон */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100000;
  padding: 10px;
}

/* Окно */
.modal {
  background: #fff;
  border-radius: 35px;
  padding: 50px;
  max-width: 500px;
  width: 100%;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  max-height: 90vh;
  overflow-y: auto;
  box-sizing: border-box;
  position: relative;
}

/* Закрыть */
.modal__close {
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}

/* Заголовок */
.modal__title {
  margin-bottom: 1rem;
  font-family: var(--second-family);
  font-weight: 500;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: var(--noble-black-600);
}

.modal__subtitle {
  margin-bottom: 2.5rem;
  font-family: var(--second-family);
  font-weight: 400;
  font-size: 1.8rem;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: var(--noble-black-600);
}

/* Поля */
.modal__field {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
}

.modal__field label {
  margin-bottom: 4px;
  font-family: var(--second-family);
  font-weight: 400;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: var(--noble-black-300);
}

.modal__field input,
.modal__field textarea {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px 10px;
  font-family: var(--second-family);
  font-weight: 400;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0.01em;
  color: var(--noble-black-600);
}

/* Кнопка */
.modal__submit {
  width: 100%;
  padding: 10px;
  /* background: #ffcc00; */
  border: none;
  border-radius: 15px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.modal__submit:hover {
  background: rgb(247, 232, 20);
}

@media (max-width: 1200px) {
  .modal {
    padding: 4rem;
  }
}

@media (max-width: 575px) {
  .modal {
    padding: 3rem;
    gap: 3.5rem;
  }
}
</style>
