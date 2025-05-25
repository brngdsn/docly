# 📄 Docly - Markdown to PDF Converter & PDF Merger

**Docly** is a command-line tool that converts Markdown files into PDFs using **Puppeteer** for rendering and **Marked.js** for Markdown parsing. It also supports merging multiple PDF files into one. Syntax highlighting for code blocks is provided by **Highlight.js**, and PDF merging is handled by **pdf-lib**.

---

## 🚀 Features
- ✅ Convert Markdown to PDF effortlessly.
- ✅ Merge multiple PDFs from a directory into one.
- ✅ Supports custom sorting of PDFs during merge (default: natural numeric order).
- ✅ Clean CLI interface with robust error handling.
- ✅ **NEW:** Full support for images with relative paths in Markdown files.
- ✅ **NEW:** Cover page support - render images as full-page front or back covers.

---

## 📦 Installation

Ensure you have **Node.js 20.8.0 or higher** installed.

### 1️⃣ Install Docly globally:
```sh
npm install -g docly
```

### 2️⃣ Or, use it directly with `npx`:
```sh
npx docly --help
```

---

## 🛠 Usage

### Convert a Markdown file to PDF:
```sh
docly -m input.md -p output.pdf
```
or  
```sh
docly --markdown input.md --pdf output.pdf
```

#### Image Support
Docly now fully supports images in your Markdown files:
- **Relative paths**: Images referenced with relative paths (e.g., `./images/diagram.png`) are automatically resolved relative to the Markdown file's location
- **Absolute paths**: Full system paths are supported
- **Web URLs**: External images from the web (http/https) work as expected
- **Automatic sizing**: Images are automatically sized to fit within the PDF page width while maintaining aspect ratio
- **Captions**: Regular images display their alt text as captions below the image in a smaller, italic font

Example Markdown with images:
```markdown
# My Document

![Figure 1: Architecture Diagram](./assets/architecture.png)
![User Interface Screenshot](../images/ui-screenshot.png)
![](./logo.png)  <!-- No caption if alt text is empty -->
![Web image](https://example.com/image.jpg)
```

**Note**: For best results, ensure your image files exist at the specified paths relative to your Markdown file.

#### Cover Pages
Docly supports rendering images as full-page covers:
- **Front Cover**: Use `![cover:front](./cover-image.jpg)` to add a front cover
- **Back Cover**: Use `![cover:back](./back-cover.jpg)` to add a back cover
- Cover images are rendered on their own page with no margins
- Images are cropped to fill the entire page (both width and height)
- Multiple front or back covers are supported

Example with covers:
```markdown
![cover:front](./front-cover.jpg)

# My Document

Content goes here...

![cover:back](./back-cover.jpg)
```

### Merge multiple PDFs into one:
Provide a directory containing PDF files using the `-g` or `--group` flag. Optionally, specify a sort order with `-s` or `--sort` (`asc` or `desc`). By default, files are sorted in natural ascending order.
```sh
docly -g ./pdfs -p merged.pdf
```
Example with descending sort:
```sh
docly -g ./pdfs -p merged.pdf -s desc
```

---

## 🖥 Example Output

### Markdown to PDF Conversion:
```sh
docly -m README.md -p output.pdf
```
**Output:**
```
Converting "README.md" to "output.pdf"...
Conversion successful.
```

### PDF Merge:
```sh
docly -g ./pdfs -p "Agentic Engineering.pdf"
```
**Output:**
```
Merging PDFs from "./pdfs" into "Agentic Engineering.pdf"...
Merge successful.
```

---

## 🔧 Dependencies
- [**Commander.js**](https://github.com/tj/commander.js) – CLI argument parsing.
- [**Marked.js**](https://marked.js.org/) – Markdown to HTML conversion.
- [**Puppeteer**](https://pptr.dev/) – PDF generation.
- [**Highlight.js**](https://highlightjs.org/) – Syntax highlighting.
- [**pdf-lib**](https://pdf-lib.js.org/) – PDF manipulation and merging.

---

## 🛠 Development Setup

Clone the repo and install dependencies:
```sh
git clone https://github.com/brngdsn/docly.git
cd docly
npm install
```

Run the CLI locally:
```sh
node bin/docly.js -m test.md -p test.pdf
```
or for merging PDFs:
```sh
node bin/docly.js -g ./pdfs -p merged.pdf
```

---

## 📝 License
This project is licensed under the **MIT License**.

---

## 💡 Contributing
Feel free to open an issue or submit a pull request! 🚀
