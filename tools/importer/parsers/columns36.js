/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row should match the example block name
  const headerRow = ['Columns (columns36)'];

  // 2. Extract the two main columns
  //    - The first column: left content (heading, subheading, buttons)
  //    - The second column: right content (all images)
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  let leftCellContent = [];
  let rightCellContent = [];

  if (grid) {
    // Get direct children, corresponding to columns
    const cols = Array.from(grid.children);
    // First column (text + buttons)
    if (cols[0]) {
      // Grab all elements (heading, subheading, button group) in column
      // Reference them directly for semantic meaning and resilience
      const heading = cols[0].querySelector('h1');
      if (heading) leftCellContent.push(heading);
      const subheading = cols[0].querySelector('p');
      if (subheading) leftCellContent.push(subheading);
      const buttonGroup = cols[0].querySelector('.button-group');
      if (buttonGroup) leftCellContent.push(buttonGroup);
    }
    // Second column (images)
    if (cols[1]) {
      const imagesGrid = cols[1].querySelector('.w-layout-grid');
      if (imagesGrid) {
        const imgs = imagesGrid.querySelectorAll('img');
        imgs.forEach(img => rightCellContent.push(img));
      }
    }
  }

  // Ensure semantic grouping: cell arrays can be empty if no data
  const row = [leftCellContent, rightCellContent];

  // Final block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row
  ], document);

  // Replace the original block with the new table
  element.replaceWith(table);
}
