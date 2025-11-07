import { assert, assertEquals } from "jsr:@std/assert@1.0.14"
import type { ConstantExtractionError } from "../types/errors/index.ts"

import _serializeExpression from "./index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"
import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"

// ====================
// General Error Cases
// ====================

Deno.test("_serializeExpression - null returns ok with undefined", function testNullNode() {
	const result = _serializeExpression(null)

	assert(isOk(result), "Should return ok for null")

	if (isOk(result)) {
		assertEquals(result.value, "undefined")
	}
})

Deno.test("_serializeExpression - undefined returns ok with undefined", function testUndefinedNode() {
	const result = _serializeExpression(undefined)

	assert(isOk(result), "Should return ok for undefined")

	if (isOk(result)) {
		assertEquals(result.value, "undefined")
	}
})

Deno.test("_serializeExpression - node without type returns error", function testMissingType() {
	const node = {
		value: "something",
	}

	const result = _serializeExpression(node)

	assert(isError(result), "Should return error for node without type")

	if (isError(result)) {
		const err = result.error as ConstantExtractionError
		assertEquals(err.kind, "UnsupportedExpressionType")
		assertEquals(err.operation, "extractConstants")
		assert(
			err.message.includes("no type"),
			"Error message should mention missing type",
		)
	}
})

Deno.test("_serializeExpression - unsupported expression type returns error", function testUnsupportedType() {
	const node = {
		type: "UnsupportedNode",
		value: "test",
	}

	const result = _serializeExpression(node)

	assert(isError(result), "Should return error for unsupported type")

	if (isError(result)) {
		const err = result.error as ConstantExtractionError
		assertEquals(err.kind, "UnsupportedExpressionType")
		assert(
			err.message.includes("UnsupportedNode"),
			"Error message should mention the type",
		)
	}
})

// ====================
// NumericLiteral
// ====================

