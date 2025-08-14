/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Cards (cards24)'];
  const cells = [headerRow];

  // Each card is an <a> inside the grid
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  cardLinks.forEach((a) => {
    // Image: first img inside the aspect-ratio container
    const imageContainer = a.querySelector('.utility-aspect-2x3');
    const img = imageContainer ? imageContainer.querySelector('img') : null;

    // Text cell construction
    const textContent = document.createElement('div');

    // Top info bar: tags and date (if present)
    const infoBar = a.querySelector('.flex-horizontal');
    if (infoBar) {
      // Use a single line, tags first then date
      const infoLine = document.createElement('div');
      Array.from(infoBar.children).forEach((el) => {
        // Use a span for each tag/date
        const span = document.createElement('span');
        span.textContent = el.textContent;
        span.style.marginRight = '8px';
        infoLine.appendChild(span);
      });
      textContent.appendChild(infoLine);
    }

    // Headline/title (h3/h4-heading)
    const heading = a.querySelector('h3, .h4-heading');
    if (heading) {
      // Use the original heading element for structure
      textContent.appendChild(heading);
    }
    
    // No description or CTA in this specific HTML, but structure allows for it if present
    // Add the row to the block table
    cells.push([
      img || '',
      textContent
    ]);
  });

  // Create and replace block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
