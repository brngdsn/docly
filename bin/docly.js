#!/usr/bin/env node
import { program } from 'commander';
import process from 'process';
import { convertMarkdownToPdf } from '../src/index.js';

program
  .name('docly')
  .description('Transform a Markdown file into a PDF')
  .requiredOption('-m, --markdown <file>', 'Path to the Markdown file')
  .requiredOption('-p, --pdf <file>', 'Output PDF file name')
  .version('1.0.0');

program.parse(process.argv);

const options = program.opts();

(async () => {
  try {
    console.log(`Converting "${options.markdown}" to "${options.pdf}"...`);
    await convertMarkdownToPdf({
      markdownPath: options.markdown,
      pdfPath: options.pdf,
    });
    console.log('Conversion successful.');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
})();