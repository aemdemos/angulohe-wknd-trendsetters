/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header
  const headerRow = ['Hero (hero12)'];

  // 2. Extract background image (first image in the first grid column)
  let bgImg = '';
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid > div');
  if (gridDivs.length > 0) {
    const img = gridDivs[0].querySelector('img');
    if (img) bgImg = img;
  }

  // 3. Extract content cell: includes side image, heading, list, and CTA
  let contentCell = '';
  if (gridDivs.length > 1) {
    // The second grid column contains the card with the main content
    const card = gridDivs[1].querySelector('.card');
    if (card) {
      const cardBody = card.querySelector('.card-body');
      if (cardBody) {
        const innerGrid = cardBody.querySelector('.grid-layout');
        if (innerGrid) {
          // Get all children of innerGrid
          const children = Array.from(innerGrid.children);

          // Find side image (img), and content column (the div with heading/button)
          const img = children.find(c => c.tagName === 'IMG');
          const contentDiv = children.find(c => c.tagName === 'DIV');

          if (img && contentDiv) {
            // Add both to a fragment
            const frag = document.createDocumentFragment();
            frag.appendChild(img);
            frag.appendChild(contentDiv);
            contentCell = frag;
          } else if (contentDiv) {
            contentCell = contentDiv;
          } else if (img) {
            contentCell = img;
          } else {
            // fallback: all children
            const frag = document.createDocumentFragment();
            children.forEach(child => frag.appendChild(child));
            contentCell = frag;
          }
        } else {
          // fallback: use whole cardBody
          contentCell = cardBody;
        }
      }
    }
  }

  const cells = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentCell ? contentCell : ''],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
