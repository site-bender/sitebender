import { assertEquals } from "@std/assert"
import * as fc from "https://esm.sh/fast-check@4.1.1"

import zipCode from "@sitebender/toolsmith/newtypes/stringTypes/zipCode/index.ts"

Deno.test("zipCode returns Ok for valid 5-digit ZIP codes", function returnsOkForValid5Digit() {
	const result1 = zipCode("90210")
	assertEquals(result1._tag, "Ok")
	if (result1._tag === "Ok") {
		assertEquals(result1.value, "90210" as any)
	}

	const result2 = zipCode("10001")
	assertEquals(result2._tag, "Ok")

	const result3 = zipCode("60601")
	assertEquals(result3._tag, "Ok")
})

Deno.test("zipCode returns Ok for valid 9-digit ZIP codes", function returnsOkForValid9Digit() {
	const result1 = zipCode("902101234")
	assertEquals(result1._tag, "Ok")
	if (result1._tag === "Ok") {
		assertEquals(result1.value, "902101234" as any)
	}

	const result2 = zipCode("100011234")
	assertEquals(result2._tag, "Ok")
})

Deno.test("zipCode returns Ok for valid ZIP+4 format", function returnsOkForValidZipPlus4() {
	const result1 = zipCode("90210-1234")
	assertEquals(result1._tag, "Ok")
	if (result1._tag === "Ok") {
		assertEquals(result1.value, "90210-1234" as any)
	}

	const result2 = zipCode("10001-5678")
	assertEquals(result2._tag, "Ok")
})

Deno.test("zipCode returns Error for invalid ZIP codes", function returnsErrorForInvalid() {
	const result1 = zipCode("invalid")
	assertEquals(result1._tag, "Error")
	if (result1._tag === "Error") {
		assertEquals(result1.error.code, "ZIP_CODE_INVALID")
		assertEquals(result1.error.field, "zipCode")
		assertEquals(result1.error.severity, "requirement")
	}

	const result2 = zipCode("123")
	assertEquals(result2._tag, "Error")

	const result3 = zipCode("12345678901")
	assertEquals(result3._tag, "Error")
})

Deno.test("zipCode - property: valid 5-digit ZIPs return Ok", function validFiveDigitReturnsOk() {
	fc.assert(
		fc.property(
			fc.integer({ min: 10000, max: 99999 }),
			function propertyValidFiveDigit(num) {
				const result = zipCode(num.toString())
				assertEquals(result._tag, "Ok")
			},
		),
	)
})

Deno.test("zipCode - property: invalid formats return Error", function invalidFormatsReturnError() {
	fc.assert(
		fc.property(
			fc.string().filter(function isInvalidZip(s) {
				return ![5, 9, 10].includes(s.length) || !/^\d{5}(-\d{4})?$/.test(s)
			}),
			function propertyInvalidFormats(value) {
				const result = zipCode(value)
				assertEquals(result._tag, "Error")
			},
		),
	)
})
