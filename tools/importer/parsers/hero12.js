/* global WebImporter */
export default function parse(element, { document }) {
  // Block name header row
  const headerRow = ['Hero (hero12)'];

  // 1st content row: Background Image (optional)
  // Find the top-level image (background)
  // The section > div.grid-layout > div.utility-position-relative > img
  let bgImg = null;
  const grid = element.querySelector(':scope > div.grid-layout');
  if (grid) {
    const bgHolder = grid.querySelector(':scope > div.utility-position-relative');
    if (bgHolder) {
      bgImg = bgHolder.querySelector('img');
    }
  }

  // 2nd content row: Title, Subheading, CTA, etc.
  // Find the main content container
  let contentCell = [];
  const contentDiv = grid ? grid.querySelector(':scope > .container') : null;
  if (contentDiv) {
    const card = contentDiv.querySelector('.card');
    if (card) {
      const cardBody = card.querySelector('.card-body');
      if (cardBody) {
        const cardGrid = cardBody.querySelector('.grid-layout');
        if (cardGrid) {
          // Get all direct children of this grid
          const gridChildren = Array.from(cardGrid.children);
          // The image (side image)
          const gridImg = cardGrid.querySelector('img');
          if (gridImg) {
            contentCell.push(gridImg);
          }
          // The text block
          const textBlock = gridChildren.find(e => e.querySelector('h2'));
          if (textBlock) {
            // Gather heading
            const h2 = textBlock.querySelector('h2');
            if (h2) contentCell.push(h2);
            // Gather all features (icon + text)
            const featuresDiv = textBlock.querySelector('.flex-vertical');
            if (featuresDiv) {
              // Each row: flex-horizontal (icon, text)
              const rows = featuresDiv.querySelectorAll(':scope > .flex-horizontal');
              rows.forEach((row) => {
                const icon = row.querySelector('.icon-small');
                const text = row.querySelector('p');
                if (icon || text) {
                  const frag = document.createDocumentFragment();
                  if (icon) frag.appendChild(icon);
                  if (text) frag.appendChild(text);
                  contentCell.push(frag);
                }
                // add divider after each except last
                // but in original, divider is a line
              });
            }
            // Button
            const buttonGroup = textBlock.querySelector('.button-group');
            if (buttonGroup) {
              const button = buttonGroup.querySelector('a');
              if (button) contentCell.push(button);
            }
          }
        }
      }
    }
  }
  // Compose rows (handle nulls gracefully)
  const rows = [
    headerRow,
    [bgImg || ''],
    [contentCell.length === 1 ? contentCell[0] : contentCell]
  ];

  // Create and replace block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
