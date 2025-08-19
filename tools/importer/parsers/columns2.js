/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Left column: main block + the two center links stacked
  const leftColumn = [];
  if (gridChildren[0]) leftColumn.push(gridChildren[0]);
  if (gridChildren[1]) {
    const centerLinks = Array.from(gridChildren[1].querySelectorAll(':scope > a'));
    leftColumn.push(...centerLinks);
  }

  // Right column: all short story links
  let rightColumn = [];
  if (gridChildren[2]) {
    rightColumn = Array.from(gridChildren[2].querySelectorAll(':scope > a'));
  }

  // Compose table to match example structure (two columns)
  const headerRow = ['Columns (columns2)'];
  const secondRow = [leftColumn, rightColumn];
  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
