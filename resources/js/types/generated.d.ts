declare namespace App.Data {
  export type DependantData = {
    id: number;
    name: string;
    is_active: boolean;
    schedules: Array<App.Data.ScheduleData>;
    rates: Array<App.Data.RateData>;
  };
  export type RateData = {
    id: number;
    daily_rate: number;
    half_day_rate: number;
    start_date: string;
  };
  export type ScheduleData = {
    id: number;
    sunday: string;
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    start_date: string;
  };
}
declare namespace App.Models {
  export type Attendance = {
    date: string;
    status: string;
    when: string;
    incrementing: boolean;
    preventsLazyLoading: boolean;
    exists: boolean;
    wasRecentlyCreated: boolean;
    timestamps: boolean;
    usesUniqueIds: boolean;
  };
  export type Contact = {
    name: string;
    email: string;
    phone: string | null;
    relationship: string;
    incrementing: boolean;
    preventsLazyLoading: boolean;
    exists: boolean;
    wasRecentlyCreated: boolean;
    timestamps: boolean;
    usesUniqueIds: boolean;
  };
  export type Dependant = {
    name: string;
    is_active: boolean;
    incrementing: boolean;
    preventsLazyLoading: boolean;
    exists: boolean;
    wasRecentlyCreated: boolean;
    timestamps: boolean;
    usesUniqueIds: boolean;
  };
  export type Rate = {
    daily_rate: number;
    half_day_rate: number;
    start_date: string;
    incrementing: boolean;
    preventsLazyLoading: boolean;
    exists: boolean;
    wasRecentlyCreated: boolean;
    timestamps: boolean;
    usesUniqueIds: boolean;
  };
  export type Schedule = {
    incrementing: boolean;
    preventsLazyLoading: boolean;
    exists: boolean;
    wasRecentlyCreated: boolean;
    timestamps: boolean;
    usesUniqueIds: boolean;
  };
  export type User = {
    name: string;
    email: string;
    incrementing: boolean;
    preventsLazyLoading: boolean;
    exists: boolean;
    wasRecentlyCreated: boolean;
    timestamps: boolean;
    usesUniqueIds: boolean;
  };
}
