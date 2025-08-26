import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MapPin, 
  Navigation, 
  Target,
  Settings,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Location } from '@/types';
import { Label } from '@/components/ui/label';

interface EnhancedSearchBarProps {
  onSearch: (query: string, location: Location | null, radius: number) => void;
  placeholder?: string;
  className?: string;
}

const EnhancedSearchBar: React.FC<EnhancedSearchBarProps> = ({ 
  onSearch, 
  placeholder = "Search places, food, traditions...",
  className = ''
}) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [searchRadius, setSearchRadius] = useState(10);
  const [isLocationActive, setIsLocationActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

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
      setIsLocationActive(true);
      
      toast({
        title: "Location captured",
        description: "Your current location has been set for search.",
      });
    } catch (error) {
      toast({
        title: "Location error",
        description: "Failed to get current location. Please check permissions.",
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
      return data.display_name || '';
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
      return '';
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim() && !isLocationActive) {
      toast({
        title: "Search query required",
        description: "Please enter a search term or activate location search.",
        variant: "destructive"
      });
      return;
    }

    onSearch(searchQuery.trim(), isLocationActive ? currentLocation : null, searchRadius);
  };

  const clearLocation = () => {
    setCurrentLocation(null);
    setIsLocationActive(false);
    toast({
      title: "Location cleared",
      description: "Location-based search has been disabled.",
    });
  };

  const handleRadiusChange = (value: number[]) => {
    const newRadius = value[0];
    setSearchRadius(newRadius);
    
    if (isLocationActive) {
      toast({
        title: "Search radius updated",
        description: `Search radius changed to ${newRadius} km.`,
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Card className={`w-full ${className}`}>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Main Search Bar */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 pr-4"
              />
            </div>
            
            <Button
              onClick={handleSearch}
              className="px-6"
              disabled={!searchQuery.trim() && !isLocationActive}
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          {/* Location Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Near Me Button */}
            <Button
              variant={isLocationActive ? "default" : "outline"}
              size="sm"
              onClick={getCurrentLocation}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <Target className="h-4 w-4" />
              {isLoading ? "Getting Location..." : "Near Me"}
            </Button>

            {/* Location Status Badge */}
            {isLocationActive && currentLocation && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                Active
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearLocation}
                  className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )}

            {/* Advanced Options Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
              className="ml-auto"
            >
              <Settings className="h-4 w-4 mr-1" />
              {showAdvancedOptions ? "Hide" : "Show"} Options
            </Button>
          </div>

          {/* Advanced Options */}
          {showAdvancedOptions && (
            <div className="border-t pt-4 space-y-4">
              {/* Search Radius Control */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Navigation className="h-4 w-4" />
                    Search Radius: {searchRadius} km
                  </Label>
                  {isLocationActive && (
                    <Badge variant="outline" className="text-xs">
                      {currentLocation?.address?.split(',')[0] || 'Current Location'}
                    </Badge>
                  )}
                </div>
                
                <Slider
                  value={[searchRadius]}
                  onValueChange={handleRadiusChange}
                  max={100}
                  min={1}
                  step={1}
                  className="w-full"
                  disabled={!isLocationActive}
                />
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 km</span>
                  <span>25 km</span>
                  <span>50 km</span>
                  <span>100 km</span>
                </div>
              </div>

              {/* Location Info */}
              {isLocationActive && currentLocation && (
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Navigation className="h-4 w-4" />
                    <span>Search Center</span>
                  </div>
                  <div className="text-xs space-y-1">
                    <div><strong>Address:</strong> {currentLocation.address}</div>
                    <div><strong>Coordinates:</strong> {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}</div>
                    <div><strong>Radius:</strong> {searchRadius} km</div>
                  </div>
                </div>
              )}

              {/* Help Text */}
              <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                <p className="font-medium mb-1">How to use:</p>
                <ul className="space-y-1">
                  <li>• Click "Near Me" to search around your current location</li>
                  <li>• Adjust the radius slider to control search area size</li>
                  <li>• Combine location search with keywords for better results</li>
                  <li>• Location search works best when combined with search terms</li>
                </ul>
              </div>
            </div>
          )}

          {/* Quick Search Suggestions */}
          {!searchQuery.trim() && (
            <div className="flex gap-2 flex-wrap">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("temples")}
                className="text-xs"
              >
                Temples
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("restaurants")}
                className="text-xs"
              >
                Restaurants
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("festivals")}
                className="text-xs"
              >
                Festivals
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("trekking")}
                className="text-xs"
              >
                Trekking
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedSearchBar;
