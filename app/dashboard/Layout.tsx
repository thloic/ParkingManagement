// app/dashboard/layout.tsx

import Sidebar from "../components/Sidebar";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 w-full min-h-screen bg-gray-50 p-8">{children}</main>
    </div>
  );
}
