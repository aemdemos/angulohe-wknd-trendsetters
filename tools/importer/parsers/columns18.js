/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);
  // The original grid structure appears to be:
  // [text/heading column, contact list column, image column]

  // Let's try to preserve the visual column separation as in the source HTML
  // We'll use the first two columns for the left cell, third for the right cell

  // Find out which element is the image (should be img tag)
  let imageColIndex = gridChildren.findIndex((el) => el.tagName === 'IMG');
  if (imageColIndex === -1) imageColIndex = gridChildren.length - 1;
  const imageCol = gridChildren[imageColIndex];

  // The left cell contains everything except the image column
  const leftColNodes = gridChildren.filter((_, idx) => idx !== imageColIndex);
  const leftCol = document.createElement('div');
  leftColNodes.forEach((node) => leftCol.appendChild(node));

  // Compose the table
  const cells = [
    ['Columns (columns18)'],
    [leftCol, imageCol]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
