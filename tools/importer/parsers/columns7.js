/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single cell, matches example
  const headerRow = ['Columns (columns7)'];

  // Get immediate child divs, each is a column
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, grab ALL content inside that div
  // (not just images, but any child text, lists, buttons, etc. in future HTML)
  const columns = columnDivs.map((colDiv) => {
    // If the column div has only one child, use it directly to avoid unnecessary wrappers
    if (colDiv.children.length === 1) {
      return colDiv.firstElementChild;
    }
    // Otherwise, return the whole div (contains multiple elements)
    return colDiv;
  });

  const cells = [
    headerRow,
    columns
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
