/* global WebImporter */
export default function parse(element, { document }) {
  // The block header must exactly match the example: 'Cards (cards25)'
  const headerRow = ['Cards (cards25)'];
  const rows = [headerRow];

  // Select all direct children representing cards
  const children = Array.from(element.querySelectorAll(':scope > div'));

  children.forEach((child) => {
    // Find the first <img> in the card
    const img = child.querySelector('img');
    // Find the text area (utility-padding-all-2rem) if present
    const textWrapper = child.querySelector('.utility-padding-all-2rem');
    let textContent = '';
    if (textWrapper) {
      // Gather h3 and p elements if present, preserving their structure
      const parts = [];
      const h3 = textWrapper.querySelector('h3');
      if (h3) parts.push(h3);
      const p = textWrapper.querySelector('p');
      if (p) parts.push(p);
      // Only add if there's actual text
      if (parts.length > 0) textContent = parts;
    }
    // Only include rows with both image and text content
    if (img && textContent) {
      rows.push([img, textContent]);
    }
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace element
  element.replaceWith(block);
}
