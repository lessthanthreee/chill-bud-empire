
import React from 'react';
import { Helmet } from 'react-helmet';

interface LocalBusinessProps {
  name: string;
  description: string;
  url: string;
  telephone?: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  images?: string[];
  priceRange?: string;
  openingHours?: string[];
}

export const LocalBusinessSchema: React.FC<LocalBusinessProps> = ({
  name,
  description,
  url,
  telephone,
  address,
  geo,
  images,
  priceRange,
  openingHours
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": url,
    name,
    description,
    url,
    telephone,
    address: {
      "@type": "PostalAddress",
      ...address
    },
    ...(geo && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: geo.latitude,
        longitude: geo.longitude
      }
    }),
    ...(images && { image: images }),
    ...(priceRange && { priceRange }),
    ...(openingHours && { openingHoursSpecification: openingHours })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

interface ProductProps {
  name: string;
  description: string;
  image: string;
  sku: string;
  brand?: string;
  offers: {
    price: number;
    priceCurrency: string;
    availability: string;
    url: string;
  }
}

export const ProductSchema: React.FC<ProductProps> = ({
  name,
  description,
  image,
  sku,
  brand,
  offers
}) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    sku,
    ...(brand && { brand: {
      "@type": "Brand",
      name: brand
    }}),
    offers: {
      "@type": "Offer",
      ...offers
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default { LocalBusinessSchema, ProductSchema };
