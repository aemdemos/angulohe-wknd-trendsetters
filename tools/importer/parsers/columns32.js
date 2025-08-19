/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that holds columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Extract direct child nodes of the grid (columns)
  const columns = Array.from(grid.children);
  // Structure: header row, then one row with all columns as cells
  const cells = [];
  // Block header must match example precisely:
  cells.push(['Columns (columns32)']);
  // Add row with one cell per column
  cells.push(columns);
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
