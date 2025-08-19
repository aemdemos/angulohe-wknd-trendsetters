/* global WebImporter */
export default function parse(element, { document }) {
  // Header row with block name exactly as in the example
  const headerRow = ['Hero (hero28)'];

  // --- Row 2: Background Image (optional) ---
  let imageEl = null;
  // The image is usually within the first cell of the grid, inside a .ix-parallax-scale-out-hero
  const grid = element.querySelector('.w-layout-grid');
  if (grid) {
    const gridChildren = grid.querySelectorAll(':scope > div');
    if (gridChildren.length > 0) {
      // Look for the img inside this container
      const imgWrap = gridChildren[0];
      const img = imgWrap.querySelector('img');
      if (img) {
        imageEl = img;
      }
    }
  }
  // If not found, fallback: search for first image in the element
  if (!imageEl) {
    imageEl = element.querySelector('img') || '';
  }

  // --- Row 3: Title/subtitle/CTA (optional) ---
  // The text content is usually inside the second grid cell, within .container
  let textCell = null;
  if (grid) {
    const gridChildren = grid.querySelectorAll(':scope > div');
    if (gridChildren.length > 1) {
      textCell = gridChildren[1];
    }
  }
  // If not found, fallback: look for h1 and use its closest container
  if (!textCell) {
    const h1 = element.querySelector('h1');
    if (h1) {
      textCell = h1.closest('div');
    }
  }
  // If still not found, just use empty
  if (!textCell) {
    textCell = '';
  }

  // Assemble the table
  const rows = [
    headerRow,
    [imageEl || ''],
    [textCell || '']
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
