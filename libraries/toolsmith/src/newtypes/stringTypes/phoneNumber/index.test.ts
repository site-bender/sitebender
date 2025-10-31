import { assertEquals } from "@std/assert"

import phoneNumber from "@sitebender/toolsmith/newtypes/stringTypes/phoneNumber/index.ts"

Deno.test("phoneNumber returns Ok for valid E.164 format", function returnsOkForValidE164() {
	const result1 = phoneNumber("+1234567890")
	assertEquals(result1._tag, "Ok")

	const result2 = phoneNumber("+441234567890")
	assertEquals(result2._tag, "Ok")

	const result3 = phoneNumber("+861234567890")
	assertEquals(result3._tag, "Ok")
})

Deno.test("phoneNumber returns Error for invalid E.164 format", function returnsErrorForInvalid() {
	const result1 = phoneNumber("1234567890") // Missing +
	assertEquals(result1._tag, "Error")
	if (result1._tag === "Error") {
		assertEquals(result1.error.code, "PHONE_NUMBER_INVALID")
		assertEquals(result1.error.field, "phoneNumber")
		assertEquals(result1.error.severity, "requirement")
	}

	const result2 = phoneNumber("+123") // Too short (only 3 digits after +, need at least 5)
	assertEquals(result2._tag, "Error")

	const result3 = phoneNumber("+12345678901234567890") // Too long (19 digits after +, max is 17)
	assertEquals(result3._tag, "Error")

	const result4 = phoneNumber("invalid")
	assertEquals(result4._tag, "Error")

	const result5 = phoneNumber("+0123456789") // Starts with 0 (not allowed)
	assertEquals(result5._tag, "Error")
})
