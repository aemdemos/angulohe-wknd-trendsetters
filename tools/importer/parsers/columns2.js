/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout within the element
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // The grid should have 3 main children:
  // 1. Left (main column): big card w/ image, tag, heading, paragraph
  // 2. Center (vertical): 2 cards, each with image, tag, heading, paragraph
  // 3. Right (vertical): vertical stack of small cards with heading and paragraph, separated with dividers
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 3) return;
  const leftCol = gridChildren[0];
  const centerCol = gridChildren[1];
  const rightCol = gridChildren[2];

  // For left and center, wrap entire content
  // For right, filter out empty text nodes
  const leftContent = leftCol;
  
  // Center: only the <a class="utility-link-content-block ..."> elements inside the center col
  const centerContent = Array.from(centerCol.querySelectorAll('a.utility-link-content-block'));

  // Right: collect all a.utility-link-content-block and divider elements in order
  const rightContent = [];
  rightCol.childNodes.forEach(child => {
    if (child.nodeType === 1) { // element nodes only
      rightContent.push(child);
    }
  });

  // Compose the table: header row (one cell), then columns row (three cells)
  const cells = [
    ['Columns (columns2)'], // header row: one cell ONLY
    [leftContent, centerContent, rightContent], // columns row: three cells
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
