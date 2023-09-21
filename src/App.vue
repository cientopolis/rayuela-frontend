<script setup>
import { onMounted } from 'vue';
import NavBar from './components/NavBar.vue';
import TheFooter from './components/TheFooter.vue';

onMounted(() => {
  console.log(import.meta.env.VITE_ROOT_API)
  console.log(import.meta.env.VITE_TITLE)
})


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
  
</style>
