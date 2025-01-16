<?php

namespace App\Data;

use Carbon\CarbonImmutable;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class RateData extends Data
{
  public int $id;
  public float $daily_rate;
  public float $half_day_rate;
  public CarbonImmutable $start_date;
}
