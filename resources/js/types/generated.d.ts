declare namespace App {
  export type DependantRelationship = "guardian" | "relative" | "other";
  export type ScheduleDay = "am" | "pm" | "day";
}
declare namespace App.Data {
  export type ContactData = {
    id: number;
    name: string;
    relationship: string;
    email: string | null;
    phone: string | null;
  };
  export type CreateContactData = {
    name: string;
    relationship: App.DependantRelationship;
    email: string | null;
    phone: string | null;
  };
  export type CreateDependantData = {
    name: string;
    is_active: boolean;
    rates: Array<App.Data.CreateRateData>;
    schedules: Array<App.Data.CreateScheduleData>;
    contacts: Array<App.Data.CreateContactData>;
  };
  export type CreateRateData = {
    daily_rate: number;
    half_day_rate: number;
    start_date: string;
  };
  export type CreateScheduleData = {
    start_date: string;
    sunday: App.ScheduleDay | null;
    monday: App.ScheduleDay | null;
    tuesday: App.ScheduleDay | null;
    wednesday: App.ScheduleDay | null;
    thursday: App.ScheduleDay | null;
    friday: App.ScheduleDay | null;
    saturday: App.ScheduleDay | null;
  };
  export type DependantData = {
    id: number | null;
    name: string;
    is_active: boolean;
    contacts: Array<App.Data.ContactData>;
    rates: Array<App.Data.RateData>;
    schedules: Array<App.Data.ScheduleData>;
  };
  export type RateData = {
    id: number;
    daily_rate: number;
    half_day_rate: number;
    start_date: string;
  };
  export type ScheduleData = {
    id: number;
    sunday: string | null;
    monday: string | null;
    tuesday: string | null;
    wednesday: string | null;
    thursday: string | null;
    friday: string | null;
    saturday: string | null;
    start_date: string;
  };
  export type UpdateDependantData = {
    name: string;
    schedule: App.Data.CreateScheduleData;
    contacts: Array<App.Data.CreateContactData>;
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
