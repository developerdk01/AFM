const fs = require('fs');
const path = require('path');

const emblemConcepts = [
  {
    id: '01',
    numberStr: '01',
    name: '01 — AATMANIRBHAR EMBLEM',
    shortTitle: 'The Apex A Crest',
    category: 'emblem',
    theme: 'Automotive/Superhero Apex Crest & Razor-Sharp Geometry',
    colors: [
      { name: 'Obsidian Black', hex: '#0B0F19' },
      { name: 'Luxe Gold', hex: '#D4AF37' },
      { name: 'Pure White', hex: '#FFFFFF' }
    ],
    rationale: 'Concept 01 is a razor-sharp geometric crest centered around an empowered letter "A". Thick winged facets outline an ascending spearhead peak, giving the mark the presence of a luxury automotive badge or cinematic hero crest.',
    
    mainSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 220" width="100%" height="100%">
      <g transform="translate(0, 0)">
        <g transform="translate(225, 70)">
          <!-- Outer Shield / Diamond Frame -->
          <polygon points="0,-60 55,-25 45,45 0,65 -45,45 -55,-25" fill="#0B0F19"/>
          <!-- Inner Faceted Golden A -->
          <polygon points="0,-48 36,-10 26,-10 0,-34 -26,-10 -36,-10" fill="#D4AF37"/>
          <polygon points="0,-48 26,-10 20,35 0,15 -20,35 -26,-10" fill="#EAB308" opacity="0.8"/>
          <!-- Central Rising Diamond Spearhead -->
          <polygon points="0,-25 15,10 0,32 -15,10" fill="#FFFFFF"/>
          <!-- Crossbar Wedge -->
          <polygon points="-32,8 32,8 24,18 -24,18" fill="#D4AF37"/>
        </g>
        <text x="225" y="165" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#0B0F19" text-anchor="middle" letter-spacing="4">AATMANIRBHAR</text>
        <text x="225" y="188" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#64748B" text-anchor="middle" letter-spacing="4">FACILITY MANAGEMENT PVT. LTD.</text>
      </g>
    </svg>`,

    iconOnlySvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
      <g transform="translate(80, 80)">
        <polygon points="0,-60 55,-25 45,45 0,65 -45,45 -55,-25" fill="#0B0F19"/>
        <polygon points="0,-48 36,-10 26,-10 0,-34 -26,-10 -36,-10" fill="#D4AF37"/>
        <polygon points="0,-48 26,-10 20,35 0,15 -20,35 -26,-10" fill="#EAB308" opacity="0.8"/>
        <polygon points="0,-25 15,10 0,32 -15,10" fill="#FFFFFF"/>
        <polygon points="-32,8 32,8 24,18 -24,18" fill="#D4AF37"/>
      </g>
    </svg>`,

    horizontalSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120" width="100%" height="100%">
      <g transform="translate(20, 10)">
        <g transform="translate(50, 50) scale(0.65)">
          <polygon points="0,-60 55,-25 45,45 0,65 -45,45 -55,-25" fill="#0B0F19"/>
          <polygon points="0,-48 36,-10 26,-10 0,-34 -26,-10 -36,-10" fill="#D4AF37"/>
          <polygon points="0,-25 15,10 0,32 -15,10" fill="#FFFFFF"/>
        </g>
        <text x="135" y="52" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#0B0F19" letter-spacing="3">AATMANIRBHAR</text>
        <text x="135" y="74" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#64748B" letter-spacing="3.5">FACILITY MANAGEMENT PVT. LTD.</text>
      </g>
    </svg>`,

    bwSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 220" width="100%" height="100%">
      <g transform="translate(0, 0)">
        <g transform="translate(225, 70)">
          <polygon points="0,-60 55,-25 45,45 0,65 -45,45 -55,-25" fill="#FFFFFF"/>
          <polygon points="0,-48 36,-10 26,-10 0,-34 -26,-10 -36,-10" fill="#000000"/>
          <polygon points="0,-25 15,10 0,32 -15,10" fill="#FFFFFF"/>
        </g>
        <text x="225" y="165" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#FFFFFF" text-anchor="middle" letter-spacing="4">AATMANIRBHAR</text>
        <text x="225" y="188" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#94A3B8" text-anchor="middle" letter-spacing="4">FACILITY MANAGEMENT PVT. LTD.</text>
      </g>
    </svg>`,

    wordmarkOnlySvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 100" width="100%" height="100%">
      <text x="225" y="45" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="26" fill="#0B0F19" text-anchor="middle" letter-spacing="4">AATMANIRBHAR</text>
      <text x="225" y="72" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="11" fill="#64748B" text-anchor="middle" letter-spacing="4">FACILITY MANAGEMENT PVT. LTD.</text>
    </svg>`
  },

  {
    id: '02',
    numberStr: '02',
    name: '02 — AFM SYMBOL',
    shortTitle: 'Unified Monogram Emblem',
    category: 'emblem',
    theme: 'Merged Letters A + F + M into a Single Shield Insignia',
    colors: [
      { name: 'Midnight Navy', hex: '#0A192F' },
      { name: 'Silver Platinum', hex: '#CBD5E1' },
      { name: 'Pure White', hex: '#FFFFFF' }
    ],
    rationale: 'Concept 02 weaves the letters A, F, and M into one unified shield monogram. The outer triangle forms "A", the central pillar forms "F", and the twin base arches form "M", creating a powerful global defense/tech enterprise crest.',
    
    mainSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 220" width="100%" height="100%">
      <g transform="translate(0, 0)">
        <g transform="translate(225, 70)">
          <!-- Outer Hex Shield Frame -->
          <polygon points="0,-60 52,-30 52,30 0,60 -52,30 -52,-30" fill="#0A192F"/>
          <!-- Inner AFM Interlocking Lines -->
          <!-- A Peak & Outers -->
          <path d="M-36,25 L0,-42 L36,25 M-25,5 L25,5" fill="none" stroke="#CBD5E1" stroke-width="7" stroke-linecap="round"/>
          <!-- F Central Stem & Crosses -->
          <path d="M0,-42 L0,35 M0,-15 L22,-15" fill="none" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round"/>
          <!-- M Twin Arches -->
          <path d="M-36,35 L-18,10 L0,35 L18,10 L36,35" fill="none" stroke="#CBD5E1" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        <text x="225" y="165" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#0A192F" text-anchor="middle" letter-spacing="4">AATMANIRBHAR</text>
        <text x="225" y="188" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#64748B" text-anchor="middle" letter-spacing="4">FACILITY MANAGEMENT PVT. LTD.</text>
      </g>
    </svg>`,

    iconOnlySvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
      <g transform="translate(80, 80)">
        <polygon points="0,-60 52,-30 52,30 0,60 -52,30 -52,-30" fill="#0A192F"/>
        <path d="M-36,25 L0,-42 L36,25 M-25,5 L25,5" fill="none" stroke="#CBD5E1" stroke-width="7" stroke-linecap="round"/>
        <path d="M0,-42 L0,35 M0,-15 L22,-15" fill="none" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round"/>
        <path d="M-36,35 L-18,10 L0,35 L18,10 L36,35" fill="none" stroke="#CBD5E1" stroke-width="6" stroke-linecap="round"/>
      </g>
    </svg>`,

    horizontalSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120" width="100%" height="100%">
      <g transform="translate(20, 10)">
        <g transform="translate(50, 50) scale(0.65)">
          <polygon points="0,-60 52,-30 52,30 0,60 -52,30 -52,-30" fill="#0A192F"/>
          <path d="M-36,25 L0,-42 L36,25 M-25,5 L25,5" fill="none" stroke="#CBD5E1" stroke-width="7"/>
          <path d="M0,-42 L0,35 M0,-15 L22,-15" fill="none" stroke="#FFFFFF" stroke-width="7"/>
        </g>
        <text x="135" y="52" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#0A192F" letter-spacing="3">AATMANIRBHAR</text>
        <text x="135" y="74" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#64748B" letter-spacing="3.5">FACILITY MANAGEMENT PVT. LTD.</text>
      </g>
    </svg>`,

    bwSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 220" width="100%" height="100%">
      <g transform="translate(0, 0)">
        <g transform="translate(225, 70)">
          <polygon points="0,-60 52,-30 52,30 0,60 -52,30 -52,-30" fill="#FFFFFF"/>
          <path d="M-36,25 L0,-42 L36,25 M-25,5 L25,5" fill="none" stroke="#000000" stroke-width="7"/>
          <path d="M0,-42 L0,35" fill="none" stroke="#000000" stroke-width="7"/>
        </g>
        <text x="225" y="165" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#FFFFFF" text-anchor="middle" letter-spacing="4">AATMANIRBHAR</text>
        <text x="225" y="188" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#94A3B8" text-anchor="middle" letter-spacing="4">FACILITY MANAGEMENT PVT. LTD.</text>
      </g>
    </svg>`,

    wordmarkOnlySvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 100" width="100%" height="100%">
      <text x="225" y="45" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="26" fill="#0A192F" text-anchor="middle" letter-spacing="4">AATMANIRBHAR</text>
      <text x="225" y="72" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="11" fill="#64748B" text-anchor="middle" letter-spacing="4">FACILITY MANAGEMENT PVT. LTD.</text>
    </svg>`
  },

  {
    id: '03',
    numberStr: '03',
    name: '03 — A + HUMAN POWER',
    shortTitle: 'Workforce Titan Crest',
    category: 'emblem',
    theme: 'Cinematic Hero Shield & Rising Workforce Titan',
    colors: [
      { name: 'Matte Black', hex: '#111827' },
      { name: 'Crimson Red', hex: '#DC2626' },
      { name: 'Pure White', hex: '#FFFFFF' }
    ],
    rationale: 'Concept 03 combines a bold letter "A" with a soaring human figure whose outstretched arms form the crossbar of the emblem. It projects immense strength, human leadership, and corporate firepower.',
    
    mainSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 220" width="100%" height="100%">
      <g transform="translate(0, 0)">
        <g transform="translate(225, 70)">
          <!-- Outer Heavy Shield Notch -->
          <path d="M0,-58 L48,-35 L40,30 L0,58 L-40,30 L-48,-35 Z" fill="#111827"/>
          <!-- Inner Crimson Wing Arch (Letter A Legs) -->
          <path d="M-38,20 L0,-45 L38,20 L26,20 L0,-25 L-26,20 Z" fill="#DC2626"/>
          <!-- Human Head Node -->
          <circle cx="0" cy="-32" r="11" fill="#FFFFFF"/>
          <!-- Outstretched Arms Crossbar -->
          <path d="M-34,-8 Q0,-25 34,-8 Q0,-10 -34,-8 Z" fill="#FFFFFF"/>
          <!-- Rising Body Wedge -->
          <polygon points="-12,25 0,-18 12,25" fill="#FFFFFF"/>
        </g>
        <text x="225" y="165" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#111827" text-anchor="middle" letter-spacing="4">AATMANIRBHAR</text>
        <text x="225" y="188" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#64748B" text-anchor="middle" letter-spacing="4">FACILITY MANAGEMENT PVT. LTD.</text>
      </g>
    </svg>`,

    iconOnlySvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
      <g transform="translate(80, 80)">
        <path d="M0,-58 L48,-35 L40,30 L0,58 L-40,30 L-48,-35 Z" fill="#111827"/>
        <path d="M-38,20 L0,-45 L38,20 L26,20 L0,-25 L-26,20 Z" fill="#DC2626"/>
        <circle cx="0" cy="-32" r="11" fill="#FFFFFF"/>
        <polygon points="-12,25 0,-18 12,25" fill="#FFFFFF"/>
      </g>
    </svg>`,

    horizontalSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120" width="100%" height="100%">
      <g transform="translate(20, 10)">
        <g transform="translate(50, 50) scale(0.65)">
          <path d="M0,-58 L48,-35 L40,30 L0,58 L-40,30 L-48,-35 Z" fill="#111827"/>
          <path d="M-38,20 L0,-45 L38,20 Z" fill="#DC2626"/>
          <circle cx="0" cy="-32" r="11" fill="#FFFFFF"/>
        </g>
        <text x="135" y="52" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#111827" letter-spacing="3">AATMANIRBHAR</text>
        <text x="135" y="74" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#64748B" letter-spacing="3.5">FACILITY MANAGEMENT PVT. LTD.</text>
      </g>
    </svg>`,

    bwSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 220" width="100%" height="100%">
      <g transform="translate(0, 0)">
        <g transform="translate(225, 70)">
          <path d="M0,-58 L48,-35 L40,30 L0,58 L-40,30 L-48,-35 Z" fill="#FFFFFF"/>
          <path d="M-38,20 L0,-45 L38,20 Z" fill="#000000"/>
          <circle cx="0" cy="-32" r="11" fill="#FFFFFF"/>
        </g>
        <text x="225" y="165" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#FFFFFF" text-anchor="middle" letter-spacing="4">AATMANIRBHAR</text>
        <text x="225" y="188" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#94A3B8" text-anchor="middle" letter-spacing="4">FACILITY MANAGEMENT PVT. LTD.</text>
      </g>
    </svg>`,

    wordmarkOnlySvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 100" width="100%" height="100%">
      <text x="225" y="45" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="26" fill="#111827" text-anchor="middle" letter-spacing="4">AATMANIRBHAR</text>
      <text x="225" y="72" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="11" fill="#64748B" text-anchor="middle" letter-spacing="4">FACILITY MANAGEMENT PVT. LTD.</text>
    </svg>`
  },

  {
    id: '04',
    numberStr: '04',
    name: '04 — A + SHIELD',
    shortTitle: 'Protective Governance Emblem',
    category: 'emblem',
    theme: 'Heavy Governance Shield & Diagonal Split Monogram A',
    colors: [
      { name: 'Imperial Navy', hex: '#1E3A8A' },
      { name: 'Warm Amber Gold', hex: '#F59E0B' },
      { name: 'Dark Slate', hex: '#0F172A' }
    ],
    rationale: 'Concept 04 is a heavy corporate governance shield. A diagonally split "A" creates a multi-layered canopy of protection over a central golden trust node. Communicates enterprise security, compliance, and reliability.',
    
    mainSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 220" width="100%" height="100%">
      <g transform="translate(0, 0)">
        <g transform="translate(225, 70)">
          <!-- Shield Frame Contour -->
          <path d="M0,-58 C38,-58 52,-42 52,0 C52,40 22,60 0,70 C-22,60 -52,40 -52,0 C-52,-42 -38,-58 0,-58 Z" fill="#1E3A8A"/>
          <!-- Left Wing of Split A -->
          <path d="M-32,25 L0,-45 L-6,-45 L-38,25 Z" fill="#F59E0B"/>
          <!-- Right Wing of Split A -->
          <path d="M32,25 L0,-45 L6,-45 L38,25 Z" fill="#FFFFFF"/>
          <!-- Golden Core Node -->
          <circle cx="0" cy="-15" r="11" fill="#F59E0B"/>
          <!-- Cross Shield Pillar -->
          <polygon points="-28,10 28,10 20,20 -20,20" fill="#0F172A"/>
        </g>
        <text x="225" y="165" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#1E3A8A" text-anchor="middle" letter-spacing="4">AATMANIRBHAR</text>
        <text x="225" y="188" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#64748B" text-anchor="middle" letter-spacing="4">FACILITY MANAGEMENT PVT. LTD.</text>
      </g>
    </svg>`,

    iconOnlySvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
      <g transform="translate(80, 80)">
        <path d="M0,-58 C38,-58 52,-42 52,0 C52,40 22,60 0,70 C-22,60 -52,40 -52,0 Z" fill="#1E3A8A"/>
        <path d="M-32,25 L0,-45 L-6,-45 L-38,25 Z" fill="#F59E0B"/>
        <path d="M32,25 L0,-45 L6,-45 L38,25 Z" fill="#FFFFFF"/>
        <circle cx="0" cy="-15" r="11" fill="#F59E0B"/>
      </g>
    </svg>`,

    horizontalSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120" width="100%" height="100%">
      <g transform="translate(20, 10)">
        <g transform="translate(50, 50) scale(0.65)">
          <path d="M0,-58 C38,-58 52,-42 52,0 C52,40 22,60 0,70 C-22,60 -52,40 -52,0 Z" fill="#1E3A8A"/>
          <circle cx="0" cy="-15" r="11" fill="#F59E0B"/>
        </g>
        <text x="135" y="52" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#1E3A8A" letter-spacing="3">AATMANIRBHAR</text>
        <text x="135" y="74" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#64748B" letter-spacing="3.5">FACILITY MANAGEMENT PVT. LTD.</text>
      </g>
    </svg>`,

    bwSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 220" width="100%" height="100%">
      <g transform="translate(0, 0)">
        <g transform="translate(225, 70)">
          <path d="M0,-58 C38,-58 52,-42 52,0 C52,40 22,60 0,70 C-22,60 -52,40 -52,0 Z" fill="#FFFFFF"/>
          <polygon points="-32,25 0,-45 32,25" fill="#000000"/>
          <circle cx="0" cy="-15" r="11" fill="#FFFFFF"/>
        </g>
        <text x="225" y="165" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#FFFFFF" text-anchor="middle" letter-spacing="4">AATMANIRBHAR</text>
        <text x="225" y="188" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#94A3B8" text-anchor="middle" letter-spacing="4">FACILITY MANAGEMENT PVT. LTD.</text>
      </g>
    </svg>`,

    wordmarkOnlySvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 100" width="100%" height="100%">
      <text x="225" y="45" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="26" fill="#1E3A8A" text-anchor="middle" letter-spacing="4">AATMANIRBHAR</text>
      <text x="225" y="72" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="11" fill="#64748B" text-anchor="middle" letter-spacing="4">FACILITY MANAGEMENT PVT. LTD.</text>
    </svg>`
  },

  {
    id: '05',
    numberStr: '05',
    name: '05 — CIRCULAR EMBLEM',
    shortTitle: '360° Symmetrical Crest Badge',
    category: 'emblem',
    theme: 'Automotive Insignia Style Circular Badge & Radial Symmetry',
    colors: [
      { name: 'Dark Slate', hex: '#0F172A' },
      { name: 'Electric Cyan', hex: '#06B6D4' },
      { name: 'Pure White', hex: '#FFFFFF' }
    ],
    rationale: 'Concept 05 is a high-impact circular corporate badge featuring notched radial geometry and an inner symmetrical "A" starburst. Tailored for vehicle branding, ID cards, uniform arm patches, and office entrance seals.',
    
    mainSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 220" width="100%" height="100%">
      <g transform="translate(0, 0)">
        <g transform="translate(225, 70)">
          <!-- Outer Notched Circle Ring -->
          <circle cx="0" cy="0" r="56" fill="#0F172A"/>
          <circle cx="0" cy="0" r="48" fill="none" stroke="#06B6D4" stroke-width="3"/>
          <!-- Inner Symmetrical A Star -->
          <path d="M0,-42 L16,10 L38,10 L20,24 L28,44 L0,30 L-28,44 L-20,24 L-38,10 L-16,10 Z" fill="#06B6D4"/>
          <!-- Core Negative Apex Triangle -->
          <polygon points="0,-22 14,14 -14,14" fill="#FFFFFF"/>
        </g>
        <text x="225" y="165" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#0F172A" text-anchor="middle" letter-spacing="4">AATMANIRBHAR</text>
        <text x="225" y="188" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#64748B" text-anchor="middle" letter-spacing="4">FACILITY MANAGEMENT PVT. LTD.</text>
      </g>
    </svg>`,

    iconOnlySvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
      <g transform="translate(80, 80)">
        <circle cx="0" cy="0" r="56" fill="#0F172A"/>
        <circle cx="0" cy="0" r="48" fill="none" stroke="#06B6D4" stroke-width="3"/>
        <path d="M0,-42 L16,10 L38,10 L20,24 L28,44 L0,30 L-28,44 L-20,24 L-38,10 L-16,10 Z" fill="#06B6D4"/>
        <polygon points="0,-22 14,14 -14,14" fill="#FFFFFF"/>
      </g>
    </svg>`,

    horizontalSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120" width="100%" height="100%">
      <g transform="translate(20, 10)">
        <g transform="translate(50, 50) scale(0.65)">
          <circle cx="0" cy="0" r="56" fill="#0F172A"/>
          <path d="M0,-42 L16,10 L38,10 L20,24 L28,44 L0,30 L-28,44 L-20,24 L-38,10 L-16,10 Z" fill="#06B6D4"/>
        </g>
        <text x="135" y="52" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#0F172A" letter-spacing="3">AATMANIRBHAR</text>
        <text x="135" y="74" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#64748B" letter-spacing="3.5">FACILITY MANAGEMENT PVT. LTD.</text>
      </g>
    </svg>`,

    bwSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 220" width="100%" height="100%">
      <g transform="translate(0, 0)">
        <g transform="translate(225, 70)">
          <circle cx="0" cy="0" r="56" fill="#FFFFFF"/>
          <circle cx="0" cy="0" r="48" fill="none" stroke="#000000" stroke-width="3"/>
          <path d="M0,-42 L16,10 L38,10 L20,24 L28,44 L0,30 L-28,44 L-20,24 L-38,10 L-16,10 Z" fill="#000000"/>
        </g>
        <text x="225" y="165" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#FFFFFF" text-anchor="middle" letter-spacing="4">AATMANIRBHAR</text>
        <text x="225" y="188" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#94A3B8" text-anchor="middle" letter-spacing="4">FACILITY MANAGEMENT PVT. LTD.</text>
      </g>
    </svg>`,

    wordmarkOnlySvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 100" width="100%" height="100%">
      <text x="225" y="45" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="26" fill="#0F172A" text-anchor="middle" letter-spacing="4">AATMANIRBHAR</text>
      <text x="225" y="72" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="11" fill="#64748B" text-anchor="middle" letter-spacing="4">FACILITY MANAGEMENT PVT. LTD.</text>
    </svg>`
  },

  {
    id: '06',
    numberStr: '06',
    name: '06 — CROWN / LEADERSHIP',
    shortTitle: 'Executive Leadership Crest',
    category: 'emblem',
    theme: 'Authoritative Crown Geometry Merged with Letter A',
    colors: [
      { name: 'Charcoal Graphite', hex: '#18181B' },
      { name: 'Champagne Gold', hex: '#C59B27' },
      { name: 'Pure White', hex: '#FFFFFF' }
    ],
    rationale: 'Concept 06 integrates a 3-point executive crown with a central descending leg forming letter "A". Projects prestige, industry dominance, and executive leadership without appearing like a generic luxury logo.',
    
    mainSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 220" width="100%" height="100%">
      <g transform="translate(0, 0)">
        <g transform="translate(225, 70)">
          <!-- Outer Crown Base Emblem -->
          <polygon points="0,-55 24,-15 48,-40 34,35 -34,35 -48,-40 -24,-15" fill="#18181B"/>
          <!-- Central Golden Crown Peak (Inner A Apex) -->
          <polygon points="0,-55 16,10 0,35 -16,10" fill="#C59B27"/>
          <!-- Left & Right Gold Accents -->
          <circle cx="-48" cy="-40" r="5" fill="#C59B27"/>
          <circle cx="0" cy="-55" r="6" fill="#C59B27"/>
          <circle cx="48" cy="-40" r="5" fill="#C59B27"/>
          <!-- Crossbar Wedge -->
          <rect x="-30" y="15" width="60" height="8" rx="4" fill="#C59B27"/>
        </g>
        <text x="225" y="165" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#18181B" text-anchor="middle" letter-spacing="4">AATMANIRBHAR</text>
        <text x="225" y="188" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#64748B" text-anchor="middle" letter-spacing="4">FACILITY MANAGEMENT PVT. LTD.</text>
      </g>
    </svg>`,

    iconOnlySvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
      <g transform="translate(80, 80)">
        <polygon points="0,-55 24,-15 48,-40 34,35 -34,35 -48,-40 -24,-15" fill="#18181B"/>
        <polygon points="0,-55 16,10 0,35 -16,10" fill="#C59B27"/>
        <circle cx="-48" cy="-40" r="5" fill="#C59B27"/>
        <circle cx="0" cy="-55" r="6" fill="#C59B27"/>
        <circle cx="48" cy="-40" r="5" fill="#C59B27"/>
      </g>
    </svg>`,

    horizontalSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120" width="100%" height="100%">
      <g transform="translate(20, 10)">
        <g transform="translate(50, 50) scale(0.65)">
          <polygon points="0,-55 24,-15 48,-40 34,35 -34,35 -48,-40 -24,-15" fill="#18181B"/>
          <polygon points="0,-55 16,10 0,35 -16,10" fill="#C59B27"/>
        </g>
        <text x="135" y="52" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#18181B" letter-spacing="3">AATMANIRBHAR</text>
        <text x="135" y="74" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#64748B" letter-spacing="3.5">FACILITY MANAGEMENT PVT. LTD.</text>
      </g>
    </svg>`,

    bwSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 220" width="100%" height="100%">
      <g transform="translate(0, 0)">
        <g transform="translate(225, 70)">
          <polygon points="0,-55 24,-15 48,-40 34,35 -34,35 -48,-40 -24,-15" fill="#FFFFFF"/>
          <polygon points="0,-55 16,10 0,35 -16,10" fill="#000000"/>
        </g>
        <text x="225" y="165" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#FFFFFF" text-anchor="middle" letter-spacing="4">AATMANIRBHAR</text>
        <text x="225" y="188" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#94A3B8" text-anchor="middle" letter-spacing="4">FACILITY MANAGEMENT PVT. LTD.</text>
      </g>
    </svg>`,

    wordmarkOnlySvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 100" width="100%" height="100%">
      <text x="225" y="45" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="26" fill="#18181B" text-anchor="middle" letter-spacing="4">AATMANIRBHAR</text>
      <text x="225" y="72" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="11" fill="#64748B" text-anchor="middle" letter-spacing="4">FACILITY MANAGEMENT PVT. LTD.</text>
    </svg>`
  },

  {
    id: '07',
    numberStr: '07',
    name: '07 — NEGATIVE SPACE A',
    shortTitle: 'Intelligent Negative Space Mark',
    category: 'emblem',
    theme: 'Heavy Geometric Base Revealing Hidden Human & Arrow Peak',
    colors: [
      { name: 'Obsidian Black', hex: '#000000' },
      { name: 'Stark White', hex: '#FFFFFF' },
      { name: 'Cool Slate', hex: '#64748B' }
    ],
    rationale: 'Concept 07 is a high-intelligence graphic emblem. Within a solid black circle, negative space reveals a human figure standing tall whose head node and arms construct an ascending letter "A" and structural roof.',
    
    mainSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 220" width="100%" height="100%">
      <g transform="translate(0, 0)">
        <g transform="translate(225, 70)">
          <!-- Solid Black Base Circle -->
          <circle cx="0" cy="0" r="54" fill="#000000"/>
          <!-- Negative Space Cutout for A & Human -->
          <!-- Roof Peak cut -->
          <path d="M-32,15 L0,-38 L32,15 L22,15 L0,-24 L-22,15 Z" fill="#FFFFFF"/>
          <!-- Human Head -->
          <circle cx="0" cy="-8" r="9" fill="#FFFFFF"/>
          <!-- Human Body Pillar -->
          <path d="M-16,36 Q0,10 16,36 L8,36 Q0,18 -8,36 Z" fill="#FFFFFF"/>
        </g>
        <text x="225" y="165" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#000000" text-anchor="middle" letter-spacing="4">AATMANIRBHAR</text>
        <text x="225" y="188" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#64748B" text-anchor="middle" letter-spacing="4">FACILITY MANAGEMENT PVT. LTD.</text>
      </g>
    </svg>`,

    iconOnlySvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
      <g transform="translate(80, 80)">
        <circle cx="0" cy="0" r="54" fill="#000000"/>
        <path d="M-32,15 L0,-38 L32,15 L22,15 L0,-24 L-22,15 Z" fill="#FFFFFF"/>
        <circle cx="0" cy="-8" r="9" fill="#FFFFFF"/>
        <path d="M-16,36 Q0,10 16,36 L8,36 Q0,18 -8,36 Z" fill="#FFFFFF"/>
      </g>
    </svg>`,

    horizontalSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120" width="100%" height="100%">
      <g transform="translate(20, 10)">
        <g transform="translate(50, 50) scale(0.65)">
          <circle cx="0" cy="0" r="54" fill="#000000"/>
          <path d="M-32,15 L0,-38 L32,15 Z" fill="#FFFFFF"/>
        </g>
        <text x="135" y="52" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#000000" letter-spacing="3">AATMANIRBHAR</text>
        <text x="135" y="74" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#64748B" letter-spacing="3.5">FACILITY MANAGEMENT PVT. LTD.</text>
      </g>
    </svg>`,

    bwSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 220" width="100%" height="100%">
      <g transform="translate(0, 0)">
        <g transform="translate(225, 70)">
          <circle cx="0" cy="0" r="54" fill="#FFFFFF"/>
          <path d="M-32,15 L0,-38 L32,15 L22,15 L0,-24 L-22,15 Z" fill="#000000"/>
          <circle cx="0" cy="-8" r="9" fill="#000000"/>
        </g>
        <text x="225" y="165" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#FFFFFF" text-anchor="middle" letter-spacing="4">AATMANIRBHAR</text>
        <text x="225" y="188" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#94A3B8" text-anchor="middle" letter-spacing="4">FACILITY MANAGEMENT PVT. LTD.</text>
      </g>
    </svg>`,

    wordmarkOnlySvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 100" width="100%" height="100%">
      <text x="225" y="45" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="26" fill="#000000" text-anchor="middle" letter-spacing="4">AATMANIRBHAR</text>
      <text x="225" y="72" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="11" fill="#64748B" text-anchor="middle" letter-spacing="4">FACILITY MANAGEMENT PVT. LTD.</text>
    </svg>`
  },

  {
    id: '08',
    numberStr: '08',
    name: '08 — FUTURISTIC CORPORATE EMBLEM',
    shortTitle: 'Cyber Precision Hex Matrix',
    category: 'emblem',
    theme: 'Sharp Faceted Symmetry & Global Tech Corporate Character',
    colors: [
      { name: 'Space Navy', hex: '#030712' },
      { name: 'Ultramarine Blue', hex: '#3B82F6' },
      { name: 'Silver Platinum', hex: '#CBD5E1' }
    ],
    rationale: 'Concept 08 features 6 interlocking faceted polygon blades forming a sharp geometric "A". Gives the brand an international aerospace/tech conglomerate character with zero fluff.',
    
    mainSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 220" width="100%" height="100%">
      <g transform="translate(0, 0)">
        <g transform="translate(225, 70)">
          <!-- Outer Sharp Hex Shield -->
          <polygon points="0,-58 50,-28 50,28 0,58 -50,28 -50,-28" fill="#030712"/>
          <!-- Inner Polygon Blades -->
          <polygon points="0,-45 28,-10 0,-22" fill="#3B82F6"/>
          <polygon points="0,-45 -28,-10 0,-22" fill="#2563EB"/>
          <polygon points="-28,-10 -38,25 -14,10" fill="#CBD5E1"/>
          <polygon points="28,-10 38,25 14,10" fill="#CBD5E1"/>
          <polygon points="-20,20 20,20 0,35" fill="#3B82F6"/>
        </g>
        <text x="225" y="165" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#030712" text-anchor="middle" letter-spacing="4">AATMANIRBHAR</text>
        <text x="225" y="188" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#64748B" text-anchor="middle" letter-spacing="4">FACILITY MANAGEMENT PVT. LTD.</text>
      </g>
    </svg>`,

    iconOnlySvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
      <g transform="translate(80, 80)">
        <polygon points="0,-58 50,-28 50,28 0,58 -50,28 -50,-28" fill="#030712"/>
        <polygon points="0,-45 28,-10 0,-22" fill="#3B82F6"/>
        <polygon points="0,-45 -28,-10 0,-22" fill="#2563EB"/>
        <polygon points="-28,-10 -38,25 -14,10" fill="#CBD5E1"/>
        <polygon points="28,-10 38,25 14,10" fill="#CBD5E1"/>
      </g>
    </svg>`,

    horizontalSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120" width="100%" height="100%">
      <g transform="translate(20, 10)">
        <g transform="translate(50, 50) scale(0.65)">
          <polygon points="0,-58 50,-28 50,28 0,58 -50,28 -50,-28" fill="#030712"/>
          <polygon points="0,-45 28,-10 0,-22" fill="#3B82F6"/>
        </g>
        <text x="135" y="52" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#030712" letter-spacing="3">AATMANIRBHAR</text>
        <text x="135" y="74" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#64748B" letter-spacing="3.5">FACILITY MANAGEMENT PVT. LTD.</text>
      </g>
    </svg>`,

    bwSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 220" width="100%" height="100%">
      <g transform="translate(0, 0)">
        <g transform="translate(225, 70)">
          <polygon points="0,-58 50,-28 50,28 0,58 -50,28 -50,-28" fill="#FFFFFF"/>
          <polygon points="0,-45 28,-10 0,-22" fill="#000000"/>
        </g>
        <text x="225" y="165" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#FFFFFF" text-anchor="middle" letter-spacing="4">AATMANIRBHAR</text>
        <text x="225" y="188" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#94A3B8" text-anchor="middle" letter-spacing="4">FACILITY MANAGEMENT PVT. LTD.</text>
      </g>
    </svg>`,

    wordmarkOnlySvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 100" width="100%" height="100%">
      <text x="225" y="45" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="26" fill="#030712" text-anchor="middle" letter-spacing="4">AATMANIRBHAR</text>
      <text x="225" y="72" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="11" fill="#64748B" text-anchor="middle" letter-spacing="4">FACILITY MANAGEMENT PVT. LTD.</text>
    </svg>`
  },

  {
    id: '09',
    numberStr: '09',
    name: '09 — POWER + GROWTH',
    shortTitle: 'Tri-Chevron Growth Arrowhead',
    category: 'emblem',
    theme: 'Stepped Ascent Chevrons (People → Performance → Growth)',
    colors: [
      { name: 'Deep Blue', hex: '#1D4ED8' },
      { name: 'Vibrant Teal', hex: '#0D9488' },
      { name: 'Pure White', hex: '#FFFFFF' }
    ],
    rationale: 'Concept 09 stacks 3 ascending chevron wings forming a giant forward growth arrow. A central workforce node climbs towards the apex peak, symbolizing People → Performance → Growth.',
    
    mainSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 220" width="100%" height="100%">
      <g transform="translate(0, 0)">
        <g transform="translate(225, 70)">
          <!-- Bottom Chevron Wing -->
          <path d="M-45,30 L0,5 L45,30 L35,42 L0,22 L-35,42 Z" fill="#0F172A"/>
          <!-- Middle Chevron Wing -->
          <path d="M-45,8 L0,-17 L45,8 L35,20 L0,0 L-35,20 Z" fill="#1D4ED8"/>
          <!-- Top Chevron Apex Wing -->
          <path d="M-45,-14 L0,-39 L45,-14 L35,-2 L0,-22 L-35,-2 Z" fill="#0D9488"/>
          <!-- Central Human Rising Node -->
          <circle cx="0" cy="-48" r="9" fill="#0D9488"/>
        </g>
        <text x="225" y="165" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#0F172A" text-anchor="middle" letter-spacing="4">AATMANIRBHAR</text>
        <text x="225" y="188" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#64748B" text-anchor="middle" letter-spacing="4">FACILITY MANAGEMENT PVT. LTD.</text>
      </g>
    </svg>`,

    iconOnlySvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
      <g transform="translate(80, 80)">
        <path d="M-45,30 L0,5 L45,30 L35,42 L0,22 L-35,42 Z" fill="#0F172A"/>
        <path d="M-45,8 L0,-17 L45,8 L35,20 L0,0 L-35,20 Z" fill="#1D4ED8"/>
        <path d="M-45,-14 L0,-39 L45,-14 L35,-2 L0,-22 L-35,-2 Z" fill="#0D9488"/>
        <circle cx="0" cy="-48" r="9" fill="#0D9488"/>
      </g>
    </svg>`,

    horizontalSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120" width="100%" height="100%">
      <g transform="translate(20, 10)">
        <g transform="translate(50, 50) scale(0.65)">
          <path d="M-45,-14 L0,-39 L45,-14 Z" fill="#0D9488"/>
          <path d="M-45,8 L0,-17 L45,8 Z" fill="#1D4ED8"/>
        </g>
        <text x="135" y="52" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#0F172A" letter-spacing="3">AATMANIRBHAR</text>
        <text x="135" y="74" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#64748B" letter-spacing="3.5">FACILITY MANAGEMENT PVT. LTD.</text>
      </g>
    </svg>`,

    bwSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 220" width="100%" height="100%">
      <g transform="translate(0, 0)">
        <g transform="translate(225, 70)">
          <path d="M-45,30 L0,5 L45,30 L35,42 L0,22 L-35,42 Z" fill="#FFFFFF"/>
          <path d="M-45,8 L0,-17 L45,8 L35,20 L0,0 L-35,20 Z" fill="#FFFFFF" opacity="0.8"/>
          <path d="M-45,-14 L0,-39 L45,-14 L35,-2 L0,-22 L-35,-2 Z" fill="#FFFFFF"/>
        </g>
        <text x="225" y="165" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#FFFFFF" text-anchor="middle" letter-spacing="4">AATMANIRBHAR</text>
        <text x="225" y="188" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#94A3B8" text-anchor="middle" letter-spacing="4">FACILITY MANAGEMENT PVT. LTD.</text>
      </g>
    </svg>`,

    wordmarkOnlySvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 100" width="100%" height="100%">
      <text x="225" y="45" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="26" fill="#0F172A" text-anchor="middle" letter-spacing="4">AATMANIRBHAR</text>
      <text x="225" y="72" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="11" fill="#64748B" text-anchor="middle" letter-spacing="4">FACILITY MANAGEMENT PVT. LTD.</text>
    </svg>`
  },

  {
    id: '10',
    numberStr: '10',
    name: '10 — SIGNATURE BRAND MARK',
    shortTitle: 'The Monolith Signature Mark',
    category: 'emblem',
    theme: 'Iconic Monolith Facet Triangle & Dual-Tone Gold Ribbon',
    colors: [
      { name: 'Rich Midnight Black', hex: '#09090B' },
      { name: 'Champagne Gold', hex: '#D4AF37' },
      { name: 'Bronze Gold', hex: '#9A7B1C' }
    ],
    rationale: 'Concept 10 is an iconic signature brand mark designed for global standalone recognition. An isometric faceted triangle loops into an infinity base ribbon, communicating everlasting service, self-reliance, and corporate supremacy.',
    
    mainSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 220" width="100%" height="100%">
      <g transform="translate(0, 0)">
        <g transform="translate(225, 70)">
          <!-- Faceted Isometric Monolith Triangle -->
          <!-- Left Facet -->
          <polygon points="0,-58 -48,25 0,10" fill="#09090B"/>
          <!-- Right Facet -->
          <polygon points="0,-58 48,25 0,10" fill="#D4AF37"/>
          <!-- Inner Core Ribbon Peak -->
          <polygon points="0,-42 -30,18 0,5" fill="#9A7B1C"/>
          <polygon points="0,-42 30,18 0,5" fill="#EAB308"/>
          <!-- Golden Base Foundation Ring -->
          <path d="M-48,25 C-48,45 48,45 48,25 C48,15 30,15 0,28 C-30,15 -48,15 -48,25 Z" fill="#D4AF37"/>
        </g>
        <text x="225" y="165" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#09090B" text-anchor="middle" letter-spacing="4">AATMANIRBHAR</text>
        <text x="225" y="188" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#64748B" text-anchor="middle" letter-spacing="4">FACILITY MANAGEMENT PVT. LTD.</text>
      </g>
    </svg>`,

    iconOnlySvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
      <g transform="translate(80, 80)">
        <polygon points="0,-58 -48,25 0,10" fill="#09090B"/>
        <polygon points="0,-58 48,25 0,10" fill="#D4AF37"/>
        <polygon points="0,-42 -30,18 0,5" fill="#9A7B1C"/>
        <polygon points="0,-42 30,18 0,5" fill="#EAB308"/>
        <path d="M-48,25 C-48,45 48,45 48,25 Z" fill="#D4AF37"/>
      </g>
    </svg>`,

    horizontalSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120" width="100%" height="100%">
      <g transform="translate(20, 10)">
        <g transform="translate(50, 50) scale(0.65)">
          <polygon points="0,-58 -48,25 0,10" fill="#09090B"/>
          <polygon points="0,-58 48,25 0,10" fill="#D4AF37"/>
        </g>
        <text x="135" y="52" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#09090B" letter-spacing="3">AATMANIRBHAR</text>
        <text x="135" y="74" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#64748B" letter-spacing="3.5">FACILITY MANAGEMENT PVT. LTD.</text>
      </g>
    </svg>`,

    bwSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 220" width="100%" height="100%">
      <g transform="translate(0, 0)">
        <g transform="translate(225, 70)">
          <polygon points="0,-58 -48,25 0,10" fill="#FFFFFF"/>
          <polygon points="0,-58 48,25 0,10" fill="#FFFFFF" opacity="0.8"/>
        </g>
        <text x="225" y="165" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#FFFFFF" text-anchor="middle" letter-spacing="4">AATMANIRBHAR</text>
        <text x="225" y="188" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#94A3B8" text-anchor="middle" letter-spacing="4">FACILITY MANAGEMENT PVT. LTD.</text>
      </g>
    </svg>`,

    wordmarkOnlySvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 100" width="100%" height="100%">
      <text x="225" y="45" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="26" fill="#09090B" text-anchor="middle" letter-spacing="4">AATMANIRBHAR</text>
      <text x="225" y="72" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="11" fill="#64748B" text-anchor="middle" letter-spacing="4">FACILITY MANAGEMENT PVT. LTD.</text>
    </svg>`
  }
];

// Save script
fs.writeFileSync(path.join(__dirname, '../scratch/emblems_data.json'), JSON.stringify(emblemConcepts, null, 2));
console.log('Successfully saved 10 Emblem Concepts JSON!');
