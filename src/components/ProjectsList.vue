<script setup>
import axios from 'axios'
import Project from './TheProject.vue'
import { ref, onMounted } from 'vue'

const projects = ref([])
const errors = []
const showModal = ref(false)

onMounted(async() => {
  try {
    const response = await axios.get(import.meta.env.VITE_ROOT_API+`/projects/`)
    projects.value = response.data
  } catch (e) {
    errors.push(e)
  }
})
</script>

<template>
<div>
  <div>
    <h2 class="title">{{ $t("projects.title") }}</h2>
    <h3 class="subtitle">{{ $t("projects.subtitle") }} </h3>
  </div>
  <div class="buttons">
    <div class="left">
      <RouterLink to="/login"><button class="button is-success">{{ $t("projects.button_login") }}</button></RouterLink>
    </div>
    <div class="right">
      <RouterLink to="/register"><button class="button is-link">{{ $t("projects.button_signup") }}</button></RouterLink>
    </div>
  </div> 
    <div class="container">
      <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <Project :show="showModal" :name="getName" :image="getImage" :description="getDescription" @close="showModal=false">
        </Project>
      </Teleport>
      <div v-for="project in projects" :key="project.id">
        <div class="card" @click="showModal=true, getName=project.name, getImage=project.image, getDescription=project.description">
            <div>
              <figure class="image is-4by3">
                <img :src="project.image" alt="Placeholder image">
              </figure>
            </div>
            <div class="card-content">
              <div class="title is-4">
                {{ project.name }}
              </div>
              <div class="content">
                <div>
                  <div v-if="project.description.length<120">{{ project.description }}</div>
                  <div v-else>{{ project.description.substring(0,110)+"..." }}</div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
</div>
</template>

<style scoped>
.card{
  height: 440px;
  width: 360px;
  margin: 10px;
  padding: 5px;
  -webkit-box-shadow: 4px 4px 5px 1px rgba(15,14,15,0.6);
  -moz-box-shadow: 4px 4px 5px 1px rgba(15,14,15,0.6);
  box-shadow: 4px 4px 5px 1px rgba(15,14,15,0.6);
}

.card image{
  max-width: 100%;
}

.container{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.title, .subtitle{
  text-align: center;
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

</style>