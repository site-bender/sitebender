# Envoy Comment Syntax Guide

A comprehensive guide to Envoy's comment syntax that transforms documentation into a living knowledge graph. These aren't just comments - they're structured metadata that powers intelligent documentation!

## 📚 Core Philosophy

"An Envoy takes what is given" - The code IS the truth. Comments describe and enhance, never contradict.

## 🎯 Universal Application

Comments work on ANY code element:

- Functions, constants, types, interfaces, classes, modules
- Comments must appear DIRECTLY ABOVE what they describe
- Multiple `//++` comments can be used throughout the file

## The Marker System

**CRITICAL:** Single-line comments (`//`) are ONE LINE ONLY. You cannot group multiple `//` lines together. For multi-line content, you MUST use block comments (`/* */`) with the pipe `|` operator. Bad syntax is ignored but reported.

### 1. Description Marker: `//++`

Describes what ANY code element does.

#### Categories for `//++`:

- `[DESCRIPTION]` - Standard description (default if no category specified)
- `[GROUP]` - Start a group of related elements
- `[END]` - End a group
- `[MODULE]` - Document an entire module/file (use with `/*++ */`)
- `[EXPORTS]` - List public API components (used with MODULE)
- `[INCLUDES]` - List internal/private components (used with MODULE)

**Functions:**

```typescript
//++ Converts a string to uppercase
export default function toUpperCase(str: string): string {
	return str.toUpperCase()
}
```

**Constants:**

```typescript
//++ Primary brand color for all UI components
export const PRIMARY_COLOR = "#007ACC"

//++ Dark mode background color
export const DARK_BACKGROUND = "#20232A"
```

**Types/Interfaces:**

```typescript
//++ User authentication token with expiry
export interface AuthToken {
	token: string
	expires: Date
	refreshToken?: string
}
```

**Multi-line with Markdown:**

```typescript
/*++
 | # CSV Arborist
 |
 | Parses CSV files with the following features:
 |
 | * Automatic header detection
 | * Unicode support
 | * Configurable delimiters
 |
 | Returns an array of objects with column headers as keys.
 */
export default function parseCsv(
	content: string,
): Array<Record<string, string>> {
	// implementation
}
```

### 2. Group Documentation: `[GROUP]` and `[END]`

Groups related code elements with shared documentation.

```typescript
//++ [GROUP] Authentication Constants
//++ JWT signing algorithm
export const JWT_ALGORITHM = "HS256"

//++ Token expiry time in seconds
export const TOKEN_EXPIRY = 3600

//++ Refresh token expiry (7 days)
export const REFRESH_EXPIRY = 604800
//++ [END]
```

**Nested Groups:**

```typescript
//++ [GROUP] Color System
//++ [GROUP] Brand Colors
//++ Primary interactive color
export const PRIMARY = "#007ACC"

//++ Secondary brand color
export const SECONDARY = "#20232A"
//++ [END]

//++ [GROUP] Semantic Colors
//++ Success state color
export const SUCCESS = "#10B981"

//++ Error state color
export const ERROR = "#EF4444"
//++ [END]
//++ [END]
```

### 3. Module Documentation: `[MODULE]`

Documents entire modules (collections of files and folders), not individual files. Used in barrel files or with EXPORTS/INCLUDES lists for superdevs who avoid barrel files.

```typescript
/*++ [MODULE]
 | # Authentication System
 |
 | Comprehensive authentication handling including:
 |
 | ## Features
 |
 | 1. **JWT Token Management**
 |    - Token generation and validation
 |    - Automatic refresh handling
 |    - Secure storage
 |
 | 2. **Session Management**
 |    - Stateless sessions
 |    - Redis-backed persistence
 |    - Automatic cleanup
 |
 | 3. **Permission System**
 |    - Role-based access control (RBAC)
 |    - Fine-grained permissions
 |    - Dynamic policy evaluation
 |
 | ## Security
 |
 | All tokens use **HS256** signing with rotating secrets.
 | Passwords are hashed using **bcrypt** with cost factor 12.
 */
```

**Module References (for superdevs without barrel files):**

