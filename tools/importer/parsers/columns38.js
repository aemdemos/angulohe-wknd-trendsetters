/* global WebImporter */
export default function parse(element, { document }) {
  // Correct table structure: header is a single column, followed by a row with n columns
  const headerRow = ['Columns (columns38)'];
  // Get all immediate child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // The content row: each cell contains a column element
  const contentRow = columns;
  // Compose the cells array so that headerRow is a single cell, contentRow is n cells
  const cells = [
    headerRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
