/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child column divs
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (!columns.length) return;
  // Header row: first cell is block name, others are empty strings, total columns.length cells
  const headerRow = ['Columns (columns7)'];
  while (headerRow.length < columns.length) headerRow.push('');
  // Content row: one cell per column
  const contentRow = columns;
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
