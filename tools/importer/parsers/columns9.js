/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // 2. Get all direct children of the grid: each is a column
  const columns = Array.from(grid.children);

  // 3. Prepare header row, matching perfectly the required block name
  const headerRow = ['Columns (columns9)'];

  // 4. Prepare the first content row: reference the column elements directly
  const contentRow = columns;

  // 5. Compose the cells array
  const cells = [headerRow, contentRow];

  // 6. Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // 7. Replace the original element with the new block
  element.replaceWith(block);
}
