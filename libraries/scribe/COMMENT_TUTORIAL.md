# Scribe Comment Tutorial for Parser

A friendly guide to understanding and using Scribe's comment syntax. Think of these as structured documentation that lives right in your code!

## The Basic Markers

### 1. Description Marker: `//++`

The description tells what a function does. It's the main documentation.

**Single line:**
```typescript
//++ Converts a string to uppercase
export default function toUpperCase(str: string): string {
  return str.toUpperCase()
}
```

**Multi-line block:**
```typescript
/*++
 * Parses a CSV file and returns an array of objects.
 * Each row becomes an object with column headers as keys.
 * Empty lines are skipped, and values are trimmed.
 */
export default function parseCsv(content: string): Array<Record<string, string>> {
  // implementation
}
```

**Important Rules:**
- Only the FIRST `//++` is used as the description
- Additional `//++` lines are flagged as errors
- Must appear before the function export

**Bad example (multiple descriptions):**
```typescript
//++ This is the description
//++ This will be flagged as an error!  ❌
export default function doSomething() {}
```

### 2. Help Marker: `//??`

Help markers provide examples, gotchas, pros/cons, and other helpful info. They use categories in square brackets.

#### Categories Available:
- `[EXAMPLE]` - Code examples showing usage (default if no category)
- `[GOTCHA]` - Unexpected behavior or common mistakes
- `[PRO]` - Benefits or strengths of the function
- `[CON]` - Limitations or weaknesses
- `[SETUP]` - Required setup or configuration
- `[ADVANCED]` - Advanced usage patterns
- `[MIGRATION]` - How to migrate from old versions

**Single line examples:**
```typescript
//++ Adds two numbers together
export default function add(a: number, b: number): number {
  return a + b
}

//?? [EXAMPLE] add(2, 3) // 5
//?? [EXAMPLE] add(-1, 1) // 0
//?? [GOTCHA] add(0.1, 0.2) // 0.30000000000000004 (floating point precision)
//?? [PRO] Pure function with no side effects
//?? [CON] No type checking for NaN or Infinity
```

**Multi-line block (each category starts a new item):**
```typescript
//++ Fetches data from an API with retry logic
export default async function fetchWithRetry(url: string): Promise<Response> {
  // implementation
}

/*??
 * [EXAMPLE]
 * const response = await fetchWithRetry('https://api.example.com/data')
 * const data = await response.json()
 * 
 * [EXAMPLE]
 * // With error handling
 * try {
 *   const response = await fetchWithRetry('https://api.example.com/data')
 * } catch (error) {
 *   console.error('Failed after all retries')
 * }
 * 
 * [GOTCHA]
 * The function retries 3 times by default with exponential backoff.
 * This means a failed request could take up to 7 seconds to fail completely.
 * 
 * [PRO]
 * Automatically handles transient network errors without manual intervention.
 * 
 * [CON]
 * Cannot customize retry count or backoff strategy without modifying the function.
 * 
 * [SETUP]
 * Requires a valid fetch implementation (native in browser/Deno, polyfill in Node).
*/
```

### 3. Tech Debt Marker: `//--`

Documents known issues, workarounds, or areas needing improvement. Must include a reason.

**Single line:**
```typescript
//-- Using string manipulation instead of proper AST parsing (temporary until Parser is ready)
function extractFunctionName(source: string): string {
  return source.match(/function\s+(\w+)/)?.[1] || ''
}
```

**Multi-line block:**
```typescript
/*--
 * This entire module needs refactoring:
 * - Still using regex for pattern matching
 * - Should be using AST traversal instead
 * - Counts string occurrences instead of semantic analysis
 * - Will be replaced when Parser provides proper AST nodes
*/
export default function detectComplexity(source: string): number {
  // hacky implementation
}
```

**Categories (optional):**
- `[WORKAROUND]` - Temporary fix for a problem
- `[LIMITATION]` - Known limitation of current approach
- `[OPTIMIZATION]` - Performance improvement needed
- `[REFACTOR]` - Code structure needs improvement
- `[COMPATIBILITY]` - Compatibility issue to address

```typescript
//-- [OPTIMIZATION] This O(n²) algorithm should be O(n log n)
//-- [WORKAROUND] Using setTimeout to avoid race condition
//-- [LIMITATION] Only handles ASCII characters currently
```

### 4. Critical Issue Marker: `//!!`

Marks critical problems that MUST be fixed. These block releases!

**Single line:**
```typescript
//!! Security vulnerability: SQL injection possible with user input
function queryDatabase(userInput: string) {
  return db.query(`SELECT * FROM users WHERE name = '${userInput}'`)
}
```

**Multi-line block:**
```typescript
/*!!
 * CRITICAL MEMORY LEAK DETECTED
 * This function creates circular references that prevent garbage collection.
 * The application will crash after ~1000 calls.
 * FIX REQUIRED: Break circular reference by using WeakMap instead.
 */
export default function createCache() {
  // problematic implementation
}
```

**Categories (optional):**
- `[SECURITY]` - Security vulnerabilities
- `[PERFORMANCE]` - Severe performance issues
- `[CORRECTNESS]` - Produces wrong results
- `[INCOMPLETE]` - Missing critical functionality
- `[BREAKING]` - Will break in production

```typescript
//!! [SECURITY] Passwords stored in plain text
//!! [CORRECTNESS] Returns wrong calculation for negative numbers
//!! [INCOMPLETE] Error handling not implemented
```

