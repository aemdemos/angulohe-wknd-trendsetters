/* global WebImporter */
export default function parse(element, { document }) {
  // Find the layout grid
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const children = Array.from(grid.children);

  // We expect 3 main pieces: left content, right list, image.
  // Identify them by their tags and content
  let leftCol = null, rightCol = null, imgCol = null;
  children.forEach(child => {
    if (!leftCol && child.querySelector('h2')) {
      leftCol = child; // Contains heading and paragraph
    } else if (!rightCol && child.tagName === 'UL') {
      rightCol = child; // Contact methods list
    } else if (!imgCol && child.tagName === 'IMG') {
      imgCol = child; // Image
    }
  });

  // Compose the left cell: leftCol and rightCol stacked as a block
  const leftCellContent = [];
  if (leftCol) leftCellContent.push(leftCol);
  if (rightCol) leftCellContent.push(rightCol);

  // Compose the second row: left is all text/list, right is the image
  // If the image is missing, just one column
  const headerRow = ['Columns (columns18)'];
  const secondRow = imgCol ? [leftCellContent, imgCol] : [leftCellContent];

  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
