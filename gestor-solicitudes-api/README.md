# 🧾 Gestor de Solicitudes - Backend API

API REST con Laravel para gestionar solicitudes de documentos.

---

## 📦 Requerimientos

- PHP >= 8.1
- Composer
- SQLite (viene configurado por defecto)

---

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/mephiuwu/gestor-solicitudes.git
cd gestor-solicitudes-api

# Instalar dependencias
composer install

# Configurar entorno
cp .env.example .env
php artisan key:generate

# Crear base de datos
touch database/database.sqlite

# Ejecutar migraciones y datos de prueba
php artisan migrate --seed

# Iniciar servidor
php artisan serve
```

La API estará en: `http://localhost:8000`

---

## 📡 Endpoints

### Listar solicitudes
```http
GET /api/solicitudes
```

**Respuesta:**
```json
{
  "data": [
    {
      "id": 1,
      "nombre_documento": "Documento A",
      "estado": "pendiente",
      "fecha_creacion": "2025-11-27"
    }
  ]
}
```

---

### Crear solicitud
```http
POST /api/solicitudes
```

**Body:**
```json
{
  "nombre_documento": "Documento B",
  "estado": "pendiente",
  "fecha_creacion": "2025-11-27"
}
```

**Respuestas:**
- `201` - Creado correctamente
- `422` - Error de validación

---

### Actualizar estado
```http
PATCH /api/solicitudes/{id}
```

**Body:**
```json
{
  "estado": "aprobado"
}
```

**Estados válidos:** `pendiente`, `aprobado`, `rechazado`

**Respuestas:**
- `200` - Actualizado correctamente
- `404` - Solicitud no encontrada

---

### Eliminar solicitud
```http
DELETE /api/solicitudes/{id}
```

**Respuestas:**
- `204` - Eliminado correctamente
- `404` - Solicitud no encontrada

---

## 📁 Estructura

```
app/
├── Http/
│   ├── Controllers/
│   │   └── SolicitudController.php      # Lógica de endpoints
│   ├── Requests/
│   │   ├── StoreSolicitudRequest.php    # Validación al crear
│   │   └── UpdateSolicitudRequest.php   # Validación al actualizar
│   └── Resources/
│       └── SolicitudResource.php        # Formato de respuesta JSON
└── Models/
    └── Solicitud.php                    # Modelo de la base de datos
```
