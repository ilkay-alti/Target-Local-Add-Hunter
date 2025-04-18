import React from "react";

interface BusinessCardProps {
  business: {
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    hours?: {
      display: string;
      open_now: boolean;
      regular: Array<{
        day: number;
        open: string;
        close: string;
      }>;
    };
    photos: Array<{
      url: string;
    }>;
    categories: Array<{
      name: string;
    }>;
    distance: number;
    rating?: number;
    isOpen?: boolean;
  };
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  const photos = business.photos || [];
  const categories = business.categories || [];
  const regularHours = business.hours?.regular || [];

  return (
    <div className="w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300  hover:shadow-xl hover:z-10 hover:relative">
      {/* İşletme Fotoğrafı */}
      {photos.length > 0 && (
        <div className="business-image">
          <img
            src={photos[0].url}
            alt={business.name}
            className="w-full h-48 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/300x200?text=No+Image";
            }}
          />
        </div>
      )}

      {/* İşletme Bilgileri */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {business.name}
        </h3>

        {/* Kategoriler */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.map((cat, index) => (
              <span
                key={index}
                className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full"
              >
                {cat.name}
              </span>
            ))}
          </div>
        )}

        {/* Mesafe - Hover durumunda görünür */}
        <div className=" ">
          <p className="text-gray-600 text-sm mb-2 h-0 opacity-0 transition-all duration-300 hover:h-auto hover:opacity-100 hover:mb-2">
            📍 {Math.round(business.distance)} metre uzakta
          </p>
        </div>

        {/* Rating */}
        {business.rating && (
          <div className="flex items-center mb-2">
            <span className="text-yellow-500">⭐</span>
            <span className="ml-1 text-gray-700 font-medium">
              {business.rating.toFixed(1)}
            </span>
          </div>
        )}

        {/* Açık/Kapalı Durumu */}
        {business.isOpen !== undefined && (
          <p
            className={`text-sm font-semibold mb-3 ${
              business.isOpen ? "text-green-600" : "text-red-600"
            }`}
          >
            {business.isOpen ? "Açık" : "Kapalı"}
          </p>
        )}

        {/* Çalışma Saatleri */}
        {business.hours && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-1">
              Çalışma Saatleri:
            </h4>
            {business.hours.display ? (
              <p className="text-gray-600 text-sm">{business.hours.display}</p>
            ) : (
              <ul className="text-gray-600 text-sm space-y-1">
                {regularHours.map((day, index) => (
                  <li key={index}>
                    {day.day}: {day.open} - {day.close}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* İletişim Bilgileri - Hover durumunda görünür */}
        <div className="">
          <h4 className="text-sm font-semibold text-gray-800 mb-2">
            İletişim:
          </h4>
          <p className="text-gray-600 text-sm mb-1">📍 {business.address}</p>
          {business.phone && (
            <p className="text-gray-600 text-sm mb-1">📞 {business.phone}</p>
          )}
          {business.email && (
            <p className="text-gray-600 text-sm mb-1">✉️ {business.email}</p>
          )}
          {business.website && (
            <p className="text-gray-600 text-sm">
              🌐{" "}
              <a
                href={business.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Web Sitesi
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
