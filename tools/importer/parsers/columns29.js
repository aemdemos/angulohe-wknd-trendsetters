/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct children representing columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  const numColumns = columns.length;

  // Header row: first cell with header, rest empty to match the number of columns
  const headerRow = ['Columns (columns29)', ...Array(numColumns - 1).fill('')];

  // For each column, extract the main content (usually the <img> inside an aspect ratio div)
  const contentRow = columns.map(col => {
    if (col.children.length === 1 && col.firstElementChild.tagName === 'DIV') {
      const innerDiv = col.firstElementChild;
      const img = innerDiv.querySelector('img');
      if (img) return img;
      return innerDiv;
    }
    return col;
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
