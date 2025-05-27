// components/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Car, Ticket, CreditCard, Settings } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: <Home size={18} /> },
  { name: 'Véhicules', path: '/dashboard/vehicles', icon: <Car size={18} /> },
  { name: 'Tickets', path: '/dashboard/tickets', icon: <Ticket size={18} /> },
  { name: 'Transactions', path: '/dashboard/transactions', icon: <CreditCard size={18} /> },
  { name: 'Paramètres', path: '/dashboard/settings', icon: <Settings size={18} /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white fixed">
      <div className="p-6 font-bold text-xl border-b border-gray-700">Parking App</div>
      <nav className="mt-4">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <div
              className={`flex items-center px-6 py-3 hover:bg-gray-700 transition ${
                pathname === item.path ? 'bg-gray-700' : ''
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
