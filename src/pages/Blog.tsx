
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Calendar, Search, Tag, User } from "lucide-react";

// Sample blog posts
const blogPosts = [
  {
    id: 1,
    title: "Delta 8 vs. Delta 9 THC: Understanding the Differences",
    excerpt: "Learn about the key differences between Delta 8 and Delta 9 THC, including effects, legality, and benefits.",
    image: "https://images.unsplash.com/photo-1560719887-fe3105fa1e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    author: "Dr. Sarah Johnson",
    date: "June 15, 2023",
    tags: ["Education", "Science"],
    featured: true
  },
  {
    id: 2,
    title: "5 Best Ways to Consume Delta 8 THC",
    excerpt: "Explore the different methods of consuming Delta 8 THC and find which one works best for your needs.",
    image: "https://images.unsplash.com/photo-1591084728795-1149f32d9866?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    author: "Michael Chen",
    date: "July 3, 2023",
    tags: ["How-to", "Products"],
    featured: true
  },
  {
    id: 3,
    title: "Delta 8 and Sleep: What the Research Says",
    excerpt: "Discover how Delta 8 THC may help with sleep issues and what current scientific research reveals.",
    image: "https://images.unsplash.com/photo-1585167151641-b2d62659e3f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    author: "Dr. Sarah Johnson",
    date: "August 12, 2023",
    tags: ["Health", "Science"],
    featured: false
  },
  {
    id: 4,
    title: "Is Delta 8 Legal in Ohio? Everything You Need to Know",
    excerpt: "A comprehensive guide to the legal status of Delta 8 THC in Ohio and what it means for consumers.",
    image: "https://images.unsplash.com/photo-1589216532372-1c2a367900d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    author: "Amanda Wright",
    date: "September 5, 2023",
    tags: ["Legal", "Ohio"],
    featured: false
  },
  {
    id: 5,
    title: "Beginner's Guide to Delta 8 THC",
    excerpt: "New to Delta 8? This comprehensive guide covers everything beginners need to know about Delta 8 THC.",
    image: "https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    author: "James Wilson",
    date: "October 18, 2023",
    tags: ["Beginners", "Education"],
    featured: false
  }
];

// All available tags
const allTags = ["Education", "Science", "How-to", "Products", "Health", "Legal", "Ohio", "Beginners"];

const Blog = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);

  // Filter blog posts based on search term and selected tag
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    
    return matchesSearch && matchesTag;
  });

  // Featured posts
  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Delta 8 Blog</h1>
        <p className="text-muted-foreground max-w-3xl">
          Stay informed about Delta 8 THC with our latest articles, guides, and news. Learn about benefits, 
          usage methods, legal updates, and more from our experts.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {selectedTag && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setSelectedTag(null)}
              className="text-sm"
            >
              Clear filter
            </Button>
          )}
        </div>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && !searchTerm && !selectedTag && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <BookOpen className="h-6 w-6 mr-2" /> Featured Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPosts.map(post => (
              <Card key={post.id} className="overflow-hidden h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-primary">Featured</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground line-clamp-3 mb-3">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <User className="h-4 w-4 mr-1" />
                    <span>{post.author}</span>
                    <span className="mx-2">•</span>
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="cursor-pointer" onClick={() => setSelectedTag(tag)}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Read More</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Categories/Tags */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Tag className="h-5 w-5 mr-2" /> Categories
        </h2>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <Badge
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <Separator className="my-8" />

      {/* Blog Posts */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">
          {selectedTag ? `${selectedTag} Articles` : searchTerm ? "Search Results" : "All Articles"}
        </h2>
        
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button onClick={() => { setSearchTerm(""); setSelectedTag(null); }}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <Card key={post.id} className="overflow-hidden h-full flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground line-clamp-3 mb-3">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <User className="h-4 w-4 mr-1" />
                    <span>{post.author}</span>
                    <span className="mx-2">•</span>
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{post.date}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Read More</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Newsletter Signup */}
      <div className="bg-secondary/50 rounded-lg p-8 text-center mb-16">
        <h3 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Stay updated with the latest articles, news, and product releases. Get exclusive access to special offers and discounts.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input placeholder="Enter your email" type="email" />
          <Button>Subscribe</Button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
