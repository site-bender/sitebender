# Arborist

Arborist is a parsing library for TypeScript and JSX. When you need to understand the structure of source code—the functions it contains, where comments appear, what modules it imports—you use Arborist. It returns this information as structured data, leaving interpretation to other libraries.

The library uses **SWC via @swc/wasm-web** as its parser backend. This choice matters because SWC provides syntax-level parsing twenty to fifty times faster than the TypeScript compiler. For most tasks in the Sitebender ecosystem, syntax-level information proves sufficient.

## The Core Responsibility

Arborist extracts structural information from source files. Consider it a specialized tool that knows how to read TypeScript and JSX syntax and transform that syntax into queryable data structures. It doesn't perform type checking. It doesn't infer types. It doesn't resolve symbols across files. Those are different problems requiring different solutions.

What it does do is parse quickly and accurately, providing precise span information for every element it discovers. When Envoy needs to generate documentation, when Auditor needs to analyze test coverage, when Quarrier needs type signatures for generator creation—they all ask Arborist for the structural data they need.

This pattern—one library owning parser integration, other libraries consuming its outputs—eliminates duplication. We parse each file once, not three times.

## The API Surface

The library exposes a focused API built around monadic error handling using Result and Validation types from Toolsmith.

### parseFile

This function takes a file path, reads it, and parses the source using SWC WASM. It returns a Result monad—either Ok with a ParsedAST, or Error with a detailed ParseError.

```typescript
function parseFile(
	filePath: string,
): Promise<Result<ParseError, ParsedAST>>
```

**Why Result?** File I/O and parsing are fail-fast operations. If the file doesn't exist or contains invalid syntax, we can't continue. Result signals this immediately.

**ParseError includes:**
- Error kind (FileNotFound, InvalidSyntax, ReadPermission, SwcInitializationFailed)
- File path
- Line and column numbers (for syntax errors)
- Helpful suggestions for fixing the issue
- Stack trace preservation

You'll typically call this function first, then pass its successful result to extraction functions.

### buildParsedFile

Given a ParsedAST and file path, this function runs all extraction operations and returns a complete ParsedFile. It returns a Validation monad—either Success with a ParsedFile, or Failure with accumulated errors from all extractors.

```typescript
function buildParsedFile(
	ast: ParsedAST,
) {
	return function buildFromAST(
		filePath: string,
	): Validation<ExtractionError, ParsedFile>
}
```

**Why Validation?** Extraction operations are independent. If function extraction fails, comment extraction might still work. Validation accumulates ALL errors so you see every issue at once, while still enabling partial success.

### extractFunctions

Given a ParsedAST, this function walks the AST and discovers all function declarations and function expressions. It returns a Validation monad with an array of ParsedFunction structures.

```typescript
function extractFunctions(
	ast: ParsedAST,
): Validation<FunctionExtractionError, ReadonlyArray<ParsedFunction>>
```

Each ParsedFunction captures:
- Function name
- Character span in source file
- Position (line and column)
- Modifiers (isExported, isDefault, isAsync, isGenerator, isArrow)
- Parameters with names, types (as text), optional flags, default values
- Return type (as text)
- Type parameters with constraints
- Body analysis (hasReturn, hasThrow, hasAwait, hasTryCatch, hasLoops, cyclomaticComplexity)

The key insight: type information comes from parsing the source text, not from semantic analysis. If the source says `function add(a: number, b: number): number`, we capture "number" as text. We don't verify that the function actually returns a number.

### extractComments

This function extracts all comments from the parsed AST, returning a Validation monad with an array of ParsedComment structures.

```typescript
function extractComments(
	ast: ParsedAST,
): Validation<CommentExtractionError, ReadonlyArray<ParsedComment>>
```

