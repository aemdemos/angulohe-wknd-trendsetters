/* global WebImporter */
export default function parse(element, { document }) {
  // Header row, exactly as required
  const headerRow = ['Accordion (accordion13)'];

  // Each direct child .divider represents an accordion item
  const dividerEls = Array.from(element.querySelectorAll(':scope > .divider'));

  // Defensive check: sometimes the structure may have the first child as a .divider inside a container
  // If no .divider found, try fallback to all .divider within element
  let accordionDividers = dividerEls;
  if (accordionDividers.length === 0) {
    accordionDividers = Array.from(element.querySelectorAll('.divider'));
  }

  const rows = accordionDividers.map(divider => {
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return null;
    // Find children: typically [title, content], but order could vary
    const children = Array.from(grid.children);
    // Title: look for class 'h4-heading', fallback to first child
    let titleEl = children.find(c => c.classList.contains('h4-heading')) || children[0];
    // Content: look for class 'rich-text', fallback to second child
    let contentEl = children.find(c => c.classList.contains('rich-text')) || children[1];
    // Defensive: Only add row if both exist
    if (!titleEl || !contentEl) return null;
    return [titleEl, contentEl];
  }).filter(Boolean);

  // Compose table data
  const tableData = [headerRow, ...rows];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the input element with the table
  element.replaceWith(table);
}
