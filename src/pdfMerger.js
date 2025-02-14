import { readdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import { PDFDocument } from 'pdf-lib';

/**
 * Merge multiple PDF files from a directory into a single PDF.
 *
 * @param {Object} options - Options for merging.
 * @param {string} options.dirPath - Directory containing PDF files.
 * @param {string} options.pdfPath - Path for the merged PDF output.
 * @param {string} [options.sort="asc"] - Sort order ("asc" for ascending, "desc" for descending).
 * @returns {Promise<Object>} Resolves with an object containing the success status and output path.
 * @throws Will throw an error if merging fails.
 */
export async function mergePdfs({ dirPath, pdfPath, sort = 'asc' }) {
  try {
    // Read the contents of the directory
    const entries = await readdir(dirPath, { withFileTypes: true });
    const pdfFiles = entries
      .filter((entry) => entry.isFile() && path.extname(entry.name).toLowerCase() === '.pdf')
      .map((entry) => entry.name);

    if (pdfFiles.length === 0) {
      throw new Error('No PDF files found in the specified directory.');
    }

    // Sort files using natural sort order considering the entire filename.
    pdfFiles.sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
    );
    if (sort.toLowerCase() === 'desc') {
      pdfFiles.reverse();
    }

    // Create a new PDF document that will contain all merged pages.
    const mergedPdf = await PDFDocument.create();

    // Iterate through the sorted PDF files and merge their pages.
    for (const fileName of pdfFiles) {
      const filePath = path.join(dirPath, fileName);
      const fileData = await readFile(filePath);
      const pdf = await PDFDocument.load(fileData);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    // Serialize the merged PDF to bytes and write it to the output file.
    const mergedPdfBytes = await mergedPdf.save();
    await writeFile(pdfPath, mergedPdfBytes);

    return { success: true, pdfPath };
  } catch (error) {
    throw new Error(`Merge failed: ${error.message}`);
  }
}