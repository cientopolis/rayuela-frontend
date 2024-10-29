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
    <br>
    <form action class="form" @submit.prevent="login">
      <div class="field">
        <label class="label">{{ $t("login.username_field") }}</label>
        <div class="control">
          <input class="input" type="text" v-model="username" :placeholder="$t('login.username_placeholder')">
        </div>
      </div>

      <div class="field">
        <label class="label">{{ $t("login.password") }}</label>
        <div class="control">
          <input class="input" type="password" v-model="password" :placeholder="$t('login.password_placeholder')">
        </div>
      </div>

      <div class="field is-grouped buttons">
        <div class="control left">
          <button class="button is-success" type="submit" value="login">{{ $t("login.button_login") }}</button>
        </div>
        <div class="right">
          <RouterLink to="/register"><button class="button is-link is-light">{{ $t("login.button_signup") }}</button></RouterLink>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.container{
  max-width: 360px;
}

.title{
  text-align: center;
}

.buttons{
  display: flex;
  justify-content: space-between;
}

.left, .right{
  display: flex;
  flex-direction: column;
}

</style>
