/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid of columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children representing columns
  const colDivs = Array.from(grid.children);

  // For each column, extract all meaningful content inside the column (typically image)
  // If you want to include more than just images, collect all children of the inner-most div
  const cellsRow = colDivs.map(colDiv => {
    // Typically the structure is: colDiv > innerDiv > img
    // We'll take the deepest div (if any), else fallback to colDiv
    let contentDiv = colDiv;
    // There may be a div inside the column div
    if (colDiv.children.length === 1 && colDiv.firstElementChild.tagName === 'DIV') {
      contentDiv = colDiv.firstElementChild;
    }
    // If the contentDiv has only one image, use the image
    const img = contentDiv.querySelector('img');
    if (img && contentDiv.childElementCount === 1) {
      return img;
    } else {
      // Otherwise put all direct children of contentDiv in this cell
      return Array.from(contentDiv.childNodes).filter(
        node => node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())
      );
    }
  });

  // Compose header, exactly as specified
  const headerRow = ['Columns (columns16)'];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cellsRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
