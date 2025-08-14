/* global WebImporter */
export default function parse(element, { document }) {
  // Header: Must match the block name and variant exactly
  const headerRow = ['Cards (cards21)'];

  // Defensive: Find the .card-body inside the element
  let cardBody = element.querySelector('.card-body');
  if (!cardBody) cardBody = element;

  // Find the card image (first .cover-image or the first img)
  let cardImg = cardBody.querySelector('img');
  if (!cardImg) cardImg = cardBody.querySelector('img');

  // Find the heading (h4-heading or any heading)
  let cardTitle = cardBody.querySelector('.h4-heading');
  if (!cardTitle) cardTitle = cardBody.querySelector('h4, h3, h2, h1');

  // Compose the text cell: retain semantic meaning
  const textCell = [];
  if (cardTitle) {
    // Use the actual heading element, not convert to <strong>
    textCell.push(cardTitle);
  }
  // If there is additional descriptive text, include it (none in this case)
  // Example only contains heading text, so nothing else needed.

  // Compose the table
  const cells = [
    headerRow,
    [cardImg, textCell]
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
