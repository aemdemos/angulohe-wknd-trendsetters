/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row exactly matching the required block name
  const headerRow = ['Columns (columns31)'];

  // Find the main grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  let columns = [];
  if (grid) {
    // Only use the direct columns within the grid
    columns = Array.from(grid.children);
  } else {
    // Fallback: use the direct children of element
    columns = Array.from(element.querySelectorAll(':scope > div'));
  }
  // Remove empty columns (just in case)
  columns = columns.filter(col => col.textContent.trim() || col.querySelector('*'));

  // Build the table cells: header and content row
  const cells = [
    headerRow,
    columns
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element with the table
  element.replaceWith(table);
}
