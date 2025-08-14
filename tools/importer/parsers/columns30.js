/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid (columns root)
  const grid = element.querySelector('.grid-layout');
  let columns = [];

  if (grid) {
    // We expect three columns (visually, left/tag+heading/text from center/right)
    // Identify children
    const gridChildren = Array.from(grid.children);
    // Defensive: check number of children
    // Example HTML: [author(left), tags, heading, richtext]
    // We want first column: author & tags, second: heading, third: richtext
    // Group semantically: first two as left col, then heading, then copy
    const col1 = document.createElement('div');
    col1.appendChild(gridChildren[0]); // author
    col1.appendChild(gridChildren[1]); // tags
    const col2 = gridChildren[2]; // heading
    const col3 = gridChildren[3]; // richtext
    columns = [col1, col2, col3];
  } else {
    // fallback: treat all children as one column
    columns = [element];
  }

  const headerRow = ['Columns (columns30)'];
  const contentRow = columns;
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
