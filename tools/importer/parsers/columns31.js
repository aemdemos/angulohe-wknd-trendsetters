/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the grid-layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) {
    // If not found, do nothing (defensive - edge case)
    return;
  }

  // 2. Gather the immediate child elements (columns) for the block
  // Each <div> under .grid-layout is a column
  const columns = Array.from(grid.children);
  
  // If there are no columns, do nothing
  if (!columns.length) {
    return;
  }

  // 3. Header row as required in the example
  const headerRow = ['Columns (columns31)'];

  // 4. Content row: each column cell gets its corresponding div
  // Use original elements, not clones or innerHTML
  const contentRow = columns;

  // 5. Build the table and replace the original element
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  element.replaceWith(table);
}
