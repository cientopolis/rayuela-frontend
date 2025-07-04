<script setup>
import {useRouter} from 'vue-router';
import {ref, onMounted} from 'vue'
import {toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import ProjectCard from "@/components/ProjectCard.vue";
import ViewMoreButton from "@/components/ViewMoreButton.vue";
import ProjectsService from "@/services/ProjectsService";

const router = useRouter()
const projects = ref([])
const errors = []

onMounted(async () => {
  if (localStorage.getItem("token")) {
    router.push({path: '/dashboard'})
  } else {
    if (localStorage.getItem("msg_logout") == "1") {
      toast.success("Sesión finalizada correctamente", {autoClose: 3000});
      localStorage.removeItem("msg_logout")
    }
  }
  try {
    const response = await ProjectsService.getProjects()
    projects.value = response.slice(0, 3)
  } catch (e) {
    errors.push(e)
  }

})

</script>

<template>
  <div>
    <h2 class="subtitle">Proyectos disponibles</h2>
    <div class="container">
      <div v-for="project in projects" :key="project.id">
        <ProjectCard :project="project"/>
      </div>
      <ViewMoreButton />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.subtitle {
  font-size: large;
  padding: 1rem;
}

</style>
