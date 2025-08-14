/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the spec
  const headerRow = ["Columns (columns7)"];

  // Find all immediate child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Prepare the row: one cell for each column div, containing the image (or empty if missing)
  const row = columns.map(col => {
    // We reference the entire column content (here, just the image inside)
    // This preserves any future inner structure variations
    if (col.children.length === 1 && col.firstElementChild.tagName === 'IMG') {
      return col.firstElementChild;
    }
    // If col uses wrapper div (like 'utility-aspect-1x1'), grab its first image
    const img = col.querySelector('img');
    if (img) return img;
    // fallback: return the column element itself if it has anything
    return col.innerHTML.trim() ? col : '';
  });

  const cells = [headerRow, row];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
