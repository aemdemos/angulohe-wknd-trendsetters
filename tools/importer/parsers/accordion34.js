/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row as specified in the block info
  const cells = [['Accordion (accordion34)']];

  // Select all immediate child accordions
  const accordions = element.querySelectorAll(':scope > .accordion');

  accordions.forEach((acc) => {
    // Get the accordion title: must preserve any markup within the title
    let titleContent = null;
    const toggle = acc.querySelector('.w-dropdown-toggle');
    if (toggle) {
      // Look for the main label inside the toggle
      const para = toggle.querySelector('.paragraph-lg');
      if (para) {
        titleContent = para;
      } else {
        // Fallback: extract text content from toggle (could be a span, div, etc.)
        // Reference the toggle directly for maximum fidelity
        titleContent = toggle;
      }
    }
    // Get the accordion content: preserve markup, reference the inner wrapper directly
    let contentContent = null;
    const dropdownList = acc.querySelector('.w-dropdown-list');
    if (dropdownList) {
      // Take the first element with class .utility-padding-all-1rem or .rich-text inside dropdownList, else dropdownList directly
      const utility = dropdownList.querySelector('.utility-padding-all-1rem');
      if (utility) {
        // Prefer rich text wrapper if present
        const rich = utility.querySelector('.rich-text');
        contentContent = rich ? rich : utility;
      } else {
        const rich = dropdownList.querySelector('.rich-text');
        contentContent = rich ? rich : dropdownList;
      }
    }
    // Add the row to cells array
    cells.push([
      titleContent,
      contentContent
    ]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
