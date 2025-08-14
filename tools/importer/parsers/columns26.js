/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main container
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Find the inner grid that represents the columns area
  let innerGrid = null;
  Array.from(grid.children).forEach(child => {
    if (child.classList.contains('w-layout-grid') && child !== grid) {
      innerGrid = child;
    }
  });
  if (!innerGrid) return;

  // Gather header elements (top <p>s)
  const headerEls = [];
  Array.from(grid.children).forEach(child => {
    if (child.tagName.toLowerCase() === 'p') {
      headerEls.push(child);
    }
  });

  // Compose left and right column content from inner grid
  let leftCol = document.createElement('div');
  let rightCol = document.createElement('div');
  Array.from(innerGrid.children).forEach(child => {
    if (
      child.classList.contains('divider') ||
      child.classList.contains('flex-horizontal')
    ) {
      leftCol.appendChild(child);
    } else if (child.classList.contains('utility-display-inline-block')) {
      rightCol.appendChild(child);
    }
  });

  // Compose left cell: heading, quote, divider, avatar, author name
  const leftColContent = document.createElement('div');
  headerEls.forEach(el => leftColContent.appendChild(el));
  Array.from(leftCol.children).forEach(el => leftColContent.appendChild(el));

  // Compose right cell: logo/svg
  const rightColContent = document.createElement('div');
  Array.from(rightCol.children).forEach(el => rightColContent.appendChild(el));

  // Correct table structure: header is a single column, then content row with two columns
  const cells = [
    ['Columns (columns26)'], // header row: one column only
    [leftColContent, rightColContent], // content row: two columns
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
