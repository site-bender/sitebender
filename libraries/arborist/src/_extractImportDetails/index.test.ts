import { assert, assertEquals } from "jsr:@std/assert@1.0.14"

import _extractImportDetails from "./index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"

Deno.test("_extractImportDetails - valid default import returns ok", function testValidDefaultImport() {
	const node = {
		type: "ImportDeclaration",
		source: {
			type: "StringLiteral",
			value: "./myModule.ts",
		},
		span: {
			start: 0,
			end: 30,
		},
		specifiers: [
			{
				type: "ImportDefaultSpecifier",
				local: {
					type: "Identifier",
					value: "myDefault",
				},
			},
		],
		typeOnly: false,
	}

	const result = _extractImportDetails(node)

	assert(isOk(result), "Should return ok for valid default import")

	if (isOk(result)) {
		assertEquals(result.value.specifier, "./myModule.ts")
		assertEquals(result.value.kind, "default")
		assertEquals(result.value.imports.length, 1)
		assertEquals(result.value.imports[0].imported, "default")
		assertEquals(result.value.imports[0].local, "myDefault")
		assertEquals(result.value.position.line, 1)
		assertEquals(result.value.position.column, 0)
		assertEquals(result.value.span.start, 0)
		assertEquals(result.value.span.end, 30)
	}
})

Deno.test("_extractImportDetails - valid named import returns ok", function testValidNamedImport() {
	const node = {
		type: "ImportDeclaration",
		source: {
			type: "StringLiteral",
			value: "./helpers.ts",
		},
		span: {
			start: 100,
			end: 150,
		},
		specifiers: [
			{
				type: "ImportSpecifier",
				imported: {
					type: "Identifier",
					value: "foo",
				},
				local: {
					type: "Identifier",
					value: "foo",
				},
				isTypeOnly: false,
			},
			{
				type: "ImportSpecifier",
				imported: {
					type: "Identifier",
					value: "bar",
				},
				local: {
					type: "Identifier",
					value: "baz",
				},
				isTypeOnly: false,
			},
		],
		typeOnly: false,
	}

	const result = _extractImportDetails(node)

	assert(isOk(result), "Should return ok for valid named import")

	if (isOk(result)) {
		assertEquals(result.value.specifier, "./helpers.ts")
		assertEquals(result.value.kind, "named")
		assertEquals(result.value.imports.length, 2)
		assertEquals(result.value.imports[0].imported, "foo")
		assertEquals(result.value.imports[0].local, "foo")
		assertEquals(result.value.imports[1].imported, "bar")
		assertEquals(result.value.imports[1].local, "baz")
	}
})

Deno.test("_extractImportDetails - valid namespace import returns ok", function testValidNamespaceImport() {
	const node = {
		type: "ImportDeclaration",
		source: {
			type: "StringLiteral",
			value: "./module.ts",
		},
		span: {
			start: 50,
			end: 100,
		},
		specifiers: [
			{
				type: "ImportStarAsSpecifier",
				local: {
					type: "Identifier",
					value: "myNamespace",
				},
			},
		],
		typeOnly: false,
	}

	const result = _extractImportDetails(node)

	assert(isOk(result), "Should return ok for valid namespace import")

	if (isOk(result)) {
		assertEquals(result.value.specifier, "./module.ts")
		assertEquals(result.value.kind, "namespace")
		assertEquals(result.value.imports.length, 1)
		assertEquals(result.value.imports[0].imported, "*")
		assertEquals(result.value.imports[0].local, "myNamespace")
		assertEquals(result.value.imports[0].isType, false)
	}
})

Deno.test("_extractImportDetails - valid type-only import returns ok", function testValidTypeOnlyImport() {
	const node = {
		type: "ImportDeclaration",
		source: {
			type: "StringLiteral",
			value: "./types.ts",
		},
		span: {
			start: 200,
			end: 250,
		},
		specifiers: [
			{
				type: "ImportSpecifier",
				imported: {
					type: "Identifier",
					value: "MyType",
				},
				local: {
					type: "Identifier",
					value: "MyType",
				},
				isTypeOnly: false,
			},
		],
		typeOnly: true,
	}

	const result = _extractImportDetails(node)

	assert(isOk(result), "Should return ok for valid type-only import")

	if (isOk(result)) {
		assertEquals(result.value.specifier, "./types.ts")
		assertEquals(result.value.kind, "type")
		assertEquals(result.value.imports.length, 1)
		assertEquals(result.value.imports[0].isType, true)
	}
})

