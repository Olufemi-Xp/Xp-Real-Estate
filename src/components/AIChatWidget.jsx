import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Mail,
  Bot,
  ExternalLink,
} from 'lucide-react';
import {
  companyInfo,
  servicesData,
  getWhatsAppInquiryUrl,
  getEmailInquiryUrl,
} from '../data/companyInfo';

const WELCOME_MESSAGE =
  'Welcome to Hillsview. How can we assist you today? You can ask about our construction, architectural, property development, and real estate services.';

const SUGGESTED_QUESTIONS = [
  'What services does Hillsview offer?',
  'Tell me about building construction and civil engineering',
  'Do you handle property management and rentals?',
  'How can I contact Hillsview or request a quotation?',
];

function WhatsAppLogoIcon({ className = 'w-7 h-7' }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        fill="#25D366"
        d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.257.59 4.46 1.71 6.404L3.2 28.8l6.56-1.72a12.74 12.74 0 0 0 6.244 1.622h.006c7.058 0 12.79-5.74 12.79-12.8 0-3.42-1.33-6.636-3.748-9.054A12.716 12.716 0 0 0 16.004 3.2Zm0 23.34h-.005a10.58 10.58 0 0 1-5.394-1.477l-.387-.23-4.012 1.052 1.07-3.91-.252-.402a10.57 10.57 0 0 1-1.624-5.637c0-5.847 4.757-10.604 10.608-10.604 2.833 0 5.495 1.104 7.497 3.108a10.535 10.535 0 0 1 3.105 7.5c0 5.85-4.756 10.6-10.606 10.6Zm5.818-7.94c-.318-.16-1.887-.931-2.18-1.038-.292-.106-.505-.16-.718.16-.212.319-.823 1.037-1.01 1.25-.185.212-.371.239-.69.08-.318-.16-1.345-.496-2.563-1.582-.947-.845-1.587-1.889-1.773-2.208-.186-.319-.02-.491.14-.65.143-.143.318-.372.478-.558.159-.186.212-.319.318-.532.107-.212.053-.398-.026-.558-.08-.16-.718-1.729-.983-2.367-.259-.621-.522-.537-.718-.547l-.61-.01c-.213 0-.559.08-.851.399-.292.319-1.116 1.09-1.116 2.66 0 1.568 1.143 3.084 1.302 3.297.16.212 2.25 3.434 5.45 4.815.761.329 1.355.525 1.819.672.764.243 1.46.208 2.01.126.613-.092 1.887-.771 2.153-1.516.266-.744.266-1.382.186-1.515-.08-.133-.292-.213-.61-.373Z"
      />
    </svg>
  );
}

/**
 * Grounded knowledge base responder using only approved Hillsview facts.
 * Ensures visitors always receive accurate, immediate answers and clear status
 * if the serverless external AI key is not yet configured.
 */
