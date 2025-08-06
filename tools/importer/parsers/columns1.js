/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const columns = Array.from(grid.children);
  // Defensive: Expecting at least two columns (image, text/button column)
  if (columns.length < 2) return;

  // The first column is the image
  const firstCol = columns[0];
  // The second column is the heading, subheading, and button group
  const secondCol = columns[1];

  // Compose the header and data rows
  const headerRow = ['Columns (columns1)'];
  const columnsRow = [firstCol, secondCol];

  // Build the block table
  const table = WebImporter.DOMUtils.createTable([headerRow, columnsRow], document);
  // Replace the original element with the block table
  element.replaceWith(table);
}
