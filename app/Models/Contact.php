<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class Contact extends Model
{
    protected $table = 'dependant_contacts';

    public string $name;
    public string $email;
    public ?string $phone = null;
    public string $relationship;

    protected $fillable = [
        'dependant_id',
        'name',
        'email',
        'phone',
        'relationship',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'relationship' => 'string',
    ];

    /**
     * Get the dependant that owns the contact.
     */
    public function dependant(): BelongsTo
    {
        return $this->belongsTo(Dependant::class);
    }
}
