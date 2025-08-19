/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row exactly
  const headerRow = ['Hero (hero39)'];

  // === Background Image row ===
  // Try to find the main background image (should be the only prominent <img> in the hero)
  let bgImg = element.querySelector('img');
  const imageRow = [bgImg ? bgImg : ''];

  // === Content (heading, paragraph, CTA) ===
  // Find the container holding heading/paragraph/cta
  // The structure includes a grid with two main children: first is image, second is content
  // Get all first-level grid children:
  let gridBlocks = element.querySelectorAll(':scope > div > div');
  let contentRoot = null;
  if (gridBlocks.length > 1) {
    // The second one (index 1) contains the text stack
    // Inside that might be another grid, then the .flex-vertical .flex-gap-xs for text+cta
    let possibleGrid = gridBlocks[1].querySelector('.grid-layout');
    if (possibleGrid) {
      // Inside this grid, the .flex-vertical.flex-gap-xs holds para + cta
      let flex = possibleGrid.querySelector('.flex-vertical');
      if (flex) {
        contentRoot = [
          possibleGrid.querySelector('h1'),
          flex
        ];
      } else {
        // fallback: use all direct children
        contentRoot = Array.from(possibleGrid.children);
      }
    } else {
      // fallback: use all direct children
      contentRoot = Array.from(gridBlocks[1].children);
    }
  }
  // If something went wrong, fallback to top-level text
  if (!contentRoot) {
    contentRoot = [
      element.querySelector('h1'),
      element.querySelector('p'),
      element.querySelector('a')
    ].filter(Boolean);
  }

  // Compose content row
  const contentRow = [contentRoot];

  // Assemble cells array: header, image, content
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  // Create the table block and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
