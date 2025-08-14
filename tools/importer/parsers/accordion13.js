/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must match example
  const headerRow = ['Accordion (accordion13)'];

  // Each accordion item is a .divider direct child of the root element
  const rows = [];
  const dividerEls = element.querySelectorAll(':scope > .divider');
  dividerEls.forEach(divider => {
    // Expect a .grid-layout inside divider
    const grid = divider.querySelector('.grid-layout');
    if (!grid) return;
    // Expect two children: title (first), content (second)
    const titleEl = grid.children[0];
    const contentEl = grid.children[1];
    // Defensive: skip if either is missing
    if (!titleEl || !contentEl) return;
    // Reference the actual elements for semantic fidelity
    rows.push([titleEl, contentEl]);
  });

  // Compose table data: header first, then items
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
