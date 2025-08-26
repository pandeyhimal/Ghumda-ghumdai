import { Location } from '@/types';

/**
 * Calculate the distance between two coordinates using the Haversine formula
 * @param lat1 - Latitude of first point
 * @param lon1 - Longitude of first point
 * @param lat2 - Latitude of second point
 * @param lon2 - Longitude of second point
 * @returns Distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance * 100) / 100; // Round to 2 decimal places
}

/**
 * Calculate distance between two Location objects
 * @param location1 - First location
 * @param location2 - Second location
 * @returns Distance in kilometers
 */
export function calculateDistanceBetweenLocations(
  location1: Location,
  location2: Location
): number {
  return calculateDistance(
    location1.lat,
    location1.lng,
    location2.lat,
    location2.lng
  );
}

/**
 * Check if a location is within a specified radius of a center point
 * @param centerLocation - Center location
 * @param targetLocation - Target location to check
 * @param radiusKm - Radius in kilometers
 * @returns True if within radius, false otherwise
 */
export function isLocationWithinRadius(
  centerLocation: Location,
  targetLocation: Location,
  radiusKm: number
): boolean {
  const distance = calculateDistanceBetweenLocations(centerLocation, targetLocation);
  return distance <= radiusKm;
}

/**
 * Filter locations by proximity to a center point
 * @param centerLocation - Center location
 * @param locations - Array of locations to filter
 * @param radiusKm - Radius in kilometers
 * @returns Filtered locations within the radius
 */
export function filterLocationsByRadius(
  centerLocation: Location,
  locations: Location[],
  radiusKm: number
): Location[] {
  return locations.filter(location => 
    isLocationWithinRadius(centerLocation, location, radiusKm)
  );
}

/**
 * Sort locations by distance from a center point
 * @param centerLocation - Center location
 * @param locations - Array of locations to sort
 * @returns Sorted locations (closest first)
 */
export function sortLocationsByDistance(
  centerLocation: Location,
  locations: Location[]
): Location[] {
  return [...locations].sort((a, b) => {
    const distanceA = calculateDistanceBetweenLocations(centerLocation, a);
    const distanceB = calculateDistanceBetweenLocations(centerLocation, b);
    return distanceA - distanceB;
  });
}

/**
 * Convert degrees to radians
 * @param degrees - Degrees to convert
 * @returns Radians
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Validate if coordinates are valid
 * @param lat - Latitude
 * @param lng - Longitude
 * @returns True if valid, false otherwise
 */
export function validateCoordinates(lat: number, lng: number): boolean {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

/**
 * Format coordinates for display
 * @param lat - Latitude
 * @param lng - Longitude
 * @param precision - Decimal places (default: 6)
 * @returns Formatted coordinate string
 */
export function formatCoordinates(
  lat: number,
  lng: number,
  precision: number = 6
): string {
  const latStr = lat.toFixed(precision);
  const lngStr = lng.toFixed(precision);
  return `${latStr}, ${lngStr}`;
}
