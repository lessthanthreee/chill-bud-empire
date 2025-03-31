
import React, { useState } from "react";
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

// Sample review data
const reviews = [
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
  },
  {
    id: 3,
    username: "David W.",
    avatar: "/placeholder.svg",
    date: "2023-09-12",
    rating: 5,
    title: "Best sleep aid ever",
    content: "I've struggled with insomnia for years and have tried everything. These Northern Lights Delta 8 flowers have been a game-changer for my sleep. Just a small amount an hour before bed and I sleep like a baby. The quality is top-notch too.",
    product: "Delta 8 Flower - Northern Lights",
    category: "Flower",
    verifiedPurchase: true,
    helpfulCount: 32,
    reply: {
      content: "We're thrilled to hear that our Northern Lights flower has helped with your sleep, David! Quality rest is so important, and we're glad we could play a part in improving yours.",
      date: "2023-09-13"
    }
  },
  {
    id: 4,
    username: "Jennifer R.",
    avatar: "/placeholder.svg",
    date: "2023-08-25",
    rating: 3,
    title: "Good product, but shipping was slow",
    content: "The mint tincture works well for my chronic pain, and I appreciate that it's not too overwhelming. However, my order took over a week to arrive which was longer than expected. The product itself is good though, and I'll likely reorder despite the shipping delay.",
    product: "Delta 8 Tincture - Mint",
    category: "Tinctures",
    verifiedPurchase: true,
    helpfulCount: 7,
    reply: {
      content: "Jennifer, thank you for your feedback. We apologize for the shipping delay you experienced. We've been working on improving our logistics, and we're confident your next order will arrive much faster. We're glad to hear the tincture is helping with your pain management.",
      date: "2023-08-26"
    }
  },
  {
    id: 5,
    username: "Robert M.",
    avatar: "/placeholder.svg",
    date: "2023-07-19",
    rating: 5,
    title: "Perfect for relaxing after work",
    content: "These watermelon gummies are my new favorite way to unwind after a long day. The flavor is great, not too artificial, and the effects are perfectly balanced. I feel relaxed but not couch-locked. Will definitely be a repeat customer!",
    product: "Delta 8 Gummies - Watermelon",
    category: "Edibles",
    verifiedPurchase: true,
    helpfulCount: 15
  },
  {
    id: 6,
    username: "Lisa B.",
    avatar: "/placeholder.svg",
    date: "2023-07-05",
    rating: 4,
    title: "Great for focus and creativity",
    content: "I was skeptical about trying Delta 8, but the Sour Diesel cartridge has been amazing for my creative work. It helps me focus and gets my creative juices flowing without the anxiety I sometimes get from regular cannabis. The only reason for 4 stars instead of 5 is that the effects don't last as long as I'd like.",
    product: "Delta 8 Vape Cartridge - Sour Diesel",
    category: "Vapes",
    verifiedPurchase: true,
    helpfulCount: 21
  },
  {
    id: 7,
    username: "Thomas H.",
    avatar: "/placeholder.svg",
    date: "2023-06-22",
    rating: 2,
    title: "Not as potent as expected",
    content: "I've used Delta 8 products before, and this unflavored tincture seems much less potent than others I've tried. I need to use almost twice my usual dose to feel effects. The quality seems fine otherwise, just wish it was stronger for the price.",
    product: "Delta 8 Tincture - Unflavored",
    category: "Tinctures",
    verifiedPurchase: true,
    helpfulCount: 9,
    reply: {
      content: "Thomas, thank you for your honest feedback. Different users do have different sensitivities to Delta 8. We'd like to learn more about your experience - our customer service team will reach out to discuss this further and find a solution that works better for you.",
      date: "2023-06-23"
    }
  },
  {
    id: 8,
    username: "Amanda P.",
    avatar: "/placeholder.svg",
    date: "2023-05-18",
    rating: 5,
    title: "Amazing flavor and effects",
    content: "The Blue Dream flower exceeded my expectations! The effects are uplifting and perfect for daytime use. I love the subtle blueberry aroma and the smooth smoke. Will definitely purchase again and try other strains.",
    product: "Delta 8 Flower - Blue Dream",
    category: "Flower",
    verifiedPurchase: true,
    helpfulCount: 27
  }
];

// Calculate rating stats
const calculateRatingStats = () => {
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
                              <p className="text-sm font-medium">Delta Cannabis</p>
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
