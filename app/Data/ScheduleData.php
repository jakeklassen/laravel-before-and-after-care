<?php

namespace App\Data;

use Carbon\CarbonImmutable;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class ScheduleData extends Data
{
  public int $id;

  public ?string $sunday;
  public ?string $monday;
  public ?string $tuesday;
  public ?string $wednesday;
  public ?string $thursday;
  public ?string $friday;
  public ?string $saturday;

  public CarbonImmutable $start_date;
}
