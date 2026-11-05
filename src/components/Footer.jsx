import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { companyInfo, servicesData, getWhatsAppInquiryUrl } from '../data/companyInfo';
import { FooterWordmark } from '@/components/prestigeui/footer-wordmark';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#10243B] text-white overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12 pt-16 pb-10 lg:pt-24 lg:pb-12">
        {/* Top Row: Brand Identity, Navigation Columns, and Back to Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand & Location */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" aria-label="Hillsview Home" className="inline-block">
              <img
                src={companyInfo.logoLight}
                alt="Hillsview Construction and Real Estate Management"
                width="164"
                height="58"
                loading="lazy"
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-[16px] text-white/80 leading-relaxed max-w-[38ch]">
              {companyInfo.supportingCopy}
            </p>
            <div className="flex items-center gap-2.5 text-[15px] text-[#D5BC8A]">
              <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{companyInfo.location}</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-[15px] font-semibold text-white">Navigation</p>
            <ul className="space-y-2.5 text-[15px] text-white/80">
              <li>
                <Link to="/" className="hover:text-[#D5BC8A] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#D5BC8A] transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#D5BC8A] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-[#D5BC8A] transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#D5BC8A] transition-colors">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Core Services Directory */}
          <div className="lg:col-span-4 space-y-4">
            <p className="text-[15px] font-semibold text-white">Core disciplines</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 text-[14px] text-white/80">
              {servicesData.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services#${service.id}`}
                    className="hover:text-[#D5BC8A] transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Direct Contact Channels */}
          <div className="lg:col-span-2 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <p className="text-[15px] font-semibold text-white">Direct contact</p>
              <a
                href={getWhatsAppInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[15px] text-white/85 hover:text-[#D5BC8A] transition-colors tabular-nums"
              >
                <MessageSquare className="w-4 h-4 text-[#D5BC8A] shrink-0" aria-hidden="true" />
                <span>{companyInfo.whatsappDisplay}</span>
              </a>
              <a
                href={companyInfo.emailLink}
                className="flex items-center gap-2 text-[15px] text-white/85 hover:text-[#D5BC8A] transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-[#D5BC8A] shrink-0" aria-hidden="true" />
                <span>{companyInfo.email}</span>
              </a>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="self-start inline-flex items-center gap-1.5 text-[14px] text-[#D5BC8A] hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Green Real Estate Landscape Banner with Centered Hillsview Logo */}
        <div className="mt-14 relative h-[180px] sm:h-[220px] lg:h-[250px] w-full rounded-[10px] overflow-hidden flex items-center justify-center bg-[#0D1B2A]">
          <img
            src={`${import.meta.env.BASE_URL}assets/8.PNG`}
            alt="Green master-planned real estate landscape"
            width="1280"
            height="320"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#0D1B2A]/45" aria-hidden="true" />
          <Link
            to="/"
            aria-label="Hillsview Home"
            className="relative z-10 inline-flex items-center justify-center p-4"
          >
            <img
              src={companyInfo.logoLight}
              alt="Hillsview logo"
              width="210"
              height="74"
              loading="lazy"
              className="h-16 sm:h-20 lg:h-24 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Bottom Copyright Row with Terms and Privacy Centered */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[14px] text-white/75">
          <p className="tabular-nums">
            © {currentYear} {companyInfo.legalTitle}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/contact"
              className="hover:text-[#D5BC8A] transition-colors font-medium"
            >
              Terms and privacy
            </Link>
          </div>
          <p>{companyInfo.location}</p>
        </div>

        {/* PrestigeUI Oversized Footer Wordmark */}
        <FooterWordmark />
      </div>
    </footer>
  );
}
