<script setup>


const props = defineProps({
  nombre:String,
  descripcion:String,
  ubicacion:String
})
</script>

<template>
      <div class="tarjeta">
          <h3 class="nombre">{{ nombre }}</h3>
          <div class="info-detallada">
            <p><span class="resaltado">Ubicacion:</span> {{ ubicacion  }}</p>
          </div>
          
          <p class="descripcion">{{ descripcion }}</p>
      </div>
        
    
</template>

<style scoped>

.nombre{
  font-size: large;
  font-weight: 600;
  color: cornflowerblue;
  text-decoration: underline;
}
.tarjeta{
    margin: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
    height: 200px;
    overflow-y: auto;
    gap: 10px;
  }

 .descripcion{
    font-family: 'Times New Roman', Times, serif;
    text-align: center;
    text-wrap: pretty;
 }

 .resaltado{
  color: rgba(100, 148, 237, 0.829);
 }
</style>