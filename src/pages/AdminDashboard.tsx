
import React, { useState } from 'react';
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

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

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
    <div className="min-h-screen bg-gray-50">
      <AdminHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-4 py-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
