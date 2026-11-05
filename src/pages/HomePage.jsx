import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Mail,
  CheckCircle2,
} from 'lucide-react';
import {
  companyInfo,
  servicesData,
  projectsPortfolio,
  companyStrengths,
  getWhatsAppInquiryUrl,
} from '../data/companyInfo';
import ServiceIcon from '../components/ServiceIcon';
import ServiceScopeExplorer from '../components/ServiceScopeExplorer';
import LightboxModal from '../components/LightboxModal';
import SqueezeCarousel from '@/components/ui/carousel-squeeze';
import TypingEffect from '@/components/ui/typing-effect';

function WhatsAppIcon({ className = 'w-5 h-5' }) {
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

const INTRO_CROSSFADE_IMAGES = [
  {
    src: `${import.meta.env.BASE_URL}assets/10.PNG`,
    alt: 'Contemporary residence with structural glazing and poolside terrace at dusk',
    caption: 'Architectural design and residential construction',
  },
  {
    src: `${import.meta.env.BASE_URL}assets/1.PNG`,
    alt: 'Hillsview engineer supervising reinforced concrete structural works on site',
    caption: 'On-site structural and civil engineering supervision',
  },
  {
    src: `${import.meta.env.BASE_URL}assets/8.PNG`,
    alt: 'Master-planned residential boulevard with detached homes',
    caption: 'Real estate development and estate management',
  },
];

function PopBreatheText({
  as: Component = 'span',
  children,
  className = '',
  delay = 0,
  popScale = 1.12,
  hoverScale = 1.02,
  minOpacity = 0.38,
  duration = 2.8,
  glow = true,
  style,
  ...props
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });
  const [isHovered, setIsHovered] = useState(false);
  const [phase, setPhase] = useState('idle'); // 'idle' | 'popping' | 'breathing'
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isInView) {
      if (prefersReducedMotion) {
        setPhase('breathing');
        return;
      }
      const startTimer = setTimeout(() => {
        setPhase('popping');
      }, delay * 1000);

      const settleTimer = setTimeout(() => {
        setPhase('breathing');
      }, (delay + 0.65) * 1000);

      return () => {
        clearTimeout(startTimer);
        clearTimeout(settleTimer);
      };
    } else {
      setPhase('idle');
    }
  }, [isInView, delay, prefersReducedMotion]);

  let animateProps = { scale: 1, opacity: 1 };
  let transitionProps = { duration: 0.3 };

  if (phase === 'idle') {
    animateProps = { scale: 0.82, opacity: 0 };
    transitionProps = { duration: 0.2 };
  } else if (phase === 'popping') {
    animateProps = { scale: [0.82, popScale, 1], opacity: [0, 1, 1] };
    transitionProps = { duration: 0.65, ease: [0.175, 0.885, 0.32, 1.2] };
  } else if (phase === 'breathing') {
    if (isHovered) {
      animateProps = { scale: hoverScale, opacity: 1 };
      transitionProps = { duration: 0.25, ease: 'easeOut' };
    } else {
      animateProps = { scale: 1, opacity: [1, minOpacity, 1] };
      transitionProps = {
        opacity: { repeat: Infinity, duration, ease: 'easeInOut' },
        scale: { duration: 0.3 },
      };
    }
  }

  const MotionComponent = motion[Component] || motion.span;

  return (
    <MotionComponent
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={animateProps}
      transition={transitionProps}
      className={`${className} ${
        isHovered && glow
          ? 'drop-shadow-[0_0_22px_rgba(213,188,138,0.5)]'
          : ''
      }`}
      style={style}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

export default function HomePage() {
  const prefersReducedMotion = useReducedMotion();
  const [videoFailed, setVideoFailed] = useState(false);
  const [activeIntroSlide, setActiveIntroSlide] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const featuredProjects = projectsPortfolio.slice(0, 6);

  const portfolioSlides = projectsPortfolio.map((item, idx) => ({
    id: item.id,
    title: item.title,
    description: item.caption,
    image: item.src,
    imageAlt: item.title,
    overlay: (
      <div className="flex flex-col gap-1 text-left">
        <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-wider text-[#D5BC8A]">
          {item.discipline}
        </span>
        <span className="text-[14px] sm:text-[15px] font-bold text-white tracking-tight">
          {item.category}
        </span>
      </div>
    ),
    action: 'Inspect project',
    onAction: () => setLightboxIndex(idx),
  }));

  // Slow crossfade motion from Direction Sheet §8
  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const timer = setInterval(() => {
      if (!document.hidden) {
        setActiveIntroSlide((prev) => (prev + 1) % INTRO_CROSSFADE_IMAGES.length);
      }
    }, 5400);
    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  useEffect(() => {
    document.title =
      'Hillsview, Construction and Real Estate Management, Lagos State, Nigeria';
  }, []);

  const fadeUp = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.18 },
          transition: { duration: 0.55, delay, ease: [0.2, 0.8, 0.2, 1] },
        };

  return (
    <div>
      {/* FULL-WIDTH ARCHITECTURAL VIDEO HERO */}
      <section
        id="hero-section"
        className="relative w-full min-h-[92svh] lg:min-h-[100svh] bg-[#0D1B2A] text-white flex items-end overflow-hidden"
      >
        {/* Background Video or Fallback Poster */}
        <div className="absolute inset-0 z-0">
          {!prefersReducedMotion && !videoFailed ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={companyInfo.heroPoster}
              onError={() => setVideoFailed(true)}
              className="w-full h-full object-cover"
            >
              <source src={companyInfo.heroVideo} type="video/mp4" />
            </video>
          ) : (
            <img
              src={companyInfo.heroPoster}
              alt="Hillsview architectural and residential development in Lagos State"
              width="1600"
              height="1000"
              className="w-full h-full object-cover"
            />
          )}
          {/* Neutral dark navy scrim preserving WCAG AA contrast over every video frame */}
          <div className="absolute inset-0 bg-[#0D1B2A]/62" aria-hidden="true" />
        </div>

        {/* Hero Foreground Content */}
        <div className="relative z-10 mx-auto max-w-[1280px] w-full px-5 sm:px-8 lg:px-12 pt-32 pb-16 sm:pb-24 lg:pb-28">
          <div className="max-w-[820px] space-y-6">
            <motion.h1
              {...fadeUp(0.05)}
              className="font-bold text-white tracking-tight"
              style={{
                fontSize: 'clamp(1.65rem, 4.3vw, 3.85rem)',
                lineHeight: 1.05,
              }}
            >
              <TypingEffect
                text={companyInfo.tagline}
                speed={40}
                delay={250}
                cursorColor="#D5BC8A"
              />
            </motion.h1>

            <motion.p
              {...fadeUp(0.14)}
              className="bg-transparent text-[17px] sm:text-[19px] text-white/90 leading-relaxed max-w-[60ch]"
            >
              {companyInfo.supportingCopy}
            </motion.p>

            <motion.div
              {...fadeUp(0.22)}
              className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <Link
                to="/services"
                className="inline-flex items-center gap-2.5 py-2 bg-transparent text-white text-[16px] font-semibold hover:text-[#D5BC8A] transition-colors"
              >
                <span>Explore our services</span>
                <ArrowRight className="w-4 h-4 text-[#D5BC8A]" aria-hidden="true" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* COMPANY INTRODUCTION */}
      <section className="py-20 sm:py-28 lg:py-36 bg-[#F7F8FA]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Narrative */}
            <div className="lg:col-span-5 space-y-6">
              <motion.h2
                {...fadeUp(0)}
                className="font-bold text-[#14263D]"
                style={{
                  fontSize: 'clamp(1.65rem, 3vw, 2.75rem)',
                  lineHeight: 1.08,
                }}
              >
                <TypingEffect
                  text="Built on precision and stewardship"
                  speed={38}
                  delay={150}
                  cursorColor="#B89452"
                />
              </motion.h2>

              <motion.p
                {...fadeUp(0.08)}
                className="text-[17px] text-[#14263D] leading-relaxed"
              >
                Hillsview is a construction and real estate management company in{' '}
                {companyInfo.location}. We coordinate architectural design, civil engineering, building construction, and property operations under one roof.
              </motion.p>

              <motion.p
                {...fadeUp(0.14)}
                className="text-[16px] text-[#667085] leading-relaxed"
              >
                We manage new residential developments from ground-breaking through handover, remodel existing buildings, and supervise tenanted properties. Our engineers prioritize structural durability, direct milestone updates, and clear budget management.
              </motion.p>

              <motion.div {...fadeUp(0.2)} className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-[8px] bg-[#14263D] text-white text-[15px] font-semibold hover:bg-[#10243B] transition-colors"
                >
                  <span>Learn more about us</span>
                  <ArrowRight className="w-4 h-4 text-[#D5BC8A]" aria-hidden="true" />
                </Link>
              </motion.div>
            </div>

            {/* Right column: Architectural image presentation */}
            <motion.div {...fadeUp(0.12)} className="lg:col-span-7">
              <div className="relative aspect-[16/10] w-full rounded-[8px] overflow-hidden bg-[#10243B]">
                {INTRO_CROSSFADE_IMAGES.map((slide, idx) => (
                  <img
                    key={slide.src}
                    src={slide.src}
                    alt={slide.alt}
                    width="1100"
                    height="688"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      idx === activeIntroSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}

                {/* Bottom Caption Bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#0D1B2A]/85 text-white px-5 py-3.5 flex items-center justify-between gap-4">
                  <p className="text-[14px] font-medium text-white">
                    {INTRO_CROSSFADE_IMAGES[activeIntroSlide].caption}
                  </p>
                  <div className="flex items-center gap-2 shrink-0">
                    {INTRO_CROSSFADE_IMAGES.map((slide, idx) => (
                      <button
                        key={slide.src}
                        type="button"
                        onClick={() => setActiveIntroSlide(idx)}
                        aria-label={`Show slide ${idx + 1}, ${slide.caption}`}
                        className={`h-2 rounded-full transition-colors cursor-pointer ${
                          idx === activeIntroSlide
                            ? 'w-6 bg-[#B89452]'
                            : 'w-2 bg-white/45 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="py-20 sm:py-28 lg:py-36 bg-[#FFFFFF]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <div className="max-w-[620px] space-y-4">
              <motion.h2
                {...fadeUp(0)}
                className="font-bold text-[#14263D]"
                style={{
                  fontSize: 'clamp(1.65rem, 3vw, 2.75rem)',
                  lineHeight: 1.08,
                }}
              >
                <TypingEffect
                  text="Eight integrated property services"
                  speed={38}
                  delay={150}
                  cursorColor="#B89452"
                />
              </motion.h2>
              <motion.p
                {...fadeUp(0.08)}
                className="text-[17px] text-[#667085] leading-relaxed"
              >
                Architectural planning, structural engineering, site construction, and facility operations across Lagos State.
              </motion.p>
            </div>

            <motion.div {...fadeUp(0.14)}>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-[8px] bg-[#F7F8FA] text-[#14263D] text-[15px] font-semibold hover:bg-[#EEF1F4] transition-colors"
              >
                <span>View full services breakdown</span>
                <ArrowRight className="w-4 h-4 text-[#86652F]" aria-hidden="true" />
              </Link>
            </motion.div>
          </div>

          {/* 8 Services Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {servicesData.map((service, index) => (
              <motion.article
                key={service.id}
                {...fadeUp((index % 2) * 0.08)}
                className="bg-[#F7F8FA] rounded-[8px] overflow-hidden flex flex-col sm:flex-row"
              >
                <div className="sm:w-[42%] aspect-[16/10] sm:aspect-auto bg-[#10243B] shrink-0 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    width="480"
                    height="360"
                    loading="lazy"
                    className="w-full h-full object-cover media-zoom"
                  />
                </div>
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2.5 text-[#86652F]">
                      <ServiceIcon name={service.icon} className="w-5 h-5 shrink-0" />
                      <h3 className="text-[19px] font-semibold text-[#14263D]">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-[15px] text-[#667085] leading-relaxed">
                      {service.shortSummary}
                    </p>
                  </div>

                  <div className="pt-1 flex items-center justify-between gap-4">
                    <Link
                      to={`/services#${service.id}`}
                      className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#14263D] hover:text-[#86652F] transition-colors"
                    >
                      <span>Service details</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                    <a
                      href={getWhatsAppInquiryUrl(service.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] font-medium text-[#86652F] hover:text-[#14263D] transition-colors"
                    >
                      Enquire
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Interactive Live Scope Explorer */}
          <div className="mt-16 pt-4">
            <div className="bg-[#EEF1F4] p-4 sm:p-6 rounded-[12px]">
              <ServiceScopeExplorer />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="py-20 sm:py-28 lg:py-36 bg-[#10243B] text-white">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div className="max-w-[620px] space-y-4">
              <motion.h2
                {...fadeUp(0)}
                className="font-bold text-white"
                style={{
                  fontSize: 'clamp(1.65rem, 3vw, 2.75rem)',
                  lineHeight: 1.08,
                }}
              >
                <TypingEffect
                  text="Selected architectural and site portfolio"
                  speed={38}
                  delay={150}
                  cursorColor="#D5BC8A"
                />
              </motion.h2>
              <motion.p
                {...fadeUp(0.08)}
                className="text-[17px] text-white/80 leading-relaxed"
              >
                Photography and visual records from active construction sites, architectural drawings, and residential developments.
              </motion.p>
            </div>

            <motion.div {...fadeUp(0.14)}>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-[8px] bg-[#B89452] text-[#0D1B2A] text-[15px] font-semibold hover:bg-[#D5BC8A] transition-colors"
              >
                <span>Open full portfolio</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </motion.div>
          </div>

          {/* Squeeze Carousel displaying all pictures under Selected architectural and site portfolio */}
          <div className="w-full">
            <SqueezeCarousel
              slides={portfolioSlides}
              label="Selected architectural and site portfolio"
              height="clamp(280px, 34cqi, 430px)"
              radius={8}
              accent="#B89452"
              accentForeground="#0D1B2A"
              className="text-white"
            />
          </div>
        </div>
      </section>

      {/* COMPANY STRENGTHS — Left Image Enlarged to Fill Full Height, Right Bars Animated to Deep Navy on Hover */}
      <section className="py-20 sm:py-28 lg:py-36 bg-[#F7F8FA]">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            {/* Left Column: Stretches so the image covers all remaining vertical space */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              <motion.h2
                {...fadeUp(0)}
                className="font-bold text-[#14263D]"
                style={{
                  fontSize: 'clamp(1.65rem, 3vw, 2.75rem)',
                  lineHeight: 1.08,
                }}
              >
                <TypingEffect
                  text="Our standard of execution"
                  speed={38}
                  delay={150}
                  cursorColor="#B89452"
                />
              </motion.h2>
              <motion.p
                {...fadeUp(0.08)}
                className="text-[17px] text-[#667085] leading-relaxed"
              >
                We supervise building sites daily, verify material specifications before installation, and provide direct milestone reports on WhatsApp and email.
              </motion.p>
              <motion.div
                {...fadeUp(0.14)}
                className="flex-1 min-h-[380px] lg:min-h-[460px] w-full rounded-[8px] overflow-hidden bg-[#10243B]"
              >
                <img
                  src={`${import.meta.env.BASE_URL}assets/9.PNG`}
                  alt="Hillsview structural engineering team on construction site with tower crane"
                  width="720"
                  height="960"
                  loading="lazy"
                  className="w-full h-full object-cover media-zoom"
                />
              </motion.div>
            </div>

            {/* Right Column: Staggered bars that transition to deep navy with white text on hover */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-4">
              {companyStrengths.map((strength, idx) => (
                <motion.div
                  key={strength.title}
                  {...fadeUp(idx * 0.06)}
                  className="group bg-[#FFFFFF] hover:bg-[#10243B] p-6 sm:p-7 rounded-[8px] flex items-start gap-4 transition-colors duration-300 hover:-translate-y-0.5 cursor-default"
                >
                  <CheckCircle2
                    className="w-5 h-5 text-[#86652F] group-hover:text-[#D5BC8A] transition-colors duration-300 shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <div className="space-y-1.5">
                    <h3 className="text-[20px] font-semibold text-[#14263D] group-hover:text-white transition-colors duration-300">
                      {strength.title}
                    </h3>
                    <p className="text-[16px] text-[#667085] group-hover:text-white/85 leading-relaxed transition-colors duration-300">
                      {strength.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CTA — Transparent Background, Animated Right -> Center Pause -> Left */}
      <section className="relative w-full min-h-[76svh] bg-[#0D1B2A] flex items-center justify-center py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}assets/11.PNG`}
            alt="Architectural stone and steel entrance gate illuminated at dusk"
            width="1600"
            height="1000"
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0D1B2A]/68" aria-hidden="true" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1280px] w-full px-5 sm:px-8 lg:px-12 flex justify-center">
          <div className="w-full max-w-[760px] bg-transparent text-white text-center space-y-6 py-6">
            <PopBreatheText
              as="h2"
              delay={0}
              popScale={1.14}
              hoverScale={1.03}
              minOpacity={0.35}
              className="inline-block cursor-pointer select-none font-extrabold tracking-tight text-white"
              style={{
                fontSize: 'clamp(2.1rem, 4.8vw, 3.85rem)',
                lineHeight: 1.06,
              }}
            >
              Discuss your project
            </PopBreatheText>

            <PopBreatheText
              as="p"
              delay={0.15}
              popScale={1.06}
              hoverScale={1.01}
              minOpacity={0.42}
              className="text-[18px] sm:text-[21px] font-semibold text-white/95 leading-relaxed max-w-[54ch] mx-auto cursor-pointer select-none"
            >
              Speak directly with Hillsview in {companyInfo.location} regarding building construction, architectural design, or property management.
            </PopBreatheText>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
              <a
                href={getWhatsAppInquiryUrl('a construction or real estate project')}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-[8px] bg-transparent text-white text-[18px] sm:text-[20px] font-bold hover:text-[#D5BC8A] transition-colors"
              >
                <PopBreatheText
                  as="span"
                  delay={0.25}
                  popScale={1.08}
                  hoverScale={1.04}
                  minOpacity={0.45}
                  className="inline-flex items-center gap-2.5"
                >
                  <WhatsAppIcon className="w-6 h-6 text-[#25D366] shrink-0" />
                  <span>Chat on WhatsApp</span>
                </PopBreatheText>
              </a>

              <a
                href={companyInfo.emailLink}
                className="group inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-[8px] bg-transparent text-white text-[18px] sm:text-[20px] font-bold hover:text-[#D5BC8A] transition-colors"
              >
                <PopBreatheText
                  as="span"
                  delay={0.35}
                  popScale={1.08}
                  hoverScale={1.04}
                  minOpacity={0.45}
                  className="inline-flex items-center gap-2.5"
                >
                  <Mail className="w-6 h-6 text-[#D5BC8A] shrink-0" aria-hidden="true" />
                  <span>Email {companyInfo.email}</span>
                </PopBreatheText>
              </a>
            </div>
          </div>
        </div>
      </section>

      <LightboxModal
        items={projectsPortfolio}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
}
