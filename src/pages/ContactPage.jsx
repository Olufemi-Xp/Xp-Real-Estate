import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  MessageSquare,
  Mail,
  MapPin,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import {
  companyInfo,
  servicesData,
  getWhatsAppInquiryUrl,
  getEmailInquiryUrl,
} from '../data/companyInfo';
import ServiceScopeExplorer from '../components/ServiceScopeExplorer';

export default function ContactPage() {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    document.title = `Contact Hillsview, ${companyInfo.legalTitle}`;
  }, []);

  const fadeUp = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.15 },
          transition: { duration: 0.5, delay, ease: [0.2, 0.8, 0.2, 1] },
        };

  return (
    <div className="pt-[74px] lg:pt-[84px]">
      {/* Page Hero */}
      <section className="bg-[#10243B] text-white py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-[720px] space-y-5">
            <motion.h1
              {...fadeUp(0)}
              className="font-bold text-white"
              style={{
                fontSize: 'clamp(1.85rem, 4vw, 3.5rem)',
                lineHeight: 1.06,
              }}
            >
              Contact Hillsview
            </motion.h1>
            <motion.p
              {...fadeUp(0.08)}
              className="text-[18px] sm:text-[20px] text-white/90 leading-relaxed"
            >
              Connect directly with our team in {companyInfo.location} via official WhatsApp or email for construction, architectural design, and real estate management enquiries.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Primary Contact Channels */}
      <section className="py-16 sm:py-24 lg:py-28 bg-[#F7F8FA]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: WhatsApp direct Channel */}
            <motion.div
              {...fadeUp(0)}
              className="bg-[#FFFFFF] rounded-[12px] p-7 sm:p-8 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-[8px] bg-[#EAF5EF] text-[#176B45] flex items-center justify-center">
                  <MessageSquare className="w-6 h-6" aria-hidden="true" />
                </div>
                <div className="space-y-1.5">
                  <h2 className="text-[22px] font-bold text-[#14263D]">
                    WhatsApp direct
                  </h2>
                  <p className="text-[15px] text-[#667085] leading-relaxed">
                    Start an immediate conversation with Hillsview on desktop or mobile.
                  </p>
                </div>
                <div className="pt-1">
                  <p className="text-[13px] text-[#667085]">Official WhatsApp number</p>
                  <p className="text-[22px] font-bold text-[#14263D] tabular-nums mt-0.5">
                    {companyInfo.whatsappDisplay}
                  </p>
                  <p className="text-[13px] text-[#667085] tabular-nums">
                    International: {companyInfo.whatsappInternational}
                  </p>
                </div>
              </div>

              <a
                href={getWhatsAppInquiryUrl('a construction or real estate project')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 h-12 px-6 rounded-[8px] bg-[#14263D] text-white text-[15px] font-semibold hover:bg-[#10243B] transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#D5BC8A]" aria-hidden="true" />
                <span>Open WhatsApp chat</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </motion.div>

            {/* Card 2: Official Email Channel */}
            <motion.div
              {...fadeUp(0.08)}
              className="bg-[#FFFFFF] rounded-[12px] p-7 sm:p-8 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-[8px] bg-[#F5F0E6] text-[#86652F] flex items-center justify-center">
                  <Mail className="w-6 h-6" aria-hidden="true" />
                </div>
                <div className="space-y-1.5">
                  <h2 className="text-[22px] font-bold text-[#14263D]">
                    Email correspondence
                  </h2>
                  <p className="text-[15px] text-[#667085] leading-relaxed">
                    Send project briefs, architectural requirements, or property management enquiries by email.
                  </p>
                </div>
                <div className="pt-1">
                  <p className="text-[13px] text-[#667085]">Official email address</p>
                  <p className="text-[18px] sm:text-[20px] font-bold text-[#14263D] break-all mt-0.5">
                    {companyInfo.email}
                  </p>
                </div>
              </div>

              <a
                href={getEmailInquiryUrl(
                  'Project enquiry, Hillsview',
                  'Hello Hillsview,\n\nI would like to make an enquiry regarding your construction and real estate management services in Lagos State.'
                )}
                className="w-full inline-flex items-center justify-center gap-2 h-12 px-6 rounded-[8px] bg-[#B89452] text-[#0D1B2A] text-[15px] font-semibold hover:bg-[#D5BC8A] transition-colors"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>Send an email</span>
              </a>
            </motion.div>

            {/* Card 3: Business location */}
            <motion.div
              {...fadeUp(0.16)}
              className="bg-[#FFFFFF] rounded-[12px] p-7 sm:p-8 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-[8px] bg-[#EEF1F4] text-[#14263D] flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#86652F]" aria-hidden="true" />
                </div>
                <div className="space-y-1.5">
                  <h2 className="text-[22px] font-bold text-[#14263D]">
                    Business location
                  </h2>
                  <p className="text-[15px] text-[#667085] leading-relaxed">
                    Serving residential, commercial, and institutional clients across Lagos State.
                  </p>
                </div>
                <div className="pt-1">
                  <p className="text-[13px] text-[#667085]">Operating region</p>
                  <p className="text-[20px] font-bold text-[#14263D] mt-0.5">
                    {companyInfo.location}
                  </p>
                </div>
              </div>

              <div className="bg-[#F7F8FA] p-4 rounded-[8px] text-[14px] text-[#667085]">
                Schedule site visits and project consultations directly via WhatsApp or email.
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Scope Dispatcher (Direct Pre-Addressed Contact Builder) */}
      <section className="py-16 sm:py-24 bg-[#EEF1F4]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <ServiceScopeExplorer />
        </div>
      </section>

      {/* Direct Topic Links by Service */}
      <section className="py-16 sm:py-24 bg-[#FFFFFF]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-[640px] space-y-3 mb-10">
            <h2
              className="font-bold text-[#14263D]"
              style={{
                fontSize: 'clamp(1.55rem, 2.8vw, 2.4rem)',
                lineHeight: 1.08,
              }}
            >
              Enquire by specific service
            </h2>
            <p className="text-[16px] text-[#667085]">
              Select any service below to open a pre-addressed WhatsApp conversation with our team.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {servicesData.map((service) => (
              <a
                key={service.id}
                href={getWhatsAppInquiryUrl(service.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F7F8FA] hover:bg-[#EEF1F4] rounded-[8px] p-5 flex flex-col justify-between gap-4 transition-colors"
              >
                <div className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="w-4 h-4 text-[#86652F] shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <span className="text-[16px] font-semibold text-[#14263D]">
                    {service.title}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#86652F]">
                  <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Enquire on WhatsApp</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
