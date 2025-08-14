/* global WebImporter */
export default function parse(element, { document }) {
  // The Cards block header, as specified
  const headerRow = ['Cards (cards25)'];

  // Collect all direct child divs that look like cards
  const cardRows = [];
  const children = Array.from(element.querySelectorAll(':scope > div'));
  children.forEach((cardDiv) => {
    // Find the image for the card
    const img = cardDiv.querySelector('img');
    if (!img) return; // skip if no image (not a card)

    // Find text content (title and description)
    let textContainer = cardDiv.querySelector('.utility-padding-all-2rem');
    let title = null, desc = null;
    if (textContainer) {
      title = textContainer.querySelector('h3');
      desc = textContainer.querySelector('p');
    } else {
      // Fallback to search in cardDiv if the structure varies
      title = cardDiv.querySelector('h3');
      desc = cardDiv.querySelector('p');
    }

    // Compose the text cell
    const textCell = [];
    if (title) textCell.push(title);
    if (desc) textCell.push(desc);

    cardRows.push([
      img,
      textCell.length ? textCell : ''
    ]);
  });

  // Assemble full table structure
  const cells = [headerRow, ...cardRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
