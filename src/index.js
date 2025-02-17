import { readFile } from 'fs/promises';
import { marked } from 'marked';
import hljs from 'highlight.js';
import puppeteer from 'puppeteer';

// Configure marked to use highlight.js for code blocks.
marked.setOptions({
  highlight: (code, lang) => {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  }
});

/**
 * Convert a Markdown file to a PDF.
 *
 * @param {Object} options - Options for conversion.
 * @param {string} options.markdownPath - Path to the Markdown input file.
 * @param {string} options.pdfPath - Path to output the generated PDF.
 * @returns {Promise<Object>} Resolves with an object containing the success status and output path.
 * @throws Will throw an error if conversion fails.
 */
export async function convertMarkdownToPdf({ markdownPath, pdfPath }) {
  try {
    // Read the Markdown file content
    const markdownContent = await readFile(markdownPath, 'utf8');

    // Convert Markdown to HTML with syntax highlighting for code blocks
    const htmlContent = marked.parse(markdownContent);

    // Wrap the HTML content with a basic template and inline styles.
    const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
      /* PDF page margins */
      @page {
        margin: 40px;
      }
      body { 
        font-family: Arial, sans-serif; 
        margin: 0; 
        padding: 0; 
        line-height: 1.6; 
      }
      .container {
        margin: 40px;
      }
      h1, h2, h3, h4, h5, h6 { 
        color: #333; 
        margin-top: 1.2em; 
      }
      p { 
        margin: 0.6em 0; 
      }
      pre {
        background: #f4f4f4;
        padding: 10px;
        white-space: pre-wrap;
        overflow-wrap: break-word;
        margin-bottom: 20px;
      }
      code { 
        background: #f4f4f4; 
        padding: 2px 4px; 
      }
      blockquote { 
        border-left: 4px solid #ccc; 
        padding-left: 10px; 
        color: #666; 
        margin: 1em 0; 
      }
      table { 
        border-collapse: collapse; 
        width: 100%; 
      }
      th, td { 
        border: 1px solid #ddd; 
        padding: 8px; 
      }
      th { 
        background-color: #f2f2f2; 
      }
      /* Highlight.js default theme */
      .hljs {
        display: block;
        overflow-x: auto;
        padding: 0.5em;
        background: #f0f0f0;
        color: #444;
      }
      .hljs-comment,
      .hljs-quote {
        color: #998;
        font-style: italic;
      }
      .hljs-keyword,
      .hljs-selector-tag,
      .hljs-subst {
        color: #333;
        font-weight: bold;
      }
      .hljs-number,
      .hljs-literal,
      .hljs-variable,
      .hljs-template-variable,
      .hljs-tag .hljs-attr {
        color: #008080;
      }
      .hljs-string,
      .hljs-doctag {
        color: #d14;
      }
      .hljs-title,
      .hljs-section,
      .hljs-selector-id {
        color: #900;
        font-weight: bold;
      }
      .hljs-type,
      .hljs-class .hljs-title {
        color: #458;
        font-weight: bold;
      }
      .hljs-tag,
      .hljs-name,
      .hljs-attribute {
        color: #000080;
      }
      .hljs-regexp,
      .hljs-link {
        color: #009926;
      }
      .hljs-symbol,
      .hljs-bullet {
        color: #990073;
      }
      .hljs-built_in,
      .hljs-builtin-name {
        color: #0086b3;
      }
      .hljs-meta {
        color: #999;
        font-weight: bold;
      }
      .hljs-deletion {
        background: #fdd;
      }
      .hljs-addition {
        background: #dfd;
      }
    </style>
  </head>
  <body>
    <div class="container">
      ${htmlContent}
    </div>
  </body>
</html>`;

    // Launch Puppeteer to generate a PDF from the HTML content
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    // Define PDF options with proper margins.
    await page.pdf({ 
      path: pdfPath, 
      format: 'A4', 
      printBackground: true,
      margin: { top: '40px', bottom: '40px', left: '40px', right: '40px' }
    });
    
    await browser.close();
    return { success: true, pdfPath };
  } catch (error) {
    throw new Error(`Conversion failed: ${error.message}`);
  }
}