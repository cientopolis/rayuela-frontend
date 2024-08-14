<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import axios from "axios";

const router = useRouter()
const username = ref("")
const email = ref("")
const password1 = ref("")
const password2 = ref("")
const errors = ref({
  username: "",
  email: "",
  password1: "",
  password2: ""
})

function is_valid_form(){
  let valid = true;

  if(!username.value){
    errors.value.username = "El campo no puede estar vacío";
  } else {
    errors.value.username = "";
  }
  
  if(!email.value){
    errors.value.email = "El campo no puede estar vacío";
  } else {
    errors.value.email = "";
  }

  if(!password1.value){
    errors.value.password1 = "El campo no puede estar vacío";
  } else {
    errors.value.email = "";
  }

  if(password1.value && password2.value && password1.value != password2.value){
    errors.value.password2 = "Las contraseñas no coinciden";
  } else {
    errors.value.password2 = "";
  }

  if(errors.value.username || errors.value.email || errors.value.password1 || errors.value.password2){
    valid = false;
  }

  return valid;
}
async function signup() {
  if(is_valid_form()){
    const user = {"username": username.value, "email": email.value, "password": password1.value}
    axios.post(import.meta.env.VITE_ROOT_API + "/register/", user).then( (response) => {
        router.push({ path: '/login' })
        console.log("CORRECTO - REGISTRADO" + response.data);
        // username.value = ""
        // email.value = ""
        // password1.value = ""
        // password2.value = ""
    }).catch ( (e) => {
      //toast.error("Credenciales de acceso incorrectas", {autoClose: 3000});
      console.log(e)
      console.log("ERROR AL REGISTRAR");
    })
  } else {
    console.log("NO PASA EL VALID")
    console.log("user: " + errors.value.username, "EMAIL: " + errors.value.email, "PASS1: " + errors.value.password1, "PASS2: " + errors.value.password2)
  }
}

</script>

<template>
  <div class="container">
    <h1 class="title">{{ $t("register.title") }}</h1>
    <br>
    <form action class="form" @submit.prevent="signup()">
      <div class="field">
        <label class="label">{{ $t("register.username_field") }}</label>
        <div class="control">
          <input class="input" type="text" v-model="username" :placeholder="$t('register.username_placeholder')">
          <small v-if="errors.username">
            <p class="help is-danger"> {{ errors.username }}</p>
          </small>
        </div>
      </div>

      <div class="field">
        <label class="label">{{ $t("register.email_field") }}</label>
        <div class="control">
          <input class="input" type="email" v-model="email" :placeholder="$t('register.email_placeholder')">
          <small v-if="errors.email">
            <p class="help is-danger"> {{ errors.email }}</p>
          </small>
        </div>
      </div>

      <div class="field">
        <label class="label">{{ $t("register.password1") }}</label>
        <div class="control">
          <input class="input" type="password" v-model="password1" :placeholder="$t('register.password1_placeholder')">
          <small v-if="errors.password1">
            <p class="help is-danger"> {{ errors.password1 }}</p>
          </small>
        </div>
      </div>

      <div class="field">
        <label class="label">{{ $t("register.password2") }}</label>
        <div class="control">
          <input class="input" type="password" v-model="password2" :placeholder="$t('register.password2_placeholder')">
          <small v-if="errors.password2">
            <p class="help is-danger"> {{ errors.password2 }}</p>
          </small>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <label class="checkbox">
            <input type="checkbox">
            {{ $t("register.checkbox") }}<a href="#">{{ $t("register.terms") }}</a>
          </label>
        </div>
      </div>

      <div class="field is-grouped buttons">
        <div class="control left">
          <button class="button is-link" type="submit" value="register">{{ $t("register.button_signup") }}</button>
        </div>
        <div class="right">
          <RouterLink to="/login"><button class="button is-link is-light">{{ $t("register.button_login") }}</button></RouterLink>
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
