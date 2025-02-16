import { usePage } from "@inertiajs/react";
import clsx from "clsx";
import {
  addDays,
  eachDayOfInterval,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isToday,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subDays,
} from "date-fns";
import { toZonedTime } from "date-fns-tz";
import isEmpty from "just-is-empty";
import { CalendarIcon, User } from "lucide-react";
import React, { useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ScheduleButtonGroup } from "../components/ScheduleButtonGroup";
import { AttendanceWhenOptions } from "../modules/attendance/attendance";

type WeekDay =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

type DependantsResponse = {
  id: number;
  name: string;
  is_active: boolean;
  attendance: {
    date: string;
    status: "present" | "absent";
    when: NonNullable<AttendanceWhenOptions>;
  }[];
  rates: {
    // Laravel decimal casting will return a string
    daily_rate: string;
    // Laravel decimal casting will return a string
    half_day_rate: string;
    start_date: string;
  }[];
  schedules: {
    start_date: string;
    sunday: AttendanceWhenOptions;
    monday: AttendanceWhenOptions;
    tuesday: AttendanceWhenOptions;
    wednesday: AttendanceWhenOptions;
    thursday: AttendanceWhenOptions;
    friday: AttendanceWhenOptions;
    saturday: AttendanceWhenOptions;
  }[];
};

function calculateWeekSum(child: DependantsResponse, upTo: Date) {
  const start = startOfWeek(upTo);
  const end = upTo;

  const days = eachDayOfInterval({ start, end });

  const weeklySum = days.reduce((acc, day) => {
    const yyyyMMdd = format(day, "yyyy-MM-dd");
    const dayOfWeek = format(day, "EEEE").toLowerCase() as WeekDay;
    const dayRates = child.rates?.find(
      (rate) =>
        isSameDay(yyyyMMdd, rate.start_date) ||
        isAfter(yyyyMMdd, rate.start_date),
    );

    const schedule = child.schedules?.findLast(
      (schedule) =>
        isSameDay(yyyyMMdd, schedule.start_date) ||
        isAfter(yyyyMMdd, schedule.start_date),
    );

    const attendance = child.attendance?.find((attendance) => {
      return isSameDay(attendance.date, yyyyMMdd);
    });

    const isAbsent = attendance?.status === "absent";

    if (isEmpty(schedule?.[dayOfWeek]) || isAbsent) {
      return acc;
    }

    const isFullDay =
      (attendance == null && schedule?.[dayOfWeek] === "day") ||
      (attendance?.when === "day" && !isAbsent);

    return (
      acc +
      (isFullDay
        ? parseFloat(dayRates?.daily_rate ?? "0")
        : parseFloat(dayRates?.half_day_rate ?? "0"))
    );
  }, 0);

  return weeklySum;
}

