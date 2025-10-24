<template>
  <transition name="fade">
    <button
      v-if="isVisible"
      @click="scrollToTop"
      class="scroll-to-top"
      aria-label="Прокрутить вверх"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 4L12 20M12 4L5 11M12 4L19 11"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isVisible = ref(false)

const handleScroll = () => {
  isVisible.value = window.scrollY > 200
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background-color: #333;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
  z-index: 1000;
}

.scroll-to-top:hover {
  background-color: #555;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
