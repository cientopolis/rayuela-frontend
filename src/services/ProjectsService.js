import axios from "axios";
import RayuelaService from "@/services/RayuelaService";

class ProjectsService extends RayuelaService{
    getProjects() {
        return axios.get(this.baseUrl + `/projects/`)
            .then((response) => response.data);
    }

    async getDiffProjects() {
        return axios.get(this.baseUrl + `/projects_diff/`, this.getHeaders())
            .then(res => res.data)
    }

    async projectDetails(id) {
        return axios.get(this.baseUrl + `/projects/`+id+`/`)
            .then(res => res.data)
    }

    async projectCollectionTasks(id) {
        return axios.get(this.baseUrl + `/project_collection_tasks/?project_id=`+id)
            .then(res => res.data)
    }
}

export default new ProjectsService(); // Sinleton pattern
