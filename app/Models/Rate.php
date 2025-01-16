<?php

namespace App\Models;

use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class Rate extends Model
{
    protected $table = 'dependant_rates';

    public float $daily_rate;
    public float $half_day_rate;
    public CarbonImmutable $start_date;

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
