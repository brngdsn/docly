# 📄 Docly - Markdown to PDF Converter  

**Docly** is a command-line tool that converts Markdown files into PDFs using **Puppeteer** for rendering and **Marked.js** for Markdown parsing. It supports syntax highlighting for code blocks via **Highlight.js**.

---

## 🚀 Features  
✅ Convert Markdown to PDF effortlessly  
✅ Supports syntax highlighting for code blocks  
✅ Custom styling for a clean document layout  
✅ Simple CLI interface  

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

### Example:
```sh
docly -m README.md -p output.pdf
```

---

## 📝 Options  

| Option | Alias | Description | Required |
|--------|-------|-------------|----------|
| `--markdown <file>` | `-m` | Path to the Markdown file | ✅ |
| `--pdf <file>` | `-p` | Output PDF file name | ✅ |
| `--help` | | Show help information | ❌ |
| `--version` | | Display the current version | ❌ |

---

## 🖥 Example Output  

Converting a Markdown file to PDF:
```sh
docly -m example.md -p example.pdf
```
**Output:**  
```
Converting "example.md" to "example.pdf"...
Conversion successful.
```

---

## 🔧 Dependencies  
- [**Commander.js**](https://github.com/tj/commander.js) – CLI argument parsing  
- [**Marked.js**](https://marked.js.org/) – Markdown to HTML conversion  
- [**Puppeteer**](https://pptr.dev/) – PDF generation  
- [**Highlight.js**](https://highlightjs.org/) – Syntax highlighting  

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

---

## 📝 License  
This project is licensed under the **MIT License**.

---

## 💡 Contributing  
Feel free to open an issue or submit a pull request! 🚀