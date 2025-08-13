/* global WebImporter */
export default function parse(element, { document }) {
  // Header row, matches example
  const headerRow = ['Cards (cards17)'];
  // Get all immediate child divs (card containers)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  // For each card div, extract image, always first child
  const rows = cardDivs.map((cardDiv) => {
    const img = cardDiv.querySelector('img');
    // If image missing, skip card
    if (!img) return null;
    return [img, '']; // No text cell for this variant, second cell is empty string
  }).filter(Boolean); // Remove any nulls
  // Assemble table cells with header
  const cells = [headerRow, ...rows];
  // Create block table and replace element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
