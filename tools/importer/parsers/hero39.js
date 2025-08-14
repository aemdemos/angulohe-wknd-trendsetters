/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: EXACTLY as specified
  const headerRow = ['Hero (hero39)'];

  // Background image extraction
  let bgImg = null;
  // Find the first .cover-image img within the block
  bgImg = element.querySelector('img.cover-image');

  // Compose content cell with all relevant hero text + CTA
  // Find the main grid div (contains two child divs: image and content)
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  let heroContent = [];

  if (mainGrid) {
    const gridChildren = mainGrid.querySelectorAll(':scope > div');
    // Second child is content block
    if (gridChildren.length > 1) {
      const contentDiv = gridChildren[1];
      // Find the inner grid with headings and paragraph/button
      const innerGrid = contentDiv.querySelector('.w-layout-grid');
      if (innerGrid) {
        // Heading level 1
        const h1 = innerGrid.querySelector('h1');
        if (h1) heroContent.push(h1);
        // Subheading paragraph and button group are inside flex-vertical
        const flexVertical = innerGrid.querySelector('.flex-vertical');
        if (flexVertical) {
          // Paragraph
          const paragraph = flexVertical.querySelector('p');
          if (paragraph) heroContent.push(paragraph);
          // Call-to-action link
          const buttonGroup = flexVertical.querySelector('.button-group');
          if (buttonGroup) {
            // Only take the first link (if multiple)
            const cta = buttonGroup.querySelector('a');
            if (cta) heroContent.push(cta);
          }
        }
      }
    }
  }

  // Ensure that empty cells are handled gracefully
  const cells = [
    headerRow,
    [bgImg ? bgImg : ''],
    [heroContent.length ? heroContent : '']
  ];

  // Create table and replace original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
