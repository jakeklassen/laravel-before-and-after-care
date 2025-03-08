<?php

namespace App\Data;

use Illuminate\Support\Facades\Auth;
use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class UpdateDependantData extends Data
{
    /**
     * @param CreateScheduleData $schedule
     * @param CreateContactData[] $contacts
     */
    public function __construct(
        public string $name,

        /** @var CreateScheduleData */
        public CreateScheduleData $schedule,

        /** @var CreateContactData[] */
        public array $contacts,
    ) {}

    public static function authorize(): bool
    {
        return Auth::check();
    }
}