```typescript
/*++ [MODULE]
 | # Arborist Library
 | Advanced TypeScript parsing and analysis
 */

/*>> [EXPORTS]
 | ./parse/parseSourceFile
 | ./parse/extractFunctions
 | ./parse/extractTypes
 */

/*>> [INCLUDES]
 | ./internal/createCompiler
 | ./internal/traverseAST
 | ./internal/symbolTable
 */
```

### 4. Reference/Link Marker: `//>>`

Creates semantic links using HTML `rel` values. Content is markdown link format.

**Navigation Links:**

```typescript
//>> [NEXT] [Session Management](./session/README.md)
//>> [PREV] [Getting Started](../docs/getting-started.md)
//>> [UP] [Authentication Overview](../README.md)
//>> [INDEX] [API Reference](../../api/index.md)
```

**Documentation Links:**

```typescript
//>> [GLOSSARY] [JWT](https://jwt.io/introduction)
//>> [HELP] [Troubleshooting Auth](./docs/troubleshooting.md)
//>> [CANONICAL] [RFC 7519 - JWT Spec](https://tools.ietf.org/html/rfc7519)
```

**Attribution:**

```typescript
//>> [AUTHOR] [Guy Beford](https://github.com/guybeford)
//>> [LICENSE] [MIT License](./LICENSE)
//>> [COPYRIGHT] Copyright 2025 Sitebender
```

**Related Resources:**

```typescript
//>> [RELATED] [OAuth 2.0 Guide](https://oauth.net/2/)
//>> [ALTERNATE] [Legacy Auth Docs (v1)](./legacy/auth-v1.md)
//>> [EXTERNAL] [Security Best Practices](https://owasp.org/auth)
```

### 5. Help Marker: `//??`

Provides examples, gotchas, pros/cons, and other helpful info with full markdown support.

#### Available Categories:

- `[EXAMPLE]` - Code examples showing usage (default if no category)
- `[GOTCHA]` - Unexpected behavior or common mistakes
- `[PRO]` - Benefits or strengths of the function
- `[CON]` - Limitations or weaknesses
- `[SETUP]` - Required setup or configuration
- `[ADVANCED]` - Advanced usage patterns
- `[MIGRATION]` - How to migrate from old versions

````typescript
/*??
 | [EXAMPLE]
 | ## Basic Usage
 |
 | ```typescript
 | const token = await generateToken(user)
 | const valid = await validateToken(token)
 | ```
 |
 | ## With Error Handling
 |
 | ```typescript
 | try {
 |   const token = await generateToken(user)
 |   res.cookie('auth', token, { httpOnly: true })
 | } catch (error) {
 |   logger.error('Token generation failed', error)
 | }
 | ```
 |
 | [GOTCHA]
 | **Warning**: Tokens expire after 1 hour by default.
 | Set `TOKEN_EXPIRY` environment variable to customize.
 |
 | [PRO]
 | * Stateless authentication
 | * Works across microservices
 | * No server-side session storage
 |
 | [CON]
 | * Token size larger than session cookies
 | * Cannot revoke tokens before expiry
 | * Requires careful secret management
 */
````

### 6. Tech Debt Marker: `//--`

Documents known issues, workarounds, or areas needing improvement.

```typescript
/*--
 | [REFACTOR]
 | ## Current Issues
 |
 | 1. Using regex instead of proper AST parsing
 | 2. O(n²) complexity in the main loop
 | 3. No caching of computed results
 |
 | ## Migration Plan
 |
 | - [ ] Replace regex with Arborist library
 | - [ ] Implement memoization
 | - [ ] Add Redis caching layer
 |
 | **Target**: Q1 2025
 */
```

#### Tech Debt Categories:

- `[WORKAROUND]` - Temporary fix for a problem
- `[LIMITATION]` - Known limitation of current approach
- `[OPTIMIZATION]` - Performance improvement needed
- `[REFACTOR]` - Code structure needs improvement
- `[COMPATIBILITY]` - Compatibility issue to address

### 7. Critical Issue Marker: `//!!`

Marks critical problems that MUST be fixed. These block releases!

