import { assert, assertEquals } from "jsr:@std/assert@1.0.14"

import _extractDefaultExportName from "./index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"

Deno.test("_extractDefaultExportName - undefined declaration returns 'default'", function testUndefinedDecl() {
	const result = _extractDefaultExportName(undefined)

	assert(isOk(result), "Should return ok for undefined declaration")

	if (isOk(result)) {
		assertEquals(result.value, "default")
	}
})

Deno.test("_extractDefaultExportName - named function declaration returns name", function testNamedFunction() {
	const decl = {
		type: "FunctionDeclaration",
		identifier: {
			value: "myFunction",
		},
	}

	const result = _extractDefaultExportName(decl)

	assert(isOk(result), "Should return ok for named function")

	if (isOk(result)) {
		assertEquals(result.value, "myFunction")
	}
})

Deno.test("_extractDefaultExportName - anonymous function returns 'default'", function testAnonymousFunction() {
	const decl = {
		type: "FunctionDeclaration",
		// No identifier
	}

	const result = _extractDefaultExportName(decl)

	assert(isOk(result), "Should return ok with 'default' for anonymous function")

	if (isOk(result)) {
		assertEquals(result.value, "default")
	}
})

Deno.test("_extractDefaultExportName - function expression with name returns name", function testFunctionExpression() {
	const decl = {
		type: "FunctionExpression",
		identifier: {
			value: "myFuncExpr",
		},
	}

	const result = _extractDefaultExportName(decl)

	assert(isOk(result), "Should return ok for function expression")

	if (isOk(result)) {
		assertEquals(result.value, "myFuncExpr")
	}
})

Deno.test("_extractDefaultExportName - non-function type returns 'default'", function testNonFunction() {
	const decl = {
		type: "ClassDeclaration",
		identifier: {
			value: "MyClass",
		},
	}

	const result = _extractDefaultExportName(decl)

	assert(isOk(result), "Should return ok with 'default' for non-function")

	if (isOk(result)) {
		assertEquals(result.value, "default")
	}
})

Deno.test("_extractDefaultExportName - missing type property returns error", function testMissingType() {
	const decl = {
		// No type property
		identifier: {
			value: "something",
		},
	}

	const result = _extractDefaultExportName(decl)

	assert(isError(result), "Should return error for missing type")

	if (isError(result)) {
		assertEquals(result.error.kind, "InvalidExportName")
		assertEquals(result.error.operation, "_extractDefaultExportName")
	}
})

Deno.test("_extractDefaultExportName - identifier with missing value returns error", function testMissingIdentifierValue() {
	const decl = {
		type: "FunctionDeclaration",
		identifier: {
			// Missing value
		},
	}

	const result = _extractDefaultExportName(decl)

	assert(isError(result), "Should return error for missing identifier value")

	if (isError(result)) {
		assertEquals(result.error.kind, "InvalidExportName")
		assert(
			result.error.message.includes("no valid 'value' property"),
			"Error message should mention missing value",
		)
	}
})

Deno.test("_extractDefaultExportName - identifier with non-string value returns error", function testNonStringValue() {
	const decl = {
		type: "FunctionDeclaration",
		identifier: {
			value: 123, // Not a string
		},
	}

	const result = _extractDefaultExportName(decl)

	assert(isError(result), "Should return error for non-string value")

	if (isError(result)) {
		assertEquals(result.error.kind, "InvalidExportName")
	}
})
