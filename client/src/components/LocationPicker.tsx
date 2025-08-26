import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Navigation, Globe, Search, MousePointer, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Location } from '@/types';
import InteractiveMap from './InteractiveMap';

interface LocationPickerProps {
  value: Location | null;
  onChange: (location: Location | null) => void;
  required?: boolean;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ value, onChange, required = false }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [searchAddress, setSearchAddress] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{
    lat: number;
    lng: number;
    address: string;
    displayName: string;
  }>>([]);
  const [tempLocation, setTempLocation] = useState<Location>({
    lat: value?.lat || 0,
    lng: value?.lng || 0,
    address: value?.address || ''
  });
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchCenter, setSearchCenter] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (value) {
      setTempLocation(value);
    }
  }, [value]);

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

      setTempLocation(newLocation);
      onChange(newLocation);
      
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

  const searchAddressCoordinates = async () => {
    if (!searchAddress.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchAddress)}&limit=5&addressdetails=1`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        const results = data.map((result: any) => ({
          lat: parseFloat(result.lat),
          lng: parseFloat(result.lon),
          address: result.display_name,
          displayName: result.display_name.split(',').slice(0, 3).join(',') // Show first 3 parts for cleaner display
        }));
        
        setSearchResults(results);
        setShowSearchResults(true);
        
        // Calculate search center for map centering
        const centerLat = results.reduce((sum, result) => sum + result.lat, 0) / results.length;
        const centerLng = results.reduce((sum, result) => sum + result.lng, 0) / results.length;
        setSearchCenter({ lat: centerLat, lng: centerLng });
        
        // Set the first result as default
        const firstResult = results[0];
        const newLocation: Location = {
          lat: firstResult.lat,
          lng: firstResult.lng,
          address: firstResult.address
        };
        
        setTempLocation(newLocation);
        onChange(newLocation);
        
        toast({
          title: "Addresses found",
          description: `${results.length} location(s) found. Select one from the map below.`,
        });
      } else {
        toast({
          title: "Address not found",
          description: "Could not find coordinates for this address. Please try a different search term.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Failed to search for address. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCoordinateChange = (field: 'lat' | 'lng', value: string) => {
    const numValue = parseFloat(value) || 0;
    const newLocation = { ...tempLocation, [field]: numValue };
    setTempLocation(newLocation);
    
    // Only update if both coordinates are valid
    if (newLocation.lat !== 0 && newLocation.lng !== 0) {
      onChange(newLocation);
    }
  };

  const handleAddressChange = (address: string) => {
    const newLocation = { ...tempLocation, address };
    setTempLocation(newLocation);
    onChange(newLocation);
  };

  const clearLocation = () => {
    setTempLocation({ lat: 0, lng: 0, address: '' });
    onChange(null);
    setSearchResults([]);
    setShowSearchResults(false);
    setSearchAddress('');
    setSearchCenter(null);
  };

  const handleMapClick = (lat: number, lng: number) => {
    const newLocation = { ...tempLocation, lat, lng };
    setTempLocation(newLocation);
    onChange(newLocation);
    
    // Get address for the new coordinates
    getAddressFromCoordinates(lat, lng).then(address => {
      if (address) {
        const locationWithAddress = { ...newLocation, address };
        setTempLocation(locationWithAddress);
        onChange(locationWithAddress);
      }
    });
  };

  const selectLocationFromSearch = (selectedResult: typeof searchResults[0]) => {
    const newLocation: Location = {
      lat: selectedResult.lat,
      lng: selectedResult.lng,
      address: selectedResult.address
    };
    
    setTempLocation(newLocation);
    onChange(newLocation);
    setShowSearchResults(false);
    setSearchAddress('');
    setSearchCenter(null);
    
    toast({
      title: "Location selected",
      description: "Location updated from search results.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Location Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Location Controls */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Navigation className="h-4 w-4 text-muted-foreground" />
            <Label className="text-sm font-medium">Get Current Location</Label>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={getCurrentLocation}
            disabled={isLoading}
            className="w-full flex items-center gap-2 h-11 border-primary/30 hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            <Navigation className="h-4 w-4 mr-2" />
            {isLoading ? "Getting Location..." : "Use Current GPS Location"}
          </Button>
        </div>

        {/* Address Search */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="address-search" className="text-sm font-medium">
              Search by Address
            </Label>
          </div>
          <div className="flex gap-2">
            <Input
              id="address-search"
              placeholder="Enter address, city, or landmark..."
              value={searchAddress}
              onChange={(e) => {
                setSearchAddress(e.target.value);
                // Clear previous search results when typing
                if (showSearchResults) {
                  setShowSearchResults(false);
                  setSearchResults([]);
                }
              }}
              onKeyDown={(e) => e.key === 'Enter' && searchAddressCoordinates()}
              className="flex-1 border-border focus:border-primary focus:ring-primary/20"
            />
            <Button
              type="button"
              variant="secondary"
              onClick={searchAddressCoordinates}
              disabled={isLoading || !searchAddress.trim()}
              className="px-4 hover:bg-primary/90 transition-colors"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Search Results with Interactive Map */}
        {showSearchResults && searchResults.length > 0 && (
          <div className="space-y-4">
            {/* Search Results Header */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-primary" />
                  <Label className="text-sm font-semibold text-primary">
                    Found {searchResults.length} Location{searchResults.length > 1 ? 's' : ''}
                  </Label>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchAddress('');
                      setShowSearchResults(false);
                      setSearchResults([]);
                      setSearchCenter(null);
                    }}
                    className="h-7 px-3 text-xs border-primary/30 hover:border-primary/50"
                  >
                    New Search
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowSearchResults(false);
                      setSearchCenter(null);
                    }}
                    className="h-7 w-7 p-0 hover:bg-primary/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Results List - Compact Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                      tempLocation.lat === result.lat && tempLocation.lng === result.lng
                        ? 'border-primary bg-primary/10 shadow-lg'
                        : 'border-border hover:border-primary/30 hover:bg-primary/5'
                    }`}
                    onClick={() => selectLocationFromSearch(result)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-foreground truncate">
                          {result.displayName}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 font-mono">
                          {result.lat.toFixed(6)}, {result.lng.toFixed(6)}
                        </div>
                      </div>
                      {tempLocation.lat === result.lat && tempLocation.lng === result.lng && (
                        <div className="ml-2 flex-shrink-0">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Map Section */}
            <div className="bg-white border border-border rounded-lg overflow-hidden shadow-sm">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-blue-600" />
                  <Label className="text-sm font-medium text-blue-900">
                    Interactive Map - Click anywhere to modify location
                  </Label>
                </div>
              </div>
              
              <div className="p-4">
                <InteractiveMap
                  value={tempLocation}
                  onChange={(location) => {
                    setTempLocation(location || { lat: 0, lng: 0, address: '' });
                    onChange(location);
                    if (location) {
                      setSearchCenter(null);
                    }
                  }}
                  searchResults={searchResults}
                  onLocationSelect={(location) => {
                    setTempLocation(location);
                    onChange(location);
                    setShowSearchResults(false);
                    setSearchResults([]);
                    setSearchCenter(null);
                  }}
                  searchCenter={searchCenter}
                  autoCenterOnSearch={true}
                  className="border-0 shadow-none"
                  compact={true}
                />
              </div>
              
              {/* Map Instructions */}
              <div className="bg-muted/30 px-4 py-3 border-t border-border">
                <div className="text-xs text-muted-foreground text-center">
                  <span className="font-medium">💡 Tip:</span> Click on any location marker to select it, or click anywhere else on the map to choose a different location
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Coordinates Input */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <Label className="text-sm font-medium">Manual Coordinates</Label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude" className="text-xs text-muted-foreground">
                Latitude
              </Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                placeholder="27.7172"
                value={tempLocation.lat || ''}
                onChange={(e) => handleCoordinateChange('lat', e.target.value)}
                required={required}
                className="border-border focus:border-primary focus:ring-primary/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude" className="text-xs text-muted-foreground">
                Longitude
              </Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                placeholder="85.3240"
                value={tempLocation.lng || ''}
                onChange={(e) => handleCoordinateChange('lng', e.target.value)}
                required={required}
                className="border-border focus:border-primary focus:ring-primary/20"
              />
            </div>
          </div>
        </div>

        {/* Address Display/Input */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="address" className="text-sm font-medium">Full Address</Label>
          </div>
          <Input
            id="address"
            placeholder="Enter or update the full address..."
            value={tempLocation.address}
            onChange={(e) => handleAddressChange(e.target.value)}
            required={required}
            className="border-border focus:border-primary focus:ring-primary/20"
          />
        </div>





        {/* Location Preview */}
        {tempLocation.lat !== 0 && tempLocation.lng !== 0 && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-green-800 mb-3">
              <Globe className="h-4 w-4 text-green-600" />
              <span className="font-medium">Location Selected</span>
            </div>
            <div className="text-xs space-y-2 text-green-700">
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                <span><strong>Coordinates:</strong> {tempLocation.lat.toFixed(6)}, {tempLocation.lng.toFixed(6)}</span>
              </div>
              <div className="flex items-start gap-2">
                <Globe className="h-3 w-3 mt-0.5 flex-shrink-0" />
                <span><strong>Address:</strong> {tempLocation.address || 'No address provided'}</span>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchAddress(tempLocation.address);
                  setShowSearchResults(false);
                  setSearchResults([]);
                }}
                className="text-xs border-green-300 hover:border-green-400 hover:bg-green-50"
              >
                Modify Location
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearLocation}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs"
              >
                Clear Location
              </Button>
            </div>
          </div>
        )}

        {/* Help Text */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="h-4 w-4 text-blue-600" />
            <Label className="text-sm font-medium text-blue-900">How to Use Location Picker</Label>
          </div>
          <div className="text-xs text-blue-800 space-y-1">
            <p>• <strong>Current Location:</strong> Automatically capture your GPS coordinates</p>
            <p>• <strong>Address Search:</strong> Find multiple location options with interactive map</p>
            <p>• <strong>Interactive Map:</strong> Click anywhere to select new locations dynamically</p>
            <p>• <strong>Map Navigation:</strong> Drag, zoom, and explore for precise selection</p>
            <p>• <strong>Result Selection:</strong> Click on cards or map markers to choose locations</p>
            <p>• <strong>Manual Input:</strong> Enter coordinates manually for precise control</p>
            <p>• <strong>Location Management:</strong> Modify, update, or clear selected locations</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationPicker;
