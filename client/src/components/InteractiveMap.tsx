import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet';
import { Icon, LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Navigation, Globe, Search, MousePointer, X, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Location } from '@/types';

// Fix for default markers in Leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface InteractiveMapProps {
  value: Location | null;
  onChange: (location: Location | null) => void;
  searchResults?: Array<{
    lat: number;
    lng: number;
    address: string;
    displayName: string;
  }>;
  onLocationSelect?: (location: Location) => void;
  className?: string;
  compact?: boolean;
  searchCenter?: { lat: number; lng: number }; // New prop for search center
  autoCenterOnSearch?: boolean; // New prop to control auto-centering
}

// Component to handle map click events
const MapClickHandler: React.FC<{
  onMapClick: (lat: number, lng: number) => void;
  selectedLocation: Location | null;
}> = ({ onMapClick, selectedLocation }) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onMapClick(lat, lng);
    },
  });
  return null;
};

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  value,
  onChange,
  searchResults = [],
  onLocationSelect,
  className = '',
  compact = false,
  searchCenter,
  autoCenterOnSearch = true
}) => {
  const { toast } = useToast();
  const mapRef = useRef<any>(null);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(value);
  const [isLoading, setIsLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([27.7172, 85.3240]); // Kathmandu default
  const [zoom, setZoom] = useState(13);

  useEffect(() => {
    if (value) {
      setCurrentLocation(value);
      setMapCenter([value.lat, value.lng]);
    }
  }, [value]);

  // Auto-center map when search results appear
  useEffect(() => {
    if (autoCenterOnSearch && searchResults.length > 0) {
      let newCenter: [number, number];
      let newZoom = 14;
      
      if (searchCenter) {
        // Use provided search center
        newCenter = [searchCenter.lat, searchCenter.lng];
      } else {
        // Calculate center from search results
        const centerLat = searchResults.reduce((sum, result) => sum + result.lat, 0) / searchResults.length;
        const centerLng = searchResults.reduce((sum, result) => sum + result.lng, 0) / searchResults.length;
        newCenter = [centerLat, centerLng];
      }
      
      setMapCenter(newCenter);
      setZoom(newZoom);
      
      // Update map view if map reference exists
      if (mapRef.current) {
        // Small delay to ensure map is properly initialized
        setTimeout(() => {
          if (mapRef.current) {
            mapRef.current.setView(newCenter, newZoom);
          }
        }, 100);
      }
    }
  }, [searchResults, searchCenter, autoCenterOnSearch]);

  // Handle map reference availability
  useEffect(() => {
    if (mapRef.current && searchResults.length > 0 && autoCenterOnSearch) {
      const newCenter = searchCenter ? [searchCenter.lat, searchCenter.lng] : mapCenter;
      mapRef.current.setView(newCenter, 14);
    }
  }, [mapRef.current, searchResults.length, searchCenter, autoCenterOnSearch]);

  // Get current location and center map
  const getCurrentLocation = async () => {
    setIsLoading(true);
    try {
      if (!navigator.geolocation) {
        toast({
          title: "Geolocation not supported",
          description: "Your browser doesn't support geolocation.",
          variant: "destructive"
        });
        return;
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        });
      });

      const { latitude, longitude } = position.coords;
      
      // Get address from coordinates using reverse geocoding
      const address = await getAddressFromCoordinates(latitude, longitude);
      
      const newLocation: Location = {
        lat: latitude,
        lng: longitude,
        address: address || `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`
      };

      setCurrentLocation(newLocation);
      onChange(newLocation);
      setMapCenter([latitude, longitude]);
      setZoom(15);
      
      toast({
        title: "Location updated",
        description: "Current location coordinates captured successfully.",
      });
    } catch (error) {
      toast({
        title: "Location error",
        description: "Failed to get current location. Please check permissions or enter manually.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getAddressFromCoordinates = async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      
      if (data.display_name) {
        return data.display_name;
      }
      return '';
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
      return '';
    }
  };

  // Handle map click to select new location
  const handleMapClick = async (lat: number, lng: number) => {
    try {
      // Get address from coordinates using reverse geocoding
      const address = await getAddressFromCoordinates(lat, lng);
      
      const newLocation: Location = {
        lat: lat,
        lng: lng,
        address: address || `Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`
      };

      setCurrentLocation(newLocation);
      onChange(newLocation);
      
      toast({
        title: "Location selected",
        description: "New location coordinates captured from map click.",
      });
    } catch (error) {
      toast({
        title: "Location update failed",
        description: "Failed to get address for selected location.",
        variant: "destructive"
      });
    }
  };

  // Handle location selection from search results
  const handleSearchResultSelect = (result: typeof searchResults[0]) => {
    const newLocation: Location = {
      lat: result.lat,
      lng: result.lng,
      address: result.address
    };
    
    setCurrentLocation(newLocation);
    onChange(newLocation);
    setMapCenter([result.lat, result.lng]);
    setZoom(16);
    
    if (onLocationSelect) {
      onLocationSelect(newLocation);
    }
    
    toast({
      title: "Location selected",
      description: "Location updated from search results.",
    });
  };

  // Map controls
  const zoomIn = () => {
    if (mapRef.current) {
      mapRef.current.setZoom(zoom + 1);
      setZoom(zoom + 1);
    }
  };

  const zoomOut = () => {
    if (mapRef.current) {
      mapRef.current.setZoom(zoom - 1);
      setZoom(zoom - 1);
    }
  };

  const resetView = () => {
    if (mapRef.current && currentLocation) {
      mapRef.current.setView([currentLocation.lat, currentLocation.lng], 15);
      setMapCenter([currentLocation.lat, currentLocation.lng]);
      setZoom(15);
    }
  };

  const clearLocation = () => {
    setCurrentLocation(null);
    onChange(null);
    toast({
      title: "Location cleared",
      description: "Location has been cleared.",
    });
  };

  return (
    <Card className={className}>
      {!compact && (
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Interactive Map Selection
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={compact ? "space-y-3" : "space-y-4"}>
        {/* Map Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={getCurrentLocation}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Navigation className="h-4 w-4" />
            {isLoading ? "Getting Location..." : "Current Location"}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={zoomIn}
            className="flex items-center gap-2"
          >
            <ZoomIn className="h-4 w-4" />
            Zoom In
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={zoomOut}
            className="flex items-center gap-2"
          >
            <ZoomOut className="h-4 w-4" />
            Zoom Out
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={resetView}
            disabled={!currentLocation}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset View
          </Button>
          
          {currentLocation && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearLocation}
              className="flex items-center gap-2 text-red-600 hover:text-red-700"
            >
              <X className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>

        {/* Interactive Map */}
        <div className="relative">
                      <MapContainer
              ref={mapRef}
              center={mapCenter}
              zoom={zoom}
              style={{ height: compact ? '300px' : '400px', width: '100%' }}
              className="rounded-lg border-2 border-primary/20"
            >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Map click handler */}
            <MapClickHandler 
              onMapClick={handleMapClick}
              selectedLocation={currentLocation}
            />
            
            {/* Current selected location marker */}
            {currentLocation && (
              <Marker 
                position={[currentLocation.lat, currentLocation.lng]}
                icon={new Icon({
                  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-red.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                })}
              >
                <Popup>
                  <div className="text-center">
                    <div className="font-bold text-sm mb-2">Selected Location</div>
                    <div className="text-xs text-gray-600 mb-2">
                      {currentLocation.address}
                    </div>
                    <div className="text-xs text-gray-500">
                      Lat: {currentLocation.lat.toFixed(6)}<br/>
                      Lng: {currentLocation.lng.toFixed(6)}
                    </div>
                  </div>
                </Popup>
              </Marker>
            )}
            
            {/* Search result markers */}
            {searchResults.map((result, index) => (
              <Marker
                key={index}
                position={[result.lat, result.lng]}
                icon={new Icon({
                  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-blue.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                })}
                eventHandlers={{
                  click: () => handleSearchResultSelect(result)
                }}
              >
                <Popup>
                  <div className="text-center">
                    <div className="font-bold text-sm mb-2">Search Result {index + 1}</div>
                    <div className="text-xs text-gray-600 mb-2">
                      {result.displayName}
                    </div>
                    <div className="text-xs text-gray-500">
                      Lat: {result.lat.toFixed(6)}<br/>
                      Lng: {result.lng.toFixed(6)}
                    </div>
                    <Button
                      size="sm"
                      className="mt-2 w-full"
                      onClick={() => handleSearchResultSelect(result)}
                    >
                      Select This Location
                    </Button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          
          {/* Map Instructions Overlay */}
          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm p-2 rounded-lg border shadow-sm">
            <div className="text-xs text-gray-700">
              <div className="font-semibold mb-1">Map Instructions:</div>
              <div>• Click anywhere on map to select location</div>
              <div>• Drag to move around</div>
              <div>• Scroll to zoom in/out</div>
              <div>• Use controls above for quick actions</div>
            </div>
          </div>
        </div>

        {/* Location Information */}
        {currentLocation && (
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <MapPin className="h-4 w-4" />
              <span>Selected Location</span>
            </div>
            <div className="text-xs space-y-1">
              <div><strong>Address:</strong> {currentLocation.address}</div>
              <div><strong>Coordinates:</strong> {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}</div>
            </div>
          </div>
        )}

        {/* Help Text */}
        {/* <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
          <p className="font-medium mb-1">How to use the interactive map:</p>
          <ul className="space-y-1">
            <li>• <strong>Click anywhere</strong> on the map to select a new location</li>
            <li>• <strong>Drag the map</strong> to explore different areas</li>
            <li>• <strong>Scroll or use zoom buttons</strong> to zoom in/out for precise selection</li>
            <li>• <strong>Use "Current Location"</strong> to get your GPS coordinates</li>
            <li>• <strong>Click on search result markers</strong> to select from search results</li>
            <li>• <strong>Use "Reset View"</strong> to center on selected location</li>
          </ul>
        </div> */}
      </CardContent>
    </Card>
  );
};

export default InteractiveMap;
