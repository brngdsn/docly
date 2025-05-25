/**
 * Docly - Markdown to PDF converter and PDF manipulation library
 */

/**
 * Options for converting Markdown to PDF
 */
export interface ConvertMarkdownToPdfOptions {
  /** Path to the Markdown input file */
  markdownPath: string;
  /** Path to output the generated PDF */
  pdfPath: string;
}

/**
 * Options for merging PDFs
 */
export interface MergePdfsOptions {
  /** Directory containing PDF files to merge */
  dirPath: string;
  /** Path for the merged PDF output */
  pdfPath: string;
  /** Sort order for files: "asc" (default) or "desc" */
  sort?: 'asc' | 'desc';
}

/**
 * Options for extracting pages from a PDF
 */
export interface ExtractPdfPagesOptions {
  /** Path to the input PDF file */
  inputPath: string;
  /** Path to output the extracted PDF */
  outputPath: string;
  /** Page range to extract (e.g., "1", "1-3", "1,3,5", "1-3,5,7-9") */
  pages: string;
}

/**
 * Result returned by conversion and merge operations
 */
export interface OperationResult {
  /** Whether the operation was successful */
  success: boolean;
  /** Path to the output PDF file */
  pdfPath?: string;
  /** Path to the output PDF file (for extract operation) */
  outputPath?: string;
  /** Number of pages extracted (for extract operation) */
  extractedPages?: number;
}

/**
 * Convert a Markdown file to a PDF
 * 
 * Features:
 * - Syntax highlighting for code blocks
 * - Support for images with relative paths
 * - Cover page support with ![cover:front] and ![cover:back] syntax
 * - Automatic image captions from alt text
 * 
 * @param options - Conversion options
 * @returns Promise resolving to operation result
 * @throws Error if conversion fails
 */
export function convertMarkdownToPdf(options: ConvertMarkdownToPdfOptions): Promise<OperationResult>;

/**
 * Merge multiple PDF files from a directory into a single PDF
 * 
 * Files are sorted naturally by filename, with numeric ordering support.
 * 
 * @param options - Merge options
 * @returns Promise resolving to operation result
 * @throws Error if merge fails or no PDFs found
 */
export function mergePdfs(options: MergePdfsOptions): Promise<OperationResult>;

/**
 * Extract specific pages from a PDF file
 * 
 * Supports various page range formats:
 * - Single page: "5"
 * - Page range: "1-3"
 * - Multiple pages: "1,3,5"
 * - Combined: "1-3,5,7-9"
 * 
 * @param options - Extraction options
 * @returns Promise resolving to operation result with extractedPages count
 * @throws Error if extraction fails or no valid pages specified
 */
export function extractPdfPages(options: ExtractPdfPagesOptions): Promise<OperationResult>; 