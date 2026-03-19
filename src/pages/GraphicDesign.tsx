import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import ServiceModal from '@/components/ServiceModal';
import { servicesData } from '@/data/services';

export default function GraphicDesign() {
  const service = servicesData.find(s => s.id === 'graphic')!;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const graphicCount = 10;
  const graphics = Array.from({ length: graphicCount }, (_, i) => `/portfolio/graphics/design${i + 1}.png`);

  const benefits = [
    "Brand Identity & Logo Design",
    "Marketing Materials & Print Design",
    "Social Media Graphics",
    "Packaging & Merchandise Design",
    "Typography & Color Theory",
    "High-Resolution Vector Assets"
  ];

  return (
    <Layout>
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Link to="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 border border-blue-500/10 dark:border-blue-500/20">
            <service.icon className="w-8 h-8" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6">Graphic Design</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mb-10 leading-relaxed">
            We provide impactful branding, logos, and marketing materials that tell your story. Our graphic design services are tailored to elevate your brand's visual identity, ensuring consistency and professionalism across all touchpoints. From digital assets to print materials, we create designs that resonate with your target audience and leave a lasting impression.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-blue-900/20"
          >
            Start this service
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">What We Provide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5">
                <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0" />
                <span className="text-slate-700 dark:text-slate-300 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Featured Designs</h2>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {graphics.map((src, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.02 }}
                className="relative rounded-2xl overflow-hidden cursor-pointer group break-inside-avoid shadow-sm border border-slate-200 dark:border-white/10"
                onClick={() => setSelectedImage(src)}
              >
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={src} 
                  alt={`Graphic Design ${index + 1}`} 
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://picsum.photos/seed/graphic${index}/800/1000`;
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-[110] p-3 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-colors border border-white/10"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Selected Design"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <ServiceModal service={isModalOpen ? service : null} onClose={() => setIsModalOpen(false)} />
    </Layout>
  );
}
