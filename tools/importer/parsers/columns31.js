/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Columns block - must match exactly
  const headerRow = ['Columns (columns31)'];

  // Try to find the grid container holding the columns
  let grid = element.querySelector('.grid-layout');
  if (!grid) grid = element;

  // All immediate children of the grid are the columns
  const columns = Array.from(grid.children);

  // Edge case: if there are no columns, do nothing
  if (columns.length === 0) return;

  // Build content row: each cell is the referred column node (preserves content and semantics)
  const contentRow = columns.map(col => col);

  // Compose cells as per the structure (header row, column row)
  const cells = [headerRow, contentRow];

  // Create the columns block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element in the DOM
  element.replaceWith(block);
}
