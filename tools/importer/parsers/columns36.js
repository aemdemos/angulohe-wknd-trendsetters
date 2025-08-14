/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches example
  const headerRow = ['Columns (columns36)'];

  // Get main container and grid
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of grid (columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: text and buttons
  const leftCol = columns[0];
  const leftColContent = [];
  // Add heading
  const heading = leftCol.querySelector('h1');
  if (heading) leftColContent.push(heading);
  // Add subheading
  const subheading = leftCol.querySelector('p');
  if (subheading) leftColContent.push(subheading);
  // Add button group
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftColContent.push(buttonGroup);

  // Right column: grid of images
  const rightCol = columns[1];
  // Find grid with images inside rightCol
  let imgEls = [];
  const imageGrid = rightCol.querySelector('.grid-layout');
  if (imageGrid) {
    imgEls = Array.from(imageGrid.querySelectorAll('img'));
  }
  // If no imageGrid, fallback to all images inside rightCol
  if (imgEls.length === 0) {
    imgEls = Array.from(rightCol.querySelectorAll('img'));
  }
  // Defensive: only keep non-empty images
  imgEls = imgEls.filter(img => img.getAttribute('src'));

  // Structure matches example: header, then one row, two columns
  const row = [leftColContent, imgEls];
  const cells = [headerRow, row];

  // Create table and replace element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
