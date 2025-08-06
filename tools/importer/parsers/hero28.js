/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly matches 'Hero (hero28)'
  const headerRow = ['Hero (hero28)'];

  // Find the background image (img inside first grid div)
  let backgroundImg = null;
  const gridLayout = element.querySelector('.grid-layout');
  if (gridLayout) {
    const gridDivs = gridLayout.querySelectorAll(':scope > div');
    for (const div of gridDivs) {
      const img = div.querySelector('img');
      if (img) {
        backgroundImg = img;
        break;
      }
    }
  }

  // Find the content: title (h1), subheading (none in example), CTA (none in example)
  // In this HTML, h1 is in utility-margin-bottom-6rem inside grid-layout > div
  let contentEls = [];
  if (gridLayout) {
    const gridDivs = gridLayout.querySelectorAll(':scope > div');
    for (const div of gridDivs) {
      const marginBox = div.querySelector('.utility-margin-bottom-6rem');
      if (marginBox) {
        // Only add children that have content (skip empty button-group)
        Array.from(marginBox.children).forEach(child => {
          if (child.tagName.toLowerCase() === 'h1' || child.querySelector('h1')) {
            contentEls.push(child);
          } else if (child.textContent.trim()) {
            contentEls.push(child);
          }
        });
        break;
      }
    }
  }

  // Fallbacks if no content found, but always send as array
  if (!contentEls.length) {
    contentEls = [];
  }

  // Compose table rows (3 rows, 1 cell each)
  const rows = [
    headerRow,
    [backgroundImg].filter(Boolean), // Row 2: background image if it exists
    [contentEls.length > 1 ? contentEls : contentEls[0] || ''] // Row 3: title/subhead/cta if present
  ];

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
