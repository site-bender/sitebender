import { assert, assertEquals } from "@std/assert"

import isError from "@sitebender/toolsmith/monads/result/isError/index.ts"
import isOk from "@sitebender/toolsmith/monads/result/isOk/index.ts"

import integer from "./index.ts"

Deno.test("integer accepts safe integers", () => {
	const result = integer(42)

	if (isOk(result)) {
		assertEquals(result.value, 42)
	} else {
		throw new Error("Expected Ok result")
	}
})

Deno.test("integer accepts zero", () => {
	const result = integer(0)

	if (isOk(result)) {
		assertEquals(result.value, 0)
	} else {
		throw new Error("Expected Ok result")
	}
})

Deno.test("integer accepts negative integers", () => {
	const result = integer(-100)

	if (isOk(result)) {
		assertEquals(result.value, -100)
	} else {
		throw new Error("Expected Ok result")
	}
})

Deno.test("integer accepts MAX_SAFE_INTEGER", () => {
	const result = integer(9007199254740991)

	if (isOk(result)) {
		assertEquals(result.value, 9007199254740991)
	} else {
		throw new Error("Expected Ok result")
	}
})

Deno.test("integer accepts MIN_SAFE_INTEGER", () => {
	const result = integer(-9007199254740991)

	if (isOk(result)) {
		assertEquals(result.value, -9007199254740991)
	} else {
		throw new Error("Expected Ok result")
	}
})

Deno.test("integer rejects decimals with helpful error", () => {
	const result = integer(3.14)

	if (isError(result)) {
		assertEquals(result.error.code, "INTEGER_NOT_SAFE")
		assertEquals(result.error.field, "integer")
		assertEquals(result.error.received, 3.14)
		assertEquals(result.error.expected, "Safe integer")
		assert(result.error.suggestion.includes("whole number"))
		assertEquals(result.error.severity, "requirement")
	} else {
		throw new Error("Expected Error result")
	}
})

Deno.test("integer rejects unsafe integers with helpful error", () => {
	const result = integer(9007199254740992)

	if (isError(result)) {
		assertEquals(result.error.code, "INTEGER_NOT_SAFE")
		assertEquals(result.error.field, "integer")
		assertEquals(result.error.received, 9007199254740992)
		assertEquals(result.error.expected, "Safe integer")
		assert(result.error.suggestion.includes("-9,007,199,254,740,991"))
		assert(result.error.suggestion.includes("9,007,199,254,740,991"))
		assertEquals(result.error.severity, "requirement")
	} else {
		throw new Error("Expected Error result")
	}
})

Deno.test("integer rejects Infinity with helpful error", () => {
	const result = integer(Infinity)

	if (isError(result)) {
		assertEquals(result.error.code, "INTEGER_NOT_SAFE")
		assertEquals(result.error.field, "integer")
		assertEquals(result.error.received, Infinity)
	} else {
		throw new Error("Expected Error result")
	}
})

Deno.test("integer rejects NaN with helpful error", () => {
	const result = integer(NaN)

	if (isError(result)) {
		assertEquals(result.error.code, "INTEGER_NOT_SAFE")
		assertEquals(result.error.field, "integer")
	} else {
		throw new Error("Expected Error result")
	}
})

Deno.test("integer error includes constraints", () => {
	const result = integer(3.14)

	if (isError(result)) {
		assertEquals(result.error.constraints?.min, -9007199254740991)
		assertEquals(result.error.constraints?.max, 9007199254740991)
	} else {
		throw new Error("Expected Error result")
	}
})
