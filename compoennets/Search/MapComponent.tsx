"use client";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapComponentProps } from "@/types/business-finder";

// Varsayılan ikon ayarları
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png",
});

const businessIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapComponent = ({ center, radius }: MapComponentProps) => {
  // Merkez koordinatlarını kontrol et
  if (!center || isNaN(center.lat) || isNaN(center.lng)) {
    return <div>Geçerli konum bilgisi yok</div>;
  }

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
      className="z-0"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker position={[center.lat, center.lng]}>
        <Popup>Arama Merkezi</Popup>
      </Marker>

      <Circle
        center={[center.lat, center.lng]}
        radius={radius * 1000}
        pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 0.2 }}
      />
    </MapContainer>
  );
};

export default MapComponent;
