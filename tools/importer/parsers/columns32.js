/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (the columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get direct children of the grid as columns
  const columns = Array.from(grid.children);
  // Make sure there's at least two columns (image and text)
  // Column 1: image, Column 2: text content
  // Compose the table cells array
  const cells = [
    ['Columns (columns32)'],
    columns.map(col => col)
  ];
  // Create the block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the section element with the constructed block
  element.replaceWith(block);
}
