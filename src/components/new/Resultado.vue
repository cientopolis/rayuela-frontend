<script  setup>
const puntaje = 5;
const texto = "Puntaje Obtenidos" ;
import NumeroIncremental from './NumeroIncremental.vue';
import { defineEmits} from 'vue';
import ListBadges from './ListBadges.vue';
const emit = defineEmits(['volver']);
const props = defineProps({
    showModal:Boolean,
}  
)

const tipoDeTarea = 'Tipo'
const fecha = '01/01/2020'
const  numeroCheckIn = '123455'
</script>

<template>
    <section v-if="props.showModal" class="notificacion">
        <div class="modal-contenedor">
            <div class="btnCerrar">
                <button class="button volver" @click="$emit('volver')" >X</button>
            </div>
            <div class="infoCheckIn">
                <p>#CheckIn: {{ numeroCheckIn }}</p>
                <p>Tipo de tarea: {{ tipoDeTarea }}</p>
                <p>Fecha: {{ fecha }}</p>  
            </div>
            <div class="valores">
                <NumeroIncremental :numero="puntaje" :texto="texto" :delay="numero*100"/>
                <div class="insignias">
                    <h2>Insignias Conseguidas</h2>
                    <ListBadges  />
                </div>
            </div>
            
        </div>
        
    </section>
</template>

<style scoped>
.notificacion {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  padding: 20px 0; /* Padding arriba y abajo */
  box-sizing: border-box; /* Asegura que el padding no afecte al tamaño total */
  transition: opacity 0.3s ease;
}

.modal-contenedor{
    display: flex;
    flex-direction: column;
  max-width: 1080px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.btnCerrar{
  position: relative;
  
}

.infoCheckIn{
    display: flex;
    justify-content: space-around;
    margin-top: 5px;
    flex-wrap: wrap;

}

.volver{
    border: 0;
    background-color: transparent;
    position:absolute;
    top: -20px;
    right: -20px;
    &:hover{
        color:red;
    }
}

.valores{
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    gap: 50px;
}

.insignias{
    h2{
      text-align: center;
      font-size: large;
        
    }
    
}


</style>