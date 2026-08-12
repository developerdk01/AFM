const fs = require('fs');
const path = require('path');

const emblems = JSON.parse(fs.readFileSync(path.join(__dirname, 'emblems_data.json'), 'utf8'));

// Now load catalog logos if exists or combine
const catalogConcepts = [];
for (let i = 1; i <= 100; i++) {
  const idStr = String(i).padStart(3, '0');
  let category = 'human';
  let catName = 'People & Manpower';
  let theme = 'Manpower Synergy & Workforce Leadership';

  if (i > 20 && i <= 40) { category = 'letter_a'; catName = 'Letter "A" Monograms'; theme = 'Aatmanirbhar Monogram & Self-Reliance Mark'; }
  else if (i > 40 && i <= 60) { category = 'facility'; catName = 'Facility & Infrastructure'; theme = 'Architectural Management & Facility Care'; }
  else if (i > 60 && i <= 75) { category = 'afm'; catName = 'AFM Initials'; theme = 'Corporate AFM Monogram & Brand Identity'; }
  else if (i > 75 && i <= 88) { category = 'growth'; catName = 'Growth & Efficiency'; theme = 'Operational Growth & Efficiency Progress'; }
  else if (i > 88) { category = 'shield'; catName = 'Shield & Trust'; theme = 'Trust Emblem, Governance & Safety Assurance'; }

  catalogConcepts.push({
    id: `C${idStr}`,
    name: `Catalog #${idStr} — ${catName}`,
    shortTitle: `${catName} #${idStr}`,
    category: category,
    theme: theme,
    colors: [
      { name: 'Royal Navy', hex: '#0F172A' },
      { name: 'Gold Accent', hex: '#D97706' },
      { name: 'Pure White', hex: '#FFFFFF' }
    ],
    rationale: `Catalog direction #${idStr} for Aatmanirbhar Facility Management. Scalable vector mark.`,
    mainSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 220" width="100%" height="100%"><g transform="translate(225, 70)"><polygon points="0,-50 40,-20 30,35 0,50 -30,35 -40,-20" fill="#0F172A"/><circle cx="0" cy="-10" r="12" fill="#D97706"/></g><text x="225" y="165" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="22" fill="#0F172A" text-anchor="middle" letter-spacing="3">AATMANIRBHAR</text><text x="225" y="188" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#64748B" text-anchor="middle" letter-spacing="3.5">FACILITY MANAGEMENT PVT. LTD.</text></svg>`,
    iconOnlySvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" width="100%" height="100%"><g transform="translate(80, 80)"><polygon points="0,-50 40,-20 30,35 0,50 -30,35 -40,-20" fill="#0F172A"/><circle cx="0" cy="-10" r="12" fill="#D97706"/></g></svg>`,
    horizontalSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 120" width="100%" height="100%"><g transform="translate(50, 50) scale(0.65)"><polygon points="0,-50 40,-20 30,35 0,50 -30,35 -40,-20" fill="#0F172A"/></g><text x="135" y="52" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="22" fill="#0F172A" letter-spacing="2">AATMANIRBHAR</text><text x="135" y="74" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#64748B" letter-spacing="3.2">FACILITY MANAGEMENT PVT. LTD.</text></svg>`,
    bwSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 220" width="100%" height="100%"><g transform="translate(225, 70)"><polygon points="0,-50 40,-20 30,35 0,50 -30,35 -40,-20" fill="#FFFFFF"/></g><text x="225" y="165" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="22" fill="#FFFFFF" text-anchor="middle" letter-spacing="3">AATMANIRBHAR</text><text x="225" y="188" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="10" fill="#94A3B8" text-anchor="middle" letter-spacing="3.5">FACILITY MANAGEMENT PVT. LTD.</text></svg>`,
    wordmarkOnlySvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 100" width="100%" height="100%"><text x="225" y="45" font-family="'Space Grotesk', sans-serif" font-weight="700" font-size="24" fill="#0F172A" text-anchor="middle" letter-spacing="3">AATMANIRBHAR</text><text x="225" y="72" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="11" fill="#64748B" text-anchor="middle" letter-spacing="4">FACILITY MANAGEMENT PVT. LTD.</text></svg>`
  });
}

// Emblems first!
const allConcepts = [...emblems, ...catalogConcepts];

const appJsContent = `// Master Corporate Brand Identity System - Emblem Series & Catalog
// Aatmanirbhar Facility Management Pvt. Ltd.

const logoConcepts = ${JSON.stringify(allConcepts, null, 2)};

document.addEventListener('DOMContentLoaded', () => {
  // Show emblems first by default
  const emblemsOnly = logoConcepts.filter(c => c.category === 'emblem');
  renderGrid(emblemsOnly);
  setupFilters();
  setupSearch();
  setupThemeToggle();
  setupModal();
});

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
          <span class="card-footer-action">Inspect 6 Variations &rarr;</span>
        </div>
      </div>
    \`;

    card.addEventListener('click', () => openModal(concept));
    gridContainer.appendChild(card);
  });
}

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

function setupSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      const emblemsOnly = logoConcepts.filter(c => c.category === 'emblem');
      renderGrid(emblemsOnly);
      return;
    }
    const filtered = logoConcepts.filter(c => 
      c.name.toLowerCase().includes(query) || 
      c.theme.toLowerCase().includes(query) ||
      c.id.toLowerCase().includes(query) ||
      c.category.toLowerCase().includes(query)
    );
    renderGrid(filtered);
  });
}

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
        <span class="concept-number">EMBLEM #\${concept.id}</span>
        <h2 class="modal-title">\${concept.name}</h2>
        <p class="modal-subtitle">\${concept.theme}</p>
      </div>
    </div>

    <h3 class="variations-title">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      6 Required Brand Identity Variations
    </h3>

    <div class="variations-grid">
      <div class="variation-box">
        <span class="variation-label">1. Main Emblem Lockup</span>
        \${concept.mainSvg}
      </div>

      <div class="variation-box">
        <span class="variation-label">2. Company Name Typography</span>
        \${concept.wordmarkOnlySvg}
      </div>

      <div class="variation-box">
        <span class="variation-label">3. Icon-Only Standalone Mark</span>
        \${concept.iconOnlySvg}
      </div>

      <div class="variation-box">
        <span class="variation-label">4. Horizontal Logo Version</span>
        \${concept.horizontalSvg}
      </div>

      <div class="variation-box dark-bg">
        <span class="variation-label">5. Black & White Monochrome</span>
        \${concept.bwSvg}
      </div>

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
        <h4>Design Rationale & Superhero/Global Brand Impact</h4>
        <p>\${concept.rationale}</p>
        <p><strong>Primary Application:</strong> Corporate headquarters facade, employee uniforms, security/facility IDs, premium fleet vehicles, letterheads, executive stamps, and mobile digital app.</p>
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

fs.writeFileSync(path.join(__dirname, '../logo_presentation/app.js'), appJsContent);
console.log('App.js updated with 10 Superhero Power Emblems!');
