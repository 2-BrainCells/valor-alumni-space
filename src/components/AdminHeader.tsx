
import React, { useState, useEffect } from 'react';
import { Settings, Users, BarChart3, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import ThemeToggle from './ThemeToggle';

interface AdminHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminHeader = ({ activeTab, setActiveTab }: AdminHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between ${isMobile ? 'h-14' : 'h-16'}`}>
          {/* Logo & Brand */}
          <div className="flex items-center space-x-4">
            <div className={`bg-blue-600 rounded-lg flex items-center justify-center ${isMobile ? 'w-8 h-8' : 'w-10 h-10'}`}>
              <span className={`text-white font-bold ${isMobile ? 'text-sm' : 'text-lg'}`}>AC</span>
            </div>
            <div className={isMobile ? 'hidden' : 'block'}>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Admin Dashboard</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Alumni College Network</p>
            </div>
            {isMobile && (
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Admin</h1>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className={`${isMobile ? 'hidden' : 'flex'} items-center space-x-1`}>
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                onClick={() => setActiveTab(item.id)}
                className="flex items-center space-x-2"
                size="sm"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Button>
            ))}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            {!isMobile && (
              <>
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">AD</AvatarFallback>
                </Avatar>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Admin User</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">admin@college.edu</p>
                </div>
              </>
            )}
            <Button variant="ghost" size="sm">
              <LogOut className="h-4 w-4" />
            </Button>

            {/* Mobile Menu */}
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <Menu className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobile && menuOpen && (
          <div className="py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMenuOpen(false);
                  }}
                  className="justify-start"
                  size="sm"
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
