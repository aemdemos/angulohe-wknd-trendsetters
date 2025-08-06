/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .grid-layout container inside the section
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the direct children of the grid (they represent the columns)
  const gridChildren = Array.from(grid.children);

  // For this layout, the columns appear to be:
  //   [0]: left text content
  //   [1]: contact list (ul)
  //   [2]: image

  // Defensive: ensure we don't break if some columns are missing
  const leftContent = [];
  if (gridChildren[0]) leftContent.push(gridChildren[0]);
  if (gridChildren[1]) leftContent.push(gridChildren[1]);
  const rightContent = gridChildren[2] || '';

  // Table header as required
  const cells = [
    ['Columns (columns18)'],
    [leftContent, rightContent]
  ];

  // Create the table block and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
