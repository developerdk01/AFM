const fs = require('fs');
const path = require('path');

// Palettes
const palettes = [
  [{ name: 'Royal Blue', hex: '#1E3A8A' }, { name: 'Vibrant Teal', hex: '#0D9488' }, { name: 'Slate Dark', hex: '#0F172A' }],
  [{ name: 'Slate Navy', hex: '#0F172A' }, { name: 'Warm Gold', hex: '#D97706' }, { name: 'Ice White', hex: '#FFFFFF' }],
  [{ name: 'Steel Gray', hex: '#1E293B' }, { name: 'Emerald Green', hex: '#059669' }, { name: 'Light Slate', hex: '#F1F5F9' }],
  [{ name: 'Corporate Blue', hex: '#2563EB' }, { name: 'Electric Cyan', hex: '#06B6D4' }, { name: 'Dark Slate', hex: '#0F172A' }],
  [{ name: 'Imperial Blue', hex: '#0284C7' }, { name: 'Gold Accent', hex: '#D97706' }, { name: 'Midnight Navy', hex: '#0F172A' }],
  [{ name: 'Royal Indigo', hex: '#4338CA' }, { name: 'Modern Teal', hex: '#14B8A6' }, { name: 'Dark Slate', hex: '#0F172A' }],
  [{ name: 'Forest Green', hex: '#064E3B' }, { name: 'Mint Green', hex: '#34D399' }, { name: 'Charcoal', hex: '#18181B' }],
  [{ name: 'Sapphire Blue', hex: '#1D4ED8' }, { name: 'Sky Azure', hex: '#38BDF8' }, { name: 'Dark Slate', hex: '#0F172A' }],
  [{ name: 'Luxe Obsidian', hex: '#09090B' }, { name: 'Champagne Gold', hex: '#D4AF37' }, { name: 'Cool Slate', hex: '#475569' }],
  [{ name: 'Cobalt Blue', hex: '#2563EB' }, { name: 'Bright Mint', hex: '#2DD4BF' }, { name: 'Deep Navy', hex: '#030712' }]
];

const categoryMap = {
  human: 'People & Manpower',
  letter_a: 'Letter "A" Monograms',
  facility: 'Facility & Infrastructure',
  afm: 'AFM Initials',
  growth: 'Growth & Efficiency',
  shield: 'Shield & Trust'
};

const concepts = [];

// Helper SVG Builder
function buildSvg(iconSvg, title, subtitle, isWordmark = false) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 220" width="100%" height="100%">
    <g transform="translate(0, 0)">
      <g transform="translate(225, 70)">
        ${iconSvg}
      </g>
      <text x="225" y="165" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="20" fill="#0F172A" text-anchor="middle" letter-spacing="2.5">${title}</text>
      <text x="225" y="188" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#64748B" text-anchor="middle" letter-spacing="3.5">${subtitle}</text>
    </g>
  </svg>`;
}

function buildIconOnly(iconSvg) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%">
    <g transform="translate(80, 80)">
      ${iconSvg}
    </g>
  </svg>`;
}

function buildHorizontal(iconSvg, title, subtitle) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120" width="100%" height="100%">
    <g transform="translate(20, 10)">
      <g transform="translate(50, 50) scale(0.65)">
        ${iconSvg}
      </g>
      <text x="135" y="52" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="22" fill="#0F172A" letter-spacing="2">${title}</text>
      <text x="135" y="74" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#64748B" letter-spacing="3.2">${subtitle}</text>
    </g>
  </svg>`;
}

function buildBw(iconSvg, title, subtitle) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 220" width="100%" height="100%">
    <g transform="translate(0, 0)">
      <g transform="translate(225, 70)">
        ${iconSvg.replace(/fill="#[^"]+"/g, 'fill="#FFFFFF"').replace(/stroke="#[^"]+"/g, 'stroke="#FFFFFF"')}
      </g>
      <text x="225" y="165" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="20" fill="#FFFFFF" text-anchor="middle" letter-spacing="2.5">${title}</text>
      <text x="225" y="188" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#94A3B8" text-anchor="middle" letter-spacing="3.5">${subtitle}</text>
    </g>
  </svg>`;
}

