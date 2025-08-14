/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row as in the example
  const headerRow = ['Cards (cards23)'];
  const cells = [headerRow];

  // Collect all cards from all tab panes
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  tabPanes.forEach((tabPane) => {
    // Find card containers (direct <a> children of the grid)
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    const cards = grid.querySelectorAll(':scope > a');
    cards.forEach((card) => {
      // --- COLUMN 1: Image ---
      // Find an image inside the card, if present
      let img = null;
      // Most cards: image inside a div with 'aspect' in class
      const imgContainer = card.querySelector('div[class*=aspect-3x2], div[class*=aspect]');
      if (imgContainer) {
        img = imgContainer.querySelector('img');
      } else {
        // Fallback: look for img directly
        img = card.querySelector('img');
      }
      // --- COLUMN 2: Text ---
      const textCellContent = [];
      // Heading (h3)
      const h3 = card.querySelector('h3');
      if (h3) textCellContent.push(h3);
      // Paragraph (description)
      const para = card.querySelector('.paragraph-sm');
      if (para) textCellContent.push(para);
      // Add only if at least one field exists, otherwise empty string
      cells.push([
        img || '',
        textCellContent.length ? textCellContent : ''
      ]);
    });
  });

  // Finalize table and replace element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
