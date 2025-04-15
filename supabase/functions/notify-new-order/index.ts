
// Import necessary modules
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

// Initialize Resend with the API key
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Set CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderDetails {
  orderId: string;
  customerEmail: string;
  customerName: string;
  orderTotal: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    // Parse the request body to get order details
    const orderData: OrderDetails = await req.json();

    // Format order items
    const formattedItems = orderData.items.map(item => 
      `${item.quantity}x ${item.name} - $${(item.quantity * item.price).toFixed(2)}`
    ).join("<br />");

    // Send confirmation email to customer
    const customerEmail = await resend.emails.send({
      from: "onboarding@resend.dev", // Using default Resend domain
      to: [orderData.customerEmail],
      subject: `Order Confirmation #${orderData.orderId}`,
      html: `
        <h1>Thank you for your order!</h1>
        <p>Order #${orderData.orderId} has been received and is being processed.</p>
        <h2>Order Details:</h2>
        <p><strong>Total:</strong> $${orderData.orderTotal.toFixed(2)}</p>
        <h3>Items:</h3>
        <p>${formattedItems}</p>
        <p>We'll send you another email once your order has been shipped.</p>
      `,
    });

    // Send notification to admin
    const adminEmail = await resend.emails.send({
      from: "onboarding@resend.dev", // Using default Resend domain
      to: ["info@clevelandcartridge.co"], // Admin email
      subject: `New Order #${orderData.orderId}`,
      html: `
        <h1>New Order Received</h1>
        <p>Order #${orderData.orderId} has been placed.</p>
        <h2>Customer Information:</h2>
        <p><strong>Name:</strong> ${orderData.customerName}</p>
        <p><strong>Email:</strong> ${orderData.customerEmail}</p>
        <h2>Order Details:</h2>
        <p><strong>Total:</strong> $${orderData.orderTotal.toFixed(2)}</p>
        <h3>Items:</h3>
        <p>${formattedItems}</p>
      `,
    });

    // Log success
    console.log("Emails sent successfully:", customerEmail, adminEmail);

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Order notification emails sent" 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );

  } catch (error) {
    // Log error
    console.error("Error sending notification emails:", error);

    // Return error response
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }
});