````typescript
/*!!
 | [SECURITY]
 | # SQL Injection Vulnerability
 |
 | **Severity**: CRITICAL
 | **CVE**: Pending
 |
 | User input is directly interpolated into SQL query.
 |
 | ## Impact
 | - Database compromise possible
 | - User data exposure
 | - Privilege escalation
 |
 | ## Fix Required
 | Replace string interpolation with parameterized queries:
 |
 | ```typescript
 | // WRONG
 | db.query(`SELECT * FROM users WHERE id = ${userId}`)
 |
 | // CORRECT
 | db.query('SELECT * FROM users WHERE id = ?', [userId])
 | ```
 */
````

#### Critical Issue Categories:

- `[SECURITY]` - Security vulnerabilities
- `[PERFORMANCE]` - Severe performance issues
- `[CORRECTNESS]` - Produces wrong results
- `[INCOMPLETE]` - Missing critical functionality
- `[BREAKING]` - Will break in production

## 📋 Complete Example

````typescript
/*++ [MODULE]
 | # Mathematical Property Detection
 |
 | Analyzes functions to detect mathematical properties like:
 | * Associativity: `f(f(a,b),c) = f(a,f(b,c))`
 | * Commutativity: `f(a,b) = f(b,a)`
 | * Idempotence: `f(f(x)) = f(x)`
 */

/*>>
 | [CANONICAL] [Category Theory](https://en.wikipedia.org/wiki/Category_theory)
 | [AUTHOR] [Guy Beford](https://github.com/guybeford)
 | [NEXT] [Type Analysis](./types/README.md)
 */

//++ [GROUP] Associativity Detection

//++ Detects if a function exhibits associative behavior
export function isAssociative(node: AstNode): boolean {
	return (
		hasBinaryAssociativeOperator(node) ||
		hasAssociativeMethodCall(node)
	)
}

/*??
 | [EXAMPLE]
 | ```typescript
 | const addNode = parse('(a, b) => a + b')
 | isAssociative(addNode) // true
 |
 | const subNode = parse('(a, b) => a - b')
 | isAssociative(subNode) // false
 | ```
 |
 | [GOTCHA]
 | Only detects **structural** patterns, not semantic equivalence.
 */

//-- [LIMITATION] Cannot detect associativity in async functions

//++ Helper to check for associative operators
function hasBinaryAssociativeOperator(node: AstNode): boolean {
	// implementation
}

//++ [END] // End of Associativity Detection group

//++ [GROUP] Commutativity Detection

//++ Detects if a function exhibits commutative behavior
export function isCommutative(node: AstNode): boolean {
	// implementation
}

//!! [INCOMPLETE] Generator function support not implemented

//++ [END]
````

## 🎨 Markdown Support Everywhere

All comment content supports:

- **Headings**: `# H1`, `## H2`, `### H3`
- **Lists**: `* bullet`, `- dash`, `1. numbered`
- **Links**: `[text](url)`
- **Images**: `![alt text](path/to/image.png)` or `![diagram](https://example.com/diagram.svg)`
- **Code**: `` `inline` `` and `` ```blocks``` ``
- **Emphasis**: `**bold**`, `*italic*`, `~~strikethrough~~`
- **Tables**, blockquotes, and more!

## 📐 Smart Association Rules

1. **Description markers (`//++`)** associate with the NEXT code element
   - Exception: `[MODULE]` can stand alone to describe the entire module (multiple files/folders)
   - `[EXPORTS]` and `[INCLUDES]` are typically used with `[MODULE]` for superdevs without barrel files
2. **Other markers** (`//??`, `//--`, `//!!`, `//>>`) can appear anywhere and are collected as metadata
3. Blank lines and regular comments (`//` without markers) are ignored
4. Arborist automatically determines element type
5. Orphaned `[END]` markers are ignored but reported in diagnostics

## ✅ Best Practices

### DO:

- ✅ Use `//++` on any code element that needs documentation
- ✅ Group related constants/types with `[GROUP]...[END]`
- ✅ Add `[MODULE]` documentation to describe file purpose
- ✅ Use markdown for rich formatting
- ✅ Create semantic links with `//>>` markers
- ✅ Use pipe `|` for block comment margins (avoids markdown conflicts)

### DON'T:

