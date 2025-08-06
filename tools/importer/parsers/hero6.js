/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: safely get first matching element or null
  function qs(node, selector) {
    return node ? node.querySelector(selector) : null;
  }

  // 1. Header row
  const headerRow = ['Hero (hero6)'];

  // 2. Background image row
  // The first grid cell contains the background image <img>
  let bgImg = null;
  const topGrid = qs(element, ':scope > .w-layout-grid');
  if (topGrid && topGrid.children.length > 0) {
    const firstGridCell = topGrid.children[0];
    bgImg = qs(firstGridCell, 'img');
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content row (Title, Subheading, CTA)
  // The second grid cell contains the card with h1, p, button group
  let contentCell = '';
  if (topGrid && topGrid.children.length > 1) {
    // Find the card inside nested grids
    let card = null;
    // The card is within a .grid-layout
    const possibleNestedGrids = topGrid.children[1].querySelectorAll('.grid-layout');
    for (const g of possibleNestedGrids) {
      card = qs(g, '.card');
      if (card) break;
    }
    if (card) {
      // Gather all meaningful children from card
      const children = [];
      // Headline (h1)
      const h1 = qs(card, 'h1');
      if (h1) children.push(h1);
      // Subheading (p)
      const p = qs(card, 'p');
      if (p) children.push(p);
      // Button group (call-to-action)
      const btnGroup = qs(card, '.button-group');
      if (btnGroup) {
        // Add all buttons (a elements) from the group
        children.push(...btnGroup.querySelectorAll('a'));
      }
      contentCell = children.length ? children : '';
    }
  }
  const contentRow = [contentCell];

  // Build the block table
  const cells = [headerRow, bgImgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
