import { useForm, usePage } from "@inertiajs/react";
import { format, isSameDay, set } from "date-fns";
import { PlusCircle, X } from "lucide-react";
import React from "react";

const ContactsRelationshipOptions = {
  Guardian: "guardian",
  Relative: "relative",
  Other: "other",
} as const;

const ScheduleDayOptions = {
  Am: "am",
  Pm: "pm",
  Day: "day",
} as const;

const days: Array<keyof App.Data.ScheduleData> = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

const ScheduleButton: React.FC<{
  checked: boolean;
  onChange: () => void;
  label: string;
}> = ({ checked, onChange, label }) => (
  <button
    type="button"
    onClick={onChange}
    className={`
      px-3 py-1 rounded-md text-sm font-medium
      transition-all duration-200 ease-in-out
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-opacity-50
      ${
        checked
          ? "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"
          : "bg-gray-700 text-gray-300 hover:bg-gray-600 focus:ring-gray-500"
      }
    `}
  >
    {label}
  </button>
);

const EditDependant: React.FC = () => {
  const { dependant } = usePage<{ dependant: App.Data.DependantData }>().props;

  console.log(dependant);

  // TODO: Show error page if data is null - should not be possible
  const activeSchedule = dependant.schedules
    ?.sort(
      (a, b) =>
        new Date(b.start_date).valueOf() - new Date(a.start_date).valueOf(),
    )
    .at(0);

  // TODO: Show error page if data is null - should not be possible
  const activeRates = dependant.rates
    ?.sort(
      (a, b) =>
        new Date(b.start_date).valueOf() - new Date(a.start_date).valueOf(),
    )
    .at(0);

  const { data, setData, put, processing, errors } = useForm({
    name: dependant.name,
    dailyRate: activeRates?.daily_rate ?? 0,
    halfDayRate: activeRates?.half_day_rate ?? 0,
    isActive: dependant.is_active,
    contacts: dependant.contacts.map((contact) => {
      return {
        id: contact.id,
        name: contact.name,
        relationship: contact.relationship,
        phone: contact.phone ?? "",
        email: contact.email ?? "",
      };
    }),
    schedule: activeSchedule,
  });

  return (
    <div className="space-y-8 bg-gray-800 shadow rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Edit Child</h2>

      <form
        className="space-y-8"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();

          put(`/edit-dependant/${dependant.id}`);
        }}
      >
        <div className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={(e) =>
                setData({
                  ...data,
                  name: e.target.value,
                })
              }
              className="block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 py-3 px-4"
              required
            />
          </div>

          <div>
            <label
              htmlFor="dailyRate"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Daily Rate
            </label>
            <input
              type="number"
              id="dailyRate"
              name="dailyRate"
              value={data.dailyRate}
              onChange={(e) =>
                setData({
                  ...data,
                  dailyRate: Number(e.target.value),
                })
              }
              readOnly
              className="block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 py-3 px-4 read-only:bg-gray-600 read-only:text-gray-400"
              required
            />
          </div>

          <div>
            <label
              htmlFor="halfDayRate"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Half Day Rate
            </label>
            <input
              type="number"
              id="halfDayRate"
              name="halfDayRate"
              value={data.halfDayRate}
              onChange={(e) =>
                setData({ ...data, halfDayRate: Number(e.target.value) })
              }
              readOnly
              className="block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 py-3 px-4 read-only:bg-gray-600 read-only:text-gray-400"
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-200 mb-4">
            Emergency Contacts
          </h3>

          <div className="space-y-4">
            {data.contacts.map((contact, index) => (
              <div
                className="bg-gray-700 rounded-lg p-4 space-y-4"
                key={contact.id}
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-md font-medium text-gray-300">
                    Contact {index + 1}
                  </h4>
                  <button
                    type="button"
                    className="text-red-400 hover:text-red-300 focus:outline-none"
                    onClick={() =>
                      setData({
                        ...data,
                        contacts: data.contacts.filter((_, i) => i !== index),
                      })
                    }
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={contact.name}
                      className="block w-full rounded-md bg-gray-600 border-gray-500 text-gray-100 focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 py-2 px-3"
                      required
                      onChange={(e) => {
                        setData({
                          ...data,
                          contacts: data.contacts.map((c, i) =>
                            i === index
                              ? {
                                  ...c,
                                  name: e.target.value,
                                }
                              : c,
                          ),
                        });
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Relationship
                    </label>
                    <select
                      value={contact.relationship}
                      className="block w-full rounded-md bg-gray-600 border-gray-500 text-gray-100 focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 py-2 px-3"
                      required
                      onChange={(e) => {
                        switch (e.target.value) {
                          case ContactsRelationshipOptions.Guardian:
                            setData({
                              ...data,
                              contacts: data.contacts.map((c, i) =>
                                i === index
                                  ? {
                                      ...c,
                                      relationship:
                                        ContactsRelationshipOptions.Guardian,
                                    }
                                  : c,
                              ),
                            });

                            break;
                          case ContactsRelationshipOptions.Relative:
                            setData({
                              ...data,
                              contacts: data.contacts.map((c, i) =>
                                i === index
                                  ? {
                                      ...c,
                                      relationship:
                                        ContactsRelationshipOptions.Relative,
                                    }
                                  : c,
                              ),
                            });

                            break;
                          case ContactsRelationshipOptions.Other:
                            setData({
                              ...data,
                              contacts: data.contacts.map((c, i) =>
                                i === index
                                  ? {
                                      ...c,
                                      relationship:
                                        ContactsRelationshipOptions.Other,
                                    }
                                  : c,
                              ),
                            });

                            break;
                          default:
                            throw new Error("Invalid relationship");
                        }
                      }}
                    >
                      <option value="guardian">Guardian</option>
                      <option value="relative">Relative</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      value={contact.phone}
                      onChange={(e) =>
                        setData({
                          ...data,
                          contacts: data.contacts.map((c, i) =>
                            i === index
                              ? {
                                  ...c,
                                  phone: e.target.value,
                                }
                              : c,
                          ),
                        })
                      }
                      className="block w-full rounded-md bg-gray-600 border-gray-500 text-gray-100 focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 py-2 px-3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Email (optional)
                    </label>
                    <input
                      type="email"
                      value={contact.email}
                      onChange={(e) =>
                        setData({
                          ...data,
                          contacts: data.contacts.map((c, i) =>
                            i === index
                              ? {
                                  ...c,
                                  email: e.target.value,
                                }
                              : c,
                          ),
                        })
                      }
                      className="block w-full rounded-md bg-gray-600 border-gray-500 text-gray-100 focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 py-2 px-3"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                setData({
                  ...data,
                  contacts: [
                    ...data.contacts,
                    {
                      id: Date.now(),
                      name: "",
                      phone: "",
                      email: "",
                      relationship: ContactsRelationshipOptions.Guardian,
                    },
                  ],
                });
              }}
              className="flex items-center text-indigo-400 hover:text-indigo-300 focus:outline-none focus:underline"
            >
              <PlusCircle size={20} className="mr-2" />
              Add Emergency Contact
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-200 mb-4">Schedule</h3>
          <div className="space-y-4">
            {days.map((day) => (
              <div
                key={day}
                className="flex items-center justify-between bg-gray-700 rounded-lg p-4"
              >
                <span className="text-md font-medium text-gray-300 capitalize w-24">
                  {day}
                </span>
                <div className="flex space-x-2">
                  <>
                    <ScheduleButton
                      checked={data.schedule?.[day] === "am"}
                      onChange={() => {
                        setData({
                          ...data,
                          schedule: {
                            ...data.schedule,
                            [day]:
                              data.schedule?.[day] === "am"
                                ? null
                                : ScheduleDayOptions.Am,
                          },
                        });
                      }}
                      label="AM"
                    />
                    <ScheduleButton
                      checked={data.schedule?.[day] === "pm"}
                      onChange={() => {
                        setData({
                          ...data,
                          schedule: {
                            ...data.schedule,
                            [day]:
                              data.schedule?.[day] === "pm"
                                ? null
                                : ScheduleDayOptions.Pm,
                          },
                        });
                      }}
                      label="PM"
                    />
                    <ScheduleButton
                      checked={data.schedule?.[day] === "day"}
                      onChange={() => {
                        setData({
                          ...data,
                          schedule: {
                            ...data.schedule,
                            [day]:
                              data.schedule?.[day] === "day"
                                ? null
                                : ScheduleDayOptions.Day,
                          },
                        });
                      }}
                      label="Full Day"
                    />
                  </>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={processing}
          className="w-full px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-opacity-50 mt-6"
        >
          Update Child
        </button>
      </form>
    </div>
  );
};

export default EditDependant;
