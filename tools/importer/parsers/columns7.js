/* global WebImporter */
export default function parse(element, { document }) {
  // Collect the direct child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // For each column, extract the first image if available, else the entire column
  const columnCells = columns.map(col => {
    const img = col.querySelector('img');
    if (img) return img;
    return col;
  });
  // Table structure: header is a single cell, content row matches column count
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns7)'], // Single header cell
    columnCells // One row with N columns
  ], document);
  element.replaceWith(table);
}