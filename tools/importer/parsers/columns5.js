/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row with block name and variant
  const headerRow = ['Columns (columns5)'];

  // 2. Find the primary grid containing the columns
  const grid = element.querySelector('.grid-layout.tablet-1-column');
  if (!grid) return;
  // Get all direct children of the grid (should be 2: left block, right image)
  const gridChildren = Array.from(grid.children);

  // Edge case: If fewer than 2 children, abort
  if (gridChildren.length < 2) return;

  // 3. LEFT CELL: Content block (with heading, paragraph, buttons)
  // The left block is the one containing the heading
  const leftGrid = gridChildren.find(child => child.querySelector('h2'));
  // The right block is the image
  const rightGrid = gridChildren.find(child => child.tagName === 'IMG');
  const leftCellContent = [];

  if (leftGrid) {
    // Heading
    const heading = leftGrid.querySelector('h2');
    if (heading) leftCellContent.push(heading);
    // Paragraph (may be wrapped in .rich-text)
    const paragraph = leftGrid.querySelector('.rich-text');
    if (paragraph) leftCellContent.push(paragraph);
    // Buttons
    const buttonGroup = leftGrid.querySelector('.button-group');
    if (buttonGroup) leftCellContent.push(buttonGroup);
  }

  // 4. RIGHT CELL: Image
  // Only add the image if it exists
  const rightCellContent = rightGrid ? rightGrid : '';

  // 5. Build the block table
  const cells = [
    headerRow,
    [leftCellContent, rightCellContent]
  ];

  // 6. Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
