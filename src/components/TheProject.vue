<script setup>

const props = defineProps({
  show: Boolean,
  name: String,
  web: String,
  image: String,
  description: String
})

</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">
            <h2 class="title is-link">{{ props.name }}</h2>
        </slot>
        </div>

        <div class="modal-body">
          <slot name="body">
            <div class="modal-image">
                <img :src="props.image" alt="Placeholder image">
            </div>
            <div v-if="props.web" class="modal-web">
              <a :href="props.web" target="_blank"><button class="button is-info">Web del proyecto</button></a>
            </div>
            <div class="modal-description">
                <p>{{ props.description }}</p>
            </div>
          </slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button id="join" class="button is-success" type="submit">{{ $t("project.button_join") }}</button>
            <button id="close" class="button is-danger" @click="$emit('close')">Cerrar</button>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  max-width: 1080px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h2 {
  margin: 0;
  text-align: center;
  padding: 1rem;
}

.modal-body {
  margin: 20px 0;
  flex-wrap: wrap;
  max-width: 1080px;
  margin: 10px;
  text-align: center;
  -webkit-box-shadow: 4px 4px 5px 1px rgba(15,14,15,0.6);
  -moz-box-shadow: 4px 4px 5px 1px rgba(15,14,15,0.6);
  box-shadow: 4px 4px 5px 1px rgba(15,14,15,0.6);
}

.modal-image{
  max-width: 100%;
  padding: 1rem;
}

.modal-footer{
  display: flex;
  justify-content: center;
}

#join, #close{
  display: flex;
  justify-content: center;
  padding: 1rem;
  margin: 1rem;
}

.modal-default-button {
  float: right;
}

.modal-description{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;
  font-size: large;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>