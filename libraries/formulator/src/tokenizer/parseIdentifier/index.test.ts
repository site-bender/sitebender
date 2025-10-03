import { assertEquals } from "@std/assert"
import fc from "fast-check"

import parseIdentifier from "./index.ts"

Deno.test("parseIdentifier - parses simple identifier", () => {
	const result = parseIdentifier("abc")(0)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		const [token, consumed] = result.value

		assertEquals(token.type, "identifier")
		assertEquals(token.value, "abc")
		assertEquals(token.position, 0)
		assertEquals(consumed, 3)
	}
})

Deno.test("parseIdentifier - maps Greek letter name to symbol", () => {
	const result = parseIdentifier("alpha")(0)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		const [token, consumed] = result.value

		assertEquals(token.type, "identifier")
		assertEquals(token.value, "α")
		assertEquals(consumed, 5)
	}
})

Deno.test("parseIdentifier - maps uppercase Greek letter", () => {
	const result = parseIdentifier("Alpha")(0)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		const [token, consumed] = result.value

		assertEquals(token.type, "identifier")
		assertEquals(token.value, "Α")
		assertEquals(consumed, 5)
	}
})

Deno.test("parseIdentifier - maps PI constant", () => {
	const result = parseIdentifier("PI")(0)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		const [token, consumed] = result.value

		assertEquals(token.type, "identifier")
		assertEquals(token.value, "π")
		assertEquals(consumed, 2)
	}
})

Deno.test("parseIdentifier - maps lowercase pi constant", () => {
	const result = parseIdentifier("pi")(0)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		const [token, consumed] = result.value

		assertEquals(token.type, "identifier")
		assertEquals(token.value, "π")
		assertEquals(consumed, 2)
	}
})

Deno.test("parseIdentifier - preserves function names", () => {
	const result = parseIdentifier("sin")(0)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		const [token, consumed] = result.value

		assertEquals(token.type, "identifier")
		assertEquals(token.value, "sin")
		assertEquals(consumed, 3)
	}
})

Deno.test("parseIdentifier - stops at non-alpha character", () => {
	const result = parseIdentifier("abc123")(0)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		const [token, consumed] = result.value

		assertEquals(token.value, "abc")
		assertEquals(consumed, 3)
	}
})

Deno.test("parseIdentifier - parses at non-zero position", () => {
	const result = parseIdentifier("1 + xyz")(4)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		const [token, consumed] = result.value

		assertEquals(token.value, "xyz")
		assertEquals(token.position, 4)
		assertEquals(consumed, 3)
	}
})

Deno.test("parseIdentifier - returns error when no identifier at position", () => {
	const result = parseIdentifier("123")(0)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.includes("Expected identifier"), true)
	}
})

Deno.test("parseIdentifier - handles mixed case identifiers", () => {
	const result = parseIdentifier("myVar")(0)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		const [token, consumed] = result.value

		assertEquals(token.value, "myVar")
		assertEquals(consumed, 5)
	}
})

Deno.test("parseIdentifier - curried application works", () => {
	const withInput = parseIdentifier("beta")
	const result = withInput(0)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		const [token] = result.value

		assertEquals(token.value, "β")
	}
})

Deno.test("parseIdentifier - property: deterministic", () => {
	fc.assert(
		fc.property(
			fc.stringMatching(/^[a-zA-Z]+$/),
			(str: string) => {
				if (str.length === 0) return true

				const result1 = parseIdentifier(str)(0)
				const result2 = parseIdentifier(str)(0)

				if (result1._tag === "Ok" && result2._tag === "Ok") {
					return result1.value[0].value === result2.value[0].value
				}
				return result1._tag === result2._tag
			},
		),
	)
})
