# Hillsview — Construction & Real Estate Management

Official corporate website for **Hillsview Construction & Real Estate Management** (`Lagos State, Nigeria`), engineered with React, Vite, Tailwind CSS, Framer Motion, and Lucide React.

---

## Visual Direction & Architecture

- **Design System:** Corporate Luxury (Light Theme) — Deep Navy (`#14263D` / `#10243B`), Crisp Surface (`#FFFFFF` / `#F7F8FA`), and Restrained Gold Accents (`#B89452` / `#86652F`).
- **Typography:** `Manrope` for headings and `Inter` for body and UI controls.
- **Centralized Source of Truth:** All official company details, WhatsApp/email links, services, and project assets are managed in [`src/data/companyInfo.js`](./src/data/companyInfo.js).
- **Pages Implemented:**
  1. **Home (`/`)** — Full-width architectural video hero (`HeroVideo.mp4`), transparent-to-solid navigation header, company introduction with slow crossfade gallery, all 8 company services, interactive service scope configurator, selected projects lightbox gallery, company strengths, and direct contact section.
  2. **About Us (`/about`)** — Company overview, mission, vision, core values, project approach, and clearly marked editable placeholders for corporate registry details.
  3. **Services (`/services`)** — Combined Services page covering all 8 approved disciplines (`Building Construction`, `Architectural Design`, `Civil Engineering`, `Real Estate Development`, `Property Management`, `Property Sales and Rentals`, `Renovation and Maintenance`, `Land Acquisition and Consultancy`) with quick anchor navigation, deliverables, client benefits, and direct WhatsApp/Email CTAs.
  4. **Projects (`/projects`)** — Filterable architectural image portfolio (`1.PNG`–`15.PNG`), embedded architectural video showcase (`HeroVideo.mp4`), and accessible keyboard-navigable lightbox modal.
  5. **Contact Us (`/contact`)** — Official WhatsApp (`08137669291` / `https://wa.me/2348137669291`), Email (`akins2chris@gmail.com`), Lagos State location details, and interactive scope inquiry builder.
- **AI Customer Inquiry Assistant:** Floating assistant widget connected to the serverless `/api/chat` endpoint ([`api/chat.js`](./api/chat.js)) with a grounded Hillsview knowledge base fallback so visitors always receive accurate company information without exposing API keys in browser code.

---

## Running Locally

1. **Install dependencies:**
   ```powershell
   cd "C:\Users\user\Documents\XpAut\Xp Real Estate"
   npm install
   ```

2. **Start the development server:**
   ```powershell
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

3. **Build for production:**
   ```powershell
   npm run build
   ```
   Preview the production bundle:
   ```powershell
   npm run preview
   ```

---

## Environment Variables (`.env.example`)

For live LLM responses via the Vercel serverless function (`/api/chat`), copy `.env.example` to `.env.local` and configure:
- `OPENROUTER_API_KEY` or `OPENAI_API_KEY` (server-side only; never exposed in `VITE_*` client variables)
- `AI_MODEL` (optional, defaults to `openai/gpt-4o-mini`)

