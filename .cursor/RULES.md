# Project Development Rules

This document outlines the essential rules and guidelines that must be followed when working on the Docly project.

## 1. YOU MUST Always Use NVM for CLI Execution

**Rule**: Before executing any CLI commands or running the application, always ensure you're using the correct Node.js version by running `nvm use`.

**Why**: This project specifies a Node.js version in `.nvmrc` to ensure consistency across all development environments and prevent version-related issues.

**Implementation**:
```bash
# Always run this before any npm or node commands
nvm use

# Then proceed with your commands
npm install
npm start
node bin/docly.js
```

## 2. YOU MUST Keep FILE_STRUCTURE.md Updated

**Rule**: Whenever you add, remove, or reorganize files or directories in the project, you must update `.cursor/FILE_STRUCTURE.md` to reflect the changes.

**Why**: An accurate file structure documentation helps new developers understand the project organization and maintains consistency in the codebase.

**When to update**:
- Adding new files or directories
- Removing files or directories
- Moving files between directories
- Renaming files or directories
- Changing the purpose of a file significantly

**Remember**: Respect the `.gitignore` rules when documenting the structure.

## 3. YOU MUST Commit all changes using Conventional Commits Format

**Rule**: All Git commits must follow the Conventional Commits specification.

**Format**: `<type>[optional scope]: <description>`

**Common types**:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning (white-space, formatting, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files

**Examples**:
```bash
git commit -m "feat: add PDF compression option to merger"
git commit -m "fix: resolve memory leak in PDF processing"
git commit -m "docs: update README with new CLI options"
git commit -m "refactor(pdfMerger): simplify merge logic"
git commit -m "chore: update dependencies to latest versions"
```

**Benefits**:
- Automatically generates changelogs
- Enables semantic versioning
- Makes commit history more readable
- Helps with automated releases

---

**Note**: These rules are mandatory for all contributors to ensure code quality, consistency, and maintainability of the Docly project.
