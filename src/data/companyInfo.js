/**
 * Centralized Source of Truth for Hillsview Corporate Information, Services & Visual Assets
 * Never hardcode contact details across individual components.
 */

export const companyInfo = {
  name: 'Hillsview',
  legalTitle: 'Hillsview Construction & Real Estate Management',
  category: 'Construction & Real Estate Management',
  whatsappDisplay: '08137669291',
  whatsappInternational: '+2348137669291',
  whatsappLink: 'https://wa.me/2348137669291',
  email: 'akins2chris@gmail.com',
  emailLink: 'mailto:akins2chris@gmail.com',
  location: 'Lagos State, Nigeria',
  officeAddress: null, // Verified street address not yet supplied; do not invent
  phone: null, // Separate voice-call line not yet supplied; use WhatsApp or email
  logo: `${import.meta.env.BASE_URL}assets/logo.png`,
  logoLight: `${import.meta.env.BASE_URL}assets/logo-light.png`,
  logoOriginal: `${import.meta.env.BASE_URL}assets/Logo.jpg`,
  heroVideo: `${import.meta.env.BASE_URL}assets/HeroVideo.mp4`,
  heroPoster: `${import.meta.env.BASE_URL}assets/2.PNG`,
  tagline: 'BUILDING TOMORROW. MANAGING VALUE.',
  supportingCopy:
    'Hillsview builds, designs, and manages residential and commercial property across Lagos State, with disciplined engineering and direct site supervision.',
};

export function getWhatsAppInquiryUrl(topic = '') {
  const base = companyInfo.whatsappLink;
  if (!topic) return base;
  const text = encodeURIComponent(
    `Hello Hillsview, I would like to make an enquiry regarding ${topic}.`
  );
  return `${base}?text=${text}`;
}

export function getEmailInquiryUrl(subject = 'Service enquiry, Hillsview', body = '') {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString().replace(/\+/g, '%20');
  return query ? `${companyInfo.emailLink}?${query}` : companyInfo.emailLink;
}

