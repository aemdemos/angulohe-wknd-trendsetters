/* global WebImporter */
export default function parse(element, { document }) {
  // Set up the header row as specified
  const headerRow = ['Accordion (accordion13)'];

  // We'll collect rows as [title, content] where both are existing elements
  const rows = [];

  // The structure is: element > (multiple) .divider elements, each with .grid-layout having two children
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));

  dividers.forEach(divider => {
    // Find the grid container inside each divider
    const grid = divider.querySelector('.grid-layout');
    if (!grid) return; // skip if not found
    // Collect immediate children of the grid
    const children = Array.from(grid.children);
    // Title: .h4-heading (usually the first)
    const title = children.find(n => n.classList.contains('h4-heading'));
    // Content: .w-richtext (usually the second)
    const content = children.find(n => n.classList.contains('w-richtext'));
    if (title && content) {
      rows.push([title, content]);
    }
    // If either element is missing, skip quietly (edge-case handling)
  });

  // Compose the input for createTable: header row + rows
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the block table
  element.replaceWith(block);
}
