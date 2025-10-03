import { assertEquals } from "@std/assert"

import parser from "./index.ts"

Deno.test("parser - parses simple arithmetic expression", () => {
	const input = "2 + 3"
	const result = parser(input)

	assertEquals(result._tag, "Ok")

	if (result._tag === "Ok") {
		const ast = result.value

		assertEquals(ast._tag, "binaryOperator")

		if (ast._tag === "binaryOperator") {
			assertEquals(ast.operator, "plus")
		}
	}
})

Deno.test("parser - parses complex expression with precedence", () => {
	const input = "2 + 3 * 4"
	const result = parser(input)

	assertEquals(result._tag, "Ok")

	if (result._tag === "Ok") {
		const ast = result.value

		assertEquals(ast._tag, "binaryOperator")

		if (ast._tag === "binaryOperator") {
			assertEquals(ast.operator, "plus")
			assertEquals(ast.right._tag, "binaryOperator")
		}
	}
})

Deno.test("parser - parses function call", () => {
	const input = "sin(x)"
	const result = parser(input)

	assertEquals(result._tag, "Ok")

	if (result._tag === "Ok") {
		const ast = result.value

		assertEquals(ast._tag, "functionCall")

		if (ast._tag === "functionCall") {
			assertEquals(ast.name, "sin")
			assertEquals(ast.arguments.length, 1)
		}
	}
})

Deno.test("parser - parses grouped expression", () => {
	const input = "(2 + 3) * 4"
	const result = parser(input)

	assertEquals(result._tag, "Ok")

	if (result._tag === "Ok") {
		const ast = result.value

		assertEquals(ast._tag, "binaryOperator")

		if (ast._tag === "binaryOperator") {
			assertEquals(ast.operator, "multiply")
			assertEquals(ast.left._tag, "group")
		}
	}
})

Deno.test("parser - returns error for incomplete expression", () => {
	const input = "2 +"
	const result = parser(input)

	assertEquals(result._tag, "Error")
})

Deno.test("parser - returns error for unexpected token after complete expression", () => {
	const input = "2 3"
	const result = parser(input)

	assertEquals(result._tag, "Error")
})
