<template>
  <div v-if="show" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const show = ref(props.modelValue)

const close = () => {
  show.value = false
  emit('update:modelValue', false)
}

// Синхронизируем с родительским v-model
watch(() => props.modelValue, val => {
  show.value = val
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6); /* затемненный фон */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.modal-content {
  max-height: 80%;
  border-radius: 16px;
  overflow: hidden;
}
</style>
