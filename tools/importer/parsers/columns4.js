/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs representing columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // To ensure the table header structure matches the example (single cell spanning all columns),
  // we create one header cell and set its colspan after table creation.
  const headerRow = ['Columns (columns4)'];
  const contentRow = columns.map(div => div);
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Fix the header row to span all columns
  const th = table.querySelector('tr:first-child > th');
  if (th && contentRow.length > 1) {
    th.setAttribute('colspan', contentRow.length);
  }

  element.replaceWith(table);
}
