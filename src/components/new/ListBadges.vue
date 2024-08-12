<script setup>
import { ref, onMounted } from 'vue';
import Badge from './Badge.vue';

// Estado para manejar la visibilidad del modal y el badge seleccionado
const showModal = ref(false);
const selectedBadge = ref({});

// Cargar las insignias desde el archivo JSON
const badges = ref([]);

const fetchBadges = async () => {
  try {
    const response = await fetch('/archivos_prueba/badges.json');
    if (!response.ok) {
      throw new Error('Error al cargar las insignias');
    }
    badges.value = await response.json();
  } catch (error) {
    console.error(error);
  }
};

// Mostrar el modal con la insignia seleccionada
const openModal = (badge) => {
  selectedBadge.value = badge;
  showModal.value = !showModal.value;
};

onMounted(() => {
  fetchBadges();
});
</script>

<template>
  <div class="badge-list">
    <!-- Mostrar el modal si `showModal` es true -->
    <Teleport to="body">
      <Badge
        :show="showModal"
        :name="selectedBadge.name"
        :description="selectedBadge.description"
        :icon="selectedBadge.icon"
        :category="selectedBadge.category"
        :points="selectedBadge.points"
        :difficulty="selectedBadge.difficulty"
        :obtainedDate="selectedBadge.obtainedDate"
        :requirements="selectedBadge.requirements"
        :celebrationText="selectedBadge.celebrationText"
        @close="showModal = false" 
      />
    </Teleport>

    <div v-for="badge in badges" :key="badge.name" class="card" @click="openModal(badge)">
      <div>
        <figure class="image is-4by3">
          <img :src="badge.icon" alt="Badge image"> <!-- Usa `badge.icon` -->
        </figure>
      </div>
      <div class="card-content">
        <div class="title is-4">
          <div v-if="badge.name.length < 12">
            {{ badge.name }}
          </div>
          <div v-else>
            {{ badge.name.substring(0, 9) + "..." }}
          </div>
        </div>
        <div class="content">
          <div v-if="badge.description.length < 30">
            {{ badge.description }}
          </div>
          <div v-else>
            {{ badge.description.substring(0, 25) + "..." }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.badge-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  padding: 20px 0;
}
.card {
  cursor: pointer;
  transform: scale(70%)
}


</style>
