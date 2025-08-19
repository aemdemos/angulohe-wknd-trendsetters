/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container that holds our columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all direct children of the grid, which are the content blocks for each column
  const gridChildren = Array.from(grid.children);

  // Compose the header row EXACTLY as required: single cell
  const headerRow = ['Columns (columns30)'];

  // Compose the content row: a single array with all columns as cells
  const contentRow = gridChildren;

  // Create the cells array
  const cells = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the source element with the new block table
  element.replaceWith(block);
}
