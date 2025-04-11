
# Backend Setup and Testing Plan

## Overview
This document outlines the steps to properly set up, configure, and test the backend components of the Cleveland Cartridge Co. e-commerce application. The application uses Supabase for database storage and edge functions for server-side operations.

## 1. Database Structure

### Current Tables
- `products`: Stores product information
- `reviews`: Stores customer reviews
- `orders`: Stores customer orders
- `order_items`: Stores items within orders

### RLS Policies
- The tables currently don't have Row Level Security policies configured
- For a public e-commerce site, we need to ensure:
  - Anyone can read product and review data
  - Only authenticated admin users can modify products
  - Orders data needs to be protected

## 2. Backend Setup Steps

### 2.1 Fix Application Structure
- Ensure React Router is properly configured (only one Router in the application)
- Fix any duplicate provider issues

### 2.2 Database Validation
- Validate database tables have correct columns and constraints
- Ensure UUIDs are properly generated and used for all IDs
- Verify foreign key relationships are correctly set up

### 2.3 Edge Functions
- Review current edge function implementation
- Enhance error handling and logging
- Test email notification function with proper error boundaries

### 2.4 Order Processing Flow
1. User adds items to cart
2. User provides shipping information
3. User selects payment method
4. User submits order
5. System creates order record in database
6. System creates order items in database
7. System sends notification email
8. System displays confirmation to user

## 3. Testing Plan

### 3.1 Manual Testing Checklist

#### Database Operations
- [ ] Create test products with valid UUIDs
- [ ] Verify product retrieval works correctly
- [ ] Test order creation with valid data
- [ ] Test order creation with invalid data (should fail gracefully)
- [ ] Verify order items creation with valid order IDs

#### Edge Function Testing
- [ ] Test email notification function with valid order data
- [ ] Test email notification function with invalid data
- [ ] Verify error handling returns appropriate responses

#### Order Flow Testing
- [ ] Complete checkout process with test data
- [ ] Verify order and order items records are created
- [ ] Verify email notification is sent
- [ ] Test handling of invalid form inputs

### 3.2 Common Issues and Solutions

#### UUID Format Issues
- Problem: Invalid UUID format causing database errors
- Solution: Ensure all IDs use proper UUID format (use gen_random_uuid() in database)

#### Edge Function Errors
- Problem: Edge function failing silently
- Solution: Add proper error handling and logging to diagnose issues

#### Email Notification Failures
- Problem: Email notifications not being sent
- Solution: Verify edge function is properly configured with correct CORS headers

## 4. Implementation Steps

1. Fix React Router configuration
2. Run database validation queries 
3. Update edge functions with improved error handling
4. Create test data set
5. Execute manual test checklist
6. Document any issues and fix them
7. Verify full order flow works end-to-end

## 5. Monitoring and Maintenance

- Review Supabase logs regularly
- Set up error reporting for front-end issues
- Create admin dashboard for order monitoring

## 6. Future Improvements

- Add authentication system for admin users
- Implement inventory management
- Create order tracking functionality
- Set up automated testing

## 7. Resources

- [Supabase Documentation](https://supabase.io/docs)
- [Supabase Edge Functions](https://supabase.io/docs/guides/functions)
- [Resend Email API](https://resend.com/docs)
- [React Router Documentation](https://reactrouter.com/docs/en/v6)
