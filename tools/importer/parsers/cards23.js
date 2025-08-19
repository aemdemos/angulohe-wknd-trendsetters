/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract cards from a grid layout (each grid in each tab)
  function extractCardsFromGrid(grid) {
    const cards = [];
    // Each card is an <a> (or similar) child
    Array.from(grid.children).forEach((cardEl) => {
      // Find the image (if present), only the first <img>
      const imgEl = cardEl.querySelector('img');
      // Gather all heading elements inside card
      const headingEl = cardEl.querySelector('h1, h2, h3, h4, h5, h6');
      // Gather all possible description paragraphs inside card
      // (could be .paragraph-sm or <p> or just text nodes)
      let descCells = [];
      // Prefer .paragraph-sm if available
      const paraEls = cardEl.querySelectorAll('.paragraph-sm');
      if (paraEls.length > 0) {
        descCells = Array.from(paraEls);
      } else {
        // Fallback to <p> tags inside, if any
        const pEls = cardEl.querySelectorAll('p');
        if (pEls.length > 0) {
          descCells = Array.from(pEls);
        }
      }
      // Fallback: If there are no headings or paragraphs, use all text content except in heading/image
      if (!headingEl && descCells.length === 0) {
        // Remove content from image wrappers, then get all text
        const text = cardEl.textContent.trim();
        if (text) descCells = [text];
      }
      // Compose the text cell, referencing existing elements
      const textCell = [];
      if (headingEl) textCell.push(headingEl);
      descCells.forEach(desc => { if (desc) textCell.push(desc); });
      // If still just one text node (string), give that as a string
      let textCellFinal = textCell.length === 1 ? textCell[0] : textCell;
      // If both heading and all descriptions are missing, fallback to all text
      if (textCell.length === 0) {
        const fallback = cardEl.textContent.trim();
        textCellFinal = fallback ? fallback : '';
      }
      // Always create a row if there is any text or image
      if (imgEl || textCellFinal) {
        cards.push([imgEl || '', textCellFinal]);
      }
    });
    return cards;
  }
  // Find all tab panes in the tabs content
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  let allCardRows = [];
  tabPanes.forEach(tabPane => {
    const grid = tabPane.querySelector('.w-layout-grid');
    if (grid) {
      const rows = extractCardsFromGrid(grid);
      allCardRows = allCardRows.concat(rows);
    }
  });
  // Compose the table: header row (block name), then card rows
  if (allCardRows.length > 0) {
    const headerRow = ['Cards (cards23)'];
    const cells = [headerRow, ...allCardRows];
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
  } else {
    element.remove();
  }
}
