<?php

namespace App\Data;

use Illuminate\Support\Facades\Auth;
use Spatie\LaravelData\Attributes\Validation\BooleanType;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class CreateDependantData extends Data
{
  public function __construct(
    public string $name,
    public bool $is_active,

    #[Max(1)]
    /** @var array<CreateRateData> */
    public array $rates,

    #[Max(1)]
    /** @var array<CreateScheduleData> */
    public array $schedules,

    /** @var array<CreateContactData> */
    public array $contacts,
  ) {}

  public static function authorize(): bool
  {
    return Auth::check();
  }
}