Each ParsedComment includes:
- Comment kind (line or block)
- Text content
- Position (line and column)
- Character span
- Optional Envoy marker detection (//++, //--, //!!, //??, //>>)
- Associated node reference (if comment is near a function)

Arborist detects Envoy marker syntax but does not interpret it. When it sees `//++ Validates email format`, it extracts the text and identifies the marker, but makes no judgment about what that means. Interpretation belongs to Envoy.

### extractImports

This function enumerates import statements, returning a Validation monad with an array of ParsedImport structures.

```typescript
function extractImports(
	ast: ParsedAST,
): Validation<ImportExtractionError, ReadonlyArray<ParsedImport>>
```

Each ParsedImport records:
- Import specifier (the path being imported from)
- Import kind (named, default, namespace, type)
- Bindings array mapping imported names to local names
- Character span
- Position

The function handles all standard import patterns including renamed imports and type-only imports.

### extractExports

This function enumerates export statements, returning a Validation monad with an array of ParsedExport structures.

```typescript
function extractExports(
	ast: ParsedAST,
): Validation<ExportExtractionError, ReadonlyArray<ParsedExport>>
```

Each ParsedExport records:
- Export name
- Export kind (default, named, reexport)
- Type flag (isType for type-only exports)
- Source specifier (for re-exports)
- Character span
- Position

### extractTypes

This function extracts type aliases and interfaces, returning a Validation monad with an array of ParsedType structures.

```typescript
function extractTypes(
	ast: ParsedAST,
): Validation<TypeExtractionError, ReadonlyArray<ParsedType>>
```

Each ParsedType includes:
- Type name
- Definition (as text)
- Export flag
- Character span
- Position

### extractConstants

This function extracts const declarations, returning a Validation monad with an array of ParsedConstant structures.

```typescript
function extractConstants(
	ast: ParsedAST,
): Validation<ConstantExtractionError, ReadonlyArray<ParsedConstant>>
```

Each ParsedConstant captures:
- Constant name
- Type annotation (as text)
- Value (as text, if simple literal)
- Export flag
- Character span
- Position

### detectViolations

This function analyzes the AST for constitutional rule violations, returning a Validation monad with ViolationInfo.

```typescript
function detectViolations(
	ast: ParsedAST,
): Validation<ViolationDetectionError, ViolationInfo>
```

ViolationInfo includes:
- Arrow functions (positions of all violations)
- Classes (positions)
- Throw statements (positions)
- Try-catch blocks (positions)
- Loops (positions)
- Mutations (positions)

## Error Handling

Arborist uses Toolsmith's rich error system with ArchitectError as the foundation. Every error includes:

- Operation name
- Arguments passed
- Clear message
- Error code
- Severity level
- Helpful suggestions (not scolding)
- Failed argument tracking
- Context preservation
- Stack traces

See `docs/error-handling.md` for complete documentation of error patterns.

## The Data Structures

### ParsedAST

```typescript
type ParsedAST = Readonly<{
	module: unknown // SWC Module type
	sourceText: string
	filePath: string
}>
```

This structure holds everything parseFile produces. The extraction functions take this as their parameter.

### ParsedFunction

```typescript
type ParsedFunction = Readonly<{
	name: string
	position: Position
	span: Span
	parameters: ReadonlyArray<Parameter>
	returnType: string
	typeParameters: ReadonlyArray<TypeParameter>
	modifiers: FunctionModifiers
	body: FunctionBody
}>
```

Type information appears as text fields captured directly from source annotations.

### ParsedComment

```typescript
type ParsedComment = Readonly<{
	text: string
	position: Position
	span: Span
	kind: "line" | "block"
	envoyMarker?: EnvoyMarker
	associatedNode?: string
}>
```

The envoyMarker field contains detected markers (++, --, !!, ??, >>) but no interpretation. That's Envoy's responsibility.

### ParsedImport

```typescript
type ParsedImport = Readonly<{
	specifier: string
	position: Position
	span: Span
	kind: "default" | "named" | "namespace" | "type"
	imports: ReadonlyArray<ImportBinding>
}>
```

For default and namespace imports, the imports array contains a single entry. For named imports, it contains one entry per imported name.

### ParsedExport

```typescript
type ParsedExport = Readonly<{
	name: string
	position: Position
	span: Span
	kind: "default" | "named" | "reexport"
	isType: boolean
	source?: string
}>
```

### ViolationInfo

```typescript
type ViolationInfo = Readonly<{
	hasArrowFunctions: boolean
	arrowFunctions: ReadonlyArray<Position>
	hasClasses: boolean
	classes: ReadonlyArray<Position>
	hasThrowStatements: boolean
	throwStatements: ReadonlyArray<Position>
	hasTryCatch: boolean
	tryCatchBlocks: ReadonlyArray<Position>
	hasLoops: boolean
	loops: ReadonlyArray<Position>
	hasMutations: boolean
	mutations: ReadonlyArray<Position>
}>
```

## Typical Usage

Here's how you'd use these functions together:

```typescript
import parseFile from "@sitebender/arborist/parseFile"
import buildParsedFile from "@sitebender/arborist/buildParsedFile"
import { fold as foldResult } from "@sitebender/toolsmith/monads/result/fold"
import { fold as foldValidation } from "@sitebender/toolsmith/monads/validation/fold"

const filePath = "/path/to/module.ts"

const result = await parseFile(filePath)

const output = foldResult(
	function handleParseError(err) {
		console.error("Parse failed:", err.message)
		if (err.suggestion) console.log("Tip:", err.suggestion)
		return null
	},
)(function handleParsedAST(ast) {
	const validation = buildParsedFile(ast)(filePath)

	return foldValidation(
		function handleExtractionErrors(errors) {
			errors.forEach(e => console.warn(e.message))
			// Partial success possible: some features may have extracted
			return null
		},
	)(function handleSuccess(parsed) {
		return parsed
	})(validation)
})(result)
```

You parse once, then extract whatever structural information you need. Errors are values that guide you to solutions.

## Consumer Integration

Three libraries currently consume Arborist's outputs.

**Envoy** generates documentation by extracting comments and functions, interpreting the comment markers, and formatting API documentation. It never parses TypeScript directly.

**Auditor** analyzes test coverage by extracting branches and comparing them against coverage data from test runs. It uses function signatures for test generation. It never parses TypeScript directly.

**Quarrier** generates test data using type information from function signatures. It never parses TypeScript directly.

This pattern ensures we parse each file exactly once. Three consumers, one parser, no duplication.

## The Dependency Choice

Arborist depends on **@swc/wasm-web version 1.13.20**. This is the only external dependency in the entire Sitebender ecosystem—a constraint we enforce deliberately.

Why @swc/wasm-web? Because it exposes SWC, the Rust-based parser that Deno uses internally, compiled to WebAssembly. This gives us several advantages:

- **Performance**: SWC parses twenty to fifty times faster than the TypeScript compiler
- **Alignment**: We use the same parser Deno uses
- **Purity**: Pure ESM with no Node.js or npm dependencies beyond the WASM module
- **Precision**: Excellent span tracking for all AST nodes
- **Compatibility**: Works in any JavaScript runtime that supports WASM

The version pinning ensures reproducibility. We know exactly what parser behavior to expect.

## Performance Characteristics

The speed difference between SWC and the TypeScript compiler matters in practice:

- Small files (10-50 functions): under 10ms
- Medium files (100-500 functions): under 50ms
- Large files (1000+ functions): under 200ms

These measurements remain consistent because we're doing only syntax-level parsing. No type checking. No semantic analysis. Just structure.

When you need to parse an entire codebase, these differences compound. Parsing that might take minutes with the TypeScript compiler completes in seconds with SWC.

## Error Accumulation Strategy

Arborist uses two monadic strategies for error handling:

**Result** for fail-fast operations:
- File I/O (can't continue without file)
- Syntax parsing (can't extract from broken AST)

**Validation** for error-accumulating operations:
- Feature extraction (partial success is valuable)
- Multiple independent extractions (see ALL issues at once)

This means when extraction fails for functions but succeeds for comments, you get a Failure with error details AND the successfully extracted comments. Maximum information, minimum surprise.

## File Type Support

The library handles TypeScript (.ts), TSX (.tsx), JavaScript (.js), JSX (.jsx), and the module variants—MTS (.mts), CTS (.cts), MJS (.mjs), CJS (.cjs). Media type detection works by examining the file extension. The default assumption is TypeScript, since that's what the Sitebender ecosystem uses.

## Architectural Principles

Five principles guide Arborist's design:

**Syntax First.** We parse syntax, not semantics. Structure over meaning. This constraint enables speed.

**Speed Matters.** Parse time directly affects developer experience. Faster parsing means faster builds, faster tests, faster feedback loops. We optimize for this.

**Pure Functions.** No mutations. No side effects. Every function takes inputs and returns outputs deterministically. This makes the library predictable and testable.

**Monadic Errors.** No exceptions. All errors are values. Result for fail-fast, Validation for error accumulation. Helpful suggestions, not scolding.

**Direct Exports.** No barrel files. Each function lives in its own directory with its own index.ts. You import exactly what you need, nothing more.

**Single Responsibility.** Parse and extract. Don't interpret. Don't analyze. Don't generate. Other libraries handle those concerns.

## Boundaries and Responsibilities

Understanding what Arborist doesn't do proves as important as understanding what it does.

**Arborist provides:** Fast syntax-level parsing, precise span tracking, comment extraction with positions, import enumeration, export enumeration, violation detection, function metadata.

**Arborist does not provide:** Semantic type analysis, type inference, symbol resolution, cross-file analysis, comment interpretation, documentation generation, test generation.

When libraries respect these boundaries, the system as a whole becomes easier to understand and maintain. Each library does one thing well.

## The Contract

Only Arborist imports SWC WASM. This rule has no exceptions.

When Arborist changes its internal implementation, consumers notice only improved performance or new features. The API remains stable. The data structures remain consistent. This stability represents the contract's promise: internal changes don't break external dependencies.

## Future Direction: Semantic Analysis

Eventually we'll add semantic type analysis as an optional enhancement. When needed, developers will call a function—likely named enrichWithTypes—that augments the syntax data with semantic type information using the TypeScript compiler.

The key word is *optional*. The fast syntax-only path remains untouched. You pay for semantic analysis only when you need it. No performance regression for the common case.

This two-phase approach—fast syntax parsing by default, optional semantic enrichment when needed—provides both speed and flexibility.

## Testing Strategy

Tests verify that Arborist correctly:
- Parses valid TypeScript/JSX to ParsedAST
- Returns appropriate errors for invalid input
- Discovers functions with accurate metadata
- Extracts type text from annotations
- Preserves comment positions
- Detects Envoy markers without interpreting them
- Enumerates imports with accurate specifiers and names
- Identifies violations
- Accumulates errors properly in Validation returns
- Includes helpful suggestions in all errors

When tests pass, the contract holds. When a test fails, we've broken something that consumers depend on.

## Why This Matters

Code analysis tools need to parse source files. Without Arborist, each tool would implement its own parser integration. We'd have three different versions of parsing logic, three different sets of bugs, three different performance characteristics.

With Arborist, we centralize parser integration. One implementation, tested once, optimized once, maintained once. Consumers get consistent, fast, accurate structural data.

This is a refactoring, in the original sense of the term. We extracted a common capability into a shared library and made it better than any individual implementation would have been.

The library works. The boundaries hold. The performance targets meet expectations.
