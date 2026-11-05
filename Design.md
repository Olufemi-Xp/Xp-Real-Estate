# Hillsview — Design System

**Product:** Hillsview Construction & Real Estate Management  
**Artifact:** `DESIGN.md`  
**Status:** Design direction approved; implementation-ready design specification  
**Version:** 1.0

---

## 0. Product and design scope

Hillsview is a premium, multi-page corporate website for a construction and real estate management company. Its job is to establish trust, explain the company's services, showcase its work, and make it easy for prospective customers to contact the company.

The approved design decisions are:

- **Visual direction:** Corporate Luxury.
- **Theme:** Light mode only.
- **Brand palette:** Deep navy, white, and restrained gold accents.
- **Homepage hero:** Architectural video with a clear text overlay.
- **Navigation:** Transparent over the hero; becomes a solid, readable header as the visitor scrolls.
- **Services structure:** One combined Services page containing all service categories.
- **AI assistant:** Answers basic questions about Hillsview and directs visitors to the official WhatsApp number or email address. It does not collect leads or book appointments.
- **Website scope:** Frontend-first, responsive, multi-page website. The ordinary website pages do not require a traditional application backend. The AI integration must use a secure serverless/API layer so a private AI API key is never exposed in browser code.

### Website pages

1. **Home** — brand introduction, hero video, company summary, featured services, selected projects, trust points, and contact calls to action.
2. **About Us** — company overview, mission, vision, values, and other verified company information.
3. **Services** — a single overview page for all approved services, with clear descriptions and links to the contact channels.
4. **Projects** — portfolio of company-supplied project images and videos. Project status labels must only be shown when verified by Hillsview.
5. **Contact Us** — official phone, WhatsApp, email, office address, and clear contact actions.

### Confirmed Hillsview contact information

Use the following company details consistently in the header, footer, Contact Us page, WhatsApp shortcut, and AI assistant responses. Keep them in one central configuration file (recommended path: `src/data/companyInfo.js`) so updates do not require editing multiple page components.

| Field | Approved value | Implementation note |
|---|---|---|
| Company name | Hillsview | Display as `Hillsview`. |
| WhatsApp number (as supplied) | `08137669291` | Preserve this local-format value for display where useful. |
| WhatsApp international number | `+2348137669291` | Use the country-code format for the WhatsApp deep link. |
| WhatsApp URL | `https://wa.me/2348137669291` | Use for WhatsApp buttons and AI response links. |
| Email | `akins2chris@gmail.com` | Use a `mailto:` link. |
| Business location | Lagos State, Nigeria | A street address has not been supplied; do not invent one. |
| Separate voice phone number | Not yet supplied | Do not assume the WhatsApp number is also the official voice-call number. Add a `tel:` link only after confirmation. |

Suggested central configuration shape for implementation:

```js
export const companyInfo = {
  name: "Hillsview",
  whatsappDisplay: "08137669291",
  whatsappInternational: "+2348137669291",
  whatsappLink: "https://wa.me/2348137669291",
  email: "akins2chris@gmail.com",
  emailLink: "mailto:akins2chris@gmail.com",
  location: "Lagos State, Nigeria",
  officeAddress: null,
  phone: null,
};
```

The AI assistant must use these same approved values. If a visitor requests a street address or voice-call number, the assistant must say that the website currently lists only Lagos State and the WhatsApp contact, then direct the visitor to the available email or WhatsApp channel.

### Approved service categories

- Building construction.
- Architectural design.
- Civil engineering.
- Real estate development.
- Property management.
- Property sales and rentals.
- Renovation and maintenance.
- Land acquisition and consultancy.

### Source-of-truth and content rules

This specification is based on the product decisions recorded in the discovery conversation. A separate `PRD.md` file was not supplied with this request, so this document does not assume features beyond those decisions.

Use Hillsview's actual logo, the confirmed contact information recorded above, approved company descriptions, and supplied project photographs/videos. Do not invent project names, client testimonials, years of experience, project counts, accreditations, awards, a street address, prices, guarantees, or other business claims. Until remaining content is confirmed, use clearly marked development placeholders that are removed before launch.

---

# 1. Visual direction and design principles

## 1.1 Direction: Corporate Luxury

Hillsview should feel like an established and dependable construction and property company: confident, precise, polished, and approachable. The visual language should borrow from premium architecture and property-development brands rather than generic building-trade templates.

The interface should communicate:

- **Trust:** clear company information, consistent layouts, legible typography, and prominent official contact details.
- **Craftsmanship:** carefully cropped architectural imagery, disciplined alignment, and attention to spacing.
- **Authority:** deep navy as the main brand colour, strong heading hierarchy, and confident calls to action.
- **Premium quality:** restrained gold accents, generous whitespace, subtle motion, and high-quality photography/video.
- **Clarity:** visitors should understand the company's services and how to contact it without hunting through the site.

## 1.2 Design principles

