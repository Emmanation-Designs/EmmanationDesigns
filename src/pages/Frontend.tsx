import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';
import { servicesData } from '@/data/services';

export default function Frontend() {
  const service = servicesData.find(s => s.id === 'frontend')!;
  
  return (
    <ServicePageTemplate
      service={service}
      description="We provide responsive, interactive, and performant user interfaces built with modern frameworks like React and Next.js. Our frontend development focuses on delivering seamless user experiences across all devices, ensuring your application is not only beautiful but also highly functional and accessible."
      benefits={[
        "Single Page Applications (SPAs)",
        "Responsive Web Design",
        "Performance Optimization",
        "Interactive Animations",
        "Accessibility (a11y) Compliance",
        "Cross-Browser Compatibility"
      ]}
    />
  );
}
