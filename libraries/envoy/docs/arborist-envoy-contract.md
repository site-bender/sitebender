# Arborist ↔ Envoy Integration Contract

**Date:** 2025-01-07
**Status:** BINDING
**Version:** Aligned with Arborist v0.0.1 and Envoy v0.0.1

## Contract Summary

Arborist is the ONLY library that parses TypeScript/JSX. It uses SWC via @swc/wasm-web for syntax-level analysis. Envoy consumes Arborist's structured outputs for documentation generation.

**This contract is BINDING. No TypeScript parsing outside Arborist.**

## CRITICAL: Pre-Implementation Status

**Current Status:**

- **Arborist:** Phase 1 complete, API finalized, ready for integration
- **Envoy:** Planning phase only, implementation blocked until Toolsmith ready
- **Toolsmith:** Monadic utilities (Result/Validation) and branded types in progress

**Implementation Timeline:**

1. Arborist completes remaining phases (Phases 2-4)
2. Toolsmith monadic utilities stabilize (fold, map, map2, map3, etc.)
3. Toolsmith branded types complete (smart constructors, validation)
4. Envoy implementation begins using this contract

**DO NOT implement Envoy until architect gives explicit approval.**

## API Specifications

### Arborist Provides

```typescript
//++ Parses source file and returns Result monad
parseFile(
  filePath: string
): Promise<Result<ParseError, ParsedAST>>

//++ Builds complete ParsedFile with Validation monad
buildParsedFile(
  ast: ParsedAST
) {
  return function(filePath: string): Validation<ExtractionError, ParsedFile>
}

//++ Extracts functions with Validation monad
extractFunctions(
  ast: ParsedAST
): Validation<FunctionExtractionError, ReadonlyArray<ParsedFunction>>

//++ Extracts comments with position data and Envoy markers detected
extractComments(
  ast: ParsedAST
): Validation<CommentExtractionError, ReadonlyArray<ParsedComment>>

//++ Extracts import statements
extractImports(
  ast: ParsedAST
): Validation<ImportExtractionError, ReadonlyArray<ParsedImport>>

//++ Extracts export statements
extractExports(
  ast: ParsedAST
): Validation<ExportExtractionError, ReadonlyArray<ParsedExport>>

//++ Extracts type definitions
extractTypes(
  ast: ParsedAST
): Validation<TypeExtractionError, ReadonlyArray<ParsedType>>

//++ Extracts constant declarations
extractConstants(
  ast: ParsedAST
): Validation<ConstantExtractionError, ReadonlyArray<ParsedConstant>>

//++ Detects constitutional violations
detectViolations(
  ast: ParsedAST
): Validation<ViolationDetectionError, ViolationInfo>
```

### Data Structures

```typescript
type ParsedAST = Readonly<{
	module: unknown // SWC Module (opaque to Envoy)
	sourceText: string
	filePath: string
}>

type ParsedFile = Readonly<{
	filePath: string
	functions: ReadonlyArray<ParsedFunction>
	comments: ReadonlyArray<ParsedComment>
	imports: ReadonlyArray<ParsedImport>
	exports: ReadonlyArray<ParsedExport>
	types: ReadonlyArray<ParsedType>
	constants: ReadonlyArray<ParsedConstant>
	violations: ViolationInfo
}>

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

type ParsedComment = Readonly<{
	text: string // Trimmed content
	position: Position
	span: Span
	kind: "line" | "block"
	envoyMarker?: EnvoyMarker // Detected by Arborist, interpreted by Envoy
	associatedNode?: string
}>

type EnvoyMarker = Readonly<{
	marker: "++" | "??" | "--" | "!!" | ">>"
}>

type FunctionBody = Readonly<{
	hasReturn: boolean
	hasThrow: boolean
	hasAwait: boolean
	hasTryCatch: boolean
	hasLoops: boolean
	cyclomaticComplexity: number
}>

type ParsedImport = Readonly<{
	specifier: string
	position: Position
	span: Span
	kind: "default" | "named" | "namespace" | "type"
	imports: ReadonlyArray<ImportBinding>
}>

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

## Error Handling

All functions return monads from Toolsmith:

**Result<E, T>** - parseFile returns Result for fail-fast I/O/syntax errors
**Validation<E, T>** - All extraction functions return Validation for error accumulation

### Error Types

```typescript
type ParseError = ArchitectError<"parseFile", [string]> & {
	kind:
		| "FileNotFound"
		| "InvalidSyntax"
		| "ReadPermission"
		| "SwcInitializationFailed"
	file: string
	line?: number
	column?: number
	suggestion: string // Always present
}

