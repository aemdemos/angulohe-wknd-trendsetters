/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout for the columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid layout (should be at least 2)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Prepare left and right column cells
  // Reference actual elements from DOM, not clones
  const leftCol = gridChildren[0];
  const rightCol = gridChildren[1];

  // Left cell: get all childNodes, including text and elements, preserving order
  const leftCellContent = [];
  leftCol.childNodes.forEach(node => {
    // Only include non-empty text nodes or elements
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent.trim()) {
        leftCellContent.push(document.createTextNode(node.textContent));
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      leftCellContent.push(node);
    }
  });

  // Right cell: for image or content
  let rightCellContent = [];
  if (rightCol.tagName && rightCol.tagName.toLowerCase() === 'img') {
    rightCellContent = [rightCol];
  } else {
    // Like left, take all childNodes
    rightCol.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.trim()) {
          rightCellContent.push(document.createTextNode(node.textContent));
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        rightCellContent.push(node);
      }
    });
  }

  // Build table rows: header, then row of columns
  const rows = [];
  rows.push(['Columns (columns15)']); // Header row, exactly
  rows.push([leftCellContent, rightCellContent]);

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Set header colspan for correct rendering
  const th = table.querySelector('th');
  if (th && rows[1].length > 1) {
    th.setAttribute('colspan', rows[1].length);
  }

  // Replace original element with the table
  element.replaceWith(table);
}
