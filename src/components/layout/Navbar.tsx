"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Users, Briefcase, MessageSquare, Bell, Search, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useApp } from '@/contexts/AppContext';

export function Navbar() {
  const { currentUser, notifications, setSearchQuery } = useApp();
  const [searchInput, setSearchInput] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchQuery(searchInput);
      router.push(`/search?q=${encodeURIComponent(searchInput)}`);
    }
  };

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  // Helper to get active style
  const getLinkClass = (path: string) => `flex flex-col items-center gap-1 px-6 py-3 rounded-xl h-auto ${isActive(path)
      ? 'text-pink-600 bg-pink-50'
      : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
    }`;

  return (
    <nav className="bg-white border-b-2 border-pink-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 cursor-pointer group">
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white px-3 py-2 rounded-xl shadow-md group-hover:shadow-lg transition-shadow">
                <span className="text-xl">SL</span>
              </div>
              <span className="hidden lg:block text-xl text-gray-900">ScienceLink</span>
            </Link>

            <form onSubmit={handleSearch} className="relative hidden md:block">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Szukaj profili, postów, artykułów..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-12 w-96 bg-pink-50 border-pink-200 focus:border-pink-400 focus:ring-pink-400 rounded-xl"
              />
            </form>
          </div>

          {/* Center Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            <Button asChild variant="ghost" className={getLinkClass('/')}>
              <Link href="/">
                <Home className="w-6 h-6" />
                <span className="text-xs">Strona główna</span>
              </Link>
            </Button>

            <Button asChild variant="ghost" className={getLinkClass('/network')}>
              <Link href="/network">
                <Users className="w-6 h-6" />
                <span className="text-xs">Moja sieć</span>
              </Link>
            </Button>

            <Button asChild variant="ghost" className={getLinkClass('/jobs')}>
              <Link href="/jobs">
                <Briefcase className="w-6 h-6" />
                <span className="text-xs">Oferty pracy</span>
              </Link>
            </Button>

            <Button asChild variant="ghost" className={getLinkClass('/messages')}>
              <Link href="/messages">
                <MessageSquare className="w-6 h-6" />
                <span className="text-xs">Wiadomości</span>
              </Link>
            </Button>

            <Button asChild variant="ghost" className={getLinkClass('/notifications')}>
              <Link href="/notifications">
                <div className="relative">
                  <Bell className="w-6 h-6" />
                  {unreadNotifications > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 min-w-[20px] flex items-center justify-center px-1 bg-pink-500 text-white text-xs border-2 border-white">
                      {unreadNotifications > 99 ? '99+' : unreadNotifications}
                    </Badge>
                  )}
                </div>
                <span className="text-xs">Powiadomienia</span>
              </Link>
            </Button>
          </div>

          {/* Right Section - User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 rounded-xl hover:bg-pink-50">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-9 h-9 rounded-full object-cover border-2 border-pink-300"
                />
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-3 py-2">
                <p className="text-sm text-gray-900">{currentUser.name}</p>
                <p className="text-xs text-gray-500">{currentUser.title}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">
                  <User className="w-4 h-4 mr-2" />
                  Mój profil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Ustawienia
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Wyloguj się
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
