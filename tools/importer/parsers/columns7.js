/* global WebImporter */
export default function parse(element, { document }) {
  // Create header row: one column with the block name exactly as in the example
  const headerRow = ['Columns (columns7)'];
  // For columns, extract each immediate child div
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Defensive: If no columns, do nothing
  if (!columns.length) return;
  // Second row: each cell is the full content of the column (image in this case)
  const contentRow = columns.map(col => {
    // If column has just one child, use it; else, use all childNodes
    const childElements = Array.from(col.childNodes).filter(n => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim()));
    // If only one element, return it; else, return array
    if (childElements.length === 1) {
      return childElements[0];
    }
    return childElements;
  });
  // Table structure: header is a single cell, content row is one cell per column
  const cells = [headerRow, contentRow];
  // Create the table block
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(blockTable);
}
