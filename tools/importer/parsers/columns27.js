/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row exactly as required
  const headerRow = ['Columns (columns27)'];

  // Find the grid containing the columns
  const grid = element.querySelector('.grid-layout');
  // Defensive: If no grid, fallback to main container
  const columns = grid ? Array.from(grid.children) : Array.from(element.querySelector('.container')?.children || []);

  // Only process first-level children of the grid as columns
  // The left column is the div with text content and Subscribe button
  // The right column is the image
  // Compose each cell: use direct reference to each block of content
  const leftColContent = columns.find(el => el.tagName === 'DIV');
  const rightColContent = columns.find(el => el.tagName === 'IMG');

  // Defensive: If rightColContent is not found, use an empty string

  // For left column: include all children (not just the div itself)
  let leftColCell = [];
  if (leftColContent) {
    leftColCell = Array.from(leftColContent.childNodes).filter(node =>
      node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())
    );
  }

  // For right column: use the img element directly if present
  let rightColCell = rightColContent ? rightColContent : '';

  // Ensure both columns exist in second row
  const secondRow = [leftColCell, rightColCell];

  // Compose table data
  const tableRows = [headerRow, secondRow];

  // Create the table block
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace original element with the block table
  element.replaceWith(blockTable);
}
