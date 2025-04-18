// /utils/geocode.ts (oluşturmanı öneririm)
export const getCoordinatesFromLocation = async (
  location: string
): Promise<{ lat: number; lng: number } | null> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        location
      )}&format=json&limit=1`,
      {
        headers: {
          "User-Agent": "YourAppName/1.0 (your@email.com)", // Zorunlu olabilir!
        },
      }
    );
    const data = await response.json();
    if (data.length === 0) return null;
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  } catch (err) {
    console.error("Geocoding error:", err);
    return null;
  }
};
