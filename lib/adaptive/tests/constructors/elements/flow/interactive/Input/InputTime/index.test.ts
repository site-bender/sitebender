import { assertEquals } from "@std/assert"

import InputTime from "../../../../../../../constructors/elements/flow/interactive/Input/InputTime/index.ts"

Deno.test("InputTime constructor", async (t) => {
	await t.step("should create an input element with type='time'", () => {
		const result = InputTime({})
		assertEquals(result.tag, "input")
		assertEquals(result.attributes.type, "time")
		assertEquals(result.children, [])
	})

	await t.step("should accept form attributes", () => {
		const attributes = {
			form: "timeForm",
			name: "appointment",
			autocomplete: "off",
			required: true,
		}
		const result = InputTime(attributes)
		assertEquals((result.attributes as any).form, "timeForm")
		assertEquals((result.attributes as any).name, "appointment")
		assertEquals((result.attributes as any).autocomplete, "off")
		assertEquals((result.attributes as any).required, true)
	})

	await t.step("should accept time input attributes", () => {
		const attributes = {
			min: "09:00",
			max: "17:00",
			step: "300", // 5 minutes
			readonly: false,
		}
		const result = InputTime(attributes)
		assertEquals((result.attributes as any).min, "09:00")
		assertEquals((result.attributes as any).max, "17:00")
		assertEquals((result.attributes as any).step, "300")
		assertEquals((result.attributes as any).readonly, false)
	})

	await t.step("should accept global attributes", () => {
		const attributes = {
			id: "time-input",
			class: "form-control time-picker",
			tabindex: "0",
		}
		const result = InputTime(attributes)
		assertEquals((result.attributes as any).id, "time-input")
		assertEquals((result.attributes as any).class, "form-control time-picker")
		assertEquals((result.attributes as any).tabindex, "0")
	})

	await t.step("should filter out invalid attributes", () => {
		const attributes = {
			name: "appointment",
			invalidattr: "should be removed",
			checked: true, // invalid for time input
			minlength: 5, // invalid for time input
			maxlength: 10, // invalid for time input
			placeholder: "not valid", // invalid for time input
		} as any
		const result = InputTime(attributes)
		assertEquals((result.attributes as any).name, "appointment")
		assertEquals((result.attributes as any).invalidattr, undefined)
		assertEquals((result.attributes as any).checked, undefined)
		assertEquals((result.attributes as any).minlength, undefined)
		assertEquals((result.attributes as any).maxlength, undefined)
		assertEquals((result.attributes as any).placeholder, undefined)
	})

	await t.step("should handle value attribute", () => {
		const attributes = { value: "14:30" }
		const result = InputTime(attributes)
		assertEquals((result.attributes as any).value, "14:30")
	})

	await t.step("should handle list attribute for datalist", () => {
		const attributes = { list: "time-suggestions" }
		const result = InputTime(attributes)
		assertEquals((result.attributes as any).list, "time-suggestions")
	})

	await t.step(
		"should maintain type='time' even if type attribute provided",
		() => {
			const attributes = { type: "text" } as any
			const result = InputTime(attributes)
			assertEquals(result.attributes.type, "time")
		},
	)

	await t.step("should handle special properties", () => {
		const attributes = {
			name: "appointment",
			calculation: "timeCalc",
			dataset: { validation: "time" },
			display: "block",
			scripts: ["time-validator.js"],
			stylesheets: ["time.css"],
		}
		const result = InputTime(attributes)
		assertEquals((result as any).calculation, "timeCalc")
		assertEquals((result as any).dataset, { validation: "time" })
		assertEquals((result as any).display, "block")
		assertEquals((result as any).scripts, ["time-validator.js"])
		assertEquals((result as any).stylesheets, ["time.css"])
	})
})