function getGroundedKnowledgeResponse(rawQuery) {
  const q = rawQuery.toLowerCase();

  if (
    q.includes('price') ||
    q.includes('cost') ||
    q.includes('quote') ||
    q.includes('quotation') ||
    q.includes('how much') ||
    q.includes('budget') ||
    q.includes('rate')
  ) {
    return {
      text: `Project costs and service fees depend on your specific site conditions, architectural drawings, and scope of work in ${companyInfo.location}. Hillsview does not issue automated online price quotes. Please reach our team directly on WhatsApp (${companyInfo.whatsappDisplay}) or by email (${companyInfo.email}) so we can review your requirements.`,
      showContactActions: true,
    };
  }

  if (
    q.includes('address') ||
    q.includes('street') ||
    q.includes('office') ||
    q.includes('where are you') ||
    q.includes('location')
  ) {
    return {
      text: `Hillsview operates in ${companyInfo.location}. The website currently lists Lagos State alongside our official WhatsApp (${companyInfo.whatsappDisplay}) and email (${companyInfo.email}) channels. Please message us on WhatsApp or email to coordinate a meeting or site visit.`,
      showContactActions: true,
    };
  }

  if (
    q.includes('contact') ||
    q.includes('whatsapp') ||
    q.includes('phone') ||
    q.includes('call') ||
    q.includes('email') ||
    q.includes('reach')
  ) {
    return {
      text: `You can reach Hillsview directly on WhatsApp at ${companyInfo.whatsappDisplay} (${companyInfo.whatsappInternational}) or by email at ${companyInfo.email}. Use the buttons below to start a conversation immediately.`,
      showContactActions: true,
    };
  }

  // Match individual service categories
  for (const service of servicesData) {
    const keywords = service.title.toLowerCase().split(/\s+/);
    if (keywords.some((kw) => kw.length > 3 && q.includes(kw))) {
      return {
        text: `${service.title}: ${service.description} Key deliverables include: ${service.deliverables.join(
          '; '
        )}. To discuss your ${service.title.toLowerCase()} requirements, please contact us on WhatsApp or email.`,
        showContactActions: true,
      };
    }
  }

  if (
    q.includes('service') ||
    q.includes('offer') ||
    q.includes('what do you do') ||
    q.includes('about hillsview') ||
    q.includes('company')
  ) {
    const list = servicesData.map((s) => s.title).join(', ');
    return {
      text: `Hillsview is a Construction & Real Estate Management company in ${companyInfo.location}. We offer eight core services: ${list}. Which of these services would you like to explore?`,
      showContactActions: true,
    };
  }

  return {
    text: `Thank you for your question. I can share verified information about Hillsview's eight construction, architectural, civil engineering, and real estate management services in ${companyInfo.location}. For specific project advice, quotations, or booking discussions, please contact our team directly via WhatsApp (${companyInfo.whatsappDisplay}) or email (${companyInfo.email}).`,
    showContactActions: true,
  };
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [providerMode, setProviderMode] = useState('ready'); // 'ready' | 'live-api' | 'verified-kb'
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: WELCOME_MESSAGE,
      showContactActions: true,
    },
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const launcherRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen, messages]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const sendInquiry = async (textToSend) => {
    const trimmed = (textToSend ?? input).trim();
    if (!trimmed || isLoading) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const apiEndpoint = import.meta.env.VITE_AI_API_ENDPOINT || '/api/chat';

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: messages.map((m) => ({ role: m.role, content: m.text })),
        }),
      });

      if (response.ok) {
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await response.json();
          if (data?.reply) {
            setProviderMode('live-api');
            setMessages((prev) => [
              ...prev,
              {
                id: `assistant-${Date.now()}`,
                role: 'assistant',
                text: data.reply,
                showContactActions: true,
              },
            ]);
            setIsLoading(false);
            return;
          }
        }
      }
    } catch {
      // Serverless AI endpoint not active or external API key not configured; use grounded Hillsview KB
    }

    // Brief natural delay before returning grounded Hillsview knowledge base answer
    setTimeout(() => {
      const fallback = getGroundedKnowledgeResponse(trimmed);
      setProviderMode('verified-kb');
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          text: fallback.text,
          showContactActions: fallback.showContactActions,
        },
      ]);
      setIsLoading(false);
    }, 320);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendInquiry(input);
  };

  return (
    <div data-ui="floating-assistant">
      {/* Floating Controls Container (Bottom-Right, Transparent Background) */}
      <div className="fixed bottom-5 right-5 z-45 flex items-center gap-3">
        {/* Direct WhatsApp Logo Button (Transparent Background, No Text) */}
        {!isOpen && (
          <a
            href={getWhatsAppInquiryUrl('a construction or real estate inquiry')}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Hillsview on WhatsApp"
            className="inline-flex items-center justify-center w-11 h-11 rounded-[8px] bg-transparent hover:opacity-80 transition-opacity"
          >
            <WhatsAppLogoIcon className="w-8 h-8" />
          </a>
        )}

        {/* Ask Hillsview Launcher Button (Transparent Background, Small Hillsview Logo) */}
        <button
          ref={launcherRef}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="hillsview-ai-panel"
          aria-label={isOpen ? 'Close Hillsview assistant' : 'Ask Hillsview assistant'}
          className="inline-flex items-center gap-1.5 h-11 px-3 rounded-[8px] bg-transparent text-[#B89452] text-[14px] font-bold hover:opacity-80 transition-opacity cursor-pointer"
        >
          {isOpen ? (
            <>
              <X className="w-5 h-5 text-[#B89452]" aria-hidden="true" />
              <span>Close</span>
            </>
          ) : (
            <>
              <img
                src={companyInfo.logo}
                alt=""
                aria-hidden="true"
                width="20"
                height="20"
                className="w-5 h-5 object-contain shrink-0"
              />
              <span>Ask Hillsview</span>
            </>
          )}
        </button>
      </div>

      {/* Chat Dialog Window */}
      {isOpen && (
        <section
          id="hillsview-ai-panel"
          role="dialog"
          aria-label="Hillsview customer enquiry assistant"
          className="fixed bottom-20 right-4 left-4 sm:left-auto sm:right-5 z-50 sm:w-[390px] max-h-[calc(100svh-110px)] flex flex-col bg-[#FFFFFF] rounded-[12px] overflow-hidden"
          style={{ boxShadow: '0 16px 40px rgba(16, 36, 59, 0.20)' }}
        >
          {/* Header */}
          <div className="bg-[#14263D] text-white px-5 py-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[8px] bg-[#10243B] flex items-center justify-center text-[#D5BC8A]">
                <Bot className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-[16px] font-semibold text-white leading-tight">
                  Hillsview assistant
                </h2>
                <p className="text-[13px] text-white/75">
                  {providerMode === 'live-api'
                    ? 'Connected via serverless AI endpoint'
                    : 'Official Hillsview service guide'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Minimize chat window"
              className="w-9 h-9 rounded-[8px] inline-flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F7F8FA] max-h-[380px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[88%] rounded-[8px] px-4 py-3 text-[14px] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#14263D] text-white'
                      : 'bg-[#FFFFFF] text-[#14263D]'
                  }`}
                >
                  <p>{msg.text}</p>

                  {msg.role === 'assistant' && msg.showContactActions && (
                    <div className="mt-3 pt-2.5 flex flex-wrap gap-2">
                      <a
                        href={getWhatsAppInquiryUrl('an inquiry from the Hillsview Assistant')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-[#EAF5EF] text-[#176B45] text-[13px] font-semibold hover:bg-[#d7ede1] transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>WhatsApp {companyInfo.whatsappDisplay}</span>
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </a>
                      <a
                        href={getEmailInquiryUrl('Hillsview Website Enquiry')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-[#EEF1F4] text-[#14263D] text-[13px] font-semibold hover:bg-[#E4E8EE] transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#86652F]" aria-hidden="true" />
                        <span>Email us</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Quick Suggested Prompts */}
            {messages.length === 1 && (
              <div className="pt-1 space-y-2">
                <p className="text-[13px] text-[#667085] font-medium">
                  Common questions
                </p>
                <div className="flex flex-col gap-1.5">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => sendInquiry(q)}
                      className="text-left px-3 py-2 rounded-[8px] bg-[#FFFFFF] text-[#14263D] text-[13px] font-medium hover:bg-[#EEF1F4] transition-colors cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {isLoading && (
              <div className="flex items-center gap-2 text-[13px] text-[#667085] px-2">
                <span className="w-2 h-2 rounded-full bg-[#B89452]" />
                <span>Hillsview assistant is preparing a response...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Transparent Status Note when external API key is not configured */}
          {providerMode === 'verified-kb' && (
            <div className="px-4 py-1.5 bg-[#EAF2FB] text-[#245F9E] text-[13px]">
              Answering from verified Hillsview company documentation (configure{' '}
              <code>/api/chat</code> key for live LLM generation).
            </div>
          )}

          {/* Input Composer */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-[#FFFFFF] flex items-center gap-2"
          >
            <label htmlFor="hillsview-chat-input" className="sr-only">
              Ask a question about Hillsview services
            </label>
            <input
              id="hillsview-chat-input"
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about services or contact details..."
              disabled={isLoading}
              className="flex-1 h-11 px-3.5 rounded-[8px] bg-[#F7F8FA] text-[#14263D] placeholder:text-[#667085] text-[14px] focus:bg-[#FFFFFF]"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send inquiry message"
              className="inline-flex items-center justify-center w-11 h-11 rounded-[8px] bg-[#14263D] text-white hover:bg-[#10243B] disabled:opacity-45 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
            </button>
          </form>
        </section>
      )}
    </div>
  );
}
