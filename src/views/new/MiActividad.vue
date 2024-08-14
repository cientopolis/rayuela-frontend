<script setup>
    import Buttons from '../../components/new/BotonesUsuario.vue';
    import Badges from '../../components/new/ListBadges.vue';
    import Leaderboard from '../../components/new/Leadeboard.vue';
    import MapSign from '../../components/new/MapSign.vue';
</script>

<template>
  <main class="main-div">
    <!--Descripcion del proyecto o info del mismo-->
    <Buttons />
    <Leaderboard/>
    <Badges />
    <MapSign />
  </main>
</template>

<style setup>

.main-div {
  display: flex;
  flex-direction: column;
  align-items: center; 
  width: 100%;
  background-color: #f5f5f5f5;
  padding-top: 40px;
}

</style>