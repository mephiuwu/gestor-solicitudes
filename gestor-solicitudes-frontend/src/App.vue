<script setup>
import SolicitudesList from "./components/SolicitudesList.vue";
import { useSolicitudes } from "./composables/useSolicitudes.js";

const { solicitudes, fetchSolicitudes} = useSolicitudes();
fetchSolicitudes();
</script>

<template>
  <div class="p-6">
    <SolicitudesList 
        :solicitudes="solicitudes" 
    />
  </div>
</template>
