/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as in the spec
  const headerRow = ['Cards (cards25)'];
  const rows = [];

  // Each direct child <div> of the grid is a card or an image-only cell
  const cardElements = element.querySelectorAll(':scope > div');
  cardElements.forEach(card => {
    // Always try to find the first image in the card
    const img = card.querySelector('img');
    // If there's no image, skip this card (the spec requires image as first cell)
    if (!img) return;

    // Try to find the text portion: look for a .utility-padding-all-2rem (contains h3 and p), else h3 or p children
    let textCell = null;
    const textContainer = card.querySelector('.utility-padding-all-2rem');
    if (textContainer) {
      textCell = textContainer;
    } else {
      // If not, try to find h3 or p directly
      const h3 = card.querySelector('h3');
      const p = card.querySelector('p');
      if (h3 || p) {
        textCell = document.createElement('div');
        if (h3) textCell.appendChild(h3);
        if (p) textCell.appendChild(p);
      }
    }
    // if no text at all, fill with empty div to maintain table layout
    if (!textCell) {
      textCell = document.createElement('div');
    }
    rows.push([img, textCell]);
  });

  // Only build the table if there is at least one card
  if (rows.length > 0) {
    const table = WebImporter.DOMUtils.createTable([
      headerRow,
      ...rows
    ], document);
    element.replaceWith(table);
  }
}
