
import React, { useState, useEffect } from 'react';
import { Users, Briefcase, TrendingUp, Download, Search, Filter, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import AdminCharts from '@/components/AdminCharts';
import AdminStatsGrid from '@/components/AdminStatsGrid';
import AdminHeader from '@/components/AdminHeader';
import UserManagementTable from '@/components/UserManagementTable';
import AdminSettings from '@/components/AdminSettings';
import MobileBottomNav from '@/components/MobileBottomNav';
import NetworkStatusIndicator from '@/components/NetworkStatusIndicator';
import PullToRefresh from '@/components/PullToRefresh';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleRefresh = async () => {
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <AdminStatsGrid />
            <AdminCharts />
          </div>
        );
      case 'users':
        return <UserManagementTable />;
      case 'settings':
        return <AdminSettings />;
      default:
        return (
          <div className="space-y-6">
            <AdminStatsGrid />
            <AdminCharts />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <NetworkStatusIndicator />
      <AdminHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className={`container mx-auto px-4 py-6 ${isMobile ? 'pb-20' : ''}`}>
        <PullToRefresh onRefresh={handleRefresh}>
          <div className={isMobile ? 'space-y-4' : ''}>
            {renderContent()}
          </div>
        </PullToRefresh>
      </main>

      {/* Mobile Bottom Navigation */}
      {isMobile && <MobileBottomNav />}
    </div>
  );
};

export default AdminDashboard;
