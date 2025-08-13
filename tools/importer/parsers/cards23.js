/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get all cards in all tab panes
  const headerRow = ['Cards (cards23)'];
  const cells = [headerRow];

  // Each .w-tab-pane contains a .w-layout-grid of cards
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  tabPanes.forEach((pane) => {
    // For each pane, process any .w-layout-grid inside
    const grids = pane.querySelectorAll('.w-layout-grid');
    grids.forEach((grid) => {
      // Cards are <a> direct children of the grid
      const cards = grid.querySelectorAll(':scope > a');
      cards.forEach((card) => {
        // --- IMAGE: Find first <img> in card
        let imgElem = null;
        // Prefer image inside a 'utility-aspect-3x2' wrapper, but fallback to direct child
        const imgWrapper = card.querySelector('[class*="utility-aspect-3x2"]');
        if (imgWrapper) {
          imgElem = imgWrapper.querySelector('img');
        }
        if (!imgElem) {
          imgElem = card.querySelector('img');
        }
        // --- TEXT: Get heading and paragraph (in original order)
        // Use original heading and paragraph elements (reference, not clone)
        const textParts = [];
        const heading = card.querySelector('h3');
        if (heading) textParts.push(heading);
        // Some paragraphs use .paragraph-sm, and may also have utility-margin-bottom-0
        const paragraphs = card.querySelectorAll('.paragraph-sm');
        paragraphs.forEach(paragraph => {
          textParts.push(paragraph);
        });
        // If there is any other text directly inside the card, include it as well (some cards may lack heading)
        // Compose cell content
        const textCell = textParts.length > 1
          ? textParts
          : (textParts.length === 1 ? textParts[0] : '');
        // Add row: image, text
        cells.push([
          imgElem ? imgElem : '',
          textCell
        ]);
      });
    });
  });
  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
