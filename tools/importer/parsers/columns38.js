/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: exactly one column with the block name
  const headerRow = ['Columns (columns38)'];
  // Second row: one cell per direct child div (column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Only process if there are columns
  if (columns.length === 0) return;
  const contentRow = columns;
  // Build the table with a single-cell header row, and a content row with N columns
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
