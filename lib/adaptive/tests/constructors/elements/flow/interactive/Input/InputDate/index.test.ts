import { assertEquals } from "@std/assert"

import InputDate from "../../../../../../../constructors/elements/flow/interactive/Input/InputDate/index.ts"

Deno.test("InputDate constructor", async (t) => {
	await t.step("should create an input element with type='date'", () => {
		const result = InputDate({})
		assertEquals(result.tag, "input")
		assertEquals(result.attributes.type, "date")
		assertEquals(result.children, [])
	})

	await t.step("should accept form attributes", () => {
		const attributes = {
			form: "dateForm",
			name: "birthdate",
			autocomplete: "bday",
			required: true,
		}
		const result = InputDate(attributes)
		assertEquals((result.attributes as any).form, "dateForm")
		assertEquals((result.attributes as any).name, "birthdate")
		assertEquals((result.attributes as any).autocomplete, "bday")
		assertEquals((result.attributes as any).required, true)
	})

	await t.step("should accept date input attributes", () => {
		const attributes = {
			min: "1900-01-01",
			max: "2030-12-31",
			step: "1",
			readonly: false,
		}
		const result = InputDate(attributes)
		assertEquals((result.attributes as any).min, "1900-01-01")
		assertEquals((result.attributes as any).max, "2030-12-31")
		assertEquals((result.attributes as any).step, "1")
		assertEquals((result.attributes as any).readonly, false)
	})

	await t.step("should accept global attributes", () => {
		const attributes = {
			id: "date-input",
			class: "form-control date-picker",
			tabindex: "0",
		}
		const result = InputDate(attributes)
		assertEquals((result.attributes as any).id, "date-input")
		assertEquals((result.attributes as any).class, "form-control date-picker")
		assertEquals((result.attributes as any).tabindex, "0")
	})

	await t.step("should filter out invalid attributes", () => {
		const attributes = {
			name: "birthdate",
			invalidattr: "should be removed",
			checked: true, // invalid for date input
			minlength: 5, // invalid for date input
			maxlength: 10, // invalid for date input
			placeholder: "not valid", // invalid for date input
		} as any
		const result = InputDate(attributes)
		assertEquals((result.attributes as any).name, "birthdate")
		assertEquals((result.attributes as any).invalidattr, undefined)
		assertEquals((result.attributes as any).checked, undefined)
		assertEquals((result.attributes as any).minlength, undefined)
		assertEquals((result.attributes as any).maxlength, undefined)
		assertEquals((result.attributes as any).placeholder, undefined)
	})

	await t.step("should handle value attribute", () => {
		const attributes = { value: "2023-12-25" }
		const result = InputDate(attributes)
		assertEquals((result.attributes as any).value, "2023-12-25")
	})

	await t.step("should handle list attribute for datalist", () => {
		const attributes = { list: "date-suggestions" }
		const result = InputDate(attributes)
		assertEquals((result.attributes as any).list, "date-suggestions")
	})

	await t.step(
		"should maintain type='date' even if type attribute provided",
		() => {
			const attributes = { type: "text" } as any
			const result = InputDate(attributes)
			assertEquals(result.attributes.type, "date")
		},
	)

	await t.step("should handle special properties", () => {
		const attributes = {
			name: "birthdate",
			calculation: "dateCalc",
			dataset: { validation: "date" },
			display: "block",
			scripts: ["date-validator.js"],
			stylesheets: ["date.css"],
		}
		const result = InputDate(attributes)
		assertEquals((result as any).calculation, "dateCalc")
		assertEquals((result as any).dataset, { validation: "date" })
		assertEquals((result as any).display, "block")
		assertEquals((result as any).scripts, ["date-validator.js"])
		assertEquals((result as any).stylesheets, ["date.css"])
	})
})