- ❌ Try to group multiple `//` lines together - use `/* */` blocks instead
- ❌ Use type markers like `[FUNCTION]` - Arborist determines this automatically
- ❌ Mix categories in one line (`//?? [EXAMPLE] [GOTCHA]`)
- ❌ Leave tech debt without reasons
- ❌ Create unmatched `[GROUP]` without `[END]`
- ❌ Use asterisk `*` for block comment margins (conflicts with markdown lists)
- ❌ Use bad syntax - it will be ignored and reported

## 🔗 Quick Reference (For AIs That Don't Read So Good)

### The Golden Rules

1. **`//` comments are ONE LINE ONLY** - cannot be grouped
2. **`/* */` blocks for multi-line** - must use pipe `|`
3. **Description `//++` goes ABOVE the code** it describes
4. **Other markers can go anywhere**
5. **Bad syntax = ignored + reported**

### All Markers at a Glance

| Marker | Single Line | Block     | Purpose           | Associates With Code? |
| ------ | ----------- | --------- | ----------------- | --------------------- |
| `//++` | ✅          | `/*++ */` | Describe elements | ✅ (NEXT element)     |
| `//??` | ✅          | `/*?? */` | Help/examples     | ❌ (metadata only)    |
| `//--` | ✅          | `/*-- */` | Tech debt         | ❌ (metadata only)    |
| `//!!` | ✅          | `/*!! */` | Critical issues   | ❌ (metadata only)    |
| `//>>` | ✅          | `/*>> */` | Links/references  | ❌ (metadata only)    |

### Description Categories (`//++`)

| Category        | Usage             | Example                                  |
| --------------- | ----------------- | ---------------------------------------- |
| `[DESCRIPTION]` | Default, optional | `//++ Adds two numbers`                  |
| `[GROUP]`       | Start group       | `//++ [GROUP] Math utilities`            |
| `[END]`         | End group         | `//++ [END]`                             |
| `[MODULE]`      | Entire module     | `/*++ [MODULE] \| # Arborist Library */` |
| `[EXPORTS]`     | Public API        | `/*>> [EXPORTS] \| ./parse/index */`     |
| `[INCLUDES]`    | Internal files    | `/*>> [INCLUDES] \| ./internal/utils */` |

### Help Categories (`//??`)

| Category      | Purpose                 | Example                                             |
| ------------- | ----------------------- | --------------------------------------------------- |
| `[EXAMPLE]`   | Code examples (default) | `//?? [EXAMPLE] add(2, 3) // 5`                     |
| `[GOTCHA]`    | Warnings                | `//?? [GOTCHA] Returns NaN for invalid input`       |
| `[PRO]`       | Benefits                | `//?? [PRO] Very fast implementation`               |
| `[CON]`       | Limitations             | `//?? [CON] Only works with integers`               |
| `[SETUP]`     | Requirements            | `//?? [SETUP] Requires Node.js 18+`                 |
| `[ADVANCED]`  | Complex usage           | `//?? [ADVANCED] Can be curried: add(2)(3)`         |
| `[MIGRATION]` | Version changes         | `//?? [MIGRATION] v2.0 removed the third parameter` |

### Tech Debt Categories (`//--`)

| Category          | Usage               |
| ----------------- | ------------------- |
| `[WORKAROUND]`    | Temporary fix       |
| `[LIMITATION]`    | Known limitation    |
| `[OPTIMIZATION]`  | Performance issue   |
| `[REFACTOR]`      | Structure problem   |
| `[COMPATIBILITY]` | Compatibility issue |

### Critical Issue Categories (`//!!`)

| Category        | Usage                      |
| --------------- | -------------------------- |
| `[SECURITY]`    | Security vulnerability     |
| `[PERFORMANCE]` | Severe performance problem |
| `[CORRECTNESS]` | Wrong results              |
| `[INCOMPLETE]`  | Missing functionality      |
| `[BREAKING]`    | Will break in production   |

### Link Categories (`//>>`)

**Navigation**: `[NEXT]`, `[PREV]`, `[UP]`, `[INDEX]`, `[CONTENTS]`, `[FIRST]`, `[LAST]`
**Documentation**: `[GLOSSARY]`, `[HELP]`, `[APPENDIX]`, `[BOOKMARK]`
**Attribution**: `[AUTHOR]`, `[LICENSE]`, `[COPYRIGHT]`
**Relationships**: `[CANONICAL]`, `[ALTERNATE]`, `[RELATED]`, `[EXTERNAL]`

