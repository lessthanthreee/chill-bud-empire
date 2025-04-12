
import { serve } from "https://deno.land/std@0.188.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

const resend = new Resend(Deno.env.get("RESEND_API_KEY"))

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
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { 
        headers: { 
          ...corsHeaders,
          "Content-Type": "application/json" 
        },
        status: 405 
      }
    );
  }

  try {
    console.log("Received order notification request");
    
    // Parse the request body
    const { orderData } = await req.json();
    
    if (!orderData) {
      throw new Error("No order data provided");
    }

    // Format the order items for email
    const itemsList = orderData.items
      .map(item => `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`)
      .join('<br>');

    // Send email to admin/store owner
    const { error: emailError } = await resend.emails.send({
      from: 'orders@clevelandcartridge.com',
      to: 'admin@clevelandcartridge.com', // Replace with your actual admin email
      subject: `New Order #${orderData.id}`,
      html: `
        <h1>New Order Received</h1>
        <p><strong>Order ID:</strong> ${orderData.id}</p>
        <p><strong>Customer:</strong> ${orderData.customerName}</p>
        <p><strong>Email:</strong> ${orderData.customerEmail}</p>
        <p><strong>Total:</strong> $${orderData.total.toFixed(2)}</p>
        <p><strong>Payment Method:</strong> ${orderData.payment_method?.toUpperCase()}</p>
        <p><strong>Shipping Address:</strong> ${orderData.shipping_address}</p>
        <h2>Order Items:</h2>
        <p>${itemsList}</p>
      `
    });

    if (emailError) {
      console.error("Email sending error:", emailError);
      // Still continue with the response even if email fails
    }

    // Send a confirmation email to the customer
    const { error: customerEmailError } = await resend.emails.send({
      from: 'orders@clevelandcartridge.com',
      to: orderData.customerEmail,
      subject: `Order Confirmation #${orderData.id}`,
      html: `
        <h1>Thank you for your order!</h1>
        <p>Order #${orderData.id} has been received and is being processed.</p>
        <h2>Order Details:</h2>
        <p><strong>Total:</strong> $${orderData.total.toFixed(2)}</p>
        <h3>Items:</h3>
        <p>${itemsList}</p>
        <p>We'll send you another email once your order has been shipped.</p>
      `
    });

    if (customerEmailError) {
      console.error("Customer email sending error:", customerEmailError);
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Order notification sent successfully",
        orderId: orderData.id
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
        message: "Error processing order notification",
        error: error.message
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

