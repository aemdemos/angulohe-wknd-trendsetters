/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container for the columns block
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (columns)
  const columns = Array.from(grid.children);

  // For each column, preserve all structure and text content
  const colCells = columns.map(col => {
    // For image columns, just reference the image element
    if (col.tagName.toLowerCase() === 'img') {
      return col;
    }
    // For non-image columns, wrap all contents in a div to preserve semantic meaning
    // Ensure that all text nodes are included (not just elements)
    const wrapper = document.createElement('div');
    // Move everything (children & text nodes) to the wrapper
    while (col.childNodes.length) {
      wrapper.appendChild(col.childNodes[0]);
    }
    return wrapper;
  });

  // Build the table
  const headerRow = ['Columns (columns15)'];
  const cells = [headerRow, colCells];
  
  // Create the block table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
