
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
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 nav-glass">
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between ${isMobile ? 'h-14' : 'h-16'}`}>
          {/* Logo & Brand */}
          <div className="flex items-center space-x-4">
            <div className={`bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center transition-theme glow-effect ${isMobile ? 'w-8 h-8' : 'w-10 h-10'}`}>
              <span className={`text-white font-bold transition-fast ${isMobile ? 'text-sm' : 'text-lg'}`}>AC</span>
            </div>
            <div className={isMobile ? 'hidden' : 'block'}>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 transition-fast">Admin Dashboard</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 transition-fast">Alumni College Network</p>
            </div>
            {isMobile && (
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100 transition-fast">Admin</h1>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className={`${isMobile ? 'hidden' : 'flex'} items-center space-x-1 stagger-children`}>
            {navItems.map((item, index) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                onClick={() => setActiveTab(item.id)}
                className={`nav-item flex items-center space-x-2 transition-theme hover-glow focus-glow ${
                  activeTab === item.id 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 glow-effect' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800'
                }`}
                size="sm"
                style={{ '--index': index } as React.CSSProperties}
              >
                <item.icon className="h-4 w-4 transition-fast" />
                <span className="transition-fast">{item.label}</span>
              </Button>
            ))}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            {!isMobile && (
              <>
                <Avatar className="h-8 w-8 bg-gray-200 dark:bg-gray-700 transition-theme">
                  <AvatarFallback className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition-theme">AD</AvatarFallback>
                </Avatar>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 transition-fast">Admin User</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 transition-fast">admin@college.edu</p>
                </div>
              </>
            )}
            <Button variant="ghost" size="sm" className="nav-item text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800 transition-theme hover-glow focus-glow">
              <LogOut className="h-4 w-4 transition-fast" />
            </Button>

            {/* Mobile Menu */}
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMenuOpen(!menuOpen)}
                className="nav-item text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800 transition-theme hover-glow focus-glow"
              >
                <Menu className="h-4 w-4 transition-fast" />
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobile && menuOpen && (
          <div className="py-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-theme">
            <nav className="flex flex-col space-y-2 stagger-children">
              {navItems.map((item, index) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMenuOpen(false);
                  }}
                  className={`nav-item justify-start transition-theme hover-glow focus-glow ${
                    activeTab === item.id 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 glow-effect' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800'
                  }`}
                  size="sm"
                  style={{ '--index': index } as React.CSSProperties}
                >
                  <item.icon className="h-4 w-4 mr-2 transition-fast" />
                  <span className="transition-fast">{item.label}</span>
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
