/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout with columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  // We expect at least 2 columns based on provided HTML
  if (columns.length < 2) return;

  // Reference the left content column and right image column directly
  const leftCol = columns[0];
  const rightCol = columns[1];

  // Table header as specified
  const header = ['Columns (columns27)'];
  // The content row contains two columns (cells): left and right
  const row = [leftCol, rightCol];
  const cells = [header, row];

  // Create the table and replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
