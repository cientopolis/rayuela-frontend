
<script setup>
  import { ref } from 'vue';
  import Banner from './Banner.vue';
  
  const slides = ref([
    'https://picsum.photos/id/1032/900/400',
    'https://picsum.photos/id/1033/900/400',
    'https://picsum.photos/id/1037/900/400',
    'https://picsum.photos/id/1035/900/400',
    'https://picsum.photos/id/1036/900/400',
  ]);
</script>

<template>
    <Banner :slides="slides" :interval="3000" controls indicators></Banner>
</template>
  
<style>
  /*  */
</style>
  