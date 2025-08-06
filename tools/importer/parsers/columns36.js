/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main container
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;
  // Get all direct children of the main grid (should be two: left and right)
  const gridChildren = Array.from(grid.children);
  let leftCol = null;
  let rightCol = null;
  // Detect which is left and right by checking for h1/p or images
  for (const child of gridChildren) {
    if ((child.querySelector('h1') || child.querySelector('p')) && !leftCol) {
      leftCol = child;
    }
    if (child.querySelector('img') && !rightCol) {
      rightCol = child;
    }
  }
  if (!leftCol || !rightCol) return;

  // LEFT COLUMN: collect all relevant elements (references only)
  const leftContent = [];
  // Heading
  const h1 = leftCol.querySelector('h1');
  if (h1) leftContent.push(h1);
  // Subheading/paragraph
  const subheading = leftCol.querySelector('p');
  if (subheading) leftContent.push(subheading);
  // Button group
  const btnGroup = leftCol.querySelector('.button-group');
  if (btnGroup) leftContent.push(btnGroup);

  // RIGHT COLUMN: collect all images (references only)
  // There's usually a grid inside with all images
  let images = [];
  const imgGrid = rightCol.querySelector('.grid-layout');
  if (imgGrid) {
    images = Array.from(imgGrid.querySelectorAll('img'));
  } else {
    images = Array.from(rightCol.querySelectorAll('img'));
  }
  // If only one image, just use the single element
  const rightContent = images.length === 1 ? images[0] : images;

  // Compose cells: header, and one row with two columns (text, images)
  const cells = [
    ['Columns (columns36)'],
    [leftContent, rightContent]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
