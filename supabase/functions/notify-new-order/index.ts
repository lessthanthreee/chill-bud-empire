
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

interface OrderData {
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  city: string;
  state: string;
  zipCode: string;
  orderTotal: number;
  paymentMethod: string;
  paymentAddress: string;
  items: {
    productName: string;
    quantity: number;
    price: number;
    subscription?: string;
  }[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderData }: { orderData: OrderData } = await req.json();
    
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not set");
    }

    // Format items for the email
    const itemsList = orderData.items.map(item => {
      const subscriptionText = item.subscription && item.subscription !== 'none' 
        ? `(${item.subscription} subscription)` 
        : '';
      
      return `- ${item.productName} x${item.quantity} $${item.price.toFixed(2)} ${subscriptionText}`;
    }).join('\n');

    // Generate the email body
    const emailHtml = `
      <h1>New Order Received!</h1>
      <p><strong>Customer:</strong> ${orderData.customerName} (${orderData.customerEmail})</p>
      <p><strong>Shipping Address:</strong><br>
      ${orderData.shippingAddress}<br>
      ${orderData.city}, ${orderData.state} ${orderData.zipCode}</p>
      
      <p><strong>Payment Method:</strong> ${orderData.paymentMethod}</p>
      <p><strong>Payment Address:</strong> ${orderData.paymentAddress}</p>
      <p><strong>Order Total:</strong> $${orderData.orderTotal.toFixed(2)}</p>
      
      <h2>Items Ordered:</h2>
      <pre>${itemsList}</pre>
      
      <p>Please check your wallet for the payment and process the order.</p>
    `;

    // Send email using Resend
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Cleveland Cartridge Co <orders@resend-domain.com>",
        to: "owner@clevelandcartridge.co", // Replace with your actual email
        subject: `New Order: ${orderData.customerName} - $${orderData.orderTotal.toFixed(2)}`,
        html: emailHtml,
        reply_to: orderData.customerEmail
      })
    });

    const result = await response.json();

    if (response.status !== 200) {
      throw new Error(`Failed to send email: ${JSON.stringify(result)}`);
    }

    console.log("Email sent successfully:", result);

    return new Response(
      JSON.stringify({ success: true, message: "Order notification sent" }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
    
  } catch (error) {
    console.error("Error sending notification:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "Failed to send order notification",
        error: error.message
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
