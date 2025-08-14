/* global WebImporter */
export default function parse(element, { document }) {
  // Table header: exactly as specified
  const headerRow = ['Hero (hero39)'];

  // Find immediate child divs of the grid-layout
  const grid = element.querySelector(':scope > .w-layout-grid.grid-layout');
  let bgImg = null;
  let contentCell = [];
  if (grid) {
    // This grid contains two divs: one for the image, one for text
    const children = grid.querySelectorAll(':scope > div');
    // The image is in the first div, text is in the second
    if (children[0]) {
      // Find the background image (first <img> in the first div)
      const img = children[0].querySelector('img');
      if (img) {
        bgImg = img;
      }
    }
    if (children[1]) {
      // Find grid inside second cell for all text content
      const innerGrid = children[1].querySelector('.w-layout-grid');
      if (innerGrid) {
        // Find h1, paragraph, and button inside innerGrid
        const h1 = innerGrid.querySelector('h1');
        if (h1) contentCell.push(h1);
        // Find all paragraphs and add them (to capture all subheadings and text)
        const paragraphs = innerGrid.querySelectorAll('p');
        paragraphs.forEach(p => { if (!contentCell.includes(p)) contentCell.push(p); });
        // Find all buttons/CTAs
        const ctas = innerGrid.querySelectorAll('a, button');
        ctas.forEach(cta => { if (!contentCell.includes(cta)) contentCell.push(cta); });
      }
    }
  }

  // Fallbacks if content not found
  if (!bgImg) bgImg = '';
  if (contentCell.length === 0) contentCell = [''];

  // Build table
  const cells = [
    headerRow,
    [bgImg],
    [contentCell]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
