<script setup>
  import { defineProps, withDefaults } from 'vue';

  const props = defineProps({
    show: Boolean,
    name: String,
    description: String,
    icon: String,
    category: String,
    points: Number,
    difficulty: String,
    obtainedDate: String,
    requirements: String,
    celebrationText: String
  })
</script>

<template>
  <Transition name="badge-fade">
    <div v-if="props.show" class="badge">
      <div class="modal-container">
        <div class="badge-icon">
          <img :src="props.icon" alt="Badge Icon" />
        </div>
        <div class="badge-content">
          <h2 class="badge-title">{{ props.name }}</h2>
          <p class="badge-description">{{ props.description }}</p>
          <p class="badge-category">Categoría: {{ props.category }}</p>
          <p class="badge-points">Puntos: {{ props.points }}</p>
          <p class="badge-difficulty">Dificultad: {{ props.difficulty }}</p>
          <p class="badge-date">Fecha de Obtención: {{ props.obtainedDate }}</p>
          <p class="badge-requirements">Requisitos: {{ props.requirements }}</p>
          <p class="badge-celebration">{{ props.celebrationText }}</p>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button id="close" class="button is-danger" @click="$emit('close')">{{ $t("project.button_close") }}</button>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.badge {
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

.modal-container {
  max-width: 1080px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.badge-icon img {
  max-width: 80px;
  max-height: 80px;
}

.badge-content {
  margin-left: 20px;
}

.badge-title {
  font-size: 1.5em;
  margin: 0;
}

.badge-description {
  font-size: 1em;
  color: #666;
}

.badge-category,
.badge-points,
.badge-difficulty,
.badge-date,
.badge-requirements,
.badge-celebration {
  margin: 8px 0;
}

.badge-celebration {
  font-weight: bold;
  color: #28a745;
}

/* Transition styles */
.badge-fade-enter-active, .badge-fade-leave-active {
  transition: opacity 0.5s;
}
.badge-fade-enter, .badge-fade-leave-to /* .badge-fade-leave-active in <2.1.8 */ {
  opacity: 0;
}


.modal-footer{
  display: flex;
  justify-content: center;
}


#join, #close{
  display: flex;
  justify-content: center;
  padding: 1rem;
  margin: 1rem;
}

.modal-default-button {
  float: right;
}
</style>
