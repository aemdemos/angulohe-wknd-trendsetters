/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure the block header exactly matches the requirement
  const headerRow = ['Columns (columns9)'];

  // Find the grid container with columns as direct children
  let grid = element.querySelector('.grid-layout');
  if (!grid) {
    grid = element.querySelector('[class*=grid-layout]'); // fallback for class variations
  }
  if (!grid) return; // Graceful exit for missing grid

  // Each direct child div or ul in grid-layout is a column
  // Some columns are divs, some are ul; select all direct children
  const columns = Array.from(grid.children);
  // Filter out any completely empty columns
  const contentRow = columns.filter(col => col && (col.textContent.trim() || col.querySelector('svg')));

  // Reference existing elements (don't clone)
  // Each cell in the contentRow should be the column container
  const cells = [headerRow, contentRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
