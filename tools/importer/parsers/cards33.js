/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards33)'];
  // Select all direct <a> children (each card)
  const cardNodes = Array.from(element.querySelectorAll(':scope > a'));
  // Each card becomes one row with 2 cells: [image, text content]
  const rows = cardNodes.map(card => {
    // Find image (first img in the card)
    const img = card.querySelector('img');
    // Find the grid inside the card (should contain text content)
    const grid = card.querySelector('.w-layout-grid');
    // Grab the text content div (the div after img)
    let textContainer = null;
    if (grid) {
      const children = Array.from(grid.children);
      textContainer = children.find(el => el !== img && el.tagName === 'DIV');
    }
    // Fallback if not found
    if (!textContainer) textContainer = card;
    return [img, textContainer];
  });
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
