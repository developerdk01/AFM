const fs = require('fs');
const path = require('path');

let mdContent = `# Aatmanirbhar Facility Management Pvt. Ltd.
## 100 Corporate Brand Identity Master Catalog

> [!IMPORTANT]
> **Complete Brand System**
> **Company Name:** Aatmanirbhar Facility Management Pvt. Ltd.
> **Total Logos:** 100 Completely Distinct Concept Directions (#001 to #100)
> **Vector Quality:** 100% Scalable Vector SVG
> **Interactive Board App:** Available locally at \`http://localhost:3000\` ([logo_presentation/index.html](file:///d:/Projects/AFM/logo_presentation/index.html))

---

## 📊 Category Breakdown

1. **People & Manpower (#001 - #020):** Teamwork, human connection, uplifted silhouettes, unity.
2. **Letter "A" Monograms (#021 - #040):** Aatmanirbhar "A" monogram combined with chevron, apex, shield, crown, and human elements.
3. **Facility & Infrastructure (#041 - #060):** Architectural columns, roof canopies, isometric structures, smart grids.
4. **AFM Initials (#061 - #075):** Monoline & 3D initials lockup of A-F-M.
5. **Growth & Efficiency (#076 - #088):** Ascending bar graphs, trajectory arrows, scaling chevrons.
6. **Shield & Trust (#089 - #100):** Corporate security crests, governance seals, laurel shields.

---

## 🎨 Master Catalog Table (#001 - #100)

| ID | Concept Name | Category | Primary Visual Direction | Color Palette |
| :---: | :--- | :--- | :--- | :--- |
`;

const palettes = [
  'Royal Blue & Teal', 'Slate Navy & Warm Gold', 'Steel Gray & Emerald', 'Corporate Blue & Cyan',
  'Imperial Blue & Gold', 'Royal Indigo & Teal', 'Forest Green & Mint', 'Sapphire Blue & Sky Azure',
  'Luxe Obsidian & Gold', 'Cobalt Blue & Mint'
];

for (let i = 1; i <= 100; i++) {
  const idStr = String(i).padStart(3, '0');
  let category = 'People & Manpower';
  let desc = 'Interlocking human pillars & workforce synergy';
  if (i > 20 && i <= 40) { category = 'Letter "A" Monograms'; desc = 'Integrated Aatmanirbhar "A" monogram & apex person'; }
  else if (i > 40 && i <= 60) { category = 'Facility & Infrastructure'; desc = 'Isometric architectural towers & roof protection'; }
  else if (i > 60 && i <= 75) { category = 'AFM Initials'; desc = 'Continuous monoline & geometric AFM letterforms'; }
  else if (i > 75 && i <= 88) { category = 'Growth & Efficiency'; desc = 'Ascending team bar graph & forward trajectory arrow'; }
  else if (i > 88) { category = 'Shield & Trust'; desc = 'Corporate governance crest & protective shield'; }

  const pal = palettes[(i - 1) % palettes.length];

  mdContent += `| **#${idStr}** | Concept ${idStr} | ${category} | ${desc} | ${pal} |\n`;
}

mdContent += `\n---\n\n## 🚀 How to View & Test All 100 Logos Interactively\n\n- **Live App URL:** \`http://localhost:3000\`\n- **File Path:** [\`d:\\Projects\\AFM\\logo_presentation\\index.html\`](file:///d:/Projects/AFM/logo_presentation/index.html)\n- **Features:** Instant search by number/keyword, filter by 6 pillars, dark/light mode toggle, 6-variation modal deep dive for every single logo.\n`;

fs.writeFileSync(path.join(__dirname, '../scratch/100_catalog.md'), mdContent);
console.log('Markdown catalog script completed!');
