'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin');
  };

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/admin/players', label: 'Players', icon: '👥' },
    { href: '/admin/tournaments', label: 'Tournaments', icon: '🏆' },
    { href: '/admin/standings', label: 'Standings', icon: '📈' },
    { href: '/admin/results', label: 'Results', icon: '🎯' },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-tyler1-dark flex items-center justify-center">
        <p className="text-gray-400">Authenticating...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-tyler1-dark">
      {/* Top Navigation Bar */}
      <nav className="bg-tyler1-grey border-b-2 border-tyler1-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-bold text-white">
                Tyler1 <span className="text-tyler1-red">Admin Panel</span>
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                View Site →
              </a>
              <button
                onClick={handleLogout}
                className="bg-tyler1-red hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-tyler1-grey border-r border-tyler1-dark min-h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-tyler1-red text-white font-bold'
                      : 'text-gray-400 hover:bg-tyler1-dark hover:text-white'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
