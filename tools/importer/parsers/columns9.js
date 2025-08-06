/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container with all columns
  let grid = element.querySelector('.w-layout-grid');
  let columns = [];

  // Defensive: try to find the right grid container
  if (!grid) {
    const container = element.querySelector('.container');
    if (container) {
      grid = container.querySelector('.w-layout-grid');
    }
  }

  if (grid) {
    columns = Array.from(grid.children);
  } else {
    // fallback: just use all immediate children
    columns = Array.from(element.children);
  }

  // Compose the block table: Header row (single cell), then one row with all columns
  const headerRow = ['Columns (columns9)']; // single cell
  const contentRow = columns; // as many cells as there are columns

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
