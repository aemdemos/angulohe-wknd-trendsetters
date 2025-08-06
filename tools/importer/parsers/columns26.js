/* global WebImporter */
export default function parse(element, { document }) {
  // Find the outer container and grid
  const container = element.querySelector('.container');
  if (!container) return;
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;
  const mainChildren = Array.from(mainGrid.children);

  // Compose left cell: heading + subgrid (divider, avatar, etc)
  const leftCell = document.createElement('div');
  if (mainChildren[0]) leftCell.appendChild(mainChildren[0]);
  if (mainChildren[2]) leftCell.appendChild(mainChildren[2]);

  // Right cell: quote paragraph
  const rightCell = mainChildren[1] || document.createElement('div');

  // One-cell header row (must span both columns as per requirements)
  const cells = [
    ['Columns (columns26)'],
    [leftCell, rightCell]
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Make header th span all columns
  const th = table.querySelector('th');
  if (th) th.setAttribute('colspan', '2');

  element.replaceWith(table);
}
