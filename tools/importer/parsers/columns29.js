/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must be a single cell, exactly as in the example
  const headerRow = ['Columns (columns29)'];

  // Extract all immediate child divs for columns
  const columnDivs = element.querySelectorAll(':scope > div');
  const columnCells = [];
  columnDivs.forEach((div) => {
    // If the div contains only an image, use the image element; else use the div
    const img = div.querySelector('img');
    if (img && div.children.length === 1) {
      columnCells.push(img);
    } else {
      columnCells.push(div);
    }
  });

  // Cells array: first row (header, single cell), second row (content, N columns)
  const cells = [
    headerRow,
    columnCells,
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
