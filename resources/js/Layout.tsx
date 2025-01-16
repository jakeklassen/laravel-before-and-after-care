import { Link, usePage } from "@inertiajs/react";
import { CalendarIcon, LogOut, Users } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = usePage<{ isAuthenticated: boolean }>().props;

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Users className="h-8 w-8 text-indigo-400 mr-2" />
            <h1 className="text-xl font-bold text-gray-100">
              Before & After Care
            </h1>
          </Link>
          {isAuthenticated ? (
            <nav className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-indigo-400 hover:text-indigo-300"
                title="Calendar"
              >
                <CalendarIcon className="h-6 w-6" />
              </Link>
              <Link
                href="/manage-dependants"
                className="text-indigo-400 hover:text-indigo-300"
                title="Manage Dependants"
              >
                <Users className="h-6 w-6" />
              </Link>
              <a
                href="/logout"
                className="text-indigo-400 hover:text-indigo-300"
                title="Logout"
              >
                <LogOut className="h-6 w-6" />
              </a>
            </nav>
          ) : null}
        </div>
      </header>
      <main className="max-w-7xl mx-auto pt-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
