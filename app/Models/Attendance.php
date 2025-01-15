<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attendance extends Model
{
    protected $fillable = [
        'dependant_id',
        'date',
        'status',
        'when',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    /**
     * Get the dependant that owns the schedule.
     */
    public function dependant(): BelongsTo
    {
        return $this->belongsTo(Dependant::class);
    }
}
