/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single cell (per spec)
  const headerRow = ['Columns (columns14)'];

  // Find the grid layout (columns wrapper)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of grid as columns
  const columns = Array.from(grid.children);

  // Edge case: do nothing if no real columns
  if (columns.length === 0) return;

  // Compose table: header row is a single cell, content row is each column in a cell
  const cells = [
    headerRow,
    columns
  ];

  // Create and replace block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
