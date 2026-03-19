import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';
import { servicesData } from '@/data/services';

export default function Backend() {
  const service = servicesData.find(s => s.id === 'backend')!;
  
  return (
    <ServicePageTemplate
      service={service}
      description="We provide robust server-side solutions, API development, and database management. Our backend architecture is designed for scalability, security, and high performance, ensuring your application can handle growth and complex business logic with ease."
      benefits={[
        "RESTful & GraphQL APIs",
        "Database Design & Optimization",
        "Authentication & Authorization",
        "Cloud Infrastructure Setup",
        "Microservices Architecture",
        "Third-Party Integrations"
      ]}
    />
  );
}
