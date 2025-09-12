<script setup>
import {onMounted, ref} from 'vue'
import ProjectsService from "@/services/ProjectsService";

const errors = []
const collectionTask = ref({});
const collectionTaskId = JSON.parse(localStorage.getItem("collectionTaskId"))

onMounted(async () => {
    try {
        const responseDetails = await ProjectsService.collectionTask(collectionTaskId);
        collectionTask.value = responseDetails;
        //console.log("COLLECTION TASK: ", collectionTask.value)
    } catch (e) {
        errors.push(e)
    }
})

</script>

<template>
<div class="container">
    <h2 class="title">Tarea #{{ collectionTask.id }}</h2>
</div>
<div >
    <ul>Tipo de tarea: {{ collectionTask.task_type }}</ul>
    <ul>Área: {{ collectionTask.sub_area }}</ul>
    <ul>Intervalo de tiempo: {{ collectionTask.time_restriction }}</ul>
</div>
</template>

<style>
.title {
    display: block;
    width: 100%;
    text-align: center;
}
</style>