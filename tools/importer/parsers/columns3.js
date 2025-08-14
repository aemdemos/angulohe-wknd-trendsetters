/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Check for grid-layout columns block structure
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all direct children of the grid as columns
  const columns = Array.from(grid.children);
  // Header row matches exactly as required
  const header = ['Columns (columns3)'];
  // Columns row, each cell is a column reference
  const row = columns.map((col) => col);
  // Build table
  const table = WebImporter.DOMUtils.createTable([header, row], document);
  // Replace original block with table
  element.replaceWith(table);
}
