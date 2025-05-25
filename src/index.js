import { readFile } from 'fs/promises';
import { marked } from 'marked';
import hljs from 'highlight.js';
import puppeteer from 'puppeteer';
import path from 'path';
import { pathToFileURL } from 'url';
import { writeFile, unlink } from 'fs/promises';
import { tmpdir } from 'os';

// Configure marked to use highlight.js for code blocks.
marked.setOptions({
  highlight: (code, lang) => {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  mangle: false,
  headerIds: false
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
    // Get the absolute path and directory of the markdown file
    const absoluteMarkdownPath = path.resolve(markdownPath);
    const markdownDir = path.dirname(absoluteMarkdownPath);
    
    // Read the Markdown file content
    const markdownContent = await readFile(markdownPath, 'utf8');

    // Create a custom renderer to handle cover images
    const renderer = new marked.Renderer();
    const originalImage = renderer.image.bind(renderer);
    
    renderer.image = function(href, title, text) {
      // Check if this is a cover image (alt text starts with "cover:")
      if (text && text.toLowerCase().startsWith('cover:')) {
        const coverType = text.toLowerCase().replace('cover:', '').trim();
        if (coverType === 'front' || coverType === 'back') {
          return `<div class="cover-page cover-${coverType}"><img src="${href}" alt="${text}" title="${title || ''}"></div>`;
        }
      }
      // Regular image with caption
      const imgTag = originalImage(href, title, text);
      // If there's alt text and it's not empty, add it as a caption
      if (text && text.trim()) {
        return `<figure class="image-with-caption">${imgTag}<figcaption>${text}</figcaption></figure>`;
      }
      return imgTag;
    };

    // Convert Markdown to HTML with syntax highlighting for code blocks
    const htmlContent = marked.parse(markdownContent, { renderer });

    // Extract cover pages and main content - use non-greedy regex
    const coverPageRegex = /<div class="cover-page[^>]*><img[^>]*><\/div>/g;
    const coverPages = htmlContent.match(coverPageRegex) || [];
    const mainContent = htmlContent.replace(coverPageRegex, '');
    
    // Separate front and back covers
    const frontCovers = coverPages.filter(page => page.includes('cover-front'));
    const backCovers = coverPages.filter(page => page.includes('cover-back'));

    // Check if we have any cover pages
    const hasCoverPages = frontCovers.length > 0 || backCovers.length > 0;

    // Create the base href for the HTML document
    const baseHref = pathToFileURL(markdownDir + path.sep).href;

    // Wrap the HTML content with a basic template and inline styles.
    const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <base href="${baseHref}">
    <title>Document</title>
    <style>
      /* PDF page margins */
      @page {
        margin: 0.5in;
      }
      /* Special page setup for cover pages - no margins */
      @page cover {
        margin: 0;
      }
      body { 
        font-family: Arial, sans-serif; 
        margin: 0; 
        padding: 0; 
        line-height: 1.6; 
      }
      .container {
        margin: 0;
        padding: 0;
        page-break-before: auto;
      }
      /* Cover page styles */
      .cover-page {
        page: cover;
        page-break-after: always;
        width: 100vw;
        height: 100vh;
        margin: 0;
        padding: 0;
        display: block;
        position: relative;
        overflow: hidden;
      }
      .cover-page img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        margin: 0;
        padding: 0;
        display: block;
      }
      /* Ensure front cover is at the beginning */
      .cover-front {
        page-break-before: avoid;
      }
      /* Ensure back cover is at the end */
      .cover-back {
        page-break-before: always;
      }
      h1, h2, h3, h4, h5, h6 { 
        color: #333; 
        margin-top: 1.2em; 
        margin-bottom: 0.6em;
      }
      p { 
        margin: 0.6em 0; 
      }
      /* List styles with proper indentation */
      ul, ol {
        margin: 0.6em 2em;
        padding-left: 1.5em;
      }
      li {
        margin: 0.3em 0;
      }
      pre {
        background: #f4f4f4;
        padding: 10px;
        white-space: pre-wrap;
        overflow-wrap: break-word;
        margin: 1em 0;
        border-radius: 4px;
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
      /* Image styles */
      img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 1em auto;
      }
      /* Inline images */
      p img {
        display: inline;
        margin: 0;
      }
      /* Figure and caption styles */
      figure.image-with-caption {
        margin: 1.5em 0;
        text-align: center;
        max-width: 100%;
        padding: 0;
        display: block;
      }
      figure.image-with-caption img {
        margin: 0 auto 0.5em;
        max-width: 100%;
        height: auto;
        display: block;
      }
      figure.image-with-caption figcaption {
        font-size: 0.9em;
        color: #666;
        font-style: italic;
        margin-top: 0.5em;
        padding: 0 1em;
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
    ${frontCovers.join('\n')}
    <div class="container">
      ${mainContent}
    </div>
    ${backCovers.join('\n')}
  </body>
</html>`;

    // Launch Puppeteer to generate a PDF from the HTML content
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--allow-file-access-from-files'] // Allow local file access
    });
    const page = await browser.newPage();
    
    // Save HTML to a temporary file in the same directory as the markdown
    // This ensures relative paths work correctly
    const tempHtmlPath = path.join(markdownDir, `.temp-${Date.now()}.html`);
    await writeFile(tempHtmlPath, html);
    
    try {
      // Navigate to the temporary HTML file
      await page.goto(pathToFileURL(tempHtmlPath).href, { 
        waitUntil: 'networkidle0'
      });
      
      // Define PDF options with proper margins.
      await page.pdf({ 
        path: pdfPath, 
        format: 'A4', 
        printBackground: true,
        margin: { top: '0', bottom: '0', left: '0', right: '0' }
      });
    } finally {
      // Clean up temporary file
      await unlink(tempHtmlPath).catch(() => {}); // Ignore errors if file doesn't exist
      await browser.close();
    }
    
    return { success: true, pdfPath };
  } catch (error) {
    throw new Error(`Conversion failed: ${error.message}`);
  }
}