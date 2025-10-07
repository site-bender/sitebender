import { assertEquals } from "@std/assert"
import unsafeIri from "./index.ts"
import type { Iri } from "@sitebender/toolsmith/types/branded/index.ts"

Deno.test("unsafeIri brands string as Iri without validation", async function (t) {
	await t.step("brands valid IRI", function () {
		const result = unsafeIri("http://example.com")
		assertEquals(typeof result, "string")
		assertEquals(result, "http://example.com")
	})

	await t.step("brands Unicode IRI", function () {
		const result = unsafeIri("http://例え.jp/パス")
		assertEquals(result, "http://例え.jp/パス")
	})

	await t.step("brands invalid IRI without checking", function () {
		const result = unsafeIri("not a valid iri")
		assertEquals(result, "not a valid iri")
	})

	await t.step("brands empty string", function () {
		const result = unsafeIri("")
		assertEquals(result, "")
	})

	await t.step("returns branded type", function () {
		const result: Iri = unsafeIri("http://example.com")
		assertEquals(typeof result, "string")
	})
})
