import { assertEquals } from "@std/assert"

import InputMonth from "../../../../../../../constructors/elements/flow/interactive/Input/InputMonth/index.ts"

Deno.test("InputMonth constructor", async (t) => {
	await t.step("should create an input element with type='month'", () => {
		const result = InputMonth({})
		assertEquals(result.tag, "input")
		assertEquals(result.attributes.type, "month")
		assertEquals(result.children, [])
	})

	await t.step("should accept form attributes", () => {
		const attributes = {
			form: "monthForm",
			name: "reportMonth",
			autocomplete: "off",
			required: true,
		}
		const result = InputMonth(attributes)
		assertEquals((result.attributes as any).form, "monthForm")
		assertEquals((result.attributes as any).name, "reportMonth")
		assertEquals((result.attributes as any).autocomplete, "off")
		assertEquals((result.attributes as any).required, true)
	})

	await t.step("should accept month input attributes", () => {
		const attributes = {
			min: "2023-01",
			max: "2024-12",
			step: "1",
			readonly: false,
		}
		const result = InputMonth(attributes)
		assertEquals((result.attributes as any).min, "2023-01")
		assertEquals((result.attributes as any).max, "2024-12")
		assertEquals((result.attributes as any).step, "1")
		assertEquals((result.attributes as any).readonly, false)
	})

	await t.step("should accept global attributes", () => {
		const attributes = {
			id: "month-input",
			class: "form-control month-picker",
			tabindex: "0",
		}
		const result = InputMonth(attributes)
		assertEquals((result.attributes as any).id, "month-input")
		assertEquals((result.attributes as any).class, "form-control month-picker")
		assertEquals((result.attributes as any).tabindex, "0")
	})

	await t.step("should filter out invalid attributes", () => {
		const attributes = {
			name: "reportMonth",
			invalidattr: "should be removed",
			checked: true, // invalid for month input
			minlength: 5, // invalid for month input
			maxlength: 10, // invalid for month input
			placeholder: "not valid", // invalid for month input
		} as any
		const result = InputMonth(attributes)
		assertEquals((result.attributes as any).name, "reportMonth")
		assertEquals((result.attributes as any).invalidattr, undefined)
		assertEquals((result.attributes as any).checked, undefined)
		assertEquals((result.attributes as any).minlength, undefined)
		assertEquals((result.attributes as any).maxlength, undefined)
		assertEquals((result.attributes as any).placeholder, undefined)
	})

	await t.step("should handle value attribute", () => {
		const attributes = { value: "2023-12" }
		const result = InputMonth(attributes)
		assertEquals((result.attributes as any).value, "2023-12")
	})

	await t.step("should handle list attribute for datalist", () => {
		const attributes = { list: "month-suggestions" }
		const result = InputMonth(attributes)
		assertEquals((result.attributes as any).list, "month-suggestions")
	})

	await t.step(
		"should maintain type='month' even if type attribute provided",
		() => {
			const attributes = { type: "text" } as any
			const result = InputMonth(attributes)
			assertEquals(result.attributes.type, "month")
		},
	)

	await t.step("should handle special properties", () => {
		const attributes = {
			name: "reportMonth",
			calculation: "monthCalc",
			dataset: { validation: "month" },
			display: "block",
			scripts: ["month-validator.js"],
			stylesheets: ["month.css"],
		}
		const result = InputMonth(attributes)
		assertEquals((result as any).calculation, "monthCalc")
		assertEquals((result as any).dataset, { validation: "month" })
		assertEquals((result as any).display, "block")
		assertEquals((result as any).scripts, ["month-validator.js"])
		assertEquals((result as any).stylesheets, ["month.css"])
	})
})
