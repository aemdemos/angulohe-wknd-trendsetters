/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row exactly as required
  const headerRow = ['Accordion (accordion13)'];
  const rows = [];

  // Select all direct children with class 'divider' (each Accordion item)
  const items = Array.from(element.querySelectorAll(':scope > .divider'));
  items.forEach(divider => {
    // Each divider contains one .grid-layout with two children: title and content
    const grid = divider.querySelector('.grid-layout');
    if (!grid) return; // skip if missing
    // The title is .h4-heading (mandatory)
    const title = grid.querySelector('.h4-heading');
    // The content is .rich-text (mandatory), fallback to .paragraph-lg if needed
    let content = grid.querySelector('.rich-text');
    if (!content) {
      content = grid.querySelector('.paragraph-lg');
    }
    // Only push rows with BOTH title and content
    if (title && content) rows.push([title, content]);
  });
  // Compose the block table
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}