import { Link } from "@inertiajs/react";
import { CalendarIcon, LogOut, Users } from "lucide-react";

export function Layout({
  children,
  isAuthenticated,
}: {
  children: React.ReactNode;
  isAuthenticated: boolean;
}) {
  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Users className="h-8 w-8 text-indigo-400 mr-2" />
            <h1 className="text-xl font-bold text-gray-100">
              Before & After Care
            </h1>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-indigo-400 hover:text-indigo-300"
              title="Calendar"
            >
              <CalendarIcon className="h-6 w-6" />
            </Link>
            <Link
              to="/manage-children"
              className="text-indigo-400 hover:text-indigo-300"
              title="Manage Children"
            >
              <Users className="h-6 w-6" />
            </Link>
            {isAuthenticated && (
              <Link
                to="/logout"
                className="text-indigo-400 hover:text-indigo-300"
                title="Logout"
              >
                <LogOut className="h-6 w-6" />
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto pt-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
