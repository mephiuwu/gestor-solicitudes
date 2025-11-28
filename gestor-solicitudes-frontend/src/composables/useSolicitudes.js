import { ref } from "vue";
import axios from "axios";

export function useSolicitudes() {
    const solicitudes = ref([]);
    const API_URL = import.meta.env.VITE_API_URL;

    const fetchSolicitudes = async () => {
        const res = await axios.get(`${API_URL}/solicitudes`);
        solicitudes.value = res.data.data;
    };

    const crearSolicitud = async (payload) => {
        const res = await axios.post(`${API_URL}/solicitudes`, payload);
        solicitudes.value.unshift(res.data.data);
    };

    const actualizarEstado = async (id, estado) => {
        const res = await axios.patch(`${API_URL}/solicitudes/${id}`, { estado });
        const index = solicitudes.value.findIndex(s => s.id === id);
        if (index !== -1) solicitudes.value[index] = res.data.data;
    };

    return {
        solicitudes,
        fetchSolicitudes,
        crearSolicitud,
        actualizarEstado
    };
}
