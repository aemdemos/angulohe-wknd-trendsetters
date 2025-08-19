/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row as in the example
  const headerRow = ['Accordion (accordion34)'];
  const rows = [headerRow];

  // Find all direct accordion children
  const accordionEls = Array.from(element.querySelectorAll(':scope > .accordion'));

  accordionEls.forEach((accordion) => {
    // Title: find .w-dropdown-toggle > .paragraph-lg
    let titleEl = null;
    const toggle = accordion.querySelector('.w-dropdown-toggle');
    if (toggle) {
      titleEl = toggle.querySelector('.paragraph-lg');
      if (!titleEl) {
        // fallback: use first text node or div in toggle
        const fallback = Array.from(toggle.childNodes).find(node => node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE);
        if (fallback) {
          titleEl = fallback;
        }
      }
    }

    // Content: find .accordion-content (nav) > .utility-padding-all-1rem > .rich-text
    let contentEl = null;
    const nav = accordion.querySelector('.accordion-content');
    if (nav) {
      const padDiv = nav.querySelector('.utility-padding-all-1rem');
      if (padDiv) {
        contentEl = padDiv.querySelector('.rich-text') || padDiv;
      } else {
        // fallback to nav itself
        contentEl = nav;
      }
    }

    if (titleEl && contentEl) {
      rows.push([titleEl, contentEl]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
