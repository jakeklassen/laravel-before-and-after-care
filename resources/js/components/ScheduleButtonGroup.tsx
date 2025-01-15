import { useState } from "react";
import {
  AttendanceWhen,
  AttendanceWhenOptions,
} from "../modules/attendance/attendance";

type ScheduleButtonGroupProps = {
  disabled?: boolean;
  onToggleHandler: (when: AttendanceWhenOptions) => void;
  initialWhen?: AttendanceWhenOptions;
};

export function ScheduleButtonGroup({
  disabled = false,
  onToggleHandler,
  initialWhen = null,
}: ScheduleButtonGroupProps) {
  const [when, setWhen] = useState<
    ScheduleButtonGroupProps["initialWhen"] | null
  >(initialWhen);

  const isPresentAM = when === "am";
  const isPresentPM = when === "pm";
  const isPresentFullDay = when === "day";

  function onClickHandler(
    attendance: NonNullable<ScheduleButtonGroupProps["initialWhen"]>,
  ) {
    const newWhen = when === attendance ? null : attendance;
    setWhen(newWhen);
    onToggleHandler(newWhen);
  }

  return (
    <span className="ml-auto text-sm text-gray-400">
      <button
        disabled={disabled}
        onClick={() => onClickHandler(AttendanceWhen.AM)}
        className={`rounded px-2 py-1 mr-2 ${
          isPresentAM
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "hover:bg-gray-600"
        }`}
      >
        AM
      </button>
      <button
        disabled={disabled}
        onClick={() => onClickHandler(AttendanceWhen.PM)}
        className={`rounded px-2 py-1 mr-2 ${
          isPresentPM
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "hover:bg-gray-600"
        }`}
      >
        PM
      </button>
      <button
        disabled={disabled}
        onClick={() => onClickHandler(AttendanceWhen.DAY)}
        className={`rounded px-2 py-1 ${
          isPresentFullDay
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "hover:bg-gray-600"
        }`}
      >
        Day
      </button>
    </span>
  );
}
