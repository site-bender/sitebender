import { assert, assertEquals } from "jsr:@std/assert@1.0.14"

import extractLocalName from "./index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"

Deno.test("_extractLocalName - valid specifier with identifier returns ok", function testValidSpecifier() {
	const spec = {
		local: {
			type: "Identifier",
			value: "myFunction",
		},
	}

	const result = extractLocalName(spec)

	assert(isOk(result), "Should return ok for valid specifier")

	if (isOk(result)) {
		assertEquals(result.value, "myFunction")
	}
})

Deno.test("_extractLocalName - specifier with different name returns ok", function testDifferentName() {
	const spec = {
		local: {
			type: "Identifier",
			value: "someOtherName",
		},
	}

	const result = extractLocalName(spec)

	assert(isOk(result), "Should return ok for any valid identifier")

	if (isOk(result)) {
		assertEquals(result.value, "someOtherName")
	}
})

Deno.test("_extractLocalName - specifier with underscore name returns ok", function testUnderscoreName() {
	const spec = {
		local: {
			type: "Identifier",
			value: "_privateVar",
		},
	}

	const result = extractLocalName(spec)

	assert(isOk(result), "Should return ok for underscore-prefixed name")

	if (isOk(result)) {
		assertEquals(result.value, "_privateVar")
	}
})

Deno.test("_extractLocalName - specifier without local property returns error", function testMissingLocal() {
	const spec = {
		imported: {
			type: "Identifier",
			value: "something",
		},
	}

	const result = extractLocalName(spec)

	assert(isError(result), "Should return error for missing local property")

	if (isError(result)) {
		assertEquals(result.error.kind, "MissingLocal")
		assertEquals(result.error.operation, "_extractLocalName")
		assertEquals(result.error.code, "INVALID_ARGUMENT")
		assert(
			result.error.message.includes("no 'local' property"),
			"Error message should mention missing local property",
		)
	}
})

Deno.test("_extractLocalName - empty specifier returns error", function testEmptySpecifier() {
	const spec = {}

	const result = extractLocalName(spec)

	assert(isError(result), "Should return error for empty specifier")

	if (isError(result)) {
		assertEquals(result.error.kind, "MissingLocal")
	}
})

Deno.test("_extractLocalName - local is not identifier returns error", function testNotIdentifier() {
	const spec = {
		local: {
			type: "StringLiteral",
			value: "myString",
		},
	}

	const result = extractLocalName(spec)

	assert(isError(result), "Should return error for non-Identifier type")

	if (isError(result)) {
		assertEquals(result.error.kind, "NotIdentifier")
		assertEquals(result.error.operation, "_extractLocalName")
		assertEquals(result.error.code, "INVALID_ARGUMENT")
		assertEquals(result.error.specifierType, "StringLiteral")
		assert(
			result.error.message.includes('Expected local.type to be "Identifier"'),
			"Error message should mention expected type",
		)
		assert(
			result.error.message.includes("StringLiteral"),
			"Error message should show actual type",
		)
	}
})

Deno.test("_extractLocalName - local missing type returns error", function testMissingType() {
	const spec = {
		local: {
			value: "myValue",
		},
	}

	const result = extractLocalName(spec)

	assert(isError(result), "Should return error for missing type")

	if (isError(result)) {
		assertEquals(result.error.kind, "NotIdentifier")
		assert(
			result.error.message.includes("undefined"),
			"Error message should show undefined for missing type",
		)
	}
})

Deno.test("_extractLocalName - identifier missing value returns error", function testMissingValue() {
	const spec = {
		local: {
			type: "Identifier",
		},
	}

	const result = extractLocalName(spec)

	assert(isError(result), "Should return error for missing value")

	if (isError(result)) {
		assertEquals(result.error.kind, "InvalidSpecifier")
		assertEquals(result.error.operation, "_extractLocalName")
		assertEquals(result.error.code, "INVALID_ARGUMENT")
		assertEquals(result.error.specifierType, "Identifier")
		assert(
			result.error.message.includes("no 'value' property"),
			"Error message should mention missing value",
		)
	}
})

Deno.test("_extractLocalName - identifier with non-string value returns error", function testNonStringValue() {
	const spec = {
		local: {
			type: "Identifier",
			value: 123,
		},
	}

	const result = extractLocalName(spec)

	assert(isError(result), "Should return error for non-string value")

	if (isError(result)) {
		assertEquals(result.error.kind, "InvalidSpecifier")
		assert(
			result.error.message.includes("not a string"),
			"Error message should mention type issue",
		)
	}
})

Deno.test("_extractLocalName - identifier with empty string returns ok", function testEmptyStringValue() {
	const spec = {
		local: {
			type: "Identifier",
			value: "",
		},
	}

	const result = extractLocalName(spec)

	// Empty string is technically valid, even if unusual
	assert(isOk(result), "Should return ok for empty string (technically valid)")

	if (isOk(result)) {
		assertEquals(result.value, "")
	}
})
