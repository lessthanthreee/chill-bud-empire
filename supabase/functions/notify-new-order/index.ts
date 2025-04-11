
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.188.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderData {
  id: string;
  customerName: string;
  customerEmail: string;
  total: number;
  items: OrderItem[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Received order notification request");
    
    // Parse the request body
    let body;
    try {
      body = await req.json();
    } catch (error) {
      console.error("Failed to parse request body:", error);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to parse request body"
        }),
        { 
          headers: { 
            ...corsHeaders,
            "Content-Type": "application/json" 
          },
          status: 400 
        }
      );
    }
    
    const { orderData } = body;
    
    if (!orderData) {
      console.error("No order data provided");
      return new Response(
        JSON.stringify({
          success: false,
          error: "No order data provided"
        }),
        { 
          headers: { 
            ...corsHeaders,
            "Content-Type": "application/json" 
          },
          status: 400 
        }
      );
    }
    
    // Validate order data structure
    if (!orderData.id || !orderData.customerName || !orderData.customerEmail || !orderData.items) {
      console.error("Invalid order data structure:", orderData);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid order data structure"
        }),
        { 
          headers: { 
            ...corsHeaders,
            "Content-Type": "application/json" 
          },
          status: 400 
        }
      );
    }
    
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
    
    console.log("Email would be sent with the following content:");
    console.log(emailBody);
    
    // Here you would normally send an email notification using a service like Resend
    // For now, we're just logging the email content
    
    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Order notification received and email content generated",
        emailPreview: emailBody
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
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message || "Unknown error occurred"
      }),
      { 
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        },
        status: 500 
      }
    );
  }
})
