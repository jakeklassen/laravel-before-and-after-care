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
        Schema::create('dependant_rates', function (Blueprint $table) {
            $table->id();
            $table->decimal('daily_rate', 10, 2)->nullable();
            $table->decimal('half_day_rate', 10, 2)->nullable();
            $table->date('start_date')->format('Y-m-d');
            $table->foreignId('dependant_id')->constrained()->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['dependant_id', 'start_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dependant_rates');
    }
};
