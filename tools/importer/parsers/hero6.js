/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches example exactly
  const headerRow = ['Hero (hero6)'];

  // Extract background image: look for <img> inside deepest grid
  let imgEl = null;
  const gridDivs = element.querySelectorAll(':scope > div');
  for (const div of gridDivs) {
    // Try immediate children then deeper
    const imgs = div.querySelectorAll('img');
    if (imgs.length) {
      imgEl = imgs[0];
      break;
    }
  }

  // Extract card with heading, subheading, CTA group
  let cardEl = null;
  for (const div of gridDivs) {
    // The card is a descendant of the right column grid
    cardEl = div.querySelector('.card');
    if (cardEl) {
      break;
    }
  }

  // If no image or content, use empty string as fallback (edge case handling)
  const cells = [
    headerRow,
    [imgEl || ''],
    [cardEl || '']
  ];

  // Create table and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
