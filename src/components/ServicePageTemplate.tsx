import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import ServiceModal from '@/components/ServiceModal';
import { ServiceType } from '@/data/services';

interface ServicePageTemplateProps {
  service: ServiceType;
  description: string;
  benefits: string[];
  children?: React.ReactNode;
}

export default function ServicePageTemplate({ service, description, benefits, children }: ServicePageTemplateProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6">{service.title}</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mb-10 leading-relaxed">
            {description}
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

        {children}
      </div>

      <ServiceModal service={isModalOpen ? service : null} onClose={() => setIsModalOpen(false)} />
    </Layout>
  );
}
