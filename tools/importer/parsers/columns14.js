/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table
  const headerRow = ['Columns (columns14)'];

  // Find the grid container with columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) {
    // If no grid found, do nothing
    return;
  }

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.querySelectorAll(':scope > *'));
  if (!columns.length) {
    // No columns found, do nothing
    return;
  }

  // For this HTML, the columns are:
  // columns[0]: h2 (title)
  // columns[1]: div with paragraph and button
  // We want to preserve the semantic structure and not lose any content
  // Prepare a cell for each column.
  
  // If there are more than two columns in other variations, generalize:
  const rowCells = columns.map(col => col);

  // Build the table rows
  const tableRows = [
    headerRow,
    rowCells
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
