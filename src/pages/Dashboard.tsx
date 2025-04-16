
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Cell } from 'recharts';
import { Download, Bookmark, Share2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import GlobalMap from '@/components/GlobalMap';

// Sample data for charts
const temperatureData = [
  { month: 'Jan', value: 24.5 },
  { month: 'Feb', value: 25.1 },
  { month: 'Mar', value: 26.3 },
  { month: 'Apr', value: 27.8 },
  { month: 'May', value: 28.2 },
  { month: 'Jun', value: 29.1 },
  { month: 'Jul', value: 29.7 },
  { month: 'Aug', value: 29.3 },
  { month: 'Sep', value: 28.5 },
  { month: 'Oct', value: 27.2 },
  { month: 'Nov', value: 25.8 },
  { month: 'Dec', value: 24.7 },
];

const emissionsData = [
  { year: '2016', emissions: 36.2 },
  { year: '2017', emissions: 36.8 },
  { year: '2018', emissions: 37.1 },
  { year: '2019', emissions: 37.9 },
  { year: '2020', emissions: 35.4 },
  { year: '2021', emissions: 36.3 },
  { year: '2022', emissions: 37.5 },
  { year: '2023', emissions: 37.8 },
  { year: '2024', emissions: 37.2 },
];

const biodiversityData = [
  { name: 'Stable', value: 35 },
  { name: 'Declining', value: 45 },
  { name: 'Endangered', value: 15 },
  { name: 'Extinct', value: 5 },
];

const COLORS = ['#0088FE', '#FF8042', '#FFBB28', '#FF0000'];

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      toast.error("Please sign in to access the dashboard");
      navigate('/signin');
    }
  }, [navigate]);

  const handleDownload = () => {
    toast.success("Report downloaded successfully");
  };

  const handleBookmark = () => {
    toast.success("Dashboard bookmarked");
  };

  const handleShare = () => {
    toast.success("Share link copied to clipboard");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Environmental Dashboard</h1>
          <p className="text-gray-600 mb-6">Monitor and analyze global environmental trends and metrics</p>
          
          <div className="flex flex-wrap gap-2 mb-8">
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" /> Download Report
            </Button>
            <Button variant="outline" size="sm" onClick={handleBookmark}>
              <Bookmark className="h-4 w-4 mr-2" /> Save Dashboard
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" /> Share
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="regions">Regions</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Global Temperature Trends</CardTitle>
                  <CardDescription>Average monthly temperature (°C)</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={temperatureData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[20, 30]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="value" stroke="#8884d8" name="Temperature °C" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Carbon Emissions</CardTitle>
                  <CardDescription>Annual global CO2 emissions (GT)</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={emissionsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis domain={[35, 38]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="emissions" fill="#82ca9d" name="CO2 Emissions (GT)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Biodiversity Status</CardTitle>
                  <CardDescription>Species population trend</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={biodiversityData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {biodiversityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Live Global Data Visualization</CardTitle>
                  <CardDescription>Interactive global environmental data view</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <GlobalMap />
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="bg-amber-50">
                <CardTitle className="flex items-center text-amber-700">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Environmental Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="divide-y">
                  <li className="p-4 hover:bg-gray-50">
                    <h4 className="font-medium">Rising Sea Levels Alert</h4>
                    <p className="text-sm text-gray-600">Coastal areas showing 0.3cm rise in the past month</p>
                  </li>
                  <li className="p-4 hover:bg-gray-50">
                    <h4 className="font-medium">Deforestation Alert</h4>
                    <p className="text-sm text-gray-600">Amazon rainforest lost 150 sq km in April 2025</p>
                  </li>
                  <li className="p-4 hover:bg-gray-50">
                    <h4 className="font-medium">Air Quality Warning</h4>
                    <p className="text-sm text-gray-600">AQI above 150 in 5 major Asian cities</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trends">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Long-term Climate Trends</CardTitle>
                  <CardDescription>Historical data and projections</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Detailed trend analysis charts will display here.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="regions">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Regional Analysis</CardTitle>
                  <CardDescription>Environmental data by geographic region</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Regional comparison charts will display here.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="alerts">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Critical Environmental Alerts</CardTitle>
                  <CardDescription>Urgent environmental issues requiring attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>List of environmental alerts will display here.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
