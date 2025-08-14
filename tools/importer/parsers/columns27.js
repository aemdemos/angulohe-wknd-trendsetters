/* global WebImporter */
export default function parse(element, { document }) {
  // Block name header, exactly matching the example
  const headerRow = ['Columns (columns27)'];

  // Find the grid block inside the section
  const grid = element.querySelector('.grid-layout');
  let columns = [];

  if (grid) {
    // Get all direct children of the grid
    const gridChildren = Array.from(grid.children);
    // For this HTML, first column is the text content div, second is the image
    if (gridChildren.length >= 2) {
      // Column 1: entire left content block
      columns.push(gridChildren[0]);
      // Column 2: entire right image block (the <img> itself)
      columns.push(gridChildren[1]);
    } else {
      // Unlikely fallback, but be robust: all children as columns
      columns = gridChildren;
    }
  } else {
    // Fallback: all direct children of element as columns
    columns = Array.from(element.children);
  }

  // Build table: first row is header, second is the columns
  const table = WebImporter.DOMUtils.createTable([headerRow, columns], document);
  // Replace the element with the new block table
  element.replaceWith(table);
}
