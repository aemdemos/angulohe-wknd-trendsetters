/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches example exactly
  const headerRow = ['Cards (cards10)'];
  const cards = [];
  // Direct card wrappers
  const cardElements = element.querySelectorAll(':scope > a');
  cardElements.forEach(card => {
    // Image column (mandatory)
    const imgWrapper = card.querySelector(':scope > div');
    let img = null;
    if (imgWrapper) {
      img = imgWrapper.querySelector('img');
    }
    // Text column (mandatory)
    // The info wrapper is always the second direct div
    const infoDivs = card.querySelectorAll(':scope > div');
    const textDiv = infoDivs[1];
    const textCellElements = [];
    if (textDiv) {
      // Tag (optional)
      const tagGroup = textDiv.querySelector('.tag-group');
      if (tagGroup) {
        // In example, only one tag per card, but support multiple
        const tags = Array.from(tagGroup.querySelectorAll('.tag')).map(t => t);
        textCellElements.push(...tags);
      }
      // Heading (optional)
      const heading = textDiv.querySelector('h3, .h4-heading');
      if (heading) {
        textCellElements.push(heading);
      }
      // Description (optional)
      const desc = textDiv.querySelector('p');
      if (desc) {
        textCellElements.push(desc);
      }
      // (No CTA in source HTML)
    }
    // Each card is a row: [image, info]
    // image is the element, info is array of referenced elements
    cards.push([img, textCellElements]);
  });
  // Compose table rows
  const tableRows = [headerRow, ...cards];
  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  // Replace the original element
  element.replaceWith(table);
}
