<script setup>
import BotonVolver from '../../components/new/BottonVolver.vue'
import CheckIn from "../../components/new/FormularioCheckIn.vue"
</script>


<template>
    <main>
        <BotonVolver ruta="/actividad"/>
        <CheckIn/>
    </main>
        
   
</template>

<style scoped>

main{
    display: flex;
    width: 100%;
    
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>