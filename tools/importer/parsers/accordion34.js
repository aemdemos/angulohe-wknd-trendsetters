/* global WebImporter */
export default function parse(element, { document }) {
  // Create the table header as per the block name
  const cells = [
    ['Accordion (accordion34)']
  ];

  // Get all direct children that are accordions
  const accordions = Array.from(element.querySelectorAll(':scope > .accordion'));

  accordions.forEach((accordion) => {
    // Title: inside .w-dropdown-toggle > .paragraph-lg
    let titleElem = null;
    const toggle = accordion.querySelector('.w-dropdown-toggle');
    if (toggle) {
      titleElem = toggle.querySelector('.paragraph-lg');
    }
    // Accordion content: inside nav.accordion-content > ...
    let contentElem = null;
    const nav = accordion.querySelector('nav.accordion-content');
    if (nav) {
      // Use the first child div or .w-richtext for the main content
      // Some implementations might not have .w-richtext
      const rich = nav.querySelector('.w-richtext');
      if (rich) {
        contentElem = rich;
      } else {
        // fallback: use the content wrapper or nav itself
        // try to find first div inside nav
        const innerDiv = nav.querySelector('div');
        if (innerDiv) {
          contentElem = innerDiv;
        } else {
          // fallback: nav itself
          contentElem = nav;
        }
      }
    }
    // Ensure that empty cells are set to '' so the table structure is correct
    cells.push([
      titleElem || '',
      contentElem || ''
    ]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
