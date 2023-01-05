<template>
  <v-container class="mx-auto">
    <v-sheet class="pa-5 mt-5 mx-auto elevation-5 rounded" max-width="800">

      <v-sheet 
        v-if="states.play.value" 
        class="play mx-auto"
      >
        <v-img
          class="elevation-3 mx-auto"
          max-width="320"
          src="/flag-placeholder.png"
        ></v-img>
        <v-row class="text-center mt-12">
          <v-col
            v-for="(item, index) in testArray" :key="index" 
            cols="12" sm="6"
          >
            <v-btn 
              class="bg-blue-darken-2 w-100 text-capitalize"
            >
              {{ item }}
            </v-btn>
          </v-col>
        </v-row>
      </v-sheet>

      <v-sheet
        class="intro d-flex flex-column align-center justify-center"
        min-height="200"
        v-if="states.intro.value"
      >
        <h2>
          Can you guess every single flag in the world?
        </h2>
        <v-btn 
          class="bg-blue-darken-2 w-25 mt-6"
          @click="this.startGame"
        >
          I can try!
        </v-btn>
      </v-sheet>

      <v-sheet
        class="defeat d-flex flex-column align-center justify-center"
        min-height="200"
        v-if="states.defeat.value"
      >
        <h2>
          You lose!
        </h2>
        <v-btn 
          class="bg-blue-darken-2 w-25 mt-6"
          @click="this.startGame"
        >
          I can try!
        </v-btn>
      </v-sheet>

      <v-sheet
        class="victory d-flex flex-column align-center justify-center"
        min-height="200"
        v-if="states.victory.value"
      >
        <h2>
          You win!
        </h2>
        <v-btn 
          class="bg-blue-darken-2 w-25 mt-6"
          @click="this.startGame"
        >
          I can try!
        </v-btn>
      </v-sheet>


    </v-sheet>
  </v-container>
</template>

<script>

import { ref } from 'vue';

export default {
  setup() {
    const states = {
      intro: ref(true),
      play: ref(false),
      defeat: ref(false),
      victory: ref(false)
    }

    const testArray = [1,2,3,4];

    let correctAnswer = null;
    const options = [];
    

    const answer = (e) => {
      if (e.target.value === correctAnswer) {

      } else {
        youLose();
      }
    }

    const testMethod = (e) => {
      console.log(e.target.innerText);
    }


    const newQuestion = () => {
      
    }

    const startGame = () => {
      for (const state in states) {
        if (state !== 'play') {
          states[state].value = false;
        } 
      }

      states.play.value = true;
    }

    const youLose = () => {
      states.play.value = false;
      states.defeat.value = true;
    }

    const youWin = () => {
      states.play.value = false;
      states.victory.value = true;
    }



    return {
      states,
      startGame,
      youLose,
      youWin,
      testArray,
      testMethod
    }
  }

}
</script>

<style>

</style>