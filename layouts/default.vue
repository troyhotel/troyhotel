<!-- layouts/default.vue -->
<template>
  <div class="wrapper">
    <Header />
    <div class="page">
      <NuxtPage />
    </div>
    <CookieBanner />
    <Footer />
  </div>
</template>

<script setup ts>
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
import CookieBanner from '~/components/CookieBanner.vue';
</script>

<style>
.page {
  flex: 1;
  display: flex;
  flex-direction: column;
  /* min-height: 100vh; */
}
</style>