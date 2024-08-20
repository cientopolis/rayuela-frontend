<script setup>
import TareaHTML   from './Tarea.vue'
import {ref} from 'vue'
const tareas = ref([
    {
        nombre:"Recoger agua",
        ubicacion:"Quilmes",
        descripcion:"Recoger 5 ml de agua del  rio de quilmes, con preferencia lo mas cercano  a  la costa de Quilmes"
    },
    {
        nombre:"Recoger agua",
        ubicacion:"Quilmes",
        descripcion:"Recoger 5 ml de agua del  rio de quilmes, con preferencia lo mas cercano  a  la costa de Quilmes"
    },
    {
        nombre:"Recoger agua",
        ubicacion:"Quilmes",
        descripcion:"Recoger 5 ml de agua del  rio de quilmes, con preferencia lo mas cercano  a  la costa de Quilmes"
    }

])
</script>

<template>
    <section class="seccion-tareas" >
        <h3 class="titulo">Tareas a Realizar</h3>
        <article class="contenedor-tareas">
            <div v-for="tarea in tareas"  class="tarea">
                <TareaHTML  :nombre="tarea.nombre"  :descripcion="tarea.descripcion" :ubicacion= "tarea.ubicacion" ></TareaHTML >
            </div>
        </article>
    </section>
</template>

<style scoped>
.seccion-tareas{
    margin: 50px 0px 0px 0px;
    
}

.titulo{
    font-size: x-large;
    padding: 10px 0px;
    margin: 10px 5px;
    font-weight: 700;
    color: rgb(121, 203, 206);
    text-align: center;
    vertical-align: middle;
    box-shadow: 0px 1px black, 0px -1px black;
}

.contenedor-tareas{
    display: flex;
    flex-direction: row;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: space-evenly;
 
}

.tarea{
    max-width: 300px;
}
</style>