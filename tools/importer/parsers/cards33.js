/* global WebImporter */
export default function parse(element, { document }) {
  // Table header per instructions
  const rows = [['Cards (cards33)']];

  // All immediate <a> children are cards
  const cards = element.querySelectorAll(':scope > a');

  cards.forEach((card) => {
    // Card image: first <img> inside anchor
    const img = card.querySelector('img');

    // Card text container: look for first grid div inside the card
    const contentContainer = card.querySelector('div');
    const contentParts = [];

    // Find tag row (Chill, 3 min read, etc)
    const tagBar = contentContainer.querySelector('.flex-horizontal');
    if (tagBar) {
      contentParts.push(tagBar);
    }

    // Heading (h3)
    const heading = contentContainer.querySelector('h3');
    if (heading) {
      contentParts.push(heading);
    }

    // Paragraph (description)
    const para = contentContainer.querySelector('p');
    if (para) {
      contentParts.push(para);
    }

    // CTA: find div with text 'Read' (case-insensitive)
    // In this HTML, it's a <div> not a link, so build a link with card.href
    let ctaDiv = Array.from(contentContainer.querySelectorAll('div')).find(div => div.textContent.trim().toLowerCase() === 'read');
    if (ctaDiv) {
      const ctaLink = document.createElement('a');
      ctaLink.href = card.href;
      ctaLink.textContent = 'Read';
      contentParts.push(ctaLink);
    }

    // Remove any accidental duplicate image in contentParts
    for (let i = contentParts.length - 1; i >= 0; i--) {
      if (contentParts[i] === img) contentParts.splice(i, 1);
    }

    // Push row: [image, text cell]
    rows.push([img, contentParts]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
