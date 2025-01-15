<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dependant_attendance', function (Blueprint $table) {
            $table->id();
            $table->date('date')->format('Y-m-d');
            $table->enum('status', ['absent', 'present']);
            $table->enum('when', ['am', 'pm', 'day']);
            $table->foreignId('dependant_id')->constrained()->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['date', 'dependant_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dependant_attendance');
    }
};
