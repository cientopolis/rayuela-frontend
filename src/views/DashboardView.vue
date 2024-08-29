<script setup>
import VistaUsuario from '../components/new/VistaUsuario.vue';
import Dashboard from '../components/TheDashboard.vue'
import ProjectsWithoutTheUser from '../components/ProjectsWithoutTheUser.vue';
import ProjectsList from '../components/ProjectsList.vue';
</script>

<template>
    
  <h1 class="titulo">Bienvenido</h1>
  <main>
   
    <VistaUsuario />
    <Dashboard />
    <ProjectsWithoutTheUser />
     
      

  </main>
</template>

<style scoped>
main{
  margin-top:20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
 
}

.titulo{
  text-align: center;
  font-weight: 600;
  font-size: larger;
  transition: all;
  animation: ease-out .7s escaladoLetra
}


@keyframes escaladoLetra {
    0%{
      font-size: small;
    }
    50%{
      font-weight: 700;
      font-size: xx-large;
    }
    100%{
      
      font-size:larger;
    }
}



</style>
