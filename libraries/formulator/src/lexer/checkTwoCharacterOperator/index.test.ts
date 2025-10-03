import { assertEquals } from "@std/assert"

import checkTwoCharacterOperator from "./index.ts"

Deno.test("checkTwoCharacterOperator - detects <= operator", () => {
	const result = checkTwoCharacterOperator("<=")(0)
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "lessThanOrEqual")
	}
})

Deno.test("checkTwoCharacterOperator - detects >= operator", () => {
	const result = checkTwoCharacterOperator(">=")(0)
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "greaterThanOrEqual")
	}
})

Deno.test("checkTwoCharacterOperator - detects != operator", () => {
	const result = checkTwoCharacterOperator("!=")(0)
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "notEqual")
	}
})

Deno.test("checkTwoCharacterOperator - detects == operator", () => {
	const result = checkTwoCharacterOperator("==")(0)
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "equalTo")
	}
})

Deno.test("checkTwoCharacterOperator - detects && operator", () => {
	const result = checkTwoCharacterOperator("&&")(0)
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "and")
	}
})

Deno.test("checkTwoCharacterOperator - detects || operator", () => {
	const result = checkTwoCharacterOperator("||")(0)
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "or")
	}
})

Deno.test("checkTwoCharacterOperator - detects ^^ operator", () => {
	const result = checkTwoCharacterOperator("^^")(0)
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "xor")
	}
})

Deno.test("checkTwoCharacterOperator - detects -> operator", () => {
	const result = checkTwoCharacterOperator("->")(0)
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "implies")
	}
})

// NOTE: Unicode symbols ≤, ≥, ≠ are single characters and should be handled
// in classifyChar via CHAR_MAP, not as two-character operators

Deno.test("checkTwoCharacterOperator - returns error for single char", () => {
	const result = checkTwoCharacterOperator("x + y")(0)
	assertEquals(result._tag, "Error")
})

Deno.test("checkTwoCharacterOperator - returns error for unknown two-char", () => {
	const result = checkTwoCharacterOperator("ab")(0)
	assertEquals(result._tag, "Error")
})

Deno.test("checkTwoCharacterOperator - returns error at end of string", () => {
	const result = checkTwoCharacterOperator("x")(0)
	assertEquals(result._tag, "Error")
})

Deno.test("checkTwoCharacterOperator - curried application works", () => {
	const withInput = checkTwoCharacterOperator("x <= 5")
	const result = withInput(2)
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "lessThanOrEqual")
	}
})

Deno.test("checkTwoCharacterOperator - works at different positions", () => {
	const input = "a + b <= c"
	const result1 = checkTwoCharacterOperator(input)(6)
	assertEquals(result1._tag, "Ok")
	if (result1._tag === "Ok") {
		assertEquals(result1.value, "lessThanOrEqual")
	}

	const result2 = checkTwoCharacterOperator(input)(0)
	assertEquals(result2._tag, "Error")

	const result3 = checkTwoCharacterOperator(input)(2)
	assertEquals(result3._tag, "Error")
})
