import { assertEquals } from "@std/assert"

import _validateAutocapitalize from "./index.ts"

Deno.test(
	"_validateAutocapitalize",
	async function validateAutocapitalizeTests(t) {
		await t.step(
			"returns empty object when autocapitalize absent",
			function returnsEmptyWhenAbsent() {
				const result = _validateAutocapitalize({})

				assertEquals(result, {})
			},
		)

		await t.step(
			"returns valid autocapitalize value",
			function returnsValidValue() {
				const result = _validateAutocapitalize({ autocapitalize: "sentences" })

				assertEquals(result, { autocapitalize: "sentences" })
			},
		)

		await t.step("validates all valid values", function validatesAllValues() {
			const validValues = [
				"off",
				"none",
				"on",
				"sentences",
				"words",
				"characters",
			]

			validValues.forEach((value) => {
				const result = _validateAutocapitalize({ autocapitalize: value })
				assertEquals(result, { autocapitalize: value })
			})
		})

		await t.step(
			"returns empty object for invalid value",
			function returnsEmptyForInvalid() {
				const result = _validateAutocapitalize({ autocapitalize: "invalid" })

				assertEquals(result, {})
			},
		)

		await t.step(
			"returns empty object for non-string value",
			function returnsEmptyForNonString() {
				const result = _validateAutocapitalize({ autocapitalize: 123 })

				assertEquals(result, {})
			},
		)
	},
)
