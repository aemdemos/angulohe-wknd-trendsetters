/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: must match example exactly
  const headerRow = ['Hero (hero12)'];

  // 2. Background image row (top-level background image)
  // The background image is the first image inside the first grid column
  let bgImg = null;
  const grid = element.querySelector('.w-layout-grid');
  if (grid && grid.children.length > 0) {
    const bgDiv = grid.children[0];
    bgImg = bgDiv.querySelector('img.cover-image');
  }

  // 3. Content row: headline, subheading, CTA, etc. (all within the .card block)
  let contentBlock = null;
  if (grid && grid.children.length > 1) {
    const cardContainer = grid.children[1];
    contentBlock = cardContainer.querySelector('.card');
  }

  // Compose rows; always output 3 rows (header, bg image, content), with nulls filtered
  const cells = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentBlock ? contentBlock : '']
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
