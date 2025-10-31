import { assertEquals } from "@std/assert"

import postalCode from "@sitebender/toolsmith/newtypes/stringTypes/postalCode/index.ts"

Deno.test("postalCode returns Ok for valid international postal codes", function returnsOkForValid() {
	// UK
	const result1 = postalCode("SW1A 1AA")
	assertEquals(result1._tag, "Ok")

	// Canada
	const result2 = postalCode("K1A 0B1")
	assertEquals(result2._tag, "Ok")

	// Germany
	const result3 = postalCode("10115")
	assertEquals(result3._tag, "Ok")

	// Japan
	const result4 = postalCode("100-0001")
	assertEquals(result4._tag, "Ok")

	// US
	const result5 = postalCode("90210")
	assertEquals(result5._tag, "Ok")
})

Deno.test("postalCode returns Error for too short codes", function returnsErrorForTooShort() {
	const result1 = postalCode("12")
	assertEquals(result1._tag, "Error")
	if (result1._tag === "Error") {
		assertEquals(result1.error.code, "POSTAL_CODE_TOO_SHORT")
		assertEquals(result1.error.field, "postalCode")
		assertEquals(result1.error.severity, "requirement")
	}

	const result2 = postalCode("")
	assertEquals(result2._tag, "Error")
})

Deno.test("postalCode returns Error for too long codes", function returnsErrorForTooLong() {
	const result = postalCode("12345678901")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result._tag, "Error")
	}

	const result2 = postalCode("123456789012")
	assertEquals(result2._tag, "Error")
})

Deno.test("postalCode returns Error for invalid characters", function returnsErrorForInvalidChars() {
	const result1 = postalCode("SW1A@1AA")
	assertEquals(result1._tag, "Error")
	if (result1._tag === "Error") {
		assertEquals(result1.error.code, "POSTAL_CODE_INVALID_CHARACTERS")
	}

	const result2 = postalCode("K1A.0B1")
	assertEquals(result2._tag, "Error")
})

Deno.test("postalCode handles trimming", function handlesTrimming() {
	const result = postalCode("  SW1A 1AA  ")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "SW1A 1AA" as any)
	}
})
