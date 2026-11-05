import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { MessageSquare, Mail, CheckCircle2 } from 'lucide-react';
import {
  companyInfo,
  servicesData,
  getWhatsAppInquiryUrl,
  getEmailInquiryUrl,
} from '../data/companyInfo';
import ServiceIcon from '../components/ServiceIcon';
import ServiceScopeExplorer from '../components/ServiceScopeExplorer';

export default function ServicesPage() {
  const prefersReducedMotion = useReducedMotion();
  const { hash } = useLocation();

  useEffect(() => {
    document.title = `Our services, ${companyInfo.legalTitle}`;
  }, []);

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [hash]);

  const fadeUp = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.15 },
          transition: { duration: 0.52, delay, ease: [0.2, 0.8, 0.2, 1] },
        };

  return (
    <div className="pt-[74px] lg:pt-[84px]">
      {/* Page Hero */}
      <section className="bg-[#10243B] text-white py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-[780px] space-y-6">
            <motion.h1
              {...fadeUp(0)}
              className="font-bold text-white"
              style={{
                fontSize: 'clamp(1.85rem, 4vw, 3.5rem)',
                lineHeight: 1.06,
              }}
            >
              Construction and property management services
            </motion.h1>
            <motion.p
              {...fadeUp(0.08)}
              className="text-[18px] sm:text-[20px] text-white/90 leading-relaxed"
            >
              Hillsview provides eight integrated disciplines covering residential, commercial, and institutional property across {companyInfo.location}.
            </motion.p>
          </div>

          {/* Quick Jump Directory for All 8 Services */}
          <motion.div
            {...fadeUp(0.14)}
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
          >
            {servicesData.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="flex items-center gap-3 px-4 py-3.5 rounded-[8px] bg-[#0D1B2A] text-white hover:bg-[#B89452] hover:text-[#0D1B2A] transition-colors text-[14px] font-medium"
              >
                <ServiceIcon
                  name={service.icon}
                  className="w-4 h-4 text-[#D5BC8A] shrink-0"
                />
                <span className="truncate">{service.title}</span>
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Detailed Editorial Sections for All 8 Services */}
      <section className="py-16 sm:py-24 lg:py-32 bg-[#F7F8FA]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12 space-y-16 sm:space-y-24">
          {servicesData.map((service, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.article
                key={service.id}
                id={service.id}
                {...fadeUp(0.05)}
                className="scroll-mt-28 bg-[#FFFFFF] rounded-[12px] overflow-hidden p-6 sm:p-10 lg:p-12"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Image Column */}
                  <div
                    className={`lg:col-span-6 ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div className="aspect-[16/10] w-full rounded-[8px] overflow-hidden bg-[#10243B]">
                      <img
                        src={service.image}
                        alt={service.imageAlt}
                        width="860"
                        height="540"
                        loading="lazy"
                        className="w-full h-full object-cover media-zoom"
                      />
                    </div>
                  </div>

                  {/* Content Column */}
                  <div
                    className={`lg:col-span-6 space-y-6 ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className="flex items-center gap-3 text-[#86652F]">
                      <div className="w-11 h-11 rounded-[8px] bg-[#F7F8FA] flex items-center justify-center text-[#86652F] shrink-0">
                        <ServiceIcon name={service.icon} className="w-5 h-5" />
                      </div>
                      <h2
                        className="font-bold text-[#14263D]"
                        style={{
                          fontSize: 'clamp(1.45rem, 2.5vw, 2.15rem)',
                          lineHeight: 1.1,
                        }}
                      >
                        {service.title}
                      </h2>
                    </div>

                    <p className="text-[16px] sm:text-[17px] text-[#14263D] leading-relaxed">
                      {service.description}
                    </p>

                    {/* Key Deliverables */}
                    <div className="space-y-2.5">
                      <p className="text-[14px] font-semibold text-[#14263D]">
                        Scope capabilities
                      </p>
                      <ul className="space-y-2">
                        {service.deliverables.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-[15px] text-[#667085]"
                          >
                            <CheckCircle2
                              className="w-4 h-4 text-[#86652F] shrink-0 mt-1"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Customer Benefit Box */}
                    <div className="bg-[#F7F8FA] p-4 rounded-[8px] space-y-1">
                      <p className="text-[13px] font-semibold text-[#86652F]">
                        Client value and project benefit
                      </p>
                      <p className="text-[15px] text-[#14263D] leading-relaxed">
                        {service.benefit}
                      </p>
                    </div>

                    {/* Direct Service Inquiry Actions */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <a
                        href={getWhatsAppInquiryUrl(service.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-[8px] bg-[#14263D] text-white text-[14px] font-semibold hover:bg-[#10243B] transition-colors"
                      >
                        <MessageSquare
                          className="w-4 h-4 text-[#D5BC8A]"
                          aria-hidden="true"
                        />
                        <span>Enquire on WhatsApp</span>
                      </a>
                      <a
                        href={getEmailInquiryUrl(
                          `Service enquiry, ${service.title}`,
                          `Hello Hillsview,\n\nI would like to enquire about your ${service.title} service in ${companyInfo.location}.`
                        )}
                        className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-[8px] bg-[#EEF1F4] text-[#14263D] text-[14px] font-semibold hover:bg-[#E4E8EE] transition-colors"
                      >
                        <Mail className="w-4 h-4 text-[#86652F]" aria-hidden="true" />
                        <span>Email enquiry</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Interactive Scope Explorer Section */}
      <section className="py-16 sm:py-24 bg-[#EEF1F4]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <ServiceScopeExplorer />
        </div>
      </section>
    </div>
  );
}
