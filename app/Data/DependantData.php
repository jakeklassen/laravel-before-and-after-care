<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class DependantData extends Data
{
    public ?int $id;
    public string $name;
    public bool $is_active;

    /** @var array<ContactData> */
    public array $contacts = [];

    /** @var array<RateData> */
    public array $rates = [];

    /** @var array<ScheduleData> */
    public array $schedules = [];
}
