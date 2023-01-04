<template>
  <v-app-bar 
    class="text-center" 
    color="secondary-darken-1"
  >
    <v-app-bar-nav-icon 
      variant="text"
      absolute 
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <v-app-bar-title class="text-md-h4">
      GUESS THE FLAG
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
export default {

  data() {
    return {
      drawer: false
    }
  }


  
}
</script>

<style>

</style>