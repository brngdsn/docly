import { readFile, writeFile } from 'fs/promises';
import { PDFDocument } from 'pdf-lib';

/**
 * Extract specific pages from a PDF file.
 *
 * @param {Object} options - Options for extraction.
 * @param {string} options.inputPath - Path to the input PDF file.
 * @param {string} options.outputPath - Path to output the extracted PDF.
 * @param {string} options.pages - Page range to extract (e.g., "1", "1-3", "1,3,5", "1-3,5,7-9").
 * @returns {Promise<Object>} Resolves with an object containing the success status and output path.
 * @throws Will throw an error if extraction fails.
 */
export async function extractPdfPages({ inputPath, outputPath, pages }) {
  try {
    // Read the input PDF
    const existingPdfBytes = await readFile(inputPath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const totalPages = pdfDoc.getPageCount();
    
    // Parse the page range
    const pageNumbers = parsePageRange(pages, totalPages);
    
    if (pageNumbers.length === 0) {
      throw new Error('No valid pages specified for extraction');
    }
    
    // Create a new PDF with only the specified pages
    const newPdfDoc = await PDFDocument.create();
    
    for (const pageNum of pageNumbers) {
      const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageNum - 1]); // Convert to 0-based index
      newPdfDoc.addPage(copiedPage);
    }
    
    // Save the new PDF
    const pdfBytes = await newPdfDoc.save();
    await writeFile(outputPath, pdfBytes);
    
    console.log(`Extracted ${pageNumbers.length} page(s) from ${totalPages} total pages`);
    return { success: true, outputPath, extractedPages: pageNumbers.length };
  } catch (error) {
    throw new Error(`PDF extraction failed: ${error.message}`);
  }
}

/**
 * Parse a page range string into an array of page numbers.
 * Supports formats like "1", "1-3", "1,3,5", "1-3,5,7-9"
 * 
 * @param {string} pageRange - The page range string
 * @param {number} totalPages - Total number of pages in the PDF
 * @returns {number[]} Array of page numbers
 */
function parsePageRange(pageRange, totalPages) {
  const pages = new Set();
  const parts = pageRange.split(',');
  
  for (const part of parts) {
    const trimmed = part.trim();
    
    if (trimmed.includes('-')) {
      // Handle range (e.g., "1-3")
      const [start, end] = trimmed.split('-').map(n => parseInt(n.trim()));
      
      if (isNaN(start) || isNaN(end)) {
        console.warn(`Invalid range: ${trimmed}`);
        continue;
      }
      
      const rangeStart = Math.max(1, Math.min(start, totalPages));
      const rangeEnd = Math.max(1, Math.min(end, totalPages));
      
      for (let i = rangeStart; i <= rangeEnd; i++) {
        pages.add(i);
      }
    } else {
      // Handle single page
      const pageNum = parseInt(trimmed);
      
      if (isNaN(pageNum)) {
        console.warn(`Invalid page number: ${trimmed}`);
        continue;
      }
      
      if (pageNum >= 1 && pageNum <= totalPages) {
        pages.add(pageNum);
      } else {
        console.warn(`Page ${pageNum} out of range (1-${totalPages})`);
      }
    }
  }
  
  // Convert Set to sorted array
  return Array.from(pages).sort((a, b) => a - b);
} 