/* global WebImporter */
export default function parse(element, { document }) {
  // Header row per the markdown example
  const headerRow = ['Columns (columns4)'];

  // Get all top-level columns (divs) in the grid
  const columnDivs = element.querySelectorAll(':scope > div');

  // For each column, extract ALL direct children as the cell contents (mixed content)
  // This allows for images, text, lists, links, etc. to be included if present
  const columns = Array.from(columnDivs).map(col => {
    // If the column has more than one child, return them as an array
    // Otherwise: if only one child, just return it
    // If there are text nodes, include their textContent as a string
    const nodes = [];
    col.childNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        nodes.push(node);
      } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        // preserve non-empty text nodes (trimmed)
        const span = document.createElement('span');
        span.textContent = node.textContent.trim();
        nodes.push(span);
      }
    });
    if (nodes.length === 1) {
      return nodes[0];
    } else if (nodes.length > 1) {
      return nodes;
    } else {
      return '';
    }
  });

  // Compose final table structure
  const cells = [
    headerRow,
    columns
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
