/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must exactly match: Columns (columns1)
  const headerRow = ['Columns (columns1)'];

  // Find the .grid-layout container with columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the direct children of grid: these are the columns
  const gridColumns = Array.from(grid.children);

  // For this structure: left is img, right is the div with heading, paragraph, buttons
  const leftCell = gridColumns.find(child => child.tagName === 'IMG');
  const rightCell = gridColumns.find(child => child !== leftCell);

  // The table expects both cells in a single row
  const cellsRow = [leftCell || '', rightCell || ''];

  // Compose the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cellsRow
  ], document);

  // Replace the element with the table
  element.replaceWith(table);
}
