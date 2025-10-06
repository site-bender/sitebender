# Arborist

Arborist is a parsing library for TypeScript and JSX. When you need to understand the structure of source code—the functions it contains, where comments appear, what modules it imports—you use Arborist. It returns this information as structured data, leaving interpretation to other libraries.

The library uses SWC through deno_ast as its parser backend. This choice matters because SWC provides syntax-level parsing twenty to fifty times faster than the TypeScript compiler. For most tasks in the Sitebender ecosystem, syntax-level information proves sufficient.

## The Core Responsibility

Arborist extracts structural information from source files. Consider it a specialized tool that knows how to read TypeScript and JSX syntax and transform that syntax into queryable data structures. It doesn't perform type checking. It doesn't infer types. It doesn't resolve symbols across files. Those are different problems requiring different solutions.

What it does do is parse quickly and accurately, providing precise span information for every element it discovers. When Envoy needs to generate documentation, when Auditor needs to analyze test coverage, when Quarrier needs type signatures for generator creation—they all ask Arborist for the structural data they need.

This pattern—one library owning parser integration, other libraries consuming its outputs—eliminates duplication. We parse each file once, not three times.

## The API Surface

The library exposes six primary functions, each with a focused responsibility.

### parseSourceFile

This function takes a file path and source text, returning a ParsedModule. The ParsedModule contains the SWC program (the parsed AST), the comment collection from deno_ast, a SourceText instance for mapping character positions to line and column numbers, the detected MediaType, and the original file path.

You'll typically call this function first, then pass its result to the extraction functions that follow.

### extractFunctions

Given a parsed module, this function walks the AST and discovers all function declarations and function expressions. It returns an array of FunctionNodeIR structures.

Each FunctionNodeIR captures the function's name, its character span in the source file, flags indicating whether it's async or a generator or an arrow function, an array of parameter information including names and type annotations captured as text, the return type annotation as text if present, and any type parameters with their constraints.

The key insight here: type information comes from parsing the source text, not from semantic analysis. If the source says `function add(a: number, b: number): number`, we capture "number" as text. We don't verify that the function actually returns a number.

### extractComments

This function extracts all comments from the parsed module, returning an array of RawComment structures. Each RawComment includes the comment kind (line or block), the text with comment markers stripped, the full text preserving the original markers, absolute character positions for start and end, line and column numbers, and optionally a node ID linking the comment to a nearby function.

Arborist does not interpret comment syntax. When it sees `//++ Validates email format`, it extracts the text and position but makes no judgment about what `//++` means. That interpretation belongs to Envoy.

### extractImports

This function enumerates import statements, returning an array of ImportIR structures. Each ImportIR records the import specifier (the path being imported from), the import kind (named, default, or namespace), an array mapping imported names to local names, and the character span.

The function handles all standard import patterns:

```typescript
import foo from "./foo.ts"                    // default
import { bar } from "./bar.ts"                // named
import * as baz from "./baz.ts"               // namespace
import { original as renamed } from "./x.ts"  // renamed import
```

### analyzeBranches

This function walks the AST looking for conditional execution paths. It returns an array of BranchInfo structures describing if statements, ternary expressions, logical operators that short-circuit (`&&`, `||`, `??`), switch statements, and try-catch blocks.

Auditor consumes this information to understand which code paths exist and whether tests have exercised them.

### extractSignature

Given a FunctionNodeIR from extractFunctions, this function distills it to just its signature—the shape it presents to callers. Parameter names and types, return type, type parameters. This proves useful when you need to document or test a function without caring about its implementation.

## The Data Structures

### ParsedModule

```typescript
type ParsedModule = {
  program: SwcModule
  comments: CommentCollection
  sourceText: SourceText
  mediaType: MediaType
  specifier: string
}
```

This structure holds everything parseSourceFile produces. The other extraction functions take pieces of this structure as parameters.

### FunctionNodeIR

```typescript
type FunctionNodeIR = {
  name: string
  span: { start: number; end: number }
  isAsync: boolean
  isGenerator: boolean
  isArrow: boolean
  params: Array<{
    name: string
    optional: boolean
    typeText?: string
    span: { start: number; end: number }
  }>
  returnTypeText?: string
  typeParams?: Array<{
    name: string
    constraintText?: string
    defaultText?: string
  }>
}
```

Note that type information appears as optional text fields. This reflects reality: not all functions have type annotations in their source.

### RawComment

```typescript
type RawComment = {
  kind: "line" | "block"
  text: string
  fullText: string
  start: number
  end: number
  line: number
  column: number
  nodeId?: string
}
```

The distinction between `text` and `fullText` matters. The text field contains the comment content with markers removed. The fullText field preserves the original `//` or `/* */` markers. Both prove useful for different purposes.

### ImportIR

```typescript
type ImportIR = {
  specifier: string
  kind: "named" | "default" | "namespace"
  names: Array<{
    imported: string
    local: string
  }>
  span: { start: number; end: number }
}
```

For default and namespace imports, the names array contains a single entry. For named imports, it contains one entry per imported name.

### BranchInfo

```typescript
type BranchInfo = {
  kind: "if" | "ternary" | "logical" | "switch" | "try"
  span: { start: number; end: number }
  consequent?: { start: number; end: number }
  alternate?: { start: number; end: number }
}
```

The optional consequent and alternate spans capture the "then" and "else" paths when they exist. Not all branch types have both.

## Typical Usage

Here's how you'd use these functions together:

