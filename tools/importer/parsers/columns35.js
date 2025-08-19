/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Columns (columns35)'];

  // Find the grid layout (assume rows may be present for generality)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // In a grid, there may be direct columns, or there may be row wrappers with columns inside
  // We'll try to cover both cases for future-proofing
  let rows = [];

  // If all immediate children are columns (most common), make a single row
  const directColumns = Array.from(grid.children);
  // Check if children are likely columns (not row wrappers)
  const likelyAllColumns = directColumns.every(child => {
    // Heuristic: look for things that are not wrappers (i.e., not all children are just <div>s containing other divs)
    return !child.matches('.row, .row-wrapper, .columns-row');
  });

  if (likelyAllColumns) {
    // Only one row, all columns side by side
    rows.push(directColumns.map(col => col));
  } else {
    // There are row wrappers, each containing columns
    directColumns.forEach(rowWrapper => {
      // For each row, get all direct children that are columns
      const columns = Array.from(rowWrapper.children).filter(el => el.nodeType === 1);
      rows.push(columns);
    });
  }

  // Compose the full cells array: header row, then each content row
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original section with the block table
  element.replaceWith(block);
}
