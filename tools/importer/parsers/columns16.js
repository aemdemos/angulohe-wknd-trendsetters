/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container for columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Each immediate child of grid is a column/cell
  const columnDivs = Array.from(grid.children);

  // For each column, gather ALL direct child elements as the cell content
  // This ensures images, text, buttons, lists, etc, are all included
  const cells = columnDivs.map((col) => {
    // We want to include everything inside this column
    // Get all direct children (not just images)
    const children = Array.from(col.children);
    // If no children, include the column div itself
    if (children.length === 0) return col;
    return children;
  });

  // Build the table following the block requirements
  const tableCells = [
    ['Columns (columns16)'], // Header row, must match exactly
    cells // Second row, each column contains one cell (may be array of elements)
  ];

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(block);
}
