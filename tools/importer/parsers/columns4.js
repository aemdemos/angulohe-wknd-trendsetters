/* global WebImporter */
export default function parse(element, { document }) {
  // Build header row: single cell (array with one item)
  const headerRow = ['Columns (columns4)'];

  // Get all immediate column children
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Build content row: one cell per column div
  const contentRow = columns;

  // Compose the table structure: header is a single-cell array, content row is n-cells
  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
