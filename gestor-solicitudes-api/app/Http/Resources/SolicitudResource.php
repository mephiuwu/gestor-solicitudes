<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SolicitudResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nombre_documento' => $this->nombre_documento,
            'estado' => $this->estado,
            'fecha_creacion' => $this->fecha_creacion
                ? \Carbon\Carbon::parse($this->fecha_creacion)->format('Y-m-d H:i:s')
                : null,
        ];
    }
}
