/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get direct children of the grid as columns
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Create header row: exactly one cell, with header text
  const headerRow = ['Columns (columns35)'];

  // For each "column", collect all its direct children as a group (to preserve grouping)
  const contentRow = columns.map(col => {
    // If only one child, use it as is; if multiple, group into a fragment
    const colChildren = Array.from(col.childNodes).filter(node => {
      // Skip empty text nodes
      return !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim());
    });
    if (colChildren.length === 1) {
      return colChildren[0];
    } else {
      // Group multiple children into a div (preserves structure)
      const wrapper = document.createElement('div');
      colChildren.forEach(child => wrapper.appendChild(child));
      return wrapper;
    }
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
