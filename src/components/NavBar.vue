<script setup>
  import { ref } from 'vue'

  const showNav = ref(false)
  const langs = ['ES', 'EN', 'PT']

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
        <a class="navbar-item">
          <RouterLink to="/login">{{ $t("navBar.login") }}</RouterLink>
        </a>
        <a class="navbar-item">
          <RouterLink to="/register">{{ $t("navBar.register") }}</RouterLink>
        </a>
        <a class="navbar-item">
          <RouterLink to="/about">{{ $t("navBar.about") }}</RouterLink>
        </a>
      </div>
      <div class="navbar-end">
        <div>
          <div class="select is-rounded">
            <select v-model="$i18n.locale">
              <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
                {{ lang }} 
              </option>
            </select>
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