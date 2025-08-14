/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid that contains the two columns
  const grid = element.querySelector('.grid-layout.grid-gap-xxl');
  if (!grid) return;

  // The content column is a div with heading, paragraph, and buttons
  // The image column is an img element
  let contentCol = null;
  let imageCol = null;

  // Get all direct children of the grid
  const children = Array.from(grid.children);
  for (const child of children) {
    if (child.tagName === 'IMG') {
      imageCol = child;
    } else if (!contentCol && (child.tagName === 'DIV' || child.classList.contains('section'))) {
      contentCol = child;
    }
  }
  if (!contentCol || !imageCol) return;

  // Create header row as a single cell (will span columns visually)
  const headerRow = ['Columns (columns5)'];
  const contentRow = [contentCol, imageCol];
  const cells = [headerRow, contentRow];

  // Create table and set colspan on the header cell
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Set colspan on the header cell
  const headerCell = table.querySelector('th');
  if (headerCell && contentRow.length > 1) {
    headerCell.setAttribute('colspan', contentRow.length);
  }
  element.replaceWith(table);
}
