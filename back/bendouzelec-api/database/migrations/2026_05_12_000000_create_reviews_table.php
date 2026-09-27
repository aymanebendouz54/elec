<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $label) {
            $label->id();
            $label->string('name');
            $label->text('comment');
            $label->integer('stars')->default(5);
            $label->boolean('approved')->default(true); // On peut les approuver par défaut
            $label->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
