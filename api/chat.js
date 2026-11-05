/**
 * Hillsview — Secure Serverless AI Customer Inquiry Endpoint
 * Compatible with Vercel Serverless Functions (/api/chat)
 * Protects external AI provider API keys (OPENROUTER_API_KEY or OPENAI_API_KEY) on the server.
 */

const SYSTEM_PROMPT = `You are the official AI Customer Inquiry Assistant for Hillsview (Hillsview Construction & Real Estate Management), located in Lagos State, Nigeria.

APPROVED COMPANY FACTS (SOURCE OF TRUTH):
- Company Name: Hillsview
- Business Category: Construction & Real Estate Management
- Location: Lagos State, Nigeria (Note: A specific street address or separate voice-call phone number is not listed on the website yet; never invent one).
- Official WhatsApp: 08137669291 (Link: https://wa.me/2348137669291)
- Official Email: akins2chris@gmail.com (Link: mailto:akins2chris@gmail.com)
- Approved Services (8 core disciplines):
  1. Building Construction — End-to-end residential, commercial, and institutional building construction from site preparation to structural completion.
  2. Architectural Design — Concept planning, spatial design, 3D architectural visualization, and construction documentation.
  3. Civil Engineering — Structural engineering, site infrastructure, drainage systems, foundations, and earthworks supervision.
  4. Real Estate Development — Master-planned residential estates, multi-unit housing, and commercial property development.
  5. Property Management — Comprehensive facility maintenance, tenant coordination, asset preservation, and building operations.
  6. Property Sales and Rentals — Advisory, marketing, leasing, and sales coordination for residential and commercial properties.
  7. Renovation and Maintenance — Structural upgrades, roofing rehabilitation, interior remodeling, and preventive building maintenance.
  8. Land Acquisition and Consultancy — Site feasibility evaluation, land sourcing advisory, and development planning guidance.

STRICT BEHAVIOUR RULES:
- Use clear, helpful, concise professional English.
- Never fabricate company history, years in business, project counts, awards, staff names, street addresses, or pricing/quotations.
- Never collect personal data, register accounts, process payments, or confirm bookings.
- When asked about pricing, quotations, site inspections, or specific property availability, explain that quotations depend on project scope and direct the visitor to contact Hillsview via WhatsApp (08137669291 / https://wa.me/2348137669291) or email (akins2chris@gmail.com).`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history = [] } = req.body || {};
  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Please provide a valid inquiry message.' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;
  const isOpenRouter = Boolean(process.env.OPENROUTER_API_KEY);
  const endpoint = isOpenRouter
    ? 'https://openrouter.ai/api/v1/chat/completions'
    : 'https://api.openai.com/v1/chat/completions';
  const model = process.env.AI_MODEL || (isOpenRouter ? 'openai/gpt-4o-mini' : 'gpt-4o-mini');

  if (!apiKey) {
    return res.status(503).json({
      configured: false,
      error: 'External AI provider key is not configured on the server.',
    });
  }

  try {
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.slice(-6).map((m) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: String(m.content || '').slice(0, 600),
      })),
      { role: 'user', content: message.trim().slice(0, 600) },
    ];

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.2,
        max_tokens: 320,
      }),
    });

    if (!response.ok) {
      return res.status(502).json({
        configured: true,
        error: 'AI provider temporarily unavailable.',
      });
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();

    return res.status(200).json({
      configured: true,
      reply:
        reply ||
        'Thank you for your interest in Hillsview. Please contact our team directly on WhatsApp at 08137669291 or by email at akins2chris@gmail.com.',
    });
  } catch {
    return res.status(500).json({
      configured: true,
      error: 'Unable to reach the AI service at this time.',
    });
  }
}

