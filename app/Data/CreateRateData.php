<?php

namespace App\Data;

use Carbon\CarbonImmutable;
use Spatie\LaravelData\Attributes\Validation\Numeric;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class CreateRateData extends Data
{
  public function __construct(
    #[Numeric]
    public readonly float $daily_rate,

    #[Numeric]
    public readonly float $half_day_rate,

    #[WithCast(DateTimeInterfaceCast::class, format: 'Y-m-d')]
    public readonly CarbonImmutable $start_date,
  ) {}
}