type FunctionExtractionError =
	& ArchitectError<"extractFunctions", [ParsedAST]>
	& {
		kind: "UnknownNodeType" | "MissingIdentifier" | "InvalidParameterStructure"
		nodeType?: string
		span?: Span
		suggestion: string // Always present
	}

// Similar for CommentExtractionError, ImportExtractionError, etc.
```

All errors include helpful suggestions, never scold users.

## Division of Responsibilities

### Arborist Owns

- ✅ SWC WASM integration
- ✅ Syntax-level parsing
- ✅ Span and position tracking
- ✅ Comment extraction (raw text)
- ✅ Envoy marker **detection** (finding `//++`, `//??`, etc.)
- ✅ Import/export analysis
- ✅ Constitutional violation detection
- ✅ Cyclomatic complexity calculation
- ✅ Error creation with suggestions

### Envoy Owns

- ✅ Envoy marker **interpretation** (what `//++` means semantically)
- ✅ Documentation generation (Markdown, HTML, JSON, RDF)
- ✅ Knowledge graph construction (RDF triples)
- ✅ SPARQL query interface
- ✅ HATEOAS navigation generation
- ✅ Dashboard and visualization
- ✅ Developer experience tracking (five-smiley feedback)
- ✅ Mathematical property integration (from Auditor)
- ✅ Example integration (from Quarrier)

### Arborist NEVER

- ❌ Interprets Envoy comment syntax semantically
- ❌ Generates documentation
- ❌ Makes semantic type analysis
- ❌ Performs cross-file analysis
- ❌ Builds knowledge graphs

### Envoy NEVER

- ❌ Imports SWC WASM or TypeScript compiler
- ❌ Parses TypeScript/JSX directly
- ❌ Duplicates parsing logic
- ❌ Accesses raw AST nodes
- ❌ Performs syntax-level analysis

## Usage Pattern

```typescript
import parseFile from "@sitebender/arborist/parseFile"
import buildParsedFile from "@sitebender/arborist/buildParsedFile"
import interpretComments from "@sitebender/envoy/interpretComments"
import generateDocumentation from "@sitebender/envoy/generateDocumentation"
import { fold as foldResult } from "@sitebender/toolsmith/monads/result/fold"
import { fold as foldValidation } from "@sitebender/toolsmith/monads/validation/fold"

// Parse file (Arborist)
const result = await parseFile("/path/to/module.ts")

const documentation = foldResult(
	function handleParseError(err: ParseError) {
		console.error(err.message)
		if (err.suggestion) console.log("Tip:", err.suggestion)
		return null
	},
)(function handleAST(ast: ParsedAST) {
	// Build complete parsed file (Arborist)
	const validation = buildParsedFile(ast)("/path/to/module.ts")

	return foldValidation(
		function handleExtractionErrors(errors) {
			errors.forEach((e) => console.warn(e.message))
			return null
		},
	)(function handleParsedFile(parsed: ParsedFile) {
		// Interpret comments (Envoy)
		const interpretedV = interpretComments(parsed.comments)

		return foldValidation(
			function handleInterpretationErrors(errors) {
				errors.forEach((e) => console.warn(e.message))
				return null
			},
		)(function handleInterpreted(interpreted) {
			// Generate documentation (Envoy)
			const docResult = generateDocumentation(parsed)({
				format: "markdown",
				includeExamples: true,
			})

			return foldResult(
				function handleDocError(err) {
					console.error(err.message)
					return null
				},
			)(function handleSuccess(doc) {
				return doc
			})(docResult)
		})(interpretedV)
	})(validation)
})(result)
```

## Performance Requirements

| File Size | Functions | Parse Time | Extraction Time | Envoy Processing | Total  |
| --------- | --------- | ---------- | --------------- | ---------------- | ------ |
| Small     | 10-50     | <10ms      | <2ms            | <5ms             | <17ms  |
| Medium    | 100-500   | <50ms      | <5ms            | <20ms            | <75ms  |
| Large     | 1000+     | <200ms     | <10ms           | <50ms            | <260ms |

## Implementation Details

### Envoy Marker Detection vs Interpretation

**Arborist detects** markers in comments:

```typescript
// Arborist output
{
  text: "Validates email addresses using regex pattern matching",
  envoyMarker: { marker: "++" } // DETECTED, not interpreted
}
```

