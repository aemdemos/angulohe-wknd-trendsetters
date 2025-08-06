/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the images
  const grid = element.querySelector('.utility-width-125 .grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (the image columns)
  const columns = Array.from(grid.children);

  // For each column, get the contained image (there may be wrappers)
  const images = columns.map(col => {
    // find the first img in the column, or ''
    const img = col.querySelector('img');
    return img || '';
  });

  // Build table: 
  //   1. Header row with single cell
  //   2. Row with N columns (each image in its own column)
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns16)'], // header row with ONE cell only
    images // second row - one cell per image (column)
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
