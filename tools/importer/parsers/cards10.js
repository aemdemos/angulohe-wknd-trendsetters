/* global WebImporter */
export default function parse(element, { document }) {
  // Table header from the example (must match exactly)
  const headerRow = ['Cards (cards10)'];

  // Get all direct card links
  const cardEls = Array.from(element.querySelectorAll(':scope > a.card-link'));
  const rows = [headerRow];

  cardEls.forEach(card => {
    // Get card image (always first .utility-aspect-3x2 img)
    const imgContainer = card.querySelector('.utility-aspect-3x2');
    const img = imgContainer ? imgContainer.querySelector('img') : null;
    
    // Find the content block
    const contentDiv = card.querySelector('.utility-padding-all-1rem');
    let textContent = [];
    if (contentDiv) {
      // Tag (if present)
      const tag = contentDiv.querySelector('.tag-group .tag');
      if (tag) {
        // Use the original element
        const tagDiv = document.createElement('div');
        tagDiv.appendChild(tag);
        textContent.push(tagDiv);
      }
      // Heading (if present)
      const heading = contentDiv.querySelector('h3, .h4-heading');
      if (heading) {
        textContent.push(heading);
      }
      // Description (if present)
      const para = contentDiv.querySelector('p');
      if (para) {
        textContent.push(para);
      }
    }
    // Add the row, using null if the image or text is missing
    rows.push([
      img || '',
      textContent.length > 0 ? textContent : ''
    ]);
  });

  // Build and replace the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
