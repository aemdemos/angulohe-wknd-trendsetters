/* global WebImporter */
export default function parse(element, { document }) {
  // Get the immediate child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: remove if no columns
  if (columns.length === 0) {
    element.remove();
    return;
  }

  // Header row: single cell, should span all columns (array of one cell)
  const headerRow = ['Columns (columns29)'];

  // Content row: each column's content as a separate cell
  const contentRow = columns;

  // Compose table data: header is single cell, content row has N cells
  const cells = [
    headerRow,
    contentRow
  ];

  // Create the table (header will be a single <th>, content N <td>)
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // The WebImporter consumer is responsible for styling the header to span all columns if required.
  // Replace the original element with the new block
  element.replaceWith(table);
}
