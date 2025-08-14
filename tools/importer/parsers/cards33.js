/* global WebImporter */
export default function parse(element, { document }) {
  // Table: header first row, then one row per card (2 columns: image, content)
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  // Get all top-level cards
  const cards = element.querySelectorAll(':scope > a');
  cards.forEach(card => {
    // Image cell: first img inside card (should always exist)
    const img = card.querySelector('img');
    // Text cell: find the main content div (ignore the nested grid's image)
    // Structure: a > div (grid) > [img, div (content)]
    let contentCell = null;
    const gridDiv = card.querySelector('div');
    if (gridDiv) {
      // Find all children of gridDiv that are divs (not img)
      const possibleContentDivs = Array.from(gridDiv.children).filter(child => child.tagName === 'DIV');
      if (possibleContentDivs.length > 0) {
        contentCell = possibleContentDivs[0];
      } else {
        // fallback: if not found, use gridDiv (should not happen in provided html)
        contentCell = gridDiv;
      }
    } else {
      // fallback: use card itself
      contentCell = card;
    }
    rows.push([img, contentCell]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
