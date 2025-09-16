// Centralized services configuration for the entire Roadr Partner application
export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  description?: string;
  basePrice: number;
  priceUnit?: string;
}

export const ROADR_SERVICES: ServiceItem[] = [
  // Roadside Assistance (Mobile Only)
  { id: 'roadside-assistance', name: 'Roadside Assistance', category: 'Roadside', description: 'General roadside assistance services', basePrice: 85, priceUnit: 'per call' },
  { id: 'battery-jump-start', name: 'Battery Jump Start', category: 'Roadside', description: 'Jump start dead batteries on-site', basePrice: 45, priceUnit: 'per service' },
  { id: 'tire-change-spare', name: 'Tire Change – Spare Tire', category: 'Roadside', description: 'Install spare tire for flat tires', basePrice: 65, priceUnit: 'per tire' },
  { id: 'tire-change-new', name: 'Tire Change – New Tire', category: 'Roadside', description: 'Install new tire replacement', basePrice: 85, priceUnit: 'per tire' },
  { id: 'lockout-service', name: 'Vehicle Lockout Service', category: 'Roadside', description: 'Unlock vehicles for locked out customers', basePrice: 75, priceUnit: 'per service' },
  { id: 'key-replacement', name: 'Lost Key Replacement', category: 'Roadside', description: 'Key replacement and lockout services', basePrice: 125, priceUnit: 'per service' },
  { id: 'towing-standard', name: 'Standard Towing', category: 'Roadside', description: 'Standard vehicle towing services', basePrice: 95, priceUnit: 'base fee + per mile' },
  { id: 'towing-flatbed', name: 'Flatbed Towing', category: 'Roadside', description: 'Flatbed towing for special vehicles', basePrice: 135, priceUnit: 'base fee + per mile' },
  { id: 'winch-out', name: 'Winch Out Service', category: 'Roadside', description: 'Recovery service for stuck vehicles', basePrice: 125, priceUnit: 'per service' },
  
  // Engine Services
  { id: 'engine-diagnostics', name: 'Engine Diagnostics', category: 'Engine', description: 'Complete engine diagnostic and trouble code analysis', basePrice: 125, priceUnit: 'per service' },
  { id: 'engine-tune-up', name: 'Engine Tune-Up', category: 'Engine', description: 'Complete engine tune-up service', basePrice: 185, priceUnit: 'per service' },
  { id: 'engine-repair', name: 'Engine Repair', category: 'Engine', description: 'General engine repair services', basePrice: 145, priceUnit: 'per hour' },
  { id: 'timing-belt', name: 'Timing Belt Replacement', category: 'Engine', description: 'Timing belt and related components replacement', basePrice: 485, priceUnit: 'per service' },
  { id: 'spark-plugs', name: 'Spark Plug Replacement', category: 'Engine', description: 'Spark plug replacement service', basePrice: 125, priceUnit: 'per service' },
  { id: 'fuel-injector-cleaning', name: 'Fuel Injector Cleaning', category: 'Engine', description: 'Fuel system and injector cleaning service', basePrice: 165, priceUnit: 'per service' },
  
  // Oil & Fluids
  { id: 'oil-change-synthetic', name: 'Synthetic Oil Change', category: 'Oil & Fluids', description: 'Full synthetic oil change service', basePrice: 85, priceUnit: 'per service' },
  { id: 'oil-change-conventional', name: 'Conventional Oil Change', category: 'Oil & Fluids', description: 'Conventional oil change service', basePrice: 65, priceUnit: 'per service' },
  { id: 'oil-change-blend', name: 'Synthetic Blend Oil Change', category: 'Oil & Fluids', description: 'Synthetic blend oil change service', basePrice: 75, priceUnit: 'per service' },
  { id: 'transmission-fluid', name: 'Transmission Fluid Change', category: 'Oil & Fluids', description: 'Transmission fluid change and filter replacement', basePrice: 185, priceUnit: 'per service' },
  { id: 'brake-fluid', name: 'Brake Fluid Change', category: 'Oil & Fluids', description: 'Brake fluid flush and replacement', basePrice: 95, priceUnit: 'per service' },
  { id: 'power-steering-fluid', name: 'Power Steering Fluid', category: 'Oil & Fluids', description: 'Power steering fluid change', basePrice: 85, priceUnit: 'per service' },
  { id: 'differential-fluid', name: 'Differential Fluid Change', category: 'Oil & Fluids', description: 'Differential fluid change service', basePrice: 125, priceUnit: 'per service' },
  
  // Cooling System
  { id: 'coolant-flush', name: 'Coolant System Flush', category: 'Cooling System', description: 'Complete cooling system flush and refill', basePrice: 145, priceUnit: 'per service' },
  { id: 'radiator-repair', name: 'Radiator Repair', category: 'Cooling System', description: 'Radiator repair and replacement', basePrice: 285, priceUnit: 'per service' },
  { id: 'thermostat-replacement', name: 'Thermostat Replacement', category: 'Cooling System', description: 'Engine thermostat replacement', basePrice: 165, priceUnit: 'per service' },
  { id: 'water-pump', name: 'Water Pump Replacement', category: 'Cooling System', description: 'Water pump replacement service', basePrice: 385, priceUnit: 'per service' },
  { id: 'radiator-hoses', name: 'Radiator Hose Replacement', category: 'Cooling System', description: 'Radiator hose replacement', basePrice: 125, priceUnit: 'per service' },
  
  // Brakes
  { id: 'brake-pads-front', name: 'Front Brake Pads', category: 'Brakes', description: 'Front brake pad replacement', basePrice: 185, priceUnit: 'per axle' },
  { id: 'brake-pads-rear', name: 'Rear Brake Pads', category: 'Brakes', description: 'Rear brake pad replacement', basePrice: 165, priceUnit: 'per axle' },
  { id: 'brake-rotors-front', name: 'Front Brake Rotors', category: 'Brakes', description: 'Front brake rotor replacement', basePrice: 285, priceUnit: 'per axle' },
  { id: 'brake-rotors-rear', name: 'Rear Brake Rotors', category: 'Brakes', description: 'Rear brake rotor replacement', basePrice: 245, priceUnit: 'per axle' },
  { id: 'brake-inspection', name: 'Brake System Inspection', category: 'Brakes', description: 'Complete brake system inspection', basePrice: 65, priceUnit: 'per service' },
  { id: 'brake-caliper', name: 'Brake Caliper Service', category: 'Brakes', description: 'Brake caliper repair or replacement', basePrice: 245, priceUnit: 'per caliper' },
  
  // Tires & Wheels
  { id: 'tire-mounting-balancing', name: 'Tire Mount & Balance', category: 'Tires & Wheels', description: 'Tire mounting and balancing service', basePrice: 35, priceUnit: 'per tire' },
  { id: 'tire-rotation', name: 'Tire Rotation', category: 'Tires & Wheels', description: 'Tire rotation service', basePrice: 45, priceUnit: 'per vehicle' },
  { id: 'tire-repair', name: 'Tire Repair/Patch', category: 'Tires & Wheels', description: 'Tire puncture repair and patching', basePrice: 25, priceUnit: 'per tire' },
  { id: 'wheel-alignment', name: 'Wheel Alignment', category: 'Tires & Wheels', description: 'Front-end or 4-wheel alignment', basePrice: 125, priceUnit: 'per service' },
  { id: 'tire-pressure-monitoring', name: 'TPMS Service', category: 'Tires & Wheels', description: 'Tire pressure monitoring system service', basePrice: 85, priceUnit: 'per service' },
  { id: 'new-tire-sales', name: 'New Tire Sales', category: 'Tires & Wheels', description: 'New tire sales with installation', basePrice: 145, priceUnit: 'per tire' },
  { id: 'used-tire-sales', name: 'Used Tire Sales', category: 'Tires & Wheels', description: 'Used tire sales with installation', basePrice: 85, priceUnit: 'per tire' },
  
  // Suspension & Steering
  { id: 'shock-absorbers', name: 'Shock Absorber Replacement', category: 'Suspension & Steering', description: 'Shock absorber replacement service', basePrice: 285, priceUnit: 'per pair' },
  { id: 'struts', name: 'Strut Replacement', category: 'Suspension & Steering', description: 'Strut assembly replacement', basePrice: 385, priceUnit: 'per pair' },
  { id: 'tie-rod-ends', name: 'Tie Rod End Replacement', category: 'Suspension & Steering', description: 'Tie rod end replacement', basePrice: 165, priceUnit: 'per service' },
  { id: 'ball-joints', name: 'Ball Joint Replacement', category: 'Suspension & Steering', description: 'Ball joint replacement service', basePrice: 245, priceUnit: 'per service' },
  { id: 'sway-bar-links', name: 'Sway Bar Links', category: 'Suspension & Steering', description: 'Sway bar link replacement', basePrice: 125, priceUnit: 'per service' },
  
  // Transmission
  { id: 'transmission-service', name: 'Transmission Service', category: 'Transmission', description: 'Complete transmission service', basePrice: 245, priceUnit: 'per service' },
  { id: 'transmission-repair', name: 'Transmission Repair', category: 'Transmission', description: 'Transmission repair services', basePrice: 185, priceUnit: 'per hour' },
  { id: 'clutch-replacement', name: 'Clutch Replacement', category: 'Transmission', description: 'Manual transmission clutch replacement', basePrice: 1285, priceUnit: 'per service' },
  { id: 'cv-joint', name: 'CV Joint Replacement', category: 'Transmission', description: 'CV joint and axle replacement', basePrice: 385, priceUnit: 'per service' },
  
  // Electrical & Battery
  { id: 'battery-replacement', name: 'Battery Replacement', category: 'Electrical & Battery', description: 'Car battery replacement service', basePrice: 185, priceUnit: 'per service' },
  { id: 'alternator-replacement', name: 'Alternator Replacement', category: 'Electrical & Battery', description: 'Alternator replacement service', basePrice: 485, priceUnit: 'per service' },
  { id: 'starter-replacement', name: 'Starter Replacement', category: 'Electrical & Battery', description: 'Starter motor replacement', basePrice: 385, priceUnit: 'per service' },
  { id: 'electrical-diagnostics', name: 'Electrical Diagnostics', category: 'Electrical & Battery', description: 'Electrical system diagnostics', basePrice: 125, priceUnit: 'per hour' },
  { id: 'wiring-repair', name: 'Wiring Repair', category: 'Electrical & Battery', description: 'Electrical wiring repair service', basePrice: 145, priceUnit: 'per hour' },
  
  // Air Conditioning & Heating
  { id: 'ac-recharge', name: 'A/C Recharge', category: 'A/C & Heating', description: 'Air conditioning refrigerant recharge', basePrice: 125, priceUnit: 'per service' },
  { id: 'ac-repair', name: 'A/C System Repair', category: 'A/C & Heating', description: 'Air conditioning system repair', basePrice: 185, priceUnit: 'per hour' },
  { id: 'heater-repair', name: 'Heater Repair', category: 'A/C & Heating', description: 'Heating system repair service', basePrice: 165, priceUnit: 'per hour' },
  { id: 'cabin-air-filter', name: 'Cabin Air Filter', category: 'A/C & Heating', description: 'Cabin air filter replacement', basePrice: 45, priceUnit: 'per service' },
  
  // Filters & Maintenance
  { id: 'air-filter', name: 'Engine Air Filter', category: 'Filters & Maintenance', description: 'Engine air filter replacement', basePrice: 35, priceUnit: 'per service' },
  { id: 'fuel-filter', name: 'Fuel Filter Replacement', category: 'Filters & Maintenance', description: 'Fuel filter replacement service', basePrice: 85, priceUnit: 'per service' },
  { id: 'pcv-valve', name: 'PCV Valve Replacement', category: 'Filters & Maintenance', description: 'PCV valve replacement', basePrice: 45, priceUnit: 'per service' },
  { id: 'belts-hoses', name: 'Belts & Hoses Inspection', category: 'Filters & Maintenance', description: 'Belt and hose inspection and replacement', basePrice: 125, priceUnit: 'per service' },
  
  // Exhaust System
  { id: 'muffler-replacement', name: 'Muffler Replacement', category: 'Exhaust System', description: 'Muffler replacement service', basePrice: 285, priceUnit: 'per service' },
  { id: 'catalytic-converter', name: 'Catalytic Converter', category: 'Exhaust System', description: 'Catalytic converter replacement', basePrice: 885, priceUnit: 'per service' },
  { id: 'exhaust-pipe-repair', name: 'Exhaust Pipe Repair', category: 'Exhaust System', description: 'Exhaust pipe repair and replacement', basePrice: 185, priceUnit: 'per service' },
  
  // Inspection & Testing
  { id: 'state-inspection', name: 'State Safety Inspection', category: 'Inspection & Testing', description: 'Official state safety inspection', basePrice: 25, priceUnit: 'per service' },
  { id: 'emissions-test', name: 'Emissions Testing', category: 'Inspection & Testing', description: 'Vehicle emissions testing', basePrice: 35, priceUnit: 'per service' },
  { id: 'pre-purchase-inspection', name: 'Pre-Purchase Inspection', category: 'Inspection & Testing', description: 'Comprehensive pre-purchase vehicle inspection', basePrice: 165, priceUnit: 'per service' },
  
  // Detailing & Appearance
  { id: 'basic-wash', name: 'Basic Car Wash', category: 'Detailing & Appearance', description: 'Basic exterior car wash', basePrice: 25, priceUnit: 'per vehicle' },
  { id: 'full-detail', name: 'Full Detailing Service', category: 'Detailing & Appearance', description: 'Complete interior and exterior detailing', basePrice: 285, priceUnit: 'per vehicle' },
  { id: 'interior-cleaning', name: 'Interior Deep Clean', category: 'Detailing & Appearance', description: 'Deep interior cleaning service', basePrice: 125, priceUnit: 'per vehicle' },
  { id: 'wax-polish', name: 'Wax & Polish', category: 'Detailing & Appearance', description: 'Vehicle waxing and polishing service', basePrice: 85, priceUnit: 'per vehicle' },
  
  // Glass & Windows
  { id: 'windshield-replacement', name: 'Windshield Replacement', category: 'Glass & Windows', description: 'Complete windshield replacement', basePrice: 385, priceUnit: 'per service' },
  { id: 'windshield-repair', name: 'Windshield Chip Repair', category: 'Glass & Windows', description: 'Windshield chip and crack repair', basePrice: 85, priceUnit: 'per repair' },
  { id: 'window-tinting', name: 'Window Tinting', category: 'Glass & Windows', description: 'Professional window tinting service', basePrice: 285, priceUnit: 'per vehicle' },
  { id: 'window-repair', name: 'Window Repair', category: 'Glass & Windows', description: 'Side window repair and replacement', basePrice: 185, priceUnit: 'per window' },
  
  // Performance & Modifications
  { id: 'performance-tuning', name: 'Performance Tuning', category: 'Performance & Modifications', description: 'Engine performance tuning and optimization', basePrice: 285, priceUnit: 'per service' },
  { id: 'cold-air-intake', name: 'Cold Air Intake Install', category: 'Performance & Modifications', description: 'Cold air intake system installation', basePrice: 185, priceUnit: 'per service' },
  { id: 'exhaust-upgrade', name: 'Performance Exhaust', category: 'Performance & Modifications', description: 'Performance exhaust system installation', basePrice: 485, priceUnit: 'per service' },
  
  // Fleet & Commercial
  { id: 'fleet-maintenance', name: 'Fleet Maintenance', category: 'Fleet & Commercial', description: 'Commercial fleet maintenance services', basePrice: 125, priceUnit: 'per hour' },
  { id: 'dot-inspection', name: 'DOT Inspection', category: 'Fleet & Commercial', description: 'Department of Transportation vehicle inspection', basePrice: 85, priceUnit: 'per vehicle' },
  { id: 'commercial-diagnostics', name: 'Commercial Vehicle Diagnostics', category: 'Fleet & Commercial', description: 'Heavy duty vehicle diagnostics', basePrice: 165, priceUnit: 'per hour' },
  
  // Fuel Services (Mobile Only)
  { id: 'fuel-delivery', name: 'Emergency Fuel Delivery', category: 'Fuel Services', description: 'Emergency fuel delivery service', basePrice: 45, priceUnit: 'plus fuel cost' },
  { id: 'premium-gasoline', name: 'Premium Gasoline Delivery', category: 'Fuel Services', description: 'Premium grade gasoline delivery', basePrice: 50, priceUnit: 'plus fuel cost' },
  { id: 'regular-gasoline', name: 'Regular Gasoline Delivery', category: 'Fuel Services', description: 'Regular grade gasoline delivery', basePrice: 45, priceUnit: 'plus fuel cost' },
  { id: 'diesel-delivery', name: 'Diesel Fuel Delivery', category: 'Fuel Services', description: 'Diesel fuel delivery service', basePrice: 55, priceUnit: 'plus fuel cost' }
];

