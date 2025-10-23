import { assertEquals } from "@std/assert"
import isIri from "./index.ts"
import unsafeIri from "../../newtypes/webTypes/iri/unsafeIri/index.ts"

Deno.test("_isIri returns true for string values", async function (t) {
	await t.step("returns true for branded Iri", function () {
		const iri = unsafeIri("http://example.com")
		assertEquals(isIri(iri), true)
	})

	await t.step("returns true for plain string", function () {
		assertEquals(isIri("http://example.com"), true)
	})

	await t.step("returns true for empty string", function () {
		assertEquals(isIri(""), true)
	})

	await t.step("returns true for Unicode string", function () {
		assertEquals(isIri("http://例え.jp/パス"), true)
	})
})

Deno.test("_isIri returns false for non-string values", async function (t) {
	await t.step("returns false for number", function () {
		assertEquals(isIri(123), false)
	})

	await t.step("returns false for boolean", function () {
		assertEquals(isIri(true), false)
	})

	await t.step("returns false for null", function () {
		assertEquals(isIri(null), false)
	})

	await t.step("returns false for undefined", function () {
		assertEquals(isIri(undefined), false)
	})

	await t.step("returns false for object", function () {
		assertEquals(isIri({}), false)
	})

	await t.step("returns false for array", function () {
		assertEquals(isIri([]), false)
	})
})
