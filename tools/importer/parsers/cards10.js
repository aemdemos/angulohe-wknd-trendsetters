/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified in the example
  const headerRow = ['Cards (cards10)'];
  const rows = [];
  // Each card is an <a> directly inside the grid container
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  cards.forEach(card => {
    // Image: always present, inside first child div
    let img = null;
    const imgDiv = card.querySelector('.utility-aspect-3x2');
    if (imgDiv) {
      img = imgDiv.querySelector('img');
    }
    // Text content: inside .utility-padding-all-1rem
    const textDiv = card.querySelector('.utility-padding-all-1rem');
    const textParts = [];
    if (textDiv) {
      // Optional tag
      const tagDiv = textDiv.querySelector('.tag-group .tag');
      if (tagDiv) {
        textParts.push(tagDiv);
      }
      // Heading (h3)
      const heading = textDiv.querySelector('h3');
      if (heading) {
        textParts.push(heading);
      }
      // Description (p)
      const para = textDiv.querySelector('p');
      if (para) {
        textParts.push(para);
      }
      // No CTA found in source, but if present would be added here
    }
    rows.push([img, textParts]);
  });
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
