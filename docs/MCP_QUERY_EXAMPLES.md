# MCP Query Examples for Common Scenarios

This guide provides specific MCP query examples for different coding scenarios in the Sitebender Studio codebase.

## Query Syntax

```typescript
// Use the use_mcp_tool with server name and query
use_mcp_tool(
  server_name: "constitutional_rules" | "syntax_rules" | "formatting_rules" | "functional_programming_rules",
  tool_name: "qdrant-find",
  arguments: { query: "your search terms" }
)
```

## Scenario-Based Query Examples

### 1. Creating a New Function

**Scenario:** You need to create a new function in a library.

**Queries:**
```typescript
// File structure and exports
constitutional_rules: "file structure one function per file exports"

// Function naming and syntax
syntax_rules: "named functions arrow functions exports"

// Formatting requirements
formatting_rules: "indentation tabs line length"
```

**What You'll Learn:**
- One function per file rule
- Export on declaration line
- No arrow functions
- Naming conventions
- Indentation with tabs
- 80 character line limit

---

### 2. Working with Arrays/Collections

**Scenario:** You need to iterate over an array or transform data.

**Queries:**
```typescript
// Loop prohibition and alternatives
functional_programming_rules: "loops for while map filter reduce"

// Immutability requirements
functional_programming_rules: "immutable arrays push pop mutations"

// Correct iteration patterns
functional_programming_rules: "map filter reduce recursion examples"
```

**What You'll Learn:**
- No for/while loops allowed
- Use map/filter/reduce
- No mutating methods (push, pop, splice)
- Immutable update patterns
- Recursion for custom logic

---

### 3. Error Handling

**Scenario:** You need to handle errors in your code.

**Queries:**
```typescript
// Exception prohibition
functional_programming_rules: "exceptions throw try catch"

// Result type usage
functional_programming_rules: "Result type error handling"

// Validation type usage
functional_programming_rules: "Validation accumulate errors"
```

**What You'll Learn:**
- No throw/try-catch in pure code
- Use Result<T, E> for fail-fast
- Use Validation<T, E> for accumulation
- try-catch only at effect boundaries
- Error-as-value patterns

---

### 4. Importing from Other Libraries

**Scenario:** You need to import functions from another library.

**Queries:**
```typescript
// Import style requirements
constitutional_rules: "barrel files imports tree imports"

// Dependency boundaries
constitutional_rules: "dependency boundaries layers DAG"

// Alias usage
constitutional_rules: "import aliases @sitebender"
```

**What You'll Learn:**
- No barrel file imports
- Direct tree imports required
- Dependency layer rules
- Use @sitebender/ aliases
- Check contracts/boundaries.json

---

### 5. Naming Variables and Functions

**Scenario:** You need to name a variable or function.

**Queries:**
```typescript
// Naming conventions
syntax_rules: "naming conventions full words abbreviations"

// Curried function naming
syntax_rules: "curried functions inner function names"

// Readable names
syntax_rules: "descriptive names plain english"
```

**What You'll Learn:**
- No abbreviations (except whitelist: id, html, url, api, ast)
- Full descriptive names
- Inner functions include captured params
- Read like plain English

---

### 6. Working with Objects/State

**Scenario:** You need to update an object or manage state.

**Queries:**
```typescript
// Immutability rules
functional_programming_rules: "immutable objects const mutations"

// Object update patterns
functional_programming_rules: "spread operator object update"

// No classes
constitutional_rules: "classes prohibited modules functions"
```

**What You'll Learn:**
- No classes allowed
- All variables const
- Use spread operators for updates
- Return new objects, never mutate
- Pure functions with state as parameters

---

### 7. File Organization

**Scenario:** You're organizing code in a library.

**Queries:**
```typescript
// File structure
constitutional_rules: "file structure folders organization"

// Private functions
constitutional_rules: "private functions underscore prefix"

// No utils folders
constitutional_rules: "utils helpers folders prohibited"
```

**What You'll Learn:**
- One function per file
- Underscore prefix for private
- No utils/ or helpers/ folders
- Co-located tests (index.test.ts)
- Function name matches folder name

---

### 8. Formatting Code

**Scenario:** You need to format your code correctly.

**Queries:**
```typescript
// Indentation
formatting_rules: "tabs spaces indentation"

// Line length
formatting_rules: "line length 80 characters"

// Line endings and encoding
formatting_rules: "line endings LF CRLF UTF-8"

// Whitespace
formatting_rules: "trailing whitespace final newline"
```

**What You'll Learn:**
- Tabs for indentation (2 space width)
- 80 character line limit
- LF line endings only
- UTF-8 without BOM
- Trim trailing whitespace
- Final newline required

---

### 9. Working with Arborist (Parser)

**Scenario:** You need to parse TypeScript/JSX code.

**Queries:**
```typescript
// Arborist usage
constitutional_rules: "arborist parser SWC typescript"

// Parser API
constitutional_rules: "parseFile buildParsedFile AST"

// Never use TS compiler directly
constitutional_rules: "typescript compiler prohibited arborist"
```

**What You'll Learn:**
- Arborist is the only parser
- Never import TypeScript compiler
- Use parseFile and buildParsedFile
- Immutable ParsedFile/ParsedFunction
- 20-50x faster than TS compiler

---

### 10. Checking Dependency Boundaries

**Scenario:** You need to verify library dependencies are valid.

**Queries:**
```typescript
// Dependency rules
constitutional_rules: "dependency boundaries contracts DAG"

// Layer structure
constitutional_rules: "library layers dependencies"

// Circular dependencies
constitutional_rules: "circular dependencies prohibited"
```

**What You'll Learn:**
- Libraries form a DAG
- No circular dependencies
- Check contracts/boundaries.json
- Layer 0: toolsmith, quarrier
- Higher layers depend on lower only

---

## Multi-Query Strategy

For complex tasks, query multiple servers:

```typescript
// Example: Creating a new array transformation function

// 1. Architecture
constitutional_rules: "file structure exports"

// 2. Syntax
syntax_rules: "function naming arrow functions"

// 3. FP Rules
functional_programming_rules: "map filter immutable arrays"

// 4. Formatting
formatting_rules: "tabs line length"
```

## Query Tips

1. **Be Specific**: Include relevant keywords for your scenario
2. **Query Multiple Angles**: Try different phrasings if first query doesn't help
3. **Combine Terms**: Use related terms together (e.g., "loops map filter")
4. **Check Examples**: MCP returns violations AND correct examples
5. **Query Before Coding**: Always query BEFORE writing code, not after

## Common Query Patterns

| Task | Server | Query Terms |
|------|--------|-------------|
| Function syntax | syntax_rules | "arrow functions named exports" |
| Loops | functional_programming_rules | "loops for while map filter" |
| Mutations | functional_programming_rules | "immutable const mutations" |
| Imports | constitutional_rules | "barrel files imports tree" |
| Errors | functional_programming_rules | "exceptions Result Validation" |
| Classes | constitutional_rules | "classes prohibited modules" |
| Naming | syntax_rules | "abbreviations full words" |
| Formatting | formatting_rules | "tabs indentation line length" |
| Dependencies | constitutional_rules | "boundaries layers DAG" |
| File structure | constitutional_rules | "one function per file" |

## Remember

- **Query FIRST, code SECOND**
- MCP servers contain rules, violations, and correct examples
- Multiple queries are better than guessing
- The RAG system is your source of truth
