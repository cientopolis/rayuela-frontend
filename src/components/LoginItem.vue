<script>

</script>

<template>
  <div class="container">
    <h1 class="title">{{ $t("login.title") }}</h1>
    <br>
      <div class="field">
        <label class="label">{{ $t("login.email_field") }}</label>
        <div class="control">
          <input class="input" type="email" :placeholder="$t('login.email_placeholder')">
        </div>
      </div>

      <div class="field">
        <label class="label">{{ $t("login.password") }}</label>
        <div class="control">
          <input class="input" type="password" :placeholder="$t('login.password_placeholder')">
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link">{{ $t("login.button") }}</button>
        </div>
      </div>
  </div>
</template>

<style scoped>
.container{
  max-width: 360px;
}

.title{
  text-align: center;
}
</style>
