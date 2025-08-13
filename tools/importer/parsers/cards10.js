/* global WebImporter */
export default function parse(element, { document }) {
  // Compose header row as per spec
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Each card is a top-level <a>
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  cards.forEach(card => {
    // -------- IMAGE CELL --------
    // Find image (usually inside the first child div)
    let img = null;
    // Look for the first <img> tag within this card
    const firstDiv = card.querySelector('div');
    if (firstDiv) img = firstDiv.querySelector('img');
    // Only continue if we found an image
    if (!img) return;

    // -------- TEXT CELL --------
    // Find the main content container
    const txtDiv = card.querySelector('.utility-padding-all-1rem');
    let textCell = [];
    if (txtDiv) {
      // Optional tag
      const tag = txtDiv.querySelector('.tag');
      if (tag && tag.textContent.trim()) {
        // Represent tag as a label on top, as in the screenshot
        const tagWrap = document.createElement('div');
        tagWrap.append(tag);
        textCell.push(tagWrap);
      }
      // Heading (h3 or .h4-heading)
      const heading = txtDiv.querySelector('h3, .h4-heading');
      if (heading) {
        textCell.push(heading);
      }
      // Description paragraph
      const para = txtDiv.querySelector('p');
      if (para) {
        textCell.push(para);
      }
    }
    // Push row only if both image and text content present
    if (img && textCell.length > 0) {
      rows.push([img, textCell]);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the created block table
  element.replaceWith(table);
}
