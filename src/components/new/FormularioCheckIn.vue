
<script setup>

import { onMounted, ref } from "vue";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


const url = ref('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
const attribution = ref('&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors');

const center1 = ref([51.505, -0.09]);
const zoom1 = ref(13);
const marcador = ref(null);
const map1 = ref(null);

let temas = ref([]);
const select = ref("");
const fecha = ref("");
const exitoso = ref(false);

onMounted(async () => {
    map1.value = L.map('map').setView(center1.value, zoom1.value);
    L.tileLayer(url.value, { attribution: attribution.value }).addTo(map1.value);

    map1.value.on('click', function(e) {
        if (marcador.value) {
            map1.value.removeLayer(marcador.value);
        }

        const latlng = e.latlng;
        marcador.value = L.marker([latlng.lat, latlng.lng]).addTo(map1.value)
            .bindPopup('Marcador en [' + latlng.lat + ', ' + latlng.lng + ']')
            .openPopup();              
    });

    try {
        const response = await fetch('../../public/archivos_prueba/temasProyecto.json');
        if (!response.ok) {
            throw new Error('Error al cargar los temas');
        }
    
        const data = await response.json();
        temas.value = data;

    } catch (error) {
        console.error(error);
    }
});

const enviar = () => {
    if (select.value === "") return;
    if (fecha.value === "") return;
    if (!marcador.value) return;
    exitoso.value = true;

    setTimeout(() => { exitoso.value = false }, 2000);
    
    console.log({tipo: select.value, fecha: fecha.value, cordenada: {lat: marcador.value.getLatLng().lat, long:  marcador.value.getLatLng().lng}});

}

const resetear = () => {
    select.value = "";
    fecha.value = "";

    if (marcador.value) {
        map1.value.removeLayer(marcador.value);
        marcador.value = null; 
    }
}
</script>



<template>
    <div v-if="exitoso">Exitoso</div>
    <section class="formularioCheckIn">
        
        <div class="contenedorTitulo">
            <h2 class="titulo">CheckIn</h2>
        </div>
        
        <form action="" >
            <fieldset>
                <legend>¿Que?</legend>
                <label for="tema">Tipo de actividad <span title="required" aria-label="required">*</span></label>
                
                <select name="tema" id="tema" v-model="select">
                    <option v-for="tema in temas" :value="tema.id ">{{ tema.nombre }}</option>
                </select>
            </fieldset>
            <fieldset>
                <legend>¿Cuando?</legend>
                <label for="fecha">Fecha <span title="required" aria-label="required">*</span></label>
                <input type="datetime-local" name="fecha" id="fecha" v-model="fecha">
            </fieldset>
            <fieldset>
                <legend>¿Donde?</legend>
                <label for="lugar">Ubicacion</label>
                <div id="map" class="map" ></div>
                    
            </fieldset>
            <section class="botones">
                <button class="btn btn-enviar" type="button" @click="enviar">Enviar</button>
                <button class="btn btn-borrar" type="button" @click="resetear">Borrar</button>
            </section> 
            
        </form>
    </section>
</template>



<style scoped>

.formularioCheckIn{
    width: 40%;
    min-width: 250px;
    display: flex;
    flex-direction: column;
    border: 2px solid black;
    padding: 35px;
    gap:10px;
    box-shadow: 4px 4px  black , -4px 4px black;
}
.contenedorTitulo{
    display: flex;
    justify-content: center;
}

.titulo{
    width: max-content;
    padding: 12px 24px;
    font-size: larger;
    font-weight: 500;
    color: white;
    background-color: rgb(39, 108, 218);
    
    border-radius:10px;
}

.botones{
    display: flex;
    justify-content: space-evenly
}

.map{
    width: 100%;
    min-height: 250px
}

.btn{
    
    padding: 8px 16px;
    border-radius: 24px;
    &:hover{
        cursor: pointer;
        transform: scale(115%);
    }
}
.btn-enviar{
    
    background-color: rgb(74, 234, 130);
}

.btn-borrar{
    
    background-color: rgb(252, 123, 123)
}




form{
    display: flex;
    flex-direction: column;
    gap:20px;
}

fieldset{
    display: flex;
    flex-direction: column;
    gap: 5px;
}

legend{
    margin-bottom: 6px;
    padding: 4px 8px;
    font-size: x-small;
    color:rgba(0, 0, 0, 0.438);
    background-color: rgba(128, 128, 128, 0.301);
}

label{
    text-align: center;
    font-weight: 500;
    span{
        color: red
    }
}

#tema{
    option{
        text-align: center
    }
}




</style>