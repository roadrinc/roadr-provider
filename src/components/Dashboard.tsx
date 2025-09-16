import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Checkbox } from './ui/checkbox';
import { formatExistingPhoneNumber } from '../utils/phone';
import {
  Star,
  Calendar,
  DollarSign,
  Users,
  Clock,
  Bell,
  LogOut,
  Settings,
  CheckCircle,
  AlertCircle,
  BarChart3,
  CreditCard,
  Wrench,
  Eye,
  Target,
  Trash2,
  Plus,
  ChevronDown,
  Home,
} from 'lucide-react';
import { RoadrLogo } from './RoadrLogo';
import { ThemeToggle } from './ThemeToggle';
import { getServiceById, groupServicesByCategory } from '../utils/services';

interface DashboardService {
  id: string;
  name: string;
  price: number | string;
  mileageRate?: number | string;
  description: string;
}

interface User {
  businessName?: string;
  phone?: string;
  email?: string;
  serviceArea?: string;
}

interface DashboardProps {
  user: User;
  onLogout: () => void;
  onNavigate: (page: string) => void;
  onVerificationSuccess: () => void;
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [businessInfo] = useState({
    companyName: user?.businessName || 'ABC Auto Services',
    phone: formatExistingPhoneNumber(user?.phone || '+1 555 123 4567'),
    email: user?.email || 'contact@abcauto.com',
    serviceArea: user?.serviceArea || 'Los Angeles, CA',
    hours: 'Mon-Fri 8:00 AM - 6:00 PM, Sat 9:00 AM - 4:00 PM',
  });

  // User's current service offerings (with prices)
  const [services, setServices] = useState<DashboardService[]>([]);

  // Track which services are currently selected
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  // Overview stats
  const [overviewStats] = useState({
    totalJobs: 156,
    totalEarnings: 18250,
    averageRating: 4.8,
    totalReviews: 142,
  });

  // Notification system state
  const [notifications] = useState([
    {
      id: 1,
      title: 'New Customer Request',
      message: 'John Smith requested an oil change service in Los Angeles',
      time: '5 minutes ago',
      type: 'request',
      unread: true,
    },
    {
      id: 2,
      title: 'Payment Received',
      message: 'Payment of $75.00 received for brake inspection',
      time: '2 hours ago',
      type: 'payment',
      unread: true,
    },
    {
      id: 3,
      title: 'Service Completed',
      message: 'Mike Davis confirmed tire rotation service completion',
      time: '1 day ago',
      type: 'completion',
      unread: false,
    },
  ]);

  // Dynamic recent activity data
  const [allRecentActivity] = useState([
    {
      id: 1,
      type: 'service_completed',
      title: 'Service completed',
      description: 'Oil change for John Smith',
      time: '2 hours ago',
      amount: '+$45',
      status: 'completed',
    },
    {
      id: 2,
      type: 'booking_request',
      title: 'New booking request',
      description: 'Brake service requested by Mike Johnson',
      time: '4 hours ago',
      amount: null,
      status: 'pending',
    },
    {
      id: 3,
      type: 'payment_received',
      title: 'Payment received',
      description: 'Tire rotation payment from Sarah Davis',
      time: '6 hours ago',
      amount: '+$35',
      status: 'completed',
    },
  ]);

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleRemoveService = (serviceId: string) => {
    setServices((prev) => prev.filter((s) => s.id !== serviceId));
    setSelectedServices((prev) => prev.filter((id) => id !== serviceId));
  };