// Service categories for filtering and organization
export const SERVICE_CATEGORIES = [
  'Roadside',
  'Engine',
  'Oil & Fluids',
  'Cooling System',
  'Brakes',
  'Tires & Wheels',
  'Suspension & Steering', 
  'Transmission',
  'Electrical & Battery',
  'A/C & Heating',
  'Filters & Maintenance',
  'Exhaust System',
  'Inspection & Testing',
  'Detailing & Appearance',
  'Glass & Windows',
  'Performance & Modifications',
  'Fleet & Commercial',
  'Fuel Services'
] as const;

export type ServiceCategory = typeof SERVICE_CATEGORIES[number];

// Helper functions
export const getServiceById = (id: string): ServiceItem | undefined => {
  return ROADR_SERVICES.find(service => service.id === id);
};

export const getServicesByCategory = (category: ServiceCategory): ServiceItem[] => {
  return ROADR_SERVICES.filter(service => service.category === category);
};

export const getServicesByIds = (ids: string[]): ServiceItem[] => {
  return ids.map(id => getServiceById(id)).filter(Boolean) as ServiceItem[];
};

export const groupServicesByCategory = (): Record<ServiceCategory, ServiceItem[]> => {
  return ROADR_SERVICES.reduce((acc, service) => {
    const category = service.category as ServiceCategory;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(service);
    return acc;
  }, {} as Record<ServiceCategory, ServiceItem[]>);
};

