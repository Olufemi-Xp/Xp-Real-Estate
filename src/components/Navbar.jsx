import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageSquare, Mail } from 'lucide-react';
import { companyInfo, getWhatsAppInquiryUrl } from '../data/companyInfo';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact us', path: '/contact' },
];

export default function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById('hero-section');
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        // Keep header transparent until the bottom of the hero section almost reaches the header (~84px)
        setScrolled(rect.bottom <= 105);
      } else {
        const threshold = Math.max(window.innerHeight - 105, 200);
        setScrolled(window.scrollY > threshold);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [location.pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  const useTransparent = isHomePage && !scrolled && !mobileOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-colors duration-200 ${
        useTransparent
          ? 'bg-transparent text-white'
          : 'bg-[#FFFFFF] text-[#14263D]'
      }`}
    >
      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12 h-[74px] lg:h-[84px] flex items-center justify-between gap-6">
        {/* Brand Logo */}
        <Link
          to="/"
          aria-label="Hillsview Home"
          className="flex items-center gap-3 shrink-0 py-1 z-10"
        >
          <img
            src={useTransparent ? companyInfo.logoLight : companyInfo.logo}
            alt="Hillsview Construction and Real Estate Management logo"
            width="148"
            height="52"
            className="h-11 lg:h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation — Centered on the screen */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-9 lg:absolute lg:left-1/2 lg:-translate-x-1/2"
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative py-2 text-[15px] font-medium transition-colors duration-150 whitespace-nowrap ${
                  useTransparent
                    ? isActive
                      ? 'text-white'
                      : 'text-white/90 hover:text-[#D5BC8A]'
                    : isActive
                    ? 'text-[#14263D]'
                    : 'text-[#667085] hover:text-[#14263D]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B89452]"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Invisible right spacer on desktop to keep balanced layout */}
        <div className="hidden lg:block w-[148px] shrink-0" aria-hidden="true" />

        {/* Mobile Menu Button */}
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-primary-menu"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className={`lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-[8px] transition-colors ${
            useTransparent
              ? 'text-white hover:bg-white/10'
              : 'text-[#14263D] hover:bg-[#EEF1F4]'
          }`}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Full-Width Dropdown Panel */}
      {mobileOpen && (
        <div
          id="mobile-primary-menu"
          className="lg:hidden bg-[#FFFFFF] text-[#14263D] px-5 pt-3 pb-7"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between py-3 px-3 rounded-[8px] text-[16px] font-medium ${
                    isActive
                      ? 'bg-[#EEF1F4] text-[#14263D] font-semibold'
                      : 'text-[#14263D] hover:bg-[#F7F8FA]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#B89452]" aria-hidden="true" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 pt-5 bg-[#F7F8FA] p-4 rounded-[8px] flex flex-col gap-3">
            <a
              href={getWhatsAppInquiryUrl('a construction or real estate inquiry')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-[8px] bg-[#14263D] text-white text-[15px] font-semibold hover:bg-[#10243B]"
            >
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
              <span>Chat on WhatsApp ({companyInfo.whatsappDisplay})</span>
            </a>
            <a
              href={companyInfo.emailLink}
              className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-[8px] bg-[#FFFFFF] text-[#14263D] text-[15px] font-medium hover:bg-[#EEF1F4]"
            >
              <Mail className="w-4 h-4 text-[#86652F]" aria-hidden="true" />
              <span>{companyInfo.email}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
