<template>
  <div>
    <h1>Gestión de Solicitudes</h1>

    <button @click="abrirModal()">Crear solicitud</button>

    <table border="1" cellpadding="6">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre de Documento</th>
          <th>Estado</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(solicitud, index) in solicitudes" :key="solicitud.id">
          <td>{{ index + 1 }}</td>
          <td>{{ solicitud.nombre_documento }}</td>
          <td>{{ solicitud.estado }}</td>
          <td>{{ solicitud.fecha_creacion }}</td>
          <td>
            <button @click="abrirModal(solicitud)">Editar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <ModalSolicitud
      :solicitud="modalData"
      @saved="guardar"
      @close="cerrarModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ModalSolicitud from "./ModalSolicitud.vue";
import { useSolicitudes } from "../composables/useSolicitudes";

const { solicitudes, fetchSolicitudes, crearSolicitud, actualizarEstado } = useSolicitudes();

const modalData = ref(null);

function abrirModal(solicitud = null) {
  modalData.value = solicitud ? { ...solicitud } : {};
}

function cerrarModal() {
  modalData.value = null;
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
