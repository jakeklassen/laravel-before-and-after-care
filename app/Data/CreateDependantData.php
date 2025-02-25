<?php

namespace App\Data;

use Illuminate\Support\Facades\Auth;
use Spatie\LaravelData\Attributes\Validation\Max;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class CreateDependantData extends Data
{
    /**
     * @param CreateRateData[] $rates
     * @param CreateScheduleData[] $schedules
     * @param CreateContactData[] $contacts
     */
    public function __construct(
        public string $name,
        public bool $is_active,

        #[Max(1)]
        /** @var CreateRateData[] */
        public array $rates,

        #[Max(1)]
        /** @var CreateScheduleData[] */
        public array $schedules,

        /** @var CreateContactData[] */
        public array $contacts,
    ) {}

    public static function authorize(): bool
    {
        return Auth::check();
    }
}
