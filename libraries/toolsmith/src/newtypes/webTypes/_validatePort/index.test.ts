import { assertEquals } from "@std/assert"
import _validatePort from "./index.ts"

Deno.test("_validatePort: accepts empty port (no port specified)", function () {
	const result = _validatePort("")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "")
	}
})

Deno.test("_validatePort: accepts valid port 80", function () {
	const result = _validatePort("80")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "80")
	}
})

Deno.test("_validatePort: accepts valid port 443", function () {
	const result = _validatePort("443")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validatePort: accepts valid port 8080", function () {
	const result = _validatePort("8080")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validatePort: accepts valid port 3000", function () {
	const result = _validatePort("3000")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validatePort: accepts minimum port 1", function () {
	const result = _validatePort("1")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validatePort: accepts maximum port 65535", function () {
	const result = _validatePort("65535")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validatePort: rejects port 0", function () {
	const result = _validatePort("0")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_PORT_OUT_OF_RANGE")
	}
})

Deno.test("_validatePort: rejects port above maximum", function () {
	const result = _validatePort("65536")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_PORT_OUT_OF_RANGE")
	}
})

Deno.test("_validatePort: rejects negative port", function () {
	const result = _validatePort("-1")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_INVALID_PORT_FORMAT")
	}
})

Deno.test("_validatePort: rejects port with letters", function () {
	const result = _validatePort("80a")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_INVALID_PORT_FORMAT")
	}
})

Deno.test("_validatePort: rejects port with special characters", function () {
	const result = _validatePort("80!")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_INVALID_PORT_FORMAT")
	}
})

Deno.test("_validatePort: rejects port with spaces", function () {
	const result = _validatePort("80 ")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_INVALID_PORT_FORMAT")
	}
})

Deno.test("_validatePort: rejects port with leading zeros", function () {
	const result = _validatePort("0080")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_PORT_LEADING_ZERO")
	}
})

Deno.test("_validatePort: rejects port 00", function () {
	const result = _validatePort("00")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_PORT_LEADING_ZERO")
	}
})

Deno.test("_validatePort: rejects very large port number", function () {
	const result = _validatePort("999999")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_PORT_OUT_OF_RANGE")
	}
})

Deno.test("_validatePort: rejects decimal port", function () {
	const result = _validatePort("80.5")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_INVALID_PORT_FORMAT")
	}
})
