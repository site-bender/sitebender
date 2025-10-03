import { assertEquals } from "@std/assert"
import fc from "fast-check"

import parseNumber from "./index.ts"

Deno.test("parseNumber - parses integer", () => {
	const result = parseNumber("123")(0)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		const [token, consumed] = result.value

		assertEquals(token.type, "number")
		assertEquals(token.value, "123")
		assertEquals(token.position, 0)
		assertEquals(consumed, 3)
	}
})

Deno.test("parseNumber - parses decimal", () => {
	const result = parseNumber("3.14")(0)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		const [token, consumed] = result.value

		assertEquals(token.type, "number")
		assertEquals(token.value, "3.14")
		assertEquals(token.position, 0)
		assertEquals(consumed, 4)
	}
})

Deno.test("parseNumber - parses number with leading plus", () => {
	const result = parseNumber("+42")(0)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		const [token, consumed] = result.value

		assertEquals(token.type, "number")
		assertEquals(token.value, "+42")
		assertEquals(token.position, 0)
		assertEquals(consumed, 3)
	}
})

Deno.test("parseNumber - parses number with leading minus", () => {
	const result = parseNumber("-99")(0)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		const [token, consumed] = result.value

		assertEquals(token.type, "number")
		assertEquals(token.value, "-99")
		assertEquals(token.position, 0)
		assertEquals(consumed, 3)
	}
})

Deno.test("parseNumber - parses decimal starting with dot", () => {
	const result = parseNumber(".5")(0)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		const [token, consumed] = result.value

		assertEquals(token.type, "number")
		assertEquals(token.value, ".5")
		assertEquals(token.position, 0)
		assertEquals(consumed, 2)
	}
})

Deno.test("parseNumber - parses at non-zero position", () => {
	const result = parseNumber("a + 42")(4)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		const [token, consumed] = result.value

		assertEquals(token.type, "number")
		assertEquals(token.value, "42")
		assertEquals(token.position, 4)
		assertEquals(consumed, 2)
	}
})

Deno.test("parseNumber - rejects multiple decimal points", () => {
	const result = parseNumber("3.14.159")(0)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.includes("multiple decimal points"), true)
	}
})

Deno.test("parseNumber - returns error when no number at position", () => {
	const result = parseNumber("abc")(0)

	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.includes("Expected number"), true)
	}
})

Deno.test("parseNumber - stops at non-numeric character", () => {
	const result = parseNumber("123abc")(0)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		const [token, consumed] = result.value

		assertEquals(token.value, "123")
		assertEquals(consumed, 3)
	}
})

Deno.test("parseNumber - curried application works", () => {
	const withInput = parseNumber("99")
	const result = withInput(0)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		const [token] = result.value

		assertEquals(token.value, "99")
	}
})

Deno.test("parseNumber - property: deterministic", () => {
	fc.assert(
		fc.property(
			fc.integer({ min: 0, max: 99999 }),
			(num: number) => {
				const str = String(num)
				const result1 = parseNumber(str)(0)
				const result2 = parseNumber(str)(0)

				if (result1._tag === "Ok" && result2._tag === "Ok") {
					return result1.value[0].value === result2.value[0].value
				}

				return result1._tag === result2._tag
			},
		),
	)
})

Deno.test("parseNumber - property: consumed matches value length", () => {
	fc.assert(
		fc.property(
			fc.float({ min: 0, max: 1000, noNaN: true, noDefaultInfinity: true }),
			(num: number) => {
				const str = String(num)
				const result = parseNumber(str)(0)

				if (result._tag === "Ok") {
					const [token, consumed] = result.value
					return consumed === token.value.length
				}

				return true
			},
		),
	)
})
