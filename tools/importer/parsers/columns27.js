/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout inside the section
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Find its immediate children for the columns
  const children = Array.from(grid.children);
  // There should be one content column (div) and one image column (img)
  // First column: the div (content)
  const contentCol = children.find(el => el.tagName === 'DIV');
  // Second column: the image
  const imageCol = children.find(el => el.tagName === 'IMG');

  // Defensive: if one missing, fallback to empty
  const contentCell = contentCol ? Array.from(contentCol.childNodes) : '';
  const imageCell = imageCol || '';

  // Prepare table rows
  const headerRow = ['Columns (columns27)'];
  const row = [contentCell, imageCell];
  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row
  ], document);

  // Replace the original section with the new block table
  element.replaceWith(table);
}
