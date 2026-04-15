<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import {toast} from "vue3-toastify";
import ProjectsService from "@/services/ProjectsService";
// Mapa
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../assets/js/leaflet-simple-locate.min.js";
import "../assets/css/leaflet-simple-locate.css";
import "leaflet-easybutton/src/easy-button.js";
import "leaflet-easybutton/src/easy-button.css";
import gps from '../assets/img/gps-icon.svg';
// Fecha y hora
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const router = useRouter()
const errors = [];
const projectId = JSON.parse(localStorage.getItem("projectId"));
const project = ref({});
const subAreas = ref({});
var map = {};
var point = {};

function saveGameMoveId(checkinId){
    try {
        localStorage.setItem("checkinId", checkinId)
    } catch (e) {
        errors.push(e)
    }
}

async function sendData() {
    const task_types_form = document.getElementById("task_types");
    await ProjectsService.setCheckin(point._latlng.lat, point._latlng.lng, date.value, projectId,
        parseInt(task_types_form.options[task_types_form.selectedIndex].value))
        .then( (response) => {
            //toast.success('¡Carga de checkin exitosa!', {autoClose: 1500});
            setTimeout(() => {
                saveGameMoveId(response.data.checkin)
                router.push({ path: '/solved' })
                //TODO: Enviar a página con datos de la tarea realizada
            },500)
            }).catch ( (err) => {
            Object.keys(err?.response?.data).map( k => {
                toast.error(err.response.data[k], {autoClose: 3000});
            })
        })
}

function imprimirDatos() {
    const task_types_form = document.getElementById("task_types");
    console.log("TAREA: ", task_types_form.options[task_types_form.selectedIndex].value);
    console.log("PUNTO: ", point._latlng);
    console.log("FECHA-HORA: ", date.value);
    console.log("MAPA CENTRO: ", map.getCenter());
}

// Fecha y hora
const date = ref(new Date());
const format = (date, "dd-MM-yyyy - HH:mm");
onMounted(async () => {
    try {
        // Tipos de tarea
        const responseDetails = await ProjectsService.projectDetails(projectId);
        project.value = responseDetails;
        const task_types = project.value.task_types;

        for (let index = 0; index < task_types.length; index++) {
            const task_type = task_types[index];
            const task_types_selector = document.getElementById("task_types");
            var option = document.createElement("option");

            option.value = task_type.id;
            option.text = task_type.name;
            task_types_selector.add(option);
        }

        // Subáreas
        const responseSubAreas = await ProjectsService.getSubArea(projectId);
        subAreas.value = responseSubAreas;
        var areaGeoJSON = [];

        for (let index = 0; index < subAreas.value.length; index++) {
            areaGeoJSON.push(JSON.parse(subAreas.value[index].sub_area));
        }

        var area = {
            "type": "FeatureCollection",
            "features": areaGeoJSON
        }

        // Mapa
        map = L.map('map').setView([-35.266517748657265, -64.30819384545772], 6);
        // https://tile.openstreetmap.org/{z}/{x}/{y}.png
        L.tileLayer('https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{-y}.png', {
            minZoom: 3,
            maxZoom: 20, 
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        var markerOptions = {
            clickable: true,
            draggable: true
        }

        // Marcador
        point = L.marker([-30.266517748657265, -60.30819384545772], markerOptions).addTo(map);

        L.easyButton(`<span class="gps" title="Geolocalizar ubicación"><img src="${gps}" class="gps-image"></span>`, function () {
                map.locate();
                map.on('locationfound', function(e) {
                    map.setView(e.latlng, 8); // Centra el mapa en la ubicación actual y coloca el zoom deseado
                    point.setLatLng(e.latlng);
                });
        }).addTo(map);

        // Subáreas
        L.geoJSON(area).addTo(map);
    } catch (e) {
        errors.push(e)
    }
})

</script>

<template>
<div class="container">
    <h2 class="title">Registrar tarea</h2>
    <form @submit.prevent="sendData"> 
        <!-- Selector de tipos de tareas -->
        <div class="form-group">
            <label>Tipos de tarea</label>
            <select id="task_types" class="form-control select2 select2-info" data-placeholder="Seleccionar tipo de tarea" style="width: 100%;" >
            </select>
        </div>

        <!-- Mapa -->
        <div class="form-group map-container">
            <label>Lugar / Área</label>
            <div class="map" id="map">
            </div>
        </div>

        <!-- Fecha y hora -->
        <div class="form-group">
            <label>Fecha y hora</label>
            <Datepicker id="date" v-model="date" time-picker-inline :format="format" locale="es" cancelText="Cancelar" selectText="Seleccionar" ></Datepicker>
        </div>
        <!-- TODO: bloquear carga de fecha hacia adelante -->
        <button class="btn btn-success" id="submit" type="submit" value="sendData">Cargar</button>
    </form>
        <!-- BORRAR: muestra de datos en console.log -->
        <br>
        <button class="btn btn-success" @click="imprimirDatos()" >Imprimir en consola</button>
</div>
</template>

<style>
label {
    padding: 1rem;
    text-align: center;
    align-items: center;
}

.container, form {
    width: 100%;
    text-align: center;
}

.form-group {
    padding: 1rem;
}

.title {
    width: 100%;
}

.form-group select {
    text-align: center;
}

.dp__pointer {
    text-align: center;
}

.map-container {
    max-width: 100%;
}

.map {
    position: relative;
    border: 2px solid black;
    border-radius: 8px;
    height: 560px;
    width: 100%;
}

.leaflet-attribution-flag {
    display: none !important;
}

.gps-image {
    padding-top: 2px;
    padding-right: 2px;
    display:flex;
    justify-content: center;
    align-items: center;
}
</style>