const Calendar: React.FC = () => {
  const { dependants } = usePage<{
    dependants: DependantsResponse[];
  }>().props;

  console.log(dependants);

  const [displayDays, setDisplayDays] = useState<Date[]>(() => {
    // const start = startOfMonth(new Date());
    // const end = endOfMonth(new Date());
    // return eachDayOfInterval({ start, end });

    const initialDays: Date[] = [];
    for (let i = 0; i < 60; i++) {
      initialDays.push(addDays(startOfDay(new Date()), i));
      initialDays.unshift(subDays(startOfDay(new Date()), i + 1));
    }

    // return eachDayOfInterval({
    //   start: subDays(startOfDay(new Date()), 7),
    //   end: addDays(startOfDay(new Date()), 0),
    // });

    return initialDays;
  });
  const [hasMore, setHasMore] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToToday = (behavior: ScrollBehavior = "smooth") => {
    const todayElement = scrollRef.current?.querySelector(
      '[data-today="true"]',
    );

    todayElement?.scrollIntoView({ behavior, block: "start" });
  };

  const handleToggleAttendance = async (
    dependant: (typeof dependants)[number],
    date: string,
    when: AttendanceWhenOptions,
  ) => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const zonedDate = toZonedTime(date, timeZone);

    const dayOfWeek = format(zonedDate, "EEEE").toLowerCase() as WeekDay;

    const schedule = dependant.schedules?.find(
      (schedule) =>
        isBefore(schedule.start_date, date) ||
        isSameDay(schedule.start_date, date),
    );

    if (schedule == null) {
      console.warn("No schedule found for today");

      return;
    }

    const scheduleForToday = schedule[dayOfWeek];

    const attendance = dependant.attendance.find((attendance) =>
      isSameDay(attendance.date, date),
    );

    // // If there is an attendance record for today, delete it
    // if (attendance != null) {
    //   await pb.collection("dependants").update(dependant.id, {
    //     "attendance-": [attendance.id],
    //   });

    //   await pb.collection("attendance").delete(attendance.id);
    // }

    // let status = "present";

    // if (when === null) {
    //   status = "absent";
    // }

    // const attendanceResponse = await pb.collection("attendance").create({
    //   dependant: dependant.id,
    //   date,
    //   status,
    //   when: when ?? scheduleForToday,
    // });

    // await pb.collection("dependants").update(dependant.id, {
    //   "attendance+": [attendanceResponse.id],
    // });

    // await refetch();
  };

  const loadMoreDays = () => {
    // Get the last day, fallback to current date if undefined
    const lastDay = displayDays[displayDays.length - 1] ?? new Date();
    const newDays = Array.from({ length: 7 }, (_, i) =>
      addDays(lastDay, i + 1),
    );

    setDisplayDays([...displayDays, ...newDays]);

    if (displayDays.length > 365) {
      setHasMore(false);
    }
  };

  const renderMonthSeparator = (day: Date) => {
    if (isSameDay(day, startOfMonth(day))) {
      return (
        <div className="sticky top-0 z-10 bg-gray-900 py-4 px-4 mb-4">
          <h2 className="text-2xl font-bold text-indigo-400">
            {format(day, "MMMM yyyy")}
          </h2>
        </div>
      );
    }
    return null;
  };

  const getScheduledChildren = (day: Date): (typeof dependants)[number][] => {
    const dayOfWeek = format(day, "EEEE").toLowerCase() as WeekDay;
    const dayYearMonthDay = format(day, "yyyy-MM-dd");

    return dependants.filter((dependant) => {
      const schedule = dependant.schedules.findLast(
        (schedule) =>
          isSameDay(dayYearMonthDay, schedule.start_date) ||
          isAfter(dayYearMonthDay, schedule.start_date),
      );

      return dependant.is_active && !isEmpty(schedule?.[dayOfWeek]);
    });
  };

  const renderDay = (day: Date) => {
    const scheduledDependants = getScheduledChildren(day);

    const dayOfWeek = format(day, "EEEE").toLowerCase() as WeekDay;

    return (
      <div
        key={day.toISOString()}
        className={`bg-gray-800 rounded-lg shadow mb-4 overflow-hidden ${
          isToday(day) ? "border-2 border-indigo-500" : ""
        }`}
      >
        <div className="bg-gray-700 px-4 py-3 flex items-center">
          <CalendarIcon className="h-5 w-5 text-indigo-400 mr-2" />
          <h3 className="text-lg font-semibold text-gray-100">
            {format(day, "EEEE, MMMM d")}
          </h3>
        </div>
        {scheduledDependants.length > 0 ? (
          <>
            <ul className="divide-y divide-gray-700">
              {scheduledDependants.map((dependant) => {
                const yyyyMMdd = format(day, "yyyy-MM-dd");

                const daySchedule =
                  dependant.schedules.findLast(
                    (schedule) =>
                      isSameDay(yyyyMMdd, schedule.start_date) ||
                      isAfter(yyyyMMdd, schedule.start_date),
                  ) ?? null;

                const attendance = dependant.attendance.find((attendance) => {
                  return isSameDay(attendance.date, yyyyMMdd);
                });

                const isAbsent = attendance?.status === "absent";

                const initialWhen = isAbsent
                  ? null
                  : attendance?.when ?? daySchedule?.[dayOfWeek];

                const sumToDate = calculateWeekSum(dependant, day);

                return (
                  <li
                    key={`${day.toISOString()}-${dependant.id}`}
                    className="px-4 py-3 flex items-center place-content-between"
                  >
                    <div className="flex">
                      <User className="h-5 w-5 text-gray-400 mr-2" />
                      <span
                        className={clsx(
                          "text-gray-300",
                          attendance?.status === "absent" ? "line-through" : "",
                        )}
                      >
                        {dependant.name}
                      </span>
                    </div>

                    <div className="flex">
                      <span className="ml-auto text-sm text-gray-400 mr-2 py-1">
                        ${sumToDate}
                      </span>

                      <ScheduleButtonGroup
                        // disabled={isPending || isError}
                        initialWhen={initialWhen}
                        onToggleHandler={(when) =>
                          handleToggleAttendance(dependant, yyyyMMdd, when)
                        }
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <p className="px-4 py-3 text-gray-400">No children scheduled</p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 mx-2 sm:mx-0">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-100">Schedule</h2>
        <button
          onClick={() => scrollToToday()}
          className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-200"
        >
          Today
        </button>
      </div>
      <div
        id="scrollableDiv"
        ref={scrollRef}
        style={{ height: "calc(100vh - 150px)", overflow: "auto" }}
        className="space-y-4 scrollbar-hide"
      >
        <InfiniteScroll
          dataLength={displayDays.length}
          next={loadMoreDays}
          hasMore={hasMore}
          loader={
            <h4 className="text-gray-400 text-center py-4">Loading...</h4>
          }
          scrollableTarget="scrollableDiv"
        >
          {displayDays.map((day) => (
            <React.Fragment key={day.toISOString()}>
              {renderMonthSeparator(day)}
              <div data-today={isToday(day)}>{renderDay(day)}</div>
            </React.Fragment>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export function Index() {
  return <Calendar />;
}

export default Index;
