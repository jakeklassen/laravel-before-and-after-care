<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Rate extends Model
{
    protected $fillable = [
        'dependant_id',
        'daily_rate',
        'half_day_rate',
        'start_date',
    ];

    protected $casts = [
        'daily_rate' => 'decimal:2',
        'half_day_rate' => 'decimal:2',
        'start_date' => 'date',
    ];

    /**
     * Get the dependant that owns the rate.
     */
    public function dependant(): BelongsTo
    {
        return $this->belongsTo(Dependant::class);
    }
}
