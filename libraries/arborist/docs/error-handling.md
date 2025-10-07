# Arborist Error Handling

**Philosophy:** Errors are values. No exceptions. Rich metadata. Helpful suggestions, not scolding.

## Monad Strategy

### Result<E, T> - Fail Fast

Use **Result** for sequential operations where failure prevents continuation:

**Use Cases:**
- File I/O (can't continue without file)
- Parse errors (can't extract from broken AST)
- Validation that requires all-or-nothing
- Sequential dependencies

**Type:**
```typescript
type Result<E, T> = Ok<T> | Error<E>

interface Ok<T> {
	readonly _tag: "Ok"
	readonly value: T
}

interface Error<E> {
	readonly _tag: "Error"
	readonly error: E
}
```

**Example:**
```typescript
//++ Parses file - fails fast on I/O or syntax errors
export default async function parseFile(
	filePath: string,
): Promise<Result<ParseError, ParsedAST>> {
	// If file read fails, return immediately
	// If parse fails, return immediately
	// Can't extract from missing/broken file
}
```

### Validation<E, T> - Accumulate Errors

Use **Validation** for parallel/tree operations where partial success is valuable:

**Use Cases:**
- Extracting multiple independent features
- Validating multiple fields
- Processing tree structures
- Accumulating diagnostics

**Type:**
```typescript
type Validation<E, T> = Success<T> | Failure<E>

interface Success<T> {
	readonly _tag: "Success"
	readonly value: T
}

interface Failure<E> {
	readonly _tag: "Failure"
	readonly errors: readonly [E, ...Array<E>] // NonEmptyArray
}
```

**Example:**
```typescript
//++ Extracts functions - accumulates all extraction errors
export default function extractFunctions(
	ast: ParsedAST,
): Validation<FunctionExtractionError, ReadonlyArray<ParsedFunction>> {
	// Function 1 fails → accumulate error, continue
	// Function 2 succeeds → accumulate result
	// Function 3 fails → accumulate error, continue
	// Return all errors if any failed, or all results
}
```

## Error Type Hierarchy

### Base Error Structure (Toolsmith ArchitectError)

All Arborist errors extend `ArchitectError`:

```typescript
interface ArchitectError<
	TOp extends string = string,
	TArgs extends ReadonlyArray<Value> = ReadonlyArray<Value>,
> {
	readonly name: `${TOp}Error`
	readonly operation: TOp
	readonly args: TArgs
	readonly message: string
	readonly code: ErrorCode
	readonly severity: ErrorSeverity
	readonly failedIndex?: number
	readonly failedArg?: Value
	readonly types?: {
		readonly expected: Datatype | ReadonlyArray<Datatype>
		readonly actual: Datatype
	}
	readonly suggestion?: string
	readonly cause?: Error | ArchitectError | unknown
	readonly stack?: string
	readonly context?: Record<string, Value>
}
```

### Parse Errors

```typescript
export type ParseError = ArchitectError<"parseFile", [string]> & {
	readonly kind: "FileNotFound" | "InvalidSyntax" | "ReadPermission" | "SwcInitializationFailed"
	readonly file: string
	readonly line?: number
	readonly column?: number
}
```

**Error Codes:**
- `NOT_FOUND` - File doesn't exist
- `PERMISSION_DENIED` - Can't read file
- `PARSE_ERROR` - Invalid TypeScript/JSX syntax
- `OPERATION_FAILED` - SWC initialization failed

**Examples:**

```typescript
// File not found
{
	_tag: "Error",
	error: {
		name: "parseFileError",
		operation: "parseFile",
		args: ["/src/missing.ts"],
		message: "parseFile: /src/missing.ts not found",
		code: "NOT_FOUND",
		severity: "error",
		kind: "FileNotFound",
		file: "/src/missing.ts",
		suggestion: "Check that the file path is correct and the file exists. Run `ls -la /src/` to verify."
	}
}

// Invalid syntax
{
	_tag: "Error",
	error: {
		name: "parseFileError",
		operation: "parseFile",
		args: ["/src/bad.ts"],
		message: "parseFile: Invalid TypeScript syntax at line 42, column 15",
		code: "PARSE_ERROR",
		severity: "error",
		kind: "InvalidSyntax",
		file: "/src/bad.ts",
		line: 42,
		column: 15,
		suggestion: "Check the TypeScript syntax. Run `deno check /src/bad.ts` for detailed error information."
	}
}
```

### Extraction Errors

```typescript
export type FunctionExtractionError = ArchitectError<"extractFunctions", [ParsedAST]> & {
	readonly kind: "UnknownNodeType" | "MissingIdentifier" | "InvalidParameterStructure"
	readonly nodeType?: string
	readonly span?: Span
}

export type CommentExtractionError = ArchitectError<"extractComments", [ParsedAST]> & {
	readonly kind: "MalformedComment" | "InvalidPosition"
	readonly span?: Span
}

export type ImportExtractionError = ArchitectError<"extractImports", [ParsedAST]> & {
	readonly kind: "InvalidSpecifier" | "UnknownImportKind"
	readonly specifier?: string
	readonly span?: Span
}

export type ExportExtractionError = ArchitectError<"extractExports", [ParsedAST]> & {
	readonly kind: "InvalidExportName" | "UnknownExportKind"
	readonly exportName?: string
	readonly span?: Span
}

export type TypeExtractionError = ArchitectError<"extractTypes", [ParsedAST]> & {
	readonly kind: "UnknownTypeKind" | "MissingTypeName"
	readonly span?: Span
}

export type ConstantExtractionError = ArchitectError<"extractConstants", [ParsedAST]> & {
	readonly kind: "NotConstant" | "MissingValue"
	readonly span?: Span
}

export type ViolationDetectionError = ArchitectError<"detectViolations", [ParsedAST]> & {
	readonly kind: "TraversalFailed"
	readonly nodeType?: string
}

// Union of all extraction errors
export type ExtractionError =
	| FunctionExtractionError
	| CommentExtractionError
	| ImportExtractionError
	| ExportExtractionError
	| TypeExtractionError
	| ConstantExtractionError
	| ViolationDetectionError
```

## Creating Errors

### Using Templates

```typescript
import fromTemplate from "@sitebender/toolsmith/error/fromTemplate"

// Parse error
const err = fromTemplate("parseError")("parseFile")([filePath])(
	"TypeScript source",
	source.slice(0, 50)
)
// Returns: "parseFile: Could not parse TypeScript source from \"export function...\""
```

### Adding Suggestions

```typescript
import withSuggestion from "@sitebender/toolsmith/error/withSuggestion"
import { pipe } from "@sitebender/toolsmith/functional/pipe"

const err = pipe(
	fromTemplate("parseError")("parseFile")([filePath])("TypeScript source", source),
	withSuggestion("Check that the file contains valid TypeScript. Run `deno check` to see detailed errors.")
)
```

### Tracking Failed Arguments

```typescript
import withFailedArg from "@sitebender/toolsmith/error/withFailedArg"

const err = pipe(
	fromTemplate("typeMismatch")("extractFunctions")([ast])(
		"FunctionDeclaration",
		actualNodeType
	),
	withFailedArg(0)("ast"),
	withSuggestion("This AST node type is not yet supported. Please file an issue with the node structure.")
)
```

### Preserving Causes

```typescript
import withCause from "@sitebender/toolsmith/error/withCause"

try {
	await Deno.readTextFile(filePath)
} catch (cause) {
	return error(pipe(
		createError("parseFile")([filePath])(
			`Failed to read file: ${filePath}`
		)("NOT_FOUND"),
		withCause(cause as Error),
		withSuggestion("Verify the file exists and you have read permissions.")
	))
}
```

## Error Message Guidelines

### DO:

**Provide Context**
```typescript
// Good
"extractFunctions: Unknown node type 'ClassExpression' at span 1234-1456"

// Bad
"Unknown node"
```

**Suggest Solutions**
```typescript
// Good
"Suggestion: This node type is not supported. Consider refactoring to use function declarations instead of class expressions."

// Bad
"Error: Invalid node type"
```

**Include Locations**
```typescript
// Good
{
	file: "/src/module.ts",
	line: 42,
	column: 15,
	span: { start: 1234, end: 1456 }
}

// Bad
{
	// No location info
}
```

**Preserve Technical Details**
```typescript
// Good
{
	message: "extractFunctions: Expected FunctionDeclaration but received ClassExpression",
	nodeType: "ClassExpression",
	context: { argName: "ast" },
	suggestion: "..."
}

// Bad
{
	message: "Invalid input"
}
```

### DON'T:

**Scold Users**
```typescript
// Bad
"You provided an invalid file path"

// Good
"parseFile: File not found at /src/module.ts"
```

**Be Vague**
```typescript
// Bad
"Something went wrong"

// Good
"extractFunctions: Missing identifier for function at position 1234"
```

**Hide Stack Traces**
```typescript
// Bad
{ message: "Error" }

// Good
{
	message: "...",
	cause: originalError,
	stack: originalError.stack
}
```

## Partial Success Pattern

When using Validation for extraction, support partial success:

```typescript
export default function buildParsedFile(ast: ParsedAST) {
	return function buildFromAST(filePath: string): Validation<ExtractionError, ParsedFile> {
		const functionsV = extractFunctions(ast)
		const commentsV = extractComments(ast)
		const importsV = extractImports(ast)

		// Combine validations
		// If some fail, still return ParsedFile with empty arrays for failed parts
		return combineValidations({
			functions: functionsV,
			comments: commentsV,
			imports: importsV,
		})
	}
}
```

**Result:**
```typescript
// All succeed
Success({
	filePath: "/src/module.ts",
	functions: [...], // populated
	comments: [...],  // populated
	imports: [...]    // populated
})

// Some fail
Failure([
	{ operation: "extractFunctions", message: "...", ... },
	{ operation: "extractImports", message: "...", ... }
])
// Consumer can still use comments data if needed
```

## Usage Patterns

### Pattern 1: Full Pipeline with Error Handling

```typescript
import parseFile from "@sitebender/arborist/parseFile"
import buildParsedFile from "@sitebender/arborist/buildParsedFile"
import { fold as foldResult } from "@sitebender/toolsmith/monads/result/fold"
import { fold as foldValidation } from "@sitebender/toolsmith/monads/validation/fold"

const result = await parseFile("./src/module.ts")

const output = foldResult(
	function handleParseError(err: ParseError) {
		console.error("Parse failed:", err.message)
		if (err.suggestion) {
			console.log("💡 Tip:", err.suggestion)
		}
		if (err.line && err.column) {
			console.log(`Location: line ${err.line}, column ${err.column}`)
		}
		return null
	},
)(function handleParsedAST(ast: ParsedAST) {
	const validation = buildParsedFile(ast)("./src/module.ts")

	return foldValidation(
		function handleExtractionErrors(errors: ReadonlyArray<ExtractionError>) {
			console.warn(`Extraction completed with ${errors.length} error(s):`)
			errors.forEach(e => {
				console.warn(`- ${e.message}`)
				if (e.suggestion) console.warn(`  💡 ${e.suggestion}`)
			})
			// Partial success: some features may have extracted successfully
			return null
		},
	)(function handleFullSuccess(parsed: ParsedFile) {
		console.log("✓ Successfully parsed", parsed.filePath)
		console.log(`  Functions: ${parsed.functions.length}`)
		console.log(`  Comments: ${parsed.comments.length}`)
		console.log(`  Imports: ${parsed.imports.length}`)
		return parsed
	})(validation)
})(result)
```

### Pattern 2: Granular Extraction with Selective Error Handling

```typescript
import parseFile from "@sitebender/arborist/parseFile"
import extractFunctions from "@sitebender/arborist/extractFunctions"
import extractComments from "@sitebender/arborist/extractComments"
import { fold } from "@sitebender/toolsmith/monads/result/fold"
import { fold as foldV } from "@sitebender/toolsmith/monads/validation/fold"

const result = await parseFile("./src/module.ts")

fold(handleParseError)(function(ast: ParsedAST) {
	// Only extract what we need
	const functionsV = extractFunctions(ast)

	return foldV(
		function handleFunctionErrors(errors) {
			// Log errors but continue
			errors.forEach(e => console.warn(e.message))
			return []
		},
	)(function(functions) {
		return functions
	})(functionsV)
})(result)
```

### Pattern 3: Error Accumulation for Diagnostics

```typescript
const result = await parseFile("./src/module.ts")

fold(handleParseError)(function(ast: ParsedAST) {
	const functionsV = extractFunctions(ast)
	const commentsV = extractComments(ast)
	const violationsV = detectViolations(ast)

	// Combine all validations to collect ALL errors
	const combined = map3(
		function combine(functions, comments, violations) {
			return { functions, comments, violations }
		},
	)(functionsV)(commentsV)(violationsV)

	return foldV(
		function reportAllErrors(errors) {
			// Generate comprehensive diagnostic report
			console.log("=== Diagnostic Report ===")
			console.log(`Total issues found: ${errors.length}`)

			const byOperation = groupBy((e: ExtractionError) => e.operation)(errors)
			Object.entries(byOperation).forEach(([op, errs]) => {
				console.log(`\n${op}: ${errs.length} issue(s)`)
				errs.forEach(e => {
					console.log(`  - ${e.message}`)
					if (e.suggestion) console.log(`    💡 ${e.suggestion}`)
				})
			})

			return null
		},
	)(handleSuccess)(combined)
})(result)
```

## Testing Error Handling

```typescript
Deno.test("parseFile returns Error for missing file", async () => {
	const result = await parseFile("/nonexistent/file.ts")

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.kind, "FileNotFound")
		assertEquals(result.error.code, "NOT_FOUND")
		assert(result.error.suggestion !== undefined, "Should include suggestion")
		assert(result.error.message.includes("/nonexistent/file.ts"))
	}
})

Deno.test("extractFunctions accumulates errors for invalid nodes", () => {
	const astWithInvalidNodes = createMockASTWithInvalidNodes()

	const validation = extractFunctions(astWithInvalidNodes)

	assertEquals(validation._tag, "Failure")
	if (validation._tag === "Failure") {
		assert(validation.errors.length > 0)
		validation.errors.forEach(err => {
			assertEquals(err.operation, "extractFunctions")
			assert(err.message.length > 0)
			assert(err.suggestion !== undefined, "Should include helpful suggestion")
		})
	}
})

Deno.test("buildParsedFile supports partial success", () => {
	const astWithMixedValidity = createMockAST()

	const validation = buildParsedFile(astWithMixedValidity)("/src/test.ts")

	// Even with some failures, should attempt all extractions
	// Result could be Success or Failure depending on whether ANY extraction failed
})
```

---

**Remember:** Errors are opportunities to help users. Every error should guide toward a solution.
