import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Maximize2, Play, MessageSquare, Mail } from 'lucide-react';
import {
  companyInfo,
  projectsPortfolio,
  getWhatsAppInquiryUrl,
} from '../data/companyInfo';
import LightboxModal from '../components/LightboxModal';

const DISCIPLINE_FILTERS = [
  'All works',
  'Building and civil works',
  'Residential development',
  'Architectural and interior design',
  'Property and facility management',
];

export default function ProjectsPage() {
  const prefersReducedMotion = useReducedMotion();
  const [selectedFilter, setSelectedFilter] = useState('All works');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    document.title = `Projects portfolio, ${companyInfo.legalTitle}`;
  }, []);

  const filteredItems =
    selectedFilter === 'All works'
      ? projectsPortfolio
      : projectsPortfolio.filter((item) => item.discipline === selectedFilter);

  const fadeUp = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.12 },
          transition: { duration: 0.5, delay, ease: [0.2, 0.8, 0.2, 1] },
        };

  return (
    <div className="pt-[74px] lg:pt-[84px]">
      {/* Page Hero */}
      <section className="bg-[#10243B] text-white py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="max-w-[760px] space-y-6">
            <motion.h1
              {...fadeUp(0)}
              className="font-bold text-white"
              style={{
                fontSize: 'clamp(1.85rem, 4vw, 3.5rem)',
                lineHeight: 1.06,
              }}
            >
              Project and architectural portfolio
            </motion.h1>
            <motion.p
              {...fadeUp(0.08)}
              className="text-[18px] sm:text-[20px] text-white/90 leading-relaxed"
            >
              Explore Hillsview's visual archive of structural site execution, architectural design visualisations, interior fit-outs, and residential estate developments.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Architectural video presentation */}
      <section className="py-16 sm:py-24 bg-[#FFFFFF]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#EEF1F4] text-[#14263D] text-[13px] font-semibold">
                <Play className="w-3.5 h-3.5 text-[#86652F]" aria-hidden="true" />
                <span>Architectural video presentation</span>
              </div>
              <h2
                className="font-bold text-[#14263D]"
                style={{
                  fontSize: 'clamp(1.55rem, 2.8vw, 2.5rem)',
                  lineHeight: 1.08,
                }}
              >
                Spatial form and estate presentation
              </h2>
              <p className="text-[16px] text-[#667085] leading-relaxed">
                Our architectural and development presentations illustrate spatial flow, facade materials, and environmental context before and during site execution.
              </p>
              <div className="pt-2">
                <a
                  href={getWhatsAppInquiryUrl('discussing a new architectural or construction project')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-[8px] bg-[#14263D] text-white text-[14px] font-semibold hover:bg-[#10243B] transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-[#D5BC8A]" aria-hidden="true" />
                  <span>Discuss your project brief</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="aspect-[16/9] w-full rounded-[8px] overflow-hidden bg-[#0D1B2A]">
                <video
                  src={companyInfo.heroVideo}
                  poster={companyInfo.heroPoster}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                >
                  Your browser does not support embedded HTML5 video.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filterable Project Image Gallery */}
      <section className="py-16 sm:py-24 lg:py-32 bg-[#F7F8FA]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              <h2
                className="font-bold text-[#14263D]"
                style={{
                  fontSize: 'clamp(1.65rem, 3vw, 2.75rem)',
                  lineHeight: 1.08,
                }}
              >
                Visual portfolio archive
              </h2>
              <p className="text-[16px] text-[#667085]">
                Select any photograph to inspect full-size architectural and engineering details.
              </p>
            </div>

            {/* Category Filter Buttons */}
            <div
              role="group"
              aria-label="Filter portfolio by discipline"
              className="flex flex-wrap gap-2"
            >
              {DISCIPLINE_FILTERS.map((filter) => {
                const isActive = selectedFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setSelectedFilter(filter)}
                    aria-pressed={isActive}
                    className={`px-4 py-2.5 rounded-[8px] text-[14px] font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#14263D] text-white'
                        : 'bg-[#FFFFFF] text-[#14263D] hover:bg-[#EEF1F4]'
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Responsive Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
            {filteredItems.map((item, idx) => (
              <motion.figure
                key={item.id}
                {...fadeUp((idx % 3) * 0.06)}
                className="bg-[#FFFFFF] rounded-[8px] overflow-hidden flex flex-col justify-between group"
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  aria-label={`View full size: ${item.title}`}
                  className="relative aspect-[16/10] w-full overflow-hidden bg-[#10243B] text-left cursor-pointer"
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    width="640"
                    height="400"
                    loading="lazy"
                    className="w-full h-full object-cover media-zoom"
                  />
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-[#0D1B2A]/85 text-white text-[13px] font-medium">
                    <Maximize2 className="w-3.5 h-3.5 text-[#D5BC8A]" aria-hidden="true" />
                    <span>Inspect</span>
                  </span>
                </button>

                <figcaption className="p-6 flex flex-col justify-between flex-1 space-y-4">
                  <div className="space-y-2">
                    <span className="inline-block px-2.5 py-1 rounded-[4px] bg-[#EEF1F4] text-[#14263D] text-[13px] font-medium">
                      {item.category}
                    </span>
                    <h3 className="text-[19px] font-semibold text-[#14263D]">
                      {item.title}
                    </h3>
                    <p className="text-[15px] text-[#667085] leading-relaxed">
                      {item.caption}
                    </p>
                  </div>

                  <div className="pt-1 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(idx)}
                      className="text-[14px] font-semibold text-[#14263D] hover:text-[#86652F] transition-colors cursor-pointer"
                    >
                      Open full image
                    </button>
                    <a
                      href={getWhatsAppInquiryUrl(`${item.title} (${item.category})`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[14px] font-medium text-[#86652F] hover:text-[#14263D] transition-colors"
                    >
                      Enquire
                    </a>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Contact Banner */}
      <section className="py-16 sm:py-24 bg-[#FFFFFF]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="bg-[#10243B] text-white rounded-[12px] p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-[580px] space-y-3">
              <h2
                className="font-bold text-white"
                style={{
                  fontSize: 'clamp(1.55rem, 2.8vw, 2.4rem)',
                  lineHeight: 1.08,
                }}
              >
                Planning a similar development?
              </h2>
              <p className="text-[16px] text-white/85 leading-relaxed">
                Contact Hillsview directly on WhatsApp or email to discuss architectural design, building construction, or property management in {companyInfo.location}.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <a
                href={getWhatsAppInquiryUrl('a project similar to your portfolio')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-[8px] bg-[#B89452] text-[#0D1B2A] text-[15px] font-semibold hover:bg-[#D5BC8A] transition-colors"
              >
                <MessageSquare className="w-4 h-4" aria-hidden="true" />
                <span>WhatsApp {companyInfo.whatsappDisplay}</span>
              </a>
              <a
                href={companyInfo.emailLink}
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-[8px] bg-[#14263D] text-white text-[15px] font-semibold hover:bg-[#0D1B2A] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#D5BC8A]" aria-hidden="true" />
                <span>Email {companyInfo.email}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <LightboxModal
        items={filteredItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
}
