/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: matches exactly as in the example
  const headerRow = ['Columns (columns15)'];

  // Find container with grid
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // LEFT COLUMN: Reference all content nodes in left column
  const leftCol = gridChildren[0];
  let leftContent = [];
  // Retain all child nodes that are not empty text
  leftContent = Array.from(leftCol.childNodes).filter(n => {
    if (n.nodeType === Node.TEXT_NODE) {
      return n.textContent.trim().length > 0;
    }
    return true;
  });
  // If no content, use the leftCol itself
  if (!leftContent.length) leftContent = [leftCol];

  // RIGHT COLUMN: Reference all content nodes in right column
  const rightCol = gridChildren[1];
  let rightContent = [];
  // Prefer to reference any images or substantial content
  rightContent = Array.from(rightCol.childNodes).filter(n => {
    if (n.nodeType === Node.TEXT_NODE) {
      return n.textContent.trim().length > 0;
    }
    return true;
  });
  // If no content, use the rightCol itself
  if (!rightContent.length) rightContent = [rightCol];

  // Compose the table structure
  const rows = [
    headerRow,
    [leftContent, rightContent]
  ];
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
