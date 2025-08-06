/* global WebImporter */
export default function parse(element, { document }) {
  // Header row (must match exactly)
  const cells = [['Cards (cards10)']];
  // Collect all cards (direct children <a> elements)
  const cards = element.querySelectorAll(':scope > a.card-link');
  cards.forEach((card) => {
    // Image is always the img inside the aspect-ratio container
    const imgContainer = card.querySelector('.utility-aspect-3x2');
    let img = null;
    if (imgContainer) {
      img = imgContainer.querySelector('img');
    }
    // Text content is in the .utility-padding-all-1rem div
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    const cell2 = [];
    if (textContainer) {
      // Optional tag label
      const tag = textContainer.querySelector('.tag-group .tag');
      if (tag) cell2.push(tag);
      // Heading (h3, .h4-heading)
      const heading = textContainer.querySelector('h3, .h4-heading');
      if (heading) cell2.push(heading);
      // Description (p)
      const desc = textContainer.querySelector('p');
      if (desc) cell2.push(desc);
    }
    if (img && cell2.length > 0) {
      cells.push([img, cell2]);
    }
  });
  // Create the block table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
