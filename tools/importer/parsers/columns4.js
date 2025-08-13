/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per the example
  const headerRow = ['Columns (columns4)'];

  // Get the immediate child divs that represent columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Extract the image from each column
  const contentRow = columns.map(col => {
    // If there is more than just an img in the column in future, consider more
    // For now, image is the only content in each column
    const img = col.querySelector('img');
    return img ? img : '';
  });

  // Build table array
  const tableArray = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableArray, document);
  // Replace the original element with the block
  element.replaceWith(block);
}
