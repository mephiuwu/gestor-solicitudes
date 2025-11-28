# 📋 Gestor de Solicitudes - Frontend

Sistema web moderno para la gestión y seguimiento de solicitudes de documentos, desarrollado con Vue 3 y Vite.

## ✨ Características

- Crear nuevas solicitudes de documentos
- Editar el estado de solicitudes existentes
- Filtrar solicitudes por estado y nombre
- Visualización en tabla con estados codificados por color
- Interfaz moderna y responsiva con Tailwind CSS
- Experiencia de usuario fluida con transiciones suaves

## 🛠️ Tecnologías

- **Vue 3** - Framework JavaScript progresivo
- **Vite** - Herramienta de construcción rápida
- **Tailwind CSS** - Framework CSS utility-first
- **Axios** - Cliente HTTP para llamadas a la API
- **Composition API** - API moderna de Vue para lógica reutilizable

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── SolicitudesList.vue    # Lista principal con filtros
│   └── ModalSolicitud.vue     # Modal para crear/editar
├── composables/
│   └── useSolicitudes.js      # Lógica compartida de solicitudes
└── App.vue                    # Componente raíz
```

## 🚀 Configuración del Proyecto

### Pre-requisitos

- Node.js (versión 16 o superior)
- npm o yarn

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/mephiuwu/gestor-solicitudes.git
cd gestor-solicitudes-frontend
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:

Crea un archivo `.env` en la raíz del proyecto:
```env
VITE_API_URL=http://localhost:3000/api
```

### Desarrollo

Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🎯 Uso

### Crear una Solicitud

1. Haz clic en el botón "Crear solicitud"
2. Ingresa el nombre del documento
3. Selecciona el estado inicial
4. Haz clic en "Crear"

### Editar una Solicitud

1. Haz clic en "Editar" en la fila de la solicitud
2. Modifica el estado según sea necesario
3. Haz clic en "Actualizar"

### Filtrar Solicitudes

- **Por Estado**: Usa el selector desplegable para filtrar por pendiente, aprobado o rechazado
- **Por Nombre**: Escribe en el campo de búsqueda para filtrar por nombre de documento
- Usa el botón "Limpiar" para resetear todos los filtros

## 🎨 Estados de Solicitudes

| Estado | Color | Descripción |
|--------|-------|-------------|
| Pendiente | 🟡 Amarillo | Solicitud en espera de revisión |
| Aprobado | 🟢 Verde | Solicitud aprobada |
| Rechazado | 🔴 Rojo | Solicitud rechazada |

## 📝 API Endpoints Utilizados

El frontend consume los siguientes endpoints:

- `GET /solicitudes` - Obtener todas las solicitudes
- `POST /solicitudes` - Crear nueva solicitud
- `PATCH /solicitudes/:id` - Actualizar estado de solicitud
