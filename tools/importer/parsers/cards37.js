/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract a card's main image and text content
  function extractCard(cardEl) {
    // Find the first image in the card (mandatory)
    let img = null;
    // Images may be within a div with aspect classes or directly in card
    const aspectDiv = cardEl.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    if (aspectDiv) {
      img = aspectDiv.querySelector('img');
    } else {
      img = cardEl.querySelector('img');
    }

    // Build the text content element
    const textContent = document.createElement('div');

    // Heading (h2, h3, h4)
    let heading = cardEl.querySelector('h2, h3, h4');
    if (heading) {
      textContent.appendChild(heading);
    }
    // Description (first <p> in card)
    let desc = cardEl.querySelector('p');
    if (desc) {
      textContent.appendChild(desc);
    }
    // CTA (optional): look for .button or a.button directly inside card
    let cta = cardEl.querySelector('.button, button, a.button');
    if (cta) {
      textContent.appendChild(cta);
    }
    return [img, textContent];
  }

  // The first .w-layout-grid.grid-layout is the main grid
  let mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) mainGrid = element;

  // Cards can be direct children or inside nested grid(s)
  let cardEls = Array.from(mainGrid.children).filter(child =>
    child.classList.contains('utility-link-content-block')
  );

  // Find nested grids that may contain more cards
  const nestedGrids = Array.from(mainGrid.querySelectorAll('.w-layout-grid'));
  nestedGrids.forEach(grid => {
    Array.from(grid.children).forEach(child => {
      if (child.classList.contains('utility-link-content-block')) {
        cardEls.push(child);
      }
    });
  });
  // Remove duplicate references
  cardEls = Array.from(new Set(cardEls));

  // Compose the table rows
  const rows = [];
  // Header
  rows.push(['Cards (cards37)']);
  // One row per card (image, text content)
  cardEls.forEach(cardEl => {
    const [img, textContent] = extractCard(cardEl);
    // Only include if both image and text content exist
    if (img && textContent && (textContent.childNodes.length > 0)) {
      rows.push([img, textContent]);
    }
  });

  // Build and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
