<template>
  <div class="tabs">
    <div class="tabs__controls">
      <button v-if="!isTouch && hasOverflow" class="tabs__scroll-btn" @click="scroll(-1)" aria-label="Scroll left">‹</button>

      <div class="tabs__list-wrapper" ref="listWrapper">
        <div class="tabs__list" ref="tabsList">
          <button
            v-for="(tab, index) in tabs"
            :key="index"
            :class="['tabs__tab', { 'active': activeTab === index }]"
            @click="selectTab(index)"
            type="button"
          >
            <slot name="icon" :isActive="activeTab === index"></slot>
            {{ tab.label }}
          </button>
        </div>
      </div>

      <button v-if="!isTouch && hasOverflow" class="tabs__scroll-btn" @click="scroll(1)" aria-label="Scroll right">›</button>
    </div>

    <div class="tabs__content">
      <slot :name="`tab-${activeTab}`"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'

interface Tab {
  label: string
}

const props = defineProps<{
  tabs: Tab[]
  selected?: number
}>()

const emit = defineEmits<{
  (e: 'update:selected', value: number): void
}>()

const activeTab = ref(props.selected ?? 0)
const listWrapper = ref<HTMLElement | null>(null)
const tabsList = ref<HTMLElement | null>(null)
const isTouch = ref(false)
const hasOverflow = ref(false)

// синхронизация с внешним v-model:selected
watch(
  () => props.selected,
  (newVal) => {
    if (newVal !== undefined && newVal !== activeTab.value) {
      activeTab.value = newVal
      nextTick(scrollToActive)
    }
  }
)

function selectTab(index: number) {
  activeTab.value = index
  emit('update:selected', index)
  scrollToActive()
}

function scroll(amount: number) {
  if (!listWrapper.value) return
  listWrapper.value.scrollBy({
    left: amount * 150,
    behavior: 'smooth',
  })
}

function scrollToActive() {
  if (!listWrapper.value || !tabsList.value || isTouch.value || !hasOverflow.value) return
  const tabs = tabsList.value.querySelectorAll<HTMLElement>('.tabs__tab')
  const active = tabs[activeTab.value]
  if (active) {
    const wrapperRect = listWrapper.value.getBoundingClientRect()
    const activeRect = active.getBoundingClientRect()
    if (activeRect.left < wrapperRect.left || activeRect.right > wrapperRect.right) {
      listWrapper.value.scrollBy({
        left: activeRect.left - wrapperRect.left - wrapperRect.width / 2 + activeRect.width / 2,
        behavior: 'smooth',
      })
    }
  }
}

function checkOverflow() {
  if (!listWrapper.value || !tabsList.value) return
  hasOverflow.value = tabsList.value.scrollWidth > listWrapper.value.clientWidth
}

onMounted(() => {
  isTouch.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  nextTick(() => {
    checkOverflow()
    scrollToActive()
    window.addEventListener('resize', checkOverflow)
  })
})
</script>

<style scoped>
.tabs {
  width: 100%;
}

.tabs__controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tabs__scroll-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.tabs__list-wrapper {
  overflow-x: auto;
  flex: 1;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.tabs__list-wrapper::-webkit-scrollbar {
  display: none;
}

.tabs__list {
  display: flex;
  gap: 3rem;
  transition: all 0.3s;
}

.tabs__tab {
    flex: 0 0 auto;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  transition: all 0.2s;
  font-family: var(--second-family);
  font-weight: 300;
  font-size: 20px;
  line-height: 100%;
  color: var(--noble-black-300);
}

.tabs__tab:hover {
  color: var(--noble-black-600);
}

.tabs__tab.active {
  font-weight: 500;
  color: var(--noble-black-600);
}

/* Стили для иконки */
.tabs__tab>.tabs__tab-icon {
  display: none;
}

.tabs__tab.active>.tabs__tab-icon {
  display: block;
}

.tabs__tab-icon {
  width: 2.4rem;
  height: 2.4rem;
  stroke: #fbec78;
  margin-right: 2rem;
}

.tabs__content {
  margin-top: 1rem;
}

@media (max-width: 575px) {
  .tabs__tab {
    font-size: 1.8rem;
  }
}
</style>
