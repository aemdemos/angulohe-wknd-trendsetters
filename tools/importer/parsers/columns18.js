/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // The columns are all direct children of the grid layout
  const columns = Array.from(grid.children);

  // Header row (exactly as in the example)
  const headerRow = ['Columns (columns18)'];

  // Second row: create one cell per column (each cell can contain a block of content)
  const contentRow = columns.map((col) => col);

  // Only create the block table (no Section Metadata table, no <hr>, per example)
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
