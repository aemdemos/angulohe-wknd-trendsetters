/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per spec
  const headerRow = ['Accordion (accordion34)'];

  // Find all immediate accordion items
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));
  const rows = accordionItems.map(accItem => {
    // Title: select the label/title element
    const titleEl = accItem.querySelector('.paragraph-lg');
    // Content: select the main content wrapper inside the accordion
    let contentCell = null;
    const contentNav = accItem.querySelector('.accordion-content');
    if (contentNav) {
      // Find a single div.utility-padding-all-1rem inside nav (which wraps the actual content)
      const paddingDiv = contentNav.querySelector(':scope > .utility-padding-all-1rem');
      if (paddingDiv) {
        contentCell = paddingDiv;
      } else {
        // fallback to the whole nav if missing expected wrapper
        contentCell = contentNav;
      }
    }
    // Extra fallback: if contentCell is still null, use an empty div
    if (!contentCell) {
      contentCell = document.createElement('div');
    }
    return [titleEl, contentCell];
  });

  // Build the table block
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(block);
}
