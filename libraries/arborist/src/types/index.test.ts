// @sitebender/arborist/src/types/index.test.ts
// Tests for type exports and type safety

import { assert } from "jsr:@std/assert@1.0.14"

import type {
	EnvoyMarker,
	FunctionBody,
	FunctionModifiers,
	ImportBinding,
	Parameter,
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
	TypeParameter,
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

Deno.test("types - ParseError has correct structure", () => {
	const error: ParseError = {
		_tag: "ParseError",
		message: "test error",
		file: "test.ts",
		line: 1,
		column: 1,
	}

	assert(error._tag === "ParseError")
	assert(error.message === "test error")
})
