<template>
  <div class="max-w-6xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Gestión de Solicitudes</h1>

    <div class="flex items-center justify-between flex-wrap gap-2 mb-4">
      <!-- Botón a la izquierda -->
      <button class="h-10 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded" @click="abrirModal()">
        Crear solicitud
      </button>

      <div class="flex gap-2 flex-wrap">
        <select v-model="filtroEstado"
          class="h-10 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="aprobado">Aprobado</option>
          <option value="rechazado">Rechazado</option>
        </select>

        <input type="text" v-model="filtroNombre" placeholder="Buscar por nombre..."
          class="h-10 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />

        <button class="h-10 px-4 bg-gray-200 hover:bg-gray-300 rounded" @click="limpiarFiltros">
          Limpiar
        </button>
      </div>
    </div>

    <br>
    <div class="overflow-x-auto shadow-md rounded-lg">
      <table class="min-w-full bg-white">
        <thead class="bg-gray-100 text-gray-700 uppercase text-sm">
          <tr>
            <th class="py-3 px-4 text-left">#</th>
            <th class="py-3 px-4 text-left">Nombre de Documento</th>
            <th class="py-3 px-4 text-left">Estado</th>
            <th class="py-3 px-4 text-left">Fecha</th>
            <th class="py-3 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(solicitud, index) in solicitudesFiltradas" :key="solicitud.id" class="border-b hover:bg-gray-50">
            <td class="py-2 px-4">{{ index + 1 }}</td>
            <td class="py-2 px-4">{{ solicitud.nombre_documento }}</td>
            <td class="py-2 px-4 capitalize">
              <span :class="{
                'text-yellow-600': solicitud.estado === 'pendiente',
                'text-green-600': solicitud.estado === 'aprobado',
                'text-red-600': solicitud.estado === 'rechazado'
              }">
                {{ solicitud.estado }}
              </span>
            </td>
            <td class="py-2 px-4">{{ solicitud.fecha_creacion }}</td>
            <td class="py-2 px-4">
              <button class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-3 py-1 rounded"
                @click="abrirModal(solicitud)">
                Editar
              </button>
            </td>
          </tr>
          <tr v-if="solicitudes.length === 0">
            <td colspan="5" class="text-center py-4 text-gray-500">
              No hay solicitudes disponibles
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <ModalSolicitud :solicitud="modalData" @saved="guardar" @close="cerrarModal" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import ModalSolicitud from "./ModalSolicitud.vue";
import { useSolicitudes } from "../composables/useSolicitudes";

const { solicitudes, fetchSolicitudes, crearSolicitud, actualizarEstado } = useSolicitudes();

const modalData = ref(null);

const filtroEstado = ref("");
const filtroNombre = ref("");

// Estos son los filtros
const solicitudesFiltradas = computed(() => {
  if (filtroEstado.value === "" && filtroNombre.value === "") return solicitudes.value;

  return solicitudes.value.filter((s) => {
    const estadoOk = filtroEstado.value ? s.estado === filtroEstado.value : true;
    const nombreOk = s.nombre_documento.toLowerCase().includes(filtroNombre.value.toLowerCase());
    return estadoOk && nombreOk;
  });
});

function abrirModal(solicitud = null) {
  modalData.value = solicitud ? { ...solicitud } : {};
}

function cerrarModal() {
  modalData.value = null;
}

function limpiarFiltros() {
  filtroEstado.value = "";
  filtroNombre.value = "";
}

async function cargarSolicitudes() {
  await fetchSolicitudes();
}

async function guardar(form) {
  try {
    if (form.id) {
      await actualizarEstado(form.id, form.estado);
    } else {
      await crearSolicitud(form);
    }
    cerrarModal();
  } catch (e) {
    console.error(e);
  }
}

onMounted(() => cargarSolicitudes());
</script>
