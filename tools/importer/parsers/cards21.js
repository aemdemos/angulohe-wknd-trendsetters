/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per the example
  const headerRow = ['Cards (cards21)'];

  // For this HTML, we expect one card per block
  // Traverse down to the actual card content
  // Structure: sticky div > rotate div > card > card-body > [h4, img]
  let cardBody = element;
  // The card-body is nested deeply - find it
  cardBody = cardBody.querySelector('.card-body') || cardBody;

  // Extract the image (mandatory)
  const img = cardBody.querySelector('img');

  // Extract the heading (optional, but present here)
  // The heading is styled as h4-heading
  const heading = cardBody.querySelector('.h4-heading');

  // Prepare the text cell
  // If there are other textual nodes (description, cta), add them below the heading
  // In this HTML, only heading is present
  // We'll wrap them in a div for semantic grouping if needed
  let textCell;
  if (heading) {
    textCell = heading;
  } else {
    // If no heading found, fallback to empty string
    textCell = '';
  }

  // Compose the table rows: header and the card
  const rows = [headerRow, [img, textCell]];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element with the block table
  element.replaceWith(block);
}
