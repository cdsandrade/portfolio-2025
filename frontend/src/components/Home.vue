<script setup>
import { ref } from 'vue'
</script>

<template lang="pug">
div.min-h-screen.bg-white.text-gray-900.font-avenir.p-8
h1.text-3xl.font-bold.mb-4 Welcome to Vite + Vue + Bootstrap!
p.test-lg You kept the Avenir vibe — classy choice.
div
  a(href="https://vite.dev", target="_blank")
    img.logo(src="/vite.svg", alt="Vite logo")
  a(href="https://vuejs.org/", target="_blank")
    img.logo.vue(src="../assets/vue.svg", alt="Vue logo")
  //- a(href="https://tailwindcss.com/", target="_blank")
  //-   img.logo(src="./assets/tailwindcss.svg", alt="Tailwind logo")
  a(href="https://getbootstrap.com/", target="_blank")
    img.logo(src="../assets/bootstrap.svg", alt="Bootstrap logo")
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
