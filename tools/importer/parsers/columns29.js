/* global WebImporter */
export default function parse(element, { document }) {
  // Get all the immediate column divs (each column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Build the header row with one cell (matches example exactly)
  const headerRow = ['Columns (columns29)'];

  // Build the content row: one cell for each column
  const contentRow = columns.map((colDiv) => colDiv);

  // Create the table with the properly structured header row
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // After table is created, set colspan on the header cell so it matches the number of columns
  const tr = table.querySelector('tr'); // first row
  if (tr && tr.children.length === 1 && contentRow.length > 1) {
    tr.children[0].setAttribute('colspan', String(contentRow.length));
  }

  // Replace the original element with the new table
  element.replaceWith(table);
}
