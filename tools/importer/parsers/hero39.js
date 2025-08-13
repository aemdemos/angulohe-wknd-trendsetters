/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero39)'];

  // --- Get background image (img) ---
  let bgImg = null;
  // Find the first img inside the block (should be the hero background)
  const imgs = element.querySelectorAll('img');
  if (imgs.length > 0) {
    bgImg = imgs[0];
  }

  // --- Get main content: headings, paragraphs, CTA ---
  let contentCell = [];
  // Find all content grids inside the block
  // The grid containing the text is usually the one without an img
  const grids = element.querySelectorAll('.grid-layout');
  let textGrid = null;
  if (grids.length > 1) {
    textGrid = grids[1];
  } else if (grids.length === 1) {
    textGrid = grids[0];
  }
  // Defensive: only proceed if we have a grid
  if (textGrid) {
    // Get heading(s) (h1, h2, etc.)
    const headings = textGrid.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(h => contentCell.push(h));
    // Get paragraph(s)
    const paragraphs = textGrid.querySelectorAll('p');
    paragraphs.forEach(p => contentCell.push(p));
    // Get CTA button link(s)
    // Usually inside .button-group or any <a> that looks like a button
    const buttonGroups = textGrid.querySelectorAll('.button-group');
    buttonGroups.forEach(group => {
      const links = group.querySelectorAll('a');
      links.forEach(a => contentCell.push(a));
    });
    // Also get any direct <a> that may be styled as button but outside button-group
    const directBtnLinks = textGrid.querySelectorAll('a[class*="button"]:not(.button-group a)');
    directBtnLinks.forEach(a => {
      if (!contentCell.includes(a)) contentCell.push(a);
    });
  }

  // Defensive: if nothing found, table cell must not be empty
  if (contentCell.length === 0) {
    // Fallback: add the textGrid itself
    if (textGrid) contentCell.push(textGrid);
    else contentCell.push(document.createTextNode(''));
  }

  // --- Build table ---
  const cells = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentCell]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
