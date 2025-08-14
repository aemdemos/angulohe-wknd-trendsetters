/* global WebImporter */
export default function parse(element, { document }) {
  // The block table should have a single-cell header row, and the next row with N columns
  const headerRow = ['Columns (columns35)'];

  // Find the grid-layout container holding the columns
  const grid = element.querySelector('.grid-layout');
  let columnCells = [];
  if (grid) {
    // Each direct child of .grid-layout is a column
    columnCells = Array.from(grid.children);
    // If for some reason there are no columns, fallback to using grid as a single cell
    if (columnCells.length === 0) {
      columnCells = [grid];
    }
  } else {
    // fallback: treat everything as single column
    columnCells = [element];
  }

  // The cells array: header is a single cell, content row is as many columns as needed
  const cells = [headerRow, columnCells];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table block
  element.replaceWith(block);
}
