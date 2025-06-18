
import React, { useState } from 'react';
import { Save, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const AdminSettings = () => {
  const [collegeInfo, setCollegeInfo] = useState({
    name: 'Alumni College',
    description: 'A premier institution connecting students, alumni, and faculty.',
    email: 'contact@college.edu',
    phone: '+1 (555) 123-4567',
    address: '123 University Ave, College City, State 12345',
  });

  const [features, setFeatures] = useState({
    jobBoard: true,
    messaging: true,
    gamification: true,
    events: false,
    mentorship: true,
    networking: true,
  });

  const [notifications, setNotifications] = useState({
    emailDigest: true,
    pushNotifications: true,
    smsAlerts: false,
    weeklyReports: true,
  });

  const handleCollegeInfoChange = (field: string, value: string) => {
    setCollegeInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleFeatureToggle = (feature: string, enabled: boolean) => {
    setFeatures(prev => ({ ...prev, [feature]: enabled }));
  };

  const handleNotificationToggle = (notification: string, enabled: boolean) => {
    setNotifications(prev => ({ ...prev, [notification]: enabled }));
  };

  return (
    <div className="space-y-6">
      {/* College Information */}
      <Card className="bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
        <CardHeader className="border-b border-gray-100 dark:border-gray-800">
          <CardTitle className="text-gray-900 dark:text-gray-50">College Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="collegeName" className="text-gray-700 dark:text-gray-300">College Name</Label>
              <Input
                id="collegeName"
                value={collegeInfo.name}
                onChange={(e) => handleCollegeInfoChange('name', e.target.value)}
                className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="collegeEmail" className="text-gray-700 dark:text-gray-300">Contact Email</Label>
              <Input
                id="collegeEmail"
                type="email"
                value={collegeInfo.email}
                onChange={(e) => handleCollegeInfoChange('email', e.target.value)}
                className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="collegeDescription" className="text-gray-700 dark:text-gray-300">Description</Label>
            <Textarea
              id="collegeDescription"
              value={collegeInfo.description}
              onChange={(e) => handleCollegeInfoChange('description', e.target.value)}
              rows={3}
              className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="collegePhone" className="text-gray-700 dark:text-gray-300">Phone Number</Label>
              <Input
                id="collegePhone"
                value={collegeInfo.phone}
                onChange={(e) => handleCollegeInfoChange('phone', e.target.value)}
                className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="logoUpload" className="text-gray-700 dark:text-gray-300">College Logo</Label>
              <div className="flex gap-2">
                <Input 
                  id="logoUpload" 
                  type="file" 
                  accept="image/*" 
                  className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
                />
                <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="collegeAddress" className="text-gray-700 dark:text-gray-300">Address</Label>
            <Textarea
              id="collegeAddress"
              value={collegeInfo.address}
              onChange={(e) => handleCollegeInfoChange('address', e.target.value)}
              rows={2}
              className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white">
            <Save className="h-4 w-4 mr-2" />
            Save College Information
          </Button>
        </CardContent>
      </Card>

      {/* Feature Toggles */}
      <Card className="bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
        <CardHeader className="border-b border-gray-100 dark:border-gray-800">
          <CardTitle className="text-gray-900 dark:text-gray-50">Platform Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          {Object.entries(features).map(([feature, enabled]) => (
            <div key={feature} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <div className="space-y-1">
                <Label className="text-sm font-medium capitalize text-gray-900 dark:text-gray-100">
                  {feature.replace(/([A-Z])/g, ' $1').trim()}
                </Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Enable or disable this feature for all users
                </p>
              </div>
              <Switch
                checked={enabled}
                onCheckedChange={(checked) => handleFeatureToggle(feature, checked)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
        <CardHeader className="border-b border-gray-100 dark:border-gray-800">
          <CardTitle className="text-gray-900 dark:text-gray-50">Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          {Object.entries(notifications).map(([notification, enabled]) => (
            <div key={notification} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <div className="space-y-1">
                <Label className="text-sm font-medium capitalize text-gray-900 dark:text-gray-100">
                  {notification.replace(/([A-Z])/g, ' $1').trim()}
                </Label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Configure system notification preferences
                </p>
              </div>
              <Switch
                checked={enabled}
                onCheckedChange={(checked) => handleNotificationToggle(notification, checked)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Export & Backup */}
      <Card className="bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
        <CardHeader className="border-b border-gray-100 dark:border-gray-800">
          <CardTitle className="text-gray-900 dark:text-gray-50">Data Management</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800">
              <Upload className="h-4 w-4 mr-2" />
              Export Users
            </Button>
            <Button variant="outline" className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800">
              <Upload className="h-4 w-4 mr-2" />
              Export Jobs
            </Button>
            <Button variant="outline" className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800">
              <Upload className="h-4 w-4 mr-2" />
              Export Analytics
            </Button>
          </div>
          <Separator className="my-4 bg-gray-200 dark:bg-gray-800" />
          <div className="text-sm text-gray-600 dark:text-gray-400 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
            <p>Last backup: June 14, 2024 at 11:30 PM</p>
            <p>Next scheduled backup: June 15, 2024 at 11:30 PM</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
