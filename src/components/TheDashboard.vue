<script setup>
import Project from './TheProject.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import axios from "axios";
import 'vue3-toastify/dist/index.css';

const router = useRouter()
const complete_name = ref("")
const profile_image = ref("")
const projects_user = ref([])
const showModal = ref(false)
// TODO: pasar mensajes a locale
onMounted(async() => {
  /*
  if(!localStorage.getItem("token")){
    router.push({ path: '/login' })
  }
  */
  if (localStorage.getItem("msg_login")=="1"){
    toast.success("Sesión iniciada correctamente", {autoClose: 3000});
    localStorage.removeItem("msg_login")
  }
  if(localStorage.getItem("token")){
    user_data()
  }
  // mockeado despues se borra
  const response = await fetch('../../public/archivos_prueba/mockProjects.json')
  projects_user.value = await response.json()

})

async function user_data() {
  const token = localStorage.getItem("token")
  const headers = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }
  //console.log("HEADERS: " + headers.headers.Authorization)

  axios.get(import.meta.env.VITE_ROOT_API + "/login/", headers)
    .then(response => {
      localStorage.setItem("complete_name", response.data[0].complete_name)
      localStorage.setItem("profile_image", response.data[0].profile_image)
      localStorage.setItem("projects_user", JSON.stringify(response.data[0].projects))
      complete_name.value = localStorage.getItem("complete_name")
      profile_image.value = localStorage.getItem("profile_image")
      //projects_user.value = JSON.parse(localStorage.getItem("projects_user"))
      
      
      console.log("AXIOS GET: " + JSON.stringify(response.data[0].projects))
      //console.log(response.data[0].projects)
      console.log("LOCAL STORAGE: " + JSON.parse(localStorage.getItem("projects_user"))[0].name)
      //console.log("NOMBRE: " + JSON.parse(localStorage.getItem("projects_user")))
    })
    .catch(error => {
      console.log("AXIOS CATCH: " + error)
    })
}



</script>

<template>
<div >
  
  <h2 class="subtitle">Mis proyectos</h2>
  
  
   
  <div class="container">
    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <Project :show="showModal" :miActividad="actividad" :id="getId" :name="getName" :web="getWeb" :image="getImage" :description="getDescription" @close="showModal=false">
        </Project>
      </Teleport>
      <div v-for="project in projects_user" :key="project.id">
        <div class="card" @click="showModal=true, actividad=true , getId=project.id, getName=project.name, getWeb=project.web, getImage=project.image, getDescription=project.description">
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

.subtitle{
  font-size: large;
  text-align: center;
  margin: 10px;
  justify-content: center;
  padding: 1rem;
}

.container{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;
}

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