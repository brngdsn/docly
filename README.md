# 📄 Docly - Markdown to PDF Converter & PDF Merger

**Docly** is a command-line tool that converts Markdown files into PDFs using **Puppeteer** for rendering and **Marked.js** for Markdown parsing. It also supports merging multiple PDF files into one. Syntax highlighting for code blocks is provided by **Highlight.js**, and PDF merging is handled by **pdf-lib**.

---

## 🚀 Features
- ✅ Convert Markdown to PDF effortlessly.
- ✅ Merge multiple PDFs from a directory into one.
- ✅ Supports custom sorting of PDFs during merge (default: natural numeric order).
- ✅ Clean CLI interface with robust error handling.

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
