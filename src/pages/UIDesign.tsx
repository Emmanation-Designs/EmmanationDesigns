import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';
import { servicesData } from '@/data/services';

export default function UIDesign() {
  const service = servicesData.find(s => s.id === 'uiux')!;
  
  return (
    <ServicePageTemplate
      service={service}
      description="We provide user-centric interfaces and experiences designed for clarity, usability, and aesthetic appeal. Our UI/UX process involves deep research, wireframing, and prototyping to ensure the final product not only looks stunning but also solves real user problems effectively."
      benefits={[
        "User Research & Personas",
        "Wireframing & Prototyping",
        "High-Fidelity Mockups",
        "Design Systems & Guidelines",
        "Usability Testing",
        "Interaction Design"
      ]}
    />
  );
}
