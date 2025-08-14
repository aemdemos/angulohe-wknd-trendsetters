/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (these are columns)
  const columns = Array.from(grid.children);

  // Prepare the header row (must match example exactly)
  const headerRow = ['Columns (columns32)'];

  // Prepare the columns content row
  const contentRow = columns.map(col => col);

  // Compose the cells array: first row is header, second is content columns
  const cells = [
    headerRow,
    contentRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original section element with the new block table
  element.replaceWith(block);
}
