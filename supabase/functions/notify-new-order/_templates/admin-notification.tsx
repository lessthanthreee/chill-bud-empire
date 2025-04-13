
import * as React from 'npm:react@18.3.1'
import { 
  Body, 
  Container, 
  Head, 
  Heading, 
  Html, 
  Text,
  Section,
  Hr
} from 'npm:@react-email/components@0.0.12'

interface AdminNotificationEmailProps {
  orderData: {
    id: string;
    customerName?: string;
    customer_name?: string;
    customerEmail?: string;
    customer_email?: string;
    order_total: number;
    payment_method?: string;
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
}

const AdminNotificationEmail: React.FC<AdminNotificationEmailProps> = ({ orderData }) => {
  // Handle different property names in the orderData
  const customerName = orderData.customerName || orderData.customer_name || 'Customer';
  const customerEmail = orderData.customerEmail || orderData.customer_email || 'N/A';
  const orderId = orderData.id.substring(0, 8);

  return (
    <Html>
      <Head />
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>New Order Received</Heading>
          
          <Section style={styles.section}>
            <Text style={styles.sectionTitle}>Order Details</Text>
            <Text style={styles.detail}>Order ID: #{orderId}</Text>
            <Text style={styles.detail}>Order Total: ${orderData.order_total.toFixed(2)}</Text>
            {orderData.payment_method && (
              <Text style={styles.detail}>Payment Method: {orderData.payment_method}</Text>
            )}
          </Section>
          
          <Section style={styles.section}>
            <Text style={styles.sectionTitle}>Customer Information</Text>
            <Text style={styles.detail}>Name: {customerName}</Text>
            <Text style={styles.detail}>Email: {customerEmail}</Text>
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
          
          {orderData.items && orderData.items.length > 0 && (
            <Section style={styles.section}>
              <Text style={styles.sectionTitle}>Items Ordered</Text>
              {orderData.items.map((item, index) => (
                <Text key={index} style={styles.detail}>
                  {item.quantity}x {item.name || `Product ID: ${item.product_id.substring(0, 8)}`} - ${item.price.toFixed(2)}
                </Text>
              ))}
            </Section>
          )}
          
          <Hr style={styles.hr} />
          
          <Text style={styles.footer}>
            This is an automated notification from Cleveland Cartridge Co.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default AdminNotificationEmail;

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
  section: {
    margin: '24px 0',
    padding: '16px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
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
