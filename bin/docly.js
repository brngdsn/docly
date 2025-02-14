#!/usr/bin/env node
import { program } from 'commander';
import process from 'process';
import { convertMarkdownToPdf } from '../src/index.js';
import { mergePdfs } from '../src/pdfMerger.js';

program
  .name('docly')
  .description('Convert Markdown files to PDF or merge multiple PDFs into one')
  .option('-m, --markdown <file>', 'Path to the Markdown file to convert')
  .option('-g, --group <directory>', 'Directory containing PDF files to merge')
  .requiredOption('-p, --pdf <file>', 'Output PDF file name')
  .option('-s, --sort <order>', 'Sort order for merging PDFs ("asc" or "desc")', 'asc')
  .version('1.0.0');

program.parse(process.argv);

const options = program.opts();

(async () => {
  try {
    if (options.group) {
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
      console.error('Error: You must provide either a Markdown file (-m) for conversion or a directory (-g) for PDF merging.');
      process.exit(1);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
})();