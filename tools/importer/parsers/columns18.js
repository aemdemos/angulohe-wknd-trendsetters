/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container which organizes the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid layout
  const columns = Array.from(grid.children);

  // Prepare header row as specified
  const headerRow = ['Columns (columns18)'];

  // Identify cells for the columns: left is text + contacts, right is image
  let leftCellContent = [];
  let rightCellContent = [];

  // Left column is typically:
  //   - an info div containing headings (h2, h3) and paragraph
  //   - a contacts <ul>
  // Right column is the image
  // We'll collect these dynamically and reference DOM nodes directly
  let infoDiv = null;
  let contactsUl = null;
  let imageEl = null;

  columns.forEach(child => {
    if (child.tagName === 'DIV' && !infoDiv) {
      infoDiv = child;
    }
    if (child.tagName === 'UL' && !contactsUl) {
      contactsUl = child;
    }
    if (child.tagName === 'IMG' && !imageEl) {
      imageEl = child;
    }
  });

  // Compose left cell: infoDiv (headings/desc) + contactsUl (contact list)
  if (infoDiv) leftCellContent.push(infoDiv);
  if (contactsUl) leftCellContent.push(contactsUl);

  // Compose right cell: image
  if (imageEl) rightCellContent.push(imageEl);

  // Edge case: ensure at least one cell per column
  if (leftCellContent.length === 0) {
    // Try to fallback on first DIV or UL in the grid
    const fallbackDiv = grid.querySelector('div');
    if (fallbackDiv) leftCellContent.push(fallbackDiv);
    const fallbackUl = grid.querySelector('ul');
    if (fallbackUl) leftCellContent.push(fallbackUl);
  }
  if (rightCellContent.length === 0) {
    const fallbackImg = grid.querySelector('img');
    if (fallbackImg) rightCellContent.push(fallbackImg);
  }

  // Compose the table cells (columns)
  const cells = [
    headerRow,
    [leftCellContent, rightCellContent]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with table block
  element.replaceWith(block);
}
