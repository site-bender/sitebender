# CLAUDE.md

## CRITICAL: Query MCP Servers Before Writing Code

This codebase has **strict architectural, functional programming, syntax, and formatting rules** stored in Qdrant MCP servers. **You MUST query these servers BEFORE writing any code** to ensure compliance.

### Available MCP Servers

- **constitutional_rules** - Architecture (no classes, no barrel files, dependency boundaries, immutability, error handling)
- **syntax_rules** - Syntax (named functions only, no arrow functions, naming conventions, full words)
- **formatting_rules** - Formatting (tabs, 80 chars, UTF-8, LF endings, trailing whitespace)
- **functional_programming_rules** - FP (pure functions, no loops, no mutations, no exceptions)

### Project Essence

**Sitebender Studio**: Everything is data. JSX → JSON/YAML/Turtle → Triple stores → SPARQL → Direct DOM rendering. Not React.

### Essential Commands

```bash
deno task test                    # Run all tests
deno task fmt                     # Format code
deno task lint                    # Lint code
deno task fp:check               # Enforce FP rules
deno task contracts:check        # Check dependency boundaries
deno task dev                     # Run dev server
```

### Workflow

1. **Query MCP servers** for relevant rules (architecture, syntax, formatting, FP)
2. Write code following retrieved rules
3. Run `deno task fmt && deno task lint`
4. Run tests and verify compliance

### When to Query MCP

**Before writing ANY code**, query for:
- **File structure** → `constitutional_rules: "file structure one function exports"`
- **Import style** → `constitutional_rules: "barrel files imports"`
- **Function syntax** → `syntax_rules: "arrow functions named functions"`
- **Naming** → `syntax_rules: "abbreviations full words naming"`
- **Loops/iteration** → `functional_programming_rules: "loops map filter reduce"`
- **Error handling** → `functional_programming_rules: "exceptions try catch Result"`
- **Formatting** → `formatting_rules: "tabs indentation line length"`

### Key References

- `contracts/boundaries.json` - Inter-library dependency rules (CRITICAL)
- `deno.jsonc` - Workspace config, tasks, import aliases
- `.editorconfig` - Formatting rules

### Remember

- **Query MCP servers FIRST** - Don't guess the rules
- Everything is pure, immutable, functional
- No classes, no mutations, no loops, no barrel files, no arrow functions
- The MCP servers contain comprehensive rules, violations, and examples
