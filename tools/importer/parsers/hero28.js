/* global WebImporter */
export default function parse(element, { document }) {
  // Header row (must match the block name exactly)
  const headerRow = ['Hero (hero28)'];

  // 1. Extract the background image (optional)
  let bgImg = null;
  const grid = element.querySelector('.w-layout-grid');
  if (grid) {
    // Look for an img element in any of the direct children
    const gridChildren = grid.querySelectorAll(':scope > div');
    for (const div of gridChildren) {
      const img = div.querySelector('img');
      if (img) {
        bgImg = img;
        break;
      }
    }
  }
  const imageRow = [bgImg || ''];

  // 2. Extract the title, subheading, CTA (all text content)
  // According to the HTML, the title is in h1 in the second grid child
  let contentCell = [];
  if (grid) {
    const gridChildren = grid.querySelectorAll(':scope > div');
    // The second grid child appears to contain the text content
    if (gridChildren.length > 1) {
      const textContainer = gridChildren[1].querySelector('.utility-margin-bottom-6rem');
      if (textContainer) {
        // We'll collect all child nodes that are meaningful (headings, paragraphs, button groups)
        for (const child of textContainer.childNodes) {
          if (child.nodeType === 1) { // Element
            // Only include h1, h2, h3, p, or .button-group
            if (/^H[1-6]$/.test(child.tagName) || child.classList.contains('button-group')) {
              contentCell.push(child);
            }
          }
        }
      }
    }
  }
  // If no content found, leave cell empty string
  const textRow = [contentCell.length ? contentCell : ''];

  // 3. Compose the table rows
  const cells = [
    headerRow,
    imageRow,
    textRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
