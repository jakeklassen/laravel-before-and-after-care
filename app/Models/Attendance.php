<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class Attendance extends Model
{
    protected $table = 'dependant_attendance';

    public string $date;
    public string $status;
    public string $when;

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
