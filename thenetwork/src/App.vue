<script setup>
import Navbar from './components/Navbar.vue';
import { RouterView } from 'vue-router';
import PageBottom from './components/PageBottom.vue';

</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <RouterView/>
  </main>
  <footer class=" text-center">
    <PageBottom v-if="$route.name === 'Home' || $route.name === 'Profile'" />
    Made by Shockwave <i class="mdi mdi-nuke text-blue"></i> (2025)
  </footer>
</template>

<style lang="scss">


</style>
