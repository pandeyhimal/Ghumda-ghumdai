import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  MapPin,
  Star,
  Heart,
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { getContentById, getCommentsByContentId } from "@/data/mockData";
import { useContent } from "@/contexts/ContentContext";
import { useLanguage } from "@/contexts/LanguageContext";

const categoryColors = {
  places: "bg-primary text-primary-foreground",
  food: "bg-secondary text-secondary-foreground",
  traditions: "bg-accent text-accent-foreground",
};

export default function ContentDetail() {
  // const { id } = useParams<{ id: string }>();
  const { title } = useParams<{ title: string }>();
  const navigate = useNavigate();
  const { bookmarks, toggleBookmark, isLoggedIn } = useContent();
  const { t } = useLanguage();

  const content = title ? getContentById(title) : null;
  const comments = title ? getCommentsByContentId(content?.id ?? "") : [];

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Content not found</h2>
          <Button onClick={() => navigate("/")}>Go back home</Button>
        </div>
      </div>
    );
  }

  const isBookmarked = bookmarks.includes(content.id);

  return (
    <div className="min-h-screen bg-background">
     

      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Back Navigation */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Hero Image */}
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={content.image}
                  alt={content.title}
                  className="w-full h-64 md:h-96 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={categoryColors[content.category]}>
                    {content.category.charAt(0).toUpperCase() +
                      content.category.slice(1)}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(e) =>{
                      e.preventDefault();
                      e.stopPropagation();
                       toggleBookmark(content.id)}}
                    className="border border-gray-300 text-gray-500 bg-background/80 backdrop-blur-sm hover:bg-background"
                  >
                    <Heart
                      className={`h-4 w-4  ${
                        isBookmarked ? "fill-current text-red-500" : ""
                      }`}
                    />
                  </Button>
                </div>
              </div>

              {/* Content Header */}
              <div>
                <div className="flex justify-between mb-4">
                  <div className="flex items-center text-sm text-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {content.municipality}, {content.district}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-6 space-x-4">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4 text-primary" />
                      <span className="font-semibold">
                        Submitted by:{" "}
                        <span className="font-semibold text-primary">
                          {content.author}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className=" space-x-1">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{content.submittedDate}</span>
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {content.title}
                </h1>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 fill-current text-yellow-400" />
                    <span className="font-medium">{content.rating}</span>
                    <span className="text-muted-foreground">
                      ({content.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-3">About</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {content.fullDescription}
                  </p>
                </CardContent>
              </Card>

              {/* Location (moved from sidebar) */}
              {content.location && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Location</h3>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        {content.location.address}
                      </p>
                      <div className="bg-muted h-32 rounded-lg flex items-center justify-center">
                        <span className="text-muted-foreground">
                          Map Placeholder
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Comments Section */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Reviews ({comments.length})
                  </h2>
                  {!isLoggedIn && (
                    <div className="bg-muted p-4 rounded-lg mb-4">
                      <p className="text-muted-foreground">
                        Login to write a review
                      </p>
                    </div>
                  )}
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="border-b pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">
                              {comment.author}
                            </span>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < comment.rating
                                      ? "fill-current text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {comment.date}
                          </span>
                        </div>
                        <p className="text-muted-foreground">
                          {comment.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Quick Info</h3>
                  <div className="space-y-3">
                    {content.bestTime && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Best Time</p>
                          <p className="text-sm text-muted-foreground">
                            {content.bestTime}
                          </p>
                        </div>
                      </div>
                    )}

                    {content.difficulty && (
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Difficulty</p>
                          <p className="text-sm text-muted-foreground">
                            {content.difficulty}
                          </p>
                        </div>
                      </div>
                    )}

                    {content.price && (
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Price Range</p>
                          <p className="text-sm text-muted-foreground">
                            {content.price}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Tips & Recommendations (moved from main content) */}
              {content.tips && content.tips.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-3">
                      Tips & Recommendations
                    </h2>
                    <ul className="space-y-2">
                      {content.tips.map((tip, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-primary font-bold">•</span>
                          <span className="text-muted-foreground">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* More Images */}
              {content.images && content.images.length > 1 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">More Photos</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {content.images.slice(1, 5).map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${content.title} ${index + 1}`}
                          className="w-full h-20 object-cover rounded"
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


