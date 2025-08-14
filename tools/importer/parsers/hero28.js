/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches exactly
  const headerRow = ['Hero (hero28)'];

  // Extract background image (if exists)
  let imageEl = null;
  const gridLayout = element.querySelector('.w-layout-grid');
  if (gridLayout) {
    // The first grid child is usually image container
    const firstGridChild = gridLayout.children[0];
    if (firstGridChild) {
      // Search for the background image inside
      const parallaxDiv = firstGridChild.querySelector('.ix-parallax-scale-out-hero');
      if (parallaxDiv) {
        const img = parallaxDiv.querySelector('img');
        if (img) {
          imageEl = img;
        }
      }
    }
  }

  // Extract text content (title, subtitle, CTA)
  let textContentEl = null;
  if (gridLayout && gridLayout.children.length > 1) {
    const secondGridChild = gridLayout.children[1];
    // The text is within a container with utility-margin-bottom-6rem
    const textHolder = secondGridChild.querySelector('.utility-margin-bottom-6rem');
    if (textHolder) {
      textContentEl = textHolder;
    }
  }

  // Table structure: 1 column, 3 rows, header and content
  // Use empty string for missing image/textContent for robustness
  const rows = [
    headerRow,
    [imageEl ? imageEl : ''],
    [textContentEl ? textContentEl : ''],
  ];

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
