import { Search, MapPin, Filter, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useContent } from "@/contexts/ContentContext";
import { useState } from "react";
import {
  getAllProvinces,
  getAllDistricts,
  getDistrictsByProvince,
  getLocalLevelsByDistrict
} from "@/data/nepalAdministrativeDivision";
import EnhancedSearchBar from "./EnhancedSearchBar";
import { Location } from "@/types";

interface SearchFiltersProps {
  onSearch?: (filters: SearchFilters) => void;
}

interface SearchFilters {
  keyword: string;
  province: string;
  district: string;
  municipality: string;
  category: string;
  location?: Location | null;
  radius?: number;
}

const provinces = ["All Provinces", ...getAllProvinces()];
const categories = ["All Categories", "Places", "Food", "Traditions"];

export const SearchFilters = ({ onSearch }: SearchFiltersProps) => {
  const { t } = useLanguage();
  const { searchContent } = useContent();

  const [filters, setFilters] = useState<SearchFilters>({
    keyword: "",
    province: "",
    district: "",
    municipality: "",
    category: "",
    location: null,
    radius: 10
  });

  const [districtOptions, setDistrictOptions] = useState<string[]>(["All Districts", ...getAllDistricts()]);
  const [municipalityOptions, setMunicipalityOptions] = useState<string[]>(["All Municipalities"]);

  // Province change handler
  const handleProvinceChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      province: value,
      district: "",
      municipality: ""
    }));

    let districts: string[] = [];
    if (value === "All Provinces" || !value) {
      districts = getAllDistricts();
    } else {
      districts = getDistrictsByProvince(value).map(d => d.name);
    }
    setDistrictOptions(["All Districts", ...districts]);
    setMunicipalityOptions(["All Municipalities"]);
  };

  // District change handler
  const handleDistrictChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      district: value,
      municipality: ""
    }));

    if (value === "All Districts" || !value) {
      setMunicipalityOptions(["All Municipalities"]);
    } else {
      // Use selected province and district
      const localLevels = getLocalLevelsByDistrict(filters.province, value);
      const municipalities = localLevels.map(l => l.name);
      setMunicipalityOptions(
        municipalities.length > 0
          ? ["All Municipalities", ...municipalities]
          : ["All Municipalities"]
      );
    }
  };

  const handleMunicipalityChange = (value: string) => {
    setFilters(prev => ({ ...prev, municipality: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFilters(prev => ({ ...prev, category: value }));
  };

  const handleKeywordChange = (value: string) => {
    setFilters(prev => ({ ...prev, keyword: value }));
  };

  const handleSearch = () => {
    const searchFilters = {
      ...filters,
      province: filters.province === "All Provinces" ? "" : filters.province,
      district: filters.district === "All Districts" ? "" : filters.district,
      municipality: filters.municipality === "All Municipalities" ? "" : filters.municipality,
      category: filters.category === "All Categories" ? "" : filters.category.toLowerCase()
    };

    searchContent(searchFilters);
    onSearch?.(searchFilters);
  };

  const handleEnhancedSearch = (query: string, location: Location | null, radius: number) => {
    const searchFilters = {
      ...filters,
      keyword: query,
      location: location,
      radius: radius
    };

    searchContent(searchFilters);
    onSearch?.(searchFilters);
  };

  return (
    <Card className="p-6 shadow-[var(--shadow-card)] bg-card/95 backdrop-blur-sm">
      {/* Enhanced Search Bar */}
      {/* <div className="mb-6">
        <EnhancedSearchBar
          onSearch={handleEnhancedSearch}
          placeholder={t('search.keyword.placeholder')}
        />
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder={t('search.keyword.placeholder')} 
              className="pl-10 border-2 focus:border-primary"
              value={filters.keyword}
              onChange={(e) => handleKeywordChange(e.target.value)}
            />
          </div>
        </div>

        {/* Province Filter */}
        <Select value={filters.province || ""} onValueChange={handleProvinceChange}>
          <SelectTrigger className="border-2 focus:border-primary">
            <Globe className="h-4 w-4 mr-2 text-muted-foreground" /> {/* Province icon */}
            <SelectValue placeholder={t('search.province.placeholder')} />
          </SelectTrigger>
          <SelectContent className="bg-background border shadow-lg">
            {provinces.map((province) => (
              <SelectItem key={province} value={province}>
                {province}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* District Filter */}
        <Select value={filters.district} onValueChange={handleDistrictChange}>
          <SelectTrigger className="border-2 focus:border-primary">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder={t('search.district.placeholder')} />
          </SelectTrigger>
          <SelectContent className="bg-background border shadow-lg">
            {districtOptions.length > 1
              ? districtOptions.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))
              : null}
            {districtOptions.length <= 1 && (
              <div className="px-4 py-2 text-muted-foreground text-sm">No districts available</div>
            )}
          </SelectContent>
        </Select>

        {/* Municipality Filter */}
        <Select value={filters.municipality} onValueChange={handleMunicipalityChange}>
          <SelectTrigger className="border-2 focus:border-primary">
            <SelectValue placeholder={t('search.municipality.placeholder')} />
          </SelectTrigger>
          <SelectContent className="bg-background border shadow-lg">
            {municipalityOptions.length > 1
              ? municipalityOptions.map((municipality) => (
                  <SelectItem key={municipality} value={municipality}>
                    {municipality}
                  </SelectItem>
                ))
              : (
                <SelectItem key="All Municipalities" value="All Municipalities">
                  All Municipalities
                </SelectItem>
              )
            }
          </SelectContent>
        </Select>

        {/* Category Filter */}
        <Select value={filters.category} onValueChange={handleCategoryChange}>
          <SelectTrigger className="border-2 focus:border-primary">
            <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder={t('search.category.placeholder')} />
          </SelectTrigger>
          <SelectContent className="bg-background border shadow-lg">
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex justify-center mt-4">
        <Button 
          onClick={handleSearch}
          className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-[var(--shadow-mountain)] transition-all duration-300"
          size="lg"
        >
          <Search className="h-4 w-4 mr-2" />
          {t('search.button')}
        </Button>
      </div>
    </Card>
  );
};