  const handleSaveServices = () => {
    const newServices = selectedServices
      .filter((id) => !services.find((s) => s.id === id))
      .map((id) => {
        const roadrService = getServiceById(id);
        const isTowingServiceBool =
          roadrService?.priceUnit === 'base fee + per mile';

        return {
          id: id,
          name: roadrService?.name || 'Unknown Service',
          price: '',
          mileageRate: isTowingServiceBool ? '' : undefined,
          description: roadrService?.description || 'Service description',
        } as DashboardService;
      });

    const updatedServices = services.filter((s) =>
      selectedServices.includes(s.id)
    );
    setServices([...updatedServices, ...newServices]);
    setShowServiceModal(false);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'request':
        return <Users className="h-4 w-4 text-roadr-orange" />;
      case 'payment':
        return <DollarSign className="h-4 w-4 text-green-600" />;
      case 'completion':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getUnreadCount = () => notifications.filter((n) => n.unread).length;

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'service_completed':
        return { icon: CheckCircle, color: 'text-green-500' };
      case 'booking_request':
        return { icon: Calendar, color: 'text-blue-500' };
      case 'payment_received':
        return { icon: DollarSign, color: 'text-green-500' };
      default:
        return { icon: AlertCircle, color: 'text-muted-foreground' };
    }
  };

  const totalUnread = getUnreadCount();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-40">
        <div className="px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <RoadrLogo width={120} height={32} className="text-foreground" />
              <Badge className="bg-success/10 text-success border border-success/20">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified Provider
              </Badge>
            </div>

            <div className="flex items-center space-x-2">
              <ThemeToggle />

              {/* Notifications */}
              <Popover
                open={showNotifications}
                onOpenChange={setShowNotifications}
              >
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="relative">
                    <Bell className="h-4 w-4" />
                    {totalUnread > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-roadr-orange text-white p-0 flex items-center justify-center text-xs">
                        {totalUnread}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-80">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Notifications</h3>
                    </div>
                    <div className="space-y-2 max-h-80 overflow-auto">
                      {notifications.slice(0, 5).map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                            notification.unread
                              ? 'bg-muted/50 border-border hover:bg-muted'
                              : 'bg-background border-border/50 hover:bg-muted/30'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            {getNotificationIcon(notification.type)}
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-medium">
                                  {notification.title}
                                </p>
                                <span className="text-xs text-muted-foreground">
                                  {notification.time}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {notification.message}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* User Menu */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <span className="hidden sm:inline">
                      {businessInfo.companyName}
                    </span>
                    <span className="sm:hidden">Menu</span>
                    <ChevronDown className="h-3 w-3 ml-2" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-56">
                  <div className="space-y-2">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">
                        {businessInfo.companyName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {businessInfo.email}
                      </p>
                    </div>
                    <div className="border-t border-border pt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-destructive hover:text-destructive"
                        onClick={onLogout}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 lg:px-8 py-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          {/* Mobile Tabs */}
          <div className="lg:hidden">
            <TabsList className="grid w-full grid-cols-4 gap-1 p-1 h-auto">
              <TabsTrigger
                value="overview"
                className="flex flex-col items-center gap-1 py-2 px-2 text-xs"
              >
                <Home className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger
                value="services"
                className="flex flex-col items-center gap-1 py-2 px-2 text-xs"
              >
                <Wrench className="h-4 w-4" />
                <span>Services</span>
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="flex flex-col items-center gap-1 py-2 px-2 text-xs"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Analytics</span>
              </TabsTrigger>
              <TabsTrigger
                value="billing"
                className="flex flex-col items-center gap-1 py-2 px-2 text-xs"
              >
                <CreditCard className="h-4 w-4" />
                <span>Billing</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Desktop Tabs */}
          <div className="hidden lg:block">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Jobs
                      </p>
                      <p className="text-2xl font-bold">
                        {overviewStats.totalJobs}
                      </p>
                    </div>
                    <Calendar className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    <span className="text-green-600">+12%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Earnings
                      </p>
                      <p className="text-2xl font-bold">
                        ${overviewStats.totalEarnings.toLocaleString()}
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    <span className="text-green-600">+8%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Average Rating
                      </p>
                      <p className="text-2xl font-bold">
                        {overviewStats.averageRating}
                      </p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-500" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    <span className="text-green-600">+0.2</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Reviews
                      </p>
                      <p className="text-2xl font-bold">
                        {overviewStats.totalReviews}
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    <span className="text-green-600">+15</span> new this month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allRecentActivity.slice(0, 5).map((activity) => {
                    const { icon: Icon, color } = getActivityIcon(
                      activity.type
                    );
                    return (
                      <div
                        key={activity.id}
                        className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30"
                      >
                        <Icon className={`h-5 w-5 ${color}`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {activity.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {activity.description}
                          </p>
                        </div>
                        <div className="text-right">
                          {activity.amount && (
                            <p className="text-sm font-medium text-green-600">
                              {activity.amount}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Services & Pricing</h2>
                <p className="text-muted-foreground">
                  Manage your service offerings and pricing
                </p>
              </div>
              <Button onClick={() => setShowServiceModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </div>

            {services.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No Services Added
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Add your first service to start accepting bookings
                  </p>
                  <Button onClick={() => setShowServiceModal(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Service
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {services.map((service) => (
                  <Card key={service.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold">{service.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {service.description}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveService(service.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Add Service Modal */}
            <Dialog open={showServiceModal} onOpenChange={setShowServiceModal}>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
                <DialogHeader>
                  <DialogTitle>Add Services</DialogTitle>
                  <DialogDescription>
                    Select from Roadr&apos;s approved automotive services
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(groupServicesByCategory()).map(
                      ([category, categoryServices]) => (
                        <div key={category}>
                          <h3 className="font-medium mb-2">{category}</h3>
                          <div className="space-y-2">
                            {Array.isArray(categoryServices) &&
                              categoryServices.map((service) => (
                                <div
                                  key={service.id}
                                  className="flex items-center space-x-3 p-3 border rounded-lg"
                                >
                                  <Checkbox
                                    checked={selectedServices.includes(
                                      service.id
                                    )}
                                    onCheckedChange={() =>
                                      handleServiceToggle(service.id)
                                    }
                                  />
                                  <div className="flex-1">
                                    <p className="text-sm font-medium">
                                      {service.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {service.description}
                                    </p>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setShowServiceModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveServices}>
                    Add Selected Services
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Analytics</h2>
              <p className="text-muted-foreground">
                Track your business performance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Total Views
                      </p>
                      <p className="text-2xl font-bold">2,217</p>
                    </div>
                    <Eye className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    <span className="text-green-600">+12%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Leads Generated
                      </p>
                      <p className="text-2xl font-bold">314</p>
                    </div>
                    <Target className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    <span className="text-green-600">+8%</span> from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Avg. Response Time
                      </p>
                      <p className="text-2xl font-bold">2.5h</p>
                    </div>
                    <Clock className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    <span className="text-green-600">-15min</span> from last
                    month
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Billing & Subscription</h2>
                <p className="text-muted-foreground">
                  Manage your verification subscription
                </p>
              </div>
              <Button>
                <CreditCard className="h-4 w-4 mr-2" />
                Manage Subscription
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  Verification Subscription Active
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Plan</p>
                    <p className="font-medium">Monthly Verification</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-medium">$49.99/month</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Next Billing Date
                    </p>
                    <p className="font-medium">January 1, 2025</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge className="bg-success text-white">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
