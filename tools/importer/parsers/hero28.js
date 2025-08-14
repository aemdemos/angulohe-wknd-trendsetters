/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: block name matches example
  const headerRow = ['Hero (hero28)'];

  // 2. Extract background image (2nd row)
  // The image is inside the first grid cell of .w-layout-grid
  let imgCell = '';
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid > div');
  if (gridDivs.length > 0) {
    const imgEl = gridDivs[0].querySelector('img');
    if (imgEl) {
      imgCell = imgEl; // Reference the original img element
    }
  }
  // If not found, leave cell empty

  // 3. Extract content (title, subheading, cta) (3rd row)
  // The content is inside the second grid cell
  let contentCell = '';
  if (gridDivs.length > 1) {
    // The .container div contains heading and CTAs (if any), reference whole block for resilience
    contentCell = gridDivs[1];
  }
  // If not found, leave cell empty

  // 4. Compose the table rows
  const cells = [
    headerRow,
    [imgCell],
    [contentCell]
  ];

  // 5. Create block table using provided helper
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 6. Replace the original element with the new table
  element.replaceWith(table);
}
