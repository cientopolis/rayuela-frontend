
<script setup>
  import 'vue3-toastify/dist/index.css';
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  const router =  useRouter()
  import axios from 'axios';
  
  const score = ref(0);
  
  onMounted(async () => {
    try {
      // Cambia la URL a la ruta del archivo JSON para pruebas
      const response = await axios.get('/archivos_prueba/scoreMock.json');
      score.value = response.data.score;
    } catch (e) {
      console.error('Error fetching score:', e);
    }
  });

  const register = () => {
    // ir a la ruta de registro de check-in
    router.push({ path: '/checkin' })
    console.log('Registro');
  };
  
  const logout = () => {
    router.push({ path: '/dashboard' })
    console.log('Cerrar sesión');
  };
</script>

<template>
    <div class="conteiner">
      <div class="score-container">
        <h2 class="title">Puntaje obtenido hasta ahora en el proyecto:</h2>
        <p class="score">{{ score }}</p>
      </div>
      <div class="button-container">
        <button class="button register" @click="register">Registrar tarea</button>
        <button class="button logout" @click="logout">Salir de proyecto</button>
      </div>
    </div>    
</template>
  
<style scoped>
  .conteiner {
    display: flex;
    flex-direction: row; /* Dirección por defecto */
    justify-content: space-around;
    align-items: center;
    gap: 100px;
    max-width: 560px;
    margin: 0 auto;
    position: relative;
    width: auto;
  }

  .button-container {
    display: flex;
    flex-direction: column;
    gap: 10px; 
    justify-content: space-between;
  }
  
  .button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    color: white;
    font-size: 16px;
    cursor: pointer;
  }
  
  /* Media query para pantallas más estrechas de 700px */
  @media (max-width: 700px) {
    .conteiner {
      flex-direction: column; /* Cambia la dirección a columna */
      align-items: stretch; /* Alinea los elementos en el contenedor para que ocupen el ancho completo */
      gap: 20px; /* Ajusta el espacio entre los elementos */
    }
    
    .button-container {
      flex-direction: row; /* Cambia la dirección de los botones a fila */
      justify-content: center; /* Centra los botones horizontalmente */
      gap: 10px; /* Ajusta el espacio entre los botones */
    }
    
    .button {
      width: auto; /* Ajusta el ancho de los botones */
      flex: none; /* Desactiva el flex-grow para los botones */
    }
  }

  .register {
    background-color: #007bff; 
    flex: 2; 
  }
  
  .logout {
    background-color: #dc3545; 
    flex: 1; 
  }

  .score-container {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    text-align: center;
    width: 100%;
    min-width: 300px;
  }
  
  .title {
    font-size: 18px;
    color: #333;
  }
  
  .score {
    font-size: 24px;
    font-weight: bold;
    color: #007bff;
  }
</style>
