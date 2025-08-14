/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards17) block: 2 columns: [Image | Text]
  // The provided HTML only has images, no accompanying text per card.
  // Table header must be exactly: 'Cards (cards17)'
  // Each row: [image, empty cell]

  const headerRow = ['Cards (cards17)'];
  // Get direct child divs (each with an image)
  const cardDivs = element.querySelectorAll(':scope > div');
  const rows = Array.from(cardDivs).map((cardDiv) => {
    const img = cardDiv.querySelector('img');
    // If there is no img, handle with an empty string
    return [img || '', ''];
  });

  const tableData = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
