import { assertEquals } from "@std/assert"
import unwrapIri from "./index.ts"
import unsafeIri from "@sitebender/toolsmith/newtypes/webTypes/iri/unsafeIri/index.ts"

Deno.test("unwrapIri extracts string from Iri", async function (t) {
	await t.step("unwraps branded Iri", function () {
		const iri = unsafeIri("http://example.com")
		const result = unwrapIri(iri)
		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value, "http://example.com")
			assertEquals(typeof result.value, "string")
		}
	})

	await t.step("unwraps Unicode IRI", function () {
		const iri = unsafeIri("http://例え.jp/パス")
		const result = unwrapIri(iri)
		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value, "http://例え.jp/パス")
		}
	})

	await t.step("unwraps empty IRI", function () {
		const iri = unsafeIri("")
		const result = unwrapIri(iri)
		assertEquals(result._tag, "Ok")
		if (result._tag === "Ok") {
			assertEquals(result.value, "")
		}
	})
})

Deno.test("unwrapIri returns Error for non-Iri values", async function (t) {
	await t.step("returns Error for number", function () {
		const result = unwrapIri(123 as never)
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.code, "UNWRAP_IRI_INVALID_TYPE")
			assertEquals(result.error.field, "iri")
		}
	})

	await t.step("returns Error for object", function () {
		const result = unwrapIri({} as never)
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.code, "UNWRAP_IRI_INVALID_TYPE")
			assertEquals(result.error.field, "iri")
		}
	})
})
