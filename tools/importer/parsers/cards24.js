/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards24)'];
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  const rows = cards.map(card => {
    // First cell: image (must reference existing element)
    const imgDiv = card.querySelector('div.utility-aspect-2x3');
    const img = imgDiv ? imgDiv.querySelector('img') : null;
    // Second cell: text content from meta (tag/date) and title
    const metaDiv = card.querySelector('.flex-horizontal');
    let tag = metaDiv ? metaDiv.querySelector('.tag') : null;
    let date = metaDiv ? metaDiv.querySelector('.paragraph-sm') : null;
    let title = card.querySelector('h3, .h4-heading');
    // Compose the text cell: 
    // - meta (tag/date) as inline
    // - title as heading (bold)
    const textCellParts = [];
    // meta (tag + date)
    if (tag || date) {
      const metaContainer = document.createElement('div');
      if (tag) {
        const tagEl = document.createElement('span');
        tagEl.textContent = tag.textContent;
        metaContainer.appendChild(tagEl);
      }
      if (date) {
        if (tag) metaContainer.appendChild(document.createTextNode(' '));
        const dateEl = document.createElement('span');
        dateEl.textContent = date.textContent;
        metaContainer.appendChild(dateEl);
      }
      textCellParts.push(metaContainer);
    }
    // title
    if (title) {
      // Bold the heading for block table (as in example)
      const strong = document.createElement('strong');
      strong.textContent = title.textContent;
      textCellParts.push(strong);
    }
    return [img, textCellParts];
  });
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
