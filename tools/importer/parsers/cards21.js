/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single column as in the example
  const headerRow = ['Cards (cards21)'];

  // Find all card elements
  const cardElements = element.querySelectorAll('.card');
  const cardRows = [];

  cardElements.forEach(card => {
    const body = card.querySelector('.card-body') || card;
    const img = body.querySelector('img');
    const title = body.querySelector('.h4-heading');
    const textCell = [];
    if (title) textCell.push(title);
    cardRows.push([img, textCell]);
  });

  if (cardRows.length === 0) return;

  // Compose the table rows: header row is only 1 cell, data rows are 2 cells
  const tableRows = [headerRow, ...cardRows];

  // Create and replace block
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Make header cell span all columns (colspan) for correct visual structure
  const tableHeader = table.querySelector('tr:first-child th');
  if (tableHeader && cardRows.length > 0) {
    tableHeader.setAttribute('colspan', cardRows[0].length);
  }

  element.replaceWith(table);
}