### Common Mistakes (DON'T DO THESE!)

❌ **WRONG - Trying to group single-line comments:**

```typescript
//++ This is a function
//++ that does something important  // ← WRONG! Will be ignored!
function doSomething() {}
```

✅ **CORRECT - Use block comments for multi-line:**

```typescript
/*++
 | This is a function
 | that does something important
 */
function doSomething() {}
```

❌ **WRONG - Using asterisks in block comments:**

```typescript
/*++
 * This conflicts with markdown
 * bullet lists and will break
 */
```

✅ **CORRECT - Use pipes in block comments:**

```typescript
/*++
 | This works perfectly
 | and supports markdown
 */
```

❌ **WRONG - Missing category brackets:**

```typescript
//?? EXAMPLE add(2, 3) // ← WRONG! No brackets
```

✅ **CORRECT - Always use brackets for categories:**

```typescript
//?? [EXAMPLE] add(2, 3) // 5
```

❌ **WRONG - Multiple categories in one line:**

```typescript
//?? [EXAMPLE] [PRO] add(2, 3) // ← WRONG!
```

✅ **CORRECT - One category per line:**

```typescript
//?? [EXAMPLE] add(2, 3) // 5
//?? [PRO] Very fast performance
```

### Syntax Patterns for Copy-Paste

**Simple description:**

```typescript
//++ Converts string to uppercase
export function toUpper(str: string): string {
```

**Group of related items:**

```typescript
//++ [GROUP] Color constants
//++ Primary brand color
export const PRIMARY = "#007ACC"
//++ Secondary color
export const SECONDARY = "#666"
//++ [END]
```

**Function with help:**

```typescript
//++ Adds two numbers together
export function add(a: number, b: number): number {
	return a + b
}
//?? [EXAMPLE] add(2, 3) // 5
//?? [GOTCHA] May return NaN with invalid input
```

**Module documentation:**

```typescript
/*++ [MODULE]
 | # Authentication System
 | Handles JWT tokens and sessions
 */

/*>> [EXPORTS]
 | ./auth/login
 | ./auth/logout
 */
```

## 🚀 The HATEOAS Revolution: Documentation as Living Knowledge Graph

These comments don't just create documentation - they power a **revolutionary transformation** of how we understand and navigate codebases.

### 🧭 ENVOY: The Project Intelligence Platform

**Not just documentation generation, but your codebase's diplomatic representative.**

"An Envoy takes what is given" - No assumptions, no guessing, just pure representation of your code's reality.

### 📊 Five Data Sources Creating the Knowledge Graph

#### 1. **Filesystem Semantics**

Path structure reveals dependencies: `a/b/c` means `c` is used by `b`, `b` is used by `a`. Folder names encode categories. Arborist infers semantic meaning from architectural patterns.

#### 2. **TypeScript Compiler Data**

Full symbol analysis, type relationships, import/export mappings, call graphs, implementation chains.

#### 3. **Configuration Files (First-Class Citizens)**

- `deno.jsonc` with inline comment documentation
- `deno.lock` for security tracking
- `.editorconfig` for style guide generation
- Lint/format configs for convention documentation

#### 4. **Git History Integration**

When functions were added/modified, author attribution, tech debt age tracking.

#### 5. **CSS Analysis (v2)**

Parse styles, match to components, document theming systems and progressive enhancement layers.

### 🕸️ The Knowledge Graph Structure

**Nodes**: Modules, Functions, Types, Constants, JSX Components, CSS Classes
**Edges**: `imports`, `calls`, `implements`, `uses`, `contains`, `extends`, `styles`, `tests`

**Triple Store Integration** via Apache Jena Fuseki with **SPARQL Query Support**:

```sparql
# What functions call parseSourceFile?
SELECT ?caller WHERE {
  ?caller calls :parseSourceFile
}

# What is the impact radius of changing this function?
SELECT ?affected WHERE {
  :targetFunction <-calls- ?affected
}

# Show me all security vulnerabilities by age
SELECT ?function ?issue ?age WHERE {
  ?function hasIssue ?issue .
  ?issue hasCategory "SECURITY" .
  ?issue hasAge ?age
} ORDER BY DESC(?age)
```

