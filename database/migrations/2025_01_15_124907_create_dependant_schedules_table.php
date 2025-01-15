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
        Schema::create('dependant_schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dependant_id')->constrained()->cascadeOnDelete();
            $table->enum('sunday', ['am', 'pm', 'day'])->nullable();
            $table->enum('monday', ['am', 'pm', 'day'])->nullable();
            $table->enum('tuesday', ['am', 'pm', 'day'])->nullable();
            $table->enum('wednesday', ['am', 'pm', 'day'])->nullable();
            $table->enum('thursday', ['am', 'pm', 'day'])->nullable();
            $table->enum('friday', ['am', 'pm', 'day'])->nullable();
            $table->enum('saturday', ['am', 'pm', 'day'])->nullable();
            $table->date('start_date')->format('Y-m-d');
            $table->timestamps();

            $table->unique(['dependant_id', 'start_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dependant_schedules');
    }
};
