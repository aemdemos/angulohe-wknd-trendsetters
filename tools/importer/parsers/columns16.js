/* global WebImporter */
export default function parse(element, { document }) {
  // Table Header
  const headerRow = ['Columns (columns16)'];

  // Find the grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Each grid child is a column: extract all direct children of grid
  const columns = Array.from(grid.children);

  // For each column, get ALL its visible content (not just images)
  const columnCells = columns.map(col => {
    // Get all direct children of the column's innermost wrapper
    // If the column contains only one wrapper, use it
    let innermost = col;
    // Traverse down if the column has only one child, and that child is a div
    while (
      innermost.children.length === 1 && 
      innermost.firstElementChild && 
      innermost.firstElementChild.tagName === 'DIV'
    ) {
      innermost = innermost.firstElementChild;
    }
    // Collect all children of innermost as content for that column
    const cellContent = Array.from(innermost.childNodes).filter(node => {
      // Ignore empty text nodes
      if (node.nodeType === Node.TEXT_NODE) return node.textContent.trim().length > 0;
      // Accept all element nodes
      if (node.nodeType === Node.ELEMENT_NODE) return true;
      return false;
    });
    // If no content, insert empty text node
    return cellContent.length ? cellContent : document.createTextNode('');
  });

  // Build table
  const cells = [
    headerRow,
    columnCells
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
