/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header EXACTLY matches the example
  const headerRow = ['Accordion (accordion34)'];
  const cells = [headerRow];

  // 2. Select all accordion items (immediate children that contain the accordion)
  const accordionItems = element.querySelectorAll(':scope > .accordion');

  accordionItems.forEach((item) => {
    // Title: look for .w-dropdown-toggle > .paragraph-lg, else fallback to .w-dropdown-toggle
    let titleEl = null;
    const toggle = item.querySelector('.w-dropdown-toggle');
    if (toggle) {
      titleEl = toggle.querySelector('.paragraph-lg') || toggle;
    }
    // Edge case: If still no titleEl, fallback to title text
    if (!titleEl) {
      const titleDiv = item.querySelector('div');
      if (titleDiv) titleEl = titleDiv;
    }

    // Content: look for nav.accordion-content, then inner padding wrapper, then .rich-text
    let contentEl = null;
    const nav = item.querySelector('nav.accordion-content');
    if (nav) {
      // find the first wrapper to preserve semantics (e.g. padding wrappers)
      const innerWrapper = nav.querySelector('.utility-padding-all-1rem') || nav;
      // Prefer .rich-text if present to preserve internal formatting
      contentEl = innerWrapper.querySelector('.rich-text') || innerWrapper;
    }
    // If still no content, fallback to nav itself
    if (!contentEl && nav) contentEl = nav;

    // If for any reason title or content is missing, ensure there's at least an empty string
    cells.push([titleEl || '', contentEl || '']);
  });

  // 3. Create and replace the table, referencing existing DOM nodes
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
