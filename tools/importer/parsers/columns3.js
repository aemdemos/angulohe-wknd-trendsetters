/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout inside the section
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate grid children (columns)
  const cols = Array.from(grid.children);

  // Edge case: If not at least two columns, fallback to whole content
  if (cols.length < 2) {
    const cells = [
      ['Columns (columns3)'],
      [element]
    ];
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
    return;
  }

  // Reference the existing column elements directly for resilience
  const col1 = cols[0]; // Left column (heading + description)
  const col2 = cols[1]; // Right column (buttons)

  // Create the block table matching the required structure
  const cells = [
    ['Columns (columns3)'],
    [col1, col2]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
