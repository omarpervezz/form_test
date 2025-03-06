// Flight types start
interface Airline {
  name: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  origin: string;
  destination: string;
  duration: string;
  stops: string;
}

interface Layover {
  layoverAirport: string;
}

export interface Flight {
  id: number;
  airlines: Airline[];
  price: number;
  originalPrice: number;
  flightType: string;
  refundable: boolean;
  badge: string;
  layoverDetails: Layover[];
}
// Flight types end
// Hotel types start
export interface HotelsType {
  id: number;
  name: string;
  coverImage: string;
  thumbnails: string[];
  starRating: number;
  location: string;
  description: string;
  totalReviews: number;
  userAvatars: string[];
  availability: boolean;
  originalPrice: number;
  discountPrice: number;
  bookNowAction: string;
  facilities: string[];
  roomViews: string[];
  locationRange: string;
  mealOptions: string[];
  houseRules: string[];
}
// Hotel types end

// Package types start
export interface HolidaysPackage {
  id: number;
  name: string;
  coverImage: string;
  thumbnails: string[];
  starRating: number;
  location: string;
  description: string;
  totalReviews: number;
  userAvatars: string[];
  availability: boolean;
  originalPrice: number;
  discountPrice: number;
  bookNowAction: string;
  facilities: string[];
  roomViews: string[];
  locationRange: string;
  mealOptions: string[];
  houseRules: string[];
}
// Package types end

// Car types start
export interface CarTypes {
  id: number;
  name: string;
  coverImage: string;
  thumbnails: string[];
  starRating: number;
  type: string;
  fuelType: string;
  location: string;
  description: string;
  totalReviews: number;
  userAvatars: string[];
  availability: boolean;
  originalPricePerDay: number;
  discountPricePerDay: number;
  bookNowAction: string;
  features: string[];
  seatingCapacity: number;
  pax: number;
  rangePerCharge: string;
  transmission: string;
  houseRules: string[];
}
// Car types end

export interface CurrentTravelers {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
}

export interface ChartData {
  name: string;
  Income: number;
  Expense: number;
  amt: string;
}

export interface RecentHistory {
  issueDate: string;
  bookingDate: string;
  bookingID: string;
  passengerName: string;
  flightDate: string;
  route: string;
  ticketNumber: string;
  pnr: string;
  totalPrice: string;
  status: string;
}

export interface TableType extends Record<string, unknown> {
  id: number;
  issueDate: string;
  bookingDate: string;
  bookingID: string;
  passengerName: string;
  flightDate: string;
  route: string;
  ticketNumber: string;
  totalPrice: string;
  status: string;
  pnr?: string;
  actionPrimaryLabel: string;
}

export interface BookingDataType {
  id: number;
  issueDate: string;
  bookingDate: string;
  bookingID: string;
  passengerName: string;
  flightDate: string;
  route: string;
  ticketNumber: string;
  totalPrice: string;
  status: string;
  actionPrimaryLabel: string;
}
