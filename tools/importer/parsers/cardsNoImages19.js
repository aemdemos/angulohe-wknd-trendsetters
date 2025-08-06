/* global WebImporter */
export default function parse(element, { document }) {
  // Header row with correct block name
  const headerRow = ['Cards'];

  // Each direct child div of the grid is a card
  const cardDivs = element.querySelectorAll(':scope > div');

  const rows = [headerRow];

  cardDivs.forEach((cardDiv) => {
    // Only add the meaningful card content, which is the text paragraph inside (not SVG icon)
    // Look for the first <p> inside the card div
    const p = cardDiv.querySelector('p');
    // If a p is found, use it; otherwise, use the cardDiv as fallback
    if (p) {
      rows.push([p]);
    } else {
      rows.push([cardDiv]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
