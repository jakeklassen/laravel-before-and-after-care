<?php

namespace App\Data;

use App\DependantRelationship;
use Spatie\LaravelData\Attributes\Validation\Email;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class CreateContactData extends Data
{
  public function __construct(
    public string $name,
    public DependantRelationship $relationship,

    #[Email]
    public ?string $email,
    public ?string $phone,
  ) {}
}
