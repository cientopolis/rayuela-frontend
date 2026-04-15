<script setup>
import { onMounted, ref } from 'vue';
import { toast } from "vue3-toastify";
import ProjectsService from "@/services/ProjectsService";
// Mapa
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../assets/js/leaflet-simple-locate.min.js";
import "../assets/css/leaflet-simple-locate.css";

const errors = [];
const gameMove = ref([{}]);
const checkin = ref({});
const competition = ref([{}]);
const checkinId = JSON.parse(localStorage.getItem("checkinId"));
const projectId = JSON.parse(localStorage.getItem("projectId"));
var map = {};
var point = {};

onMounted(async () => {
    try {
        toast.success('¡Carga de checkin exitosa!', { autoClose: 3000 });

        const responseGameMove = await ProjectsService.getGameMove(checkinId);
        gameMove.value = responseGameMove;

        const responseCheckin = await ProjectsService.getCheckin(checkinId);
        checkin.value = responseCheckin;

        const responseCompetition = await ProjectsService.getCompetition(projectId);
        competition.value = responseCompetition;

        const leaderboard_tbody = document.getElementById("leaderboard");
        await createLeaderboard(competition.value, leaderboard_tbody);

        // Mapa
        map = L.map('map').setView([checkin.value.latitude, checkin.value.longitude], 20);
        // https://tile.openstreetmap.org/{z}/{x}/{y}.png
        L.tileLayer('https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/capabaseargenmap@EPSG%3A3857@png/{z}/{x}/{-y}.png', {
            minZoom: 12,
            maxZoom: 24, 
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        var markerOptions = {
            clickable: true
        }

        // Marcador
        point = L.marker([checkin.value.latitude, checkin.value.longitude], markerOptions).addTo(map);
        point.bindPopup(dateCustom(new Date(Date.parse(checkin.value.datetime)))).openPopup();
    } catch (e) {
        errors.push(e);
    }
})

async function createLeaderboard(competition, leaderboard) {
    for (let index = 0; index < competition.length; index++){
        const tr = document.createElement("tr");
        const td_index = document.createElement("td");
        const td_user = document.createElement("td");
        const td_points = document.createElement("td");
        const td_badges = document.createElement("td");
        td_index.innerHTML = index + 1;
        td_user.innerHTML = competition[index].game_profile.user;
        td_points.innerHTML = competition[index].total_points;
        td_badges.innerHTML = competition[index].total_badges;
        leaderboard.appendChild(tr);
        leaderboard.appendChild(td_index);
        leaderboard.appendChild(td_user);
        leaderboard.appendChild(td_points);
        leaderboard.appendChild(td_badges);
    }
}

function dateCustom(date) {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() +1).toString();
    const day = date.getDate().toString();
    const hour = date.getHours().toString();
    const minutes = date.getMinutes().toString();
    return `${day}/${month}/${year} - ${hour}:${minutes} hs`
}

function badge(badge){
    if (badge) {
        return "Insignias obtenidas por la jugada: " + badge;
    }
    else {
        return "No se consiguieron insignias.";
    }
}

function collection_task(){
    if (gameMove.value.collection_task) {
        return "Por haber completado una tarea del proyecto, se reciben más puntos.";
    }
    else {
        return "No se completó una tarea del proyecto, se otorgan puntos por completar checkin.";
    }
}

</script>

<template>
<div>
    <h1>Detalles del checkin</h1>
    <div class="game">
        <p class="points">Se obtuvieron {{ gameMove[0].points }} puntos.</p>
        <p>{{ collection_task() }}</p>
        <p>{{ badge(gameMove[0].badge) }}</p>
    </div>
    <!-- Mapa -->
    <div class="map-container">
        <div class="map" id="map">
        </div>
    </div>
    <h2>Tabla de posiciones del proyecto</h2>
    <div class="table-container">
        <table class="table table-hover table-striped">
            <thead>
                <tr>
                    <th>Posición</th>
                    <th>Perfil</th>
                    <th>Puntos</th>
                    <th>Insignias</th>
                </tr>
            </thead>
            <tbody id="leaderboard">
                <!-- <tr v-for="(participant, index) in leaderboard" :key="participant">
                    <td>{{ index +1 }}</td> 
                    <td>{{ participant.user }}</td> 
                    <td>{{ participant.points }}</td>
                    <td>{{ participant.badges }}</td>
                </tr> -->
            </tbody>
        </table>
    </div>


</div>
</template>

<style>
.points {
    font-size: xx-large;
    color: white;
    background-color: #019FAB;
    border-radius: 15px;
}

.game {
    font-size: large;
    text-align: center;
    width: auto;
    margin: 25px;
    padding: 5px;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    border-radius: 15px;
    border: 2px solid #019FAB;
}

.map-container {
    max-width: 100%;
    margin: 25px;
}

.map {
    position: relative;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    border-radius: 15px;
    border: 2px solid #019FAB;
    height: 360px;
    width: 100%;
}

.leaflet-attribution-flag {
    display: none !important;
}

.table-container {
    max-width: 100%;
    margin: 25px;
}
</style>