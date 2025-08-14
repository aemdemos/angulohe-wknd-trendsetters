/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row - must match example exactly
  const headerRow = ['Hero (hero12)'];

  // Try to find the grid layout - this contains all content
  const grid = element.querySelector('.w-layout-grid');
  let bgImg = '';
  let contentCell = '';

  if (grid) {
    // The grid usually has two direct child divs:
    // 1. The background image (absolute positioned)
    // 2. The container with the foreground content
    const gridDivs = grid.querySelectorAll(':scope > div');
    // Row 2: Background image (first grid cell, contains img.cover-image.utility-position-absolute)
    for (const div of gridDivs) {
      const img = div.querySelector('img.cover-image.utility-position-absolute');
      if (img) {
        bgImg = img;
        break;
      }
    }
    // Row 3: Main foreground content (second grid cell usually, but fallback to any content found)
    let mainContentDiv = null;
    if (gridDivs.length > 1) {
      mainContentDiv = gridDivs[1];
    }
    // Try to find .card-body (contains all text and CTAs), else fall back to mainContentDiv
    if (mainContentDiv) {
      const cardBody = mainContentDiv.querySelector('.card-body');
      if (cardBody) {
        contentCell = cardBody;
      } else {
        contentCell = mainContentDiv;
      }
    } else {
      // If nothing else, use the whole grid element
      contentCell = grid;
    }
  } else {
    // Fallback: use the first img for bgImg, and all content for contentCell
    const img = element.querySelector('img');
    if (img) bgImg = img;
    contentCell = element;
  }

  // Compose table as instructed: 1 column, 3 rows
  const rows = [
    headerRow,
    [bgImg],
    [contentCell]
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
