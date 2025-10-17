<template>
  <div>
                  <PlayerVideo :src="videoSrc" class="banquet-service__video" />
  </div>
</template>

<script lang="ts" setup>
import PlayerVideo from '~/components/ui/PlayerVideo.vue'
const videoSrc = '/spa/sample-5s.mp4'  // путь к вашему видео
</script>

<style>

</style>