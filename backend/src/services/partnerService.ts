import DeliveryPartner, { IDeliveryPartner } from '../models/DeliveryPartner';

interface UserLocation {
  lat: number;
  lng: number;
}

export interface EnrichedPartner {
  id: string;
  name: string;
  distance: number;
  price: number;
  estimatedTime: number;
  rating: number;
  availability: boolean;
  vehicleType: string;
  avatar: string;
  totalDeliveries: number;
  baseLocation: { lat: number; lng: number };
  score: number;
}

/**
 * Haversine formula — calculates the great-circle distance
 * between two points on a sphere given their lat/lng in degrees.
 */
function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(2));
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

/** Speed factors by vehicle type (km/h) */
const VEHICLE_SPEEDS: Record<string, number> = {
  bicycle: 12,
  scooter: 22,
  motorcycle: 30,
  car: 35,
};

/**
 * Fetches all active delivery partners, calculates distance/price/ETA,
 * applies weighted scoring, and returns sorted results.
 */
export async function getNearbyPartners(
  userLocation: UserLocation,
  maxDistanceKm: number = 15
): Promise<EnrichedPartner[]> {
  const partners: IDeliveryPartner[] = await DeliveryPartner.find({});

  const enriched: EnrichedPartner[] = partners.map((partner) => {
    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      partner.baseLocation.lat,
      partner.baseLocation.lng
    );

    const price = parseFloat((distance * partner.pricePerKm).toFixed(2));
    const speed = VEHICLE_SPEEDS[partner.vehicleType] || 25;
    const estimatedTime = Math.max(Math.round((distance / speed) * 60), 5); // min 5 min

    // Weighted scoring: distance × 0.6  +  price × 0.4
    const score = parseFloat((distance * 0.6 + price * 0.4).toFixed(2));

    return {
      id: partner._id.toString(),
      name: partner.name,
      distance,
      price,
      estimatedTime,
      rating: partner.rating,
      availability: partner.isActive,
      vehicleType: partner.vehicleType,
      avatar: partner.avatar,
      totalDeliveries: partner.totalDeliveries,
      baseLocation: partner.baseLocation,
      score,
    };
  });

  return enriched
    .filter((p) => p.distance <= maxDistanceKm)
    .sort((a, b) => a.score - b.score);
}
