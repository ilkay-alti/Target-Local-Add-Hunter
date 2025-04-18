export const fetchBusinesses = async (
  location: { lat: number; lng: number },
  radius: number,
  sector?: string
): Promise<any[]> => {
  try {
    const url = new URL("https://api.foursquare.com/v3/places/search");
    url.searchParams.append("ll", `${location.lat},${location.lng}`);
    url.searchParams.append("radius", `${radius * 1000}`); // Kilometreyi metreye çeviriyoruz
    url.searchParams.append("limit", "50");

    if (sector) {
      url.searchParams.append("query", sector); // Sektör sorgusu
    }

    // Tüm gerekli alanları ekliyoruz
    url.searchParams.append(
      "fields",
      "fsq_id,name,location,categories,distance,tel,hours,photos,description,email,website,features,geocodes,popularity,rating,stats,tips,verified"
    );

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${process.env.FOURSQUARE_API_KEY}`, // API anahtarı
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.error(`API error! Status: ${response.status}`);
      return []; // Hata durumunda boş bir dizi döndür
    }

    const data = await response.json();

    if (!data || !data.results) {
      console.error("API response does not contain 'results' array:", data);
      return []; // 'results' yoksa boş bir dizi döndür
    }

    // Veriyi işleyip daha düzenli hale getirebiliriz
    const processedResults = data.results.map((business: any) => ({
      id: business.fsq_id,
      name: business.name,
      address: business.location?.formatted_address || "",
      neighborhood: business.location?.neighborhood?.join(", ") || "",
      phone: business.tel || "",
      email: business.email || "",
      website: business.website || "",
      hours: business.hours || null,
      photos:
        business.photos?.map((photo: any) => ({
          id: photo.id,
          url: `${photo.prefix}original${photo.suffix}`,
          createdAt: photo.created_at,
        })) || [],
      categories:
        business.categories?.map((cat: any) => ({
          id: cat.id,
          name: cat.name,
        })) || [],
      distance: business.distance,
      rating: business.rating,
      popularity: business.popularity,
      isOpen: business.hours?.open_now,
      tips: business.tips || [],
    }));

    return processedResults || [];
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};
