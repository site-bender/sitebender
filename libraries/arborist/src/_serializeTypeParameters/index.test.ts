import { assert, assertEquals } from "jsr:@std/assert@1.0.14"
import type { TypeExtractionError } from "../types/errors/index.ts"

import serializeTypeParameters from "./index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"

Deno.test("serializeTypeParameters - null returns ok with empty string", function testNullTypeParams() {
	const result = serializeTypeParameters(null)

	assert(isOk(result), "Should return ok for null")

	if (isOk(result)) {
		assertEquals(result.value, "")
	}
})

Deno.test("serializeTypeParameters - undefined returns ok with empty string", function testUndefinedTypeParams() {
	const result = serializeTypeParameters(undefined)

	assert(isOk(result), "Should return ok for undefined")

	if (isOk(result)) {
		assertEquals(result.value, "")
	}
})

Deno.test("serializeTypeParameters - no params returns ok with empty string", function testNoParams() {
	const typeParams = {
		params: [],
	}

	const result = serializeTypeParameters(typeParams)

	assert(isOk(result), "Should return ok for empty params")

	if (isOk(result)) {
		assertEquals(result.value, "")
	}
})

Deno.test("serializeTypeParameters - single type parameter returns ok", function testSingleTypeParam() {
	const typeParams = {
		params: [
			{
				name: {
					type: "Identifier",
					value: "T",
				},
			},
		],
	}

	const result = serializeTypeParameters(typeParams)

	assert(isOk(result), "Should return ok for single type parameter")

	if (isOk(result)) {
		assertEquals(result.value, "<T>")
	}
})

Deno.test("serializeTypeParameters - multiple type parameters returns ok", function testMultipleTypeParams() {
	const typeParams = {
		params: [
			{
				name: {
					type: "Identifier",
					value: "T",
				},
			},
			{
				name: {
					type: "Identifier",
					value: "U",
				},
			},
			{
				name: {
					type: "Identifier",
					value: "V",
				},
			},
		],
	}

	const result = serializeTypeParameters(typeParams)

	assert(isOk(result), "Should return ok for multiple type parameters")

	if (isOk(result)) {
		assertEquals(result.value, "<T, U, V>")
	}
})

Deno.test("serializeTypeParameters - type parameter with constraint returns ok", function testTypeParamWithConstraint() {
	const typeParams = {
		params: [
			{
				name: {
					type: "Identifier",
					value: "T",
				},
				constraint: {
					type: "TsTypeReference",
					typeName: {
						type: "Identifier",
						value: "string",
					},
				},
			},
		],
	}

	const result = serializeTypeParameters(typeParams)

	assert(isOk(result), "Should return ok for type parameter with constraint")

	if (isOk(result)) {
		assert(
			result.value.includes("extends"),
			"Should include extends keyword",
		)
	}
})

Deno.test("serializeTypeParameters - type parameter with default returns ok", function testTypeParamWithDefault() {
	const typeParams = {
		params: [
			{
				name: {
					type: "Identifier",
					value: "T",
				},
				default: {
					type: "TsKeywordType",
					kind: "string",
				},
			},
		],
	}

	const result = serializeTypeParameters(typeParams)

	assert(isOk(result), "Should return ok for type parameter with default")

	if (isOk(result)) {
		assert(result.value.includes("="), "Should include equals sign")
	}
})

Deno.test("serializeTypeParameters - type parameter with constraint and default returns ok", function testTypeParamWithBoth() {
	const typeParams = {
		params: [
			{
				name: {
					type: "Identifier",
					value: "T",
				},
				constraint: {
					type: "TsTypeReference",
					typeName: {
						type: "Identifier",
						value: "object",
					},
				},
				default: {
					type: "TsKeywordType",
					kind: "Record<string, unknown>",
				},
			},
		],
	}

	const result = serializeTypeParameters(typeParams)

	assert(
		isOk(result),
		"Should return ok for type parameter with both constraint and default",
	)

	if (isOk(result)) {
		assert(
			result.value.includes("extends"),
			"Should include extends keyword",
		)
		assert(result.value.includes("="), "Should include equals sign")
	}
})

Deno.test("serializeTypeParameters - missing name object returns error", function testMissingNameObject() {
	const typeParams = {
		params: [
			{
				// Missing name
			},
		],
	}

	const result = serializeTypeParameters(typeParams)

	assert(isError(result), "Should return error for missing name object")

	if (isError(result)) {
		const err = result.error as TypeExtractionError
		assertEquals(err.kind, "InvalidTypeParameter")
		assertEquals(err.operation, "extractTypes")
		assert(
			err.message.includes("no name"),
			"Error message should mention missing name",
		)
	}
})

Deno.test("serializeTypeParameters - missing name value returns error", function testMissingNameValue() {
	const typeParams = {
		params: [
			{
				name: {
					type: "Identifier",
					// Missing value
				},
			},
		],
	}

	const result = serializeTypeParameters(typeParams)

	assert(isError(result), "Should return error for missing name value")

	if (isError(result)) {
		const err = result.error as TypeExtractionError
		assertEquals(err.kind, "InvalidTypeParameter")
		assert(
			err.message.includes("no value"),
			"Error message should mention missing value",
		)
	}
})

Deno.test("serializeTypeParameters - propagates error from first invalid param", function testErrorPropagation() {
	const typeParams = {
		params: [
			{
				name: {
					type: "Identifier",
					value: "T",
				},
			},
			{
				name: {
					type: "Identifier",
					// Missing value
				},
			},
			{
				name: {
					type: "Identifier",
					value: "V",
				},
			},
		],
	}

	const result = serializeTypeParameters(typeParams)

	assert(isError(result), "Should return error when any param is invalid")

	if (isError(result)) {
		const err = result.error as TypeExtractionError
		assertEquals(err.kind, "InvalidTypeParameter")
	}
})
