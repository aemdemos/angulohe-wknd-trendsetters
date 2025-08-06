/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs representing columns
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));
  // For each column, include its main content (usually an img)
  const contentRow = columnDivs.map(div => {
    const img = div.querySelector('img');
    if (div.childElementCount === 1 && img) {
      return img;
    }
    return div;
  });
  // Make sure header row is a single cell as per the example
  const rows = [
    ['Columns (columns38)'],
    contentRow
  ];
  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
