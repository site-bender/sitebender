import { assertEquals } from "@std/assert"

import InputWeek from "../../../../../../../constructors/elements/flow/interactive/Input/InputWeek/index.ts"

Deno.test("InputWeek constructor", async (t) => {
	await t.step("should create an input element with type='week'", () => {
		const result = InputWeek({})
		assertEquals(result.tag, "input")
		assertEquals(result.attributes.type, "week")
		assertEquals(result.children, [])
	})

	await t.step("should accept form attributes", () => {
		const attributes = {
			form: "weekForm",
			name: "reportWeek",
			autocomplete: "off",
			required: true,
		}
		const result = InputWeek(attributes)
		assertEquals((result.attributes as any).form, "weekForm")
		assertEquals((result.attributes as any).name, "reportWeek")
		assertEquals((result.attributes as any).autocomplete, "off")
		assertEquals((result.attributes as any).required, true)
	})

	await t.step("should accept week input attributes", () => {
		const attributes = {
			min: "2023-W01",
			max: "2024-W52",
			step: "1",
			readonly: false,
		}
		const result = InputWeek(attributes)
		assertEquals((result.attributes as any).min, "2023-W01")
		assertEquals((result.attributes as any).max, "2024-W52")
		assertEquals((result.attributes as any).step, "1")
		assertEquals((result.attributes as any).readonly, false)
	})

	await t.step("should accept global attributes", () => {
		const attributes = {
			id: "week-input",
			class: "form-control week-picker",
			tabindex: "0",
		}
		const result = InputWeek(attributes)
		assertEquals((result.attributes as any).id, "week-input")
		assertEquals((result.attributes as any).class, "form-control week-picker")
		assertEquals((result.attributes as any).tabindex, "0")
	})

	await t.step("should filter out invalid attributes", () => {
		const attributes = {
			name: "reportWeek",
			invalidattr: "should be removed",
			checked: true, // invalid for week input
			minlength: 5, // invalid for week input
			maxlength: 10, // invalid for week input
			placeholder: "not valid", // invalid for week input
		} as any
		const result = InputWeek(attributes)
		assertEquals((result.attributes as any).name, "reportWeek")
		assertEquals((result.attributes as any).invalidattr, undefined)
		assertEquals((result.attributes as any).checked, undefined)
		assertEquals((result.attributes as any).minlength, undefined)
		assertEquals((result.attributes as any).maxlength, undefined)
		assertEquals((result.attributes as any).placeholder, undefined)
	})

	await t.step("should handle value attribute", () => {
		const attributes = { value: "2023-W52" }
		const result = InputWeek(attributes)
		assertEquals((result.attributes as any).value, "2023-W52")
	})

	await t.step("should handle list attribute for datalist", () => {
		const attributes = { list: "week-suggestions" }
		const result = InputWeek(attributes)
		assertEquals((result.attributes as any).list, "week-suggestions")
	})

	await t.step(
		"should maintain type='week' even if type attribute provided",
		() => {
			const attributes = { type: "text" } as any
			const result = InputWeek(attributes)
			assertEquals(result.attributes.type, "week")
		},
	)

	await t.step("should handle special properties", () => {
		const attributes = {
			name: "reportWeek",
			calculation: "weekCalc",
			dataset: { validation: "week" },
			display: "block",
			scripts: ["week-validator.js"],
			stylesheets: ["week.css"],
		}
		const result = InputWeek(attributes)
		assertEquals((result as any).calculation, "weekCalc")
		assertEquals((result as any).dataset, { validation: "week" })
		assertEquals((result as any).display, "block")
		assertEquals((result as any).scripts, ["week-validator.js"])
		assertEquals((result as any).stylesheets, ["week.css"])
	})
})
