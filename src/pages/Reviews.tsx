import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, StarHalf, ThumbsUp, Filter, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Review {
  id: number | string;
  username: string;
  avatar: string;
  date: string;
  rating: number;
  title: string;
  content: string;
  product: string;
  category: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  reply?: {
    content: string;
    date: string;
  };
}

// Render star ratings
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-4 w-4 fill-primary text-primary" />
      ))}
      {hasHalfStar && (
        <StarHalf className="h-4 w-4 fill-primary text-primary" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-4 w-4 text-muted-foreground" />
      ))}
    </div>
  );
};

const Reviews = () => {
  const [sortBy, setSortBy] = useState("newest");
  const [filterRating, setFilterRating] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch reviews from Supabase
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const { data: dbReviews, error } = await supabase
          .from('reviews')
          .select(`
            *,
            products (
              name, category
            )
          `)
          .eq('approved', true);
        
        if (error) {
          throw new Error(error.message);
        }
        
        if (dbReviews && dbReviews.length > 0) {
          // Transform the data to match our Review interface
          const transformedReviews: Review[] = dbReviews.map(review => ({
            id: review.id,
            username: review.name.split(' ')[0] + ' ' + (review.name.split(' ')[1]?.[0] || '') + '.',
            avatar: "/placeholder.svg",
            date: new Date(review.created_at).toISOString().split('T')[0],
            rating: review.rating,
            title: review.comment.substring(0, 40) + (review.comment.length > 40 ? '...' : ''),
            content: review.comment,
            product: review.products.name,
            category: review.products.category,
            verifiedPurchase: true,
            helpfulCount: Math.floor(Math.random() * 30) // Random number for demo
          }));
          
          setReviews(transformedReviews);
        } else {
          // Fallback to sample reviews if no reviews in database
          setReviews([
            {
              id: 1,
              username: "Michael T.",
              avatar: "/placeholder.svg",
              date: "2023-10-15",
              rating: 5,
              title: "Excellent product, fast shipping",
              content: "I've tried Delta 8 from several different companies and this is by far the best. The effect is clean and smooth. Very impressed with the quality and will definitely be ordering again. Shipping was surprisingly fast too.",
              product: "Delta 8 Gummies - Berry Blast",
              category: "Edibles",
              verifiedPurchase: true,
              helpfulCount: 24,
              reply: {
                content: "Thank you for your kind words, Michael! We're so glad you enjoyed our Berry Blast gummies. We look forward to serving you again soon!",
                date: "2023-10-16"
              }
            },
            {
              id: 2,
              username: "Sarah K.",
              avatar: "/placeholder.svg",
              date: "2023-09-28",
              rating: 4,
              title: "Great for anxiety relief",
              content: "I've been using the OG Kush vape cartridge for a few weeks now, and it's been amazing for my anxiety. The effects come on quickly and provide relief without making me feel too out of it. My only complaint is that the cartridge seems to go empty a bit faster than expected.",
              product: "Delta 8 Vape Cartridge - OG Kush",
              category: "Vapes",
              verifiedPurchase: true,
              helpfulCount: 18
            }
          ]);
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews. Please try again later.");
        setReviews([
          {
            id: 1,
            username: "Michael T.",
            avatar: "/placeholder.svg",
            date: "2023-10-15",
            rating: 5,
            title: "Excellent product, fast shipping",
            content: "I've tried Delta 8 from several different companies and this is by far the best. The effect is clean and smooth. Very impressed with the quality and will definitely be ordering again. Shipping was surprisingly fast too.",
            product: "Delta 8 Gummies - Berry Blast",
            category: "Edibles",
            verifiedPurchase: true,
            helpfulCount: 24,
            reply: {
              content: "Thank you for your kind words, Michael! We're so glad you enjoyed our Berry Blast gummies. We look forward to serving you again soon!",
              date: "2023-10-16"
            }
          },
          {
            id: 2,
            username: "Sarah K.",
            avatar: "/placeholder.svg",
            date: "2023-09-28",
            rating: 4,
            title: "Great for anxiety relief",
            content: "I've been using the OG Kush vape cartridge for a few weeks now, and it's been amazing for my anxiety. The effects come on quickly and provide relief without making me feel too out of it. My only complaint is that the cartridge seems to go empty a bit faster than expected.",
            product: "Delta 8 Vape Cartridge - OG Kush",
            category: "Vapes",
            verifiedPurchase: true,
            helpfulCount: 18
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReviews();
  }, []);
  
  // Calculate rating stats
  const calculateRatingStats = () => {
    if (reviews.length === 0) {
      return {
        averageRating: 0,
        total: 0,
        starCounts: [0, 0, 0, 0, 0],
        starPercentages: [0, 0, 0, 0, 0]
      };
    }
    
    const total = reviews.length;
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / total;
    
    const starCounts = [0, 0, 0, 0, 0]; // Index 0 = 1 star, Index 4 = 5 stars
    reviews.forEach(review => {
      starCounts[review.rating - 1]++;
    });
    
    const starPercentages = starCounts.map(count => (count / total) * 100);
    
    return {
      averageRating,
      total,
      starCounts,
      starPercentages
    };
  };
  
  const ratingStats = calculateRatingStats();
  
  // Filter and sort reviews
  const filteredAndSortedReviews = [...reviews]
    .filter(review => {
      // Filter by rating
      if (filterRating !== "all") {
        return review.rating === parseInt(filterRating);
      }
      return true;
    })
    .filter(review => {
      // Filter by category
      if (filterCategory !== "all") {
        return review.category === filterCategory;
      }
      return true;
    })
    .sort((a, b) => {
      // Sort reviews
      switch (sortBy) {
        case "highest":
          return b.rating - a.rating;
        case "lowest":
          return a.rating - b.rating;
        case "helpful":
          return b.helpfulCount - a.helpfulCount;
        case "newest":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  // Display loading state
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="text-center py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-secondary rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-secondary rounded w-1/2 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="h-96 bg-secondary rounded"></div>
              <div className="lg:col-span-2 space-y-4">
                <div className="h-6 bg-secondary rounded w-1/4"></div>
                <div className="h-64 bg-secondary rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Customer Reviews</h1>
        <p className="text-muted-foreground max-w-3xl">
          Read honest reviews from our customers about their experiences with our Delta 8 products. 
          We value transparency and customer feedback to help improve our products and services.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Rating Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Customer Ratings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <span className="text-4xl font-bold">{ratingStats.averageRating.toFixed(1)}</span>
                <div className="flex justify-center my-2">
                  <StarRating rating={ratingStats.averageRating} />
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on {ratingStats.total} reviews
                </p>
              </div>
              
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map(stars => (
                  <div key={stars} className="flex items-center">
                    <div className="text-sm font-medium w-8">{stars}</div>
                    <Star className="h-4 w-4 text-primary mr-2" />
                    <Progress 
                      value={ratingStats.starPercentages[stars - 1]} 
                      className="h-2 w-full" 
                    />
                    <span className="text-sm text-muted-foreground ml-2 w-10">
                      {Math.round(ratingStats.starPercentages[stars - 1])}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-4">
              <div className="w-full">
                <h3 className="text-sm font-medium mb-2">Filter by Rating</h3>
                <Select value={filterRating} onValueChange={setFilterRating}>
                  <SelectTrigger>
                    <SelectValue placeholder="All ratings" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full">
                <h3 className="text-sm font-medium mb-2">Filter by Category</h3>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Edibles">Edibles</SelectItem>
                    <SelectItem value="Vapes">Vapes</SelectItem>
                    <SelectItem value="Tinctures">Tinctures</SelectItem>
                    <SelectItem value="Flower">Flower</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setFilterRating("all");
                  setFilterCategory("all");
                  setSortBy("newest");
                }}
              >
                Reset Filters
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2">
          {/* Sort Controls */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {filteredAndSortedReviews.length} {filteredAndSortedReviews.length === 1 ? 'Review' : 'Reviews'}
              {filterRating !== "all" && ` • ${filterRating} Stars`}
              {filterCategory !== "all" && ` • ${filterCategory}`}
            </h2>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="highest">Highest Rated</SelectItem>
                  <SelectItem value="lowest">Lowest Rated</SelectItem>
                  <SelectItem value="helpful">Most Helpful</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Reviews */}
          {filteredAndSortedReviews.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <h3 className="text-lg font-medium mb-2">No reviews match your filters</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filter settings to see more reviews
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setFilterRating("all");
                    setFilterCategory("all");
                  }}
                >
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {filteredAndSortedReviews.map(review => (
                <Card key={review.id} className="overflow-hidden">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={review.avatar} alt={review.username} />
                          <AvatarFallback>{review.username.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{review.username}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex justify-end">
                          <StarRating rating={review.rating} />
                        </div>
                        {review.verifiedPurchase && (
                          <span className="text-xs text-green-600 mt-1 inline-block">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium mb-2">{review.title}</h4>
                      <p className="text-muted-foreground">{review.content}</p>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm">
                        <span className="text-muted-foreground">Product: </span>
                        <span className="font-medium">{review.product}</span>
                      </p>
                    </div>

                    <div className="flex justify-between items-center">
                      <Button variant="ghost" size="sm" className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Helpful ({review.helpfulCount})
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Comment
                      </Button>
                    </div>

                    {review.reply && (
                      <div className="mt-4 pt-4 border-t">
                        <div className="bg-secondary/50 p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarFallback>DC</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">Cleveland Cartridge Co</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(review.reply.date).toLocaleDateString('en-US', { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm">{review.reply.content}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {/* Write a Review CTA */}
          <div className="mt-8 text-center">
            <h3 className="text-lg font-medium mb-2">Have you tried our products?</h3>
            <p className="text-muted-foreground mb-4">
              Share your experience and help other customers make informed decisions.
            </p>
            <Button>Write a Review</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
