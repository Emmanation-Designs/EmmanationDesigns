import { Code, Server, Palette, Layout, Video } from 'lucide-react';
import React from 'react';

export interface ServiceType {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  fields: string[];
  className?: string;
  path: string;
}

export const servicesData: ServiceType[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: Code,
    description: 'Responsive, interactive, and performant user interfaces built with modern frameworks like React and Next.js.',
    fields: ['Tech Stack Preference', 'Existing Design?'],
    className: "md:col-span-2 md:row-span-2",
    path: '/frontend'
  },
  {
    id: 'uiux',
    title: 'UI/UX Design',
    icon: Layout,
    description: 'User-centric interfaces and experiences designed for clarity, usability, and aesthetic appeal.',
    fields: ['Target Audience', 'Competitor Examples'],
    className: "md:col-span-1 md:row-span-1",
    path: '/ui-design'
  },
  {
    id: 'graphic',
    title: 'Graphic Design',
    icon: Palette,
    description: 'Impactful branding, logos, and marketing materials that tell your story.',
    fields: ['Design Style/References', 'Brand Guidelines?'],
    className: "md:col-span-1 md:row-span-1",
    path: '/graphic-design'
  },
  {
    id: 'backend',
    title: 'Backend Development',
    icon: Server,
    description: 'Robust server-side solutions, API development, and database management.',
    fields: ['Tech Stack Preference', 'Database Requirements'],
    className: "md:col-span-1 md:row-span-1",
    path: '/backend'
  },
  {
    id: 'video',
    title: 'Video Editing & Motion',
    icon: Video,
    description: 'Professional editing and motion graphics to bring your video content to life.',
    fields: ['Footage Type', 'Desired Duration'],
    className: "md:col-span-1 md:row-span-1",
    path: '/video-editing'
  }
];
