<script setup>
import {sliceTextAt} from "../utils/textUtils";
import Project from "@/components/TheProject.vue";
import {ref} from "vue";

let showId = ref(null);

defineProps(['project'])
</script>

<template>
  <div class="card" @click="showId = project.id">
    <div class="media">
      <img class="img-thumbnail" :src="project.image" alt="Imagen del proyecto">
    </div>
    <div class="card-content">
      <div class="title">
        <div class="text">
          {{ sliceTextAt(project.name, 10) }}
        </div>
      </div>
      <div class="text">
        <div>
          {{ sliceTextAt(project.description, 25) }}
        </div>
      </div>
    </div>
  </div>
  <Project :show="showId === project.id" :projectId="project.id" :name="project.name" :web="project.web" :image="project.image"
           :description="project.description" @close="showId=null">
  </Project>
</template>

<style>
.card {
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  width: 12em;
  margin: 8px;
}

.image img {
  object-fit: cover;
  width: 100%;
  height: auto;
}

.card-content {
  padding: 1rem;
}

.title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}
</style>
