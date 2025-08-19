/* global WebImporter */
export default function parse(element, { document }) {
  // Header as required
  const headerRow = ['Cards (cards25)'];
  const cells = [headerRow];

  // Helper to extract heading and text cell (if both present)
  function createTextCell(cardDiv) {
    const contentContainer = cardDiv.querySelector('.utility-padding-all-2rem');
    if (contentContainer) {
      const arr = [];
      const h3 = contentContainer.querySelector('h3');
      if (h3) arr.push(h3);
      const p = contentContainer.querySelector('p');
      if (p) arr.push(p);
      return arr.length ? arr : contentContainer;
    }
    return null;
  }

  // Only include cards with BOTH image and text content
  const cardNodes = Array.from(element.querySelectorAll(':scope > div'));
  cardNodes.forEach(cardDiv => {
    const img = cardDiv.querySelector('img');
    const textCell = createTextCell(cardDiv);
    // Only add if both present
    if (img && textCell) {
      cells.push([img, textCell]);
    }
  });

  // Replace with the block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
