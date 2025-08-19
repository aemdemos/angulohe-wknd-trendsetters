/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row exactly as required
  const headerRow = ['Columns (columns5)'];

  // Find the main grid containing the columns
  const mainGrid = element.querySelector('.grid-layout.grid-gap-xxl');
  let leftCol = null;
  let rightCol = null;
  if (mainGrid) {
    // The first child is the content block, the second child is the image
    const children = Array.from(mainGrid.children);
    // Find left content: a div with h2
    leftCol = children.find(child => child.querySelector && child.querySelector('h2')) || null;
    // Find image: <img>
    rightCol = children.find(child => child.tagName === 'IMG') || null;
  }
  // Defensive: if not found, fallback to first div and first img inside element
  if (!leftCol) {
    leftCol = element.querySelector('div h2') ? element.querySelector('div h2').closest('div') : null;
  }
  if (!rightCol) {
    rightCol = element.querySelector('img');
  }
  // Ensure we always have a valid structure
  // If either is missing, fill with empty string to preserve columns
  const contentRow = [
    leftCol || '',
    rightCol || ''
  ];

  // Compose the cells array
  const cells = [
    headerRow,
    contentRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original
  element.replaceWith(block);
}
