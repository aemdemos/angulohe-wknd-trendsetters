/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly matches example
  const headerRow = ['Cards (cards25)'];
  // Get all immediate children (these are either cards-with-text or image-only)
  const cardNodes = Array.from(element.querySelectorAll(':scope > div'));
  const rows = [headerRow];

  cardNodes.forEach((card) => {
    // Find the image for the card (first .cover-image img)
    const img = card.querySelector('img');
    // For cards with text, look for .utility-padding-all-2rem
    const textWrapper = card.querySelector('.utility-padding-all-2rem');
    let textCell = '';
    if (textWrapper) {
      // Gather heading and description in order
      const parts = [];
      const heading = textWrapper.querySelector('h3');
      if (heading) parts.push(heading);
      // Description in <p>
      const desc = textWrapper.querySelector('p');
      if (desc) parts.push(desc);
      // If there are other elements (e.g. links) add them in order
      textCell = parts.length === 1 ? parts[0] : parts;
    }
    rows.push([img, textCell]);
  });

  // Create table and replace original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}