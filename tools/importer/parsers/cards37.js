/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main .container inside the section
  const container = element.querySelector(':scope > .container');
  if (!container) return;

  // The main grid (holds all cards, may include nested grid)
  const mainGrid = container.querySelector(':scope > .grid-layout');
  if (!mainGrid) return;

  //--- Helper to extract card content (image in cell 1, text block in cell 2) ---//
  function extractCard(cardEl) {
    let image = null;
    let textContent = [];
    // 1. Image: Look for first img inside a div (cover-image)
    const img = cardEl.querySelector('img');
    if (img) image = img;

    // 2. Text: heading (h2/h3/h4), p, CTA (.button, button, a.button)
    // For text, preserve content order
    let heading = cardEl.querySelector('h2, h3, h4');
    if (heading) textContent.push(heading);
    let desc = cardEl.querySelector('p');
    if (desc) textContent.push(desc);
    let cta = cardEl.querySelector('.button, button, a.button');
    if (cta) textContent.push(cta);
    return [image, textContent];
  }

  //--- Identify all card containers in DOM order ---//
  const cards = [];
  // The mainGrid may have direct a.utility-link-content-block and a nested grid containing the rest
  // Step 1: find direct cards (the large one)
  const directCards = Array.from(mainGrid.children).filter(
    el => el.matches('a.utility-link-content-block')
  );
  // Step 2: find a nested grid (contains additional cards)
  const nestedGrid = mainGrid.querySelector(':scope > .grid-layout');
  let nestedCards = [];
  if (nestedGrid) {
    nestedCards = Array.from(nestedGrid.children).filter(el => el.matches('a.utility-link-content-block'));
  }

  // 1st card is the first direct card (large card)
  if (directCards.length > 0) {
    const cardEl = directCards[0];
    // In this card, image is inside a .utility-aspect-2x3, text in .utility-padding-all-2rem
    // We want to reference actual heading, p, and button elements (not outer wrapper)
    // so extract from .utility-padding-all-2rem
    let image = cardEl.querySelector('img');
    const textWrap = cardEl.querySelector('.utility-padding-all-2rem');
    let textContent = [];
    if (textWrap) {
      let heading = textWrap.querySelector('h2, h3, h4');
      if (heading) textContent.push(heading);
      let desc = textWrap.querySelector('p');
      if (desc) textContent.push(desc);
      let cta = textWrap.querySelector('.button, button, a.button');
      if (cta) textContent.push(cta);
    }
    cards.push([image, textContent]);
  }

  // Next cards are in the nested grid, if present
  nestedCards.forEach(cardEl => {
    cards.push(extractCard(cardEl));
  });

  // Table header row according to the spec/example
  const cells = [
    ['Cards (cards37)']
  ];

  // Each card becomes a new row: [image, text block]
  cards.forEach(([img, textContent]) => {
    const cell1 = img ? img : '';
    const cell2 = (textContent && textContent.length > 0) ? textContent : '';
    cells.push([cell1, cell2]);
  });

  // Create table and replace the original section
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
