/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container that holds the three columns of content
  const mainContainer = element.querySelector('.container');
  if (!mainContainer) return;
  const mainGrid = mainContainer.querySelector('.w-layout-grid');
  if (!mainGrid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(mainGrid.children);
  // Defensive check: must have 3 columns as per the example screenshot
  if (gridChildren.length < 3) return;

  // First column: large card with image, tags, heading, paragraph
  const leftCard = gridChildren[0];
  // Second column: contains two stacked cards (each with image, tag, heading, paragraph)
  const middleColumn = gridChildren[1];
  // Third column: contains six stacked links (each with heading and paragraph, separated by dividers)
  const rightColumn = gridChildren[2];

  // For left column: use as is
  // For middle column: extract only .utility-link-content-block elements (ignore any spacing wrappers)
  const middleBlocks = Array.from(middleColumn.children).filter(e => e.classList.contains('utility-link-content-block'));
  const middleColDiv = document.createElement('div');
  middleBlocks.forEach(b => middleColDiv.appendChild(b));

  // For right column: only take .utility-link-content-block elements and ignore .divider and others
  const rightBlocks = Array.from(rightColumn.children).filter(e => e.classList.contains('utility-link-content-block'));
  const rightColDiv = document.createElement('div');
  rightBlocks.forEach(b => rightColDiv.appendChild(b));

  // Build the table, header exactly as in the example: 'Columns (columns2)'
  const headerRow = ['Columns (columns2)'];
  const contentRow = [leftCard, middleColDiv, rightColDiv];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original section element with the new table
  element.replaceWith(table);
}
