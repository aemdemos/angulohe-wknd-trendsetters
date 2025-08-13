/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row as required
  const headerRow = ['Cards'];
  const rows = [headerRow];
  // 2. Find all cards as immediate children
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach(cardDiv => {
    // Each card is structured: icon+svg, then <p class="utility-margin-bottom-0">text</p>
    // Only include the <p> in the block cell (per markdown example: only text, not icon)
    const p = cardDiv.querySelector('p.utility-margin-bottom-0');
    if (p) {
      rows.push([p]); // reference the existing <p> element
    }
  });
  // 3. Create and replace
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