## Complete Real-World Examples

### Example 1: Simple Utility Function

```typescript
//++ Removes whitespace from the end of a string
export default function chomp(str: string): string {
  return str.replace(/\s+$/, '')
}

//?? [EXAMPLE] chomp('hello  ') // 'hello'
//?? [EXAMPLE] chomp('world\n\n') // 'world'
//?? [GOTCHA] Only removes from the end, not the beginning
//?? [PRO] Faster than trim() when you only need to clean the end
//?? [CON] Doesn't handle null or undefined inputs
```

### Example 2: Complex Function with Everything

```typescript
/*++
 * Detects if a function exhibits associative behavior by analyzing its AST.
 * A function is associative if f(f(a,b),c) equals f(a,f(b,c)).
 * This is crucial for optimization and parallelization.
 */
export default function isAssociativeFromAST(node: AstNode): boolean {
  return (
    hasBinaryAssociativeOperator(node) ||
    hasAssociativeMethodCall(node) ||
    hasAssociativeFunctionName(node)
  )
}

/*??
 * [EXAMPLE]
 * const addNode = parseFunction('function add(a, b) { return a + b }')
 * isAssociativeFromAST(addNode) // true
 * 
 * [EXAMPLE]
 * const subtractNode = parseFunction('function subtract(a, b) { return a - b }')
 * isAssociativeFromAST(subtractNode) // false
 * 
 * [GOTCHA]
 * Only detects structurally obvious patterns. 
 * Cannot detect semantic associativity in complex logic.
 * 
 * [PRO]
 * Uses proper AST analysis instead of fragile string matching.
 * 
 * [PRO]
 * Can detect associativity in minified or obfuscated code.
 * 
 * [CON]
 * Cannot detect associativity of higher-order functions.
 * 
 * [CON]
 * Relies on hardcoded SyntaxKind numbers from TypeScript.
 * 
 * [SETUP]
 * Requires AST nodes from the Parser library.
 * Will not work with raw source strings.
 * 
 * [ADVANCED]
 * Can be extended to detect custom associative patterns by adding
 * new operator kinds to ASSOCIATIVE_OPERATOR_KINDS constant.
*/

//-- [REFACTOR] Still using getText() for method detection instead of pure AST
//-- [LIMITATION] Cannot detect associativity in async functions

//!! [INCOMPLETE] Does not handle generator functions or async iterators
```

### Example 3: Migration Documentation

```typescript
//++ Validates an email address using modern standards
export default function validateEmail(email: string): boolean {
  // implementation
}

/*??
 * [MIGRATION]
 * Version 2.0 changes:
 * - Now follows RFC 5322 standard (previously RFC 822)
 * - Accepts Unicode characters in local part
 * - Maximum length increased from 254 to 320 characters
 * 
 * To migrate from v1:
 * 1. Update any length validation (254 -> 320)
 * 2. Remove any Unicode blocking logic
 * 3. Update test cases for new valid formats
 * 
 * [EXAMPLE]
 * // Old (v1) - would reject
 * validateEmail('user+tag@example.com') // now returns true
 * 
 * // Old (v1) - would accept  
 * validateEmail('user@localhost') // now returns false (requires TLD)
 */
```

## Best Practices

### DO:
- ✅ Put description (`//++`) IMMEDIATELY ABOVE the function declaration (on the line before)
- ✅ Put help comments (`//??`) AFTER the function body
- ✅ Include examples for every function
- ✅ Document gotchas that might surprise users
- ✅ Explain both PROs and CONs honestly
- ✅ Always provide a reason with tech debt markers
- ✅ Use categories to organize multi-line help blocks

### DON'T:
- ❌ Use multiple `//++` (only first is used)
- ❌ Leave tech debt markers empty (`//--` with no reason)
- ❌ Mix categories in a single line (`//?? [EXAMPLE] [GOTCHA]`)
- ❌ Use lowercase categories (`[example]` should be `[EXAMPLE]`)
- ❌ Put description (`//++`) after the function (it won't be associated)

## Quick Reference

| Marker | Purpose | Required? | Can be multiple? |
|--------|---------|-----------|------------------|
| `//++` | Main description | Recommended | No (only first used) |
| `//??` | Help/examples | Recommended | Yes |
| `//--` | Tech debt | When applicable | Yes |
| `//!!` | Critical issues | When critical | Yes |

| Category | Used with | Purpose |
|----------|-----------|---------|
| `[EXAMPLE]` | `//??` | Show usage examples |
| `[GOTCHA]` | `//??` | Warn about unexpected behavior |
| `[PRO]` | `//??` | Highlight benefits |
| `[CON]` | `//??` | Document limitations |
| `[SETUP]` | `//??` | Explain requirements |
| `[ADVANCED]` | `//??` | Show complex usage |
| `[MIGRATION]` | `//??` | Help with version changes |

## For Parser Implementation

When parsing these markers:

1. **Order matters**: Description must come before the function
2. **First wins**: Only the first `//++` counts
3. **Categories are UPPERCASE**: Normalize if needed
4. **Empty content is an error**: `//--` and `//!!` need explanations
5. **Default category**: `//??` without category defaults to `[EXAMPLE]`
6. **Multi-line blocks**: Each category marker starts a new item

Remember: These comments are meant to be helpful, structured documentation that lives with the code. They're not just comments - they're part of the API contract!
