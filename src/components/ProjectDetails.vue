<script setup>
import {onMounted, ref} from 'vue'
import 'vue3-toastify/dist/index.css';
import ProjectsService from "@/services/ProjectsService";
//import DataTable from 'datatables.net-vue3'

const errors = []
const projectId = JSON.parse(localStorage.getItem("projectId"))
const project = ref({});
const collectionTasks = ref([{}]);

function saveCollectionTaskId(id){
    try {
        localStorage.setItem("collectionTaskId", id)
        console.log("LOCAL STORAGE COLLECTION TASK ID: " + JSON.parse(localStorage.getItem("collectionTaskId")))
    } catch (e) {
        errors.push(e)
    }
}

// const columns = ref([
//     { data: 'id', title: 'ID' },
//     { data: 'task_type', title: 'Tipo de tarea' },
//     { data: 'sub_area', title: 'Área' },
//     { data: 'time_restriction', title: 'Invervalo de tiempo' },
//     { data: null, title: 'Completa', render: function(data){
//         return completed(data.completed)
//     }},
// ]);

function completed(task){
    if (task.completed) {
        return "Sí";
    }
    else {
        return "No";
    }
}

onMounted(async () => {
    try {
        const responseDetails = await ProjectsService.projectDetails(projectId);
        project.value = responseDetails
        const responseCollectionTasks = await ProjectsService.projectCollectionTasks(projectId);
        collectionTasks.value = responseCollectionTasks
        console.log("COLLECTION TASKS: ", JSON.stringify(collectionTasks.value))
    } catch (e) {
        errors.push(e)
    }
})
</script>

<template>
<div class="container rounded">
    <h2 class="h2 title">{{ project.name }}</h2>
    <div class="image">
        <img :src="project.image" alt="Imagen del proyecto">
    </div>
    <div class="description text-center fs-6">
        <p>{{ project.description }}</p>
    </div>
    <div v-if="project.web">
        <a :href="project.web" target="_blank"><button class="btn btn-info web">{{ $t("project.button_website") }}</button></a>
    </div>

</div>

<div class="container rounded">
    <h3 class="h3">Tareas</h3>
    <table class="table table-hover table-striped">
        <thead>
                <tr>
                <th>#</th>
                <th>Tipo de tarea</th>
                <th>Área</th>
                <th>Intervalo de tiempo</th>
                <th>Completada</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="task in collectionTasks" :key="task.id">
                <td>{{ task.id }}</td>
                <td>{{ task.task_type }}</td> 
                <td>{{ task.sub_area }}</td>
                <td>{{ task.time_restriction }}</td>
                <td>{{ completed(task) }}</td>
                <RouterLink to="/collection_task"><button class="btn btn-primary" @click="saveCollectionTaskId(task.id)">Realizar tarea</button></RouterLink>
            </tr>
        </tbody>
    </table>

    <!-- <DataTable
        class="table table-hover table-striped"
        width="100%"
        :columns="columns"
        :data="collectionTasks">

        <thead>
            <tr>
                <th>#</th>
                <th>Tipo de tarea</th>
                <th>Área</th>
                <th>Intervalo de tiempo</th>
                <th>Completada</th>
            </tr>
        </thead>
    </DataTable>  -->
</div>
</template>

<style>

.title {
    display: block;
    width: 100%;
    text-align: center;
}

.image img {
    object-fit: cover;
    width: 100%;
    height: auto;
    display: block;
    padding: 1rem;
}

.web {
    margin: 1rem;
    width: 100%;
    text-align: center;
}

.description {
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;
    width: 100%;
}
</style>