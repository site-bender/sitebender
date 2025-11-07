import { assertEquals } from "@std/assert"
import _serializeExtend from "./index.ts"

Deno.test("_serializeExtend - simple type reference without type arguments", function testSimpleTypeReference() {
	const ext = {
		expression: {
			value: "BaseInterface",
		},
	}

	const result = _serializeExtend(ext)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "BaseInterface")
	}
})

Deno.test("_serializeExtend - type reference with single type argument", function testTypeReferenceWithSingleTypeArg() {
	const ext = {
		expression: {
			value: "Generic",
		},
		typeArguments: {
			params: [
				{
					type: "TsKeywordType",
					kind: "string",
				},
			],
		},
	}

	const result = _serializeExtend(ext)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "Generic<string>")
	}
})

Deno.test("_serializeExtend - type reference with multiple type arguments", function testTypeReferenceWithMultipleTypeArgs() {
	const ext = {
		expression: {
			value: "Map",
		},
		typeArguments: {
			params: [
				{
					type: "TsKeywordType",
					kind: "string",
				},
				{
					type: "TsKeywordType",
					kind: "number",
				},
			],
		},
	}

	const result = _serializeExtend(ext)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "Map<string, number>")
	}
})

Deno.test("_serializeExtend - type reference with nested type arguments", function testTypeReferenceWithNestedTypeArgs() {
	const ext = {
		expression: {
			value: "Container",
		},
		typeArguments: {
			params: [
				{
					type: "TsTypeReference",
					typeName: {
						type: "Identifier",
						value: "Array",
					},
					typeParams: {
						params: [
							{
								type: "TsKeywordType",
								kind: "string",
							},
						],
					},
				},
			],
		},
	}

	const result = _serializeExtend(ext)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "Container<Array<string>>")
	}
})

Deno.test("_serializeExtend - error when expression is missing", function testErrorWhenExpressionMissing() {
	const ext = {}

	const result = _serializeExtend(ext)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.kind, "InvalidExtendsClause")
		assertEquals(result.error.message, "Extends clause has no expression")
	}
})

Deno.test("_serializeExtend - error when expression value is missing", function testErrorWhenExpressionValueMissing() {
	const ext = {
		expression: {},
	}

	const result = _serializeExtend(ext)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.kind, "InvalidExtendsClause")
		assertEquals(result.error.message, "Extends clause expression has no name")
	}
})
