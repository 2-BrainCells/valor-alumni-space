
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

const AdminCharts = () => {
  const userRegistrationData = [
    { month: 'Jan', users: 120 },
    { month: 'Feb', users: 152 },
    { month: 'Mar', users: 189 },
    { month: 'Apr', users: 234 },
    { month: 'May', users: 278 },
    { month: 'Jun', users: 312 },
  ];

  const jobCategoriesData = [
    { name: 'Engineering', value: 45, color: '#3b82f6' },
    { name: 'Marketing', value: 25, color: '#10b981' },
    { name: 'Design', value: 15, color: '#f59e0b' },
    { name: 'Sales', value: 10, color: '#ef4444' },
    { name: 'Other', value: 5, color: '#8b5cf6' },
  ];

  const monthlyActivityData = [
    { month: 'Jan', logins: 2400, jobViews: 1800, applications: 600 },
    { month: 'Feb', logins: 2600, jobViews: 2100, applications: 750 },
    { month: 'Mar', logins: 2800, jobViews: 2300, applications: 820 },
    { month: 'Apr', logins: 3200, jobViews: 2600, applications: 950 },
    { month: 'May', logins: 3500, jobViews: 2900, applications: 1100 },
    { month: 'Jun', logins: 3800, jobViews: 3200, applications: 1250 },
  ];

  const chartConfig = {
    users: { label: "Users", color: "#3b82f6" },
    logins: { label: "Logins", color: "#3b82f6" },
    jobViews: { label: "Job Views", color: "#10b981" },
    applications: { label: "Applications", color: "#f59e0b" }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* User Registrations Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle>User Registrations Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <LineChart data={userRegistrationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="var(--color-users)" 
                strokeWidth={3}
                dot={{ fill: "var(--color-users)", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Job Categories Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Job Categories Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={jobCategoriesData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {jobCategoriesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Activity Bar Chart */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Monthly Activity Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80">
            <BarChart data={monthlyActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="logins" fill="var(--color-logins)" />
              <Bar dataKey="jobViews" fill="var(--color-jobViews)" />
              <Bar dataKey="applications" fill="var(--color-applications)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCharts;