export const servicesData = [
  {
    id: 'building-construction',
    title: 'Building construction',
    shortSummary:
      'Residential, commercial, and institutional construction with disciplined site supervision and tested materials.',
    description:
      'Hillsview manages building construction from foundation works to structural framing, roofing, and interior finishes. Experienced site engineers supervise every phase on site to verify structural integrity and keep work on schedule.',
    benefit:
      'Single-point accountability for structural execution, material quality control, and on-site safety.',
    deliverables: [
      'Site setting-out and reinforced foundation construction',
      'Structural concrete framing, masonry, and roofing systems',
      'Mechanical, electrical, plumbing, and interior finishing',
    ],
    icon: 'HardHat',
    image: `${import.meta.env.BASE_URL}assets/1.PNG`,
    imageAlt: 'Hillsview site engineer inspecting structural concrete construction',
  },
  {
    id: 'architectural-design',
    title: 'Architectural design',
    shortSummary:
      'Spatial planning, technical documentation, and 3D architectural models tailored to contemporary briefs.',
    description:
      'We translate project requirements and site conditions into buildable, well-proportioned buildings. Designs balance natural light, ventilation, circulation, and weather-resistant facade materials suited to the Lagos climate.',
    benefit:
      'Detailed architectural drawings and spatial models that direct site construction without ambiguity.',
    deliverables: [
      'Floor plans, elevations, and functional spatial layouts',
      '3D architectural visualization and material schedules',
      'Detailed working drawings for site execution and statutory approval',
    ],
    icon: 'Compass',
    image: `${import.meta.env.BASE_URL}assets/3.PNG`,
    imageAlt: 'Architectural scale model and technical floor plan drawings on drafting desk',
  },
  {
    id: 'civil-engineering',
    title: 'Civil engineering',
    shortSummary:
      'Substructure foundations, site drainage, and infrastructure engineered for local soil conditions.',
    description:
      'Hillsview provides civil and structural engineering for buildings and estates across Lagos State. We calculate load capacities, design stormwater drainage, and build durable road and perimeter infrastructure.',
    benefit:
      'Engineered foundations and drainage networks that prevent structural settlement and seasonal flooding.',
    deliverables: [
      'Foundation engineering and reinforced concrete calculations',
      'Estate roads, culverts, and stormwater drainage systems',
      'Structural inspections and concrete test coordination',
    ],
    icon: 'Layers',
    image: `${import.meta.env.BASE_URL}assets/9.PNG`,
    imageAlt: 'Civil engineering team reviewing structural plans beside tower crane on site',
  },
  {
    id: 'real-estate-development',
    title: 'Real estate development',
    shortSummary:
      'Residential estates, multi-unit housing, and commercial properties built for long-term value.',
    description:
      'We plan and construct residential and mixed-use developments from site layout through completion. Each development prioritises functional layouts, shared utilities, perimeter security, and durable building envelopes.',
    benefit:
      'Well-built residential and commercial assets planned for owner-occupiers and long-term rental income.',
    deliverables: [
      'Master-planned residential estates and gated communities',
      'Multi-storey apartment blocks and commercial developments',
      'Shared estate utilities, roads, perimeter walls, and access control',
    ],
    icon: 'Building2',
    image: `${import.meta.env.BASE_URL}assets/2.PNG`,
    imageAlt: 'Multi-tower residential real estate development overlooking landscaped grounds',
  },
  {
    id: 'property-management',
    title: 'Property management',
    shortSummary:
      'Facility maintenance, routine inspections, and tenant administration that protect asset value.',
    description:
      'Hillsview handles day-to-day operations for residential estates, apartment buildings, and commercial property. We manage preventive maintenance schedules, vendor contracts, common-area services, and tenant communication.',
    benefit:
      'Consistent physical upkeep and responsive facility support that preserve occupancy and property value.',
    deliverables: [
      'Scheduled preventive maintenance and facility audits',
      'Tenant relations, lease administration, and move-in coordination',
      'Security, power, water supply, and vendor supervision',
    ],
    icon: 'ShieldCheck',
    image: `${import.meta.env.BASE_URL}assets/4.PNG`,
    imageAlt: 'Property management professional reviewing residential building maintenance',
  },
  {
    id: 'property-sales-rentals',
    title: 'Property sales and rentals',
    shortSummary:
      'Marketing, client advisory, and transaction support for residential homes and commercial units.',
    description:
      'We connect property owners, buyers, and tenants across Lagos State. Our team arranges verified viewings, prepares property documentation, and coordinates leasing and sales transactions to handover.',
    benefit:
      'Clear transaction terms and direct inspection scheduling based on current Lagos market demand.',
    deliverables: [
      'Residential and commercial property sales coordination',
      'Lease marketing and physical property viewings',
      'Documentation review and handover coordination',
    ],
    icon: 'KeyRound',
    image: `${import.meta.env.BASE_URL}assets/10.PNG`,
    imageAlt: 'Contemporary residence with structural glazing and poolside terrace at dusk',
  },
  {
    id: 'renovation-maintenance',
    title: 'Renovation and maintenance',
    shortSummary:
      'Structural repairs, roofing replacement, facade upgrades, and interior remodelling.',
    description:
      'Whether modernising an existing home, upgrading commercial offices, or replacing weathered roofing systems, Hillsview executes clean, planned renovation works that resolve defects and restore building comfort.',
    benefit:
      'Fixed structural or waterproofing faults, modernised interiors, and renewed building facades.',
    deliverables: [
      'Roofing rehabilitation, ridge repairs, and waterproofing',
      'Interior spatial reconfigurations, tiling, and lighting upgrades',
      'Perimeter walls, access gates, and plumbing system refurbishment',
    ],
    icon: 'Wrench',
    image: `${import.meta.env.BASE_URL}assets/12.PNG`,
    imageAlt: 'Precision architectural stone-coated roof tiling installation',
  },
  {
    id: 'land-acquisition-consultancy',
    title: 'Land acquisition and consultancy',
    shortSummary:
      'Site suitability evaluation, topography assessment, and development planning in Lagos State.',
    description:
      'Acquiring land for construction requires assessing soil conditions, access roads, drainage paths, and development feasibility. Hillsview evaluates candidate sites and outlines viable construction timelines before clients commit capital.',
    benefit:
      'Clear pre-purchase site evaluation that prevents costly foundation surprises and zoning conflicts.',
    deliverables: [
      'Physical site inspections and access assessments',
      'Development feasibility and building capacity analysis',
      'Advisory on residential and commercial land acquisition',
    ],
    icon: 'MapPin',
    image: `${import.meta.env.BASE_URL}assets/5.PNG`,
    imageAlt: 'Aerial view of residential estate layout and planned access roads',
  },
];

