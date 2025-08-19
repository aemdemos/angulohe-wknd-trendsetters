/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout that holds the two main columns
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: heading, subheading, buttons
  const leftCol = columns[0];
  // Right column: image grid
  const rightCol = columns[1];

  // LEFT COLUMN: group all content nodes (heading, subheading, buttons)
  const leftContent = [];
  for (let child of leftCol.childNodes) {
    if (child.nodeType === 1 || (child.nodeType === 3 && child.textContent.trim() !== '')) {
      leftContent.push(child);
    }
  }

  // RIGHT COLUMN: find all images in grid (may be inside an extra grid-layout)
  let rightContent = [];
  const imageGrid = rightCol.querySelector('.grid-layout');
  if (imageGrid) {
    rightContent = Array.from(imageGrid.querySelectorAll('img'));
  } else {
    rightContent = Array.from(rightCol.querySelectorAll('img'));
  }

  // Build and add the block table
  const cells = [
    ['Columns (columns36)'],
    [leftContent, rightContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
