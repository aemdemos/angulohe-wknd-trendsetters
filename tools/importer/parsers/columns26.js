/* global WebImporter */
export default function parse(element, { document }) {
  // Get the inner container
  const container = element.querySelector('.container');
  if (!container) return;
  // Get the main grid inside the container
  const grid = container.querySelector('.w-layout-grid.grid-layout.y-bottom');
  if (!grid) return;

  // Identify left and right content columns
  // The left column contains the two paragraphs and the subgrid, which has the avatar and testimonial
  // There is only one grid: but it has as children: h2, paragraph, and then a subgrid for the bottom part
  const gridChildren = Array.from(grid.children);
  // Defensive: check for enough children
  // Based on the HTML: [h2, p, testimonial-grid]
  const col1Content = [];
  if (gridChildren.length > 0) {
    col1Content.push(gridChildren[0]); // h2
  }
  if (gridChildren.length > 1) {
    col1Content.push(gridChildren[1]); // paragraph
  }
  if (gridChildren.length > 2) {
    col1Content.push(gridChildren[2]); // subgrid with avatar row and logo svg
  }

  // The table is 2 columns: left is the main content, right is the logo,
  // but the right side (logo) is inside the subgrid as the last element
  // So, extract the logo row from the subgrid for the right column
  let col2Content = [];
  if (gridChildren.length > 2) {
    const subgrid = gridChildren[2];
    // Find the logo container (utility-display-inline-block)
    const logo = subgrid.querySelector('.utility-display-inline-block');
    if (logo) col2Content = [logo];
  }

  // The left column should NOT include the logo; remove logo from subgrid in col1Content
  if (col1Content.length === 3 && col2Content.length > 0) {
    // Remove the logo from the subgrid before pushing to col1Content
    const subgrid = col1Content[2];
    const logoEl = subgrid.querySelector('.utility-display-inline-block');
    if (logoEl) logoEl.remove();
  }

  // Table header matches exactly the block name
  const headerRow = ['Columns (columns26)'];
  const cells = [
    headerRow,
    [col1Content, col2Content]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