**Envoy interprets** marker meaning:

```typescript
// Envoy interpretation
{
  type: "description",
  category: "DESCRIPTION", // Default for ++
  content: "Validates email addresses using regex pattern matching",
  associatedWith: "validateEmail" // Function this describes
}
```

### Comment Association Rules

Arborist provides `associatedNode` hint based on proximity:

1. Leading comments within 2 lines above function
2. Trailing comments on same line as function close
3. AssociatedNode links comment to function name

Envoy uses this hint but applies semantic rules:

- `//++` MUST be immediately above code (no blank line)
- `//??` needs breathing room (blank line above)
- `//--` goes where the problem occurs
- `//!!` file-wide needs spacing (blank lines above/below)
- `//>>` in code or at file bottom

### Type Information

All type information from Arborist is syntax-level only:

- Parameter types as text strings
- Return types as text strings
- Generic constraints as text strings
- No semantic resolution

Envoy works with these text representations for documentation.

## Error Handling Examples

### Parse Error (Arborist)

```typescript
{
  _tag: "Error",
  error: {
    name: "parseFileError",
    operation: "parseFile",
    args: ["/missing.ts"],
    message: "parseFile: file not found in /missing.ts",
    code: "NOT_FOUND",
    severity: "error",
    kind: "FileNotFound",
    file: "/missing.ts",
    suggestion: "Check that the file path is correct and the file exists."
  }
}
```

### Extraction Error with Partial Success (Arborist)

```typescript
{
  _tag: "Failure",
  errors: [{
    name: "extractFunctionsError",
    operation: "extractFunctions",
    args: [ast],
    message: "extractFunctions: Unknown node type 'ClassExpression'",
    code: "TYPE_MISMATCH",
    severity: "warning",
    kind: "UnknownNodeType",
    nodeType: "ClassExpression",
    span: { start: 1234, end: 1456 },
    suggestion: "This node type is not yet supported. File an issue with the node structure."
  }]
  // Note: Other extractions (comments, imports) may have succeeded
}
```

### Comment Interpretation Error (Envoy)

```typescript
{
  _tag: "Failure",
  errors: [{
    name: "interpretCommentsError",
    operation: "interpretComments",
    args: [comments],
    message: "interpretComments: Unknown marker '//@@' at line 42",
    code: "PARSE_ERROR",
    severity: "warning",
    kind: "UnknownMarker",
    comment: { text: "...", position: { line: 42, column: 0 } },
    suggestion: "Valid Envoy markers are: //++, //??, //--, //!!, //>>. Did you mean //++?"
  }]
}
```

### Documentation Generation Error (Envoy)

```typescript
{
  _tag: "Error",
  error: {
    name: "generateDocumentationError",
    operation: "generateDocumentation",
    args: [parsedFile, options],
    message: "generateDocumentation: Missing required description for exported function 'validateEmail'",
    code: "VALIDATION_FAILED",
    severity: "error",
    kind: "MissingRequired",
    context: { functionName: "validateEmail", isExported: true },
    suggestion: "Add a //++ description comment immediately above the function. Example:\n  //++ Validates email addresses using regex pattern matching\n  export default function validateEmail(email: string): boolean {"
  }
}
```

## Enforcement

### Validation

- Arborist is the ONLY library importing SWC WASM
- Envoy has ZERO TypeScript parsing code
- All AST analysis goes through Arborist
- No exceptions, no workarounds
- Warden enforces this contract

### Testing

Both libraries must maintain:

- Integration tests using shared fixtures
- Performance benchmarks
- Contract compliance tests
- Error handling tests with suggestions

## Success Criteria

- ✅ Fast parsing (<50ms for typical files via Arborist)
- ✅ Clean separation of concerns
- ✅ No duplicate parsing logic
- ✅ Envoy uses only Arborist outputs
- ✅ Performance targets met
- ✅ Helpful error messages with suggestions
- ✅ All errors use Result/Validation monads
- ✅ Zero exceptions thrown (except at I/O boundaries)

## Versioning Policy

**Current Version:** 0.0.1 (pre-production)

**During 0.x development:**

- NO migration paths
- NO backwards compatibility
- NO deprecation warnings
- When design changes: DELETE old, ADD new, UPDATE all docs
- Build it RIGHT the FIRST TIME

**After 1.0:** Standard SemVer applies.

---

**This contract is BINDING. No TypeScript parsing outside Arborist.**
