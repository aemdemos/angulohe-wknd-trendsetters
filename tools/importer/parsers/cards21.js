/* global WebImporter */
export default function parse(element, { document }) {
  // The header row matches exactly the example: Cards (cards21)
  const headerRow = ['Cards (cards21)'];

  // Find the card content (card-body is the main card content area)
  let cardBody = element.querySelector('.card-body');
  if (!cardBody) {
    // Fallback to .card if .card-body is missing
    cardBody = element.querySelector('.card');
  }

  // Extract the image (mandatory, first cell)
  const img = cardBody.querySelector('img');

  // Extract the card title (look for heading, use widest match)
  let title = cardBody.querySelector('.h4-heading, h1, h2, h3, h4, strong, b');

  // Compose the title element for the 2nd cell
  let textCellContent = [];
  if (title) {
    // Keep original heading element and text content
    textCellContent.push(title);
  }

  // Description: any text not in the heading and not part of the image
  // Find all children except heading and image, add their text
  Array.from(cardBody.childNodes).forEach((node) => {
    if (node === img || node === title) return;
    // If ELEMENT_NODE and not heading or img
    if (node.nodeType === Node.ELEMENT_NODE && node !== title && node !== img) {
      // Only add if there's meaningful text
      const txt = node.textContent.trim();
      if (txt) textCellContent.push(document.createElement('br'), node);
    }
    // If TEXT_NODE
    if (node.nodeType === Node.TEXT_NODE) {
      const txt = node.textContent.trim();
      if (txt) {
        const span = document.createElement('span');
        span.textContent = txt;
        textCellContent.push(document.createElement('br'), span);
      }
    }
  });

  // If nothing found except heading, just show the heading
  if (textCellContent.length === 0 && cardBody.textContent.trim()) {
    textCellContent = [document.createTextNode(cardBody.textContent.trim())];
  }

  // Cards block table
  const cells = [
    headerRow,
    [img, textCellContent]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
