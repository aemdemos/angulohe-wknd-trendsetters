/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main grid for textual content
  const mainGrid = element.querySelector('.grid-layout.tablet-1-column');
  let leftCol = [];
  if (mainGrid) {
    const headlineSection = mainGrid.children[0];
    const contentSection = mainGrid.children[1];
    if (headlineSection) leftCol.push(headlineSection);
    if (contentSection) leftCol.push(contentSection);
  }

  // Get the image grid for visual content
  const imageGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let rightCol = [];
  if (imageGrid) {
    const imgs = imageGrid.querySelectorAll('img');
    imgs.forEach(img => {
      rightCol.push(img);
    });
  }

  // Correct: header row is a single column
  const cells = [
    ['Columns (columns11)'],
    [leftCol, rightCol]
  ];

  // To ensure header row is a single cell with colspan, create table and manually set colspan if necessary
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Find the header row (first tr) and set the th's colspan
  const headerTr = table.querySelector('tr:first-child');
  if (headerTr && headerTr.children.length === 1 && cells[1].length > 1) {
    headerTr.children[0].setAttribute('colspan', cells[1].length);
  }

  element.replaceWith(table);
}
