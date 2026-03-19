import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { servicesData, ServiceType } from '@/data/services';
import ServiceModal from './ServiceModal';

export default function Services() {
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);

  return (
    <section id="services" className="py-32 bg-slate-50 dark:bg-black relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <span className="text-blue-600 dark:text-blue-500 font-mono text-sm tracking-widest uppercase mb-4 block">Our Expertise</span>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">Services</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl text-lg">
            Comprehensive digital services tailored to your needs. We build the future, one pixel at a time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "group relative p-8 rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 hover:border-blue-500/30 dark:hover:border-blue-500/30 hover:bg-slate-50 dark:hover:bg-slate-900/80 transition-all overflow-hidden backdrop-blur-sm shadow-sm hover:shadow-md flex flex-col justify-between",
                service.className
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform border border-blue-500/10 dark:border-blue-500/20">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">{service.description}</p>
              </div>
              
              <div className="relative z-10 flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-white/10">
                <Link 
                  to={service.path} 
                  className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedService(service);
                  }}
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition-colors bg-blue-50 dark:bg-blue-500/10 px-3 py-1.5 rounded-full"
                >
                  Start Project
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ServiceModal 
        service={selectedService} 
        onClose={() => setSelectedService(null)} 
      />
    </section>
  );
}