export const projectsPortfolio = [
  {
    id: 'proj-highrise-sunset',
    title: 'High-rise residential towers visualization',
    category: 'Real estate development',
    discipline: 'Residential development',
    mediaType: 'image',
    src: `${import.meta.env.BASE_URL}assets/2.PNG`,
    aspect: 'landscape',
    caption:
      'Multi-tower residential concept with podium gardens and water features.',
  },
  {
    id: 'proj-villa-cantilever',
    title: 'Cantilevered glass and steel residence',
    category: 'Architectural design',
    discipline: 'Architectural and interior design',
    mediaType: 'image',
    src: `${import.meta.env.BASE_URL}assets/10.PNG`,
    aspect: 'landscape',
    caption:
      'Contemporary residential design with floor-to-ceiling structural glazing and a poolside terrace.',
  },
  {
    id: 'proj-site-supervision',
    title: 'Structural concrete and formwork supervision',
    category: 'Building construction',
    discipline: 'Building and civil works',
    mediaType: 'image',
    src: `${import.meta.env.BASE_URL}assets/1.PNG`,
    aspect: 'landscape',
    caption:
      'On-site engineering supervision during reinforced concrete slab and scaffolding installation.',
  },
  {
    id: 'proj-commercial-portal',
    title: 'Commercial entrance portal and lobby',
    category: 'Building construction',
    discipline: 'Architectural and interior design',
    mediaType: 'image',
    src: `${import.meta.env.BASE_URL}assets/15.PNG`,
    aspect: 'square',
    caption:
      'Three-storey stone-clad commercial entrance portal with architectural reveal lighting.',
  },
  {
    id: 'proj-master-estate',
    title: 'Master-planned residential estate corridor',
    category: 'Real estate development',
    discipline: 'Residential development',
    mediaType: 'image',
    src: `${import.meta.env.BASE_URL}assets/5.PNG`,
    aspect: 'landscape',
    caption:
      'Planned residential enclave with structured internal road networks, green buffers, and detached homes.',
  },
  {
    id: 'proj-architectural-model',
    title: 'Scale architectural model and drawings',
    category: 'Architectural design',
    discipline: 'Architectural and interior design',
    mediaType: 'image',
    src: `${import.meta.env.BASE_URL}assets/3.PNG`,
    aspect: 'landscape',
    caption:
      'Physical spatial model and floor plan coordination for a multi-level contemporary residence.',
  },
  {
    id: 'proj-gated-boulevard',
    title: 'Gated residential villa enclave',
    category: 'Real estate development',
    discipline: 'Residential development',
    mediaType: 'image',
    src: `${import.meta.env.BASE_URL}assets/8.PNG`,
    aspect: 'landscape',
    caption:
      'Detached residential villas arranged along a paved, landscaped estate roadway.',
  },
  {
    id: 'proj-civil-crane',
    title: 'Structural frame and crane operations',
    category: 'Civil engineering',
    discipline: 'Building and civil works',
    mediaType: 'image',
    src: `${import.meta.env.BASE_URL}assets/9.PNG`,
    aspect: 'landscape',
    caption:
      'Structural engineering coordination on an active multi-storey construction site.',
  },
  {
    id: 'proj-double-height-interior',
    title: 'Double-height living area and mezzanine',
    category: 'Renovation and maintenance',
    discipline: 'Architectural and interior design',
    mediaType: 'image',
    src: `${import.meta.env.BASE_URL}assets/6.PNG`,
    aspect: 'landscape',
    caption:
      'Interior architectural fit-out with large-format marble flooring, ceiling coffers, and glass balustrades.',
  },
  {
    id: 'proj-perimeter-gate',
    title: 'Stone and steel security entrance gate',
    category: 'Property management',
    discipline: 'Property and facility management',
    mediaType: 'image',
    src: `${import.meta.env.BASE_URL}assets/11.PNG`,
    aspect: 'landscape',
    caption:
      'Perimeter access gate with dressed stone pillars, horizontal steel slats, and integrated exterior lighting.',
  },
  {
    id: 'proj-marble-salon',
    title: 'Book-matched marble reception hall',
    category: 'Renovation and maintenance',
    discipline: 'Architectural and interior design',
    mediaType: 'image',
    src: `${import.meta.env.BASE_URL}assets/13.PNG`,
    aspect: 'square',
    caption:
      'Interior detailing with book-matched stone wall cladding, timber panelling, and custom lighting.',
  },
  {
    id: 'proj-roofing-detail',
    title: 'Hip-roof stone-coated tile installation',
    category: 'Renovation and maintenance',
    discipline: 'Building and civil works',
    mediaType: 'image',
    src: `${import.meta.env.BASE_URL}assets/12.PNG`,
    aspect: 'landscape',
    caption:
      'Weather-resistant stone-coated roof tile installation and ridge capping for long-term building protection.',
  },
  {
    id: 'proj-curtain-wall',
    title: 'Curtain-wall glazing and masonry facade',
    category: 'Architectural design',
    discipline: 'Architectural and interior design',
    mediaType: 'image',
    src: `${import.meta.env.BASE_URL}assets/14.PNG`,
    aspect: 'landscape',
    caption:
      'Aluminium mullion glazing and textured masonry facade under evening light.',
  },
  {
    id: 'proj-property-inspection',
    title: 'Residential facility audit and operations',
    category: 'Property management',
    discipline: 'Property and facility management',
    mediaType: 'image',
    src: `${import.meta.env.BASE_URL}assets/4.PNG`,
    aspect: 'landscape',
    caption:
      'Property management inspection and digital facility auditing for multi-unit residential buildings.',
  },
];

