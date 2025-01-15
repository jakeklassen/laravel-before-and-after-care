<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Dependant extends Model
{
    protected $fillable = [
        'name',
        'is_active',
        'user_id',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Get the user that owns the dependant.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the schedules for the dependant.
     */
    public function schedules(): HasMany
    {
        return $this->hasMany(Schedule::class);
    }

    /**
     * Get the attendance for the dependant.
     */
    public function attendance(): HasMany
    {
        return $this->hasMany(Attendance::class);
    }


    /**
     * Get the rates for the dependant.
     */
    public function rates(): HasMany
    {
        return $this->hasMany(Rate::class);
    }

    /**
     * Get the contacts for the dependant.
     */
    public function contacts(): HasMany
    {
        return $this->hasMany(Contact::class);
    }

    /**
     * Get the latest schedule for the dependant.
     */
    public function latestSchedule(): BelongsTo
    {
        return $this->belongsTo(Schedule::class)
            ->latestOfMany('start_date');
    }

    /**
     * Get the latest rate for the dependant.
     */
    public function latestRate(): BelongsTo
    {
        return $this->belongsTo(Rate::class)
            ->latestOfMany('start_date');
    }
}
