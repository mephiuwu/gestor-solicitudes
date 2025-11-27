<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Solicitud>
 */
class SolicitudFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre_documento' => $this->faker->words(3, true),
            'estado' => $this->faker->randomElement(['pendiente', 'aprobado', 'rechazado']),
            'fecha_creacion' => now()->subDays(rand(0, 30)),
        ];
    }
}
