import axios from "axios";
import RayuelaService from "@/services/RayuelaService";

class ProjectsService extends RayuelaService {
    getProjects() {
        return axios.get(this.baseUrl + `/projects/`)
            .then((response) => response.data);
    }

    async getDiffProjects() {
        return axios.get(this.baseUrl + `/projects_diff/`, this.getHeaders())
            .then(res => res.data)
    }

    async projectDetails(id) {
        return axios.get(this.baseUrl + `/projects/` + id + `/`)
            .then(res => res.data)
    }

    async projectCollectionTasks(id) {
        return axios.get(this.baseUrl + `/project_collection_tasks/?project_id=` + id)
            .then(res => res.data)
    }

    async collectionTask(id) {
        return axios.get(this.baseUrl + `/collection_tasks/` + id + `/`)
            .then(res => res.data)
    }

    async getSubArea(id) {
        return axios.get(this.baseUrl + `/sub_area/?project_id=` + id)
            .then(res => res.data)
    }

    async setCheckin(lat, lon, datetime, project, task_type) {
        const headers = {
            Authorization: "Bearer " + localStorage.getItem("token"),
        }

        const params = {
            latitude: lat,
            longitude: lon,
            datetime: datetime,
            project: project,
            task_type: task_type
        }

        return axios.post(this.baseUrl + `/game_move/`, null, { headers, params })
    }
}

export default new ProjectsService(); // Sinleton pattern
