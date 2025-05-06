import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CircleHelp } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { customMarkerIcon } from '@/lib/mapUtils';
import L from 'leaflet';

interface MapSectionProps {
  onLocationSelect: (lat: number, lng: number) => void;
  selectedCoordinates: { lat: number; lng: number } | null;
}

// Fix for Leaflet marker icon in React
// This needs to be outside the component to run only once
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

// This component handles map events
function MapEventHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  
  return null;
}

export default function MapSection({ onLocationSelect, selectedCoordinates }: MapSectionProps) {
  const [showCoordinatesOverlay, setShowCoordinatesOverlay] = useState(false);
  const [tempCoordinates, setTempCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  const handleMapClick = (lat: number, lng: number) => {
    const roundedLat = parseFloat(lat.toFixed(6));
    const roundedLng = parseFloat(lng.toFixed(6));
    setTempCoordinates({ lat: roundedLat, lng: roundedLng });
    setShowCoordinatesOverlay(true);
  };

  const confirmLocation = () => {
    if (tempCoordinates) {
      onLocationSelect(tempCoordinates.lat, tempCoordinates.lng);
      setShowCoordinatesOverlay(false);
    }
  };

  const cancelLocation = () => {
    setShowCoordinatesOverlay(false);
    setTempCoordinates(null);
  };

  // When coordinates are set manually, center map on them
  useEffect(() => {
    if (selectedCoordinates && mapRef.current) {
      mapRef.current.setView(
        [selectedCoordinates.lat, selectedCoordinates.lng],
        mapRef.current.getZoom()
      );
    }
  }, [selectedCoordinates]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        <span>Select Location</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="ml-2 cursor-help">
                <CircleHelp className="h-4 w-4 text-neutral-400" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs w-[200px]">Click on the map to select the exact location of the pollution incident</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h3>
      
      <div className="map-container rounded-lg overflow-hidden border border-neutral-200 mb-4">
        <MapContainer
          center={[34.052235, -118.243683]}
          zoom={10}
          scrollWheelZoom={true}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapEventHandler onMapClick={handleMapClick} />
          
          {/* Show temporary marker for location being confirmed */}
          {tempCoordinates && !selectedCoordinates && (
            <Marker 
              position={[tempCoordinates.lat, tempCoordinates.lng]} 
              icon={customMarkerIcon}
            />
          )}
          
          {/* Show confirmed marker */}
          {selectedCoordinates && (
            <Marker 
              position={[selectedCoordinates.lat, selectedCoordinates.lng]} 
              icon={customMarkerIcon}
            />
          )}
        </MapContainer>
        
        {/* Map overlay with coordinates */}
        {showCoordinatesOverlay && tempCoordinates && (
          <div className="map-overlay">
            <div className="text-sm">
              <div className="font-medium text-neutral-800 mb-1">Selected Location:</div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="bg-neutral-100 px-2 py-1 rounded">
                  <span className="text-neutral-600">Lat:</span>
                  <span className="font-medium">{tempCoordinates.lat}</span>
                </div>
                <div className="bg-neutral-100 px-2 py-1 rounded">
                  <span className="text-neutral-600">Lng:</span>
                  <span className="font-medium">{tempCoordinates.lng}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button 
                  onClick={confirmLocation}
                  size="sm"
                  className="bg-secondary text-white hover:bg-secondary/90"
                >
                  <i className="fas fa-check mr-1"></i> Confirm Location
                </Button>
                <Button 
                  onClick={cancelLocation}
                  size="sm"
                  variant="outline"
                >
                  <i className="fas fa-times mr-1"></i> Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3 mb-4">
        <div className="flex items-start">
          <i className="fas fa-info-circle text-primary mt-1 mr-2"></i>
          <div>
            <p className="text-sm text-neutral-700">Click anywhere on the map to select the pollution location. A marker will appear at your selected point.</p>
            <p className="text-sm text-neutral-600 mt-1">For the most accurate report, zoom in as much as possible before selecting a location.</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-1">
        <div className="inline-flex items-center bg-neutral-100 text-neutral-700 text-sm py-1 px-3 rounded-full">
          <i className="fas fa-map-marker-alt text-primary mr-1"></i>
          <span>Selected: </span>
          <span className="ml-1 font-medium">
            {selectedCoordinates 
              ? `${selectedCoordinates.lat}, ${selectedCoordinates.lng}` 
              : "No location selected"}
          </span>
        </div>
      </div>
      
      <div className="text-sm text-neutral-500">
        <i className="fas fa-keyboard mr-1"></i> You can also enter coordinates manually in the form below
      </div>
    </div>
  );
}
