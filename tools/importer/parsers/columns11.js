/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Gets left and right cell content
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  let leftCell = '';
  let rightCell = '';

  if (mainGrid) {
    const mainGridChildren = Array.from(mainGrid.children);
    const leftCol = mainGridChildren[0];
    const rightCol = mainGridChildren[1];
    // Compose left cell: all children from leftCol and rightCol (as in layout)
    const frag = document.createDocumentFragment();
    if (leftCol) Array.from(leftCol.childNodes).forEach(c => frag.appendChild(c));
    if (rightCol) Array.from(rightCol.childNodes).forEach(c => frag.appendChild(c));
    leftCell = frag;
  }

  // Right cell: the two images from the lower grid
  const lowerGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  if (lowerGrid) {
    const imgs = Array.from(lowerGrid.querySelectorAll('img'));
    if (imgs.length > 0) {
      const frag = document.createDocumentFragment();
      imgs.forEach(img => frag.appendChild(img));
      rightCell = frag;
    }
  }

  // Build the table with a header row spanning both columns
  const headerRow = [document.createTextNode('Columns (columns11)'), '']; // 2 cells as in example
  const cells = [
    headerRow,
    [leftCell, rightCell],
  ];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Set colspan=2 on the first row's first cell, remove the second cell
  const th = table.querySelector('tr:first-child th');
  if (th) {
    th.setAttribute('colspan', '2');
    if (th.nextSibling) th.parentElement.removeChild(th.nextSibling);
  }

  element.replaceWith(table);
}
