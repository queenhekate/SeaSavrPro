import L from 'leaflet';

// Custom marker icon for the map
export const customMarkerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Helper to validate coordinates
export function validateCoordinates(lat: number, lng: number): boolean {
  return (
    !isNaN(lat) && 
    !isNaN(lng) && 
    lat >= -90 && 
    lat <= 90 && 
    lng >= -180 && 
    lng <= 180
  );
}

// Format coordinates for display
export function formatCoordinates(lat: number, lng: number): string {
  return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
}
