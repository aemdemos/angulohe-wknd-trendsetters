/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure we are referencing the correct grid block
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get the main two columns
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;
  const left = gridChildren[0]; // text content
  const right = gridChildren[1]; // image column

  // For the right column, find the grid containing the images
  let imagesBlock = right.querySelector('.grid-layout');
  let images = [];
  if (imagesBlock) {
    images = Array.from(imagesBlock.querySelectorAll('img'));
  } else {
    images = Array.from(right.querySelectorAll('img'));
  }
  
  // Compose the columns row: [left column, right column]
  // The left column should preserve all its content: h1, p, buttons
  // The right column should be all images, as an array
  const headerRow = ['Columns (columns36)'];
  const contentRow = [left, images];

  // Build and replace
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
