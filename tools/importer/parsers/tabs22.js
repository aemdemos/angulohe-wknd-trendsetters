/* global WebImporter */
export default function parse(element, { document }) {
  // Block name for header, exactly as in example
  const headerRow = ['Tabs'];

  // Get tab menu and tab content containers
  const children = element.querySelectorAll(':scope > div');
  if (children.length < 2) return; // edge: not enough structure
  const tabMenu = children[0];
  const tabContent = children[1];

  // Extract tab labels
  // Each tab menu link is an <a> with a <div> inside holding the label
  const tabLinks = tabMenu.querySelectorAll('a');
  const labels = Array.from(tabLinks).map(link => {
    const labelDiv = link.querySelector('div');
    return labelDiv ? labelDiv.textContent.trim() : link.textContent.trim();
  });

  // Extract tab panes
  const tabPanes = tabContent.querySelectorAll('.w-tab-pane');

  // Build the table rows: each tab is one row, first cell = label, second = all pane content
  const cells = [headerRow];
  for (let i = 0; i < labels.length && i < tabPanes.length; i++) {
    // For the tab content, take all direct children of .w-layout-grid (if present), else of pane
    const grid = tabPanes[i].querySelector('.w-layout-grid');
    let contentElems;
    if (grid) {
      contentElems = Array.from(grid.children);
    } else {
      contentElems = Array.from(tabPanes[i].children);
    }
    // If multiple elements, pass as array to cell
    let tabCell = contentElems.length === 1 ? contentElems[0] : contentElems;
    // Only push row if both label and content are present
    if (labels[i] && tabCell) {
      cells.push([
        labels[i],
        tabCell
      ]);
    }
  }

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
