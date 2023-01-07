<template>
  <v-container class="mx-auto">
    <v-sheet class="pa-5 mt-5 mx-auto elevation-5 rounded" max-width="800">

      <v-sheet 
        v-if="states.play.value && data" 
        class="play mx-auto"
      >
        <v-img
          class="elevation-3 mx-auto"
          max-width="320"
          :src="flagURL"
        ></v-img>
        <v-row class="text-center mt-12">
          <v-col
            v-for="(item, index) in options" :key="index" 
            @click.stop="answer"
            :data-country="item.code"
            cols="12" sm="6"
          >
            <v-btn
              class="bg-blue-darken-2 w-100 text-capitalize"
            >
              {{ item.name }}
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
          Uh oh! You lost :(
        </h2>
        <p>
          Total flags guessed: {{ countriesGuessed }}
        </p>
        <v-btn 
          class="bg-blue-darken-2 w-25 mt-6"
          @click="this.startGame"
        >
          Play again
        </v-btn>
      </v-sheet>

      <v-sheet
        class="victory d-flex flex-column align-center justify-center"
        min-height="200"
        v-if="states.victory.value"
      >
        <h2>
          We salute you! You have guessed all {{ countriesGuessed }} flags. Amazing!
        </h2>
        <v-btn 
          class="bg-blue-darken-2 w-25 mt-6"
          @click="this.startGame"
        >
          Play again
        </v-btn>
      </v-sheet>


    </v-sheet>
  </v-container>
</template>

<script>

import { onMounted, ref } from 'vue';
import getCountries from '@/API/countries.js';
import { clearArray, randomIndex, shuffleArray } from '@/helpers/helpers.js';

export default {
  setup() {
    onMounted(() => {
      getData();
    });
    
    const states = {
      intro: ref(true),
      play: ref(false),
      defeat: ref(false),
      victory: ref(false)
    }

    const data = ref(null);
    const correctAnswer = ref(null);
    const flagURL = ref(null);
    const options = ref([]);
    const countriesGuessed = ref(0);

    let usedCountries = [];
    let currentCountryIndex = null;

    const getData = async () => {
      const response = await getCountries();
      const sortedResponse = [];

      // Independent nations only
      response.forEach(item => {
        if (item.independent === true) {
          sortedResponse.push(item);
        }
      })

      data.value = sortedResponse;
    }

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

      correctAnswer.value = currentCountryData.ccn3;
      flagURL.value = currentCountryData.flags.png; 
    }

    const pickWrongAnswers = () => {
      const pickedCountries = [];

      while (pickedCountries.length < 3) {
        const countryIndex = randomIndex(data.value);

        switch(true) {
          case pickedCountries.includes(countryIndex):
          case countryIndex === currentCountryIndex:
            break;
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
      if (e.currentTarget.dataset.country === correctAnswer.value) {
        countriesGuessed.value++;
        nextQuestion();
      } else {
        youLose();
      }
    }




    const nextQuestion = () => {
      clearArray(options.value);
      if (data.value.length === usedCountries.length) youWin();

      pickCountry();
      pickWrongAnswers();
      shuffleArray(options.value);
    }

    const startGame = () => {
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



    return {
      states,
      startGame,
      youLose,
      youWin,
      data,
      options,
      answer,
      flagURL,
      countriesGuessed
    }
  }

}
</script>

<style>

</style>