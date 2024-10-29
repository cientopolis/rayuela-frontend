<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router';
import {toast} from "vue3-toastify";
import AuthService from "@/services/AuthService";

const router = useRouter()
const username = ref("")
const email = ref("")
const password1 = ref("")
const password2 = ref("")
const readAgreement = ref("")
const errors = ref({
  username: "",
  email: "",
  password1: "",
  password2: "",
  readAgreement: "",
})

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function is_valid_form(){
  const validations = [
    {
      field: 'email',
      isInvalid: !email.value || !isValidEmail(email.value),
      message: 'El correo no tiene un formato correcto',
    },
    {
      field: 'username',
      isInvalid: !username.value,
      message: 'El nombre de usuario es requerido',
    },
    {
      field: 'password1',
      isInvalid: !password1.value,
      message: 'La contraseña es requerida',
    },
    {
      field: 'password2',
      isInvalid: password1.value !== password2.value,
      message: 'Las contraseñas no coinciden',
    },
    {
      field: 'readAgreement',
      isInvalid: !readAgreement.value,
      message: 'Debe aceptar los términos y condiciones primero',
    },
  ]

  validations.forEach(validation => {
    errors.value[validation.field] = validation.isInvalid ? validation.message : '';
  })
  return validations.every(v => !v.isInvalid);
}
async function signup() {
  if(is_valid_form()){
    const user = {username: username.value, email: email.value, password: password1.value}
    AuthService.register(user).then( () => {
      toast.success('¡Registro exitoso!', {autoClose: 2000});
      setTimeout(() => {
        router.push({ path: '/login' })
      },2000)
    }).catch ( (err) => {
      Object.keys(err?.response?.data).map( k => {
        toast.error(err.response.data[k], {autoClose: 3000});
      })
    })
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
          <input class="input" type="text" v-model="email" :placeholder="$t('register.email_placeholder')">
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
            <input type="checkbox" v-model="readAgreement">
            {{ $t("register.checkbox") }}<a href="#">{{ $t("register.terms") }}</a>
          </label>
          <small v-if="errors.readAgreement">
            <p class="help is-danger"> {{ errors.readAgreement }}</p>
          </small>
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