export const companyStrengths = [
  {
    title: 'Direct on-site engineering supervision',
    description:
      'Our engineers verify material specifications, rebar placement, and concrete batching on site at every pour to maintain structural safety.',
  },
  {
    title: 'Unified design and construction coordination',
    description:
      'Architects and civil engineers work together from initial blueprints through site handover, eliminating design conflicts and rework.',
  },
  {
    title: 'Active facility maintenance',
    description:
      'We support property owners beyond handover with scheduled mechanical, electrical, and plumbing maintenance that preserves building value.',
  },
  {
    title: 'Transparent milestone reporting',
    description:
      'Clients receive regular photographic progress updates, clear budget tracking, and direct communication on WhatsApp and email.',
  },
  {
    title: 'Full property lifecycle coverage',
    description:
      'From land feasibility assessment through architectural planning, site construction, leasing, and repairs, we support every phase of ownership.',
  },
];

export const coreValues = [
  {
    title: 'Structural integrity',
    description:
      'We build to tested engineering codes, refuse substandard materials, and supervise every structural joint on site.',
  },
  {
    title: 'Functional design',
    description:
      'Every floor plan is drawn for practical daily living, natural ventilation, daylight, and long-term durability in Lagos.',
  },
  {
    title: 'Accountable stewardship',
    description:
      'We manage client capital, construction schedules, and tenanted properties with transparent documentation and timely updates.',
  },
  {
    title: 'Durable construction',
    description:
      'We choose materials, waterproofing systems, and finishes that withstand coastal weather and maintain their value over decades.',
  },
];
