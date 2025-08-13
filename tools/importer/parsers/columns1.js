/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches example
  const headerRow = ['Columns (columns1)'];

  // Find columns: image and content
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const children = Array.from(grid.children);

  // Find the image column
  const imgCol = children.find(child => child.tagName === 'IMG');

  // Find the text/content column
  const textCol = children.find(child => child !== imgCol);

  // Build the right column: heading, paragraph, button group
  const cellContent = [];
  if (textCol) {
    const heading = textCol.querySelector('h1');
    if (heading) cellContent.push(heading);
    const subheading = textCol.querySelector('p');
    if (subheading) cellContent.push(subheading);
    const buttonGroup = textCol.querySelector('.button-group');
    if (buttonGroup) cellContent.push(buttonGroup);
  }

  // Use empty string for missing image or content
  const row = [imgCol || '', cellContent.length ? cellContent : ''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row
  ], document);

  element.replaceWith(table);
}
