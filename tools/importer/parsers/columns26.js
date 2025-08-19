/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: make sure .container and main grid exist
  const container = element.querySelector('.container');
  if (!container) return;
  // Find main grid with columns (expecting w-layout-grid)
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;
  // Get direct children of the column grid
  const gridChildren = Array.from(mainGrid.children);
  // There should be three children: heading, quote, and inner grid for divider/author/logo
  if (gridChildren.length < 3) return;

  // Column 1: heading and quote
  const heading = gridChildren[0]; // <p class="h2-heading">
  const quote = gridChildren[1];   // <p class="paragraph-lg">

  // Column 2: inner grid containing divider, author, and logo/svg
  const innerGrid = gridChildren[2]; // id="w-node-..." class="w-layout-grid ..."
  // Grab innerGrid's direct children: divider, flex-horizontal (author), logo/svg
  const innerGridChildren = Array.from(innerGrid.children);
  // Defensive for layout variations

  // Find divider, authorBar, and logo
  // Usually: [divider, authorBar, logo] but order may vary
  let divider = null, authorBar = null, logoSvg = null;
  innerGridChildren.forEach(child => {
    if (child.classList.contains('divider')) divider = child;
    else if (child.classList.contains('flex-horizontal')) authorBar = child;
    else if (child.tagName.toLowerCase() === 'div' && child.querySelector('svg')) logoSvg = child.querySelector('svg');
    else if (child.tagName.toLowerCase() === 'div' && child.querySelector('svg,svg *')) logoSvg = child.querySelector('svg');
    else if (child.tagName.toLowerCase() === 'div' && child.querySelector('img')) authorBar = child;
    else if (child.tagName.toLowerCase() === 'svg') logoSvg = child;
  });
  // If logoSvg is still null, try to get svg directly from last child
  if (!logoSvg && innerGridChildren.length > 0 && innerGridChildren[innerGridChildren.length-1].querySelector) {
    logoSvg = innerGridChildren[innerGridChildren.length-1].querySelector('svg');
  }

  // Compose left and right columns
  // Left: heading, quote, divider, authorBar (with avatar and author info)
  // Right: logoSvg (or leave empty if not present)
  const leftColumnContent = [];
  if (heading) leftColumnContent.push(heading);
  if (quote) leftColumnContent.push(quote);
  if (divider) leftColumnContent.push(divider);
  if (authorBar) leftColumnContent.push(authorBar);

  // Right column: logoSvg (if present)
  const rightColumnContent = [];
  if (logoSvg) rightColumnContent.push(logoSvg);

  // Table header row as specified
  const headerRow = ['Columns (columns26)'];
  // Columns row: exactly two columns as in the example
  const columnsRow = [leftColumnContent, rightColumnContent];

  // Create table
  const table = WebImporter.DOMUtils.createTable([headerRow, columnsRow], document);
  // Replace element in DOM
  element.replaceWith(table);
}