1. **Content before decoration.** Every visual element must help explain Hillsview, its services, its work, or how to contact it.
2. **Use real company assets.** Prioritise the supplied Hillsview logo, project photography, and videos. Do not make generic stock imagery look like completed Hillsview projects.
3. **Make the next action obvious.** Use consistent calls to action such as “Explore Services”, “View Projects”, “Contact Hillsview”, and “Chat on WhatsApp”.
4. **Use gold as an accent, not a dominant colour.** Gold is for small highlights, rules, icon details, and selected calls to action. Navy and white do most of the interface work.
5. **Keep layouts calm and spacious.** A premium look comes from hierarchy, proportion, image quality, and restraint—not from excessive effects.
6. **Design mobile deliberately.** The mobile experience is a first-class layout, not a compressed desktop page.
7. **Be honest about the business.** All company claims, project status labels, and service descriptions must be approved and factually accurate.
8. **Make contact effortless.** Phone, WhatsApp, and email actions must be easy to find and work as direct links.
9. **Keep interactions predictable.** Buttons, links, menus, project galleries, and the AI assistant must have clear hover, focus, loading, and error states.
10. **Respect accessibility and performance.** Maintain readable contrast, keyboard access, reduced-motion support, and sensible media loading.

## 1.3 Anti-patterns to avoid

- Overusing gold, gradients, metallic textures, or decorative borders.
- Generic clip-art houses, cranes, hard hats, or construction icons as the main brand identity.
- Excessively rounded “soft SaaS” cards and pill-shaped controls everywhere.
- Large blocks of centred text that are difficult to scan.
- Tiny uppercase text used for important information.
- Autoplaying video with sound.
- Heavy parallax, scroll-jacking, excessive entrance animations, or animated counters with unverified numbers.
- Carousels that hide important content or move automatically without user control.
- Fake testimonials, fictional project galleries, unsupported business claims, or invented customer ratings.
- A contact form that appears functional but has no configured delivery mechanism.
- An AI assistant that invents prices, legal assurances, project availability, or company policies.
- Placing critical contact information only in the footer or only inside the AI chat.

---

# 2. Colour system and semantic tokens

## 2.1 Approved core palette

The following six colours are the approved base palette from the Corporate Luxury direction.

| Token | Hex | Intended use |
|---|---:|---|
| `color.background` | `#F7F8FA` | Main page background and quiet section backgrounds. |
| `color.surface` | `#FFFFFF` | Cards, navigation after scroll, panels, and modal surfaces. |
| `color.text.primary` | `#14263D` | Main headings and body text. |
| `color.text.secondary` | `#667085` | Supporting text, descriptions, metadata, and labels. |
| `color.accent.gold` | `#B89452` | Decorative gold details, thin rules, selected icon details, and restrained highlights. |
| `color.border` | `#E4E8EE` | Dividers, card outlines, input borders, and separators. |

## 2.2 Supporting brand colours

These supporting colours extend the approved palette without changing its identity.

| Token | Hex | Intended use |
|---|---:|---|
| `color.navy.700` | `#14263D` | Primary brand navy and main text. |
| `color.navy.800` | `#10243B` | Stronger navy for footer, dark hero overlay, and selected emphasis areas. |
| `color.navy.900` | `#0B192A` | Deepest navy for rare high-contrast overlays. |
| `color.gold.700` | `#86652F` | Darker gold for small text or icons on light backgrounds where the base gold is too low-contrast. |
| `color.gold.100` | `#F5F0E6` | Very light gold-tinted background for selected callouts. |
| `color.white` | `#FFFFFF` | White surface and inverse text. |
| `color.gray.50` | `#F7F8FA` | Main light background. |
| `color.gray.100` | `#EEF1F4` | Subtle section and hover backgrounds. |
| `color.gray.200` | `#E4E8EE` | Standard border. |
| `color.gray.500` | `#667085` | Secondary text. |
| `color.gray.700` | `#344054` | Higher-emphasis supporting text. |

## 2.3 Semantic colour tokens

Components should consume semantic tokens rather than choosing arbitrary hex values.

| Semantic token | Value | Usage |
|---|---|---|
| `bg.page` | `#F7F8FA` | Default page background. |
| `bg.surface` | `#FFFFFF` | Card and panel backgrounds. |
| `bg.subtle` | `#EEF1F4` | Muted sections and hover surfaces. |
| `bg.inverse` | `#10243B` | Footer, dark callout, and inverse section. |
| `text.primary` | `#14263D` | Main text. |
| `text.secondary` | `#667085` | Supporting text. |
| `text.inverse` | `#FFFFFF` | Text on navy backgrounds. |
| `text.accent` | `#86652F` | Gold-toned text where contrast is required. |
| `action.primary` | `#14263D` | Primary button background and key links. |
| `action.primary.hover` | `#10243B` | Primary button hover. |
| `action.accent` | `#B89452` | Gold accent surface; use navy text on top. |
| `border.default` | `#E4E8EE` | Default component borders. |
| `border.strong` | `#CBD2DC` | Stronger separators and input emphasis. |
| `focus.ring` | `#B89452` | Visible keyboard-focus ring, with a contrasting outline where needed. |

## 2.4 Status colours

Status colours are functional, not decorative. Always pair colour with text or an icon so meaning is not communicated by colour alone.

| Status | Foreground | Soft background | Usage |
|---|---:|---:|---|
| Success | `#176B45` | `#EAF5EF` | Success confirmations and completed actions. |
| Warning | `#8A5700` | `#FFF4D8` | Cautions and pending states. |
| Error | `#B42318` | `#FDECEA` | Validation errors and failed actions. |
| Information | `#245F9E` | `#EAF2FB` | Informational notices and neutral guidance. |

## 2.5 Contrast and colour-use rules

