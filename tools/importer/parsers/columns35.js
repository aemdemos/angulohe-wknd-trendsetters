/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing column content
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const columns = Array.from(grid.children);
  // Header: one cell only, exactly as required
  const header = ['Columns (columns35)'];
  // Content: one row, each column as a cell (not grouped)
  const row = columns.map(col => col);
  // Generate the table
  const table = WebImporter.DOMUtils.createTable([
    header,
    row
  ], document);
  element.replaceWith(table);
}
