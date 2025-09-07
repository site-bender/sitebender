import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts"
import { parseFormula } from "../../../src/index.ts"

Deno.test("parseFormula - rejects ambiguous double operators like '5 + + 3'", () => {
	const result = parseFormula("5 + + 3", {})
	assertEquals(result.ok, false)
	if (!result.ok) {
		assertEquals(result.error.message.includes("Unexpected operator"), true)
	}
})

Deno.test("parseFormula - accepts unary plus with parentheses '5 + (+3)'", () => {
	const result = parseFormula("5 + (+3)", {})
	assertEquals(result.ok, true)
	if (result.ok) {
		assertEquals(result.value.tag, "Add")
		assertEquals(result.value.type, "operator")
	}
})

Deno.test("parseFormula - accepts unary minus with parentheses '5 + (-3)'", () => {
	const result = parseFormula("5 + (-3)", {})
	assertEquals(result.ok, true)
	if (result.ok) {
		assertEquals(result.value.tag, "Add")
		assertEquals(result.value.type, "operator")
	}
})

Deno.test("parseFormula - rejects double minus without parentheses '5 - - 3'", () => {
	const result = parseFormula("5 - - 3", {})
	assertEquals(result.ok, false)
	if (!result.ok) {
		assertEquals(result.error.message.includes("Unexpected operator"), true)
	}
})

Deno.test("parseFormula - accepts double minus with parentheses '5 - (-3)'", () => {
	const result = parseFormula("5 - (-3)", {})
	assertEquals(result.ok, true)
	if (result.ok) {
		assertEquals(result.value.tag, "Subtract")
		assertEquals(result.value.type, "operator")
	}
})

Deno.test("parseFormula - rejects mixed operators without parentheses '5 * + 3'", () => {
	const result = parseFormula("5 * + 3", {})
	assertEquals(result.ok, false)
	if (!result.ok) {
		assertEquals(result.error.message.includes("Unexpected operator"), true)
	}
})

Deno.test("parseFormula - accepts mixed operators with parentheses '5 * (+3)'", () => {
	const result = parseFormula("5 * (+3)", {})
	assertEquals(result.ok, true)
	if (result.ok) {
		assertEquals(result.value.tag, "Multiply")
		assertEquals(result.value.type, "operator")
	}
})
