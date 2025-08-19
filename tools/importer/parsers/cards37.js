/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content
  function extractCardContent(cardEl) {
    // Find image (inside a div then img)
    let imgDiv = cardEl.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    let img = imgDiv ? imgDiv.querySelector('img') : null;
    // Find text container (sometimes whole card, sometimes nested div)
    let textContainer = cardEl.querySelector('.utility-padding-all-2rem') || cardEl;
    // Find heading (h2, h3, h4)
    let heading = textContainer.querySelector('h2, h3, h4');
    // Find description (first p)
    let desc = textContainer.querySelector('p');
    // Find CTA (button or .button or link)
    let cta = textContainer.querySelector('a.button, .button:not(a), button');
    let ctaElem = null;
    if (cta) {
      if (cta.tagName === 'A') {
        ctaElem = cta;
      } else {
        // Reference the actual element
        ctaElem = cta;
      }
    }
    // Build text cell array
    let textContent = [];
    if (heading) textContent.push(heading);
    if (desc) textContent.push(desc);
    if (ctaElem) textContent.push(ctaElem);
    // Return [image, [textContent...]]
    return [img, textContent];
  }

  // Find card containers (links or divs) in the grid(s)
  let mainGrid = element.querySelector('.w-layout-grid');
  let cardLinks = [];
  if (mainGrid) {
    Array.from(mainGrid.children).forEach(child => {
      if (child.classList.contains('utility-link-content-block')) {
        cardLinks.push(child);
      } else if (child.classList.contains('w-layout-grid')) {
        Array.from(child.children).forEach(grandChild => {
          if (grandChild.classList.contains('utility-link-content-block')) {
            cardLinks.push(grandChild);
          }
        });
      }
    });
  }

  // Build table array
  const rows = [['Cards (cards37)']];
  cardLinks.forEach(card => {
    const [img, textContent] = extractCardContent(card);
    // Only add row if there is at least image or text
    if (img || textContent.length) {
      rows.push([img, textContent]);
    }
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
