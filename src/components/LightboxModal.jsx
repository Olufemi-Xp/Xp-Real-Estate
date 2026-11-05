import React, { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { getWhatsAppInquiryUrl } from '../data/companyInfo';

export default function LightboxModal({ items, currentIndex, onClose, onNavigate }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (currentIndex === null || currentIndex === undefined) return;
    closeButtonRef.current?.focus();

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex - 1 + items.length) % items.length);
      } else if (e.key === 'ArrowRight') {
        onNavigate((currentIndex + 1) % items.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, items.length, onClose, onNavigate]);

  if (currentIndex === null || currentIndex === undefined || !items[currentIndex]) {
    return null;
  }

  const item = items[currentIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-50 bg-[#0D1B2A]/95 flex flex-col justify-between p-4 sm:p-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4 text-white max-w-[1280px] w-full mx-auto">
        <div className="flex items-center gap-3">
          <span className="text-[14px] text-[#D5BC8A] font-medium tabular-nums">
            {currentIndex + 1} / {items.length}
          </span>
          <span className="text-[14px] text-white/80">{item.category}</span>
        </div>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close media viewer"
          className="inline-flex items-center justify-center w-11 h-11 rounded-[8px] bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Media Area */}
      <div className="relative flex-1 flex items-center justify-center my-4 max-w-[1280px] w-full mx-auto overflow-hidden">
        {items.length > 1 && (
          <button
            type="button"
            onClick={() => onNavigate((currentIndex - 1 + items.length) % items.length)}
            aria-label="Previous project media"
            className="absolute left-2 sm:left-4 z-10 inline-flex items-center justify-center w-11 h-11 rounded-[8px] bg-[#10243B]/90 text-white hover:bg-[#B89452] hover:text-[#0D1B2A] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <div className="max-h-[72vh] max-w-full flex items-center justify-center">
          {item.mediaType === 'video' ? (
            <video
              src={item.src}
              poster={item.poster}
              controls
              playsInline
              className="max-h-[70vh] w-auto max-w-full rounded-[8px] bg-black"
            />
          ) : (
            <img
              src={item.src}
              alt={item.title}
              className="max-h-[70vh] w-auto max-w-full object-contain rounded-[8px]"
            />
          )}
        </div>

        {items.length > 1 && (
          <button
            type="button"
            onClick={() => onNavigate((currentIndex + 1) % items.length)}
            aria-label="Next project media"
            className="absolute right-2 sm:right-4 z-10 inline-flex items-center justify-center w-11 h-11 rounded-[8px] bg-[#10243B]/90 text-white hover:bg-[#B89452] hover:text-[#0D1B2A] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Caption & Direct Inquiry Bar */}
      <div className="max-w-[1280px] w-full mx-auto bg-[#10243B] p-4 sm:p-5 rounded-[8px] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-white">
        <div className="space-y-1">
          <h3 className="text-[18px] font-semibold text-white">{item.title}</h3>
          <p className="text-[14px] text-white/80">{item.caption}</p>
        </div>
        <a
          href={getWhatsAppInquiryUrl(`${item.title} (${item.category})`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-[8px] bg-[#B89452] text-[#0D1B2A] text-[14px] font-semibold hover:bg-[#D5BC8A] shrink-0 transition-colors"
        >
          <MessageSquare className="w-4 h-4" aria-hidden="true" />
          <span>Enquire on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}

