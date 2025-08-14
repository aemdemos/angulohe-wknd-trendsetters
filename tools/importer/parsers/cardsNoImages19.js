/* global WebImporter */
export default function parse(element, { document }) {
  // Header row per spec
  const headerRow = ['Cards'];
  // Each immediate child div is a card
  const cardDivs = element.querySelectorAll(':scope > div');
  const rows = [headerRow];
  cardDivs.forEach(cardDiv => {
    // Each card has a <p> as the main card content (no heading in this HTML, just a paragraph)
    const p = cardDiv.querySelector('p');
    // Only push if there is a paragraph
    if (p) {
      rows.push([p]);
    }
  });
  // Create the table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
