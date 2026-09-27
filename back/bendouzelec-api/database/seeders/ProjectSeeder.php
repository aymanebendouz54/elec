<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'title' => 'Extension Réseau HT - Midelt',
                'description' => 'Extension du réseau haute tension pour la zone industrielle de Midelt. Installation de 25 nouveaux pylônes et raccordement au poste source.',
                'image_path' => null,
                'location' => 'Midelt',
                'year' => '2024',
            ],
            [
                'title' => 'Poste de Transformation Solaire',
                'description' => 'Conception et réalisation d\'un poste de transformation pour une ferme solaire photovoltaïque de 5MW.',
                'image_path' => null,
                'location' => 'Errachidia',
                'year' => '2023',
            ],
            [
                'title' => 'Éclairage Public Intelligent',
                'description' => 'Modernisation du réseau d\'éclairage public avec passage au LED et gestion à distance par protocoles intelligents.',
                'image_path' => null,
                'location' => 'Azrou',
                'year' => '2024',
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
}
