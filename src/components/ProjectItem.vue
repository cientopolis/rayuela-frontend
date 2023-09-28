<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
  
const projects = ref([])
const errors = []
const large_text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis harum ipsam quibusdam, nam id nemo nisi doloremque. Modi velit dolores, ducimus illum libero rerum debitis fuga quos, illo, vero facilis!"

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
      <!-- <h2 class="title">{{ $t("projects.title") }}</h2> -->
      <h2 class="title">Nombre de proyecto</h2>
    </div>
    <div class="container" >
      <div class="image">
        <img src="../assets/img/rayuela_640.jpg" alt="Placeholder image">
      </div>
      <div class="content">
        <p>{{ large_text }}</p>
      </div>
      <div class="control">
        <button class="button is-success" type="submit">{{ $t("project.button_join") }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title{
  text-align: center;
  padding: 1rem;
}

.container{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 800px;
}

.image{
  display: flex;
  flex-wrap: wrap;
  max-width: 640px;
  margin: 10px;
  text-align: center;
  -webkit-box-shadow: 4px 4px 5px 1px rgba(15,14,15,0.6);
  -moz-box-shadow: 4px 4px 5px 1px rgba(15,14,15,0.6);
  box-shadow: 4px 4px 5px 1px rgba(15,14,15,0.6);
}

.content{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;
}

.control{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

</style>