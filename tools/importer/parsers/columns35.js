/* global WebImporter */
export default function parse(element, { document }) {
  // The block name for the header row
  const headerRow = ['Columns (columns35)'];

  // Find the grid which contains the columns (usually direct children)
  const grid = element.querySelector('.grid-layout');
  let columnElements = [];

  if (grid) {
    // Get the immediate children of the grid, which are the columns
    columnElements = Array.from(grid.children);
  } else {
    // Fallback: if grid not found, treat container children as columns
    const container = element.querySelector('.container');
    if (container) {
      columnElements = Array.from(container.children);
    } else {
      // If nothing else, treat the element itself as one column
      columnElements = [element];
    }
  }

  // For each column element, gather all its children as a fragment, or just use the element itself
  const rowCells = columnElements.map((colEl) => {
    // If the element is a link, button, or has only one child, just reference it directly
    if (colEl.children.length === 0 || colEl.tagName === 'A' || colEl.tagName === 'BUTTON') {
      return colEl;
    } else {
      // Otherwise, combine all children (preserving structure)
      const frag = document.createDocumentFragment();
      Array.from(colEl.childNodes).forEach((child) => {
        frag.appendChild(child);
      });
      return frag;
    }
  });

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    rowCells
  ], document);

  // Replace the original block with the new table
  element.replaceWith(table);
}
