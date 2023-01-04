import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from "url";
import autoprefixer from 'autoprefixer';
import vuetify from 'vite-plugin-vuetify';


export default defineConfig({
  plugins: [
    vue(),
    vuetify()
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    },
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer()
      ],
    }
  },
  build: {
    target: 'es2015',
  }
})
