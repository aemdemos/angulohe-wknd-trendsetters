/* global WebImporter */
export default function parse(element, { document }) {
  // Get direct children divs of the section
  const topDivs = element.querySelectorAll(':scope > div');

  // Row 2: Background image (optional)
  let backgroundImg = null;
  for (const div of topDivs) {
    const img = div.querySelector('img.cover-image.utility-position-absolute');
    if (img) {
      backgroundImg = img;
      break;
    }
  }

  // Row 3: Content (headline, features, CTA)
  let cardBody = null;
  for (const div of topDivs) {
    // This finds the inner card body only
    const body = div.querySelector('.card-body');
    if (body) {
      cardBody = body;
      break;
    }
  }

  // Build table rows
  const rows = [];
  // 1st row: Table header
  rows.push(['Hero (hero12)']);
  // 2nd row: Background image (if any)
  rows.push([backgroundImg ? backgroundImg : '']);
  // 3rd row: All content (heading, features, CTA)
  rows.push([cardBody ? cardBody : '']);

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
