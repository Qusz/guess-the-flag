<template>
  <v-container class="mt-15">
    <v-sheet
      v-if="states.error.value"
      :class="[styles.cardClasses, styles.textMessage, 'error']" 
    >
      <p class="error-message">
        {{ errorMessage }}
      </p>
    </v-sheet>

    <v-sheet
      :class="[styles.cardClasses, styles.flexCenter, 'intro']"
      min-height="200"
      v-if="states.intro.value"
    >
      <h2>
        Can you guess every single flag in the world?
      </h2>
      <v-btn 
        :class="styles.startButton"
        @click="startGame"
      >
        I can try!
      </v-btn>
    </v-sheet>

    <v-sheet 
      v-if="states.play.value && data" 
      :class="[styles.cardClasses, 'play']"
    >
      <v-img
        :src="flagURL"
        max-width="320"
        class="mx-auto"
      ></v-img>
      <v-row
        v-show="!states.correct.value"
        class="text-center mt-12"
      >
        <v-col
          v-for="(item, index) in options" :key="index" 
          :data-country="item.code"
          cols="12" sm="6"
          @click="answer"
        >
          <v-btn :class="styles.otpionButton">
            {{ item.name }}
          </v-btn>
        </v-col>
      </v-row>
      <p 
        v-show="states.correct.value"
        :class="[styles.textMessage, 'mt-10']"
      >
        Correct!
      </p>
    </v-sheet>

    <v-sheet
      :class="[styles.cardClasses, styles.flexCenter, 'defeat']"
      min-height="200"
      v-if="states.defeat.value"
    >
      <h2 class="defeat-title mb-5">
        Uh oh! You lost :(
      </h2>
      <p class="defeat-details defeat-total">
        Total flags guessed: {{ countriesGuessed }}
      </p>
      <p class="defeat-details defeat-correct">
        The correct answer was: {{ correctCountryName }}
      </p>
      <v-btn 
        :class="[styles.startButton]"
        @click="startGame"
      >
        Play again
      </v-btn>
    </v-sheet>

    <v-sheet
      v-if="states.victory.value"
      :class="[styles.cardClasses, styles.flexCenter, 'victory']"
      min-height="200"
    >
      <h2>
        We salute you! You have guessed all {{ countriesGuessed }} flags. Amazing!
      </h2>
      <v-btn 
        :class="[styles.startButton]"
        @click="startGame"
      >
        Play again
      </v-btn>
    </v-sheet>
  </v-container>
</template>

<script>

import { onMounted, ref } from 'vue';
import getCountries from '@/API/countries.js';
import { clearArray, randomIndex, shuffleArray } from '@/helpers/helpers.js';

export default {
  setup() {

    /****************
    * Hooks
    ****************/

    onMounted(() => {
      getData();
    });

    /****************
    * Refs & vars
    ****************/

    const states = {
      intro: ref(true),
      play: ref(false),
      correct: ref(false),
      defeat: ref(false),
      victory: ref(false),
      error: ref(false)
    }

    const data = ref(null);
    const flagURL = ref(null);
    const options = ref([]);
    const countriesGuessed = ref(0);
    const correctCountryName = ref(null);
    const errorMessage = ref(null);
    
    const usedCountries = [];
    let currentCountryIndex = null;
    let correctCountryCode = null;

    const styles = {
      cardClasses: 'pa-10 mx-auto elevation-5 rounded width-800 bg-grey-lighten-4',
      flexCenter: 'd-flex flex-column align-center justify-center',
      otpionButton: 'w-100 text-capitalize bg-blue-darken-2',
      startButton: 'bg-blue-darken-2 mt-6',
      textMessage: 'text-h5 text-center text-uppercase font-weight-medium'
    }

    /****************
    * Get data
    ****************/

    const getData = async () => {
      try {
        const response = await getCountries();
        const sortedResponse = [];

        // Independent nations only
          response.forEach(item => {
            if (item.independent === true) {
              sortedResponse.push(item);
            }
          });

        data.value = sortedResponse;

      } catch (err) {
        showError(err);
      }
    }

    /****************
    * States
    ****************/

    const startGame = () => {
      clearArray(usedCountries);
      countriesGuessed.value = 0;
  
      for (const state in states) {
        if (state !== 'play') {
          states[state].value = false;
        } 
      }

      states.play.value = true;
      nextQuestion();
    }

    const youLose = () => {
      clearArray(usedCountries);
      states.play.value = false;
      states.defeat.value = true;
    }

    const youWin = () => {
      clearArray(usedCountries);
      states.play.value = false;
      states.victory.value = true;
    }

    /****************
    * Methods
    ****************/

    const pickCountry = () => {
      const index = randomIndex(data.value);

      if (usedCountries.includes(index)) {
        pickCountry();
        return;
      } 

      const currentCountryData = data.value[index];
      currentCountryIndex = index;
      usedCountries.push(index);

      options.value.push({
        name: currentCountryData.name.common,
        code: currentCountryData.ccn3
      });

      correctCountryCode = currentCountryData.ccn3;
      correctCountryName.value = currentCountryData.name.common;
      flagURL.value = currentCountryData.flags.png; 
    }

    const pickWrongAnswers = () => {
      const pickedCountries = [];

      while (pickedCountries.length < 3) {
        const countryIndex = randomIndex(data.value);

        switch(true) {
          case pickedCountries.includes(countryIndex):
          case countryIndex === currentCountryIndex:
            continue;
          default:
            pickedCountries.push(countryIndex);
        }
      }
      
      pickedCountries.forEach(item => {
        options.value.push({
          name: data.value[item].name.common,
          code: data.value[item].ccn3
        });
      });
    }

    const answer = (e) => {
      if (e.currentTarget.dataset.country === correctCountryCode) {
        countriesGuessed.value++;
        states.correct.value = true;

        setTimeout(nextQuestion, 1200);
      } else {
        youLose();
      }
    }

    const nextQuestion = () => {
      states.correct.value = false;
      clearArray(options.value);
      if (data.value.length === usedCountries.length) youWin();

      pickCountry();
      pickWrongAnswers();
      shuffleArray(options.value);
    }

    const showError = (error) => {
      for (const state in states) {
        if (state !== 'error') {
          states[state].value = false;
        } 
      }

      states.error.value = true;
      errorMessage.value = error.message;
    }

    return {
      states,
      startGame,
      data,
      options,
      answer,
      flagURL,
      countriesGuessed,
      correctCountryName,
      errorMessage,
      styles
    }
  }
}
</script>

<style scoped lang="scss">

.width-800 {
  max-width: 50rem;
}

</style>