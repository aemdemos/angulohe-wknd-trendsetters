/* global WebImporter */
export default function parse(element, { document }) {
  // Block Name (header row)
  const headerRow = ['Tabs'];

  // Get tab labels from tab menu
  const tabMenu = element.children[0];
  const tabLinks = Array.from(tabMenu.children);
  const tabLabels = tabLinks.map(link => {
    // Prefer the label text inside child div, fallback to link text
    const labelDiv = link.querySelector('div');
    return labelDiv ? labelDiv.textContent.trim() : link.textContent.trim();
  });

  // Get tab panes/content
  const tabContent = element.children[1];
  const tabPanes = Array.from(tabContent.children);

  // Defensive: Only create rows for pairs of label and pane
  const rows = tabPanes.map((pane, idx) => {
    const label = tabLabels[idx] || '';
    // Find main grid div inside the pane, fallback to pane itself if missing
    let contentDiv = pane.querySelector('div');
    if (!contentDiv) contentDiv = pane;
    // For edge cases, ensure something always present in cell
    return [label, contentDiv];
  });

  // Compose block table rows: header + tab rows
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace in document
  element.replaceWith(block);
}
