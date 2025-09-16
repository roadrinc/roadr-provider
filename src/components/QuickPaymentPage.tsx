import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { RoadrLogo } from './RoadrLogo';
import {
  CreditCard,
  Shield,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Lock,
  Timer,
} from 'lucide-react';

interface User {
  email: string;
  businessName: string;
  phone: string;
}

interface QuickPaymentPageProps {
  onPaymentSuccess: (paymentMethodId: string) => Promise<void>;
  onNavigate: (page: string) => void;
  user: User | null;
}

export function QuickPaymentPage({
  onPaymentSuccess,
  onNavigate,
}: QuickPaymentPageProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  const handlePayment = async () => {
    if (!paymentMethod) {
      setError('Please select a payment method');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      // In a real implementation, this would integrate with Stripe for immediate charge
      // For demo purposes, we'll simulate the payment
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock payment method ID
      const mockPaymentMethodId =
        'pm_' + Math.random().toString(36).substr(2, 9);
      await onPaymentSuccess(mockPaymentMethodId);

      // Navigate to setup form after successful payment
      onNavigate('setup');
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const mockStripeIntegration = () => {
    // Simulate Stripe payment method selection
    setPaymentMethod('card_demo');
    setError('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <RoadrLogo width={120} height={32} className="text-foreground" />
            <Badge className="bg-roadr-orange/10 text-roadr-orange border border-roadr-orange/20">
              <Timer className="h-3 w-3 mr-1" />
              Quick Setup
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Welcome to Roadr Partner!
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-6">
              Get instant access to customers in your area. Start accepting
              bookings immediately after payment.
            </p>
          </div>

          {/* Payment Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Complete Your Registration
              </CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-6">
                {/* Subscription Details */}
                <div className="bg-gradient-to-r from-roadr-orange/10 to-roadr-orange-dark/10 p-6 rounded-lg border border-roadr-orange/20">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        Roadr Partner Monthly
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Unlimited bookings & premium features
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-roadr-orange">
                        $49.99
                      </div>
                      <div className="text-sm text-muted-foreground">
                        per month
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-success mr-2" />
                        <span>Unlimited service bookings</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-success mr-2" />
                        <span>Customer reviews & ratings</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-success mr-2" />
                        <span>Real-time notifications</span>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-success mr-2" />
                        <span>Analytics dashboard</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-success mr-2" />
                        <span>Priority customer support</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-success mr-2" />
                        <span>Verified provider badge</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Payment Method */}
                <div className="space-y-4">
                  <h4 className="font-medium">Payment Method</h4>

                  {!paymentMethod ? (
                    <div
                      className="border border-dashed border-roadr-orange/50 rounded-lg p-8 text-center cursor-pointer hover:border-roadr-orange transition-colors"
                      onClick={mockStripeIntegration}
                    >
                      <CreditCard className="h-8 w-8 text-roadr-orange mx-auto mb-3" />
                      <p className="font-medium text-foreground mb-1">
                        Add Payment Method
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Click to add your credit or debit card
                      </p>
                    </div>
                  ) : (
                    <div className="border border-success rounded-lg p-4 bg-success/5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <CreditCard className="h-5 w-5 text-success mr-3" />
                          <div>
                            <p className="font-medium">•••• •••• •••• 4242</p>
                            <p className="text-sm text-muted-foreground">
                              Demo Card (Visa)
                            </p>
                          </div>
                        </div>
                        <CheckCircle className="h-5 w-5 text-success" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Security Info */}
                <div className="bg-card border border-border rounded-lg p-4">
                  <h5 className="font-medium mb-2 flex items-center">
                    <Shield className="h-4 w-4 text-roadr-orange mr-2" />
                    Secure Payment & Instant Access
                  </h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>
                      • Payment processed immediately via secure Stripe
                      integration
                    </li>
                    <li>
                      • Instant access to your partner dashboard after payment
                    </li>
                    <li>• Start receiving bookings within minutes</li>
                    <li>• All payment data is encrypted and PCI compliant</li>
                    <li>• Cancel anytime from your dashboard</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => onNavigate('login')}
              disabled={isProcessing}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </Button>

            <Button
              onClick={handlePayment}
              disabled={!paymentMethod || isProcessing}
              className="bg-roadr-black hover:bg-roadr-black/90 text-white"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Pay $49.99 & Get Instant Access
                </>
              )}
            </Button>
          </div>

          {/* Footer Info */}
          <div className="text-center mt-8 text-sm text-muted-foreground">
            <p>
              By proceeding, you agree to our Terms of Service and Privacy
              Policy. Your subscription starts immediately and can be cancelled
              anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
