/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Get the main content grids
  const mainGrid = element.querySelector('.grid-layout.tablet-1-column.grid-gap-lg');
  const lowerGrid = element.querySelector('.grid-layout.mobile-portrait-1-column.grid-gap-md');

  // 2. Get each main column (these are the top row columns in the block)
  const mainCols = mainGrid ? Array.from(mainGrid.children) : [];
  const leftCol = mainCols[0];
  const rightCol = mainCols[1];

  // 3. Left column content: eyebrow and heading
  let leftCell = [];
  if (leftCol) {
    const eyebrow = leftCol.querySelector('.eyebrow');
    const heading = leftCol.querySelector('h1, h2, h3, h4, h5, h6');
    if (eyebrow) leftCell.push(eyebrow);
    if (heading) leftCell.push(heading);
  }

  // 4. Right column content: rich paragraph, author, button
  let rightCell = [];
  if (rightCol) {
    const richtext = rightCol.querySelector('.rich-text');
    if (richtext) rightCell.push(richtext);
    const author = rightCol.querySelector('.flex-horizontal.y-center.flex-gap-xs');
    if (author) rightCell.push(author);
    const button = rightCol.querySelector('.button');
    if (button) rightCell.push(button);
  }

  // 5. Lower grid: two images for the next row
  let imgCell1 = null;
  let imgCell2 = null;
  if (lowerGrid) {
    const imgDivs = Array.from(lowerGrid.children);
    imgCell1 = imgDivs[0] ? imgDivs[0].querySelector('img') : null;
    imgCell2 = imgDivs[1] ? imgDivs[1].querySelector('img') : null;
  }

  // 6. Compose all rows for the block table
  // FIX: header row must be a single-element array so createTable renders only one <th> spanning all columns
  const cells = [
    ['Columns (columns11)'], // header row, single cell
    [leftCell, rightCell],   // first row: two columns
    [imgCell1, imgCell2]     // second row: two columns (images)
  ];

  // 7. Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
