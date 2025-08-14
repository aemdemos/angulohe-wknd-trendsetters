/* global WebImporter */
export default function parse(element, { document }) {
  // Table header should match exactly
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  // Select each card as a direct child anchor
  const cards = element.querySelectorAll(':scope > a');

  cards.forEach(card => {
    // Find the image (first img in anchor)
    const img = card.querySelector('img');

    // Find the content container (the first div after image inside grid)
    // Usually: <div class="w-layout-grid ..."><img ...><div>[content]</div></div>
    let grid = card.querySelector('div.w-layout-grid');
    let contentDiv = null;
    if (grid) {
      // Find the div child (content) that is NOT the image
      const divs = Array.from(grid.children).filter(c => c.tagName === 'DIV');
      if (divs.length > 0) contentDiv = divs[0];
    }
    // Fallback: first div after img
    if (!contentDiv && img) {
      let next = img.nextElementSibling;
      while (next && next.tagName !== 'DIV') next = next.nextElementSibling;
      contentDiv = next;
    }
    // Fallback: last div in anchor
    if (!contentDiv) {
      const divs = card.querySelectorAll('div');
      if (divs.length > 0) contentDiv = divs[divs.length - 1];
    }
    // Defensive: if not found, use anchor itself
    if (!contentDiv) contentDiv = card;

    // Remove trailing 'Read' if it is a plain div (not a link)
    // Find last child div that just says 'Read'
    if (contentDiv && contentDiv.lastElementChild &&
        contentDiv.lastElementChild.tagName === 'DIV' &&
        contentDiv.lastElementChild.textContent.trim() === 'Read') {
      contentDiv.removeChild(contentDiv.lastElementChild);
    }

    // Remove heading class for clarity
    let heading = contentDiv.querySelector('h3');
    if (heading) heading.removeAttribute('class');

    // Compose the row: image (element reference as-is), contentDiv (contains heading, meta, description)
    rows.push([img, contentDiv]);
  });

  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
