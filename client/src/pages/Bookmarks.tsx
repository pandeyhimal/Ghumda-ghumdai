import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  MapPin, 
  Trash2, 
  Image as ImageIcon, 
  Star, 
  Eye,
  Calendar,
  Filter,
  Grid3X3,
  List,
  Search,
  BookmarkX
} from "lucide-react";
import { useContent } from "@/contexts/ContentContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { Link } from "react-router-dom";


const categoryColors = {
  places: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  food: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  traditions: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
};

export const Bookmarks = () => {
  const { bookmarks, toggleBookmark, content } = useContent();
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get full content details for bookmarked items
  const bookmarkedContent = content.filter(item => bookmarks.includes(item.id));

  // Filter bookmarked content
  const filteredBookmarks = bookmarkedContent.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRemoveBookmark = async (contentId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await toggleBookmark(contentId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
              <Heart className="text-pink-600 dark:text-pink-400 h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                {t("bookmarks.title") || "Your Bookmarked Treasures"}
              </h1>
              <p className="text-muted-foreground mt-1">
                {bookmarks.length} {bookmarks.length === 1 ? 'treasure' : 'treasures'} saved for later exploration
              </p>
            </div>
          </div>
        </div>

        {bookmarks.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="relative mb-6">
              <div className="w-32 h-32 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center">
                <BookmarkX className="h-16 w-16 text-pink-400 dark:text-pink-300" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-200 dark:bg-yellow-800 rounded-full flex items-center justify-center">
                <Heart className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold mb-2 text-foreground">
              {t("bookmarks.empty") || "No bookmarks yet"}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              {t("bookmarks.explore") || "Start exploring Nepal's hidden gems and bookmark your favorite places, foods, and traditions to create your personal collection."}
            </p>
            
            <Link to="/">
              <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                <Search className="h-4 w-4 mr-2" />
                Explore Nepal
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-card rounded-lg border shadow-sm">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search your bookmarks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="all">All Categories</option>
                  <option value="places">Places</option>
                  <option value="food">Food</option>
                  <option value="traditions">Traditions</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex border rounded-md p-1 bg-muted">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-8"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                Showing {filteredBookmarks.length} of {bookmarkedContent.length} bookmarked items
              </p>
            </div>

            {/* Content Grid/List */}
            {filteredBookmarks.length === 0 ? (
              <Card className="p-8 text-center">
                <Search className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
                <p className="text-lg font-medium text-muted-foreground">
                  No bookmarks match your search
                </p>
                <p className="mt-2 text-muted-foreground">
                  Try adjusting your search terms or filters
                </p>
              </Card>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }>
                {filteredBookmarks.map((item) => (
                  <Link key={item.id} to={`/content/${item.id}`}>
                    <Card className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                      viewMode === 'list' ? 'flex items-center p-4' : 'overflow-hidden'
                    }`}>
                      {viewMode === 'grid' ? (
                        <>
                          {/* Image */}
                          <div className="relative overflow-hidden">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                                <ImageIcon className="h-12 w-12 text-muted-foreground" />
                              </div>
                            )}
                            
                            {/* Category Badge */}
                            <div className="absolute top-3 left-3">
                              <Badge className={categoryColors[item.category as keyof typeof categoryColors] || "bg-gray-100 text-gray-800"}>
                                {item.category}
                              </Badge>
                            </div>

                            {/* Remove Button */}
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={(e) => handleRemoveBookmark(item.id, e)}
                              className="absolute top-3 right-3 h-8 w-8 p-0 bg-background/80 backdrop-blur-sm hover:bg-background border border-gray-200 dark:border-gray-700"
                              title="Remove bookmark"
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>

                          {/* Content */}
                          <CardContent className="p-4">
                            <div className="flex items-center text-sm text-muted-foreground mb-2">
                              <MapPin className="h-4 w-4 mr-1" />
                              {item.municipality}, {item.district}
                            </div>
                            
                            <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                              {item.title}
                            </h3>
                            
                            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                              {item.description}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 fill-current text-yellow-400" />
                                <span className="text-sm font-medium">{item.rating}</span>
                                <span className="text-sm text-muted-foreground">({item.reviewCount})</span>
                              </div>
                              
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Eye className="h-4 w-4 mr-1" />
                                <span>View</span>
                              </div>
                            </div>
                          </CardContent>
                        </>
                      ) : (
                        // List View
                        <>
                          {/* Image */}
                          <div className="relative">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.title}
                                className="h-20 w-20 object-cover rounded-lg"
                              />
                            ) : (
                              <div className="h-20 w-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg flex items-center justify-center">
                                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 ml-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                    {item.title}
                                  </h3>
                                  <Badge className={categoryColors[item.category as keyof typeof categoryColors] || "bg-gray-100 text-gray-800"}>
                                    {item.category}
                                  </Badge>
                                </div>
                                
                                <div className="flex items-center text-sm text-muted-foreground mb-2">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {item.municipality}, {item.district}
                                </div>
                                
                                <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
                                  {item.description}
                                </p>
                                
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center space-x-1">
                                    <Star className="h-4 w-4 fill-current text-yellow-400" />
                                    <span className="text-sm font-medium">{item.rating}</span>
                                    <span className="text-sm text-muted-foreground">({item.reviewCount})</span>
                                  </div>
                                </div>
                              </div>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => handleRemoveBookmark(item.id, e)}
                                className="text-destructive hover:bg-destructive/10 ml-4"
                                title="Remove bookmark"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};