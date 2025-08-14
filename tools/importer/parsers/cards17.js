/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Cards (cards17)'];

  // Each immediate child div is a card that contains a single img
  const cardDivs = element.querySelectorAll(':scope > div');

  // For each card div, extract the img
  // This HTML contains only images, no text, so second cell is left blank (required by block schema)
  const rows = Array.from(cardDivs).map(div => {
    const img = div.querySelector('img');
    return [img, ''];
  });

  // Assemble the cells for the block
  const cells = [headerRow, ...rows];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original grid element with the block table
  element.replaceWith(table);
}
