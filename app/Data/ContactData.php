<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class ContactData extends Data
{
    public int $id;
    public string $name;
    public string $relationship;
    public ?string $email;
    public ?string $phone;
}
