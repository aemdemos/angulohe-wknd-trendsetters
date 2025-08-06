/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the image from a card
  function getImage(card) {
    // Find an img inside any .utility-aspect-1x1 or .utility-aspect-2x3
    const imgWrapper = card.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    if (imgWrapper) {
      const img = imgWrapper.querySelector('img');
      if (img) return img;
    }
    // Fallback: any img in card
    const img = card.querySelector('img');
    return img || null;
  }

  // Helper to extract text content for the card (heading, desc, button)
  function getCardText(card) {
    const textNodes = [];
    // Try all h3 (should be a heading)
    const heading = card.querySelector('h2, h3, h4, h5, h6');
    if (heading) textNodes.push(heading);
    // Try first p
    const para = card.querySelector('p');
    if (para) textNodes.push(para);
    // Try .button (may not exist)
    const cta = card.querySelector('.button');
    if (cta) textNodes.push(cta);
    return textNodes.length === 1 ? textNodes[0] : textNodes;
  }

  // Find the main .grid-layout container (may contain both main and sub cards)
  const container = element.querySelector(':scope > .container');
  if (!container) return;
  const mainGrid = container.querySelector(':scope > .grid-layout');
  if (!mainGrid) return;

  // The main grid has direct <a> card(s) and a nested grid with more cards
  // Get all direct <a> in mainGrid (usually the large card)
  const directCards = Array.from(mainGrid.children).filter(
    (child) => child.tagName === 'A' && child.classList.contains('utility-link-content-block')
  );
  // Get the nested grid (has remaining cards)
  const nestedGrid = mainGrid.querySelector(':scope > .grid-layout');
  let nestedCards = [];
  if (nestedGrid) {
    nestedCards = Array.from(nestedGrid.children).filter(
      (child) => child.tagName === 'A' && child.classList.contains('utility-link-content-block')
    );
  }
  // If mainGrid has more <a> after the nested grid, include them as well
  const moreCards = Array.from(mainGrid.children).filter(
    (child) => child.tagName === 'A' && child.classList.contains('utility-link-content-block') && !directCards.includes(child)
  );

  // Collect all cards in order: directCards (the large one), then nestedCards, then moreCards
  const allCards = [
    ...directCards,
    ...nestedCards,
    // 'moreCards' shouldn't duplicate any already included
    ...moreCards.filter((card) => !directCards.includes(card) && !nestedCards.includes(card)),
  ];

  // Build the table rows
  const rows = [['Cards (cards37)']];
  allCards.forEach((card) => {
    const img = getImage(card);
    const textContent = getCardText(card);
    rows.push([img ? img : '', textContent]);
  });

  // Create and replace with the block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
