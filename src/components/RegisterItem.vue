<script>

</script>

<template>
  <div class="container">
    <h1 class="title">{{ $t("register.title") }}</h1>
    <br>
    <div class="field">
      <label class="label">{{ $t("register.user_field") }}</label>
      <div class="control">
        <input class="input" type="text" :placeholder="$t('register.user_placeholder')">
      </div>
    </div>

    <div class="field">
      <label class="label">{{ $t("register.email_field") }}</label>
      <div class="control">
        <input class="input" type="email" :placeholder="$t('register.email_placeholder')">
      </div>
    </div>

    <div class="field">
      <label class="label">{{ $t("register.password") }}</label>
      <div class="control">
        <input class="input" type="password" :placeholder="$t('register.password_placeholder')">
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

    <div class="field">
      <div class="control">
        <label class="radio">
          <input type="radio" name="question">
          {{ $t("register.yes") }}
        </label>
        <label class="radio">
          <input type="radio" name="question">
          {{ $t("register.no") }}
        </label>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link">{{ $t("register.button") }}</button>
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
