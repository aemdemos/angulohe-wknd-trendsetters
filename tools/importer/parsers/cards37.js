/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get image in a card
  function findFirstImg(el) {
    return el.querySelector('img');
  }

  // Helper to get card text content as a fragment
  function extractCardText(card) {
    const frag = document.createDocumentFragment();
    // Heading (h2, h3, or h4)
    const heading = card.querySelector('h2, h3, h4');
    if (heading) frag.appendChild(heading);
    // Paragraph(s)
    const ps = card.querySelectorAll('p');
    ps.forEach(p => frag.appendChild(p));
    // Button or CTA (if present)
    const cta = card.querySelector('.button, .cta, button, a.button');
    if (cta) frag.appendChild(cta);
    return frag;
  }

  // Find the main grid containing cards
  const container = element.querySelector('.container');
  if (!container) return;

  // First, attempt to find the outermost grid-layout
  let mainGrid = container.querySelector('.grid-layout');
  let cardEls = [];
  if (mainGrid) {
    // Direct children cards
    const directCards = Array.from(mainGrid.children).filter(child => child.matches('a.utility-link-content-block, .utility-link-content-block'));
    // Nested grids
    const nestedGrids = Array.from(mainGrid.children).filter(child => child.classList.contains('grid-layout'));
    cardEls = [
      ...directCards,
      ...nestedGrids.flatMap(grid => Array.from(grid.children).filter(child => child.matches('a.utility-link-content-block, .utility-link-content-block'))),
    ];
  }
  // If no cards found, fallback to all .utility-link-content-block in section
  if (cardEls.length === 0) {
    cardEls = Array.from(element.querySelectorAll('.utility-link-content-block'));
  }

  // Build table rows, header matches exact: 'Cards (cards37)'
  const rows = [['Cards (cards37)']];
  cardEls.forEach(card => {
    const img = findFirstImg(card);
    const textFrag = extractCardText(card);
    // Only push row if at least image or text exists
    if (img || textFrag.childNodes.length > 0) {
      rows.push([img, textFrag]);
    }
  });
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
