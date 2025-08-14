/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as specified
  const headerRow = ['Hero (hero6)'];

  // Safely find background image (img element)
  let imgElem = null;
  const imgCandidates = element.querySelectorAll('img');
  if (imgCandidates.length > 0) {
    // Use the first image as background if present
    imgElem = imgCandidates[0];
  }

  // Find card container holding the heading, subheading, and CTAs
  let contentBlock = null;
  // The card with text is nested, find it
  contentBlock = element.querySelector('.card');

  // If there is no .card, fallback to div with heading
  if (!contentBlock) {
    // Try to find heading and paragraph inside the element
    const fallbackDiv = document.createElement('div');
    const heading = element.querySelector('h1, h2, h3, h4, h5, h6');
    const subheading = element.querySelector('p');
    if (heading) fallbackDiv.appendChild(heading);
    if (subheading) fallbackDiv.appendChild(subheading);
    if (fallbackDiv.childNodes.length > 0) {
      contentBlock = fallbackDiv;
    }
  }

  // Compose table as per specification: 1 column, 3 rows
  const cells = [
    headerRow,
    [imgElem ? imgElem : ''],
    [contentBlock ? contentBlock : '']
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}
