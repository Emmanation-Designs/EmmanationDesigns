import React from 'react';
import ServicePageTemplate from '@/components/ServicePageTemplate';
import { servicesData } from '@/data/services';

export default function VideoEditing() {
  const service = servicesData.find(s => s.id === 'video')!;
  
  return (
    <ServicePageTemplate
      service={service}
      description="We provide professional editing and motion graphics to bring your video content to life. Whether it's promotional videos, social media content, or corporate presentations, we craft compelling visual narratives that engage your audience and communicate your message clearly."
      benefits={[
        "Commercial & Promo Editing",
        "Social Media Reels & Shorts",
        "Motion Graphics & Animation",
        "Color Grading & Correction",
        "Audio Mixing & Sound Design",
        "Post-Production Services"
      ]}
    />
  );
}
