# Docly Project File Structure

This document provides an overview of the project's file structure, excluding items specified in `.gitignore`.

```
docly/
├── .cursor/                    # Cursor IDE configuration
│   ├── FILE_STRUCTURE.md      # This file - project structure documentation
│   └── RULES.md               # Development rules and guidelines
├── .git/                      # Git version control directory
├── bin/                       # Executable scripts
│   └── docly.js              # Main CLI executable
├── examples/                  # Example usage files
│   └── programmatic-usage.js # Examples of using docly as a library
├── src/                       # Source code directory
│   ├── docly.d.ts            # TypeScript type declarations
│   ├── docly.js              # Main library entry point (exports all functions)
│   ├── index.js              # Markdown to PDF conversion logic
│   ├── pdfExtractor.js       # PDF page extraction functionality
│   └── pdfMerger.js          # PDF merging functionality
├── .gitignore                 # Git ignore rules
├── .nvmrc                     # Node version specification
├── LICENSE                    # Project license file
├── package.json               # NPM package configuration
├── README.md                  # Project documentation
└── README.pdf                 # PDF version of documentation

## Excluded from version control (.gitignore):
- node_modules/               # NPM dependencies
- *-lock.*                   # Lock files (package-lock.json, etc.)
- .env                       # Environment variables

## Key Files Description:

### Configuration Files
- **package.json**: NPM package configuration with dependencies and scripts
- **.nvmrc**: Specifies the Node.js version for the project
- **.gitignore**: Defines files and directories to exclude from Git

### Source Code
- **src/docly.js**: Main library entry point that exports all public functions
- **src/docly.d.ts**: TypeScript type declarations for better IDE support
- **src/index.js**: Core Markdown to PDF conversion logic
- **src/pdfMerger.js**: Module for PDF merging functionality
- **src/pdfExtractor.js**: Module for PDF page extraction functionality

### Executable
- **bin/docly.js**: CLI executable script for the docly command

### Examples
- **examples/programmatic-usage.js**: Comprehensive examples showing how to use docly as a library

### Documentation
- **README.md**: Main project documentation in Markdown format
- **README.pdf**: PDF version of the project documentation
- **LICENSE**: Project licensing information

### IDE Configuration
- **.cursor/**: Directory containing Cursor IDE specific configurations
  - **FILE_STRUCTURE.md**: Project structure documentation
  - **RULES.md**: Development rules including NVM usage, file structure updates, and commit conventions
