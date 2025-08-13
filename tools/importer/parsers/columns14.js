/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container (this holds the columns)
  const grid = element.querySelector('.w-layout-grid, .grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (each is a column)
  const columns = Array.from(grid.children).filter(child => child.nodeType === Node.ELEMENT_NODE);
  if (columns.length === 0) return;

  // Helper for extracting content for each column
  function extractColumnContent(col) {
    // Gather all immediate children of the column
    const contentEls = Array.from(col.children).filter(child => child.nodeType === Node.ELEMENT_NODE);
    if (contentEls.length === 0) return col; // If nothing, use the column as-is

    // Special handling for elements with 'src' attribute that are not images
    return contentEls.map(el => {
      if (el.hasAttribute('src') && el.tagName.toLowerCase() !== 'img') {
        // Convert to link
        const a = document.createElement('a');
        a.href = el.getAttribute('src');
        a.textContent = el.getAttribute('src');
        return a;
      }
      return el;
    });
  }

  // Build rows for the table. The first row is the header, the second is the content (one cell per column)
  const headerRow = ['Columns (columns14)'];
  const contentRow = columns.map(extractColumnContent);

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
