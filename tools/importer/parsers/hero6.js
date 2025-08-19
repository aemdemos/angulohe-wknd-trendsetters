/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header matches example
  const headerRow = ['Hero (hero6)'];

  // 2. Find the background image (first img in the grid layout)
  let bgImg = null;
  const grids = element.querySelectorAll(':scope > .w-layout-grid');
  if (grids.length > 0) {
    const firstGrid = grids[0];
    const firstGridChildren = firstGrid.children;
    // Search for img in any direct child of the grid
    for (const child of firstGridChildren) {
      const img = child.querySelector('img');
      if (img) {
        bgImg = img;
        break;
      }
    }
  }

  // 3. Second row: background image (optional)
  const rowBgImage = [bgImg ? bgImg : '']; // empty if missing

  // 4. Third row: text content (headline/subheading/cta)
  let card = null;
  if (grids.length > 0) {
    const firstGrid = grids[0];
    const firstGridChildren = firstGrid.children;
    // Second column contains the main content
    if (firstGridChildren.length > 1) {
      const container = firstGridChildren[1];
      // Find the card
      card = container.querySelector('.card');
    }
  }
  const contentCell = [];
  if (card) {
    // Grab heading, subheading, and CTAs
    const heading = card.querySelector('h1');
    if (heading) contentCell.push(heading);
    const subheading = card.querySelector('p');
    if (subheading) contentCell.push(subheading);
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) contentCell.push(buttonGroup);
  }
  // If there is no card, use empty cell
  const rowContent = [contentCell.length ? contentCell : ''];

  // 5. Build table (matches example structure: 1 column, 3 rows)
  const cells = [
    headerRow,
    rowBgImage,
    rowContent
  ];

  // 6. Create table and replace the element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