- Use navy `#14263D` for primary text on white or light surfaces.
- Use white text on navy backgrounds.
- Do not use the base gold `#B89452` for small text on white. Use the darker gold `#86652F` for text/icon contrast, or use gold as a background with navy text.
- Gold must not be the only indicator of focus, error, selection, or project status.
- Check text and controls against WCAG 2.2 AA contrast targets before release: 4.5:1 for normal text and 3:1 for large text and relevant user-interface graphics.
- On the hero video, add a navy/black gradient overlay behind the text. Do not assume every video frame will provide sufficient contrast.

## 2.6 Suggested CSS variable names

```css
:root {
  --color-bg: #F7F8FA;
  --color-surface: #FFFFFF;
  --color-bg-subtle: #EEF1F4;
  --color-bg-inverse: #10243B;

  --color-text: #14263D;
  --color-text-secondary: #667085;
  --color-text-inverse: #FFFFFF;

  --color-primary: #14263D;
  --color-primary-hover: #10243B;
  --color-accent: #B89452;
  --color-accent-text: #86652F;

  --color-border: #E4E8EE;
  --color-border-strong: #CBD2DC;
  --color-focus: #B89452;

  --color-success: #176B45;
  --color-success-bg: #EAF5EF;
  --color-warning: #8A5700;
  --color-warning-bg: #FFF4D8;
  --color-error: #B42318;
  --color-error-bg: #FDECEA;
  --color-info: #245F9E;
  --color-info-bg: #EAF2FB;
}
```

---

# 3. Typography system

## 3.1 Font family

| Role | Font | Reason |
|---|---|---|
| Headings | **Manrope** | Geometric, confident, and contemporary; gives the brand a refined architectural feel. |
| Body and UI | **Inter** | Highly legible at small sizes and across navigation, descriptions, and controls. |
| Monospace | **IBM Plex Mono** | Reserved for technical metadata or development-only diagnostics; it should be rare on the public website. |

Use these fallback stacks:

```css
--font-heading: "Manrope", "Arial", sans-serif;
--font-body: "Inter", "Arial", sans-serif;
--font-mono: "IBM Plex Mono", "Courier New", monospace;
```

Prefer self-hosted, optimised WOFF2 font files for production. If external font delivery is used, minimise font weights and prevent layout shifts with appropriate font-display and fallback metrics.

## 3.2 Type scale

The scale uses a 1.2-style progression, adjusted for a premium marketing website. Sizes are in pixels; responsive display sizes may use `clamp()`.

| Token | Size | Line height | Weight | Typical use |
|---|---:|---:|---:|---|
| `type.xs` | 12px | 16px | 400–500 | Fine metadata; never critical content. |
| `type.sm` | 14px | 20px | 400–500 | Captions, labels, small navigation support. |
| `type.base` | 16px | 26px | 400 | Default body text. |
| `type.lg` | 18px | 28px | 400–500 | Intro paragraphs and prominent descriptions. |
| `type.xl` | 20px | 28px | 500–600 | Card titles and secondary headings. |
| `type.2xl` | 24px | 32px | 600 | Section subheadings. |
| `type.3xl` | 30px | 38px | 600 | Page section headings. |
| `type.4xl` | 36px | 44px | 600–700 | Smaller desktop page titles. |
| `type.5xl` | 48px | 56px | 600–700 | Main desktop section headings. |
| `type.6xl` | 60px | 64px | 600–700 | Homepage hero heading on large screens. |
| `type.7xl` | 72px | 76px | 600–700 | Optional large-screen hero display; use sparingly. |

## 3.3 Responsive heading guidance

- Homepage hero heading: `clamp(2.5rem, 5.3vw, 4.5rem)` with line-height around `1.04`.
- Page title: `clamp(2.25rem, 4vw, 3.75rem)` with line-height around `1.08`.
- Section heading: `clamp(1.75rem, 3vw, 3rem)` with line-height around `1.12`.
- Body text: 16px on desktop and mobile; do not shrink body text to fit a layout.
- Introductory paragraphs: 17–18px where space permits, with a comfortable line length.

## 3.4 Weight and text treatment

- Heading weights: 600 or 700.
- Body weight: 400.
- Navigation and button weight: 500 or 600.
- Eyebrow labels: 600, 11–12px, uppercase with restrained letter spacing (approximately `0.08em`).
- Do not set entire paragraphs in uppercase.
- Italics should be rare and reserved for editorial emphasis, not general UI.
- Avoid ultra-light font weights over busy photography.

## 3.5 Reading measure and line length

- Body paragraphs: target 55–75 characters per line on desktop.
- Hero copy: keep to a short headline and one concise supporting paragraph.
- Service descriptions: use short paragraphs or bullets, not dense walls of text.
- Keep heading widths controlled so desktop headings do not span the full viewport.

## 3.6 Numeric typography

Use tabular numerals for values that are likely to align or change, such as phone numbers, project metadata, dates, and any verified statistics:

```css
font-variant-numeric: tabular-nums;
```

Do not add animated or invented business metrics simply to create visual interest.

---

# 4. Layout, spacing, and elevation

## 4.1 Responsive breakpoints

Use a mobile-first layout. The values below align with common Tailwind breakpoints.

