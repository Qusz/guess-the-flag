<template>
  <v-app-bar 
    color="secondary-darken-1"
  >
    <v-app-bar-nav-icon 
      variant="text"
      absolute 
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <v-app-bar-title class="text-md-h5">
      The Flags
    </v-app-bar-title>
  </v-app-bar>
   <v-navigation-drawer
      v-model="drawer"
      location="left"
      temporary
      width="220"
      class="elevation-5"
    >
    <v-list nav>
      <v-list-item 
        prepend-icon="mdi-web-plus" 
        title="New Game" 
        value="inbox"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

import { ref } from 'vue';

export default {
  setup() {
    const drawer = ref(false);

    return {
      drawer
    }
  }
}
</script>

<style>

</style>