### 🔗 HATEOAS Implementation: Every Page is a State Machine

Each documentation page represents a **navigable state** with hypermedia controls:

```json
{
	"_links": {
		"self": "/functions/parseSourceFile",
		"module": "/modules/arborist",
		"calls": ["/functions/createCompiler", "/functions/readFile"],
		"calledBy": ["/functions/analyze", "/functions/lint"],
		"implements": "/types/arborist",
		"next": "/functions/extractFunctions",
		"tests": ["/tests/parseSourceFile.test.ts"],
		"source": "/src/parseSourceFile/index.ts",
		"author": "/authors/guybeford",
		"lastModified": "2025-09-10T14:30:00Z"
	}
}
```

**Context-Aware Navigation**: Links change based on location, "next steps" vary by entity type, related items highlighted, impact analysis available.

### ⚠️ Architectural Consistency Through Truth

**The Diplomatic Approach**: When conflicts arise, Envoy chooses the code as the single source of truth and politely ignores developer inconsistencies, with friendly warnings to help correct mistakes.

**Import Alias vs Filesystem Conflicts**: When aliases don't match nesting patterns, trust the filesystem structure and report the alias as "Architectural Inconsistency" with suggestions for alignment.

**Comment Category Misuse**: If someone uses `[EXPORTS]` in a function description instead of with `[MODULE]`, treat it as a regular description and warn about proper usage.

**API Boundary Violations**: When internal functions are imported externally, note the violation and suggest either making it officially public or stopping the import.

**Bad Comment Syntax**: Single-line comments grouped together are simply ignored, with helpful reminders about using block comments for multi-line content.

**Version Change Tracking**: Generate changelogs from `deno.jsonc` export changes and conventional commits, noting any inconsistencies.

### 🎯 Version 1 Features (The Revolution Begins)

1. **Core Graph Construction**
   - Filesystem semantic parser, TypeScript symbol analysis, dependency extraction, HATEOAS state/transitions

2. **Triple Store Integration**
   - Apache Jena Fuseki backend, RDF triple generation, SPARQL query interface

3. **Comprehensive Dashboard**
   - Critical bugs aggregated, tech debt by age, test coverage gaps, complexity hotspots, recent changes, author contributions, **linting status**, **formatting compliance**, **versioning overview**

4. **Intelligent Navigation**
   - Context-aware links, impact analysis, dependency trees, call flow tracking

5. **Multi-Source Metadata**
   - From filesystem paths, config files, git history, TypeScript compiler

### 🚀 Version 2 Features (The Future is Interactive)

1. **Live Playgrounds**
   - **Functions**: Editable parameters with real-time results
   - **Components**: Rendered output with props editor
   - **Types**: Example data validation
   - **CSS**: Theme switcher and live editing

2. **Progressive Enhancement Viewer**
   - Toggle: HTML only / HTML+CSS / HTML+CSS+JS
   - Shows degradation strategy, side-by-side comparison

3. **Visual Graph Explorer**
   - D3-powered dependency trees, call flow diagrams, impact radius heat maps

4. **Advanced Intelligence**
   - API breaking change detection, migration path generation, security audit integration, bundle size tracking

5. **Automated Style Guide Generation**
   - From lint/format configs, convention documentation, code style examples

### 🏗️ Implementation Roadmap

**Phase 1**: Arborist Extensions (Current)
**Phase 2**: Graph Foundation (Next)
**Phase 3**: Envoy MVP (v1) - HATEOAS navigation, dashboards, diplomatic conflict resolution
**Phase 4**: Interactive Envoy (v2) - Live playgrounds, visual exploration

### 🎭 The Envoy Philosophy

"An Envoy takes what is given" - The system is built on truth:

- Takes the filesystem structure AS IT IS
- Takes the configuration AS WRITTEN
- Takes the code AS IMPLEMENTED
- Reports conflicts HONESTLY
- Maintains architectural CONSISTENCY through diplomatic truth-telling

**No assumptions. No guessing. Just diplomatic representation of reality.**

---

Remember: The code IS the documentation. These comment markers are the diplomatic protocol that transforms your codebase into an intelligent, navigable, queryable knowledge graph that reveals architectural truth and enforces consistency.
