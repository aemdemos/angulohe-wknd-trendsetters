/* global WebImporter */
export default function parse(element, { document }) {
  // Block header: must match example exactly
  const headerRow = ['Cards (cards21)'];

  // Defensive: Collect all cards in this block (even if >1), but for provided HTML, there is only one
  // The provided HTML has a single card nested within several divs
  // Find the .card-body divs
  const cardBodies = element.querySelectorAll('.card-body');

  const rows = [];
  cardBodies.forEach(cardBody => {
    // Find image
    const img = cardBody.querySelector('img');

    // Find heading or title (prefer .h4-heading, fallback to h1-h4)
    let heading = cardBody.querySelector('.h4-heading') ||
                  cardBody.querySelector('h1, h2, h3, h4');

    // Find additional description after heading (if any)
    // Description is: any text nodes or block elements after heading, but in this HTML, only heading present
    let description = null;
    if (heading) {
      // Grab next sibling that contains text (if any)
      let next = heading.nextSibling;
      while (next) {
        if (next.nodeType === Node.TEXT_NODE && next.textContent.trim()) {
          description = document.createElement('div');
          description.textContent = next.textContent.trim();
          break;
        } else if (next.nodeType === Node.ELEMENT_NODE && next.textContent.trim()) {
          description = next;
          break;
        }
        next = next.nextSibling;
      }
    }

    // Build text cell content: heading + description (if present)
    const textCellContent = [];
    if (heading) textCellContent.push(heading);
    if (description) textCellContent.push(description);

    // Add row: [image, textCellContent]
    rows.push([img, textCellContent]);
  });

  const tableCells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the table
  element.replaceWith(block);
}
