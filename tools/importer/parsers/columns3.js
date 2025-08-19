/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid container (columns block)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children).filter(child => child.tagName === 'DIV');
  if (!columns.length) return;

  // Columns (columns3) block header, matches example EXACTLY
  const headerRow = ['Columns (columns3)'];

  // Compose cells, each cell is the original column's content
  // Reference original children (not clones)
  const cellsRow = columns.map(col => {
    // If column has only one main child, reference it directly
    if (col.children.length === 1) {
      return col.firstElementChild;
    } else if (col.children.length > 1) {
      // If multiple children, reference them all in an array
      return Array.from(col.children);
    } else {
      // If column is empty, cell is an empty string
      return '';
    }
  });

  // Build and replace with the block table
  const blockTable = WebImporter.DOMUtils.createTable([
    headerRow,
    cellsRow,
  ], document);
  element.replaceWith(blockTable);
}
