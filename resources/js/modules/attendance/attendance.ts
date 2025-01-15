import { ValueOf } from "type-fest";

export type AttendanceWhenOptions = ValueOf<typeof AttendanceWhen> | null;

export const AttendanceWhen = {
  AM: "am",
  PM: "pm",
  DAY: "day",
} as const;