Deno.test("_extractImportDetails - side-effect import returns ok", function testSideEffectImport() {
	const node = {
		type: "ImportDeclaration",
		source: {
			type: "StringLiteral",
			value: "./polyfill.ts",
		},
		span: {
			start: 0,
			end: 25,
		},
		specifiers: [],
		typeOnly: false,
	}

	const result = _extractImportDetails(node)

	assert(isOk(result), "Should return ok for side-effect import")

	if (isOk(result)) {
		assertEquals(result.value.specifier, "./polyfill.ts")
		assertEquals(result.value.kind, "named")
		assertEquals(result.value.imports.length, 0)
	}
})

Deno.test("_extractImportDetails - missing source property returns error", function testMissingSource() {
	const node = {
		type: "ImportDeclaration",
		// No source property
		span: {
			start: 0,
			end: 10,
		},
		specifiers: [],
	}

	const result = _extractImportDetails(node)

	assert(isError(result), "Should return error for missing source")

	if (isError(result)) {
		assertEquals(result.error.kind, "InvalidSpecifier")
		assertEquals(result.error.operation, "_extractImportDetails")
		assert(
			result.error.message.includes("no 'source' property"),
			"Error message should mention missing source",
		)
	}
})

Deno.test("_extractImportDetails - undefined source value returns error", function testUndefinedSourceValue() {
	const node = {
		type: "ImportDeclaration",
		source: {
			type: "StringLiteral",
			// Missing value
		},
		span: {
			start: 0,
			end: 10,
		},
		specifiers: [],
	}

	const result = _extractImportDetails(node)

	assert(isError(result), "Should return error for undefined source value")

	if (isError(result)) {
		assertEquals(result.error.kind, "InvalidSpecifier")
		assert(
			result.error.message.includes("no valid 'value' property"),
			"Error message should mention missing value",
		)
	}
})

Deno.test("_extractImportDetails - non-string source value returns error", function testNonStringSourceValue() {
	const node = {
		type: "ImportDeclaration",
		source: {
			type: "StringLiteral",
			value: 123, // Not a string
		},
		span: {
			start: 0,
			end: 10,
		},
		specifiers: [],
	}

	const result = _extractImportDetails(node)

	assert(isError(result), "Should return error for non-string source value")

	if (isError(result)) {
		assertEquals(result.error.kind, "InvalidSpecifier")
	}
})

Deno.test("_extractImportDetails - missing span returns error", function testMissingSpan() {
	const node = {
		type: "ImportDeclaration",
		source: {
			type: "StringLiteral",
			value: "./module.ts",
		},
		// No span property
		specifiers: [],
	}

	const result = _extractImportDetails(node)

	assert(isError(result), "Should return error for missing span")

	if (isError(result)) {
		assertEquals(result.error.kind, "InvalidSpecifier")
		assert(
			result.error.message.includes("Failed to extract span"),
			"Error message should mention span extraction failure",
		)
	}
})

Deno.test("_extractImportDetails - invalid span values return error", function testInvalidSpanValues() {
	const node = {
		type: "ImportDeclaration",
		source: {
			type: "StringLiteral",
			value: "./module.ts",
		},
		span: {
			start: 100,
			end: 50, // End before start
		},
		specifiers: [],
	}

	const result = _extractImportDetails(node)

	assert(isError(result), "Should return error for invalid span values")

	if (isError(result)) {
		assertEquals(result.error.kind, "InvalidSpecifier")
		assert(
			result.error.message.includes("Failed to extract span"),
			"Error message should mention span extraction failure",
		)
	}
})

Deno.test("_extractImportDetails - negative span values return error", function testNegativeSpanValues() {
	const node = {
		type: "ImportDeclaration",
		source: {
			type: "StringLiteral",
			value: "./module.ts",
		},
		span: {
			start: -10,
			end: 50,
		},
		specifiers: [],
	}

	const result = _extractImportDetails(node)

	assert(isError(result), "Should return error for negative span values")

	if (isError(result)) {
		assertEquals(result.error.kind, "InvalidSpecifier")
		assert(
			result.error.message.includes("Failed to extract span"),
			"Error message should mention span extraction failure",
		)
	}
})

Deno.test("_extractImportDetails - invalid specifier type propagates error", function testInvalidSpecifierType() {
	const node = {
		type: "ImportDeclaration",
		source: {
			type: "StringLiteral",
			value: "./module.ts",
		},
		span: {
			start: 0,
			end: 30,
		},
		specifiers: [
			{
				type: "UnknownSpecifierType",
				// Invalid type
			},
		],
		typeOnly: false,
	}

	const result = _extractImportDetails(node)

	assert(isError(result), "Should return error for invalid specifier type")

	if (isError(result)) {
		assertEquals(result.error.kind, "UnknownImportKind")
	}
})
