import { assertEquals } from "@std/assert"
import serializeExtendsClause from "./index.ts"

Deno.test("serializeExtendsClause - undefined extends clause returns empty string", function testUndefinedExtendsClause() {
	const result = serializeExtendsClause(undefined)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "")
	}
})

Deno.test("serializeExtendsClause - null extends clause returns empty string", function testNullExtendsClause() {
	const result = serializeExtendsClause(null)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "")
	}
})

Deno.test("serializeExtendsClause - empty array returns empty string", function testEmptyArray() {
	const result = serializeExtendsClause([])

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "")
	}
})

Deno.test("serializeExtendsClause - single extends clause", function testSingleExtendsClause() {
	const extendsClause = [
		{
			expression: {
				value: "BaseInterface",
			},
		},
	]

	const result = serializeExtendsClause(extendsClause)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, " extends BaseInterface")
	}
})

Deno.test("serializeExtendsClause - multiple extends clauses", function testMultipleExtendsClauses() {
	const extendsClause = [
		{
			expression: {
				value: "First",
			},
		},
		{
			expression: {
				value: "Second",
			},
		},
		{
			expression: {
				value: "Third",
			},
		},
	]

	const result = serializeExtendsClause(extendsClause)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, " extends First, Second, Third")
	}
})

Deno.test("serializeExtendsClause - extends clause with type arguments", function testExtendsClauseWithTypeArguments() {
	const extendsClause = [
		{
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
		},
	]

	const result = serializeExtendsClause(extendsClause)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, " extends Generic<string>")
	}
})

Deno.test("serializeExtendsClause - multiple extends with mixed type arguments", function testMultipleExtendsWithMixedTypeArguments() {
	const extendsClause = [
		{
			expression: {
				value: "Base",
			},
		},
		{
			expression: {
				value: "Generic",
			},
			typeArguments: {
				params: [
					{
						type: "TsKeywordType",
						kind: "number",
					},
				],
			},
		},
	]

	const result = serializeExtendsClause(extendsClause)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, " extends Base, Generic<number>")
	}
})

Deno.test("serializeExtendsClause - error propagation from _serializeExtend", function testErrorPropagation() {
	const extendsClause = [
		{
			// Missing expression - should cause error
		},
	]

	const result = serializeExtendsClause(extendsClause)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.kind, "InvalidExtendsClause")
	}
})

Deno.test("serializeExtendsClause - error on first of multiple extends", function testErrorOnFirstOfMultiple() {
	const extendsClause = [
		{
			// Missing expression - should cause error
		},
		{
			expression: {
				value: "Valid",
			},
		},
	]

	const result = serializeExtendsClause(extendsClause)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.kind, "InvalidExtendsClause")
	}
})
