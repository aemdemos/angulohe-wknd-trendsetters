/* global WebImporter */
export default function parse(element, { document }) {
  // The block header row must be a single column
  const headerRow = ['Columns (columns5)'];

  // Find the main grid containing the columns (should have 2 children: text block, image)
  const grid = element.querySelector('.grid-layout.grid-gap-xxl');
  if (!grid) return;
  const children = Array.from(grid.children);

  // Find left and right columns
  let left = null, right = null;
  for (const child of children) {
    if (!left && child.querySelector && child.querySelector('h2')) {
      left = child;
    } else if (!right && child.tagName === 'IMG') {
      right = child;
    }
  }
  // Defensive fallback
  if (!left && children.length) left = children[0];
  if (!right && children.length > 1) right = children[1];

  // Build the content row with as many columns as needed (2 here)
  const contentRow = [left, right].map(cell => cell ? cell : '');

  // The table: the first row is the header as a single column, the second row is the content row with two columns
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace original element
  element.replaceWith(table);
}
