<script>

</script>

<template>
  <div class="container">
    <h1 class="title">{{ $t("login.title") }}</h1>
    <br>
    <div class="form">
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

      <div class="field is-grouped buttons">
        <div class="control left">
          <button class="button is-success" type="submit">{{ $t("login.button_login") }}</button>
        </div>
        <div class="right">
          <RouterLink to="/register"><button class="button is-link is-light">{{ $t("login.button_signup") }}</button></RouterLink>
        </div>
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

.buttons{
  display: flex;
  justify-content: space-between;
}

.left, .right{
  display: flex;
  flex-direction: column;
}

</style>
