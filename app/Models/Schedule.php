<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Schedule extends Model
{
    protected $fillable = [
        'dependant_id',
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'start_date',
    ];

    protected $casts = [
        'start_date' => 'date',
    ];

    /**
     * Get the dependant that owns the schedule.
     */
    public function dependant(): BelongsTo
    {
        return $this->belongsTo(Dependant::class);
    }
}
