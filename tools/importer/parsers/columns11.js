/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single column, block name exactly as in example
  const headerRow = ['Columns (columns11)'];

  // Find top grid: left and right columns for first content row
  const mainGrid = element.querySelector('.grid-layout.tablet-1-column.grid-gap-lg');
  let leftCell = '', rightCell = '';

  if (mainGrid) {
    // LEFT: Eyebrow and Heading
    const leftCol = mainGrid.children[0];
    const leftContent = [];
    if (leftCol) {
      const eyebrow = leftCol.querySelector('.eyebrow');
      if (eyebrow) leftContent.push(eyebrow);
      const heading = leftCol.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) leftContent.push(heading);
    }
    leftCell = leftContent.length === 1 ? leftContent[0] : leftContent;

    // RIGHT: Description, author info, button
    const rightCol = mainGrid.children[1];
    const rightContent = [];
    if (rightCol) {
      const desc = rightCol.querySelector('.rich-text');
      if (desc) rightContent.push(desc);
      const grid = rightCol.querySelector('.grid-layout');
      if (grid) {
        const authorRow = grid.querySelector('.flex-horizontal');
        if (authorRow) rightContent.push(authorRow);
        const readMoreBtn = grid.querySelector('a.button');
        if (readMoreBtn) rightContent.push(readMoreBtn);
      }
    }
    rightCell = rightContent.length === 1 ? rightContent[0] : rightContent;
  }

  // First content row: two columns
  const firstContentRow = [leftCell, rightCell];

  // Find image grid: next row of two images
  const imageGrid = element.querySelector('.grid-layout.mobile-portrait-1-column');
  let imageRow = ['', ''];
  if (imageGrid) {
    const imgDivs = imageGrid.querySelectorAll('.utility-aspect-1x1');
    // Ensure exactly two columns as in example
    imageRow = Array.from(imgDivs).map(div => {
      const img = div.querySelector('img');
      return img ? img : '';
    });
    // If less than 2 images, pad with empty string
    while (imageRow.length < 2) imageRow.push('');
    // If more than 2 images, slice
    imageRow = imageRow.slice(0, 2);
  }

  // As per fix: first row is single column, content/image rows are two columns
  const rows = [headerRow, firstContentRow, imageRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
