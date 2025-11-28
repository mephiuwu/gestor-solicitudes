import { ref } from "vue";
import axios from "axios";

export function useSolicitudes() {
    const API_URL = import.meta.env.VITE_API_URL;
    const solicitudes = ref([]);
    const error = ref(null);

    const handleError = (err) => {
        console.log(err.response.data);
        const message = 
            err.response?.data?.message || 
            err.response?.data?.error ||
            err.message || 
            'Ocurrió un error inesperado';
        
        error.value = message;
        
        throw err;
    };

    const clearError = () => {
        error.value = null;
    };

    const fetchSolicitudes = async () => {
        clearError();
        try {
            const res = await axios.get(`${API_URL}/solicitudes`);
            solicitudes.value = res.data.data;

        } catch (err) {
            handleError(err);
        }
    };

    const crearSolicitud = async (payload) => {
        clearError();
        try {
            const res = await axios.post(`${API_URL}/solicitudes`, payload);
            solicitudes.value.unshift(res.data.data);
        } catch (err) {
            handleError(err);
        }
    };

    const actualizarEstado = async (id, estado) => {
        clearError();
        try {
            const res = await axios.patch(`${API_URL}/solicitudes/${id}`, { estado });
            const index = solicitudes.value.findIndex(s => s.id === id);
            if (index !== -1) solicitudes.value[index] = res.data.data;
        } catch (err) {
            handleError(err);
        }
    };

    return {
        solicitudes,
        error,
        fetchSolicitudes,
        crearSolicitud,
        actualizarEstado
    };
}
