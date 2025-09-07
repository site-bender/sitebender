# Parser Library Design

## Overview

The parser library is the single source of truth for understanding TypeScript code. Both prover (test generator) and scribe (documentation generator) need to understand code, so we centralize that logic here.

## Core Parser Functions

### 1. File Parsing (Already Implemented)
```
parseSourceFile/
├── index.ts           # Takes a file path, returns TypeScript AST
├── mapTarget/         # Helper: converts string to TypeScript enum
└── mapModule/         # Helper: converts string to TypeScript enum
```

### 2. Function Extraction (To Be Implemented)
```
extractFunctions/
├── index.ts           # Finds all functions in a file
├── extractDefault/    # Gets the default export function
├── extractNamed/      # Gets named export functions  
└── extractAll/        # Gets everything (default + named)
```

Returns an array of function AST nodes because files might have multiple functions (even though @sitebender prefers one per file, other projects won't).

### 3. Signature Extraction (To Be Implemented)
```
extractSignature/
├── index.ts           # Takes a function node, returns signature
├── extractName/       # Gets the function's name
├── extractParameters/ # Gets all parameters
│   ├── index.ts      
│   └── extractType/   # Figures out each param's type
├── extractReturnType/ # Gets what the function returns
├── extractGenerics/   # Gets generic type parameters (T, U, etc.)
└── detectProperties/  # Detects special properties
    ├── index.ts
    ├── isCurried/     # Is it a curried function?
    ├── isAsync/       # Does it use async/await?
    ├── isPure/        # Does it have side effects?
    └── isGenerator/   # Is it a generator function?
```

### 4. Branch Analysis (To Be Implemented)
```
analyzeBranches/
├── index.ts           # Finds all decision points in code
├── extractIf/         # Finds if/else branches
├── extractTernary/    # Finds ? : branches
├── extractSwitch/     # Finds switch cases
├── extractLogical/    # Finds && and || branches
├── extractTry/        # Finds try/catch branches
└── computeId/         # Creates unique ID for each branch
```

### 5. Import Detection (To Be Implemented)
```
extractImports/
├── index.ts           # Gets all imports from a file
├── extractTypes/      # Gets type-only imports
├── extractValues/     # Gets value imports
└── resolveCustom/     # Identifies custom types (Result, Option, etc.)
```

### 6. Type Analysis (To Be Implemented)
```
analyzeType/
├── index.ts           # Takes a TypeScript type, returns our TypeInfo
├── analyzePrimitive/  # Handles string, number, boolean
├── analyzeArray/      # Handles Array<T> and T[]
├── analyzeObject/     # Handles object types
├── analyzeUnion/      # Handles A | B types
├── analyzeGeneric/    # Handles generic T types
└── analyzeLiteral/    # Handles literal types like "foo" or 42
```

## How They Work Together

1. **parseSourceFile** reads the TypeScript file and creates an AST
2. **extractFunctions** finds function nodes in that AST
3. **extractSignature** takes each function node and extracts its signature
4. **analyzeBranches** looks inside the function for decision points
5. **extractImports** finds what the function depends on
6. **analyzeType** understands complex types

## Why This Architecture Wins

1. **Single Responsibility**: Each function does ONE thing perfectly
2. **Testable**: Each tiny function can be tested in isolation
3. **Reusable**: Both prover and scribe can use the same functions
4. **Maintainable**: Bugs are isolated to specific functions
5. **Discoverable**: The folder structure IS the documentation
6. **Side-by-side editing**: Open multiple small files instead of scrolling through a monster
7. **Semantic paths**: `extractSignature/extractParameters/extractType` tells you exactly what it does
8. **Clean imports**: Default exports mean no brackets, automatic tree-shaking
9. **Visual hierarchy**: IDE sidebar shows the entire architecture at a glance
10. **Surgical fixes**: Break one function? Fix one file. Not 20 functions in a mega-file
11. **Git-friendly**: Changes are isolated, conflicts are rare, blame is precise
12. **Damage control**: Corrupt file = lose one function, not the entire module

## "Drawbacks" That Are Actually Benefits

People might complain about:
- **"Too many files"** → Each file is comprehensible. The compiler doesn't care.
- **"Deep nesting"** → The path IS the documentation. Every level adds meaning.
- **"Import overhead"** → One line per function. Big deal. It's explicit and clear.

## Alternatives Rejected

1. **Class-based Parser**: Violates functional programming principles
2. **Single Module with Multiple Exports**: Violates one-function-per-file rule
3. **Separate Libraries**: Duplication leads to drift and bugs

## Design Decisions

### Multiple Functions Per File
- We cannot assume one function per file (other projects won't follow this)
- Parser must handle multiple functions gracefully
- Return arrays of functions, not single functions

### Metadata Collection Using Result Monad

The Result monad will carry both parsed data AND metadata. Here's how:

```typescript
// Instead of just returning the AST:
type BasicResult = Result<SourceFile, ParseError>

// We return AST + metadata:
type ParseResult<T> = Result<{
  data: T,
  metadata: ParseMetadata
}, ParseError>

type ParseMetadata = {
  functionCount: number
  violations: Array<RuleViolation>
  warnings: Array<string>
  stats: {
    lines: number
    complexity: number
    branches: number
  }
}

type RuleViolation = {
  rule: string  // "multiple-functions-per-file"
  line: number
  message: string
}
```

This way:
- Success case carries both data AND metadata
- Functions remain pure (no side effects)
- Information flows through the chain
- Each function can add to metadata

Example usage with toolkit's pipe:
```typescript
import pipe from "@sitebender/toolkit/pipe"
import map from "@sitebender/toolkit/map"

// Each parser function is curried
const parseFile = parseSourceFile("file.ts")
const extractFuncs = extractFunctions
const addMetadata = enrichMetadata  

// Clean pipeline
const result = pipe(
  parseFile,
  map(extractFuncs),
  map(addMetadata),
  map(validateRules)
)({ logger: consoleLogger })

// Or with partial application
const analyzeFile = pipe(
  parseSourceFile,
  map(extractFunctions),
  map(result => ({
    ...result,
    metadata: {
      ...result.metadata,
      functionCount: result.data.functions.length,
      violations: result.data.functions.length > 1 
        ? [...result.metadata.violations, {
            rule: "multiple-functions-per-file",
            line: 1,
            message: `File has ${result.data.functions.length} functions, should have 1`
          }]
        : result.metadata.violations
    }
  }))
)

const result = analyzeFile("file.ts")()
```

### Logging Strategy: Dependency Injection

Keep it simple and practical:

```typescript
type Logger = {
  debug: (message: string) => void
  info: (message: string) => void
  warn: (message: string) => void
  error: (message: string) => void
}

// Silent logger for production
const silentLogger: Logger = {
  debug: () => {},
  info: () => {},
  warn: () => {},
  error: () => {}
}

// Console logger for development
const consoleLogger: Logger = {
  debug: (msg) => console.log(`[DEBUG] ${msg}`),
  info: (msg) => console.info(`[INFO] ${msg}`),
  warn: (msg) => console.warn(`[WARN] ${msg}`),
  error: (msg) => console.error(`[ERROR] ${msg}`)
}

// Functions accept optional logger
function parseSourceFile(filePath: string) {
  return function(options?: ParseOptions & { logger?: Logger }) {
    const log = options?.logger || silentLogger
    log.debug(`Parsing ${filePath}`)
    // ... rest of function
  }
}
```

Why this approach:
- **Practical**: Easy to understand and use
- **Pure**: Logger is injected, not global
- **Flexible**: Can swap loggers for testing
- **Optional**: Defaults to silent (no surprise output)

Why NOT Writer monad:
- Too academic for this use case
- Adds complexity without clear benefit
- Harder for other devs to understand
- We're building tools, not proving theorems

### The Hidden Monad Pattern

The {data, metadata} object is actually a monad itself - a "box" that:
- **Wraps** the parsed value (data)
- **Accumulates** information (metadata)
- **Flows through** the pipeline

We've essentially created a nested monad structure:
- **Outer monad**: Result (handles success/failure)
- **Inner monad**: {data, metadata} (accumulates context)

This gives us Writer monad benefits without the complexity:

```typescript
// Academic approach:
Writer<ParsedAST, Metadata>

// Our practical approach:
Result<{data: ParsedAST, metadata: Metadata}, Error>
```

Same power, clearer intent, easier for developers to understand.

## AST vs Regex: What We Actually Need

### Everything from the AST

The TypeScript compiler API gives us EVERYTHING we need:

**For Signature Extraction:**
- Function names: `node.name.getText()`
- Parameters: `node.parameters` array with types
- Return types: `checker.getReturnTypeOfSignature()`
- Generics: `node.typeParameters`
- Modifiers: `node.modifiers` (async, export, etc.)

**For Type Analysis:**
- Type nodes: `ts.isUnionTypeNode()`, `ts.isArrayTypeNode()`, etc.
- Literal values: `ts.isStringLiteral()`, `ts.isNumericLiteral()`
- Complex types: `ts.TypeChecker` resolves everything

**For Branch Analysis:**
- If statements: `ts.isIfStatement()`
- Ternary: `ts.isConditionalExpression()`
- Switch: `ts.isSwitchStatement()`
- Logical: `ts.isBinaryExpression()` with `&&` or `||`
- Try/catch: `ts.isTryStatement()`

### No Regex Needed

The current prover has a mistake - it uses regex for branch analysis:
```typescript
// BAD: Current prover code
const match = line.match(/if\s*\((.*?)\)/)

// GOOD: Should use AST
if (ts.isIfStatement(node)) {
  const condition = node.expression
}
```

The TypeScript AST handles:
- Nested structures
- Multi-line statements
- Comments and whitespace
- Complex expressions
- Type information

### The Only Exception

String checking as a last resort fallback:
```typescript
// Only when AST doesn't categorize it
if (raw.includes("=>")) {
  return { kind: TypeKind.Function }
}
```

But even this could be avoided with proper AST traversal.

### Bottom Line

We can do EVERYTHING with the TypeScript AST. No regex needed. No lexer needed. The compiler already did that work.

## Comment Extraction for Scribe

### Comments Are Not in the AST

Comments aren't nodes in the TypeScript AST - they're stored as "trivia" attached to nodes. But we CAN get them:

```typescript
// Get leading comments before a node
const leadingComments = ts.getLeadingCommentRanges(
  sourceFile.getFullText(), 
  node.getFullStart()
)

// Get trailing comments after a node
const trailingComments = ts.getTrailingCommentRanges(
  sourceFile.getText(), 
  node.getEnd()
)
```

### Extracting Comment Text

Once we have comment ranges, we extract the actual text:

```typescript
function extractCommentText(sourceFile: ts.SourceFile, range: ts.CommentRange): string {
  return sourceFile.getFullText().slice(range.pos, range.end)
}
```

### The @sitebender Comment System

The codebase uses special comment markers:

- `//++` or `/*++` - Descriptive comments (for documentation)
- `//--` or `/*--` - Tech debt markers
- `//??` or `/*??` - Example usage

Our parser will need a function like:

```typescript
extractComments/
├── index.ts              # Main comment extractor
├── extractLeading/       # Get comments before node
├── extractTrailing/      # Get comments after node
├── parseCommentMarkers/  # Identify //++, //--, //??
└── associateWithNode/    # Link comments to their nodes
```

### For Scribe's Needs

Scribe will need:
1. **Function descriptions** from `//++` comments
2. **Examples** from `//??` comments  
3. **Tech debt warnings** from `//--` comments
4. **Unspecified comments** for context (optional)

The parser provides all this through the AST + comment extraction APIs. No regex parsing of source text needed.

### Key Points

- Use `getFullText()` not `getText()` (the latter strips comments!)
- Comments can belong to multiple nodes (be careful of duplicates)
- Track which comments you've already processed
- Comment ranges become invalid after source modifications (only matters if you're transforming code, not for reading)

### Comment Association Strategy

For files with multiple functions (against @sitebender rules but common elsewhere), we support explicit function markers:

```typescript
//++ [functionName] Description goes here
//-- [functionName] Tech debt note
//?? [functionName] Example usage
```

**Rules:**
1. **Single function file**: Markers optional (all comments belong to the one function)
2. **Multiple function file**: 
   - With markers: Comments explicitly associated
   - Without markers: Best-effort proximity matching (unreliable)
3. **Placement flexibility**: Marked comments can appear anywhere in the file
4. **Examples below**: Your preference for examples below the function works fine with markers

Example:
```typescript
// Single function file - no markers needed
//++ Adds two numbers together
export default function add(a: number) {
  return function(b: number) {
    return a + b
  }
}

//?? add(2)(3) // Returns: 5

// Multi-function file - markers recommended
//++ [multiply] Multiplies two numbers
export function multiply(a: number, b: number) {
  return a * b
}

//++ [divide] Divides two numbers
export function divide(a: number, b: number) {
  return a / b
}

//?? [multiply] multiply(3, 4) // Returns: 12
//?? [divide] divide(10, 2) // Returns: 5
```

The parser will:
1. Extract ALL comments (special and unspecified)
2. Parse function names from markers
3. Associate comments with matching functions
4. Categorize comments by type:
   - `description` (//++)
   - `techDebt` (//--) 
   - `example` (//??}
   - `unspecified` (// or /* */)
5. Return everything, let consumers decide what to use

This is WAY less verbose than JSDoc but still explicit when needed.

### Unspecified Comments

The parser extracts EVERYTHING and categorizes it:

```typescript
type ExtractedComment = {
  type: "description" | "techDebt" | "example" | "unspecified"
  text: string
  functionName?: string  // From [functionName] marker if present
  line: number
  column: number
}
```

Parser's job: Extract and categorize.
Scribe's job: Decide what to include in docs.
Prover's job: Probably ignore them all.

This separation of concerns means:
- Parser doesn't make documentation decisions
- Scribe might include unspecified comments for context
- Prover focuses on examples for test generation
- Other tools can use what they need

## Coordination with Scribe Library

### Division of Responsibilities (Final Decision)

The Parser will be **purely structural** - it extracts and associates but doesn't interpret:

| Concern | Parser | Scribe |
|---------|--------|--------|
| Raw comment extraction from AST | ✅ | ❌ |
| Node association (which function owns which comment) | ✅ | ❌ |
| Marker classification (//++, //??, //--) | ❌ | ✅ |
| Policy enforcement (min length, etc.) | ❌ | ✅ |
| Diagnostics about comment quality | ❌ | ✅ |

### Parser's Contract to Scribe

```typescript
// What Parser provides
type RawComment = {
  kind: 'line' | 'block'        // Single-line vs multi-line
  text: string                  // Trimmed interior text
  fullText: string              // Original slice from source
  start: number                 // Absolute position in file
  end: number                   // Absolute position in file
  line: number                  // 1-based line number
  column: number                // 1-based column number
  nodeId?: string               // Associated function name (if determinable)
}

// Parser functions Scribe will call
extractComments(sourceFile: ts.SourceFile): Array<RawComment>
associateComments(
  comments: Array<RawComment>, 
  functions: Array<FunctionNode>
): Array<RawComment>  // Adds nodeId where possible
```

### Answers to Scribe's Questions

1. **Q: Should marker classification live in Parser or Scribe?**
   A: **In Scribe**. Parser stays purely structural. It provides raw comments with positions and associations. Scribe interprets markers.

2. **Q: Should ambiguous comments be flagged as diagnostics?**
   A: **Yes, by Scribe**. Parser will mark comments it can't confidently associate (no nodeId). Scribe generates the diagnostic.

3. **Q: Will Parser surface any diagnostics?**
   A: **No comment diagnostics**. Parser only reports structural issues (parse errors, type errors). Comment quality/policy diagnostics belong to Scribe.

### What Parser Guarantees

1. **No duplicate comments** - Each comment appears once, even if multiple nodes could claim it
2. **Best-effort association** - Uses proximity and scope rules to assign nodeId
3. **Preserved formatting** - Both trimmed text and fullText provided
4. **Stable positions** - Line/column numbers match source file exactly

### Migration Path

1. Parser implements `extractComments` returning `RawComment[]`
2. Scribe creates adapter: `parseMarkers(comments: RawComment[]): ParsedMarkerResult`
3. Both systems run in parallel for validation
4. Scribe removes line-scanning code once parity confirmed
5. Add `[functionName]` support in Scribe's marker parser

### Example Flow

```typescript
// Parser extracts raw comments
const sourceFile = parseSourceFile("file.ts")()
const comments = extractComments(sourceFile.data)
const functions = extractFunctions(sourceFile.data)
const associated = associateComments(comments, functions)

// Scribe interprets markers
const markers = parseMarkers(associated)  // Scribe's domain
// markers.description, markers.examples, markers.techDebt
// markers.diagnostics for any issues

// Final result includes both
return {
  data: { functions, comments: markers },
  metadata: {
    functionCount: functions.length,
    commentCount: comments.length,
    diagnostics: markers.diagnostics  // From Scribe
  }
}
```

### Key Principle

Parser = **What is there** (structural truth)
Scribe = **What it means** (semantic interpretation)

This keeps the Parser reusable for any tool that needs TypeScript understanding, while Scribe owns all documentation-specific logic.