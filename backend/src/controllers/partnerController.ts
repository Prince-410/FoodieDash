import { Request, Response } from 'express';
import { getNearbyPartners } from '../services/partnerService';

/**
 * GET /api/delivery-partners
 * Query params: lat, lng, maxDistance (optional)
 */
export async function getDeliveryPartners(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const lat = parseFloat(req.query.lat as string);
    const lng = parseFloat(req.query.lng as string);
    const maxDistance = req.query.maxDistance
      ? parseFloat(req.query.maxDistance as string)
      : 15;

    if (isNaN(lat) || isNaN(lng)) {
      res.status(400).json({
        success: false,
        message: 'Valid lat and lng query parameters are required',
      });
      return;
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      res.status(400).json({
        success: false,
        message: 'Coordinates out of range. lat: [-90, 90], lng: [-180, 180]',
      });
      return;
    }

    const partners = await getNearbyPartners({ lat, lng }, maxDistance);

    res.status(200).json({
      success: true,
      count: partners.length,
      data: partners,
      meta: {
        userLocation: { lat, lng },
        maxDistance,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error fetching delivery partners:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}
