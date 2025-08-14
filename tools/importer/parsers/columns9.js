/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns container (the grid of columns)
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all direct children that are columns (the vertical flex and the <ul>s)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Build the table data
  // 1. Header row: exactly one column with the block name
  const rows = [['Columns (columns9)']];
  // 2. Content rows: each subsequent row is a single set of columns. For this case, just one content row.
  rows.push(columns);

  // Create the table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
