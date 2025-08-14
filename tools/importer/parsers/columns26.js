/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content grid inside the section
  const container = element.querySelector('.container');
  const grid = container && container.querySelector('.grid-layout');
  if (!grid) return;

  // Get the primary children: [heading, paragraph, innerGrid]
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 3) return; // Edge case guard

  const heading = gridChildren[0]; // <p class="h2-heading ...">
  const quote = gridChildren[1];   // <p class="paragraph-lg ...">
  const innerGrid = gridChildren[2]; // <div class="w-layout-grid ...">

  // The innerGrid has: [divider, attribution (avatar/name), icon]
  const innerGridChildren = Array.from(innerGrid.children);
  // Defensive: innerGrid should have at least 3 children
  if (innerGridChildren.length < 3) return;
  // Attribution block (avatar + name/title)
  const attributionBlock = innerGridChildren[1];
  // Right column block (svg icon)
  const iconBlock = innerGridChildren[2];

  // Create left column: heading, quote, attribution
  const leftCol = document.createElement('div');
  leftCol.appendChild(heading);
  leftCol.appendChild(quote);
  leftCol.appendChild(attributionBlock);

  // Create right column: icon
  const rightCol = document.createElement('div');
  rightCol.appendChild(iconBlock);

  // Compose the table
  const cells = [
    ['Columns (columns26)'], // Header exactly as specified
    [leftCol, rightCol]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
