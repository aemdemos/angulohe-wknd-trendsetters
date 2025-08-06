/* global WebImporter */
export default function parse(element, { document }) {
  // Build the table header as in the example
  const cells = [['Cards (cards23)']];

  // Get all .w-tab-pane (tab content panes)
  const tabPanes = element.querySelectorAll('.w-tab-pane');

  tabPanes.forEach(tabPane => {
    // Each .w-tab-pane contains a .w-layout-grid with the cards
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an <a> direct child of the grid
    const cardLinks = Array.from(grid.children).filter(child => child.tagName === 'A');
    cardLinks.forEach(card => {
      // First cell: image (if any)
      let img = card.querySelector('.utility-aspect-3x2 img');
      const firstCell = img ? img : '';

      // Second cell: text content (heading, then description)
      // Card content might be flat or wrapped; always try to find heading, then description
      // Only use those NOT inside the image wrapper

      // Heading: h3 or .h4-heading not inside .utility-aspect-3x2
      let heading = card.querySelector('h3, .h4-heading');
      if (heading && img && heading.compareDocumentPosition(img) & Node.DOCUMENT_POSITION_CONTAINED_BY) {
        // If heading is inside image div, ignore
        heading = null;
      }

      // Description: .paragraph-sm not inside .utility-aspect-3x2
      let descs = Array.from(card.querySelectorAll('.paragraph-sm'));
      let description = descs.find(desc => !img || !(img.parentElement && img.parentElement.contains(desc)));

      // Compose the text cell
      const contentArr = [];
      if (heading) contentArr.push(heading);
      if (description) contentArr.push(description);
      // fallback: ensure at least one text node
      const secondCell = contentArr.length > 0 ? contentArr : '';
      // Only add if at least heading or description is found
      if (firstCell || secondCell) {
        cells.push([firstCell, secondCell]);
      }
    });
  });

  // Create & replace table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
