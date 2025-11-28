import { ref } from "vue";
import axios from "axios";

export function useSolicitudes() {
    const solicitudes = ref([]);

    const fetchSolicitudes = async () => {
        const res = await axios.get("http://localhost:8000/api/solicitudes");
        solicitudes.value = res.data.data;
    };

    const crearSolicitud = async (payload) => {
        const res = await axios.post("http://localhost:8000/api/solicitudes", payload);
        solicitudes.value.unshift(res.data.data);
    };

    const actualizarEstado = async (id, estado) => {
        const res = await axios.patch(`http://localhost:8000/api/solicitudes/${id}`, { estado });

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
