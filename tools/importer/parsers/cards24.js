/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per specification
  const headerRow = ['Cards (cards24)'];

  // Get all card anchor elements
  const cardLinks = Array.from(element.querySelectorAll(':scope > a.utility-link-content-block'));

  const rows = cardLinks.map((card) => {
    // IMAGE CELL
    // Image wrapper is always the first div child of card
    const imgWrapper = card.querySelector(':scope > div');
    let image = null;
    if (imgWrapper) {
      image = imgWrapper.querySelector('img'); // Reference the actual <img> element
    }

    // TEXT CELL
    const textCell = document.createElement('div');
    // Tag and date row (optional, but present in all cards here)
    const tagRow = card.querySelector('.flex-horizontal');
    if (tagRow) textCell.appendChild(tagRow);
    // Title (h3)
    const title = card.querySelector('h3, .h4-heading');
    if (title) textCell.appendChild(title);
    // (No description or CTA in this variant)
    
    return [image, textCell];
  });

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
