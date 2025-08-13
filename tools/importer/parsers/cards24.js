/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];
  // Collect all cards (each <a> element)
  const cards = element.querySelectorAll(':scope > a');
  cards.forEach(card => {
    // LEFT cell: find the image
    let img = null;
    const imgDiv = card.querySelector('.utility-aspect-2x3');
    if (imgDiv) {
      img = imgDiv.querySelector('img');
    }
    // RIGHT cell: tag, date, heading (no description present)
    // Tag and date
    const infoDiv = card.querySelector('.flex-horizontal');
    const tag = infoDiv ? infoDiv.querySelector('.tag') : null;
    const date = infoDiv ? infoDiv.querySelector('.paragraph-sm') : null;
    // Heading
    const heading = card.querySelector('h3');
    // Compose right cell
    const rightCell = document.createElement('div');
    // Tag/date row
    if (tag || date) {
      const tagDateRow = document.createElement('div');
      if (tag) tagDateRow.appendChild(tag);
      if (date) {
        // If tag exists, add a space between
        if (tag) tagDateRow.appendChild(document.createTextNode(' '));
        tagDateRow.appendChild(date);
      }
      rightCell.appendChild(tagDateRow);
    }
    // Heading (always present)
    if (heading) rightCell.appendChild(heading);
    rows.push([
      img ? img : '',
      rightCell
    ]);
  });
  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
