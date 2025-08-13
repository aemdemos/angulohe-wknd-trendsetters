/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row as specified
  const rows = [['Cards (cards33)']];

  // Find all direct child anchor tags (each card)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  cards.forEach(card => {
    // Get the image (first img descendant)
    const img = card.querySelector('img');

    // Get the text content (the div after the image, within the .w-layout-grid)
    const grid = card.querySelector('.w-layout-grid');
    // In the grid, children: first is img, second is the text content
    let textDiv = null;
    if (grid) {
      const children = Array.from(grid.children);
      textDiv = children.find(child => child !== img && child.tagName === 'DIV');
    }

    const textCellContent = [];
    if (textDiv) {
      // Add meta (eg. tag and read time), if present
      const meta = textDiv.querySelector('.flex-horizontal');
      if (meta) textCellContent.push(meta);
      // Add heading
      const heading = textDiv.querySelector('h3, .h4-heading');
      if (heading) textCellContent.push(heading);
      // Add paragraph/description, if present
      const desc = textDiv.querySelector('p');
      if (desc) textCellContent.push(desc);
      // Add CTA as link (use card's href), ONLY if a cta text 'Read' exists
      // Find the last div in textDiv whose text is 'Read' (case insensitive)
      const ctaDivs = Array.from(textDiv.querySelectorAll('div'));
      const ctaDiv = ctaDivs.reverse().find(div => div.textContent.trim().toLowerCase() === 'read');
      if (ctaDiv && card.href) {
        const a = document.createElement('a');
        a.href = card.href;
        a.textContent = ctaDiv.textContent;
        textCellContent.push(a);
      }
    }

    // Add the row for this card: [ image, textCellContent ]
    rows.push([img, textCellContent]);
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
