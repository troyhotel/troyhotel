<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useVideoThumbnail } from '~/composables/useVideoThumbnail'

const videoUrl = '/home/IMG_5988.MP4'
const { thumbnail, generateThumbnail } = useVideoThumbnail()

onMounted(async () => {
  await generateThumbnail(videoUrl)
})
</script>

<template>
  <div>
    <video :src="videoUrl" controls></video>
    <div v-if="thumbnail">
      <p>Превью первого кадра:</p>
      <img :src="thumbnail" alt="Preview" />
    </div>
  </div>
</template>
