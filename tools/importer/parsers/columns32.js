/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid container inside the section
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid block
  const gridChildren = Array.from(grid.children);

  // This block has 2 columns: an image and a content div
  // Find the image element
  const imgElem = gridChildren.find(child => child.tagName && child.tagName.toLowerCase() === 'img');
  // Find the content element (the div next to the image)
  const contentElem = gridChildren.find(child => child !== imgElem);

  // Table header matches the block name exactly
  const headerRow = ['Columns (columns32)'];
  // Second row: columns (img and content)
  const contentRow = [imgElem, contentElem];

  // Build the table block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
