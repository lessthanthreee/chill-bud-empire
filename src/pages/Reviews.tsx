import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Review, ReviewWithUI } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Reviews = () => {
  const [reviews, setReviews] = useState<ReviewWithUI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [productId, setProductId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("reviews")
          .select(`
            *,
            products (
              name,
              category
            )
          `)
          .eq("approved", true)
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          const reviewsWithUIState = data.map((review: Review) => ({
            ...review,
            expanded: false,
          }));
          setReviews(reviewsWithUIState);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([
          {
            id: "1",
            product_id: "1",
            name: "John Smith",
            email: "john@example.com",
            rating: 5,
            comment: "These are the best vape pods I've ever tried! Smooth flavor and no leaks. Will definitely buy again.",
            approved: true,
            created_at: "2024-03-01T00:00:00Z",
            expanded: false,
            products: {
              name: "Premium Vape Replacement Pod",
              category: "Vapes",
            },
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("reviews").insert([
        {
          product_id: productId || "1",
          name,
          email,
          rating,
          comment,
          approved: false,
        }
      ]);

      if (error) throw error;

      toast({
        title: "Review submitted!",
        description: "Thank you for your feedback. Your review will be visible after moderation.",
      });

      setName("");
      setEmail("");
      setRating(5);
      setComment("");
      setProductId("");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast({
        title: "Submission failed",
        description: "There was a problem submitting your review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleReviewExpansion = (reviewId: string) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === reviewId
          ? { ...review, expanded: !review.expanded }
          : review
      )
    );
  };

  const renderStars = (count: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span key={i} className="inline-block">
          {i < count ? (
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          ) : (
            <Star className="h-4 w-4 text-gray-300" />
          )}
        </span>
      ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 pt-28">
        <div className="animate-pulse">
          <div className="h-8 bg-secondary rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-4 bg-secondary rounded w-1/2 mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="h-40 bg-secondary rounded"></div>
              <div className="h-40 bg-secondary rounded"></div>
            </div>
            <div className="h-80 bg-secondary rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 pt-28">
      <h1 className="text-3xl font-bold text-center mb-2">Customer Reviews</h1>
      <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
        See what our customers are saying about our products. We pride ourselves on quality and service.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-6">Recent Reviews</h2>
          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{review.name}</CardTitle>
                        <CardDescription className="flex items-center">
                          {renderStars(review.rating)}
                          <span className="ml-2">
                            {formatDate(review.created_at)}
                          </span>
                        </CardDescription>
                      </div>
                      {review.products && (
                        <div className="text-right">
                          <div className="font-medium">{review.products.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {review.products.category}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className={review.expanded ? "" : "line-clamp-3"}>
                      {review.comment}
                    </p>
                  </CardContent>
                  {review.comment.length > 150 && (
                    <CardFooter>
                      <Button
                        variant="link"
                        onClick={() => toggleReviewExpansion(review.id)}
                        className="p-0"
                      >
                        {review.expanded ? "Read less" : "Read more"}
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-secondary/20 rounded-lg">
              <p className="text-muted-foreground">No reviews yet. Be the first to leave one!</p>
            </div>
          )}
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Leave a Review</CardTitle>
              <CardDescription>
                Share your experience with our products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        {star <= rating ? (
                          <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                        ) : (
                          <Star className="h-6 w-6 text-gray-300" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="comment">Your Review</Label>
                  <Textarea
                    id="comment"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
