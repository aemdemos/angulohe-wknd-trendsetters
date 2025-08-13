/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row EXACTLY matching the example
  const headerRow = ['Columns (columns2)'];

  // 2. Find the grid layout for columns (should be the main multi-column group)
  const mainContainer = element.querySelector('.container');
  const gridLayout = mainContainer && mainContainer.querySelector('.grid-layout');

  // Edge case: If missing structure, fallback gracefully to empty columns (maintain 3 columns for layout)
  if (!gridLayout) {
    const emptyRow = [document.createElement('div'), document.createElement('div'), document.createElement('div')];
    const table = WebImporter.DOMUtils.createTable([
      headerRow,
      emptyRow
    ], document);
    element.replaceWith(table);
    return;
  }

  // 3. Extract left/main column (first child is the main big feature block)
  const gridChildren = Array.from(gridLayout.children);
  let leftColBlock = null, middleColBlock = null, rightColBlock = null;

  // The first grid child is the big feature left column
  leftColBlock = gridChildren[0];

  // The second grid child is a flex containing multiple stacked image+text cards for middle column
  // Find all <a> blocks inside it
  middleColBlock = gridChildren[1];
  const middleColBlocks = Array.from(middleColBlock.querySelectorAll('a.utility-link-content-block'));
  // We want to reference them directly in a vertical container
  const middleDiv = document.createElement('div');
  middleColBlocks.forEach(block => {
    middleDiv.appendChild(block);
  });

  // The third grid child is a flex containing only text blocks and dividers for right column
  rightColBlock = gridChildren[2];
  // Keep original children structure (text blocks & dividers)
  const rightDiv = document.createElement('div');
  Array.from(rightColBlock.children).forEach(child => {
    rightDiv.appendChild(child);
  });

  // 4. Compose final table rows (always 3 columns as in the example)
  const contentRow = [leftColBlock, middleDiv, rightDiv];

  // 5. Create table and replace element
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
