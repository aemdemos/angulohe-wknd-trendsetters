/* global WebImporter */
export default function parse(element, { document }) {
  // Correct header: single column, exactly as specified
  const headerRow = ['Columns (columns38)'];

  // Extract columns (each child div is a column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Edge case: If columns are empty, do nothing
  if (columns.length === 0) return;

  // Single row with multiple columns, matching the example
  const contentRow = columns;

  // Cells array: header is single column, then content row with one cell per column
  const cells = [headerRow, contentRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Fix the header row: merge header cell across all columns
  if (columns.length > 1) {
    const tr = block.querySelector('tr');
    const th = tr.querySelector('th');
    th.setAttribute('colspan', columns.length);
    // Remove any extra header cells if present
    while (th.nextSibling) {
      tr.removeChild(th.nextSibling);
    }
  }
  // Replace with the new block
  element.replaceWith(block);
}
