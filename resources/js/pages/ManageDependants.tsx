import { Head, Link } from "@inertiajs/react";
import { isBefore, isSameDay } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { Edit } from "lucide-react";
import React from "react";

const ManageDependants: React.FC = () => {
  const data: any[] = [];

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const today = toZonedTime(new Date(), timeZone);

  return (
    <>
      <Head>
        <title>Add a new Dependant</title>
        <meta name="description" content="Add a new dependant" />
      </Head>
      <div className="bg-gray-800 shadow rounded-lg overflow-hidden mx-2 sm:mx-0">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-100">
            Manage Children
          </h3>
          <Link
            href="/add-child"
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add New Child
          </Link>
        </div>
        <ul className="divide-y divide-gray-700">
          {data.map((child) => {
            const rate = child.expand?.rates?.find((rate: any) => {
              const startDate = toZonedTime(rate.startDate, timeZone);

              return isBefore(startDate, today) || isSameDay(startDate, today);
            });

            return (
              <li
                key={child.id}
                className="px-4 py-4 sm:px-6 hover:bg-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p
                      className={`text-sm font-medium ${
                        child.isActive ? "text-gray-100" : "text-gray-400"
                      }`}
                    >
                      {child.name}
                    </p>
                    <span
                      className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        child.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {child.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Link
                      href={`/edit-child/${child.id}`}
                      className="text-gray-400 hover:text-gray-100 focus:outline-none"
                      title="Edit Child"
                    >
                      <Edit size={20} />
                    </Link>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Daily Rate: ${rate?.dailyRate}
                </div>

                <div className="mt-2 text-sm text-gray-500">
                  Half Day Rate: ${rate?.halfDayRate}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ManageDependants;
