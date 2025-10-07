// @sitebender/arborist/src/types/index.test.ts
// Tests for type exports and type safety

import { assert } from "jsr:@std/assert@1.0.14"

import type {
	CommentExtractionError,
	ConstantExtractionError,
	EnvoyMarker,
	ExportExtractionError,
	ExtractionError,
	FunctionBody,
	FunctionExtractionError,
	FunctionModifiers,
	ImportBinding,
	ImportExtractionError,
	Parameter,
	ParsedAst,
	ParsedComment as _ParsedComment,
	ParsedConstant as _ParsedConstant,
	ParsedExport as _ParsedExport,
	ParsedFile,
	ParsedFunction,
	ParsedImport,
	ParsedType as _ParsedType,
	ParseError,
	Position,
	Span,
	TypeExtractionError,
	TypeParameter,
	ViolationDetectionError,
	ViolationInfo,
} from "./index.ts"

Deno.test("types - all types are exported", () => {
	// This test verifies that all types can be imported
	// TypeScript will fail compilation if any type is missing

	const position: Position = { line: 1, column: 1 }
	const span: Span = { start: 0, end: 10 }

	assert(position.line === 1)
	assert(span.start === 0)
})

Deno.test("types - Position is readonly", () => {
	const position: Position = { line: 1, column: 1 }

	// @ts-expect-error: Cannot assign to 'line' because it is a read-only property
	position.line = 2
})

Deno.test("types - Span is readonly", () => {
	const span: Span = { start: 0, end: 10 }

	// @ts-expect-error: Cannot assign to 'start' because it is a read-only property
	span.start = 5
})

Deno.test("types - Parameter is readonly", () => {
	const param: Parameter = {
		name: "x",
		type: "number",
		optional: false,
	}

	// @ts-expect-error: Cannot assign to 'name' because it is a read-only property
	param.name = "y"
})

Deno.test("types - TypeParameter is readonly", () => {
	const typeParam: TypeParameter = {
		name: "T",
		constraint: "string",
	}

	// @ts-expect-error: Cannot assign to 'name' because it is a read-only property
	typeParam.name = "U"
})

Deno.test("types - FunctionModifiers is readonly", () => {
	const modifiers: FunctionModifiers = {
		isExported: true,
		isDefault: false,
		isAsync: false,
		isGenerator: false,
		isArrow: false,
	}

	// @ts-expect-error: Cannot assign to 'isExported' because it is a read-only property
	modifiers.isExported = false
})

Deno.test("types - FunctionBody is readonly", () => {
	const body: FunctionBody = {
		hasReturn: true,
		hasThrow: false,
		hasAwait: false,
		hasTryCatch: false,
		hasLoops: false,
		cyclomaticComplexity: 1,
	}

	// @ts-expect-error: Cannot assign to 'hasReturn' because it is a read-only property
	body.hasReturn = false
})

Deno.test("types - ParsedFunction uses ReadonlyArray", () => {
	const func: ParsedFunction = {
		name: "test",
		position: { line: 1, column: 1 },
		span: { start: 0, end: 10 },
		parameters: [],
		returnType: "void",
		typeParameters: [],
		modifiers: {
			isExported: false,
			isDefault: false,
			isAsync: false,
			isGenerator: false,
			isArrow: false,
		},
		body: {
			hasReturn: false,
			hasThrow: false,
			hasAwait: false,
			hasTryCatch: false,
			hasLoops: false,
			cyclomaticComplexity: 1,
		},
	}

	// @ts-expect-error: Property 'push' does not exist on type 'readonly Parameter[]'
	func.parameters.push({
		name: "x",
		type: "number",
		optional: false,
	})
})

Deno.test("types - ImportBinding is readonly", () => {
	const binding: ImportBinding = {
		imported: "foo",
		local: "bar",
		isType: false,
	}

	// @ts-expect-error: Cannot assign to 'imported' because it is a read-only property
	binding.imported = "baz"
})

Deno.test("types - ParsedImport uses ReadonlyArray", () => {
	const parsedImport: ParsedImport = {
		specifier: "./foo.ts",
		position: { line: 1, column: 1 },
		span: { start: 0, end: 10 },
		kind: "named",
		imports: [],
	}

	// @ts-expect-error: Property 'push' does not exist on type 'readonly ImportBinding[]'
	parsedImport.imports.push({
		imported: "foo",
		local: "foo",
		isType: false,
	})
})

Deno.test("types - EnvoyMarker discriminated union", () => {
	const marker1: EnvoyMarker = { marker: "++", description: "test" }
	const marker2: EnvoyMarker = { marker: "--", techDebt: "fix this" }
	const marker3: EnvoyMarker = { marker: "!!", critical: "urgent" }
	const marker4: EnvoyMarker = { marker: "??", help: "need help" }
	const marker5: EnvoyMarker = { marker: ">>", link: "http://example.com" }

	assert(marker1.marker === "++")
	assert(marker2.marker === "--")
	assert(marker3.marker === "!!")
	assert(marker4.marker === "??")
	assert(marker5.marker === ">>")
})