| Name | Width | Layout guidance |
|---|---:|---|
| `sm` | 640px | Larger phones and compact landscape layouts. |
| `md` | 768px | Tablets; introduce two-column content where it remains readable. |
| `lg` | 1024px | Desktop navigation and multi-column sections. |
| `xl` | 1280px | Full desktop content width. |
| `2xl` | 1536px | Wide-screen spacing; do not stretch text or cards indefinitely. |

## 4.2 Container system

- Main content maximum width: **1280px**.
- Wide hero/media maximum width: **1440px** where appropriate.
- Desktop horizontal page gutter: 48–64px, capped by the container.
- Tablet horizontal page gutter: 32px.
- Mobile horizontal page gutter: 20–24px.
- Keep paragraphs and narrow text blocks smaller than the main container.
- Align section headings, cards, and calls to action to a consistent content grid.

## 4.3 Grid system

| Viewport | Grid | Gutter | Typical usage |
|---|---|---:|---|
| Mobile | 4 columns | 16px | Single-column cards; two-column compact metadata only when clear. |
| Tablet | 8 columns | 20–24px | Two-column service and project layouts. |
| Desktop | 12 columns | 24px | Split hero content, three-column card grids, and editorial layouts. |

Recommended card layouts:

- Services: 1 column on small mobile, 2 columns on tablet, 3 or 4 columns on desktop depending on available width.
- Projects: 1 column on narrow mobile, 2 columns on tablet, 3 columns on desktop.
- About section: image and text split on desktop; stacked on mobile.
- Contact details: stacked cards on mobile; two-column or three-column grouping on desktop.

## 4.4 Spacing scale

Use a 4px base spacing unit. Prefer these values rather than arbitrary spacing.

| Token | Value | Typical use |
|---|---:|---|
| `space.1` | 4px | Icon/text micro-gap. |
| `space.2` | 8px | Compact control gaps. |
| `space.3` | 12px | Label/content gap. |
| `space.4` | 16px | Standard component padding. |
| `space.5` | 20px | Mobile page gutter and compact card padding. |
| `space.6` | 24px | Card padding and related content spacing. |
| `space.8` | 32px | Component groups. |
| `space.10` | 40px | Medium section spacing. |
| `space.12` | 48px | Desktop card padding and section internals. |
| `space.16` | 64px | Standard section separation. |
| `space.20` | 80px | Large section separation. |
| `space.24` | 96px | Hero/major section separation. |
| `space.30` | 120px | Very large desktop section separation only. |

Typical vertical section padding:

- Mobile: 56–72px.
- Tablet: 72–88px.
- Desktop: 88–112px.
- Hero: sized to the content and media; avoid forcing every page to use a full viewport height.

## 4.5 Border radius and shape

The visual language is structured and architectural. Use restrained rounding.

| Token | Value | Usage |
|---|---:|---|
| `radius.sm` | 4px | Small labels and compact UI. |
| `radius.md` | 8px | Buttons, inputs, and standard cards. |
| `radius.lg` | 12px | Larger cards and image containers. |
| `radius.xl` | 16px | Occasional featured panel or media frame. |
| `radius.full` | 9999px | Small status dots or truly circular icon controls only. |

Do not make every component pill-shaped. Keep image corners consistent within a section.

## 4.6 Elevation and shadows

Use elevation sparingly. Most sections should be separated by whitespace and subtle borders rather than heavy shadows.

| Token | Shadow | Usage |
|---|---|---|
| `shadow.none` | `none` | Default flat surfaces. |
| `shadow.sm` | `0 1px 3px rgba(16, 36, 59, 0.06)` | Subtle card separation. |
| `shadow.md` | `0 8px 24px rgba(16, 36, 59, 0.10)` | Floating chat panel, dropdowns, and hover emphasis. |
| `shadow.lg` | `0 16px 40px rgba(16, 36, 59, 0.14)` | Modal/gallery overlay only. |

## 4.7 Layering order

Use a consistent stacking order to prevent menus and overlays from appearing behind other content.

| Layer | Suggested z-index | Examples |
|---|---:|---|
| Base content | 0 | Sections, cards, media. |
| Header | 30 | Main navigation. |
| Dropdown/mobile menu | 40 | Navigation menu and submenus. |
| Floating contact/AI controls | 45 | WhatsApp shortcut and chat launcher. |
| Chat panel / lightbox | 50 | AI panel and project media viewer. |
| Modal backdrop and modal | 60 | Confirmation or media modal. |

---

# 5. Global shell and page specifications

## 5.1 Header and navigation

### Desktop header

- Position the header over the homepage hero at the top of the page.
- Initial state: transparent background with a suitable contrast treatment over the video.
- Scrolled state: solid white surface with a subtle bottom border or restrained shadow.
- Keep the transition between transparent and solid states smooth and quick.
- Place the Hillsview logo on the left, primary navigation centrally or towards the right, and a prominent contact action at the far right.
- Navigation items: **Home, About Us, Services, Projects, Contact Us**.
- Use a gold underline or small gold indicator for the active page; do not fill every navigation item with gold.
- Keep the header height approximately 80–88px on desktop and 68–76px on mobile.
- Use the supplied logo as-is. If a light/reversed logo variant is supplied, use it over the darkened hero. Do not recolour or redraw the official logo without approval.

### Mobile navigation

- Use a compact header with the logo and a clearly labelled menu button.
- Open the navigation in a full-height panel or a clean dropdown with a solid white background.
- Keep all five pages visible without horizontal scrolling.
- Include one clear WhatsApp/contact action in the open menu.
- Close the menu after a navigation selection and ensure Escape closes it.
- Keep focus inside an open modal-style menu where appropriate and return focus to the menu button when it closes.

