/* global WebImporter */
export default function parse(element, { document }) {
  // The header row: block name only, single column per spec
  const headerRow = ['Tabs'];

  // Find the tab menu (labels) and tab content panels
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');

  if (!tabMenu || !tabContent) {
    // Fallback: just output the header row if structure not found
    const block = WebImporter.DOMUtils.createTable([headerRow], document);
    element.replaceWith(block);
    return;
  }

  // Extract labels and content
  const tabLinks = Array.from(tabMenu.children);
  const tabPanes = Array.from(tabContent.children);

  // Each row after the header: [label, tab content]
  const rows = tabLinks.map((tabLink, i) => {
    // Tab label: use visible text (prefer div, fallback to link text)
    let label = '';
    const labelDiv = tabLink.querySelector('div');
    if (labelDiv && labelDiv.textContent.trim()) {
      label = labelDiv.textContent.trim();
    } else {
      label = tabLink.textContent.trim();
    }

    // Tab content: robustly grab the main block (usually a grid div)
    let content;
    const pane = tabPanes[i];
    if (pane) {
      const grid = pane.querySelector('.grid-layout');
      content = grid ? grid : pane;
    } else {
      content = document.createElement('div');
    }

    // Each row must be an array of [label, content]
    return [label, content];
  });

  // Structure: header is a single-cell row, all subsequent rows have two cells
  const tableRows = [headerRow, ...rows];

  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
