<script setup>
import {ref , onMounted} from 'vue'

const props = defineProps(
    {
        numero: Number,
        texto: String,
        delay: Number
    }
)

const numero = ref(0)

onMounted(() => {
 
    const tiempo = setInterval(() => {
    numero.value ++
    if(numero.value === props.numero){
        clearInterval(tiempo)
    }
},props.delay)
})


</script>

<template>
    <section class="contenedor-numero">
        <h1>{{ texto }}</h1>
        <div class="numero">{{ numero }} </div>
    </section>
</template>

<style>
.contenedor-numero{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap:12px;
}

.numero{
    font-size: xx-large;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center; 
    height: 72px;
    width: 72px;
    border: 2px dashed  black;
    border-radius: 100%;
    
    
  
}
</style>