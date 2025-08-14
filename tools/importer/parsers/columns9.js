/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid with columns (multiple columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Each direct child of grid is one column (logo/social, Trends, Inspire, Explore)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // The block header must match exactly
  const headerRow = ['Columns (columns9)'];

  // Build the row referencing each existing column wrapper (div/ul)
  // This preserves all HTML and semantic structure
  const contentRow = columns.map((col) => col);

  // Create the block table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element, preserving order
  element.replaceWith(block);
}
