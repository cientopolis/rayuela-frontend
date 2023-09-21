<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
  
const projects = ref([])
const errors = []
const tarjetas = [1,2,3,4,5]

onMounted(async() => {
  try {
    const response = await axios.get(`http://localhost:8000/api/projects/`)
    projects.value = response.data
    //console.log(projects[0].name)
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

      <div  class="container" >
        <div v-for="project in tarjetas" :key="project.id">
          <div class="card">
            <div>
              <figure class="image is-4by3">
                <img src="../assets/img/rayuela_640.jpg" alt="Placeholder image">
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img src="../assets/img/rayuela_640.jpg" alt="Placeholder image">
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4"> Nombre de proyecto</p>
                  <!-- <div class="subtitle is-6">
                    <ul v-for="admin in project.admins" :key="admin.id">
                      <li>{{ admin }}</li>
                    </ul>
                  </div> -->
                </div>
              </div>
              <div class="content">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Officiis harum ipsam quibusdam, nam id nemo nisi doloremque.
                Modi velit dolores, ducimus illum libero rerum debitis fuga quos, illo, vero facilis!
              </div>
            </div>
          </div>
        </div>
      </div>

    <!-- <div class="projects" v-for="project in projects" :key="project.id">
      <div class="card">
        <div>
          <figure class="image is-4by3">
            <img :src="project.image" alt="Placeholder image">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">{{ project.name }}</p> -->
              <!-- <div class="subtitle is-6">
                <ul v-for="admin in project.admins" :key="admin.id">
                  <li>{{ admin }}</li>
                </ul>
              </div> -->
            <!-- </div>
          </div>
          <div class="content">
            {{ project.description }}
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<style scoped>
.card{
  width: 360px;
  margin: 10px;
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

/* .projects{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
} */

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