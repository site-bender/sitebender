import { assertEquals } from "@std/assert"
import _validateIriScheme from "./index.ts"

Deno.test("_validateIriScheme validates correct schemes", async function (t) {
	await t.step("accepts http", function () {
		const result = _validateIriScheme("http")
		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value, "http")
		}
	})

	await t.step("accepts https", function () {
		const result = _validateIriScheme("https")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts ftp", function () {
		const result = _validateIriScheme("ftp")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts mailto", function () {
		const result = _validateIriScheme("mailto")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts urn", function () {
		const result = _validateIriScheme("urn")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts file", function () {
		const result = _validateIriScheme("file")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts data", function () {
		const result = _validateIriScheme("data")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts tel", function () {
		const result = _validateIriScheme("tel")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts ssh", function () {
		const result = _validateIriScheme("ssh")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts git", function () {
		const result = _validateIriScheme("git")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts scheme with plus", function () {
		const result = _validateIriScheme("git+ssh")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts scheme with dot", function () {
		const result = _validateIriScheme("vnd.example")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts scheme with hyphen", function () {
		const result = _validateIriScheme("my-scheme")
		assertEquals(result._tag, "Ok")
	})

	await t.step("accepts scheme with numbers", function () {
		const result = _validateIriScheme("h2")
		assertEquals(result._tag, "Ok")
	})
})

Deno.test("_validateIriScheme rejects invalid schemes", async function (t) {
	await t.step("rejects empty string", function () {
		const result = _validateIriScheme("")
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.code, "IRI_SCHEME_EMPTY")
		}
	})

	await t.step("rejects scheme starting with digit", function () {
		const result = _validateIriScheme("123scheme")
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.code, "IRI_SCHEME_INVALID_FORMAT")
		}
	})

	await t.step("rejects scheme with underscore", function () {
		const result = _validateIriScheme("my_scheme")
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.code, "IRI_SCHEME_INVALID_FORMAT")
		}
	})

	await t.step("rejects scheme with Unicode", function () {
		const result = _validateIriScheme("café")
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.code, "IRI_SCHEME_CONTAINS_UNICODE")
		}
	})

	await t.step("rejects scheme that is too long", function () {
		const result = _validateIriScheme("a".repeat(65))
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.code, "IRI_SCHEME_TOO_LONG")
		}
	})

	await t.step("accepts scheme at maximum length", function () {
		const result = _validateIriScheme("a" + "b".repeat(63))
		assertEquals(result._tag, "Ok")
	})
})
