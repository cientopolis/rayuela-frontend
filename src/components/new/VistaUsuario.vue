<script setup>
import img from "../../assets/img/rayuela_logo.jpg"
import NumeroIncremental from './NumeroIncremental.vue'
const nombre = "Francori8"
const texto = {mayorPuntaje: "Mayor Puntaje" , cantidadDeMedallas: "Medallas ganadas", proyectoInscripto: "Proyectos inscriptos" }

</script>

<template>
    <section class="usuario">
        <div class="info-usuario">
            
            <img :src=img alt="imagen de usuario" class="imagen">
            <div class="nombre">
                <p >{{ nombre }}</p>
            </div>
        </div>
        <div class="estadisticas">
            
            <NumeroIncremental :numero=85 :texto="texto.mayorPuntaje" :delay=30 />
            <NumeroIncremental :numero=6 :texto="texto.cantidadDeMedallas" :delay=100 />
            <NumeroIncremental :numero=4 :texto="texto.proyectoInscripto" :delay=100  />
           
        </div>
    </section>
</template>

<style scoped>
.usuario{
    
    display: flex;
    flex-direction: column;
    gap: 25px;
    padding: 35px;
    background-color: aliceblue;
    border:2px solid black;
   
    
}

.info-usuario{
    display: flex;
    flex-direction: row;
    gap: 35px
}

.nombre{
    
    min-width: 100px;
    max-width: 100%;
    
    p{
        font-size: x-large;
        font-weight: 600;
        text-wrap: pretty;
        word-wrap: break-word;
        text-align: left
    }
}


.imagen{
    width: 86px;
    height: 86px;
    border: 0px solid black;
    border-radius: 50%;
}

.estadisticas{
    display: flex;
    gap: 35px;
}

</style>