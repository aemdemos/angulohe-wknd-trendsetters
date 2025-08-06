/* global WebImporter */
export default function parse(element, { document }) {
  // Find the tab menu (tab labels)
  const tabMenu = element.querySelector('[role="tablist"]');
  const tabLinks = tabMenu ? Array.from(tabMenu.children) : [];
  // Get tab labels (extract from child div or fallback to textContent)
  const tabLabels = tabLinks.map((link) => {
    const labelDiv = link.querySelector('div');
    return labelDiv ? labelDiv.textContent.trim() : link.textContent.trim();
  });
  // Find tab panes
  const tabContent = element.querySelector('.w-tab-content');
  const tabPanes = tabContent ? Array.from(tabContent.children) : [];
  // The table: first row is header (single cell), then one row per tab (label, content)
  const rows = [];
  rows.push(['Tabs']); // Only a single cell in the header row

  // For each tab, add a row with label and corresponding content
  for (let i = 0; i < Math.min(tabLabels.length, tabPanes.length); i += 1) {
    const label = tabLabels[i];
    // For the tab content, use the main inner content (e.g. grid)
    let content;
    if (tabPanes[i].children.length === 1) {
      content = tabPanes[i].firstElementChild;
    } else {
      content = tabPanes[i];
    }
    rows.push([label, content]);
  }

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
