<script setup>
const errors = []
const props = defineProps({
  show: Boolean,
  projectId: Number,
  name: String,
  web: String,
  image: String,
  description: String
})

function saveProjectId(){
    try {
        localStorage.setItem("projectId", props.projectId)
    } catch (e) {
        errors.push(e)
    }
}

function isUserProject(){
  const projects_user = localStorage.getItem('projects_user');
  if (projects_user) {
    for (let i = 0; i < JSON.parse(projects_user).length; i++) {
      const project = JSON.parse(projects_user)[i];
      if (project.id === props.projectId) {
        return true;
      }
    }
  }
}
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container rounded modal-sm">
        <div class="modal-header content-align">
          <h2 class="text-center">{{ props.name }}</h2>
        </div>

        <div class="modal-body">
          <div class="modal-image">
            <img :src="props.image" alt="Imagen del proyecto">
          </div>
          <div v-if="props.web" class="modal-web">
            <a :href="props.web" target="_blank"><button class="btn btn-info">{{ $t("project.button_website") }}</button></a>
          </div>
          <div class="modal-description">
              <p>{{ props.description }}</p>
          </div>
        </div>

        <div class="modal-footer">
          <div v-if="isUserProject()">
            <RouterLink to="/project" ><button id="details" class="btn btn-primary" type="submit" @click="saveProjectId()" >Ver detalles</button></RouterLink>
          </div>
          <div v-else>
            <button id="join" class="btn btn-success" type="submit">{{ $t("project.button_join") }}</button>
          </div>
          <button id="close" class="btn btn-danger" @click="$emit('close')">{{ $t("project.button_close") }}</button>
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
  max-width: 720px;
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
  flex-wrap: wrap;
  max-width: 720px;
  margin: 10px;
  text-align: center;
  padding: 1rem;
}

.modal-image img{
  max-width: 100%;
  padding: 1rem;
  height: auto;
}

.modal-web {
  text-align: center;
}

.modal-description{
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  padding: 1rem;
  font-size: medium;
}

.modal-footer{
  display: flex;
  justify-content: center;
}

#join, #close, #details{
  display: flex;
  justify-content: center;
  padding: 1rem;
  margin: 1rem;
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
