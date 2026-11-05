import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { companyInfo } from '../../data/companyInfo';

/**
 * PrestigeUI FooterWordmark (@/components/prestigeui/footer-wordmark)
 *
 * Full-bleed architectural wordmark signature for the site footer with
 * cursor-tracked radial brass spotlight illumination, per-character hover lift,
 * and scroll-in reveal.
 */
export function FooterWordmark({
  wordmark = companyInfo.name || 'HILLSVIEW',
  subtitle = 'CONSTRUCTION & REAL ESTATE MANAGEMENT',
  className = '',
}) {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / Math.max(1, rect.width)) * 100;
    const y = ((e.clientY - rect.top) / Math.max(1, rect.height)) * 100;
    setMousePos({ x, y });
  };

  const letters = String(wordmark).toUpperCase().split('');

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full overflow-hidden select-none pt-8 sm:pt-10 pb-2 ${className}`}
    >
      {/* Top hairline divider with subtle brass shimmer */}
      <div
        className="w-full h-px mb-6 sm:mb-8"
        style={{
          background:
            'linear-gradient(90deg, rgba(213,188,138,0) 0%, rgba(213,188,138,0.28) 50%, rgba(213,188,138,0) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Subtitle micro-label */}
      {subtitle && (
        <div className="flex items-center justify-between gap-4 mb-3 sm:mb-4 text-[11px] sm:text-[12px] uppercase tracking-[0.28em] text-[#D5BC8A]/70 font-semibold">
          <span>{subtitle}</span>
          <span className="hidden sm:inline-block text-white/50">
            {companyInfo.location}
          </span>
        </div>
      )}

      {/* Giant Oversized Prestige Wordmark */}
      <div className="relative flex items-center justify-center w-full">
        <motion.div
          initial={prefersReducedMotion ? false : { y: '28%', opacity: 0 }}
          whileInView={prefersReducedMotion ? {} : { y: '0%', opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="w-full text-center"
        >
          <div
            className="w-full flex items-baseline justify-between font-black uppercase tracking-[-0.04em] leading-[0.82]"
            style={{
              fontSize: 'clamp(3.6rem, 15.2vw, 13.5rem)',
            }}
          >
            {letters.map((char, idx) => (
              <span
                key={`${char}-${idx}`}
                className="inline-block transition-transform duration-500 ease-out hover:-translate-y-2"
                style={{
                  backgroundImage: isHovered
                    ? `radial-gradient(circle 260px at ${mousePos.x}% ${mousePos.y}%, #D5BC8A 0%, rgba(255,255,255,0.26) 45%, rgba(255,255,255,0.08) 100%)`
                    : 'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(213,188,138,0.12) 55%, rgba(13,27,42,0.04) 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  WebkitTextStroke: isHovered
                    ? '1px rgba(213, 188, 138, 0.38)'
                    : '1px rgba(255, 255, 255, 0.14)',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Bottom horizon fade vignette so the giant wordmark blends into the footer edge */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-8 sm:h-12 bg-gradient-to-t from-[#10243B] via-[#10243B]/60 to-transparent"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export default FooterWordmark;