Deno.test("_serializeExpression - NumericLiteral integer returns ok", function testNumericLiteralInteger() {
	const node = {
		type: "NumericLiteral",
		value: 42,
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for numeric literal")

	if (isOk(result)) {
		assertEquals(result.value, "42")
	}
})

Deno.test("_serializeExpression - NumericLiteral float returns ok", function testNumericLiteralFloat() {
	const node = {
		type: "NumericLiteral",
		value: 3.14,
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for float literal")

	if (isOk(result)) {
		assertEquals(result.value, "3.14")
	}
})

Deno.test("_serializeExpression - NumericLiteral zero returns ok", function testNumericLiteralZero() {
	const node = {
		type: "NumericLiteral",
		value: 0,
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for zero")

	if (isOk(result)) {
		assertEquals(result.value, "0")
	}
})

Deno.test("_serializeExpression - NumericLiteral negative returns ok", function testNumericLiteralNegative() {
	const node = {
		type: "NumericLiteral",
		value: -10,
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for negative number")

	if (isOk(result)) {
		assertEquals(result.value, "-10")
	}
})

// ====================
// StringLiteral
// ====================

Deno.test("_serializeExpression - StringLiteral returns ok", function testStringLiteral() {
	const node = {
		type: "StringLiteral",
		value: "hello",
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for string literal")

	if (isOk(result)) {
		assertEquals(result.value, '"hello"')
	}
})

Deno.test("_serializeExpression - StringLiteral empty string returns ok", function testStringLiteralEmpty() {
	const node = {
		type: "StringLiteral",
		value: "",
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for empty string")

	if (isOk(result)) {
		assertEquals(result.value, '""')
	}
})

Deno.test("_serializeExpression - StringLiteral with quotes returns ok", function testStringLiteralWithQuotes() {
	const node = {
		type: "StringLiteral",
		value: 'say "hello"',
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for string with quotes")

	if (isOk(result)) {
		assertEquals(result.value, '"say "hello""')
	}
})

// ====================
// BooleanLiteral
// ====================

Deno.test("_serializeExpression - BooleanLiteral true returns ok", function testBooleanLiteralTrue() {
	const node = {
		type: "BooleanLiteral",
		value: true,
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for true literal")

	if (isOk(result)) {
		assertEquals(result.value, "true")
	}
})

Deno.test("_serializeExpression - BooleanLiteral false returns ok", function testBooleanLiteralFalse() {
	const node = {
		type: "BooleanLiteral",
		value: false,
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for false literal")

	if (isOk(result)) {
		assertEquals(result.value, "false")
	}
})

// ====================
// NullLiteral
// ====================

Deno.test("_serializeExpression - NullLiteral returns ok", function testNullLiteral() {
	const node = {
		type: "NullLiteral",
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for null literal")

	if (isOk(result)) {
		assertEquals(result.value, "null")
	}
})

// ====================
// Identifier
// ====================

Deno.test("_serializeExpression - Identifier returns ok", function testIdentifier() {
	const node = {
		type: "Identifier",
		value: "myVariable",
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for identifier")

	if (isOk(result)) {
		assertEquals(result.value, "myVariable")
	}
})

Deno.test("_serializeExpression - Identifier undefined returns ok", function testIdentifierUndefined() {
	const node = {
		type: "Identifier",
		value: "undefined",
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for undefined identifier")

	if (isOk(result)) {
		assertEquals(result.value, "undefined")
	}
})

Deno.test("_serializeExpression - Identifier without value returns error", function testIdentifierMissingValue() {
	const node = {
		type: "Identifier",
	}

	const result = _serializeExpression(node)

	assert(isError(result), "Should return error for identifier without value")

	if (isError(result)) {
		const err = result.error as ConstantExtractionError
		assertEquals(err.kind, "MissingValue")
		assert(
			err.message.includes("no value"),
			"Error message should mention missing value",
		)
	}
})

// ====================
// BinaryExpression
// ====================

Deno.test("_serializeExpression - BinaryExpression addition returns ok", function testBinaryExpressionAddition() {
	const node = {
		type: "BinaryExpression",
		operator: "+",
		left: {
			type: "NumericLiteral",
			value: 10,
		},
		right: {
			type: "NumericLiteral",
			value: 20,
		},
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for binary expression")

	if (isOk(result)) {
		assertEquals(result.value, "10 + 20")
	}
})

Deno.test("_serializeExpression - BinaryExpression multiplication returns ok", function testBinaryExpressionMultiplication() {
	const node = {
		type: "BinaryExpression",
		operator: "*",
		left: {
			type: "NumericLiteral",
			value: 5,
		},
		right: {
			type: "NumericLiteral",
			value: 3,
		},
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for multiplication")

	if (isOk(result)) {
		assertEquals(result.value, "5 * 3")
	}
})

Deno.test("_serializeExpression - BinaryExpression nested returns ok", function testBinaryExpressionNested() {
	const node = {
		type: "BinaryExpression",
		operator: "+",
		left: {
			type: "BinaryExpression",
			operator: "*",
			left: {
				type: "NumericLiteral",
				value: 2,
			},
			right: {
				type: "NumericLiteral",
				value: 3,
			},
		},
		right: {
			type: "NumericLiteral",
			value: 4,
		},
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for nested binary expression")

	if (isOk(result)) {
		assertEquals(result.value, "2 * 3 + 4")
	}
})

Deno.test("_serializeExpression - BinaryExpression without operator returns error", function testBinaryExpressionMissingOperator() {
	const node = {
		type: "BinaryExpression",
		left: {
			type: "NumericLiteral",
			value: 10,
		},
		right: {
			type: "NumericLiteral",
			value: 20,
		},
	}

	const result = _serializeExpression(node)

	assert(isError(result), "Should return error for missing operator")

	if (isError(result)) {
		const err = result.error as ConstantExtractionError
		assertEquals(err.kind, "MissingValue")
		assert(
			err.message.includes("operator"),
			"Error message should mention operator",
		)
	}
})

Deno.test("_serializeExpression - BinaryExpression with invalid left returns error", function testBinaryExpressionInvalidLeft() {
	const node = {
		type: "BinaryExpression",
		operator: "+",
		left: {
			type: "InvalidNode",
		},
		right: {
			type: "NumericLiteral",
			value: 20,
		},
	}

	const result = _serializeExpression(node)

	assert(isError(result), "Should return error for invalid left operand")

	if (isError(result)) {
		const err = result.error as ConstantExtractionError
		assertEquals(err.kind, "UnsupportedExpressionType")
	}
})

// ====================
// UnaryExpression
// ====================

Deno.test("_serializeExpression - UnaryExpression negation returns ok", function testUnaryExpressionNegation() {
	const node = {
		type: "UnaryExpression",
		operator: "-",
		argument: {
			type: "NumericLiteral",
			value: 5,
		},
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for unary negation")

	if (isOk(result)) {
		assertEquals(result.value, "-5")
	}
})

Deno.test("_serializeExpression - UnaryExpression logical not returns ok", function testUnaryExpressionNot() {
	const node = {
		type: "UnaryExpression",
		operator: "!",
		argument: {
			type: "BooleanLiteral",
			value: true,
		},
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for logical not")

	if (isOk(result)) {
		assertEquals(result.value, "!true")
	}
})

Deno.test("_serializeExpression - UnaryExpression without operator returns error", function testUnaryExpressionMissingOperator() {
	const node = {
		type: "UnaryExpression",
		argument: {
			type: "NumericLiteral",
			value: 5,
		},
	}

	const result = _serializeExpression(node)

	assert(isError(result), "Should return error for missing operator")

	if (isError(result)) {
		const err = result.error as ConstantExtractionError
		assertEquals(err.kind, "MissingValue")
		assert(
			err.message.includes("operator"),
			"Error message should mention operator",
		)
	}
})

// ====================
// MemberExpression
// ====================

Deno.test("_serializeExpression - MemberExpression dot notation returns ok", function testMemberExpressionDot() {
	const node = {
		type: "MemberExpression",
		computed: false,
		object: {
			type: "Identifier",
			value: "obj",
		},
		property: {
			type: "Identifier",
			value: "prop",
		},
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for dot notation")

	if (isOk(result)) {
		assertEquals(result.value, "obj.prop")
	}
})

Deno.test("_serializeExpression - MemberExpression computed returns ok", function testMemberExpressionComputed() {
	const node = {
		type: "MemberExpression",
		computed: true,
		object: {
			type: "Identifier",
			value: "arr",
		},
		property: {
			type: "NumericLiteral",
			value: 0,
		},
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for computed property")

	if (isOk(result)) {
		assertEquals(result.value, "arr[0]")
	}
})

Deno.test("_serializeExpression - MemberExpression nested returns ok", function testMemberExpressionNested() {
	const node = {
		type: "MemberExpression",
		computed: false,
		object: {
			type: "MemberExpression",
			computed: false,
			object: {
				type: "Identifier",
				value: "obj",
			},
			property: {
				type: "Identifier",
				value: "nested",
			},
		},
		property: {
			type: "Identifier",
			value: "prop",
		},
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for nested member expression")

	if (isOk(result)) {
		assertEquals(result.value, "obj.nested.prop")
	}
})

// ====================
// TemplateLiteral
// ====================

Deno.test("_serializeExpression - TemplateLiteral simple returns ok", function testTemplateLiteralSimple() {
	const node = {
		type: "TemplateLiteral",
		quasis: [
			{
				cooked: "hello world",
			},
		],
		expressions: [],
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for simple template")

	if (isOk(result)) {
		assertEquals(result.value, "`hello world`")
	}
})

Deno.test("_serializeExpression - TemplateLiteral with expression returns ok", function testTemplateLiteralWithExpression() {
	const node = {
		type: "TemplateLiteral",
		quasis: [
			{
				cooked: "hello ",
			},
			{
				cooked: "",
			},
		],
		expressions: [
			{
				type: "Identifier",
				value: "name",
			},
		],
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for template with expression")

	if (isOk(result)) {
		assertEquals(result.value, "`hello ${name}`")
	}
})

Deno.test("_serializeExpression - TemplateLiteral with multiple expressions returns ok", function testTemplateLiteralMultiple() {
	const node = {
		type: "TemplateLiteral",
		quasis: [
			{
				cooked: "Value: ",
			},
			{
				cooked: ", Count: ",
			},
			{
				cooked: "",
			},
		],
		expressions: [
			{
				type: "NumericLiteral",
				value: 42,
			},
			{
				type: "NumericLiteral",
				value: 10,
			},
		],
	}

	const result = _serializeExpression(node)

	assert(
		isOk(result),
		"Should return ok for template with multiple expressions",
	)

	if (isOk(result)) {
		assertEquals(result.value, "`Value: ${42}, Count: ${10}`")
	}
})

Deno.test("_serializeExpression - TemplateLiteral with invalid expression returns error", function testTemplateLiteralInvalidExpression() {
	const node = {
		type: "TemplateLiteral",
		quasis: [
			{
				cooked: "hello ",
			},
			{
				cooked: "",
			},
		],
		expressions: [
			{
				type: "InvalidNode",
			},
		],
	}

	const result = _serializeExpression(node)

	assert(isError(result), "Should return error for invalid expression")

	if (isError(result)) {
		const err = result.error as ConstantExtractionError
		assertEquals(err.kind, "UnsupportedExpressionType")
	}
})

// ====================
// ObjectExpression
// ====================

Deno.test("_serializeExpression - ObjectExpression empty returns ok", function testObjectExpressionEmpty() {
	const node = {
		type: "ObjectExpression",
		properties: [],
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for empty object")

	if (isOk(result)) {
		assertEquals(result.value, "{  }")
	}
})

Deno.test("_serializeExpression - ObjectExpression simple returns ok", function testObjectExpressionSimple() {
	const node = {
		type: "ObjectExpression",
		properties: [
			{
				type: "KeyValueProperty",
				key: {
					type: "Identifier",
					value: "name",
				},
				value: {
					type: "StringLiteral",
					value: "John",
				},
			},
		],
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for simple object")

	if (isOk(result)) {
		assertEquals(result.value, '{ name: "John" }')
	}
})

Deno.test("_serializeExpression - ObjectExpression multiple properties returns ok", function testObjectExpressionMultiple() {
	const node = {
		type: "ObjectExpression",
		properties: [
			{
				type: "KeyValueProperty",
				key: {
					type: "Identifier",
					value: "x",
				},
				value: {
					type: "NumericLiteral",
					value: 10,
				},
			},
			{
				type: "KeyValueProperty",
				key: {
					type: "Identifier",
					value: "y",
				},
				value: {
					type: "NumericLiteral",
					value: 20,
				},
			},
		],
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for object with multiple properties")

	if (isOk(result)) {
		assertEquals(result.value, "{ x: 10, y: 20 }")
	}
})

Deno.test("_serializeExpression - ObjectExpression nested returns ok", function testObjectExpressionNested() {
	const node = {
		type: "ObjectExpression",
		properties: [
			{
				type: "KeyValueProperty",
				key: {
					type: "Identifier",
					value: "user",
				},
				value: {
					type: "ObjectExpression",
					properties: [
						{
							type: "KeyValueProperty",
							key: {
								type: "Identifier",
								value: "name",
							},
							value: {
								type: "StringLiteral",
								value: "Alice",
							},
						},
					],
				},
			},
		],
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for nested object")

	if (isOk(result)) {
		assertEquals(result.value, '{ user: { name: "Alice" } }')
	}
})

Deno.test("_serializeExpression - ObjectExpression with invalid property returns error", function testObjectExpressionInvalidProperty() {
	const node = {
		type: "ObjectExpression",
		properties: [
			{
				type: "KeyValueProperty",
				key: {
					type: "InvalidNode",
				},
				value: {
					type: "StringLiteral",
					value: "test",
				},
			},
		],
	}

	const result = _serializeExpression(node)

	assert(isError(result), "Should return error for invalid property key")

	if (isError(result)) {
		const err = result.error as ConstantExtractionError
		assertEquals(err.kind, "UnsupportedExpressionType")
	}
})

// ====================
// ArrayExpression
// ====================

Deno.test("_serializeExpression - ArrayExpression empty returns ok", function testArrayExpressionEmpty() {
	const node = {
		type: "ArrayExpression",
		elements: [],
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for empty array")

	if (isOk(result)) {
		assertEquals(result.value, "[]")
	}
})

Deno.test("_serializeExpression - ArrayExpression simple returns ok", function testArrayExpressionSimple() {
	const node = {
		type: "ArrayExpression",
		elements: [
			{
				type: "NumericLiteral",
				value: 1,
			},
			{
				type: "NumericLiteral",
				value: 2,
			},
			{
				type: "NumericLiteral",
				value: 3,
			},
		],
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for simple array")

	if (isOk(result)) {
		assertEquals(result.value, "[1, 2, 3]")
	}
})

Deno.test("_serializeExpression - ArrayExpression mixed types returns ok", function testArrayExpressionMixed() {
	const node = {
		type: "ArrayExpression",
		elements: [
			{
				type: "NumericLiteral",
				value: 42,
			},
			{
				type: "StringLiteral",
				value: "hello",
			},
			{
				type: "BooleanLiteral",
				value: true,
			},
		],
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for array with mixed types")

	if (isOk(result)) {
		assertEquals(result.value, '[42, "hello", true]')
	}
})

Deno.test("_serializeExpression - ArrayExpression nested returns ok", function testArrayExpressionNested() {
	const node = {
		type: "ArrayExpression",
		elements: [
			{
				type: "ArrayExpression",
				elements: [
					{
						type: "NumericLiteral",
						value: 1,
					},
					{
						type: "NumericLiteral",
						value: 2,
					},
				],
			},
			{
				type: "ArrayExpression",
				elements: [
					{
						type: "NumericLiteral",
						value: 3,
					},
					{
						type: "NumericLiteral",
						value: 4,
					},
				],
			},
		],
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for nested arrays")

	if (isOk(result)) {
		assertEquals(result.value, "[[1, 2], [3, 4]]")
	}
})

Deno.test("_serializeExpression - ArrayExpression with null element returns ok", function testArrayExpressionNullElement() {
	const node = {
		type: "ArrayExpression",
		elements: [
			{
				type: "NumericLiteral",
				value: 1,
			},
			null,
			{
				type: "NumericLiteral",
				value: 3,
			},
		],
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for array with null element")

	if (isOk(result)) {
		assertEquals(result.value, "[1, 3]")
	}
})

Deno.test("_serializeExpression - ArrayExpression with invalid element returns error", function testArrayExpressionInvalidElement() {
	const node = {
		type: "ArrayExpression",
		elements: [
			{
				type: "NumericLiteral",
				value: 1,
			},
			{
				type: "InvalidNode",
			},
		],
	}

	const result = _serializeExpression(node)

	assert(isError(result), "Should return error for invalid array element")

	if (isError(result)) {
		const err = result.error as ConstantExtractionError
		assertEquals(err.kind, "UnsupportedExpressionType")
	}
})

// ====================
// CallExpression
// ====================

Deno.test("_serializeExpression - CallExpression no args returns ok", function testCallExpressionNoArgs() {
	const node = {
		type: "CallExpression",
		callee: {
			type: "Identifier",
			value: "foo",
		},
		arguments: [],
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for call with no args")

	if (isOk(result)) {
		assertEquals(result.value, "foo()")
	}
})

Deno.test("_serializeExpression - CallExpression with args returns ok", function testCallExpressionWithArgs() {
	const node = {
		type: "CallExpression",
		callee: {
			type: "Identifier",
			value: "add",
		},
		arguments: [
			{
				type: "NumericLiteral",
				value: 10,
			},
			{
				type: "NumericLiteral",
				value: 20,
			},
		],
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for call with args")

	if (isOk(result)) {
		assertEquals(result.value, "add(10, 20)")
	}
})

Deno.test("_serializeExpression - CallExpression nested returns ok", function testCallExpressionNested() {
	const node = {
		type: "CallExpression",
		callee: {
			type: "MemberExpression",
			computed: false,
			object: {
				type: "Identifier",
				value: "obj",
			},
			property: {
				type: "Identifier",
				value: "method",
			},
		},
		arguments: [
			{
				type: "StringLiteral",
				value: "test",
			},
		],
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for nested call expression")

	if (isOk(result)) {
		assertEquals(result.value, 'obj.method("test")')
	}
})

Deno.test("_serializeExpression - CallExpression with invalid callee returns error", function testCallExpressionInvalidCallee() {
	const node = {
		type: "CallExpression",
		callee: {
			type: "InvalidNode",
		},
		arguments: [],
	}

	const result = _serializeExpression(node)

	assert(isError(result), "Should return error for invalid callee")

	if (isError(result)) {
		const err = result.error as ConstantExtractionError
		assertEquals(err.kind, "UnsupportedExpressionType")
	}
})

// ====================
// ConditionalExpression
// ====================

Deno.test("_serializeExpression - ConditionalExpression simple returns ok", function testConditionalExpressionSimple() {
	const node = {
		type: "ConditionalExpression",
		test: {
			type: "BooleanLiteral",
			value: true,
		},
		consequent: {
			type: "StringLiteral",
			value: "yes",
		},
		alternate: {
			type: "StringLiteral",
			value: "no",
		},
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for conditional expression")

	if (isOk(result)) {
		assertEquals(result.value, 'true ? "yes" : "no"')
	}
})

Deno.test("_serializeExpression - ConditionalExpression nested returns ok", function testConditionalExpressionNested() {
	const node = {
		type: "ConditionalExpression",
		test: {
			type: "BooleanLiteral",
			value: true,
		},
		consequent: {
			type: "ConditionalExpression",
			test: {
				type: "BooleanLiteral",
				value: false,
			},
			consequent: {
				type: "NumericLiteral",
				value: 1,
			},
			alternate: {
				type: "NumericLiteral",
				value: 2,
			},
		},
		alternate: {
			type: "NumericLiteral",
			value: 3,
		},
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for nested conditional")

	if (isOk(result)) {
		assertEquals(result.value, "true ? false ? 1 : 2 : 3")
	}
})

Deno.test("_serializeExpression - ConditionalExpression with invalid test returns error", function testConditionalExpressionInvalidTest() {
	const node = {
		type: "ConditionalExpression",
		test: {
			type: "InvalidNode",
		},
		consequent: {
			type: "NumericLiteral",
			value: 1,
		},
		alternate: {
			type: "NumericLiteral",
			value: 2,
		},
	}

	const result = _serializeExpression(node)

	assert(isError(result), "Should return error for invalid test")

	if (isError(result)) {
		const err = result.error as ConstantExtractionError
		assertEquals(err.kind, "UnsupportedExpressionType")
	}
})

// ====================
// ArrowFunctionExpression
// ====================

Deno.test("_serializeExpression - ArrowFunctionExpression no params returns ok", function testArrowFunctionExpressionNoParams() {
	const node = {
		type: "ArrowFunctionExpression",
		params: [],
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for arrow function with no params")

	if (isOk(result)) {
		assertEquals(result.value, "() => ...")
	}
})

Deno.test("_serializeExpression - ArrowFunctionExpression with params returns ok", function testArrowFunctionExpressionWithParams() {
	const node = {
		type: "ArrowFunctionExpression",
		params: [
			{
				type: "Identifier",
				value: "x",
			},
			{
				type: "Identifier",
				value: "y",
			},
		],
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for arrow function with params")

	if (isOk(result)) {
		assertEquals(result.value, "(x, y) => ...")
	}
})

// ====================
// FunctionExpression
// ====================

Deno.test("_serializeExpression - FunctionExpression no params returns ok", function testFunctionExpressionNoParams() {
	const node = {
		type: "FunctionExpression",
		params: [],
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for function with no params")

	if (isOk(result)) {
		assertEquals(result.value, "function() { ... }")
	}
})

Deno.test("_serializeExpression - FunctionExpression with params returns ok", function testFunctionExpressionWithParams() {
	const node = {
		type: "FunctionExpression",
		params: [
			{
				type: "Identifier",
				value: "a",
			},
			{
				type: "Identifier",
				value: "b",
			},
		],
	}

	const result = _serializeExpression(node)

	assert(isOk(result), "Should return ok for function with params")

	if (isOk(result)) {
		assertEquals(result.value, "function(a, b) { ... }")
	}
})
