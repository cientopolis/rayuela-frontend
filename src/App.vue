<script setup>
import NavBar from './components/NavBar.vue';
import TheFooter from './components/TheFooter.vue';

</script>

<template>
  <header>
    <NavBar />
  </header>

  <RouterView />
    <TheFooter />
</template>

<style>
  
</style>