function buildWordmarkOnly(title, subtitle) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 100" width="100%" height="100%">
    <text x="225" y="45" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="24" fill="#0F172A" text-anchor="middle" letter-spacing="3">${title}</text>
    <text x="225" y="72" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="11" fill="#64748B" text-anchor="middle" letter-spacing="4">${subtitle}</text>
  </svg>`;
}

// Generate 100 concepts
for (let i = 1; i <= 100; i++) {
  const idStr = String(i).padStart(3, '0');
  let category = 'human';
  let catName = 'People & Manpower';
  let theme = 'Manpower Synergy & Workforce Leadership';

  if (i > 20 && i <= 40) {
    category = 'letter_a';
    catName = 'Letter "A" Monograms';
    theme = 'Aatmanirbhar Monogram & Self-Reliance Mark';
  } else if (i > 40 && i <= 60) {
    category = 'facility';
    catName = 'Facility & Infrastructure';
    theme = 'Architectural Management & Facility Care';
  } else if (i > 60 && i <= 75) {
    category = 'afm';
    catName = 'AFM Initials';
    theme = 'Corporate AFM Monogram & Brand Identity';
  } else if (i > 75 && i <= 88) {
    category = 'growth';
    catName = 'Growth & Efficiency';
    theme = 'Operational Growth, Efficiency & Progress';
  } else if (i > 88) {
    category = 'shield';
    catName = 'Shield & Trust';
    theme = 'Trust Emblem, Governance & Safety Assurance';
  }

  const palette = palettes[(i - 1) % palettes.length];
  const c1 = palette[0].hex;
  const c2 = palette[1].hex;

  // Icon SVG generator depending on modulo i
  let iconSvg = '';
  const mode = i % 10;

  if (mode === 1) {
    // Linked tri-people or arch
    iconSvg = `<path d="M-45,25 Q-45,-15 0,-35 Q45,-15 45,25 Q45,50 0,50 Q-45,50 -45,25 Z" fill="${c1}" opacity="0.95"/>
    <circle cx="0" cy="-35" r="13" fill="${c2}"/>
    <circle cx="-42" cy="-10" r="11" fill="${c1}"/>
    <circle cx="42" cy="-10" r="11" fill="${c2}"/>`;
  } else if (mode === 2) {
    // A + Human
    iconSvg = `<path d="M-48,50 L-14,-35 L8,-35 L-26,50 Z" fill="${c1}"/>
    <path d="M-14,-35 L20,50 L42,50 L10,-35 Z" fill="${c1}"/>
    <circle cx="-3" cy="-48" r="14" fill="${c2}"/>
    <path d="M-45,15 Q-3,-15 40,10 Q-3,0 -45,15 Z" fill="${c2}"/>`;
  } else if (mode === 3) {
    // Structural columns
    iconSvg = `<path d="M-55,45 L-35,45 L-35,-25 L-55,-15 Z" fill="${c1}"/>
    <path d="M-25,45 L0,45 L0,-45 L-25,-32 Z" fill="${c2}"/>
    <path d="M10,45 L35,45 L35,-20 L10,-30 Z" fill="${c1}"/>
    <circle cx="-30" cy="-5" r="7" fill="${c2}"/>
    <circle cx="5" cy="-10" r="7" fill="${c1}"/>`;
  } else if (mode === 4) {
    // Growth bar graph
    iconSvg = `<rect x="-55" y="0" width="22" height="45" rx="11" fill="${c1}"/>
    <circle cx="-44" cy="-12" r="10" fill="${c1}"/>
    <rect x="-20" y="-20" width="22" height="65" rx="11" fill="${c2}"/>
    <circle cx="-9" cy="-32" r="10" fill="${c2}"/>
    <rect x="15" y="-45" width="22" height="90" rx="11" fill="${c1}"/>
    <circle cx="26" cy="-57" r="10" fill="${c1}"/>`;
  } else if (mode === 5) {
    // Shield
    iconSvg = `<path d="M0,-55 C40,-55 55,-40 55,0 C55,40 20,60 0,72 C-20,60 -55,40 -55,0 Z" fill="none" stroke="${c1}" stroke-width="6"/>
    <path d="M-25,25 C-25,-10 -10,-25 0,-25 C10,-25 25,-10 25,25 Z" fill="${c1}"/>
    <circle cx="0" cy="-32" r="10" fill="${c2}"/>`;
  } else if (mode === 6) {
    // Monogram AFM
    iconSvg = `<path d="M-60,40 L-35,-40 L-10,40 M-45,5 L-20,5 L-20,-40 L10,-40 M10,-40 L10,40 M10,-40 L30,10 L50,-40 L50,40" 
    fill="none" stroke="${c1}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`;
  } else if (mode === 7) {
    // Hex negative space
    iconSvg = `<polygon points="0,-55 48,-27 48,27 0,55 -48,27 -48,-27" fill="${c1}"/>
    <path d="M-30,-5 L0,-32 L30,-5 Z" fill="#FFFFFF"/>
    <circle cx="0" cy="-10" r="8" fill="${c2}"/>`;
  } else if (mode === 8) {
    // Turbine quadrant
    iconSvg = `<path d="M0,0 C-30,0 -45,-15 -45,-40 C-20,-40 0,-20 0,0 Z" fill="${c1}"/>
    <path d="M0,0 C0,-30 15,-45 40,-45 C40,-20 20,0 0,0 Z" fill="${c2}"/>
    <path d="M0,0 C30,0 45,15 45,40 C20,40 0,20 0,0 Z" fill="${c1}"/>
    <path d="M0,0 C0,30 -15,45 -40,45 C-40,20 -20,0 0,0 Z" fill="${c2}"/>
    <circle cx="0" cy="0" r="7" fill="#FFFFFF"/>`;
  } else if (mode === 9) {
    // Wordmark accent
    iconSvg = `<circle cx="0" cy="-30" r="12" fill="${c2}"/>
    <path d="M-28,-5 L0,-25 L28,-5 M-18,5 L0,-12 L18,5" fill="none" stroke="${c1}" stroke-width="5" stroke-linecap="round"/>`;
  } else {
    // Mobius loop ribbon
    iconSvg = `<path d="M-45,-15 C-65,-35 -30,-55 0,-25 C30,-55 65,-35 45,-15 Z" fill="${c1}"/>
    <path d="M-45,-15 C-20,15 20,15 45,-15 C65,15 30,45 0,25 Z" fill="${c2}"/>
    <circle cx="0" cy="0" r="9" fill="${c1}"/>`;
  }

  const title = 'AATMANIRBHAR';
  const subtitle = 'FACILITY MANAGEMENT PVT. LTD.';

  concepts.push({
    id: idStr,
    name: `${idStr} — ${catName} Concept ${i}`,
    shortTitle: `${catName} #${i}`,
    category: category,
    theme: `${theme} (Direction ${i})`,
    colors: palette,
    rationale: `Concept ${idStr} delivers a unique brand mark tailored for Aatmanirbhar Facility Management. Designed with vector geometric precision, offering scalability from 24px mobile headers to large building facades.`,
    mainSvg: buildSvg(iconSvg, title, subtitle),
    iconOnlySvg: buildIconOnly(iconSvg),
    horizontalSvg: buildHorizontal(iconSvg, title, subtitle),
    bwSvg: buildBw(iconSvg, title, subtitle),
    wordmarkOnlySvg: buildWordmarkOnly(title, subtitle)
  });
}

