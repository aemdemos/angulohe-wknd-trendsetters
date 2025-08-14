/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children (the columns)
  const columnDivs = Array.from(grid.children);

  // Ensure we have 3 columns (pad with empty string if needed)
  const numColumns = 3;
  const columns = [];
  for (let i = 0; i < numColumns; i++) {
    if (i < columnDivs.length) {
      columns.push(columnDivs[i]);
    } else {
      columns.push('');
    }
  }

  // Header row, exactly as per instructions
  const headerRow = ['Columns (columns3)', '', ''];

  // Build the block table
  const cells = [headerRow, columns];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}