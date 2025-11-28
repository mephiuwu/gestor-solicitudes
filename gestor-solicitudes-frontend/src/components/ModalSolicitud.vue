<template>
    <div v-if="solicitud" class="modal-backdrop">
        <div class="modal">
            <h2>{{ isEdit ? 'Editar solicitud' : 'Crear solicitud' }}</h2>

            <form @submit.prevent="handleSubmit">
                <div>
                    <label>Nombre de Documento</label>
                    <br>
                    <input v-if="!isEdit" v-model="form.nombre_documento" type="text" required />
                    <span v-else>{{ form.nombre_documento }}</span>
                </div>
                <br>
                <div>
                    <label>Estado</label>
                    <select v-model="form.estado" required>
                        <option value="pendiente">Pendiente</option>
                        <option value="aprobado">Aprobado</option>
                        <option value="rechazado">Rechazado</option>
                    </select>
                </div>
                <br>
                <button type="submit">
                    {{ isEdit ? 'Actualizar' : 'Crear' }}
                </button>

                <button type="button" @click="$emit('close')">Cancelar</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { computed, reactive, watch } from "vue";

const props = defineProps({
    solicitud: {
        type: Object,
        default: () => null
    }
});

const emit = defineEmits(["saved", "close"]);

const form = reactive({
    nombre_documento: "",
    estado: ""
});

const isEdit = computed(() => props.solicitud && props.solicitud.id);

watch(
    () => props.solicitud,
    (data) => {
        if (data) {
            form.nombre_documento = data.nombre_documento;
            form.estado = data.estado;
        } else {
            form.nombre_documento = "";
            form.estado = "";
        }
    },
    { immediate: true }
);

function handleSubmit() {
    emit("saved", {
        ...form,
        id: props.solicitud?.id ?? null
    });
}
</script>

<style>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background: white;
    padding: 20px;
    width: 400px;
    border-radius: 8px;
}
</style>
