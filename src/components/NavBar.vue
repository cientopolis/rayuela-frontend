<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue'

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

  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
      <a class="navbar-brand" href="/"><img class="rounded" src="@/assets/img/rayuela_logo.jpg" width="112" height="28"></a>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <div class="select btn btn-rounded">
            <select v-model="$i18n.locale">
              <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
                {{ lang }}
              </option>
            </select>
          </div>
        </li>
        <li class="nav-item">
          <RouterLink to="/about" class="nav-link"><a>{{ $t("navBar.about") }}</a></RouterLink>
        </li>
      </ul>
      <form class="d-flex">
          <div v-if="token" class="navbar-container">
            <div class="user-info">
              <span>{{ username }}</span>
              <img :src="profile_image" width="32" height="32" alt="profile-pic">
            </div>
            <button class="btn btn-danger" @click="logout()" value="logout">{{ $t("navBar.button_logout") }}</button>
          </div>
          <div v-else>
            <div class="buttons" style="gap: 8px">
              <div class="left">
                <RouterLink to="/login"><button class="btn btn-success">{{ $t("navBar.button_login") }}</button></RouterLink>
              </div>
              <div class="right">
                <RouterLink to="/register"><button class="btn btn-primary">{{ $t("navBar.button_signup") }}</button></RouterLink>
              </div>
            </div>
          </div>
      </form>
    </div>
  </div>
</nav>

</template>

<style scoped>
.navbar {
  margin-bottom: 20px;
}
.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.buttons{
  display: flex;
  justify-content: space-between;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

@media (max-width: 768px) {
  .navbar-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .user-info {
    margin-bottom: 10px;
  }
}
</style>