// Filter services based on service type (mobile vs shop)
export const getServicesForServiceType = (serviceType: 'mobile' | 'shop'): ServiceItem[] => {
  if (serviceType === 'shop') {
    // For shops, exclude mobile-only services
    const excludedCategories = ['Roadside', 'Fuel Services'];
    return ROADR_SERVICES.filter(service => 
      !excludedCategories.includes(service.category)
    );
  } else {
    // For mobile services, include all services but exclude some shop-specific ones
    const mobileExcludedServices = ['new-tire-sales', 'used-tire-sales', 'state-inspection', 'emissions-test'];
    return ROADR_SERVICES.filter(service => 
      !mobileExcludedServices.includes(service.id)
    );
  }
};

export const groupServicesByCategoryForServiceType = (serviceType: 'mobile' | 'shop'): Record<string, ServiceItem[]> => {
  const filteredServices = getServicesForServiceType(serviceType);
  return filteredServices.reduce((acc, service) => {
    const category = service.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(service);
    return acc;
  }, {} as Record<string, ServiceItem[]>);
};

// Convert service IDs to names for display
export const formatServiceNames = (serviceIds: string[]): string[] => {
  return getServicesByIds(serviceIds).map(service => service.name);
};

// Format price display with currency
export const formatServicePrice = (price: number, unit?: string): string => {
  const formattedPrice = `${price}`;
  return unit ? `${formattedPrice} ${unit}` : formattedPrice;
};

