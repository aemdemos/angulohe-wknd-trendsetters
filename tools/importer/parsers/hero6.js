/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: exact match to example
  const headerRow = ['Hero (hero6)'];

  // Second row: Background image (optional)
  let bgImg = '';
  const img = element.querySelector('img.cover-image');
  if (img) {
    bgImg = img; // use the original image element
  }
  const bgImgRow = [bgImg];

  // Third row: Title, Subheading, CTAs
  // Gather these from the .card block if present
  let contentCell = document.createElement('div');
  const card = element.querySelector('.card');
  if (card) {
    // Heading
    const heading = card.querySelector('h1, .h1-heading');
    if (heading) contentCell.appendChild(heading);
    // Subheading/paragraph, allow for .subheading or p
    const subheading = card.querySelector('p, .subheading');
    if (subheading) contentCell.appendChild(subheading);
    // Buttons/Links group
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) {
      const buttons = buttonGroup.querySelectorAll('a');
      buttons.forEach(btn => contentCell.appendChild(btn));
    }
  }
  const contentRow = [contentCell];

  // Build table
  const cells = [headerRow, bgImgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
