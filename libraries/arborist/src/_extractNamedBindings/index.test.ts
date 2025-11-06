import { assert, assertEquals } from "jsr:@std/assert@1.0.14"

import extractNamedBindings from "./index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"

Deno.test("_extractNamedBindings - single named import returns ok", function testSingleNamedImport() {
	const specifiers = [
		{
			type: "ImportSpecifier",
			imported: {
				type: "Identifier",
				value: "myFunction",
			},
			local: {
				type: "Identifier",
				value: "myFunction",
			},
			isTypeOnly: false,
		},
	]

	const result = extractNamedBindings(specifiers)(false)

	assert(isOk(result), "Should return ok for valid named import")

	if (isOk(result)) {
		assertEquals(result.value.length, 1)
		assertEquals(result.value[0].imported, "myFunction")
		assertEquals(result.value[0].local, "myFunction")
		assertEquals(result.value[0].isType, false)
	}
})

Deno.test("_extractNamedBindings - aliased import returns ok", function testAliasedImport() {
	const specifiers = [
		{
			type: "ImportSpecifier",
			imported: {
				type: "Identifier",
				value: "originalName",
			},
			local: {
				type: "Identifier",
				value: "alias",
			},
			isTypeOnly: false,
		},
	]

	const result = extractNamedBindings(specifiers)(false)

	assert(isOk(result), "Should return ok for aliased import")

	if (isOk(result)) {
		assertEquals(result.value.length, 1)
		assertEquals(result.value[0].imported, "originalName")
		assertEquals(result.value[0].local, "alias")
	}
})

Deno.test("_extractNamedBindings - default specifier returns ok", function testDefaultSpecifier() {
	const specifiers = [
		{
			type: "ImportDefaultSpecifier",
			local: {
				type: "Identifier",
				value: "defaultExport",
			},
		},
	]

	const result = extractNamedBindings(specifiers)(false)

	assert(isOk(result), "Should return ok for default specifier")

	if (isOk(result)) {
		assertEquals(result.value.length, 1)
		assertEquals(result.value[0].imported, "default")
		assertEquals(result.value[0].local, "defaultExport")
		assertEquals(result.value[0].isType, false)
	}
})

Deno.test("_extractNamedBindings - multiple specifiers returns ok", function testMultipleSpecifiers() {
	const specifiers = [
		{
			type: "ImportDefaultSpecifier",
			local: {
				type: "Identifier",
				value: "defaultExport",
			},
		},
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
	]

	const result = extractNamedBindings(specifiers)(false)

	assert(isOk(result), "Should return ok for multiple specifiers")

	if (isOk(result)) {
		assertEquals(result.value.length, 3)
		assertEquals(result.value[0].imported, "default")
		assertEquals(result.value[1].imported, "foo")
		assertEquals(result.value[2].imported, "bar")
		assertEquals(result.value[2].local, "baz")
	}
})

Deno.test("_extractNamedBindings - type-only import flag propagates", function testTypeOnlyFlag() {
	const specifiers = [
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
	]

	const result = extractNamedBindings(specifiers)(true) // isTypeOnly = true

	assert(isOk(result), "Should return ok for type-only import")

	if (isOk(result)) {
		assertEquals(result.value[0].isType, true)
	}
})

Deno.test("_extractNamedBindings - spec-level type-only flag overrides", function testSpecLevelTypeOnly() {
	const specifiers = [
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
			isTypeOnly: true, // Spec-level flag
		},
	]

	const result = extractNamedBindings(specifiers)(false) // Module-level is false

	assert(isOk(result), "Should return ok with spec-level type-only")

	if (isOk(result)) {
		// Spec-level true OR module-level false = true
		assertEquals(result.value[0].isType, true)
	}
})

Deno.test("_extractNamedBindings - empty specifiers returns ok with empty array", function testEmptySpecifiers() {
	const specifiers: ReadonlyArray<unknown> = []

	const result = extractNamedBindings(specifiers)(false)

	assert(isOk(result), "Should return ok for empty specifiers")

	if (isOk(result)) {
		assertEquals(result.value.length, 0)
	}
})

Deno.test("_extractNamedBindings - specifier without type returns error", function testMissingType() {
	const specifiers = [
		{
			// Missing type property
			local: {
				type: "Identifier",
				value: "something",
			},
		},
	]

	const result = extractNamedBindings(specifiers)(false)

	assert(isError(result), "Should return error for specifier without type")

	if (isError(result)) {
		assertEquals(result.error.kind, "UnknownImportKind")
		assertEquals(result.error.operation, "_extractNamedBindings")
	}
})

Deno.test("_extractNamedBindings - unknown specifier type returns error", function testUnknownType() {
	const specifiers = [
		{
			type: "SomeUnknownType",
			local: {
				type: "Identifier",
				value: "something",
			},
		},
	]

	const result = extractNamedBindings(specifiers)(false)

	assert(isError(result), "Should return error for unknown specifier type")

	if (isError(result)) {
		assertEquals(result.error.kind, "UnknownImportKind")
		assert(
			result.error.message.includes("Unknown import specifier type"),
			"Error message should mention unknown type",
		)
	}
})

Deno.test("_extractNamedBindings - invalid local in default specifier returns error", function testInvalidLocalInDefault() {
	const specifiers = [
		{
			type: "ImportDefaultSpecifier",
			local: {
				type: "StringLiteral", // Wrong type
				value: "something",
			},
		},
	]

	const result = extractNamedBindings(specifiers)(false)

	assert(
		isError(result),
		"Should return error for invalid local in default specifier",
	)

	if (isError(result)) {
		assertEquals(result.error.kind, "InvalidSpecifier")
	}
})

Deno.test("_extractNamedBindings - fails fast on first error", function testFailFast() {
	const specifiers = [
		{
			type: "ImportSpecifier",
			imported: {
				type: "Identifier",
				value: "validOne",
			},
			local: {
				type: "Identifier",
				value: "validOne",
			},
		},
		{
			type: "InvalidType", // This should cause error
		},
		{
			type: "ImportSpecifier",
			imported: {
				type: "Identifier",
				value: "neverProcessed",
			},
			local: {
				type: "Identifier",
				value: "neverProcessed",
			},
		},
	]

	const result = extractNamedBindings(specifiers)(false)

	assert(isError(result), "Should return error on first invalid specifier")

	if (isError(result)) {
		assertEquals(result.error.kind, "UnknownImportKind")
		// Should fail on second specifier, not process third
	}
})
