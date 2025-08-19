/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container which holds the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return; // Defensive: grid missing

  // Get immediate children of the grid -- these are the columns/content cells
  const columns = Array.from(grid.children);

  // Build the content cells: if it's a heading, keep as is; otherwise, include all meaningful content
  const contentCells = columns.map((col) => {
    // If col has only text/heading, use it directly
    if (col.tagName.toLowerCase() === 'h2') {
      return col;
    }
    // Otherwise, use all children and non-empty text nodes
    const parts = Array.from(col.childNodes)
      .filter(node => node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim()));
    return parts.length === 1 ? parts[0] : parts;
  });

  // Header row: one cell (will visually span columns)
  const headerRow = ['Columns (columns14)'];

  // Block table definition: header row (single cell), content row (multiple columns)
  const cells = [
    headerRow,
    contentCells
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
