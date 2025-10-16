<template>
  <!-- Если обычная кнопка -->
  <button v-if="tag === 'button'" :class="[buttonClasses, customClass]" @click="$emit('click')" :disabled="disabled">
    <slot>
      <span v-if="leadIcon" :class="['button__icon', 'button__icon--lead', iconClass, { 'no-label': !label }]">
        <svg :class="iconSizeClass">
          <use :xlink:href="`/svg/icons/inlineSprite.svg#${leadIcon}`" />
        </svg>
      </span>
      <span v-if="label" class="button__label">{{ label }}</span>
      <span v-if="trailIcon" :class="['button__icon', 'button__icon--trail', iconClass, { 'no-label': !label }]">
        <svg :class="iconSizeClass">
          <use :xlink:href="`/svg/icons/inlineSprite.svg#${trailIcon}`" />
        </svg>
      </span>
    </slot>
  </button>

  <!-- Если внешняя ссылка -->
  <a v-else-if="tag === 'a'" :href="href" :target="targetAttr" rel="noopener noreferrer"
    :class="[buttonClasses, customClass]">
    <slot>
      <span v-if="leadIcon" :class="['button__icon', 'button__icon--lead', iconClass, { 'no-label': !label }]">
        <svg :class="iconSizeClass">
          <use :xlink:href="`/svg/icons/inlineSprite.svg#${leadIcon}`" />
        </svg>
      </span>
      <span v-if="label" class="button__label">{{ label }}</span>
      <span v-if="trailIcon" :class="['button__icon', 'button__icon--trail', iconClass, { 'no-label': !label }]">
        <svg :class="iconSizeClass">
          <use :xlink:href="`/svg/icons/inlineSprite.svg#${trailIcon}`" />
        </svg>
      </span>
    </slot>
  </a>

  <!-- Если внутренний роут -->
  <NuxtLink v-else :to="href" :class="[buttonClasses, customClass]" :disabled="disabled">
    <slot>
      <span v-if="leadIcon" :class="['button__icon', 'button__icon--lead', iconClass, { 'no-label': !label }]">
        <svg :class="iconSizeClass">
          <use :xlink:href="`/svg/icons/inlineSprite.svg#${leadIcon}`" />
        </svg>
      </span>
      <span v-if="label" class="button__label">{{ label }}</span>
      <span v-if="trailIcon" :class="['button__icon', 'button__icon--trail', iconClass, { 'no-label': !label }]">
        <svg :class="iconSizeClass">
          <use :xlink:href="`/svg/icons/inlineSprite.svg#${trailIcon}`" />
        </svg>
      </span>
    </slot>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  label?: string;
  color?: "yellow" | "red" | "white" | "black";
  size?: "large" | "medium" | "small";
  leadIcon?: string;
  trailIcon?: string;
  tag?: "button" | "a" | "nuxt-link";
  href?: string;
  disabled?: boolean;
  customClass?: string;
  iconClass?: string;
  blank?: boolean;
}

const props = defineProps<Props>();
const targetAttr = props.blank ? "_blank" : undefined;
defineEmits<{
  (e: "click"): void;
}>();

const color = props.color || "yellow";
const size = props.size || "medium";
const tag = props.tag || "button";
const disabled = props.disabled || false;
const customClass = props.customClass || "";

const buttonClasses = computed(() => [
  "button",
  `button--${color}`,
  `button--${size}`,
  { "button--disabled": disabled },
]);

const iconSizeClass = computed(() => [
  "icon",
  `icon--${color}`,
  `icon--${size}`,
]);
</script>


<style scoped>
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
  text-decoration: none;
  border: none;
  width: 100%;
  border-radius: 20px;
}

/* Размеры */
.button--large {
  gap: 1.2rem;
  border-radius: 2rem;
  padding: 1.5rem 2rem;

}

.button--medium {
  padding: 1rem 0.8rem;
  gap: 1rem;
  border-radius: 1rem;
}

.button--small {
  padding: 0.6rem 0.8rem;
  gap: 0.6rem;
  border-radius: 0.8rem;
}

/* Состояние disabled */
.button--disabled {
  opacity: 0.6;
  pointer-events: none;
}

/* Цвета */
.button--yellow {
  background-color: #FBEC78;
  color: var(--noble-black-600);
}

.button--red {
  background-color: #FF4433;
  color: var(--white);
}

.button--white {
  background-color: #fff;
  color: var(--noble-black-600);
}

.button--black {
  background-color: var(--noble-black-600);
  color: #fff;
}

/* Иконки */
.button__icon--lead,
.button__icon--trail {
  display: flex;
  align-items: center;
}

.button__icon--lead {
  margin-right: 0.5rem;
}

.button__icon--trail {
  margin-left: 0.5rem;
}

/* Если нет текста, убираем отступы */
.button__icon.no-label {
  margin: 0;
}

.icon--small {
  width: 1.6rem;
  height: 1.6rem;
}

.icon--medium {
  width: 2rem;
  height: 2rem;
}

.icon--large {
  width: 2.4rem;
  height: 2.4rem;
}

/* Цвета иконок */
.icon--yellow {
  stroke: #000;
}

.icon--red {
  stroke: var(--white);
}

.icon--white {
  stroke: #000;
}

.icon--black {
  stroke: #FBEC78;
}

.button__label {
  display: inline-block;
  font-family: var(--second-family);
  font-weight: 400;
  font-size: 18px;
  line-height: 140%;
  letter-spacing: 0.01em;
}
</style>
