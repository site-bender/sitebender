import { assertEquals } from "@std/assert"

import _validateEnumeratedAttribute from "./index.ts"

Deno.test(
	"_validateEnumeratedAttribute",
	async function _validateEnumeratedAttributeTests(t) {
		await t.step(
			"returns empty object when attribute absent",
			function returnsEmptyWhenAbsent() {
				const validateDir = _validateEnumeratedAttribute("dir")
				const result = validateDir({})

				assertEquals(result, {})
			},
		)

		await t.step(
			"accepts valid enumerated value",
			function acceptsValidValue() {
				const validateDir = _validateEnumeratedAttribute("dir")
				const result = validateDir({ dir: "ltr" })

				assertEquals(result, { dir: "ltr" })
			},
		)

		await t.step(
			"validates all values in enumeration",
			function validatesAllValues() {
				const validateDir = _validateEnumeratedAttribute("dir")

				assertEquals(validateDir({ dir: "ltr" }), { dir: "ltr" })
				assertEquals(validateDir({ dir: "rtl" }), { dir: "rtl" })
				assertEquals(validateDir({ dir: "auto" }), { dir: "auto" })
			},
		)

		await t.step(
			"returns data-§-bad-* for invalid enumerated value",
			function returnsBadForInvalid() {
				const validateDir = _validateEnumeratedAttribute("dir")
				const result = validateDir({ dir: "invalid" })

				assertEquals(result, { "data-§-bad-dir": "invalid" })
			},
		)

		await t.step(
			"returns data-§-bad-* for non-string values",
			function returnsBadForNonString() {
				const validateDir = _validateEnumeratedAttribute("dir")

				assertEquals(validateDir({ dir: 123 }), { "data-§-bad-dir": "123" })
				assertEquals(validateDir({ dir: true }), { "data-§-bad-dir": "true" })
				assertEquals(validateDir({ dir: null }), { "data-§-bad-dir": "null" })
				assertEquals(validateDir({ dir: { foo: "bar" } }), {
					"data-§-bad-dir": "[object Object]",
				})
				assertEquals(validateDir({ dir: ["ltr"] }), { "data-§-bad-dir": "ltr" })
			},
		)

		await t.step(
			"works with different attribute names and enumerations",
			function worksWithDifferentAttributes() {
				const validateDraggable = _validateEnumeratedAttribute("draggable")
				const validatePopover = _validateEnumeratedAttribute("popover")

				assertEquals(validateDraggable({ draggable: "true" }), {
					draggable: "true",
				})
				assertEquals(validatePopover({ popover: "auto" }), { popover: "auto" })
				assertEquals(validatePopover({ popover: "" }), { popover: "" })
			},
		)

		await t.step(
			"returns data-§-bad-* for value not in enumeration",
			function returnsBadForNotInEnum() {
				const validateDraggable = _validateEnumeratedAttribute("draggable")

				assertEquals(validateDraggable({ draggable: "maybe" }), {
					"data-§-bad-draggable": "maybe",
				})
				assertEquals(validateDraggable({ draggable: "1" }), {
					"data-§-bad-draggable": "1",
				})
			},
		)
	},
)
