/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get immediate children of the grid
  const gridChildren = Array.from(grid.children);

  // The grid should have 4 children: name, tags, heading, richtext
  // Defensive fallback for missing items
  const name = gridChildren[0] || document.createElement('div');
  const tags = gridChildren[1] || document.createElement('div');
  const heading = gridChildren[2] || document.createElement('div');
  const richTextWrapper = gridChildren[3] || document.createElement('div');

  // Compose first column: name and tags
  const col1 = document.createElement('div');
  if (name.textContent.trim()) col1.appendChild(name);
  if (tags.childNodes.length > 0) col1.appendChild(tags);

  // Second column: heading
  const col2 = document.createElement('div');
  if (heading.textContent.trim()) col2.appendChild(heading);

  // Third column: rich text
  const col3 = document.createElement('div');
  // Usually there's a .rich-text inside richTextWrapper
  const richText = richTextWrapper.querySelector('.rich-text');
  if (richText && richText.textContent.trim()) {
    col3.appendChild(richText);
  } else if (richTextWrapper.textContent.trim()) {
    col3.appendChild(richTextWrapper);
  }

  // Compose table
  const headerRow = ['Columns (columns30)'];
  const cells = [
    headerRow,
    [col1, col2, col3]
  ];

  // Replace the element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
