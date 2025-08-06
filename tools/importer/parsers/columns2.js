/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // The three main columns are the first three direct children
  const cols = Array.from(grid.children).slice(0, 3);
  if (cols.length < 3) return;

  // Column 1: the main feature block (left)
  const col1 = cols[0];

  // Column 2: contains two blocks (each an <a>), wrap all <a> in a fragment
  const col2 = document.createDocumentFragment();
  Array.from(cols[1].children).forEach(child => {
    if (child.tagName === 'A') col2.appendChild(child);
  });

  // Column 3: contains multiple <a> blocks, wrap all <a> in a fragment
  const col3 = document.createDocumentFragment();
  Array.from(cols[2].children).forEach(child => {
    if (child.tagName === 'A') col3.appendChild(child);
  });

  // Table header is a single column, content row has three columns
  const cells = [
    ['Columns (columns2)'],
    [col1, col2, col3],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
