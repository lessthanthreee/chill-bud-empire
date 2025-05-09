
// Import necessary modules
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import nodemailer from "npm:nodemailer@6.10.1";

// Gmail SMTP credentials from environment variables
const GMAIL_USER = Deno.env.get("GMAIL_USER");
const GMAIL_PASS = Deno.env.get("GMAIL_APP_PASSWORD");

if (!GMAIL_USER || !GMAIL_PASS) {
  console.error("Missing Gmail credentials: GMAIL_USER or GMAIL_APP_PASSWORD environment variables are not set.", {
    GMAIL_USER,
    GMAIL_PASS
  });
  throw new Error("Missing Gmail credentials: GMAIL_USER or GMAIL_APP_PASSWORD environment variables are not set.");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

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
    const customerMailOptions = {
      from: GMAIL_USER,
      to: orderData.customerEmail,
      subject: `Order Confirmation #${orderData.orderId}`,
      html: `
        <h1>Thank you for your order!</h1>
        <p>Order #${orderData.orderId} has been received and is being processed.</p>
        <h2>Order Details:</h2>
        <p><strong>Total:</strong> $${orderData.orderTotal.toFixed(2)}</p>
        <h3>Items:</h3>
        <p>${formattedItems}</p>
        <p>We'll send you another email once your order has been shipped.</p>
        <p>You can track your order status by visiting: <a href="https://clevelandcartridge.com/order-success?orderId=${orderData.orderId}">Order Tracking</a></p>
      `,
    };
    const customerEmailResult = await transporter.sendMail(customerMailOptions);

    // Send notification to admin with analytics tracking pixel
    const adminMailOptions = {
      from: GMAIL_USER,
      to: "clevelandcartridge@gmail.com",
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
        <p>View full details in the admin dashboard.</p>
        <img src="https://www.google-analytics.com/collect?v=1&tid=MEASUREMENT_ID&cid=555&t=event&ec=email&ea=open&el=admin_order_notification&ev=1" width="1" height="1" />
      `,
    };
    const adminEmailResult = await transporter.sendMail(adminMailOptions);

    // Log success
    console.log("Emails sent successfully:", customerEmailResult, adminEmailResult);

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
    if (error && error.response) {
      console.error("SMTP response:", error.response);
    }

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