### Transparent header behaviour

- Over the hero: use white navigation text only when the video overlay makes it clearly legible.
- After scrolling beyond the hero threshold: transition to a white background, navy text, and subtle border/shadow.
- On pages without a hero video, render the solid header by default.
- Do not let the transparent header obscure the first heading or important hero content.

## 5.2 Footer

Use a deep navy footer (`#10243B`) with white text and restrained gold accents.

Recommended content groups:

1. Hillsview logo and a short, approved company description.
2. Quick links to Home, About Us, Services, Projects, and Contact Us.
3. Services links or a compact list of the main service categories.
4. Official phone, WhatsApp, email, and office address.
5. Copyright line using the current year at runtime or during release maintenance.

Use real contact details only. Phone and email must be clickable. The WhatsApp link must use the official number and a correctly formatted WhatsApp URL. Do not show empty social-media icons or placeholder links.

## 5.3 Homepage

Recommended section order:

1. Transparent header over the hero.
2. Hero video with headline, short supporting message, and two calls to action.
3. Short company introduction.
4. Services overview with links to the combined Services page.
5. Selected projects using real Hillsview assets.
6. Company strengths or values using only verified claims.
7. Prominent contact callout.
8. Footer.

### Homepage hero video

- Use a high-quality architectural/construction video supplied or approved by Hillsview.
- Use `autoplay`, `muted`, and `playsinline` for a silent ambient background video; never autoplay sound.
- Provide a poster image so content appears immediately while the video loads.
- Add a dark navy gradient overlay behind text to preserve contrast across changing video frames.
- Keep the headline concise and left-aligned on desktop; use a clear stacked layout on mobile.
- Primary action: **Explore Our Services**.
- Secondary action: **Contact Hillsview** or **View Our Projects**.
- Use a video that remains visually calm behind the copy; avoid fast cuts and distracting motion.
- On reduced-motion settings, low-bandwidth conditions, or devices where autoplay is unavailable, use the poster image instead.
- Ensure the hero remains useful if the video fails to load.

## 5.4 About Us page

- Use a clear page title and concise introduction.
- Present the company overview, mission, vision, and values only when the content is supplied and approved.
- Use an editorial image/text split where suitable.
- Break long content into scannable sections with short headings.
- Do not insert invented founder profiles, years of operation, certifications, or achievements.

## 5.5 Services page — combined layout

All eight services appear on one Services page. Do not create eight separate service routes as part of this approved scope.

Recommended structure:

1. Page introduction explaining Hillsview's service offering.
2. Service overview grid with one card for each service.
3. A corresponding in-page detail section for each service, using anchor links from the overview cards if fuller descriptions are needed.
4. A clear contact/WhatsApp call to action after the service descriptions.

Each service card should include:

- A simple, consistent Lucide icon or approved image.
- Service name.
- One short, factual description.
- A “Make an Enquiry” or “Discuss This Service” link to the Contact page or WhatsApp.

Avoid giving all eight cards identical generic copy. The descriptions should be written and checked by Hillsview so they accurately represent the company's capabilities.

## 5.6 Projects page

- Use company-supplied project photographs and videos as the primary content.
- Use a consistent image ratio within each grid row; a deliberate editorial layout may vary ratios if the result remains orderly.
- Each project item may display a title, location, service type, and status only when supplied and verified.
- If projects are categorised by status (for example, completed or ongoing), use clear text labels and ensure Hillsview confirms the status.
- Clicking an image or video may open an accessible lightbox/media viewer.
- Provide keyboard controls, a visible close button, and a useful text alternative for images.
- Do not label concept imagery as completed work. Clearly identify concepts or illustrative visuals.

## 5.7 Contact Us page

- Make the official contact details the main content, not secondary footer information.
- Provide separate, clearly labelled actions for phone, WhatsApp, and email.
- Display the office address exactly as provided by Hillsview.
- Use appropriate links: `tel:` for phone, `mailto:` for email, and the official WhatsApp deep link for WhatsApp.
- If a map is later embedded, verify the address and use a privacy- and performance-conscious embed. A map is not required for the first design release.
- Do not display a non-functional enquiry form. A form should only be added when its submission destination and privacy handling are implemented and tested.

---

# 6. Component specifications

All components must use the design tokens defined in Sections 2–4. Components should have consistent default, hover, active, focus-visible, disabled, and loading states where applicable.

## 6.1 Buttons

### Variants

| Variant | Appearance | Primary use |
|---|---|---|
| Primary | Navy fill, white text | Main conversion actions. |
| Secondary | White/transparent fill, navy text, navy or grey border | Supporting actions. |
| Gold accent | Gold fill, navy text | One carefully chosen premium highlight; use sparingly. |
| Text link | No container, navy text, gold underline/arrow on interaction | Inline navigation and card actions. |
| Inverse | White fill or white outline on navy/dark media | Actions inside dark sections. |

### Dimensions

- Small: 36px high, 14px text, 16px horizontal padding.
- Medium/default: 44–48px high, 14–16px text, 20–24px horizontal padding.
- Large/hero: 50–54px high, 15–16px text, 24–28px horizontal padding.
- Border radius: 8px.
- Icon gap: 8px.

### Interaction states

