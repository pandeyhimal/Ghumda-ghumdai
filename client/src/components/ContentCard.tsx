import { MapPin, Star, Heart, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useContent } from "@/contexts/ContentContext";
import { Link } from "react-router-dom";

interface ContentCardProps {
  id: string;
  title: string;
  description: string;
  category: "places" | "food" | "traditions";
  province: string;
  district: string;
  municipality: string;
  image: string;
  rating: number;
  reviewCount: number;
  isBookmarked?: boolean;
}

const categoryColors = {
  places: "bg-primary text-primary-foreground",
  food: "bg-secondary text-secondary-foreground", 
  traditions: "bg-accent text-accent-foreground"
};

const categoryLabels = {
  places: "Places",
  food: "Food", 
  traditions: "Traditions"
};

export const ContentCard = ({ 
  id, title, description, category, province, district, municipality, 
  image, rating, reviewCount 
}: ContentCardProps) => {
  const { t } = useLanguage();
  const { bookmarks, toggleBookmark } = useContent();
  
  const isBookmarked = bookmarks.includes(id);
  
  return (
    <Link to={`/content/${id}`}>
      <Card className="group overflow-hidden hover:shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge className={categoryColors[category]}>
            {categoryLabels[category]}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 text-gray-500 bg-background/80 backdrop-blur-sm hover:text-gray-500"
            onClick={async (e) => {
              e.stopPropagation();
              e.preventDefault();
              await toggleBookmark(id);
            }}
          >
            <Heart className={`h-4 w-4 ${isBookmarked ? 'fill-current text-red-500' : ''}`} />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-1" />
        {province}  {municipality}, {district}
        </div>
        
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{title}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-current text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-sm text-muted-foreground">({reviewCount})</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MessageCircle className="h-4 w-4 mr-1" />
            {reviewCount} {t('content.reviews')}
          </div>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
};