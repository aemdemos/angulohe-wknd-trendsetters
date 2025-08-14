/* global WebImporter */
export default function parse(element, { document }) {
  // Table header should exactly match example
  const headerRow = ['Cards'];
  // Get all direct children representing card wrappers
  const cardDivs = element.querySelectorAll(':scope > div');
  
  const rows = [headerRow];
  cardDivs.forEach(cardDiv => {
    // Each card: grab the relevant text node (keep p as is for semantic meaning)
    // It's always a <p> inside each cardDiv
    const p = cardDiv.querySelector('p');
    // Defensive: only add row if content exists
    if (p && p.textContent.trim()) {
      rows.push([p]);
    }
  });

  // Only create the table if there are card rows
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  } else {
    // If no cards are found, remove the element
    element.remove();
  }
}