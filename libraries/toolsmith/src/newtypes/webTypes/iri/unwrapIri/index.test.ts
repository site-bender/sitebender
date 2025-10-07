import { assertEquals, assertThrows } from "@std/assert"
import unwrapIri from "./index.ts"
import unsafeIri from "@sitebender/toolsmith/newtypes/webTypes/iri/unsafeIri/index.ts"

Deno.test("unwrapIri extracts string from Iri", async function (t) {
	await t.step("unwraps branded Iri", function () {
		const iri = unsafeIri("http://example.com")
		const result = unwrapIri(iri)
		assertEquals(result, "http://example.com")
		assertEquals(typeof result, "string")
	})

	await t.step("unwraps Unicode IRI", function () {
		const iri = unsafeIri("http://例え.jp/パス")
		const result = unwrapIri(iri)
		assertEquals(result, "http://例え.jp/パス")
	})

	await t.step("unwraps empty IRI", function () {
		const iri = unsafeIri("")
		const result = unwrapIri(iri)
		assertEquals(result, "")
	})
})

Deno.test("unwrapIri throws for non-Iri values", async function (t) {
	await t.step("throws for number", function () {
		assertThrows(
			function () {
				unwrapIri(123 as never)
			},
			TypeError,
			"Expected Iri but received non-string value",
		)
	})

	await t.step("throws for object", function () {
		assertThrows(
			function () {
				unwrapIri({} as never)
			},
			TypeError,
			"Expected Iri but received non-string value",
		)
	})
})
