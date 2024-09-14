<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()



const TITULO = "Titulo del proyecto"
const CREADOR = "Josesito"
const CREACION = "17/8/2024"
const UBICACION = "Quilmes"
const PARRAFO = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est atque ullam ipsam magnam nisi facilis suscipit dolore aliquid? Aut ea error iusto maiores labore? Voluptatum voluptate neque soluta modi molestias?"

const volver = () => {
    router.go(-1)
};
</script>

<template>
    <button @click ="volver" class="button">Volver</button>
    <h1 class="titulo">{{ TITULO  }}</h1>
    <section class="info">
        <div class="creador">
            <p><span class="resaltar">Creador: </span> {{ CREADOR }}</p>
        </div>
        <div class="creacion">
            <p><span class="resaltar">Fecha de Creacion: </span> {{ CREACION }}</p>
        </div>
        <div class="Ubicacion">
            <p><span class="resaltar">Ciudad: </span> {{ UBICACION }}</p>
        </div>
    </section>
    <section class="contenedor-parrafo">
        <p>{{ PARRAFO }}</p>
    </section>
</template>

<style scoped>
.titulo{
    font-size: xx-large;
    padding: 10px 0px;
    margin: 10px 5px;
    font-weight: 700;
    color: cadetblue;
    text-align: center;
    vertical-align: middle;
    box-shadow: 0px 1px black, 0px -1px black;
}
.info{
    margin: 20px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    text-align: center;
}

.resaltar{
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-weight: bold;
    font-size: large;
}

.contenedor-parrafo{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 20px;
    background-color: cornsilk;
    color:cadetblue;
    border:2px solid black;
    border-radius: 8px;
   
    p{
        max-width: 600px;
    }
}
</style>