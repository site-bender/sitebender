import { assert, assertEquals } from "jsr:@std/assert@1.0.14"

import extractImportedName from "./index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"

Deno.test("_extractImportedName - named import with imported field returns ok", function testNamedImport() {
	const spec = {
		imported: {
			type: "Identifier",
			value: "myFunction",
		},
		local: {
			type: "Identifier",
			value: "myFunction",
		},
	}

	const result = extractImportedName(spec)

	assert(isOk(result), "Should return ok for valid named import")

	if (isOk(result)) {
		assertEquals(result.value, "myFunction")
	}
})

Deno.test("_extractImportedName - named import with alias returns imported name", function testAliasedImport() {
	const spec = {
		imported: {
			type: "Identifier",
			value: "originalName",
		},
		local: {
			type: "Identifier",
			value: "aliasName",
		},
	}

	const result = extractImportedName(spec)

	assert(isOk(result), "Should return ok for aliased import")

	if (isOk(result)) {
		// Should return the IMPORTED name, not the local alias
		assertEquals(result.value, "originalName")
	}
})

Deno.test("_extractImportedName - default import falls back to local name", function testDefaultImport() {
	const spec = {
		// No "imported" field for default imports
		local: {
			type: "Identifier",
			value: "defaultExport",
		},
	}

	const result = extractImportedName(spec)

	assert(isOk(result), "Should return ok for default import using local")

	if (isOk(result)) {
		assertEquals(result.value, "defaultExport")
	}
})

Deno.test("_extractImportedName - imported with non-Identifier type falls back to local", function testNonIdentifierType() {
	const spec = {
		imported: {
			type: "StringLiteral",
			value: "notAnIdentifier",
		},
		local: {
			type: "Identifier",
			value: "localName",
		},
	}

	const result = extractImportedName(spec)

	assert(
		isOk(result),
		"Should fall back to local for non-Identifier imported type",
	)

	if (isOk(result)) {
		assertEquals(result.value, "localName")
	}
})

Deno.test("_extractImportedName - imported missing value falls back to local", function testMissingImportedValue() {
	const spec = {
		imported: {
			type: "Identifier",
			// Missing value
		},
		local: {
			type: "Identifier",
			value: "localName",
		},
	}

	const result = extractImportedName(spec)

	assert(
		isOk(result),
		"Should fall back to local when imported.value is missing",
	)

	if (isOk(result)) {
		assertEquals(result.value, "localName")
	}
})

Deno.test("_extractImportedName - no imported and no valid local returns error", function testNoValidFields() {
	const spec = {
		// No imported field
		local: {
			type: "StringLiteral", // Wrong type
			value: "something",
		},
	}

	const result = extractImportedName(spec)

	assert(
		isError(result),
		"Should return error when both imported and local are invalid",
	)

	if (isError(result)) {
		assertEquals(result.error.kind, "InvalidSpecifier")
		assertEquals(result.error.operation, "_extractImportedName")
	}
})

Deno.test("_extractImportedName - missing local field returns error", function testMissingLocal() {
	const spec = {
		// No imported field, no local field
		something: "else",
	}

	const result = extractImportedName(spec)

	assert(isError(result), "Should return error when local field is missing")

	if (isError(result)) {
		assertEquals(result.error.kind, "InvalidSpecifier")
		assert(
			result.error.message.includes("Failed to extract imported name"),
			"Error message should indicate failure",
		)
	}
})

Deno.test("_extractImportedName - imported with non-string value falls back to local", function testNonStringImportedValue() {
	const spec = {
		imported: {
			type: "Identifier",
			value: 123, // Not a string
		},
		local: {
			type: "Identifier",
			value: "localName",
		},
	}

	const result = extractImportedName(spec)

	assert(
		isOk(result),
		"Should fall back to local when imported.value is not a string",
	)

	if (isOk(result)) {
		assertEquals(result.value, "localName")
	}
})
