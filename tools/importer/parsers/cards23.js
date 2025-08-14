/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly matches the example
  const headerRow = ['Cards (cards23)'];
  const cells = [headerRow];

  // Find all .w-tab-pane children in order (each tab)
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  tabPanes.forEach(tabPane => {
    // Find the grid containing all cards
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an <a>
    const links = grid.querySelectorAll('a');
    links.forEach(link => {
      // Column 1: image (mandatory if exists)
      let imageElem = null;
      // Some cards are structured differently, so find image if present
      const imgContainer = link.querySelector('.utility-aspect-3x2');
      if (imgContainer) {
        imageElem = imgContainer.querySelector('img');
      }
      // Column 2: title (h3) and description (paragraph-sm)
      // Cards may have text in a wrapper or directly on the anchor
      let textContainer = link.querySelector('.utility-text-align-center');
      if (!textContainer) {
        textContainer = link;
      }
      // Heading (optional)
      const heading = textContainer.querySelector('h3');
      // Description (optional)
      const paragraph = textContainer.querySelector('.paragraph-sm');
      // Compose text cell: heading (if exists) above description (if exists)
      const textCellItems = [];
      if (heading) textCellItems.push(heading);
      if (paragraph) textCellItems.push(paragraph);
      // Push the card row: image in first cell, text content in second cell
      cells.push([
        imageElem ? imageElem : '',
        textCellItems.length ? textCellItems : ''
      ]);
    });
  });

  // Construct the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
