<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSolicitudRequest;
use App\Http\Requests\UpdateSolicitudEstadoRequest;
use App\Http\Resources\SolicitudResource;
use App\Models\Solicitud;
use Illuminate\Http\Request;

class SolicitudController extends Controller
{
    public function index() {
        $solicitudes = Solicitud::orderBy('id', 'desc')->get();

        return SolicitudResource::collection($solicitudes);
    }

    public function store(StoreSolicitudRequest $request) {
        $solicitud = Solicitud::create([
            'nombre_documento' => $request->nombre_documento,
            'estado' => 'pendiente',
            'fecha_creacion' => now(),
        ]);

        return (new SolicitudResource($solicitud))
            ->response()
            ->setStatusCode(201);
    }

    public function update(UpdateSolicitudEstadoRequest $request, $id) {
        $solicitud = Solicitud::findOrFail($id);

        $solicitud->update([
            'estado' => $request->estado
        ]);

        return new SolicitudResource($solicitud);
    }
}
