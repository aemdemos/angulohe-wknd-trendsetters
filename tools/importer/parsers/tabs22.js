/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header: must be exactly 'Tabs' as one cell
  const headerRow = ['Tabs'];

  // 2. Find the tab menu (role=tablist) and tab content (role=tabpanel container)
  let tabMenu;
  let tabContent;
  Array.from(element.children).forEach((child) => {
    if (child.getAttribute('role') === 'tablist') {
      tabMenu = child;
    } else if (child.querySelector('[role="tabpanel"]')) {
      tabContent = child;
    }
  });
  if (!tabMenu || !tabContent) return;

  // 3. Get all tab labels and panes
  const tabLinks = Array.from(tabMenu.querySelectorAll('[role="tab"]'));
  const panes = Array.from(tabContent.querySelectorAll(':scope > [role="tabpanel"]'));
  if (panes.length === 0) return;

  // 4. Build rows: each as [label, content], extracting only text from each grid (if present)
  const rows = panes.map((pane) => {
    // Find tab label
    const tabId = pane.id;
    const link = tabLinks.find(l => l.getAttribute('aria-controls') === tabId);
    let label = '';
    if (link) {
      const labelDiv = link.querySelector('div');
      label = labelDiv ? labelDiv.textContent.trim() : link.textContent.trim();
    } else {
      label = tabId;
    }
    // Extract tab content as plain text, preserving heading and formatting (no images)
    let contentText = '';
    const grid = pane.querySelector(':scope > .w-layout-grid, :scope > div');
    if (grid) {
      // Only keep heading and visible text, ignore images
      let textParts = [];
      const heading = grid.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) {
        textParts.push(heading.textContent.trim());
      }
      // Collect all text nodes that are not inside <img>
      Array.from(grid.childNodes).forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const t = node.textContent.trim();
          if (t) textParts.push(t);
        } else if (
          node.nodeType === Node.ELEMENT_NODE &&
          !['IMG', 'PICTURE', 'SVG'].includes(node.nodeName) &&
          !/^h[1-6]$/i.test(node.nodeName)
        ) {
          textParts.push(node.textContent.trim());
        }
      });
      contentText = textParts.join(' ').replace(/ +/g, ' ').trim();
    } else {
      contentText = pane.textContent.trim();
    }
    return [label, contentText];
  });

  // 5. Compose table data: header row, then tab rows
  const cells = [headerRow, ...rows];

  // 6. Create table block and replace original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
