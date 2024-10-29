<script setup>
import {onMounted, ref} from 'vue'
import {useRouter} from 'vue-router';
import {toast} from 'vue3-toastify';
import axios from "axios";
import 'vue3-toastify/dist/index.css';
import ProjectCard from "@/components/ProjectCard.vue";
import ViewMoreButton from "@/components/ViewMoreButton.vue";
import AuthService from "@/services/AuthService";

const router = useRouter()
const complete_name = ref("")
const profile_image = ref("")
const projects_user = ref([])
// const projects_user =
//       ref([{
//         "name": "Proyecto a mano", "image": "http://localhost:8000/rayuelaApp/static/project_image/rio.jpg",
//         "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
//       },
//       {
//         "name": "Segundo proyecto", "image": "http://localhost:8000/rayuelaApp/static/project_image/rio.jpg",
//         "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
//       }])

// TODO: pasar mensajes a locale
onMounted(() => {
  if (!localStorage.getItem("token")) {
    router.push({path: '/login'})
  }

  if (localStorage.getItem("msg_login") == "1") {
    toast.success("Sesión iniciada correctamente", {autoClose: 3000});
    localStorage.removeItem("msg_login")
  }
  if (localStorage.getItem("token")) {
    user_data()
  }
})

async function user_data() {
  const token = localStorage.getItem("token")
  const headers = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }
  //console.log("HEADERS: " + headers.headers.Authorization)

  AuthService.login()
      .then(response => {
        localStorage.setItem("complete_name", response[0].complete_name)
        localStorage.setItem("profile_image", response[0].profile_image)
        localStorage.setItem("projects_user", JSON.stringify(response[0].projects))
        complete_name.value = localStorage.getItem("complete_name")
        profile_image.value = localStorage.getItem("profile_image")
        projects_user.value = JSON.parse(localStorage.getItem("projects_user"))
        console.log("AXIOS GET: " + JSON.stringify(response[0].projects))
        //console.log(response[0].projects)
        console.log("LOCAL STORAGE: " + JSON.parse(localStorage.getItem("projects_user"))[0].name)
        //console.log("NOMBRE: " + JSON.parse(localStorage.getItem("projects_user")))
      })
      .catch(error => {
        console.log("AXIOS CATCH: " + error)
      })
}

</script>

<template>
  <div class="container" style="flex-direction: column">
    <h2 class="subtitle">Mis proyectos</h2>
    <div class="container">
      <div v-for="project in projects_user" :key="project.id">
        <ProjectCard :project="project"/>
      </div>
      <ViewMoreButton/>
    </div>

  </div>

</template>

<style>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;
}

.card image {
  max-width: 100%;
}

</style>
