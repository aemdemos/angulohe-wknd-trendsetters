/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must match exactly, one column only
  const headerRow = ['Columns (columns15)'];

  // Find the grid layout for columns inside the container
  const container = element.querySelector('.container');
  let columnsRow = [];

  if (container) {
    const grid = container.querySelector('.w-layout-grid');
    if (grid) {
      // Get all direct children of the grid (each column)
      const gridChildren = Array.from(grid.children);
      gridChildren.forEach((col) => {
        // If column is an image, include it directly
        if (col.tagName === 'IMG') {
          columnsRow.push(col);
        } else {
          // For non-image columns, aggregate all visible content
          // This ensures ALL text, headings, paragraphs, and buttons are included
          const colContent = [];
          Array.from(col.childNodes).forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Only include visible elements
              colContent.push(node);
            } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
              // Wrap non-empty text nodes in a span to preserve text
              const span = document.createElement('span');
              span.textContent = node.textContent;
              colContent.push(span);
            }
          });
          // If the column has meaningful content, use that; otherwise, reference the column directly
          columnsRow.push(colContent.length ? colContent : col);
        }
      });
    }
  }

  // Only create the table if there is column content
  if (columnsRow.length) {
    const cells = [headerRow, columnsRow];
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(blockTable);
  }
}
