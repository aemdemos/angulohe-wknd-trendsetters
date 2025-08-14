/* global WebImporter */
export default function parse(element, { document }) {
  // Find the actual grid of columns
  const grid = element.querySelector('.grid-layout');
  let leftCol = null;
  let rightCol = null;

  if (grid) {
    // Get the immediate children of the grid layout
    const children = Array.from(grid.children);
    // Left column: anything that's not an image (usually a div with content)
    leftCol = children.find(child => child.tagName !== 'IMG');
    // Right column: first image
    rightCol = children.find(child => child.tagName === 'IMG');
  }
  // If not found, fallback: use first two children if available
  if (!leftCol && element.children.length > 0) leftCol = element.children[0];
  if (!rightCol && element.children.length > 1) rightCol = element.children[1];

  // The block header row must match exactly
  const headerRow = ['Columns (columns15)'];

  // Compose table row: only include cells that have content
  const row = [];
  if (leftCol) row.push(leftCol);
  if (rightCol) row.push(rightCol);

  // If no grid structure, use the whole element as a single cell
  const cells = grid ? [headerRow, row] : [headerRow, [element]];

  // Create the columns block and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
