<template>
    <div class="map-container">
        <div class="map-wrapper">
            <div class="map-title">Misiones disponibles</div>
            <div id="map1" class="map"></div>
        </div>
        <div class="map-wrapper">
            <div class="map-title">Misiones realizadas</div>
            <div id="map2" class="map"></div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const url = ref('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
const attribution = ref('&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors');

const center1 = ref([51.505, -0.09]);
const zoom1 = ref(13);

const center2 = ref([48.8566, 2.3522]);
const zoom2 = ref(12);

const markers1 = ref([]);
const markers2 = ref([]);

onMounted(async () => {
    // Inicializamos el primer mapa
    const map1 = L.map('map1').setView(center1.value, zoom1.value);
    L.tileLayer(url.value, { attribution: attribution.value }).addTo(map1);

    // Inicializamos el segundo mapa
    const map2 = L.map('map2').setView(center2.value, zoom2.value);
    L.tileLayer(url.value, { attribution: attribution.value }).addTo(map2);

    // Cargamos y agregamos marcadores para el primer mapa
    try {
        const response1 = await fetch('/archivos_prueba/pointsRealizados.json');
        if (!response1.ok) {
            throw new Error('Network response was not ok');
        }
        const data1 = await response1.json();
        markers1.value = data1;

        markers1.value.forEach(marker => {
            const leafletMarker = L.marker(marker.position).addTo(map1);
            leafletMarker.bindPopup(marker.popup);
        });
    } catch (error) {
        console.error('Error fetching markers for map1:', error);
    }

    // Cargamos y agregamos marcadores para el segundo mapa
    try {
        const response2 = await fetch('/archivos_prueba/pointsPendientes.json');
        if (!response2.ok) {
            throw new Error('Network response was not ok');
        }
        const data2 = await response2.json();
        markers2.value = data2;

        markers2.value.forEach(marker => {
            const leafletMarker = L.marker(marker.position).addTo(map2);
            leafletMarker.bindPopup(marker.popup);
        });
    } catch (error) {
        console.error('Error fetching markers for map2:', error);
    }    
});
</script>

<style scoped>
.map-container {
  display: flex;
  gap: 20px; /* Espacio entre los mapas */
  max-width: 1000px; /* Ancho máximo para el contenedor de los mapas */
  width: 100%; /* Ancho completo del contenedor padre */
  justify-content: center; /* Centra los mapas horizontalmente */
}

.map-wrapper {
  display: flex;
  flex-direction: column; /* Apila el título y el mapa verticalmente */
  align-items: center; /* Centra el contenido horizontalmente */
  height: 400px;
  width: 100%;
  min-width: 340px;
  max-width: 360px;
}

.map-title {
  font-size: 16px; /* Tamaño de la fuente del título */
  font-weight: bold; /* Negrita para el título */
  margin-bottom: 10px; /* Espacio entre el título y el mapa */
}

.map {
  height: 300px;
  width: 100%;
  min-width: 300px;
  max-width: 360px; /* Ancho máximo para cada mapa */
}

@media (max-width: 850px) {
    .map-container {
      flex-direction: column; 
      align-items: center; 
      gap: 20px; 
    }

}
</style>
