/* global WebImporter */
export default function parse(element, { document }) {
  // Cards header row
  const headerRow = ['Cards'];
  // Each immediate child div in the grid represents one card
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  const rows = [headerRow];
  cardDivs.forEach(card => {
    // Each card contains an icon and a <p>
    // We include only the <p> content, as the example block has no icons
    const textP = card.querySelector('p');
    if (textP && textP.textContent.trim()) {
      rows.push([textP]);
    }
    // If no <p>, skip (avoiding empty rows)
  });
  // Only create table if there is at least one card
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
