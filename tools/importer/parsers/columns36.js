/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main grid layout containing columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Expect two main columns: text + actions, and images
  const mainColumns = Array.from(grid.children);
  if (mainColumns.length < 2) return;

  // First column: text content
  const textCol = mainColumns[0];
  // Extract heading, paragraph, and button group
  const heading = textCol.querySelector('h1');
  const subheading = textCol.querySelector('p');
  const buttons = textCol.querySelector('.button-group');
  // Build the text cell: only push existing elements
  const textCell = [];
  if (heading) textCell.push(heading);
  if (subheading) textCell.push(subheading);
  if (buttons) textCell.push(buttons);

  // Second column: images (find all img elements inside this column)
  const imgCol = mainColumns[1];
  const imgs = Array.from(imgCol.querySelectorAll('img'));

  // Table header row must be exactly 'Columns (columns36)'
  const headerRow = ['Columns (columns36)'];
  // Second row: first cell is text, second cell is all images
  const contentRow = [textCell, imgs];

  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
