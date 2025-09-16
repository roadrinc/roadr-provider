'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RoadrLogo } from '@/components/RoadrLogo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { QuickPaymentPage } from '@/components/QuickPaymentPage';
import { QuickSetupForm } from '@/components/QuickSetupForm';
import { Dashboard } from '@/components/Dashboard';
import { Eye, EyeOff, AlertCircle, User, Shield } from 'lucide-react';

interface User {
  email: string;
  businessName: string;
  phone: string;
  serviceArea?: string;
  serviceType?: string;
  services?: string[];
  servicePricing?: Record<
    string,
    { price: string; unit: string; mileageRate?: string }
  >;
}

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState('');
  const [loginType, setLoginType] = useState('provider');
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState<User | null>(null);

  const clearErrors = () => {
    setLocalError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    clearErrors();

    if (!email || !password) {
      setLocalError('Please enter email and password');
      setIsLoading(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLocalError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Login attempt:', { email, password, loginType });
    } catch (error: unknown) {
      setLocalError(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    setLoginType(value);
    clearErrors();
    // Clear form when switching tabs
    setEmail('');
    setPassword('');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    clearErrors();
  };

  const handlePaymentSuccess = async (paymentMethodId: string) => {
    console.log('Payment successful:', paymentMethodId);
    // Payment success is handled by the payment page navigation
  };

  const handleSetupSubmit = async (data: unknown) => {
    console.log('Setup form submitted:', data);
    // In a real app, you would save this data to your backend
    // Update user data with setup information
    if (data && typeof data === 'object' && 'businessName' in data) {
      const setupData = data as {
        businessName: string;
        phone: string;
        serviceArea: string;
        serviceType: string;
        services: string[];
        servicePricing: Record<
          string,
          { price: string; unit: string; mileageRate?: string }
        >;
      };
      setUser((prev) => ({
        ...prev,
        email: prev?.email || '',
        businessName: setupData.businessName,
        phone: setupData.phone,
        serviceArea: setupData.serviceArea,
        serviceType: setupData.serviceType,
        services: setupData.services,
        servicePricing: setupData.servicePricing,
      }));
    }
  };

  const handleSignup = () => {
    console.log('Sign up button clicked!');
    // Create a mock user object for the payment page
    const mockUser = {
      email: email || 'new-user@example.com',
      businessName: 'New Business',
      phone: '+1234567890',
    };
    setUser(mockUser);
    setCurrentPage('payment');
  };

  const displayError = localError;

  // Show payment page if currentPage is 'payment'
  if (currentPage === 'payment') {
    return (
      <QuickPaymentPage
        onPaymentSuccess={handlePaymentSuccess}
        onNavigate={handleNavigate}
        user={user}
      />
    );
  }

  // Show setup form if currentPage is 'setup'
  if (currentPage === 'setup') {
    return (
      <QuickSetupForm
        onSubmit={handleSetupSubmit}
        onNavigate={handleNavigate}
        user={user}
      />
    );
  }

  // Show dashboard if currentPage is 'dashboard'
  if (currentPage === 'dashboard') {
    // If user is null, redirect back to login
    if (!user) {
      setCurrentPage('login');
      return null;
    }

    return (
      <Dashboard
        user={user}
        onLogout={() => setCurrentPage('login')}
        onNavigate={handleNavigate}
        onVerificationSuccess={() => {}}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <RoadrLogo width={120} height={32} className="text-foreground" />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl text-primary mb-2">Welcome back</h1>
            <p className="text-muted-foreground">
              Sign in to your registered account
            </p>
          </div>

          <Card>
            <CardHeader>
              <Tabs
                value={loginType}
                onValueChange={handleTabChange}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger
                    value="provider"
                    className="flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    Provider
                  </TabsTrigger>
                  <TabsTrigger
                    value="admin"
                    className="flex items-center gap-2"
                  >
                    <Shield className="h-4 w-4" />
                    Admin
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {displayError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{displayError}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      clearErrors();
                    }}
                    placeholder={
                      loginType === 'admin'
                        ? 'admin@roadr.com'
                        : 'Enter your registered email'
                    }
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        clearErrors();
                      }}
                      placeholder="Enter your password"
                      required
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant={'ghost' as const}
                      size={'sm' as const}
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    `Sign in as ${loginType === 'admin' ? 'Admin' : 'Provider'}`
                  )}
                </Button>
              </form>

              {loginType === 'provider' && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Don&apos;t have an account?{' '}
                    <span
                      onClick={handleSignup}
                      className="text-roadr-orange hover:text-roadr-orange-dark underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                      style={{
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                      }}
                    >
                      Sign up
                    </span>
                  </p>
                </div>
              )}

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="text-sm font-medium mb-2">Demo Credentials:</h4>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div>
                    <strong>Admin:</strong> admin@roadr.com / admin123
                  </div>
                  <div>
                    <strong>Provider:</strong> demo@provider.com / demo123
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
