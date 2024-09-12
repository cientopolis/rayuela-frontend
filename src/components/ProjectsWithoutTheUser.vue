<script setup>
import axios from 'axios'
import Project from './TheProject.vue'
import { ref, onMounted } from 'vue'
import 'vue3-toastify/dist/index.css';

const projects = ref([])
const errors = []
const showModal = ref(false)

onMounted(async() => {
  const token = localStorage.getItem("token")
  const headers = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }
  try {
      //const response = await axios.get(import.meta.env.VITE_ROOT_API+`/projects_diff/`, headers)
      const response = await fetch('../../public/archivos_prueba/mockProjectsSinUnirse.json')
      
      projects.value = await response.json()
      console.log(projects)
  } catch (e) {
      errors.push(e)
  }
})

</script>

<template>
<div>
    <h2 class="subtitle">Proyectos disponibles</h2>
    <div class="container">
      <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <Project :show="showModal" :unirse="getUnirse" :id="getId" :name="getName" :web="getWeb" :image="getImage" :description="getDescription" @close="showModal=false">
        </Project>
      </Teleport>
      <div v-for="project in projects" :key="project.id">
        <div class="card" @click="showModal=true, getUnirse=true , getId=project.id , getName=project.name, getWeb=project.web, getImage=project.image, getDescription=project.description">
            <div>
              <figure class="image is-4by3">
                <img :src="project.image" alt="Placeholder image">
              </figure>
            </div>
            <div class="card-content">
              <div class="title is-6">
                <div v-if="project.name.length<12">
                  {{ project.name }}
                </div>
                <div v-else>
                  {{ project.description.substring(0,9)+"..." }}
                </div>
              </div>
              <div class="content">
                <div>
                  <div v-if="project.description.length<30">
                    {{ project.description }}
                  </div>
                  <div v-else>
                    {{ project.description.substring(0,25)+"..." }}
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
      <button class="button-more button is-link is-light"> Ver más </button>
    </div>
</div>
</template>

<style scoped>
.card{
  height: 350px;
  width: 200px;
  margin: 10px;
  padding: 5px;
  -webkit-box-shadow: 4px 4px 5px 1px rgba(15,14,15,0.6);
  -moz-box-shadow: 4px 4px 5px 1px rgba(15,14,15,0.6);
  box-shadow: 4px 4px 5px 1px rgba(15,14,15,0.6);
}

.card image{
  max-width: 100%;
}

.card title{
  font-size: small;
}

.container{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.subtitle{
  display: flex;
  flex-wrap: wrap;
  font-size: large;
  justify-content: center;
  padding: 10px;
}

.content{
  color: gray;
}

.buttons{
  display: flex;
  justify-content: center;

}

.left, .right{
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.button-more{
  height: 350px;
  width: 100px;
  margin: 10px;
  padding: 5px;
  -webkit-box-shadow: 4px 4px 5px 1px rgba(15,14,15,0.6);
  -moz-box-shadow: 4px 4px 5px 1px rgba(15,14,15,0.6);
  box-shadow: 4px 4px 5px 1px rgba(15,14,15,0.6);
}

</style>