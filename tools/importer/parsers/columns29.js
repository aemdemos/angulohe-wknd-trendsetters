/* global WebImporter */
export default function parse(element, { document }) {
  // According to requirements, the header row must have exactly one cell, regardless of column count
  const headerRow = ['Columns (columns29)'];

  // Get all direct column wrappers
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column div, collect all its direct children (usually a single aspect-ratio wrapper or content block)
  // If the content block contains multiple elements, include them all in an array
  const columns = columnDivs.map((colDiv) => {
    // If the column contains a single element, just use that; otherwise, pass an array
    const children = Array.from(colDiv.childNodes).filter(node => {
      // Ignore empty text nodes
      return !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim());
    });
    if (children.length === 1) {
      return children[0];
    }
    return children;
  });

  // Build the table
  const cells = [
    headerRow, // header row with a single column
    columns    // second row: one cell per content column
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
