/* global WebImporter */
export default function parse(element, { document }) {
  // Header must be a single cell (the block name and variant)
  const header = ['Columns (columns4)'];

  // Get all direct child divs (columns)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Each column cell should contain the entire content of the column, not just an image
  // To ensure robustness, move all children (not just images) into a container per column
  const columnCells = columnDivs.map((col) => {
    // If the column has more than one child, wrap them in a fragment
    const content = Array.from(col.childNodes);
    if (content.length === 1) {
      return content[0];
    } else {
      // Use a div as container for multiple elements
      const container = document.createElement('div');
      content.forEach(node => container.appendChild(node));
      return container;
    }
  });

  // Build the table structure: header (1 col), then one row (N cols)
  const cells = [
    header,
    columnCells
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
