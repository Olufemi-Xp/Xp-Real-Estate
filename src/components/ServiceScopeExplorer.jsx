import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';
import {
  companyInfo,
  servicesData,
  getWhatsAppInquiryUrl,
  getEmailInquiryUrl,
} from '../data/companyInfo';
import ServiceIcon from './ServiceIcon';
import TypingEffect from '@/components/ui/typing-effect';

function WhatsAppIcon({ className = 'w-4 h-4' }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.257.59 4.46 1.71 6.404L3.2 28.8l6.56-1.72a12.74 12.74 0 0 0 6.244 1.622h.006c7.058 0 12.79-5.74 12.79-12.8 0-3.42-1.33-6.636-3.748-9.054A12.716 12.716 0 0 0 16.004 3.2Zm0 23.34h-.005a10.58 10.58 0 0 1-5.394-1.477l-.387-.23-4.012 1.052 1.07-3.91-.252-.402a10.57 10.57 0 0 1-1.624-5.637c0-5.847 4.757-10.604 10.608-10.604 2.833 0 5.495 1.104 7.497 3.108a10.535 10.535 0 0 1 3.105 7.5c0 5.85-4.756 10.6-10.606 10.6Zm5.818-7.94c-.318-.16-1.887-.931-2.18-1.038-.292-.106-.505-.16-.718.16-.212.319-.823 1.037-1.01 1.25-.185.212-.371.239-.69.08-.318-.16-1.345-.496-2.563-1.582-.947-.845-1.587-1.889-1.773-2.208-.186-.319-.02-.491.14-.65.143-.143.318-.372.478-.558.159-.186.212-.319.318-.532.107-.212.053-.398-.026-.558-.08-.16-.718-1.729-.983-2.367-.259-.621-.522-.537-.718-.547l-.61-.01c-.213 0-.559.08-.851.399-.292.319-1.116 1.09-1.116 2.66 0 1.568 1.143 3.084 1.302 3.297.16.212 2.25 3.434 5.45 4.815.761.329 1.355.525 1.819.672.764.243 1.46.208 2.01.126.613-.092 1.887-.771 2.153-1.516.266-.744.266-1.382.186-1.515-.08-.133-.292-.213-.61-.373Z" />
    </svg>
  );
}

const PROJECT_STAGES = [
  {
    id: 'planning',
    label: 'Feasibility and planning',
    note: 'Early-stage land evaluation, architectural concept, or pre-construction scope.',
  },
  {
    id: 'execution',
    label: 'Active build and engineering',
    note: 'Site mobilisation, structural construction, civil works, or building renovation.',
  },
  {
    id: 'management',
    label: 'Asset operations and leasing',
    note: 'Ongoing property management, facility maintenance, sales, or tenant coordination.',
  },
];

export default function ServiceScopeExplorer() {
  const [selectedServiceId, setSelectedServiceId] = useState(servicesData[0].id);
  const [selectedStageId, setSelectedStageId] = useState(PROJECT_STAGES[0].id);

  const activeService =
    servicesData.find((s) => s.id === selectedServiceId) || servicesData[0];
  const activeStage =
    PROJECT_STAGES.find((st) => st.id === selectedStageId) || PROJECT_STAGES[0];

  const inquirySummary = `${activeService.title} (${activeStage.label}) in ${companyInfo.location}`;
  const whatsappHref = getWhatsAppInquiryUrl(inquirySummary);
  const emailHref = getEmailInquiryUrl(
    `Enquiry, ${activeService.title} (${activeStage.label})`,
    `Hello Hillsview,\n\nI would like to discuss a requirement for ${activeService.title} (${activeStage.label}) in ${companyInfo.location}.\n\nPlease let me know the next steps.`
  );

  return (
    <div
      data-ui="scope-configurator"
      className="bg-[#FFFFFF] rounded-[12px] p-6 sm:p-8 lg:p-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        {/* Left Column: Discipline & Stage Selector — Stretches to fill full column height */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-[24px] sm:text-[28px] font-semibold text-[#14263D]">
              <TypingEffect
                text="Configure your service enquiry"
                speed={38}
                delay={150}
                cursorColor="#B89452"
              />
            </h3>
            <p className="text-[16px] text-[#667085]">
              Select a Hillsview discipline and project stage to review scope deliverables and open a pre-addressed WhatsApp or email conversation.
            </p>
          </div>

          {/* 8 Service Buttons — All share uniform light/transparent background & animate to Deep Navy on Hover */}
          <div className="flex-1 flex flex-col justify-between space-y-3">
            <p className="text-[14px] font-semibold text-[#14263D]">
              Select service discipline
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 flex-1">
              {servicesData.map((service) => {
                const isSelected = service.id === activeService.id;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setSelectedServiceId(service.id)}
                    aria-pressed={isSelected}
                    className="group flex items-center gap-3.5 w-full text-left px-4 py-4 rounded-[8px] text-[15px] font-medium bg-[#F7F8FA] text-[#14263D] hover:bg-[#10243B] hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    <ServiceIcon
                      name={service.icon}
                      className="w-5 h-5 shrink-0 text-[#86652F] group-hover:text-[#D5BC8A] transition-colors duration-300"
                    />
                    <span className="leading-snug">{service.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Project Stage Selector — All share uniform light/transparent background & animate to Deep Navy on Hover */}
          <div className="space-y-3">
            <p className="text-[14px] font-semibold text-[#14263D]">
              Select project stage
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PROJECT_STAGES.map((stage) => {
                const isSelected = stage.id === activeStage.id;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => setSelectedStageId(stage.id)}
                    aria-pressed={isSelected}
                    className="px-4 py-3.5 rounded-[8px] text-left text-[14px] font-medium bg-[#F7F8FA] text-[#14263D] hover:bg-[#10243B] hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    {stage.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Live Architectural Plate & Direct Dispatch */}
        <div className="lg:col-span-6 bg-[#F7F8FA] rounded-[8px] overflow-hidden flex flex-col justify-between">
          <div className="aspect-[16/10] w-full overflow-hidden bg-[#10243B]">
            <img
              src={activeService.image}
              alt={activeService.imageAlt}
              width="800"
              height="500"
              loading="lazy"
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          </div>

          <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-[20px] sm:text-[22px] font-semibold text-[#14263D]">
                    {activeService.title}
                  </h4>
                  <span className="px-2.5 py-1 rounded-[4px] bg-[#EEF1F4] text-[#14263D] text-[13px] font-medium">
                    {activeStage.label}
                  </span>
                </div>
                <p className="text-[15px] text-[#667085] leading-relaxed">
                  {activeService.description}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-[14px] font-semibold text-[#14263D]">
                  Core scope deliverables
                </p>
                <ul className="space-y-1.5">
                  {activeService.deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[14px] text-[#14263D]"
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
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-1 inline-flex items-center justify-center gap-2.5 h-12 px-5 rounded-[8px] bg-[#FFFFFF] text-[#14263D] text-[14px] font-semibold hover:bg-[#10243B] hover:text-white transition-colors duration-300"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366] group-hover:text-[#25D366] shrink-0" />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href={emailHref}
                className="group flex-1 inline-flex items-center justify-center gap-2.5 h-12 px-5 rounded-[8px] bg-[#FFFFFF] text-[#14263D] text-[14px] font-semibold hover:bg-[#10243B] hover:text-white transition-colors duration-300"
              >
                <Mail
                  className="w-4 h-4 text-[#86652F] group-hover:text-[#D5BC8A] transition-colors shrink-0"
                  aria-hidden="true"
                />
                <span>Send email</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
