import { assert, assertEquals } from "jsr:@std/assert@1.0.14"
import type { FunctionExtractionError } from "../types/errors/index.ts"

import _serializePattern from "./index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"

Deno.test("_serializePattern - null node returns ok with empty string", function testNullNode() {
	const result = _serializePattern(null)

	assert(isOk(result), "Should return ok for null node")

	if (isOk(result)) {
		assertEquals(result.value, "")
	}
})

Deno.test("_serializePattern - undefined node returns ok with empty string", function testUndefinedNode() {
	const result = _serializePattern(undefined)

	assert(isOk(result), "Should return ok for undefined node")

	if (isOk(result)) {
		assertEquals(result.value, "")
	}
})

Deno.test("_serializePattern - Identifier returns ok", function testIdentifier() {
	const node = {
		type: "Identifier",
		value: "myVar",
	}

	const result = _serializePattern(node)

	assert(isOk(result), "Should return ok for Identifier")

	if (isOk(result)) {
		assertEquals(result.value, "myVar")
	}
})

Deno.test("_serializePattern - Identifier without value returns error", function testIdentifierNoValue() {
	const node = {
		type: "Identifier",
		// Missing value
	}

	const result = _serializePattern(node)

	assert(isError(result), "Should return error for Identifier without value")

	if (isError(result)) {
		const err = result.error as FunctionExtractionError
		assertEquals(err.kind, "UnsupportedPatternType")
		assert(
			err.message.includes("no value"),
			"Error message should mention missing value",
		)
	}
})

Deno.test("_serializePattern - RestElement returns ok", function testRestElement() {
	const node = {
		type: "RestElement",
		argument: {
			type: "Identifier",
			value: "rest",
		},
	}

	const result = _serializePattern(node)

	assert(isOk(result), "Should return ok for RestElement")

	if (isOk(result)) {
		assertEquals(result.value, "...rest")
	}
})

Deno.test("_serializePattern - RestElement with invalid argument returns error", function testRestElementInvalidArgument() {
	const node = {
		type: "RestElement",
		argument: {
			type: "Identifier",
			// Missing value
		},
	}

	const result = _serializePattern(node)

	assert(
		isError(result),
		"Should return error for RestElement with invalid argument",
	)

	if (isError(result)) {
		const err = result.error as FunctionExtractionError
		assertEquals(err.kind, "UnsupportedPatternType")
	}
})

Deno.test("_serializePattern - ArrayPattern returns ok", function testArrayPattern() {
	const node = {
		type: "ArrayPattern",
		elements: [
			{
				type: "Identifier",
				value: "a",
			},
			{
				type: "Identifier",
				value: "b",
			},
			{
				type: "Identifier",
				value: "c",
			},
		],
	}

	const result = _serializePattern(node)

	assert(isOk(result), "Should return ok for ArrayPattern")

	if (isOk(result)) {
		assertEquals(result.value, "[a, b, c]")
	}
})

Deno.test("_serializePattern - ArrayPattern with nested patterns returns ok", function testArrayPatternNested() {
	const node = {
		type: "ArrayPattern",
		elements: [
			{
				type: "Identifier",
				value: "first",
			},
			{
				type: "RestElement",
				argument: {
					type: "Identifier",
					value: "rest",
				},
			},
		],
	}

	const result = _serializePattern(node)

	assert(isOk(result), "Should return ok for nested ArrayPattern")

	if (isOk(result)) {
		assertEquals(result.value, "[first, ...rest]")
	}
})

Deno.test("_serializePattern - ArrayPattern with invalid element returns error", function testArrayPatternInvalidElement() {
	const node = {
		type: "ArrayPattern",
		elements: [
			{
				type: "Identifier",
				value: "a",
			},
			{
				type: "Identifier",
				// Missing value
			},
		],
	}

	const result = _serializePattern(node)

	assert(
		isError(result),
		"Should return error for ArrayPattern with invalid element",
	)

	if (isError(result)) {
		const err = result.error as FunctionExtractionError
		assertEquals(err.kind, "UnsupportedPatternType")
	}
})

Deno.test("_serializePattern - ObjectPattern returns ok", function testObjectPattern() {
	const node = {
		type: "ObjectPattern",
		properties: [
			{
				type: "KeyValuePatternProperty",
				key: {
					type: "Identifier",
					value: "name",
				},
				value: {
					type: "Identifier",
					value: "userName",
				},
			},
			{
				type: "KeyValuePatternProperty",
				key: {
					type: "Identifier",
					value: "age",
				},
				value: {
					type: "Identifier",
					value: "age",
				},
			},
		],
	}

	const result = _serializePattern(node)

	assert(isOk(result), "Should return ok for ObjectPattern")

	if (isOk(result)) {
		assertEquals(result.value, "{ name: userName, age: age }")
	}
})

Deno.test("_serializePattern - ObjectPattern with nested pattern returns ok", function testObjectPatternNested() {
	const node = {
		type: "ObjectPattern",
		properties: [
			{
				type: "KeyValuePatternProperty",
				key: {
					type: "Identifier",
					value: "user",
				},
				value: {
					type: "ObjectPattern",
					properties: [
						{
							type: "KeyValuePatternProperty",
							key: {
								type: "Identifier",
								value: "name",
							},
							value: {
								type: "Identifier",
								value: "name",
							},
						},
					],
				},
			},
		],
	}

	const result = _serializePattern(node)

	assert(isOk(result), "Should return ok for nested ObjectPattern")

	if (isOk(result)) {
		assertEquals(result.value, "{ user: { name: name } }")
	}
})

Deno.test("_serializePattern - ObjectPattern with invalid property returns error", function testObjectPatternInvalidProperty() {
	const node = {
		type: "ObjectPattern",
		properties: [
			{
				type: "InvalidPropertyType",
				key: {
					type: "Identifier",
					value: "foo",
				},
			},
		],
	}

	const result = _serializePattern(node)

	assert(
		isError(result),
		"Should return error for ObjectPattern with invalid property",
	)

	if (isError(result)) {
		const err = result.error as FunctionExtractionError
		assertEquals(err.kind, "UnsupportedPatternType")
	}
})

Deno.test("_serializePattern - unknown pattern type returns error", function testUnknownPatternType() {
	const node = {
		type: "UnknownPatternType",
		someField: "value",
	}

	const result = _serializePattern(node)

	assert(isError(result), "Should return error for unknown pattern type")

	if (isError(result)) {
		const err = result.error as FunctionExtractionError
		assertEquals(err.kind, "UnsupportedPatternType")
		assertEquals(err.operation, "extractFunctions")
		assert(
			err.message.includes("UnknownPatternType"),
			"Error message should mention the unknown type",
		)
		assertEquals(err.nodeType, "UnknownPatternType")
	}
})