Deno.test("types - ViolationInfo uses ReadonlyArray", () => {
	const violations: ViolationInfo = {
		hasArrowFunctions: false,
		arrowFunctions: [],
		hasClasses: false,
		classes: [],
		hasThrowStatements: false,
		throwStatements: [],
		hasTryCatch: false,
		tryCatchBlocks: [],
		hasLoops: false,
		loops: [],
		hasMutations: false,
		mutations: [],
	}

	// @ts-expect-error: Property 'push' does not exist on type 'readonly Position[]'
	violations.arrowFunctions.push({ line: 1, column: 1 })
})

Deno.test("types - ParsedFile uses ReadonlyArray for all collections", () => {
	const file: ParsedFile = {
		filePath: "test.ts",
		functions: [],
		types: [],
		constants: [],
		imports: [],
		exports: [],
		comments: [],
		violations: {
			hasArrowFunctions: false,
			arrowFunctions: [],
			hasClasses: false,
			classes: [],
			hasThrowStatements: false,
			throwStatements: [],
			hasTryCatch: false,
			tryCatchBlocks: [],
			hasLoops: false,
			loops: [],
			hasMutations: false,
			mutations: [],
		},
	}

	// @ts-expect-error: Property 'push' does not exist on type 'readonly ParsedFunction[]'
	file.functions.push({} as ParsedFunction)
})

Deno.test("types - ParsedAst type structure", () => {
	// Create a mock ParsedAst (we can't create a real Module without parsing)
	const ast: ParsedAst = {
		module: {} as unknown,
		sourceText: "export function test() {}",
		filePath: "/test/fixture.ts",
	} as ParsedAst

	assert(ast.sourceText === "export function test() {}")
	assert(ast.filePath === "/test/fixture.ts")

	// @ts-expect-error: Cannot assign to 'sourceText' because it is a read-only property
	ast.sourceText = "changed"
})

Deno.test("types - ParseError extends ArchitectError", () => {
	// ParseError should have ArchitectError fields plus specific fields
	const error: ParseError = {
		name: "parseFileError",
		operation: "parseFile",
		args: ["/test/file.ts"],
		message: "parseFile: file not found",
		code: "NOT_FOUND",
		severity: "error",
		kind: "FileNotFound",
		file: "/test/file.ts",
		line: 42,
		column: 15,
		suggestion: "Check that the file exists",
	}

	assert(error.name === "parseFileError")
	assert(error.operation === "parseFile")
	assert(error.kind === "FileNotFound")
	assert(error.file === "/test/file.ts")
})

Deno.test("types - ParseError kind discriminants", () => {
	const error1: ParseError = {
		name: "parseFileError",
		operation: "parseFile",
		args: ["/test.ts"],
		message: "test",
		code: "NOT_FOUND",
		severity: "error",
		kind: "FileNotFound",
		file: "/test.ts",
	}

	const error2: ParseError = {
		name: "parseFileError",
		operation: "parseFile",
		args: ["/test.ts"],
		message: "test",
		code: "PARSE_ERROR",
		severity: "error",
		kind: "InvalidSyntax",
		file: "/test.ts",
		line: 10,
		column: 5,
	}

	assert(error1.kind === "FileNotFound")
	assert(error2.kind === "InvalidSyntax")
})

Deno.test("types - FunctionExtractionError structure", () => {
	const error: FunctionExtractionError = {
		name: "extractFunctionsError",
		operation: "extractFunctions",
		args: [],
		message: "Unknown node type",
		code: "TYPE_MISMATCH",
		severity: "warning",
		kind: "UnknownNodeType",
		nodeType: "ClassExpression",
		span: { start: 100, end: 200 },
	}

	assert(error.kind === "UnknownNodeType")
	assert(error.nodeType === "ClassExpression")
})

Deno.test("types - ExtractionError union type", () => {
	const functionError: ExtractionError = {
		name: "extractFunctionsError",
		operation: "extractFunctions",
		args: [],
		message: "test",
		code: "TYPE_MISMATCH",
		severity: "warning",
		kind: "UnknownNodeType",
	}

	const commentError: ExtractionError = {
		name: "extractCommentsError",
		operation: "extractComments",
		args: [],
		message: "test",
		code: "VALIDATION_FAILED",
		severity: "warning",
		kind: "MalformedComment",
	}

	assert(functionError.operation === "extractFunctions")
	assert(commentError.operation === "extractComments")
})

Deno.test("types - All extraction error types exported", () => {
	// Verify all error types can be imported and have correct structure
	const _func: FunctionExtractionError = {} as FunctionExtractionError
	const _comment: CommentExtractionError = {} as CommentExtractionError
	const _import: ImportExtractionError = {} as ImportExtractionError
	const _export: ExportExtractionError = {} as ExportExtractionError
	const _type: TypeExtractionError = {} as TypeExtractionError
	const _const: ConstantExtractionError = {} as ConstantExtractionError
	const _violation: ViolationDetectionError = {} as ViolationDetectionError

	assert(true) // TypeScript compilation success is the test
})
