/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid that contains our columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (columns in original layout)
  const columns = Array.from(grid.children);

  // Header row as specified
  const headerRow = ['Columns (columns3)'];

  // For each column, collect all children and reference existing elements
  const contentRow = columns.map(col => {
    // If there's only one child, use it, else wrap the children in a div
    if (col.children.length === 1) {
      return col.firstElementChild;
    } else {
      const wrapper = document.createElement('div');
      // Move all children into wrapper
      while (col.firstChild) {
        wrapper.appendChild(col.firstChild);
      }
      return wrapper;
    }
  });

  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
