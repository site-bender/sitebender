import { assert, assertEquals } from "jsr:@std/assert@1.0.14"
import type { FunctionExtractionError } from "../../types/errors/index.ts"

import _serializeProperty from "./index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"

Deno.test("_serializeProperty - valid KeyValuePatternProperty returns ok", function testValidProperty() {
	const prop = {
		type: "KeyValuePatternProperty",
		key: {
			type: "Identifier",
			value: "foo",
		},
		value: {
			type: "Identifier",
			value: "bar",
		},
	}

	const result = _serializeProperty(prop)

	assert(isOk(result), "Should return ok for valid property")

	if (isOk(result)) {
		assertEquals(result.value, "foo: bar")
	}
})

Deno.test("_serializeProperty - same key and value returns ok", function testSameKeyValue() {
	const prop = {
		type: "KeyValuePatternProperty",
		key: {
			type: "Identifier",
			value: "name",
		},
		value: {
			type: "Identifier",
			value: "name",
		},
	}

	const result = _serializeProperty(prop)

	assert(isOk(result), "Should return ok for same key/value")

	if (isOk(result)) {
		assertEquals(result.value, "name: name")
	}
})

Deno.test("_serializeProperty - nested destructuring returns ok", function testNestedDestructuring() {
	const prop = {
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
						value: "userName",
					},
				},
			],
		},
	}

	const result = _serializeProperty(prop)

	assert(isOk(result), "Should return ok for nested destructuring")

	if (isOk(result)) {
		assertEquals(result.value, "user: { name: userName }")
	}
})

Deno.test("_serializeProperty - invalid property type returns error", function testInvalidPropertyType() {
	const prop = {
		type: "SomeOtherType",
		key: {
			type: "Identifier",
			value: "foo",
		},
	}

	const result = _serializeProperty(prop)

	assert(isError(result), "Should return error for invalid property type")

	if (isError(result)) {
		const err = result.error as FunctionExtractionError
		assertEquals(err.kind, "UnsupportedPatternType")
		assertEquals(err.operation, "extractFunctions")
		assert(
			err.message.includes("SomeOtherType"),
			"Error message should mention the invalid type",
		)
	}
})

Deno.test("_serializeProperty - undefined type returns error", function testUndefinedType() {
	const prop = {
		// Missing type
		key: {
			type: "Identifier",
			value: "foo",
		},
	}

	const result = _serializeProperty(prop)

	assert(isError(result), "Should return error for missing type")

	if (isError(result)) {
		const err = result.error as FunctionExtractionError
		assertEquals(err.kind, "UnsupportedPatternType")
	}
})
