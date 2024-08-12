<script setup>

import {ref , onMounted} from "vue"

let usuarios = ref([]) 

onMounted(async() =>{
    try {
    const response = await fetch('../../public/archivos_prueba/usuariosPosicion.json');
    if (!response.ok) {
      throw new Error('Error al cargar las insignias');
    }
    
    const data = await response.json();
  //si data viene sin ordenar entonces ordenar y si vienen mas de 10 entonces sacar primeros 10 *preferencialmente  quevenga de la api
    usuarios.value = data.toSorted((a,b) =>  b.score - a.score ).splice(0,10)

  } catch (error) {
    console.error(error);
  }
})




</script>

<template>
    <section class="leaderboard">
        <table summary="Clasificacion  del proyecto">
          <caption>
              Posicionamiento del proyecto 🏆
          </caption>  
          <thead>
              <tr>
                  <th>Posicion</th>
                  <th>Nombre de Usuario</th>
                  <th>Puntaje</th>
                  <th>Insignias</th>
              </tr>
          </thead>
          <tbody>
            <tr v-for="(usuario, index) in usuarios" :key="index" class="filas" :class="[{posicion1: index+1 === 1}, {posicion2 : index+1 === 2}, {posicion3 : index + 1 === 3}]">
                <td class="posicion"  >{{ index + 1 }}</td>
                <td class="nombre">{{usuario.nombre}}</td>
                <td class="puntos">{{usuario.score}}</td>
                <td class="insignias">{{ usuario.insignias.length }}</td>
            </tr>
          </tbody>
        </table>
        
    </section>
</template>

<style scoped>
.leaderboard{
  display: flex;
  align-items: center;
  justify-content: center;
  height:440px;
}
table{
  table-layout: fixed;
  background:linear-gradient(rgb(194, 147, 29), aliceblue);
  width: 100%;
  padding:4px;
  max-width: 760px;
  border: 2px solid  black;
  text-align: center;
  box-shadow: -4px 4px  rgb(99, 99, 99);
  
  caption{
    margin: 24px;
    color:goldenrod;
    font-size: larger;
    font-weight: 800;
  }

 

  .filas{
    border: 1px solid black;
    border-collapse: collapse;
  }

}



.posicion1 , .posicion2 , .posicion3{
  font-weight: 700;

  
}

.posicion1{
  background-color: goldenrod;
  color: rgb(248, 209, 111);

    .posicion::after{
      content: "🥇";
    }
}

.posicion2{
  background-color: grey;
  color: rgb(177, 169, 169);

  .posicion::after{
    content: "🥈";
  }
  
}



.posicion3{
  background-color: rgb(203, 109, 81);
  color: brown ;

  
  .posicion::after{
    content: "🥉";
  }
}



</style>