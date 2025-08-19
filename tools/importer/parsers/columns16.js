/* global WebImporter */
export default function parse(element, { document }) {
  // Header row, exactly matching the example
  const headerRow = ['Columns (columns16)'];

  // Find the grid containing all columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // For each column, collect all relevant immediate content to be robust for various layouts
  const columnDivs = Array.from(grid.children);
  const columnsContent = columnDivs.map(col => {
    // For each column, collect all direct children (usually aspect wrappers)
    // For each direct child, if it's a wrapper, unwrap its children
    let cellContent = [];
    Array.from(col.children).forEach(child => {
      // If child contains content, get ALL its child nodes (images, text, links, lists)
      if (child.children.length > 0) {
        cellContent.push(...Array.from(child.children));
      } else {
        cellContent.push(child);
      }
    });
    // Fallback: If nothing was found, just use the column itself
    if (cellContent.length === 0) cellContent.push(col);
    return cellContent;
  });

  const tableArray = [headerRow, columnsContent];

  const block = WebImporter.DOMUtils.createTable(tableArray, document);
  element.replaceWith(block);
}
