/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the columns (should be .w-layout-grid)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Extract the immediate children of the grid (correspond to columns)
  const cols = Array.from(grid.children);

  // Defensive: ensure there are columns
  if (!cols.length) return;

  // Compose the table rows
  const headerRow = ['Columns (columns30)'];
  const contentRow = cols.map((col) => col);

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the columns table
  element.replaceWith(table);
}
