import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  MessageSquare,
  Mail,
  ArrowRight,
  CheckCircle2,
  MapPin,
} from 'lucide-react';
import {
  companyInfo,
  coreValues,
  companyStrengths,
  getWhatsAppInquiryUrl,
} from '../data/companyInfo';

export default function AboutPage() {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    document.title = `About us, ${companyInfo.legalTitle}`;
  }, []);

  const fadeUp = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.18 },
          transition: { duration: 0.52, delay, ease: [0.2, 0.8, 0.2, 1] },
        };

  return (
    <div className="pt-[74px] lg:pt-[84px]">
      {/* Page Hero */}
      <section className="bg-[#10243B] text-white py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 space-y-6">
              <motion.h1
                {...fadeUp(0)}
                className="font-bold text-white"
                style={{
                  fontSize: 'clamp(1.85rem, 4vw, 3.5rem)',
                  lineHeight: 1.06,
                }}
              >
                About Hillsview
              </motion.h1>
              <motion.p
                {...fadeUp(0.08)}
                className="text-[18px] sm:text-[20px] text-white/90 leading-relaxed max-w-[58ch]"
              >
                {companyInfo.legalTitle} is a construction and property management company in {companyInfo.location}.
              </motion.p>
              <motion.div
                {...fadeUp(0.14)}
                className="flex items-center gap-2.5 text-[15px] text-[#D5BC8A]"
              >
                <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{companyInfo.location}</span>
              </motion.div>
            </div>

            <motion.div
              {...fadeUp(0.12)}
              className="lg:col-span-5 aspect-[4/3] rounded-[8px] overflow-hidden bg-[#0D1B2A]"
            >
              <img
                src={`${import.meta.env.BASE_URL}assets/15.PNG`}
                alt="Commercial entrance portal with stone cladding"
                width="760"
                height="570"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Overview Mosaic */}
      <section className="py-20 sm:py-28 lg:py-36 bg-[#F7F8FA]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-[720px] space-y-5 mb-14">
            <motion.h2
              {...fadeUp(0)}
              className="font-bold text-[#14263D]"
              style={{
                fontSize: 'clamp(1.65rem, 3vw, 2.75rem)',
                lineHeight: 1.08,
              }}
            >
              Connecting construction and asset care
            </motion.h2>
            <motion.p
              {...fadeUp(0.08)}
              className="text-[18px] text-[#14263D] leading-relaxed"
            >
              When architectural design, site engineering, and facility management are split across disconnected firms, communication gaps cause site delays and rework. Hillsview manages all three with direct supervision.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Architectural Plate */}
            <motion.div
              {...fadeUp(0.1)}
              className="lg:col-span-8 bg-[#FFFFFF] rounded-[8px] overflow-hidden flex flex-col justify-between"
            >
              <div className="aspect-[16/10] w-full overflow-hidden bg-[#10243B]">
                <img
                  src={`${import.meta.env.BASE_URL}assets/3.PNG`}
                  alt="Architectural scale model and blueprints on studio table"
                  width="1000"
                  height="625"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 sm:p-8 space-y-3">
                <h3 className="text-[22px] font-semibold text-[#14263D]">
                  From studio blueprint to active site supervision
                </h3>
                <p className="text-[16px] text-[#667085] leading-relaxed">
                  Our team coordinates drawings, structural calculations, physical construction, and post-handover maintenance. Clients have one point of contact from foundation works to daily facility management.
                </p>
              </div>
            </motion.div>

            {/* Right Fact & Mission Tile */}
            <motion.div
              {...fadeUp(0.16)}
              className="lg:col-span-4 flex flex-col justify-between gap-6"
            >
              <div className="bg-[#14263D] text-white rounded-[8px] p-7 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-[22px] font-semibold text-[#D5BC8A]">
                    Our mission
                  </h3>
                  <p className="text-[16px] text-white/90 leading-relaxed">
                    To build and manage residential and commercial property in Lagos State through sound engineering, tested materials, and direct communication.
                  </p>
                </div>

                <div className="pt-4 space-y-3">
                  <h3 className="text-[22px] font-semibold text-[#D5BC8A]">
                    Our vision
                  </h3>
                  <p className="text-[16px] text-white/90 leading-relaxed">
                    To set a benchmark for on-time construction, structural safety, and accountable property management across Nigeria.
                  </p>
                </div>
              </div>

              {/* Verified Fact Sheet */}
              <div className="bg-[#FFFFFF] rounded-[8px] p-6 grid grid-cols-2 gap-4 text-[14px]">
                <div>
                  <p className="text-[#667085]">Company</p>
                  <p className="font-semibold text-[#14263D] mt-0.5">
                    {companyInfo.name}
                  </p>
                </div>
                <div>
                  <p className="text-[#667085]">Primary region</p>
                  <p className="font-semibold text-[#14263D] mt-0.5">
                    {companyInfo.location}
                  </p>
                </div>
                <div>
                  <p className="text-[#667085]">Core disciplines</p>
                  <p className="font-semibold text-[#14263D] mt-0.5">
                    8 integrated services
                  </p>
                </div>
                <div>
                  <p className="text-[#667085]">Direct channel</p>
                  <p className="font-semibold text-[#14263D] mt-0.5 tabular-nums">
                    {companyInfo.whatsappDisplay}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 sm:py-28 bg-[#FFFFFF]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-[640px] space-y-4 mb-14">
            <motion.h2
              {...fadeUp(0)}
              className="font-bold text-[#14263D]"
              style={{
                fontSize: 'clamp(1.65rem, 3vw, 2.75rem)',
                lineHeight: 1.08,
              }}
            >
              Core principles that guide our work
            </motion.h2>
            <motion.p
              {...fadeUp(0.08)}
              className="text-[17px] text-[#667085] leading-relaxed"
            >
              Four operating principles guide our site supervision and property management practice.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {coreValues.map((val, idx) => (
              <motion.div
                key={val.title}
                {...fadeUp((idx % 2) * 0.08)}
                className="bg-[#F7F8FA] rounded-[8px] p-7 sm:p-8 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    className="w-5 h-5 text-[#86652F] shrink-0"
                    aria-hidden="true"
                  />
                  <h3 className="text-[20px] font-semibold text-[#14263D]">
                    {val.title}
                  </h3>
                </div>
                <p className="text-[16px] text-[#667085] leading-relaxed">
                  {val.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Approach */}
      <section className="py-20 sm:py-28 bg-[#EEF1F4]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <motion.h2
                {...fadeUp(0)}
                className="font-bold text-[#14263D]"
                style={{
                  fontSize: 'clamp(1.65rem, 3vw, 2.75rem)',
                  lineHeight: 1.08,
                }}
              >
                How Hillsview approaches projects
              </motion.h2>
              <div className="space-y-4">
                {companyStrengths.map((item, idx) => (
                  <motion.div
                    key={item.title}
                    {...fadeUp(idx * 0.06)}
                    className="bg-[#FFFFFF] p-5 rounded-[8px] space-y-1.5"
                  >
                    <h3 className="text-[18px] font-semibold text-[#14263D]">
                      {item.title}
                    </h3>
                    <p className="text-[15px] text-[#667085] leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[4/5] rounded-[8px] overflow-hidden bg-[#10243B]">
                  <img
                    src={`${import.meta.env.BASE_URL}assets/1.PNG`}
                    alt="Hillsview engineer supervising structural concrete works on site"
                    width="500"
                    height="625"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[4/5] rounded-[8px] overflow-hidden bg-[#10243B]">
                  <img
                    src={`${import.meta.env.BASE_URL}assets/4.PNG`}
                    alt="Hillsview property management professional reviewing residential building maintenance"
                    width="500"
                    height="625"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Editable Placeholder */}
              <div className="bg-[#FFFFFF] p-6 rounded-[8px] space-y-2">
                <h3 className="text-[17px] font-semibold text-[#14263D]">
                  Corporate registry and leadership details
                </h3>
                <p className="text-[14px] text-[#667085] leading-relaxed">
                  [Corporate registration number, incorporation date, and executive profiles will be added upon client confirmation before public release.]
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Callout */}
      <section className="py-20 sm:py-24 bg-[#FFFFFF]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="bg-[#14263D] text-white rounded-[12px] p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-[600px] space-y-3">
              <h2
                className="font-bold text-white"
                style={{
                  fontSize: 'clamp(1.6rem, 2.8vw, 2.5rem)',
                  lineHeight: 1.08,
                }}
              >
                Work with Hillsview in Lagos
              </h2>
              <p className="text-[17px] text-white/85 leading-relaxed">
                Reach out on WhatsApp or email to discuss building construction, architectural design, or property management.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <a
                href={getWhatsAppInquiryUrl('partnering with Hillsview')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-[8px] bg-[#B89452] text-[#0D1B2A] text-[15px] font-semibold hover:bg-[#D5BC8A] transition-colors"
              >
                <MessageSquare className="w-4 h-4" aria-hidden="true" />
                <span>WhatsApp {companyInfo.whatsappDisplay}</span>
              </a>
              <a
                href={companyInfo.emailLink}
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-[8px] bg-[#10243B] text-white text-[15px] font-semibold hover:bg-[#0D1B2A] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#D5BC8A]" aria-hidden="true" />
                <span>Email us</span>
              </a>
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-[8px] bg-white text-[#14263D] text-[15px] font-semibold hover:bg-[#EEF1F4] transition-colors"
              >
                <span>Our services</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
