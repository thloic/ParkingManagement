// app/dashboard/layout.tsx
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { Toaster } from 'sonner';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <div className="flex items-center">
            <img 
              src="https://tailwindflex.com/images/logo.svg" 
              alt="Logo" 
              className="h-8 w-auto" // Correction de la balise img auto-fermante
            />
            <span className="ml-2 text-xl font-semibold text-gray-800">Dashboard</span>
          </div>
        </div>
        
        <nav className="mt-5 px-2" aria-label="Sidebar">
  {/* Dashboard */}
  <Link
    href="/dashboard"
    className="group flex items-center px-2 py-2 text-base font-medium rounded-md bg-indigo-100 text-indigo-700"
  >
    <svg
      className="mr-3 h-6 w-6 text-indigo-700"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
    Dashboard
  </Link>

  {/* Team */}
  <Link
    href="/dashboard/vehicule"
    className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
  >
    <svg
      className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
    Vehicule
  </Link>

  {/* Projects */}
  <Link
    href="/dashboard/parking"
    className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
  >
    <svg
      className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
      />
    </svg>
    Parking
  </Link>

  {/* Calendar */}
  <Link
    href="/dashboard/parking"
    className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
  >
    <svg
      className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
    Calendar
  </Link>

  {/* Documents */}
  <Link
    href="#"
    className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
  >
    <svg
      className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
      />
    </svg>
    Documents
  </Link>

  {/* Reports */}
  <Link
    href="#"
    className="mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
  >
    <svg
      className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
    Reports
  </Link>
</nav>

        <div className="mt-auto p-4 border-t">
          <div className="flex items-center">
            <UserButton afterSignOutUrl="/" />
            
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6">{children}
      <Toaster position="top-right" />
      </main>
    </div>
  );
}