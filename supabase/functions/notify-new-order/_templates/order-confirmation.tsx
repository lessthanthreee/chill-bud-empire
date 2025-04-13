
import * as React from 'npm:react@18.3.1'
import { 
  Body, 
  Container, 
  Head, 
  Heading, 
  Html, 
  Text, 
  Link,
  Section,
  Hr
} from 'npm:@react-email/components@0.0.12'

interface OrderConfirmationEmailProps {
  orderData: {
    id: string;
    customerName: string;
    customer_name?: string;
    customerEmail?: string;
    customer_email?: string;
    order_total: number;
    shipping_address?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    items?: Array<{
      product_id: string;
      name?: string;
      quantity: number;
      price: number;
    }>;
  };
  customerName?: string;
}

const OrderConfirmationEmail: React.FC<OrderConfirmationEmailProps> = ({
  orderData,
  customerName
}) => {
  // Handle different property names in the orderData
  const name = orderData.customerName || orderData.customer_name || customerName || 'Customer';
  const orderId = orderData.id.substring(0, 8);
  
  return (
    <Html>
      <Head />
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>Order Confirmation</Heading>
          <Text style={styles.text}>Hello {name},</Text>
          <Text style={styles.text}>
            Thank you for your order! We've received your order and it's being processed.
          </Text>
          
          <Section style={styles.section}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            <Text style={styles.detail}>Order Number: #{orderId}</Text>
            <Text style={styles.detail}>Total Amount: ${orderData.order_total.toFixed(2)}</Text>
          </Section>
          
          {orderData.items && orderData.items.length > 0 && (
            <Section style={styles.section}>
              <Text style={styles.sectionTitle}>Items Ordered</Text>
              {orderData.items.map((item, index) => (
                <Text key={index} style={styles.detail}>
                  {item.quantity}x {item.name || `Product #${item.product_id.substring(0, 8)}`} - ${item.price.toFixed(2)}
                </Text>
              ))}
            </Section>
          )}
          
          <Section style={styles.paymentInstructions}>
            <Text style={styles.sectionTitle}>Payment Instructions</Text>
            <Text style={styles.detail}>
              Please send your cryptocurrency payment to one of the following addresses:
            </Text>
            <Text style={styles.paymentAddress}>Bitcoin (BTC): bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</Text>
            <Text style={styles.paymentAddress}>Ethereum (ETH): 0x71C7656EC7ab88b098defB751B7401B5f6d8976F</Text>
            <Text style={styles.paymentAddress}>Litecoin (LTC): ltc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</Text>
            
            <Text style={styles.importantDetail}>
              <strong>IMPORTANT:</strong> When sending payment, please include your order number <strong>#{orderId}</strong> in the transaction memo/description.
            </Text>
            
            <Text style={styles.detail}>
              Once we verify your payment, your order will be processed and shipped.
            </Text>
          </Section>
          
          {orderData.shipping_address && (
            <Section style={styles.section}>
              <Text style={styles.sectionTitle}>Shipping Information</Text>
              <Text style={styles.detail}>{orderData.shipping_address}</Text>
              <Text style={styles.detail}>
                {orderData.city}, {orderData.state} {orderData.zip_code}
              </Text>
            </Section>
          )}
          
          <Hr style={styles.hr} />
          
          <Text style={styles.text}>
            If you have any questions about your order or payment process, please contact our customer service team at support@clevelandcartridge.co.
          </Text>
          
          <Text style={styles.footer}>
            Thank you for shopping with Cleveland Cartridge Co.!
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default OrderConfirmationEmail;

const styles = {
  body: {
    backgroundColor: '#f6f6f6',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  container: {
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '5px',
    maxWidth: '600px',
  },
  heading: {
    fontSize: '24px',
    color: '#333',
    textAlign: 'center' as const,
    margin: '30px 0',
  },
  text: {
    fontSize: '16px',
    color: '#333',
    lineHeight: '24px',
    margin: '16px 0',
  },
  section: {
    margin: '24px 0',
    padding: '16px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
  },
  paymentInstructions: {
    margin: '24px 0',
    padding: '16px',
    backgroundColor: '#f0f7ff',
    borderRadius: '4px',
    border: '1px solid #d0e3ff',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    margin: '0 0 12px 0',
  },
  detail: {
    fontSize: '14px',
    color: '#555',
    margin: '6px 0',
  },
  importantDetail: {
    fontSize: '14px',
    color: '#333',
    margin: '12px 0',
    padding: '8px',
    backgroundColor: '#fffde7',
    borderRadius: '4px',
    border: '1px solid #ffe57f',
  },
  paymentAddress: {
    fontSize: '14px',
    color: '#333',
    margin: '6px 0',
    padding: '8px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    fontFamily: 'monospace',
    wordBreak: 'break-all' as const,
  },
  hr: {
    borderColor: '#e6e6e6',
    margin: '20px 0',
  },
  footer: {
    fontSize: '14px',
    color: '#888',
    textAlign: 'center' as const,
    margin: '30px 0 10px',
  },
};
