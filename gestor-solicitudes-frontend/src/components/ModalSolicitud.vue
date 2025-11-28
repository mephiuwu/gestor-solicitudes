<template>
    <transition name="fade">
        <div v-if="solicitud" class="fixed inset-0 bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
            <transition name="scale">
                <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
                    <div v-if="error" class="bg-red-50 border-l-4 border-red-500 text-red-800 px-4 py-3 flex items-start gap-3">
                        <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                        </svg>
                        <span class="text-sm">{{ error }}</span>
                    </div>
                    <br>
                    <h2 class="text-xl font-semibold mb-4">
                        {{ isEdit ? 'Editar solicitud' : 'Crear solicitud' }}
                    </h2>

                    <form @submit.prevent="handleSubmit" class="space-y-4">
                        <div>
                            <label class="block font-medium mb-1">Nombre de Documento</label>
                            <input v-if="!isEdit" v-model="form.nombre_documento" required type="text" placeholder="Nombre de Documento" 
                                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                            <span v-else class="text-gray-700">{{ form.nombre_documento }}</span>
                        </div>

                        <div>
                            <label class="block font-medium mb-1">Estado</label>
                            <select v-model="form.estado" required
                                class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
                                <option value="pendiente">Pendiente</option>
                                <option value="aprobado">Aprobado</option>
                                <option value="rechazado">Rechazado</option>
                            </select>
                        </div>

                        <!-- Botones -->
                        <div class="flex justify-end space-x-2 mt-4">
                            <button type="button" @click="$emit('close')"
                                class="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100">
                                Cancelar
                            </button>

                            <button type="submit"
                                class="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600">
                                {{ isEdit ? 'Actualizar' : 'Crear' }}
                            </button>
                        </div>
                    </form>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script setup>
import { computed, reactive, watch } from "vue";

const props = defineProps({
    solicitud: {
        type: Object,
        default: () => null
    },
    error: {
        type: String,
        default: null
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
/* Animaciones con Tailwind */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.scale-enter-active {
    transition: transform 0.2s;
}

.scale-enter-from {
    transform: scale(0.9);
}

.scale-leave-to {
    transform: scale(0.9);
}

.error-box {
  background: #fee;
  border-left: 4px solid #e33;
  padding: 8px 12px;
  border-radius: 4px;
  margin-bottom: 12px;
  font-size: 14px;
}
</style>
