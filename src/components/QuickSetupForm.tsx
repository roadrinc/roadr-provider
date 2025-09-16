import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
// import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { RoadrLogo } from './RoadrLogo';
import {
  ROADR_SERVICES,
  groupServicesByCategoryForServiceType,
} from '../utils/services';
import {
  handlePhoneInput,
  handlePhoneKeyDown,
  getPhoneNumberPlaceholder,
} from '../utils/phone';
import {
  Building,
  MapPin,
  AlertCircle,
  CheckCircle,
  Zap,
  ArrowRight,
  Car,
  Store,
} from 'lucide-react';

interface User {
  email: string;
  businessName: string;
  phone: string;
}

interface QuickSetupFormProps {
  onSubmit: (data: unknown) => Promise<void>;
  onNavigate: (page: string) => void;
  user: User | null;
  error?: string;
  onClearError?: () => void;
}

export function QuickSetupForm({
  onSubmit,
  onNavigate,
  user,
  error,
  onClearError,
}: QuickSetupFormProps) {
  const [formData, setFormData] = useState({
    businessName: '',
    phone: '',
    serviceArea: '',
    businessAddress: '',
    serviceType: 'mobile' as 'mobile' | 'shop',
    services: [] as string[],
    servicePricing: {} as Record<
      string,
      { price: string; unit: string; mileageRate?: string }
    >,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState<unknown[]>([]);
  const [showAddressSuggestions, setShowAddressSuggestions] = useState(false);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const googlePlacesService = useRef<{
    getPlacePredictions: (
      request: {
        input: string;
        types: string[];
        componentRestrictions: { country: string };
      },
      callback: (predictions: unknown, status: unknown) => void
    ) => void;
  } | null>(null);

  // Group services by category and filter based on service type
  const servicesByCategory = React.useMemo(() => {
    // Services to exclude from individual listings (to avoid redundancy with category titles)
    const EXCLUDED_SERVICES = ['roadside-assistance'];
    try {
      if (
        !ROADR_SERVICES ||
        !Array.isArray(ROADR_SERVICES) ||
        ROADR_SERVICES.length === 0
      ) {
        return {};
      }

      // Get services filtered by service type (mobile vs shop)
      const grouped = groupServicesByCategoryForServiceType(
        formData.serviceType
      );

      // Filter out redundant services that match category names
      const filtered: Record<string, typeof ROADR_SERVICES> = {};

      Object.entries(grouped).forEach(
        ([category, services]: [string, unknown]) => {
          // Remove services that are redundant with the category name
          const servicesArray = services as typeof ROADR_SERVICES;
          const filteredServices = servicesArray.filter(
            (service) => !EXCLUDED_SERVICES.includes(service.id)
          );

          if (filteredServices.length > 0) {
            filtered[category] = filteredServices;
          }
        }
      );

      return filtered;
    } catch (error) {
      console.error('Error grouping services:', error);
      return {};
    }
  }, [formData.serviceType]);

  const handleInputChange = (field: string, value: unknown) => {
    if (onClearError) onClearError();
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (serviceId: string) => {
    if (!serviceId || typeof serviceId !== 'string') {
      return;
    }

    setFormData((prev) => {
      if (!Array.isArray(prev.services)) {
        return { ...prev, services: [serviceId] };
      }

      const isCurrentlySelected = prev.services.includes(serviceId);
      let newServices;
      const newServicePricing = { ...prev.servicePricing };

      if (isCurrentlySelected) {
        // Remove service and its pricing
        newServices = prev.services.filter((id) => id !== serviceId);
        delete newServicePricing[serviceId];
      } else {
        // Add service with empty pricing
        newServices = [...prev.services, serviceId];
        const service = ROADR_SERVICES.find((s) => s.id === serviceId);
        const isTowingService = service?.priceUnit === 'base fee + per mile';

        // Set default unit based on service type

        newServicePricing[serviceId] = isTowingService
          ? { price: '', unit: 'per_service', mileageRate: '' }
          : { price: '', unit: 'per_service' };
      }

      return {
        ...prev,
        services: newServices,
        servicePricing: newServicePricing,
      };
    });
  };

  const handleServicePricingChange = (
    serviceId: string,
    field: 'price' | 'unit' | 'mileageRate',
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      servicePricing: {
        ...prev.servicePricing,
        [serviceId]: {
          ...prev.servicePricing[serviceId],
          [field]: value,
        },
      },
    }));
  };

  // Google Places API integration
  useEffect(() => {
    // Load Google Places API
    if (typeof window !== 'undefined' && !window.google) {
      const script = document.createElement('script');
      // Use placeholder API key for demo - replace with your actual Google Places API key
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_PLACES_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializePlacesService;
      script.onerror = () => {
        console.warn(
          'Google Places API failed to load. Address autocomplete will not work.'
        );
      };
      document.head.appendChild(script);
    } else if (window.google) {
      initializePlacesService();
    }
  }, []);

  const initializePlacesService = () => {
    try {
      if (window.google && window.google.maps && window.google.maps.places) {
        googlePlacesService.current =
          new window.google.maps.places.AutocompleteService();
        console.log('Google Places API initialized successfully');
      } else {
        console.warn('Google Places API not available');
        googlePlacesService.current = null;
      }
    } catch (error) {
      console.warn('Failed to initialize Google Places API:', error);
      googlePlacesService.current = null;
    }
  };

  const handleAddressSearch = (query: string) => {
    handleInputChange('businessAddress', query);

    if (query.length < 3 || !googlePlacesService.current || !window.google) {
      setAddressSuggestions([]);
      setShowAddressSuggestions(false);
      return;
    }

    try {
      googlePlacesService.current.getPlacePredictions(
        {
          input: query,
          types: ['establishment', 'geocode'],
          componentRestrictions: { country: 'us' },
        },
        (predictions: unknown, status: unknown) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setAddressSuggestions(
              Array.isArray(predictions) ? predictions : []
            );
            setShowAddressSuggestions(true);
          } else {
            setAddressSuggestions([]);
            setShowAddressSuggestions(false);
          }
        }
      );
    } catch (error) {
      console.warn('Google Places API error:', error);
      setAddressSuggestions([]);
      setShowAddressSuggestions(false);
    }
  };

  const selectAddress = (prediction: unknown) => {
    const pred = prediction as { description: string };
    handleInputChange('businessAddress', pred.description);
    setShowAddressSuggestions(false);
    setAddressSuggestions([]);
  };

  const validateForm = () => {
    const hasValidPricing = formData.services.every((serviceId) => {
      const pricing = formData.servicePricing[serviceId];
      const service = ROADR_SERVICES.find((s) => s.id === serviceId);
      const isTowingService = service?.priceUnit === 'base fee + per mile';

      if (isTowingService) {
        return pricing && pricing.price && pricing.unit && pricing.mileageRate;
      }
      return pricing && pricing.price && pricing.unit;
    });

    // For shop services, require business address
    const addressRequired =
      formData.serviceType === 'shop' ? formData.businessAddress : true;

    return (
      formData.businessName &&
      formData.phone &&
      formData.serviceArea &&
      formData.services.length > 0 &&
      hasValidPricing &&
      addressRequired
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const submitData = {
        ...formData,
        email: user?.email || '',
        ownerName: user?.businessName || user?.email?.split('@')[0] || '',
      };
      await onSubmit(submitData);
      // Navigate to dashboard after successful setup
      onNavigate('dashboard');
    } catch (error) {
      console.error('Setup submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <RoadrLogo width={120} height={32} className="text-foreground" />
            <Badge className="bg-success/10 text-success border border-success/20">
              <CheckCircle className="h-3 w-3 mr-1" />
              Payment Complete
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Quick Business Setup
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-6">
              Complete your profile in just a few minutes. You&apos;ll start
              receiving booking requests as soon as you finish.
            </p>

            {/* Progress indicator */}
            <div className="flex items-center justify-center mb-6">
              <Badge className="bg-roadr-orange/10 text-roadr-orange border border-roadr-orange/20 px-4 py-2">
                <Zap className="h-4 w-4 mr-2" />
                Almost Ready to Accept Bookings!
              </Badge>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Business Information
              </CardTitle>
            </CardHeader>

            <CardContent>
              {error && (
                <Alert className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      type="text"
                      value={formData.businessName}
                      onChange={(e) =>
                        handleInputChange('businessName', e.target.value)
                      }
                      placeholder="Elite Auto Services"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Business Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handlePhoneInput(e, (value) =>
                          handleInputChange('phone', value)
                        )
                      }
                      onKeyDown={handlePhoneKeyDown}
                      placeholder={getPhoneNumberPlaceholder()}
                      maxLength={20}
                      required
                    />
                  </div>

                  {/* Service Type Selection */}
                  <div className="space-y-3">
                    <Label>Service Type *</Label>
                    <RadioGroup
                      value={formData.serviceType}
                      onValueChange={(value) =>
                        handleInputChange('serviceType', value)
                      }
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-2 border border-border rounded-lg p-4 hover:border-roadr-orange/50 transition-colors">
                        <RadioGroupItem value="mobile" id="mobile" />
                        <div className="flex items-center space-x-2">
                          <Car className="h-4 w-4 text-roadr-orange" />
                          <Label htmlFor="mobile" className="cursor-pointer">
                            Mobile Service
                          </Label>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 border border-border rounded-lg p-4 hover:border-roadr-orange/50 transition-colors">
                        <RadioGroupItem value="shop" id="shop" />
                        <div className="flex items-center space-x-2">
                          <Store className="h-4 w-4 text-roadr-orange" />
                          <Label htmlFor="shop" className="cursor-pointer">
                            In-Shop Service
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                    <p className="text-xs text-muted-foreground">
                      Mobile: You travel to customers. In-Shop: Customers come
                      to your location.
                    </p>
                  </div>

                  {/* Business Address (required for shop services) */}
                  {formData.serviceType === 'shop' && (
                    <div className="relative">
                      <Label htmlFor="businessAddress">
                        Business Address *
                      </Label>
                      <Input
                        ref={addressInputRef}
                        id="businessAddress"
                        type="text"
                        value={formData.businessAddress}
                        onChange={(e) => handleAddressSearch(e.target.value)}
                        onFocus={() =>
                          formData.businessAddress.length >= 3 &&
                          setShowAddressSuggestions(true)
                        }
                        onBlur={() =>
                          setTimeout(
                            () => setShowAddressSuggestions(false),
                            200
                          )
                        }
                        placeholder="123 Main St, Dallas, TX 75201"
                        required
                      />
                      {showAddressSuggestions &&
                        addressSuggestions.length > 0 && (
                          <div className="absolute top-full left-0 right-0 z-50 bg-card border border-border rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
                            {addressSuggestions.map((prediction) => {
                              const pred = prediction as {
                                place_id: string;
                                description: string;
                              };
                              return (
                                <button
                                  key={pred.place_id}
                                  type="button"
                                  className="w-full text-left px-4 py-2 hover:bg-muted transition-colors text-sm"
                                  onClick={() => selectAddress(prediction)}
                                >
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 text-muted-foreground mr-2 flex-shrink-0" />
                                    <span className="truncate">
                                      {pred.description}
                                    </span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      <p className="text-xs text-muted-foreground mt-1">
                        Your shop address where customers will visit
                      </p>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="serviceArea">Service Area *</Label>
                    <Input
                      id="serviceArea"
                      type="text"
                      value={formData.serviceArea}
                      onChange={(e) =>
                        handleInputChange('serviceArea', e.target.value)
                      }
                      placeholder={
                        formData.serviceType === 'mobile'
                          ? 'Dallas, TX and surrounding areas'
                          : 'Dallas metro area within 25 miles'
                      }
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.serviceType === 'mobile'
                        ? 'Areas where you provide mobile services'
                        : 'How far customers can be from your shop'}
                    </p>
                  </div>
                </div>

                {/* Services Selection */}
                <div className="space-y-4">
                  <div>
                    <Label>Services You Offer *</Label>
                    <p className="text-sm text-muted-foreground mb-4">
                      {formData.serviceType === 'mobile'
                        ? 'Select services you provide on-site at customer locations and set competitive pricing'
                        : 'Select services you provide at your shop location and set competitive pricing'}
                    </p>
                  </div>

                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {Object.entries(servicesByCategory).map(
                      ([category, services]) => (
                        <div
                          key={category}
                          className="border border-border rounded-lg p-4"
                        >
                          <h4 className="font-medium text-foreground mb-3">
                            {category}
                          </h4>
                          <div className="space-y-3">
                            {Array.isArray(services) &&
                              services.map((service) => (
                                <div key={service.id} className="space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      id={service.id}
                                      checked={formData.services.includes(
                                        service.id
                                      )}
                                      onCheckedChange={() =>
                                        handleServiceToggle(service.id)
                                      }
                                    />
                                    <label
                                      htmlFor={service.id}
                                      className="text-sm font-medium cursor-pointer flex-1"
                                    >
                                      {service.name}
                                    </label>
                                  </div>

                                  {/* Pricing inputs for selected services */}
                                  {formData.services.includes(service.id) && (
                                    <div className="ml-6 space-y-2">
                                      {service.priceUnit ===
                                      'base fee + per mile' ? (
                                        // Towing services with dual pricing
                                        <div className="grid grid-cols-2 gap-2">
                                          <div>
                                            <Label className="text-xs text-muted-foreground">
                                              Hook Up Fee ($)
                                            </Label>
                                            <Input
                                              type="number"
                                              placeholder="75"
                                              value={
                                                formData.servicePricing[
                                                  service.id
                                                ]?.price || ''
                                              }
                                              onChange={(e) =>
                                                handleServicePricingChange(
                                                  service.id,
                                                  'price',
                                                  e.target.value
                                                )
                                              }
                                              min="0"
                                              step="0.01"
                                            />
                                          </div>
                                          <div>
                                            <Label className="text-xs text-muted-foreground">
                                              Per Mile Rate ($)
                                            </Label>
                                            <Input
                                              type="number"
                                              placeholder="3.50"
                                              value={
                                                formData.servicePricing[
                                                  service.id
                                                ]?.mileageRate || ''
                                              }
                                              onChange={(e) =>
                                                handleServicePricingChange(
                                                  service.id,
                                                  'mileageRate',
                                                  e.target.value
                                                )
                                              }
                                              min="0"
                                              step="0.01"
                                            />
                                          </div>
                                        </div>
                                      ) : (
                                        // Regular services with single pricing
                                        <div className="grid grid-cols-2 gap-2">
                                          <div>
                                            <Input
                                              type="number"
                                              placeholder="Price"
                                              value={
                                                formData.servicePricing[
                                                  service.id
                                                ]?.price || ''
                                              }
                                              onChange={(e) =>
                                                handleServicePricingChange(
                                                  service.id,
                                                  'price',
                                                  e.target.value
                                                )
                                              }
                                              min="0"
                                              step="0.01"
                                            />
                                          </div>
                                          <div>
                                            <Select
                                              value={
                                                formData.servicePricing[
                                                  service.id
                                                ]?.unit || 'per_service'
                                              }
                                              onValueChange={(value) =>
                                                handleServicePricingChange(
                                                  service.id,
                                                  'unit',
                                                  value
                                                )
                                              }
                                            >
                                              <SelectTrigger>
                                                <SelectValue placeholder="Unit" />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectItem value="per_service">
                                                  Per Service
                                                </SelectItem>
                                                <SelectItem value="per_hour">
                                                  Per Hour
                                                </SelectItem>
                                                <SelectItem value="per_mile">
                                                  Per Mile
                                                </SelectItem>
                                                <SelectItem value="per_vehicle">
                                                  Per Vehicle
                                                </SelectItem>
                                                <SelectItem value="per_axle">
                                                  Per Axle
                                                </SelectItem>
                                                <SelectItem value="per_pair">
                                                  Per Pair
                                                </SelectItem>
                                                <SelectItem value="per_tire">
                                                  Per Tire
                                                </SelectItem>
                                                <SelectItem value="per_repair">
                                                  Per Repair
                                                </SelectItem>
                                                <SelectItem value="per_window">
                                                  Per Window
                                                </SelectItem>
                                                <SelectItem value="per_caliper">
                                                  Per Caliper
                                                </SelectItem>
                                                <SelectItem value="per_gallon">
                                                  Per Gallon
                                                </SelectItem>
                                                <SelectItem value="per_session">
                                                  Per Session
                                                </SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  {formData.services.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      Please select at least one service to continue
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="border-t border-border pt-6">
                  <Button
                    type="submit"
                    disabled={!validateForm() || isSubmitting}
                    className="w-full bg-roadr-black hover:bg-roadr-black/90 text-white"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Setting Up Your Profile...
                      </>
                    ) : (
                      <>
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Complete Setup & Start Earning
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Footer Info */}
          <div className="text-center mt-6 text-sm text-muted-foreground">
            <p>
              You can always update your services and pricing later from your
              dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
