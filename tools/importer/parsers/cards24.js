/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly as required
  const headerRow = ['Cards (cards24)'];
  const rows = [];
  // Each card is a direct child 'a.utility-link-content-block'
  const cards = element.querySelectorAll(':scope > a.utility-link-content-block');
  cards.forEach(card => {
    // Image in first column
    const imageContainer = card.querySelector(':scope > div');
    let imgEl = null;
    if (imageContainer) {
      const img = imageContainer.querySelector('img');
      if (img) imgEl = img;
    }
    // Second column: text content
    const cellContent = [];
    // Tag and date row
    const tagRow = card.querySelector(':scope > div.flex-horizontal');
    if (tagRow) cellContent.push(tagRow);
    // Heading
    const heading = card.querySelector(':scope > h3');
    if (heading) cellContent.push(heading);
    // All text in these cards is within tags above, so nothing missed
    rows.push([imgEl, cellContent]);
  });
  const tableArray = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableArray, document);
  element.replaceWith(table);
}