- Hover: slightly darker fill or subtle background change; avoid scaling effects that move surrounding content.
- Active: visually pressed using a small colour/depth change.
- Focus-visible: clear 2px focus ring with offset; never remove the browser focus indication without replacing it.
- Disabled: muted colour and disabled cursor; explain why only when useful.
- Loading: preserve button width and show a small progress indicator with an accessible label.

Use action labels that explain the destination or result. Avoid vague labels such as “Click Here”.

## 6.2 Links

- Inline links should be visually distinguishable from surrounding body text.
- Use navy as the default link colour and a restrained underline or underline-on-hover treatment.
- External links should be identifiable where this matters to the visitor.
- Contact links should have clear labels and suitable icons; do not rely on icons alone.
- Provide a visible focus state for keyboard users.

## 6.3 Inputs and text areas

Inputs are needed primarily for the AI assistant's message composer. The first release does not require a customer lead-capture form.

| Property | Specification |
|---|---|
| Height | 44–48px for a single-line input. |
| Background | White. |
| Text | Navy primary. |
| Placeholder | Secondary grey with sufficient contrast. |
| Border | 1px solid `#E4E8EE`. |
| Radius | 8px. |
| Horizontal padding | 12–16px. |
| Focus | Navy border plus visible gold/contrasting focus ring. |
| Error | Error border, message, and icon/text; not colour alone. |
| Disabled | Muted surface and text, with a clear disabled state. |

The AI composer should support a single-line input that can expand to multiple lines if needed. Enter may submit; Shift+Enter should insert a new line when multiline behaviour is enabled. The send button must remain keyboard accessible.

## 6.4 Cards

### Service card

- White surface with a subtle border.
- Consistent icon container, service title, concise description, and text link.
- Optional small gold accent rule or icon detail.
- Hover: slight border emphasis and subtle elevation; no large movement.
- The full card may be clickable only if it has one clear destination. Do not nest multiple interactive links inside a clickable card surface.

### Project card

- Image/video preview is the visual focus.
- Use a consistent crop and `object-fit: cover`.
- Display verified project title and relevant metadata below or over a carefully darkened image area.
- Optional status badge only if the project status is confirmed.
- Hover: subtle image zoom or border emphasis; respect reduced motion.
- Give images meaningful alt text; decorative images use empty alt text.

### Information/value card

- Use for mission, vision, values, and company strengths where approved content exists.
- Keep the copy short and the icon treatment consistent.
- Avoid unsupported numerical claims or generic filler.

### Contact card

- Show a clear label, relevant icon, official contact value, and direct action.
- Make the whole card clickable only when the action is unambiguous.

## 6.5 Navigation components

- Desktop navigation: text links, active-page indicator, and one clear contact CTA.
- Mobile navigation: menu button with accessible name, expanded state, and keyboard support.
- Sticky/transparent state: maintain adequate contrast over both video and solid surfaces.
- Dropdowns should be used only if the navigation genuinely requires them; the approved five-page structure does not need complex nested navigation.

## 6.6 Badges and labels

Use badges for real metadata, such as a verified project status, not for decorative emphasis.

- Height: approximately 24–28px.
- Text: 12px, weight 500–600.
- Padding: 8–10px horizontally.
- Radius: 4–6px.
- Neutral badges use a light grey background and navy text.
- Status badges use the semantic status palette and explicit text.
- Do not use badges for every service title or navigation item.

## 6.7 Modals and media lightbox

Use modals only for meaningful focused tasks, principally project image/video viewing.

- Use a dark translucent backdrop.
- Keep the content surface white or the media area dark as appropriate.
- Include a visible close button with an accessible name.
- Close on Escape; backdrop click may close only when it will not cause accidental loss.
- Trap focus while open and return focus to the invoking element on close.
- Prevent background scrolling while open.
- On mobile, use a near-full-screen layout with safe-area padding.
- Do not use modals for routine navigation or basic company information.

## 6.8 Floating WhatsApp contact shortcut

- Use the official Hillsview WhatsApp number only.
- Place a compact floating shortcut near the bottom edge, away from the AI assistant launcher so the two controls do not overlap.
- Use a clear accessible label such as “Chat with Hillsview on WhatsApp”.
- Provide a visible focus state and a sufficiently large tap target (at least 44×44px; 48×48px preferred).
- On mobile, respect safe-area insets and ensure it does not cover important content or browser controls.

## 6.9 AI assistant widget

### Purpose and scope

The assistant answers straightforward questions about Hillsview's approved company information and points visitors to the official WhatsApp number or email for further enquiries and booking discussions. It is not a booking engine, lead form, CRM, quotation system, or customer account feature.

### Launcher

- Fixed near the bottom-right corner on desktop, with spacing from the WhatsApp shortcut.
- Use a navy circular or compact rounded-square button with a clear chat icon.
- Include a short accessible label such as “Ask Hillsview”.
- Do not obscure contact buttons, content, or mobile safe areas.

### Chat panel

- Desktop: floating panel approximately 360–400px wide and 520–600px tall, constrained to the viewport.
- Mobile: full-width or near-full-screen panel with safe-area padding; keep the close control visible.
- Header: “Hillsview Assistant”, short explanation, close button.
- Conversation: clear distinction between visitor and assistant messages; use calm neutral message surfaces and restrained navy accents.
- Welcome state: brief invitation and a small set of example questions, such as “What services do you offer?” and “How can I contact Hillsview?”.
- Composer: text input plus send button; show a disabled/loading state while a response is being generated.
- Response actions: display official WhatsApp and email links when appropriate.