// Get total estimated earnings from selected services
export const calculateEstimatedEarnings = (serviceIds: string[]): number => {
  const services = getServicesByIds(serviceIds);
  return services.reduce((total, service) => total + service.basePrice, 0);
};

// Convert old service names to new IDs (for backward compatibility)
export const convertLegacyServiceNames = (serviceNames: string[]): string[] => {
  const nameToIdMap: Record<string, string> = {
    'Oil Change': 'oil-change-synthetic',
    'Brake Service': 'brake-pads-front',
    'Brake Inspection': 'brake-inspection',
    'Tire Rotation': 'tire-rotation',
    'Engine Diagnostics': 'engine-diagnostics',
    'Engine Diagnostic': 'engine-diagnostics',
    'Battery Replacement': 'battery-replacement',
    'Transmission Service': 'transmission-service',
    'Air Filter Replacement': 'air-filter',
    'Cooling System Service': 'coolant-flush',
    'Cooling System': 'coolant-flush',
    'Exhaust System Repair': 'exhaust-pipe-repair',
    'Electrical System Repair': 'electrical-diagnostics',
    'Tire Service': 'tire-mounting-balancing',
    'Diagnostics': 'engine-diagnostics',
    'Full Service': 'fleet-maintenance',
    'Luxury Vehicle Care': 'full-detail',
    'Detailing': 'full-detail',
    'Engine Repair': 'engine-repair'
  };

  return serviceNames.map(name => nameToIdMap[name] || name.toLowerCase().replace(/\s+/g, '-'));
};

// Specializations that providers can select
export const SPECIALIZATIONS = [
  'European Vehicles',
  'Luxury Cars', 
  'Diesel Engines',
  'Hybrid/Electric',
  'Fleet Services',
  'Emergency Roadside',
  'Performance Tuning',
  'Classic Cars',
  'Heavy Duty/Commercial',
  'Motorcycle Service',
  'Import Specialist',
  'Domestic Specialist'
] as const;

export type Specialization = typeof SPECIALIZATIONS[number];