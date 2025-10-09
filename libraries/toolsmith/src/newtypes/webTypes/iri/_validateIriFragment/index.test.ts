import { assertEquals } from "@std/assert"
import _validateIriFragment from "./index.ts"

Deno.test(
	"_validateIriFragment validates correct fragments",
	async function (t) {
		await t.step("accepts empty fragment", function () {
			const result = _validateIriFragment("")
			assertEquals(result._tag, "Ok")
		})

		await t.step("accepts ASCII fragment", function () {
			const result = _validateIriFragment("section")
			assertEquals(result._tag, "Ok")
		})

		await t.step("accepts Unicode fragment with Russian", function () {
			const result = _validateIriFragment("фрагмент")
			assertEquals(result._tag, "Ok")
		})

		await t.step("accepts Unicode fragment with Japanese", function () {
			const result = _validateIriFragment("セクション")
			assertEquals(result._tag, "Ok")
		})

		await t.step("accepts Unicode fragment with Chinese", function () {
			const result = _validateIriFragment("部分")
			assertEquals(result._tag, "Ok")
		})

		await t.step("accepts Devanagari fragment", function () {
			const result = _validateIriFragment("खंड")
			assertEquals(result._tag, "Ok")
		})

		await t.step("accepts Arabic fragment", function () {
			const result = _validateIriFragment("قسم")
			assertEquals(result._tag, "Ok")
		})

		await t.step("accepts emoji in fragment", function () {
			const result = _validateIriFragment("🔗anchor")
			assertEquals(result._tag, "Ok")
		})
	},
)

Deno.test("_validateIriFragment rejects invalid fragments", async function (t) {
	await t.step("rejects null character", function () {
		const result = _validateIriFragment("section\x00")
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.code, "IRI_FRAGMENT_CONTAINS_CONTROL_CHARS")
		}
	})

	await t.step("rejects control character", function () {
		const result = _validateIriFragment("section\x1F")
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.code, "IRI_FRAGMENT_CONTAINS_CONTROL_CHARS")
		}
	})

	await t.step("rejects LRM bidi format char", function () {
		const result = _validateIriFragment("section\u200E")
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.code, "IRI_FRAGMENT_CONTAINS_BIDI_FORMAT_CHARS")
		}
	})

	await t.step("rejects bidi embedding char", function () {
		const result = _validateIriFragment("section\u202A")
		assertEquals(result._tag, "Error")
		if (result._tag === "Error") {
			assertEquals(result.error.code, "IRI_FRAGMENT_CONTAINS_BIDI_FORMAT_CHARS")
		}
	})
})
