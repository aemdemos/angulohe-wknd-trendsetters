/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches required block name
  const headerRow = ['Columns (columns1)'];

  // Get the main grid containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children of the grid (columns)
  const columns = Array.from(grid.children);

  // Defensive: Only use non-empty columns
  const contentRow = columns.map((col) => col);

  // Build and insert the block table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}