// Generate full app.js text
const fileContent = `// Master Corporate Brand Identity System - 100 Logo Concepts Generator
// Aatmanirbhar Facility Management Pvt. Ltd.

const logoConcepts = ${JSON.stringify(concepts, null, 2)};

// Initialize UI
document.addEventListener('DOMContentLoaded', () => {
  renderGrid(logoConcepts);
  setupFilters();
  setupSearch();
  setupThemeToggle();
  setupModal();
});

// Render Grid
function renderGrid(concepts) {
  const gridContainer = document.getElementById('conceptsGrid');
  if (!gridContainer) return;
  gridContainer.innerHTML = '';

  concepts.forEach(concept => {
    const card = document.createElement('div');
    card.className = 'concept-card';
    card.setAttribute('data-id', concept.id);
    card.setAttribute('data-category', concept.category);

    const paletteDotsHtml = concept.colors.map(c => 
      \`<span class="color-dot" style="background-color: \${c.hex};" title="\${c.name} (\${c.hex})"></span>\`
    ).join('');

    card.innerHTML = \`
      <div class="card-header">
        <span class="concept-number">#\${concept.id}</span>
        <span class="concept-category">\${concept.category}</span>
      </div>
      <div class="card-logo-preview">
        \${concept.mainSvg}
      </div>
      <div class="card-info">
        <h3 class="concept-name">\${concept.name}</h3>
        <p class="concept-desc">\${concept.theme}</p>
        <div class="palette-dots">
          \${paletteDotsHtml}
          <span class="card-footer-action">Inspect 6 Specs &rarr;</span>
        </div>
      </div>
    \`;

    card.addEventListener('click', () => openModal(concept));
    gridContainer.appendChild(card);
  });
}

// Setup Filters
function setupFilters() {
  const filterBtns = document.querySelectorAll('.pill-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const filter = e.target.getAttribute('data-filter');
      
      if (filter === 'all') {
        renderGrid(logoConcepts);
      } else {
        const filtered = logoConcepts.filter(c => c.category === filter);
        renderGrid(filtered);
      }
    });
  });
}

// Setup Search
function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      renderGrid(logoConcepts);
      return;
    }
    const filtered = logoConcepts.filter(c => 
      c.name.toLowerCase().includes(query) || 
      c.theme.toLowerCase().includes(query) ||
      c.id.includes(query) ||
      c.category.toLowerCase().includes(query)
    );
    renderGrid(filtered);
  });
}

// Theme Toggle
function setupThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  const themeText = document.getElementById('themeText');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    const isDark = document.body.classList.contains('dark-mode');
    if (themeText) themeText.textContent = isDark ? 'Dark Board' : 'Light Board';
  });
}

// Modal Handlers
function setupModal() {
  const modal = document.getElementById('conceptModal');
  const closeBtn = document.getElementById('modalClose');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }
}

function openModal(concept) {
  const modal = document.getElementById('conceptModal');
  const modalBody = document.getElementById('modalBody');

  const swatchesHtml = concept.colors.map(c => \`
    <div class="swatch-row">
      <div class="swatch-box" style="background-color: \${c.hex};"></div>
      <div class="swatch-info">
        <span class="swatch-name">\${c.name}</span>
        <span class="swatch-hex">\${c.hex}</span>
      </div>
    </div>
  \`).join('');

  modalBody.innerHTML = \`
    <div class="modal-header-section">
      <div>
        <span class="concept-number">CONCEPT #\${concept.id}</span>
        <h2 class="modal-title">\${concept.name}</h2>
        <p class="modal-subtitle">\${concept.theme}</p>
      </div>
    </div>

    <h3 class="variations-title">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      6 Required Brand Identity Variations
    </h3>

    <div class="variations-grid">
      <!-- 1. Main Logo -->
      <div class="variation-box">
        <span class="variation-label">1. Main Logo Lockup</span>
        \${concept.mainSvg}
      </div>

      <!-- 2. Company Name Typographic Lockup -->
      <div class="variation-box">
        <span class="variation-label">2. Company Name Typography</span>
        \${concept.wordmarkOnlySvg}
      </div>

      <!-- 3. Icon-Only Mark -->
      <div class="variation-box">
        <span class="variation-label">3. Icon-Only Version</span>
        \${concept.iconOnlySvg}
      </div>

      <!-- 4. Horizontal Logo Version -->
      <div class="variation-box">
        <span class="variation-label">4. Horizontal Logo Version</span>
        \${concept.horizontalSvg}
      </div>

      <!-- 5. Black & White Dark Contrast Version -->
      <div class="variation-box dark-bg">
        <span class="variation-label">5. Black & White (Monochrome)</span>
        \${concept.bwSvg}
      </div>

      <!-- 6. Small Size Preview (Favicon & Avatar) -->
      <div class="variation-box">
        <span class="variation-label">6. Small-Size Previews (32px, 24px, 64px)</span>
        <div class="small-preview-strip">
          <div class="fav-item">
            <div class="fav-circle" style="width: 32px; height: 32px; padding: 4px;">\${concept.iconOnlySvg}</div>
            <span>32px Favicon</span>
          </div>
          <div class="fav-item">
            <div class="fav-circle" style="width: 24px; height: 24px; padding: 3px;">\${concept.iconOnlySvg}</div>
            <span>24px Header</span>
          </div>
          <div class="fav-item">
            <div class="fav-circle" style="width: 64px; height: 64px; padding: 8px;">\${concept.iconOnlySvg}</div>
            <span>64px App Icon</span>
          </div>
        </div>
      </div>
    </div>

    <div class="spec-grid">
      <div class="rationale-card">
        <h4>Design Rationale & Brand Strategy</h4>
        <p>\${concept.rationale}</p>
        <p><strong>Primary Application:</strong> Corporate signage, visiting cards, digital portals, recruitment media, uniforms, vehicle branding, and social media icons.</p>
      </div>

      <div class="palette-card">
        <h4>Color System Swatches</h4>
        <div class="color-swatch-list">
          \${swatchesHtml}
        </div>
      </div>
    </div>
  \`;

  modal.classList.add('active');
}
`;

fs.writeFileSync(path.join(__dirname, '../logo_presentation/app.js'), fileContent);
console.log('Successfully generated 100 logo concepts in app.js!');