```typescript
import parseSourceFile from "@sitebender/arborist/parseSourceFile/index.ts"
import extractFunctions from "@sitebender/arborist/extractFunctions/index.ts"
import extractComments from "@sitebender/arborist/extractComments/index.ts"

const specifier = "/path/to/module.ts"
const source = await Deno.readTextFile(specifier)

const parsed = parseSourceFile(specifier, source)
const comments = extractComments(parsed)
const functions = extractFunctions(parsed.program, parsed.sourceText)
```

You parse once, then extract whatever structural information you need.

## Consumer Integration

Three libraries currently consume Arborist's outputs.

**Envoy** generates documentation by extracting comments and functions, interpreting the comment markers (`//++` for descriptions, `//??` for examples), and formatting API documentation. It never parses TypeScript directly.

**Auditor** analyzes test coverage by extracting branches and comparing them against coverage data from test runs. It uses function signatures for test generation. It never parses TypeScript directly.

**Quarrier** generates test data using type information from function signatures. It never parses TypeScript directly.

This pattern ensures we parse each file exactly once. Three consumers, one parser, no duplication.

## The Dependency Choice

Arborist depends on deno_ast version 0.34.4. This is the only external dependency in the entire Sitebender ecosystem—a constraint we enforce deliberately.

Why deno_ast? Because it exposes SWC, the Rust-based parser that Deno itself uses internally. This gives us several advantages:

- **Performance**: SWC parses twenty to fifty times faster than the TypeScript compiler
- **Alignment**: We use exactly the same parser Deno uses
- **Purity**: Pure ESM with no Node.js or npm dependencies
- **Precision**: Excellent span tracking for all AST nodes

The version pinning ensures reproducibility. We know exactly what parser behavior to expect.

## Performance Characteristics

The speed difference between SWC and the TypeScript compiler matters in practice:

- Small files (10-50 functions): under 10ms
- Medium files (100-500 functions): under 50ms
- Large files (1000+ functions): under 200ms

These measurements remain consistent because we're doing only syntax-level parsing. No type checking. No semantic analysis. Just structure.

When you need to parse an entire codebase, these differences compound. Parsing that might take minutes with the TypeScript compiler completes in seconds with SWC.

## Caching Strategy

Arborist implements content-addressed caching using SHA-256 hashes of source text. The same source text always produces the same hash, which serves as the cache key. Change one character, get a different hash, trigger a new parse.

For batch operations, Arborist provides a parseMany function that processes multiple files through Promise.all, parsing them in parallel.

## File Type Support

The library handles TypeScript (.ts), TSX (.tsx), JavaScript (.js), JSX (.jsx), and the module variants—MTS (.mts), CTS (.cts), MJS (.mjs), CJS (.cjs). Media type detection works by examining the file extension. The default assumption is TypeScript, since that's what the Sitebender ecosystem uses.

## Architectural Principles

Five principles guide Arborist's design:

**Syntax First.** We parse syntax, not semantics. Structure over meaning. This constraint enables speed.

**Speed Matters.** Parse time directly affects developer experience. Faster parsing means faster builds, faster tests, faster feedback loops. We optimize for this.

**Pure Functions.** No mutations. No side effects. Every function takes inputs and returns outputs deterministically. This makes the library predictable and testable.

**Direct Exports.** No barrel files. Each function lives in its own directory with its own index.ts. You import exactly what you need, nothing more.

**Single Responsibility.** Parse and extract. Don't interpret. Don't analyze. Don't generate. Other libraries handle those concerns.

## Boundaries and Responsibilities

Understanding what Arborist doesn't do proves as important as understanding what it does.

**Arborist provides:** Fast syntax-level parsing, precise span tracking, comment extraction with positions, import enumeration, branch discovery, function metadata.

**Arborist does not provide:** Semantic type analysis, type inference, symbol resolution, cross-file analysis, comment interpretation, documentation generation, test generation.

When libraries respect these boundaries, the system as a whole becomes easier to understand and maintain. Each library does one thing well.

## The Contract

Only Arborist imports deno_ast. This rule has no exceptions.

When Arborist changed its internal implementation—switching from the TypeScript compiler to SWC—consumers noticed only improved performance. The API remained stable. The data structures remained consistent. This stability represents the contract's promise: internal changes don't break external dependencies.

## Future Direction: Semantic Analysis

Eventually we'll add semantic type analysis as an optional enhancement. When needed, developers will call a function—likely named enrichWithTypes—that augments the syntax data with semantic type information using the TypeScript compiler.

The key word is *optional*. The fast syntax-only path remains untouched. You pay for semantic analysis only when you need it. No performance regression for the common case.

This two-phase approach—fast syntax parsing by default, optional semantic enrichment when needed—provides both speed and flexibility.

## Testing Strategy

Tests verify that Arborist correctly discovers functions (names, spans, flags), extracts type text from annotations, preserves comment positions (line, column, character offset), enumerates imports with accurate specifiers and names, and identifies branches.

When tests pass, the contract holds. When a test fails, we've broken something that consumers depend on.

## Why This Matters

Code analysis tools need to parse source files. Without Arborist, each tool would implement its own parser integration. We'd have three different versions of parsing logic, three different sets of bugs, three different performance characteristics.

With Arborist, we centralize parser integration. One implementation, tested once, optimized once, maintained once. Consumers get consistent, fast, accurate structural data.

This is a refactoring, in the original sense of the term. We extracted a common capability into a shared library and made it better than any individual implementation would have been.

The library works. The boundaries hold. The performance targets meet expectations.
