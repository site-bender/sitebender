# Arborist ↔ Envoy Integration Contract

**Date:** 2025-10-07
**Status:** BINDING

## Contract Summary

Arborist is the ONLY library that parses TypeScript/JSX. It uses SWC via @swc/wasm-web for syntax-level analysis. Envoy consumes Arborist's structured outputs for documentation generation.

## API Specifications

### Arborist Provides

```typescript
//++ Parses source file and returns Result monad
parseFile(
	filePath: string,
): Promise<Result<ParseError, ParsedAst>>

//++ Builds complete ParsedFile with Validation monad
buildParsedFile(
	ast: ParsedAst,
) {
	return function(filePath: string): Validation<ExtractionError, ParsedFile>
}

//++ Extracts functions with Validation monad
extractFunctions(
	ast: ParsedAst,
): Validation<FunctionExtractionError, ReadonlyArray<ParsedFunction>>

//++ Extracts comments with position data
extractComments(
	ast: ParsedAst,
): Validation<CommentExtractionError, ReadonlyArray<ParsedComment>>

//++ Extracts import statements
extractImports(
	ast: ParsedAst,
): Validation<ImportExtractionError, ReadonlyArray<ParsedImport>>

//++ Extracts export statements
extractExports(
	ast: ParsedAst,
): Validation<ExportExtractionError, ReadonlyArray<ParsedExport>>
```

### Data Structures

```typescript
type ParsedAst = Readonly<{
	module: unknown // SWC Module
	sourceText: string
	filePath: string
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
	text: string
	position: Position
	span: Span
	kind: "line" | "block"
	envoyMarker?: EnvoyMarker
	associatedNode?: string
}>

type ParsedImport = Readonly<{
	specifier: string
	position: Position
	span: Span
	kind: "default" | "named" | "namespace" | "type"
	imports: ReadonlyArray<ImportBinding>
}>
```

## Error Handling

All functions return monads:

**Result<E, T>** - parseFile returns Result for fail-fast I/O/syntax errors
**Validation<E, T>** - All extraction functions return Validation for error accumulation

### Error Types

```typescript
type ParseError = ArchitectError<"parseFile", [string]> & {
	kind: "FileNotFound" | "InvalidSyntax" | "ReadPermission" | "SwcInitializationFailed"
	file: string
	line?: number
	column?: number
}

type FunctionExtractionError = ArchitectError<"extractFunctions", [ParsedAst]> & {
	kind: "UnknownNodeType" | "MissingIdentifier" | "InvalidParameterStructure"
	nodeType?: string
	span?: Span
}

// Similar for CommentExtractionError, ImportExtractionError, etc.
```

All errors include helpful suggestions.

## Division of Responsibilities

### Arborist Owns

- SWC WASM integration
- Syntax-level parsing
- Span and position tracking
- Comment extraction (raw text)
- Envoy marker detection (not interpretation)
- Import/export analysis
- Violation detection
- Error creation with suggestions

### Envoy Owns

- Comment interpretation (//++, //??, //--, //!!, //>>)
- Documentation generation
- API formatting
- Complexity metrics from branch data
- Documentation structure

### Arborist NEVER

- Interprets Envoy comment syntax
- Generates documentation
- Makes semantic type analysis
- Performs cross-file analysis

### Envoy NEVER

- Imports SWC WASM directly
- Parses TypeScript directly
- Duplicates parsing logic
- Accesses raw AST nodes

## Usage Pattern

```typescript
import parseFile from "@sitebender/arborist/parseFile"
import extractFunctions from "@sitebender/arborist/extractFunctions"
import extractComments from "@sitebender/arborist/extractComments"
import { fold as foldResult } from "@sitebender/toolsmith/monads/result/fold"
import { fold as foldValidation } from "@sitebender/toolsmith/monads/validation/fold"

// Parse file
const result = await parseFile("/path/to/module.ts")

const documentation = foldResult(
	function handleParseError(err: ParseError) {
		console.error(err.message)
		if (err.suggestion) console.log(err.suggestion)
		return null
	},
)(function handleAst(ast: ParsedAst) {
	// Extract what Envoy needs
	const functionsV = extractFunctions(ast)
	const commentsV = extractComments(ast)

	// Combine extractions
	return map2(
		function combineData(functions, comments) {
			// Envoy interprets and generates docs here
			return generateDocumentation(functions, comments)
		},
	)(functionsV)(commentsV)
})(result)
```

## Performance Requirements

| File Size | Functions | Parse Time | Extraction Time | Total  |
| --------- | --------- | ---------- | --------------- | ------ |
| Small     | 10-50     | <10ms      | <2ms            | <12ms  |
| Medium    | 100-500   | <50ms      | <5ms            | <55ms  |
| Large     | 1000+     | <200ms     | <10ms           | <210ms |

## Implementation Details

### Parser Backend

Arborist uses SWC WASM exclusively:

```typescript
import { parse } from "npm:@swc/wasm-web@1.13.20"
import initSwc from "npm:@swc/wasm-web@1.13.20"
```

### Comment Association

Comments are associated with functions by proximity:
1. Leading comments within 2 lines above function
2. Trailing comments on same line as function close
3. AssociatedNode links comment to function name

### Type Information

All type information is syntax-level only:
- Parameter types as text strings
- Return types as text strings
- Generic constraints as text strings
- No semantic resolution

### Envoy Marker Detection

Arborist detects these markers in comments:
- `//++` - Description
- `//--` - Technical debt
- `//!!` - Critical note
- `//??` - Help/question
- `//>>` - Link/reference

Detection adds `envoyMarker` field to ParsedComment. Envoy interprets meaning.

## Error Handling Examples

### Parse Error

```typescript
// File not found
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

### Extraction Error

```typescript
// Function extraction issue
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
}
```

## Enforcement

### Validation

- Arborist is the ONLY library importing SWC WASM
- Envoy has ZERO TypeScript parsing code
- All AST analysis goes through Arborist
- No exceptions, no workarounds

### Testing

Both libraries must maintain:
- Integration tests using shared fixtures
- Performance benchmarks
- Contract compliance tests
- Error handling tests

## Success Criteria

- ✅ Fast parsing (<50ms for typical files)
- ✅ Clean separation of concerns
- ✅ No duplicate parsing logic
- ✅ Envoy uses only Arborist outputs
- ✅ Performance targets met
- ✅ Helpful error messages with suggestions

---

**This contract is BINDING. No TypeScript parsing outside Arborist.**
