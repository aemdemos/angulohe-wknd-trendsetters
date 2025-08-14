/* global WebImporter */
export default function parse(element, { document }) {
  // The block name header, exactly as in the example
  const headerRow = ['Columns (columns38)'];

  // Get all top-level columns (direct children of the grid)
  const columnDivs = element.querySelectorAll(':scope > div');

  // For each column, include ALL content (text, images, buttons, lists, etc.)
  const columnsRow = Array.from(columnDivs).map((col) => {
    // If the column has multiple children, include all as an array (preserving node order)
    // If only one child, just include it
    // If there is raw text (not wrapped in a child element), include it too
    const cellContent = [];
    // Add any text node (not empty or whitespace only)
    Array.from(col.childNodes).forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        cellContent.push(node);
      } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        // Wrap text node in a span to keep it in the cell
        const span = document.createElement('span');
        span.textContent = node.textContent;
        cellContent.push(span);
      }
    });
    // If only one item, return it directly; else return array
    return cellContent.length === 1 ? cellContent[0] : cellContent;
  });

  // Compose the table: one header row, one content row
  const cells = [headerRow, columnsRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
