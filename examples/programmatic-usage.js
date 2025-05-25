import { convertMarkdownToPdf, mergePdfs, extractPdfPages } from '@brngdsn/docly';
// Or if using locally: import { convertMarkdownToPdf, mergePdfs, extractPdfPages } from '../src/docly.js';

// Example 1: Convert Markdown to PDF
async function convertExample() {
  try {
    const result = await convertMarkdownToPdf({
      markdownPath: './document.md',
      pdfPath: './output.pdf'
    });
    console.log('Conversion successful:', result);
  } catch (error) {
    console.error('Conversion failed:', error.message);
  }
}

// Example 2: Merge multiple PDFs
async function mergeExample() {
  try {
    const result = await mergePdfs({
      dirPath: './pdf-files',
      pdfPath: './merged-output.pdf',
      sort: 'asc' // optional: 'asc' or 'desc', defaults to 'asc'
    });
    console.log('Merge successful:', result);
  } catch (error) {
    console.error('Merge failed:', error.message);
  }
}

// Example 3: Extract pages from PDF
async function extractExample() {
  try {
    const result = await extractPdfPages({
      inputPath: './source.pdf',
      outputPath: './extracted-pages.pdf',
      pages: '1-3,5,7-10' // Various formats supported
    });
    console.log('Extraction successful:', result);
  } catch (error) {
    console.error('Extraction failed:', error.message);
  }
}

// Example 4: Complete workflow - Create a book with cover pages
async function createBookExample() {
  try {
    // Step 1: Convert cover page markdown to PDF
    await convertMarkdownToPdf({
      markdownPath: './cover.md', // Contains: ![cover:front](./cover-image.jpg)
      pdfPath: './temp/cover.pdf'
    });
    
    // Step 2: Convert main content to PDF
    await convertMarkdownToPdf({
      markdownPath: './content.md',
      pdfPath: './temp/content.pdf'
    });
    
    // Step 3: Convert back cover to PDF
    await convertMarkdownToPdf({
      markdownPath: './back-cover.md', // Contains: ![cover:back](./back-image.jpg)
      pdfPath: './temp/back-cover.pdf'
    });
    
    // Step 4: Merge all PDFs in order
    await mergePdfs({
      dirPath: './temp',
      pdfPath: './final-book.pdf',
      sort: 'asc'
    });
    
    console.log('Book created successfully!');
  } catch (error) {
    console.error('Book creation failed:', error.message);
  }
}

// Example 5: Extract specific chapters from a book
async function extractChaptersExample() {
  try {
    // Extract chapters 1-3 (pages 10-45)
    await extractPdfPages({
      inputPath: './complete-book.pdf',
      outputPath: './chapters-1-3.pdf',
      pages: '10-45'
    });
    
    // Extract only chapter 5 (pages 78-92)
    await extractPdfPages({
      inputPath: './complete-book.pdf',
      outputPath: './chapter-5.pdf',
      pages: '78-92'
    });
    
    console.log('Chapters extracted successfully!');
  } catch (error) {
    console.error('Chapter extraction failed:', error.message);
  }
}

// Run examples
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('Running docly examples...');
  // Uncomment the examples you want to run:
  // await convertExample();
  // await mergeExample();
  // await extractExample();
  // await createBookExample();
  // await extractChaptersExample();
} 