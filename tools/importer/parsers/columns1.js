/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main grid containing columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // The header row exactly as per instructions
  const headerRow = ['Columns (columns1)'];

  // Compose the second row: each column as its own cell
  // Reference the original DOM nodes directly
  const contentRow = columns;

  // Create the block table with the correct structure
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original block element with the new block table
  element.replaceWith(table);
}
