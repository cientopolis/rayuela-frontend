<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import authService from "@/services/AuthService";

const router = useRouter()
const username = ref("")
const password = ref("")

onMounted( () =>{
  if(localStorage.getItem("token")){
    router.push({ path: '/dashboard' })
  }
})

async function login() {
  const user = {"username": username.value, "password": password.value}
  authService.token(user)
      .then( () => {
        router.push({ path: '/dashboard' })
        location.reload();
      })
      .catch ( () => {
        toast.error("Credenciales de acceso incorrectas", {autoClose: 3000});
      })
}

</script>

<template>

<div class="container">
  <h1 class="title">{{ $t("login.title") }}</h1>
    <form class="form" @submit.prevent="login">
      <div class="form-group">
        <label for="usernameInput" class="form-label">{{ $t("login.username_field") }}</label>
        <input type="text" class="form-control" id="usernameInput" aria-describedby="userHelp" v-model="username" :placeholder="$t('login.username_placeholder')">
      </div>
      <div class="form-group">
        <label for="inputPassword" class="form-label">{{ $t("login.password") }}</label>
        <input type="password" class="form-control" id="inputPassword" v-model="password" :placeholder="$t('login.password_placeholder')">
      </div>
      <div class="form-group buttons">
        <button type="submit" class="btn btn-success" value="login">{{ $t("login.button_login") }}</button>
        <RouterLink to="/register"><button class="btn btn-outline-primary">{{ $t("login.button_signup") }}</button></RouterLink>
      </div>
    </form>
</div>

</template>

<style scoped>
.container{
  max-width: 360px;
  display: block;
}

.title{
  text-align: center;
}

.form{
  display: block;
}

.buttons{
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}

.left, .right{
  display: flex;
  flex-direction: column;
}

</style>
