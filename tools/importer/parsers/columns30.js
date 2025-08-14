/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Get the grid container (the columns wrapper)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // 2. Get all direct column children from grid
  const columns = Array.from(grid.children);
  // Defensive: If columns are missing, bail out
  if (columns.length < 4) return;

  // For this layout, columns[0]: left text, columns[1]: tags, columns[2]: heading, columns[3]: rich text
  // Compose the third column by grouping heading and rich text together
  const col3 = document.createElement('div');
  col3.appendChild(columns[2]);
  col3.appendChild(columns[3]);

  // 3. Table header row: single cell, matches the example exactly
  const headerRow = ['Columns (columns30)'];
  // 4. Content row: three columns
  const contentRow = [columns[0], columns[1], col3];

  // 5. Create the table block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // 6. Replace the original element with the table
  element.replaceWith(table);
}
