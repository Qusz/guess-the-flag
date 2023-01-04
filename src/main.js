import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// CSS
import 'normalize.css';
import '@/styles/main.scss';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';


const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  },
  theme: {
    defaultTheme: 'light'
  }
})



createApp(App)
.use(router)
.use(vuetify)
.mount('#app')