<script setup>
import NavBar from './components/NavBar.vue';
import TheFooter from './components/TheFooter.vue';
</script>

<template>
  <header>
    <NavBar />
    
  </header>

  <RouterView />

  <footer>
    <TheFooter />
  </footer>

</template>

<style>
/*
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #E0F7FA; 
  }
*/    
</style>
