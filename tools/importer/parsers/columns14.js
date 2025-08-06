/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (the columns)
  const columns = Array.from(grid.children).filter(child => child.nodeType === 1);
  // If no columns found, don't proceed
  if (columns.length === 0) return;

  // The header row must be a single cell, REGARDLESS of column count in the next row
  const headerRow = ['Columns (columns14)'];
  // The next row must have as many columns as columns present
  const bodyRow = columns;

  // Compose the table cells array
  const cells = [headerRow, bodyRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