### AI assistant states

1. **Closed:** launcher visible.
2. **Welcome:** greeting and example questions visible.
3. **Typing/loading:** visible progress indicator; prevent duplicate submissions where appropriate.
4. **Answered:** response shown in a readable message bubble.
5. **Cannot answer:** explain that the assistant does not have confirmed information and direct the visitor to WhatsApp or email.
6. **Connection error:** explain that the assistant is temporarily unavailable and show direct contact links.
7. **Empty input:** do not submit an empty message.

### Assistant content and trust rules

- Answers must be grounded in approved Hillsview content.
- Do not invent service availability, prices, project status, delivery dates, legal assurances, property ownership/title status, or construction quotations.
- For quotation, booking, property-specific, or other detailed enquiries, direct the visitor to Hillsview's official WhatsApp or email.
- Do not ask visitors to provide sensitive personal or financial information in the chat.
- Clearly communicate when the assistant cannot confirm an answer.
- Ensure contact details shown in AI responses match the official site-wide contact details.
- Keep API credentials out of frontend bundles. Send requests through the planned secure serverless/API endpoint.

## 6.10 Iconography

- Use Lucide React icons for interface actions and simple service-category support.
- Keep icon stroke weight consistent (normally 1.75–2px).
- Use a consistent size system: 16px inline, 20px standard controls, 24px prominent controls, 32px feature icons.
- Use labels alongside important contact icons.
- Avoid mixing outline, filled, and illustrated icon styles in the same interface.

## 6.11 Image and video treatment

- Prioritise Hillsview's authentic project media.
- Use high-resolution images with consistent colour treatment; do not apply strong filters that distort the real project appearance.
- Use responsive image sizes and modern formats such as WebP or AVIF where supported.
- Lazy-load below-the-fold images and videos.
- Provide width/height or aspect-ratio dimensions to reduce layout shift.
- Use descriptive alt text for informative imagery.
- Keep hero video muted, inline, and supported by a poster fallback.
- Compress video appropriately and avoid unnecessarily large source files.
- Do not use image/video content without permission or appropriate rights.

---

# 7. Motion and interaction behaviour

## 7.1 Motion principles

Motion should feel refined and purposeful, never theatrical. Use it to clarify state changes, reveal content gently, and provide feedback.

| Token | Duration | Usage |
|---|---:|---|
| `motion.fast` | 120–160ms | Hover, focus, and small control changes. |
| `motion.normal` | 180–240ms | Menus, buttons, cards, and header transitions. |
| `motion.slow` | 280–400ms | Larger panel or section transitions. |

Recommended easing: `cubic-bezier(0.2, 0.8, 0.2, 1)` for entering elements and a simple ease-out for exits.

## 7.2 Approved motion patterns

- Header background transition from transparent to solid.
- Subtle card border/shadow change on hover.
- Short fade/translate entrance for key content where it improves hierarchy.
- Smooth opening and closing of the AI assistant and mobile navigation.
- Subtle project image zoom on hover, if reduced motion is respected.

## 7.3 Reduced motion

When `prefers-reduced-motion: reduce` is active:

- Disable non-essential entrance and parallax animations.
- Use the hero poster image instead of autoplaying video.
- Remove image zoom and large movement transitions.
- Keep state changes immediate or use very short fades only where necessary.

---

# 8. Responsive behaviour

## 8.1 Mobile-first requirements

- No horizontal page scrolling at 320px viewport width.
- All primary navigation items remain reachable.
- Buttons and interactive controls have at least 44×44px touch targets; 48px is preferred for primary actions.
- Stack two-column layouts vertically when content becomes cramped.
- Preserve readable font sizes and comfortable line lengths.
- Ensure floating WhatsApp and AI controls do not overlap.
- Keep project gallery controls usable with touch and keyboard.
- Use the hero poster image when video playback would materially harm mobile performance or when reduced motion is enabled.

## 8.2 Responsive media

- Use `object-fit: cover` for visual media where cropping is intentional.
- Set a focal point per image so important building features are not cropped on mobile.
- Use a dedicated mobile crop when a desktop crop cannot preserve the subject.
- Avoid embedding large desktop-only video files on mobile if a smaller rendition or poster is sufficient.

## 8.3 Responsive navigation and content hierarchy

- Desktop: full horizontal navigation.
- Mobile: compact header with menu toggle and contact action.
- Cards: 1–2 columns on mobile depending on content width; 2 columns on tablet; 3–4 columns on desktop where appropriate.
- Section headings: remain left-aligned in most content sections. Centre-align only short hero or callout content when deliberate.

---

# 9. Accessibility and usability standards

Target **WCAG 2.2 AA** for the public-facing website.

- Use semantic HTML landmarks: `header`, `nav`, `main`, `section`, and `footer` appropriately.
- Keep a logical heading hierarchy with one clear `h1` per page.
- Ensure all navigation, buttons, media viewers, and chat controls work with a keyboard.
- Provide visible focus indicators.
- Give images meaningful alt text when they communicate information; use empty alt text for decorative images.
- Do not rely on colour alone to communicate status or errors.
- Maintain contrast for text, buttons, icons, and focus indicators.
- Label all inputs and icon-only buttons accessibly.
- Provide clear validation and error feedback.
- Respect reduced-motion preferences.
- Ensure the AI assistant can be opened, used, and closed without a mouse.
- Ensure the mobile menu and chat panel announce their expanded/open state to assistive technology.
- Avoid placing important text directly over visually busy image areas without an overlay.

