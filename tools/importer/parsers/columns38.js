/* global WebImporter */
export default function parse(element, { document }) {
  // Header row, exactly as required
  const headerRow = ['Columns (columns38)'];

  // Get direct child divs, each represents a column
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Second row: each cell is the content of a column div
  // If the column div only contains a single meaningful child (e.g. an img), put the child; else the div
  const contentRow = columnDivs.map(div => {
    // Filter for visible child elements (ignore script/style etc.)
    const children = Array.from(div.children).filter(
      el => el.nodeType === 1 && el.tagName !== 'SCRIPT' && el.tagName !== 'STYLE'
    );
    if (children.length === 1) {
      return children[0];
    }
    // If no children, div might have text
    if (children.length === 0 && div.textContent.trim()) {
      const span = document.createElement('span');
      span.textContent = div.textContent.trim();
      return span;
    }
    // Otherwise, use the div itself
    return div;
  });

  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
