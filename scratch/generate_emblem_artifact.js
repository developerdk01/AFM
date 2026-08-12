const fs = require('fs');
const path = require('path');

const emblems = JSON.parse(fs.readFileSync(path.join(__dirname, 'emblems_data.json'), 'utf8'));

let md = `# AATMANIRBHAR — Facility Management Pvt. Ltd.
## 10 Superhero & Major Global Brand Power Emblem Concepts

---

> [!IMPORTANT]
> **Executive Brand Positioning**
> **Company Name:** AATMANIRBHAR Facility Management Pvt. Ltd.
> **Design Philosophy:** Superhero emblem impact, cinematic symmetry, razor-sharp geometric silhouettes, bold letter integration, 100% standalone recognition. Built for major global enterprise authority.

---

## ⚡ Master Presentation Overview Board

| # | Concept Name | Key Visual Emblem & Symbolism | Palette System |
| :---: | :--- | :--- | :--- |
| **01** | **AATMANIRBHAR EMBLEM** | Faceted Diamond Shield & Razor-Sharp Apex "A" | Obsidian Black \`#0B0F19\` & Luxe Gold \`#D4AF37\` |
| **02** | **AFM SYMBOL** | Unified Hexagonal Crest Merging Letters A + F + M | Midnight Navy \`#0A192F\` & Silver Platinum \`#CBD5E1\` |
| **03** | **A + HUMAN POWER** | Superhero Shield & Outstretched Workforce Titan Figure | Matte Black \`#111827\` & Crimson Red \`#DC2626\` |
| **04** | **A + SHIELD** | Governance Shield & Split Monogram "A" Canopy | Imperial Navy \`#1E3A8A\` & Amber Gold \`#F59E0B\` |
| **05** | **CIRCULAR EMBLEM** | 360° Automotive Insignia Badge & Symmetrical "A" Star | Dark Slate \`#0F172A\` & Electric Cyan \`#06B6D4\` |
| **06** | **CROWN / LEADERSHIP** | Executive Crown Crest Merged with Central Peak "A" | Graphite \`#18181B\` & Champagne Gold \`#C59B27\` |
| **07** | **NEGATIVE SPACE A** | Solid Black Circle with Hidden Human & Roof Canopy "A" | Obsidian Black \`#000000\` & Stark White \`#FFFFFF\` |
| **08** | **FUTURISTIC CORPORATE** | Cyber Precision Hexagon Matrix & 6 Faceted Polygon Blades | Space Navy \`#030712\` & Ultramarine Blue \`#3B82F6\` |
| **09** | **POWER + GROWTH** | Tri-Chevron Ascending Arrowhead (People → Growth) | Deep Blue \`#1D4ED8\` & Vibrant Teal \`#0D9488\` |
| **10** | **SIGNATURE BRAND MARK** | Monolith Faceted Isometric Triangle & Infinity Ribbon Ring | Midnight Black \`#09090B\` & Gold \`#D4AF37\` |

---

`;

emblems.forEach(e => {
  md += `## Concept ${e.numberStr} — ${e.name.replace(/^\d+\s*—\s*/, '')}

> **Brand Rationale:** ${e.rationale}

### 1. Main Emblem Lockup
\`\`\`xml
${e.mainSvg}
\`\`\`

### 2. Company Name Typography
\`\`\`xml
${e.wordmarkOnlySvg}
\`\`\`

### 3. Icon-Only Standalone Mark
\`\`\`xml
${e.iconOnlySvg}
\`\`\`

### 4. Horizontal Logo Version
\`\`\`xml
${e.horizontalSvg}
\`\`\`

### 5. Black & White Version (Monochrome)
\`\`\`xml
${e.bwSvg}
\`\`\`

---

`;
});

md += `## 🚀 Interactive Presentation App

- **Live Web Showcase:** \`http://localhost:3000\`
- **File Link:** [\`logo_presentation/index.html\`](file:///d:/Projects/AFM/logo_presentation/index.html)
- **Features:** Dark/Light theme toggle, instant filter for 10 Power Emblems, 6-variation modal deep dive, 32px/24px micro-favicon clarity tests.
`;

fs.writeFileSync(path.join(__dirname, '../scratch/emblems_presentation.md'), md);
console.log('Emblems presentation markdown generated!');
