import { assertEquals } from "@std/assert"

import InputDateTimeLocal from "../../../../../../../constructors/elements/flow/interactive/Input/InputDateTimeLocal/index.ts"

Deno.test("InputDateTimeLocal constructor", async (t) => {
	await t.step(
		"should create an input element with type='datetime-local'",
		() => {
			const result = InputDateTimeLocal({})
			assertEquals(result.tag, "input")
			assertEquals(result.attributes.type, "datetime-local")
			assertEquals(result.children, [])
		},
	)

	await t.step("should accept form attributes", () => {
		const attributes = {
			form: "eventForm",
			name: "eventDateTime",
			autocomplete: "off",
			required: true,
		}
		const result = InputDateTimeLocal(attributes)
		assertEquals((result.attributes as any).form, "eventForm")
		assertEquals((result.attributes as any).name, "eventDateTime")
		assertEquals((result.attributes as any).autocomplete, "off")
		assertEquals((result.attributes as any).required, true)
	})

	await t.step("should accept datetime input attributes", () => {
		const attributes = {
			min: "2023-01-01T09:00",
			max: "2024-12-31T17:00",
			step: "60",
			readonly: false,
		}
		const result = InputDateTimeLocal(attributes)
		assertEquals((result.attributes as any).min, "2023-01-01T09:00")
		assertEquals((result.attributes as any).max, "2024-12-31T17:00")
		assertEquals((result.attributes as any).step, "60")
		assertEquals((result.attributes as any).readonly, false)
	})

	await t.step("should accept global attributes", () => {
		const attributes = {
			id: "datetime-input",
			class: "form-control datetime-picker",
			tabindex: "0",
		}
		const result = InputDateTimeLocal(attributes)
		assertEquals((result.attributes as any).id, "datetime-input")
		assertEquals(
			(result.attributes as any).class,
			"form-control datetime-picker",
		)
		assertEquals((result.attributes as any).tabindex, "0")
	})

	await t.step("should filter out invalid attributes", () => {
		const attributes = {
			name: "eventDateTime",
			invalidattr: "should be removed",
			checked: true, // invalid for datetime input
			minlength: 5, // invalid for datetime input
			maxlength: 10, // invalid for datetime input
			placeholder: "not valid", // invalid for datetime input
		} as any
		const result = InputDateTimeLocal(attributes)
		assertEquals((result.attributes as any).name, "eventDateTime")
		assertEquals((result.attributes as any).invalidattr, undefined)
		assertEquals((result.attributes as any).checked, undefined)
		assertEquals((result.attributes as any).minlength, undefined)
		assertEquals((result.attributes as any).maxlength, undefined)
		assertEquals((result.attributes as any).placeholder, undefined)
	})

	await t.step("should handle value attribute", () => {
		const attributes = { value: "2023-12-25T14:30" }
		const result = InputDateTimeLocal(attributes)
		assertEquals((result.attributes as any).value, "2023-12-25T14:30")
	})

	await t.step("should handle list attribute for datalist", () => {
		const attributes = { list: "datetime-suggestions" }
		const result = InputDateTimeLocal(attributes)
		assertEquals((result.attributes as any).list, "datetime-suggestions")
	})

	await t.step(
		"should maintain type='datetime-local' even if type attribute provided",
		() => {
			const attributes = { type: "text" } as any
			const result = InputDateTimeLocal(attributes)
			assertEquals(result.attributes.type, "datetime-local")
		},
	)

	await t.step("should handle special properties", () => {
		const attributes = {
			name: "eventDateTime",
			calculation: "datetimeCalc",
			dataset: { validation: "datetime" },
			display: "block",
			scripts: ["datetime-validator.js"],
			stylesheets: ["datetime.css"],
		}
		const result = InputDateTimeLocal(attributes)
		assertEquals((result as any).calculation, "datetimeCalc")
		assertEquals((result as any).dataset, { validation: "datetime" })
		assertEquals((result as any).display, "block")
		assertEquals((result as any).scripts, ["datetime-validator.js"])
		assertEquals((result as any).stylesheets, ["datetime.css"])
	})
})
