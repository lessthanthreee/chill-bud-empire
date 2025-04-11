
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.188.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

// Define more detailed interfaces for better type checking
interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  product_id?: string;
}

interface OrderData {
  id: string;
  customerName: string;
  customerEmail: string;
  total: number;
  items: OrderItem[];
  shipping_address?: string;
  payment_method?: string;
}

/**
 * Helper function to create a standardized error response
 */
function createErrorResponse(message: string, details: any = null, status = 400) {
  const errorBody = {
    success: false,
    error: message,
    timestamp: new Date().toISOString(),
  };
  
  if (details) {
    errorBody.details = details;
  }
  
  return new Response(
    JSON.stringify(errorBody),
    { 
      headers: { 
        ...corsHeaders,
        "Content-Type": "application/json" 
      },
      status: status 
    }
  );
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: corsHeaders,
      status: 204
    });
  }
  
  // Validate request method
  if (req.method !== 'POST') {
    return createErrorResponse(
      "Method not allowed", 
      { allowedMethods: ['POST'] },
      405
    );
  }

  try {
    console.log("Received order notification request");
    
    // Parse the request body
    let body;
    try {
      body = await req.json();
    } catch (error) {
      console.error("Failed to parse request body:", error);
      return createErrorResponse(
        "Failed to parse request body", 
        { message: error.message },
        400
      );
    }
    
    const { orderData } = body;
    
    if (!orderData) {
      console.error("No order data provided");
      return createErrorResponse(
        "No order data provided", 
        { receivedBody: body },
        400
      );
    }
    
    // Validate required fields in order data
    const requiredFields = ['id', 'customerName', 'customerEmail', 'items', 'total'];
    const missingFields = requiredFields.filter(field => !orderData[field]);
    
    if (missingFields.length > 0) {
      console.error("Missing required fields in order data:", missingFields);
      return createErrorResponse(
        "Invalid order data structure: missing required fields", 
        { missingFields, receivedData: orderData },
        400
      );
    }
    
    // Validate items array
    if (!Array.isArray(orderData.items) || orderData.items.length === 0) {
      console.error("Order items must be a non-empty array");
      return createErrorResponse(
        "Order items must be a non-empty array", 
        { receivedItems: orderData.items },
        400
      );
    }
    
    // Log order details for debugging
    console.log("Order received:", JSON.stringify(orderData, null, 2));
    
    // Format the email content with order details
    const order = orderData as OrderData;
    const itemsList = order.items
      .map(item => `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`)
      .join('\n');
    
    const emailBody = `
      New Order Notification
      
      Order ID: ${order.id}
      Customer: ${order.customerName}
      Email: ${order.customerEmail}
      Total: $${order.total.toFixed(2)}
      
      Items:
      ${itemsList}
      
      Please process this order as soon as possible.
    `;
    
    console.log("Order notification details:", emailBody);
    
    // For now, just log the email content instead of sending it
    // Later we can integrate with an email service like Resend
    
    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Order notification received and logged successfully",
        orderId: order.id,
        customerName: order.customerName,
        total: order.total.toFixed(2)
      }),
      { 
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        },
        status: 200 
      }
    );
  } catch (error) {
    console.error("Error processing order notification:", error);
    
    // Create a detailed error response with stack trace in development
    const errorDetails = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    };
    
    // Log the full error details for debugging
    console.error("Full error details:", JSON.stringify(errorDetails, null, 2));
    
    // Return a sanitized error response to the client
    return createErrorResponse(
      "Error processing order notification", 
      { message: error.message || "Unknown error occurred" },
      500
    );
  }
})
