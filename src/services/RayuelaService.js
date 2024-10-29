export default class RayuelaService {
    baseUrl = import.meta.env.VITE_ROOT_API;
    getHeaders() {
        const token = localStorage.getItem("token")
        return {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
    }
}
