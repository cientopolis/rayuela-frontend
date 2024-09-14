<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue'

const showNav = ref(false)
const langs = ['ES', 'EN', 'PT']
const router = useRouter()
const token = ref(false)
const username = ref("")
const profile_image = ref("")

onMounted(async() => {
  if(localStorage.getItem("token")){
    token.value = true
    username.value = localStorage.getItem("username")
    profile_image.value = localStorage.getItem("profile_image")
    router.push({ path: '/dashboard' })
  }
})

function logout(){
  localStorage.setItem("msg_logout", "1")
  localStorage.removeItem("token")
  localStorage.removeItem("username")
  localStorage.removeItem("profile_image")
  localStorage.removeItem("complete_name")
  localStorage.removeItem("projects_user")
  token.value = false
  router.push({ path: '/' })
}

</script>

<template>
  <nav class="navbar is-spaced is-light" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item">
        <RouterLink to="/"><img src="@/assets/img/rayuela_logo.jpg" width="112" height="28"></RouterLink>
      </a>

      <a role="button" class="navbar-burger" @click="showNav = !showNav" :class="{ 'is-active': showNav }" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': showNav }">
      <div class="navbar-start">
        <div class="select is-rounded">
          <select v-model="$i18n.locale">
            <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
              {{ lang }} 
            </option>
          </select>
        </div>
        <RouterLink to="/about"><a class="navbar-item">{{ $t("navBar.about") }}</a></RouterLink> 
      </div>

      <div class="navbar-end">
        <div>
          <div v-if=token>
            {{ username }}
            <router-link :to="{ name: 'dashboard' }"><img :src="profile_image" width="32" height="32"></router-link>
            <button class="button is-danger" @click="logout()" value="logout">{{ $t("navBar.button_logout") }}</button>
          </div>
          <div v-else>
            <div class="buttons">
              <div class="left">
                <RouterLink to="/login"><button class="button is-success">{{ $t("navBar.button_login") }}</button></RouterLink>
              </div>
              <div class="right">
                <RouterLink to="/register"><button class="button is-link">{{ $t("navBar.button_signup") }}</button></RouterLink>
              </div>
            </div> 
          </div> 
        </div>
      </div>
    </div>
  </nav>
      
</template>

<style scoped>
nav{
  margin-bottom: 20px;
}
</style>