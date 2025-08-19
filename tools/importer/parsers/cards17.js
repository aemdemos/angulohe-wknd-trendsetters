/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards17) block expects 2 columns: image + text. If no text, cell is empty.
  const headerRow = ['Cards (cards17)'];
  // Each card is a direct child div
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  // For each card div, extract image and any text node (if present)
  const rows = cardDivs.map(div => {
    // Find the main image
    const img = div.querySelector('img');
    // Attempt to extract any additional text content inside the card (ignore empty/whitespace)
    // For this HTML, there is NO text content, but preserve logic for possible variations
    let textContent = '';
    // If div has more than just the image, collect text nodes and block elements
    const nodes = Array.from(div.childNodes).filter(n => n !== img);
    if (nodes.length > 0) {
      // Attempt to collect text and inline elements
      const fragment = document.createDocumentFragment();
      nodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          fragment.appendChild(document.createTextNode(node.textContent));
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          fragment.appendChild(node);
        }
      });
      textContent = fragment.childNodes.length ? fragment : '';
    }
    // Return 2 columns: [ image, text ]
    return [img, textContent];
  });

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
