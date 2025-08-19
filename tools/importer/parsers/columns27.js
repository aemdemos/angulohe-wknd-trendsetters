/* global WebImporter */
export default function parse(element, { document }) {
  // Find the immediate .container > .w-layout-grid (the grid with columns)
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get direct grid children (columns)
  const columns = Array.from(grid.children);
  // We expect two columns: left (text) and right (image)
  if (columns.length < 2) return;

  // Prepare the header row
  const headerRow = ['Columns (columns27)'];

  // Second row: left column content, right column image
  // Per guidance, reference the entire block for each cell
  const contentRow = [columns[0], columns[1]];

  // Create table block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
