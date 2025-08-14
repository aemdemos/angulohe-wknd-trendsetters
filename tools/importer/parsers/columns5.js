/* global WebImporter */
export default function parse(element, { document }) {
  // Block header: matches example
  const headerRow = ['Columns (columns5)'];

  // Get immediate children of the outer grid
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Prepare left and right cell content
  let leftCell = null;
  let rightCell = null;

  // The left side is a grid (container) holding a section with heading, paragraph, and buttons
  // The right side is an image
  const children = Array.from(grid.children);
  const container = children.find(child => child.classList.contains('container'));
  const img = children.find(child => child.tagName === 'IMG');

  // Compose left cell: use the main section block with heading, description, buttons
  if (container) {
    // The container contains a section that holds the actual content
    const section = container.querySelector(':scope > .section');
    if (section) {
      leftCell = section;
    } else {
      // fallback: use all contents of container
      leftCell = container;
    }
  }

  // Compose right cell: reference the image element directly
  if (img) {
    rightCell = img;
  }

  // If nothing found, don't replace
  if (!leftCell && !rightCell) return;

  // Cells in order: [left content, right image]
  const cells = [
    headerRow,
    [leftCell, rightCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
