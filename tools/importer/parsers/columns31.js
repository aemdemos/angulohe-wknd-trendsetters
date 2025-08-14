/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the grid of columns
  const grid = element.querySelector(
    '.grid-layout, .desktop-3-column, .tablet-2-column, .mobile-landscape-1-column'
  );
  const columns = grid ? Array.from(grid.children) : Array.from(element.children);
  if (columns.length === 0) return;

  // Create a header row with one cell, spanning all columns
  const headerRow = [document.createElement('th')];
  headerRow[0].textContent = 'Columns (columns31)';
  headerRow[0].setAttribute('colspan', columns.length);

  // Content row: reference each column's element
  const contentRow = columns;

  // Compose cells for the table
  const cells = [
    headerRow,
    contentRow
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(block);
}
