<!-- layouts/default.vue -->
<template>
  <div class="wrapper">
    <Header />
      <NuxtPage />
      <CookieBanner />
    <Footer />
  </div>
</template>

<script setup ts>
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
import CookieBanner from '~/components/CookieBanner.vue';
</script>