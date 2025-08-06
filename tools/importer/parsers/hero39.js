/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row: must match example exactly
  const headerRow = ['Hero (hero39)'];

  // Find direct child grid divs
  const gridLayout = element.querySelector(':scope > .w-layout-grid');
  if (!gridLayout) return;
  const gridDivs = gridLayout.querySelectorAll(':scope > div');

  // Background image row
  let bgImg = '';
  if (gridDivs.length > 0) {
    const img = gridDivs[0].querySelector('img');
    if (img) bgImg = img;
  }
  const imageRow = [bgImg];

  // Content row: headline, subheading, CTA
  let contentCell = [];
  if (gridDivs.length > 1) {
    // This grid contains the text and CTA
    const contentGrid = gridDivs[1];
    // Find the column that contains text and CTA
    // Sometimes there's an inner grid
    let contentParts = [];
    const innerGrid = contentGrid.querySelector(':scope > .w-layout-grid');
    if (innerGrid) {
      // Typical structure: h1, then .flex-vertical
      const h1 = innerGrid.querySelector('h1');
      if (h1) contentParts.push(h1);
      const flex = innerGrid.querySelector('.flex-vertical');
      if (flex) {
        // Paragraph (subheading)
        const p = flex.querySelector('p');
        if (p) contentParts.push(p);
        // CTA button in .button-group
        const btnGroup = flex.querySelector('.button-group');
        if (btnGroup) {
          const cta = btnGroup.querySelector('a');
          if (cta) contentParts.push(cta);
        }
      }
    } else {
      // Fallback: look for h1, p, and a directly
      const h1 = contentGrid.querySelector('h1');
      if (h1) contentParts.push(h1);
      const p = contentGrid.querySelector('p');
      if (p) contentParts.push(p);
      const cta = contentGrid.querySelector('a');
      if (cta) contentParts.push(cta);
    }
    contentCell = contentParts;
  }
  const contentRow = [contentCell];

  // Assemble table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
