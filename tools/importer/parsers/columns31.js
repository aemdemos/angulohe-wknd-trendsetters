/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout element that holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Extract all direct child elements of the grid as columns
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Header row: must be a single column with the block name
  const headerRow = ['Columns (columns31)'];
  // Content row: as many columns as found in the grid
  const contentRow = columns;

  // Create the table block with the correct structure
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}