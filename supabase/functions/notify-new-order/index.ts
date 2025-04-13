
import { Resend } from 'npm:resend@3.2.0'
import { corsHeaders } from '../_shared/cors.ts'
import { SupabaseClient, createClient } from 'npm:@supabase/supabase-js@2.39.7'
import OrderConfirmationEmail from './_templates/order-confirmation.tsx'
import AdminNotificationEmail from './_templates/admin-notification.tsx'
import React from 'npm:react@18.3.1'
import { renderAsync } from 'npm:@react-email/components@0.0.12'

// Get Resend API key from environment
const resendApiKey = Deno.env.get('RESEND_API_KEY')
const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')

// Create a Resend client
const resend = new Resend(resendApiKey)

Deno.serve(async (req) => {
  // Handle CORS for browser requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  
  try {
    // Parse request body
    const { orderData } = await req.json()
    console.log('Received order data:', JSON.stringify(orderData, null, 2))
    
    // Validate required data
    if (!orderData || !orderData.id || !orderData.customerEmail) {
      throw new Error('Missing required order data')
    }
    
    // Create a Supabase client
    const supabase = createClient(supabaseUrl as string, supabaseAnonKey as string)
    
    // Send customer confirmation email
    const customerHtml = await renderAsync(
      React.createElement(OrderConfirmationEmail, { 
        orderData,
        customerName: orderData.customerName,
      })
    )
    
    console.log('Attempting to send customer email to:', orderData.customerEmail)
    const customerEmailResult = await resend.emails.send({
      from: 'order@clevelandcartridge.co',
      to: orderData.customerEmail,
      subject: `Cleveland Cartridge Co. - Order Confirmation #${orderData.id.substring(0, 8)}`,
      html: customerHtml,
    })
    
    console.log('Customer email result:', customerEmailResult)
    
    // Send admin notification email
    const adminHtml = await renderAsync(
      React.createElement(AdminNotificationEmail, { orderData })
    )
    
    console.log('Attempting to send admin email to: support@clevelandcartridge.co')
    const adminEmailResult = await resend.emails.send({
      from: 'order@clevelandcartridge.co',
      to: 'support@clevelandcartridge.co',
      subject: `New Order Received #${orderData.id.substring(0, 8)}`,
      html: adminHtml,
    })
    
    console.log('Admin email result:', adminEmailResult)
    
    // Update order with notification status
    const { error: updateError } = await supabase
      .from('orders')
      .update({ notification_sent: true })
      .eq('id', orderData.id)
    
    if (updateError) {
      console.error('Error updating order notification status:', updateError)
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Order notifications sent successfully',
        orderId: orderData.id 
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200,
      }
    )
    
  } catch (error) {
    console.error('Error processing order notification:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: error.message || 'Failed to send order notifications' 
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 500,
      }
    )
  }
})
