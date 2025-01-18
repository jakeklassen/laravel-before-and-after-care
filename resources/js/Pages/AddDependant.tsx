import { router } from "@inertiajs/react";
import { format } from "date-fns";
import { PlusCircle, X } from "lucide-react";
import React, { useState } from "react";

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  relationship: "guardian" | "relative" | "other";
}

type DaySchedule = "am" | "pm" | "day" | null;

interface Schedule {
  sunday: DaySchedule;
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
}

const AddDependantForm: React.FC = () => {
  const [name, setName] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [schedule, setSchedule] = useState<
    Omit<App.Data.ScheduleData, "id" | "start_date">
  >({
    sunday: null,
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
    saturday: null,
  });
  const [dailyRate, setDailyRate] = useState(0);
  const [halfDayRate, setHalfDayRate] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    router.post(
      "/add-dependant",
      {
        name,
        is_active: true,
        contacts: contacts.map((contact) => ({
          name: contact.name,
          phone: contact.phone,
          email: contact.email,
          relationship: contact.relationship,
        })),
        rates: [
          {
            daily_rate: dailyRate,
            half_day_rate: halfDayRate,
            start_date: startDate,
          },
        ],
        schedules: [
          {
            start_date: startDate,
            sunday: schedule.sunday,
            monday: schedule.monday,
            tuesday: schedule.tuesday,
            wednesday: schedule.wednesday,
            thursday: schedule.thursday,
            friday: schedule.friday,
            saturday: schedule.saturday,
          },
        ],
      },
      {
        headers: {
          XDEBUG_SESSION: "VSCODE",
        },
      },
    );
  };

  const handleScheduleChange = (day: keyof Schedule, period: DaySchedule) => {
    setSchedule((prevSchedule) => {
      const currentDaySchedule = prevSchedule[day];
      let newDaySchedule: DaySchedule = period;

      if (period === "am" && currentDaySchedule === "pm") {
        newDaySchedule = "day";
      } else if (period === "pm" && currentDaySchedule === "am") {
        newDaySchedule = "day";
      } else if (period === "day" && currentDaySchedule === "day") {
        newDaySchedule = null;
      }

      return { ...prevSchedule, [day]: newDaySchedule };
    });
  };

  const addEmergencyContact = () => {
    setContacts([
      ...contacts,
      {
        id: Date.now().toString(),
        name: "",
        relationship: "guardian",
        phone: "",
        email: "",
      },
    ]);
  };

  const updateEmergencyContact = (
    index: number,
    field: keyof Contact,
    value: string,
  ) => {
    const updatedContacts = [...contacts];

    if (updatedContacts[index] === undefined) {
      console.warn("Trying to update a non-existent contact at index:", index);
      return;
    }

    updatedContacts[index] = { ...updatedContacts[index], [field]: value };
    setContacts(updatedContacts);
  };

  const removeEmergencyContact = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

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

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-gray-800 shadow rounded-lg p-8"
    >
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Add New Child</h2>
      <div className="space-y-6 mx-2 sm:mx-0">
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={dailyRate}
            onChange={(e) => setDailyRate(Number(e.target.value))}
            className="block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 py-3 px-4"
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
            value={halfDayRate}
            onChange={(e) => setHalfDayRate(Number(e.target.value))}
            className="block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 py-3 px-4"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-200 mb-4">
          Emergency Contacts
        </h3>
        {contacts.map((contact, index) => (
          <div
            key={contact.id}
            className="bg-gray-700 rounded-lg p-4 space-y-4"
          >
            <div className="flex justify-between items-center">
              <h4 className="text-md font-medium text-gray-300">
                Contact {index + 1}
              </h4>
              <button
                type="button"
                onClick={() => removeEmergencyContact(index)}
                className="text-red-400 hover:text-red-300 focus:outline-none"
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
                  onChange={(e) =>
                    updateEmergencyContact(index, "name", e.target.value)
                  }
                  className="block w-full rounded-md bg-gray-600 border-gray-500 text-gray-100 focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 py-2 px-3"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Relationship
                </label>
                <select
                  value={contact.relationship}
                  onChange={(e) =>
                    updateEmergencyContact(
                      index,
                      "relationship",
                      e.target.value,
                    )
                  }
                  className="block w-full rounded-md bg-gray-600 border-gray-500 text-gray-100 focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 py-2 px-3"
                  required
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
                    updateEmergencyContact(index, "phone", e.target.value)
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
                    updateEmergencyContact(index, "email", e.target.value)
                  }
                  className="block w-full rounded-md bg-gray-600 border-gray-500 text-gray-100 focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 py-2 px-3"
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addEmergencyContact}
          className="flex items-center text-indigo-400 hover:text-indigo-300 focus:outline-none focus:underline"
        >
          <PlusCircle size={20} className="mr-2" />
          Add Emergency Contact
        </button>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-200 mb-4">Schedule</h3>

        <div className="mb-6">
          <label
            htmlFor="startDate"
            className="block text-base font-medium text-gray-300 mb-2"
          >
            Starts At
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 py-4 px-4 [color-scheme:dark]"
            required
          />
        </div>

        <div className="space-y-4">
          {Object.entries(schedule).map(([day, period]) => (
            <div
              key={day}
              className="flex items-center justify-between bg-gray-700 rounded-lg p-4"
            >
              <span className="text-md font-medium text-gray-300 capitalize w-24">
                {day}
              </span>
              <div className="flex space-x-2">
                <ScheduleButton
                  checked={period === "am"}
                  onChange={() =>
                    handleScheduleChange(day as keyof Schedule, "am")
                  }
                  label="AM"
                />
                <ScheduleButton
                  checked={period === "pm"}
                  onChange={() =>
                    handleScheduleChange(day as keyof Schedule, "pm")
                  }
                  label="PM"
                />
                <ScheduleButton
                  checked={period === "day"}
                  onChange={() =>
                    handleScheduleChange(day as keyof Schedule, "day")
                  }
                  label="Full Day"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="w-full px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-opacity-50 mt-6"
      >
        Add Child
      </button>
    </form>
  );
};

export default AddDependantForm;
