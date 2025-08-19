/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches exactly
  const headerRow = ['Hero (hero39)'];

  // Get the grid containing image and content
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  let backgroundImg = null;
  let contentBlock = [];

  if (grid) {
    const gridChildren = grid.querySelectorAll(':scope > div');
    // Background image
    if (gridChildren[0]) {
      const img = gridChildren[0].querySelector('img');
      if (img) {
        backgroundImg = img;
      }
    }
    // Content (title, subheading, CTA)
    if (gridChildren[1]) {
      const textGrid = gridChildren[1].querySelector('.w-layout-grid');
      if (textGrid) {
        // Heading
        const h1 = textGrid.querySelector('h1');
        if (h1) contentBlock.push(h1);
        // Subheading (paragraph)
        const subParagraph = textGrid.querySelector('p');
        if (subParagraph) contentBlock.push(subParagraph);
        // CTA (anchor/button)
        const btnGroup = textGrid.querySelector('.button-group');
        let cta = null;
        if (btnGroup) {
          cta = btnGroup.querySelector('a');
        }
        if (cta) contentBlock.push(cta);
      }
    }
  }
  // Edge case fallback: if no image or no content, ensure the table still forms 3 rows
  const cells = [
    headerRow,
    [backgroundImg ? backgroundImg : ''],
    [contentBlock.length ? contentBlock : '']
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
