<?php

namespace App\Data;

use App\ScheduleDay;
use Carbon\CarbonImmutable;
use Spatie\LaravelData\Attributes\WithCast;
use Spatie\LaravelData\Casts\DateTimeInterfaceCast;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class CreateScheduleData extends Data
{
    public function __construct(
        #[WithCast(DateTimeInterfaceCast::class, format: [
            'Y-m-d',
            'Y-m-d\TH:i:s.uP',
            'Y-m-d\TH:i:s.uZ',
        ])]
        public CarbonImmutable $start_date,

        public ?ScheduleDay $sunday = null,
        public ?ScheduleDay $monday = null,
        public ?ScheduleDay $tuesday = null,
        public ?ScheduleDay $wednesday = null,
        public ?ScheduleDay $thursday = null,
        public ?ScheduleDay $friday = null,
        public ?ScheduleDay $saturday = null,
    ) {}
}
