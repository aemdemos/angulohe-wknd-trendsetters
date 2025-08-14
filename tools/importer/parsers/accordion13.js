/* global WebImporter */
export default function parse(element, { document }) {
  // Header row, matching exactly the example
  const headerRow = ['Accordion (accordion13)'];
  const cells = [headerRow];

  // Extract all direct .divider children representing items
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));
  dividers.forEach(divider => {
    // Each divider contains a grid with two children: heading and content
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return; // Skip if grid missing
    // Find heading and text content
    let heading = null;
    let body = null;
    for (const child of grid.children) {
      if (child.classList.contains('h4-heading')) {
        heading = child;
      } else if (
        child.classList.contains('rich-text') ||
        child.classList.contains('w-richtext') ||
        child.classList.contains('paragraph-lg')
      ) {
        body = child;
      }
    }
    // Only add row if both heading and body found
    if (heading && body) {
      cells.push([heading, body]);
    }
  });

  // Create and replace element with table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}