---

# 10. Content and brand asset guidelines

## 10.1 Logo

- Use the official Hillsview logo supplied by the company.
- Preserve its original proportions, spacing, colours, and clear space.
- Do not stretch, skew, add effects, or recreate the logo with plain text.
- Use a light/reversed logo only if an approved variant exists.
- Keep enough space around the logo in desktop and mobile headers.

## 10.2 Photography and video

- Authentic Hillsview work should be prioritised over generic stock imagery.
- Select images with strong composition, good lighting, and visible architectural detail.
- Avoid images that imply Hillsview completed work that it did not complete.
- When stock imagery is used for a general service illustration, do not present it as a Hillsview project.
- Use consistent aspect ratios in repeated card grids.
- Keep hero video visually calm, with a clear subject and no embedded captions or branding that conflicts with the Hillsview identity.

## 10.3 Copy and messaging

- Use clear, professional, plain English.
- Prefer specific descriptions of what Hillsview does over exaggerated claims.
- Keep hero copy short and benefit-oriented.
- Explain service scope in practical terms.
- Use the same service names across the homepage, Services page, footer, and AI assistant knowledge source.
- Verify every phone number, WhatsApp link, email address, and office address before release.

---

# 11. Frontend implementation alignment

This design system is intended to be implemented with the stack discussed during discovery:

| Layer | Selected technology | Design-system responsibility |
|---|---|---|
| Frontend framework | React + Vite | Page composition and reusable UI components. |
| Language | JavaScript | Component behaviour and interaction logic. |
| Styling | Tailwind CSS | Design tokens, responsive layout, and component styling. |
| Motion | Framer Motion | Approved transitions and reduced-motion-aware animation. |
| Icons | Lucide React | Consistent interface and service icons. |
| Hosting | Vercel or Netlify | Static frontend deployment. |
| AI connection | External AI API via secure serverless/API endpoint | Securely connect the assistant without exposing credentials in the browser. |

Implementation guidelines:

- Define design tokens centrally and reference them from Tailwind configuration or CSS variables.
- Build shared components for Header, Footer, Button, ServiceCard, ProjectCard, ContactCard, Badge, MobileMenu, and AIChatWidget.
- Keep page-specific layout separate from reusable components.
- Use semantic links for navigation and direct contact actions.
- Do not build a traditional backend solely for static page content.
- The AI endpoint is a separate, minimal integration requirement; it must protect API credentials and apply basic request validation and rate limiting before public launch.
- Keep the AI's source content aligned with approved company information. The assistant must not treat unverified website copy or visitor messages as authority to make company commitments.

---

# 12. Quality checklist before launch

## Brand and visual consistency

- [ ] Official Hillsview logo is used without distortion.
- [ ] Navy, white, and gold usage follows the approved tokens.
- [ ] Heading and body typography use the chosen font families and scale.
- [ ] Spacing, borders, radii, and shadows are consistent.
- [ ] No unsupported company claims or placeholder content remain.

## Pages and navigation

- [ ] Home, About Us, Services, Projects, and Contact Us pages are present.
- [ ] All eight approved service categories appear on the combined Services page.
- [ ] Desktop and mobile navigation work on every page.
- [ ] Transparent hero header transitions to the solid scrolled state.
- [ ] Footer contains verified contact details and working links.

## Media and performance

- [ ] Hero video is muted, inline, and has a poster fallback.
- [ ] Reduced-motion users receive a still-image experience.
- [ ] Images and videos are compressed and appropriately lazy-loaded.
- [ ] Layout does not jump while media loads.
- [ ] Mobile layouts remain usable on slower connections.

## Contact and AI assistant

- [ ] Phone, WhatsApp, and email links use verified official details.
- [ ] WhatsApp opens the correct company number.
- [ ] AI assistant answers only from approved Hillsview information.
- [ ] Unanswered questions are escalated to WhatsApp or email.
- [ ] AI API credentials are not exposed in frontend source or network responses.
- [ ] Loading, unavailable, error, and empty-input states are handled.
- [ ] AI assistant does not claim to accept bookings or collect customer leads.

## Accessibility and QA

- [ ] Keyboard navigation and visible focus states are verified.
- [ ] Colour contrast meets WCAG 2.2 AA targets.
- [ ] Images have appropriate alternative text.
- [ ] Mobile menu, modals, and AI panel are keyboard accessible.
- [ ] Reduced-motion preferences are respected.
- [ ] Pages are checked at mobile, tablet, desktop, and wide-screen sizes.

---

## Final design lock

The Hillsview website uses a **Corporate Luxury, light-only design system** built around deep navy, white, and restrained gold accents. Its homepage opens with an architectural video hero under a transparent header that becomes solid on scroll. The site has five primary pages, with all eight services presented on one combined Services page. A lightweight AI assistant answers basic company questions and directs visitors to Hillsview's official WhatsApp or email for further enquiries and booking discussions.

This design system is the visual and component reference for implementing the Hillsview website. Any change to the approved direction, page scope, or assistant behaviour should be reflected here before implementation diverges.
