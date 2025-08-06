/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns (expects two columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Column 1: image
  const img = grid.querySelector('img');
  // Column 2: the info content
  const infoDiv = Array.from(grid.children).find(child => child !== img);
  // Build columns row: [img, infoDiv]
  const columnsRow = [img, infoDiv];
  // Table header
  const headerRow = ['Columns (columns32)'];
  // Compose and replace
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);
  element.replaceWith(table);
}
