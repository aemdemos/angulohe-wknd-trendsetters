/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Cards (cards17)'];
  // Gather each card's content (image in this case)
  // The HTML structure: each card is a .utility-aspect-1x1 with one <img>
  const cardDivs = element.querySelectorAll(':scope > .utility-aspect-1x1');
  const rows = [headerRow];
  cardDivs.forEach((cardDiv) => {
    // Reference the actual <img> element
    const img = cardDiv.querySelector('img');
    // If the image exists, place it in the first cell, empty string in the second (no text content present)
    if (img) {
      rows.push([img, '']);
    } else {
      // If no image, just add two empty cells to keep table structure
      rows.push(['', '']);
    }
  });
  // Create and replace with block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
