/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as in the example
  const headerRow = ['Cards'];

  // Get all direct card elements
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  const cardRows = cardDivs.map((cardDiv) => {
    // Each card's description is in a <p>
    const p = cardDiv.querySelector('p');
    // Always reference the existing <p> node, not cloning or extracting text
    // Fallback: if no <p> found, use all text as a <span>
    let cellContent;
    if (p) {
      cellContent = p;
    } else {
      const span = document.createElement('span');
      span.textContent = cardDiv.textContent.trim();
      cellContent = span;
    }
    return [cellContent];
  });

  // Build the table as per example (1 column, first header row)
  const cells = [headerRow, ...cardRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the source element with the new block table
  element.replaceWith(table);
}
