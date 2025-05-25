#!/usr/bin/env node
import { program } from 'commander';
import process from 'process';
import { convertMarkdownToPdf } from '../src/index.js';
import { mergePdfs } from '../src/pdfMerger.js';
import { extractPdfPages } from '../src/pdfExtractor.js';

program
  .name('docly')
  .description('Convert Markdown files to PDF, merge multiple PDFs, or extract pages from PDFs')
  .option('-m, --markdown <file>', 'Path to the Markdown file to convert')
  .option('-g, --group <directory>', 'Directory containing PDF files to merge')
  .option('-e, --extract <file>', 'Path to the PDF file to extract pages from')
  .option('-r, --range <pages>', 'Page range to extract (e.g., "1", "1-3", "1,3,5", "1-3,5,7-9")')
  .requiredOption('-p, --pdf <file>', 'Output PDF file name')
  .option('-s, --sort <order>', 'Sort order for merging PDFs ("asc" or "desc")', 'asc')
  .version('0.4.0');

program.parse(process.argv);

const options = program.opts();

(async () => {
  try {
    if (options.extract) {
      if (!options.range) {
        console.error('Error: You must specify a page range (-r) when extracting pages.');
        process.exit(1);
      }
      console.log(`Extracting pages "${options.range}" from "${options.extract}" to "${options.pdf}"...`);
      await extractPdfPages({
        inputPath: options.extract,
        outputPath: options.pdf,
        pages: options.range
      });
      console.log('Extraction successful.');
    } else if (options.group) {
      console.log(`Merging PDFs from "${options.group}" into "${options.pdf}"...`);
      await mergePdfs({
        dirPath: options.group,
        pdfPath: options.pdf,
        sort: options.sort
      });
      console.log('Merge successful.');
    } else if (options.markdown) {
      console.log(`Converting "${options.markdown}" to "${options.pdf}"...`);
      await convertMarkdownToPdf({
        markdownPath: options.markdown,
        pdfPath: options.pdf
      });
      console.log('Conversion successful.');
    } else {
      console.error('Error: You must provide either a Markdown file (-m) for conversion, a directory (-g) for PDF merging, or a PDF file (-e) for page extraction.');
      process.exit(1);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
})();