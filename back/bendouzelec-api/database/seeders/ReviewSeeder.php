<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Review;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        $reviews = [
            [
                'name' => 'Ahmed Mansouri',
                'comment' => 'Une équipe très professionnelle et réactive. Les travaux ont été réalisés dans les délais impartis avec une qualité irréprochable.',
                'stars' => 5,
                'approved' => true,
            ],
            [
                'name' => 'Fatima Ezzahra',
                'comment' => 'Excellent service pour l\'installation de notre poste de transformation. Expertise technique évidente.',
                'stars' => 5,
                'approved' => true,
            ],
            [
                'name' => 'Société de Construction X',
                'comment' => 'Partenaire de confiance pour tous nos projets d\'infrastructure électrique. Je recommande vivement BendouzElec.',
                'stars' => 4,
                'approved' => true,
            ],
        ];

        foreach ($reviews as $review) {
            Review::create($review);
        }
    }
}
