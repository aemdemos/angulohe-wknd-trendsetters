/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row as specified
  const headerRow = ['Cards (cards37)'];

  // Helper to flatten all card elements regardless of grid nesting
  function getCardNodes(grid) {
    const cards = [];
    Array.from(grid.children).forEach(child => {
      if (child.classList && child.classList.contains('utility-link-content-block')) {
        cards.push(child);
      } else if (child.classList && child.classList.contains('w-layout-grid')) {
        // Nested grid, recurse
        cards.push(...getCardNodes(child));
      }
    });
    return cards;
  }

  // Find the main grid containing all cards
  let cardNodes = [];
  const container = element.querySelector('.container');
  if (container) {
    const mainGrid = container.querySelector('.w-layout-grid');
    if (mainGrid) {
      cardNodes = getCardNodes(mainGrid);
    }
  }

  // Fallback if not found
  if (cardNodes.length === 0) {
    cardNodes = Array.from(element.querySelectorAll('.utility-link-content-block'));
  }

  // Compose table rows
  const rows = cardNodes.map(card => {
    // Get image (mandatory)
    const img = card.querySelector('img.cover-image');
    // Get heading (h3 or h4)
    const heading = card.querySelector('h3, h4');
    // Get description
    const desc = card.querySelector('p');
    // Get CTA button (optional)
    const cta = card.querySelector('.button');
    // Compose right cell content, preserving order
    const cellContent = [];
    if (heading) cellContent.push(heading);
    if (desc) cellContent.push(desc);
    if (cta) cellContent.push(cta);
    return [img, cellContent];
  });

  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
