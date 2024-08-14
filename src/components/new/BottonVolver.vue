<script setup>
const props = defineProps({
    ruta:{
        type:String,
        required:true
     }
})
import { useRouter } from 'vue-router';
const router =  useRouter()

const volver = () =>{
   
   router.push({ path: props.ruta })
}


</script>

<template>
   <button class="btn-regresar" @click="volver">Volver</button>
</template>

<style scoped>

.btn-regresar{
    
    border: 2px solid black;
    border-radius: 24px 0px 0px 24px;
    position:relative;
    left:-45%;
    top:0;
    padding: 4px 8px;

    &:hover{
        cursor: pointer;
        font-weight: 700;
        box-shadow: 4px 4px black;
    }
}
</style>