/* global WebImporter */
export default function parse(element, { document }) {
  // Parse the main content grid (2 columns)
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  let leftCellContent = [];
  let rightCellContent = [];

  if (mainGrid) {
    const [leftCol, rightCol] = mainGrid.children;
    // LEFT CELL: Title, eyebrow, etc.
    if (leftCol) {
      // Reference eyebrow and h1
      const eyebrow = leftCol.querySelector('.eyebrow');
      if (eyebrow) leftCellContent.push(eyebrow);
      const h1 = leftCol.querySelector('h1');
      if (h1) leftCellContent.push(h1);
    }
    if (rightCol) {
      // Paragraph summary
      const summaryDiv = rightCol.querySelector('.rich-text');
      if (summaryDiv) leftCellContent.push(summaryDiv);
      // Author block
      const metaBlock = rightCol.querySelector('.w-layout-grid.grid-layout');
      if (metaBlock) leftCellContent.push(metaBlock);
    }
  }

  // Parse images block (2 images)
  const imagesGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  if (imagesGrid) {
    // Each .utility-aspect-1x1 contains an image
    const images = Array.from(imagesGrid.querySelectorAll('.utility-aspect-1x1 img'));
    rightCellContent = images; // put both images in right cell
  }

  // Table header row must contain exactly one column
  const cells = [
    ['Columns (columns11)'],
    [leftCellContent, rightCellContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
