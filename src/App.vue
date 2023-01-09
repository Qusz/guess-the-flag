<template>
  <v-app>
    <the-navbar></the-navbar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

import TheNavbar from '@/components/TheNavbar.vue';

export default {
  components: {
    TheNavbar
  }
}
</script>

<style></style>