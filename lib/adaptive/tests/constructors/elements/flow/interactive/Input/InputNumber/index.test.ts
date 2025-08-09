import { assertEquals } from "@std/assert"

import InputNumber from "../../../../../../../constructors/elements/flow/interactive/Input/InputNumber/index.ts"

Deno.test("InputNumber constructor", async (t) => {
	await t.step("should create an input element with type='number'", () => {
		const result = InputNumber({})
		assertEquals(result.tag, "input")
		assertEquals(result.attributes.type, "number")
		assertEquals(result.children, [])
	})

	await t.step("should accept form attributes", () => {
		const attributes = {
			form: "calculatorForm",
			name: "quantity",
			autocomplete: "off",
			required: true,
		}
		const result = InputNumber(attributes)
		assertEquals((result.attributes as any).form, "calculatorForm")
		assertEquals((result.attributes as any).name, "quantity")
		assertEquals((result.attributes as any).autocomplete, "off")
		assertEquals((result.attributes as any).required, true)
	})

	await t.step("should accept number input attributes", () => {
		const attributes = {
			min: 0,
			max: 100,
			step: 0.1,
			placeholder: "Enter a number",
			readonly: false,
		}
		const result = InputNumber(attributes)
		assertEquals((result.attributes as any).min, 0)
		assertEquals((result.attributes as any).max, 100)
		assertEquals((result.attributes as any).step, 0.1)
		assertEquals((result.attributes as any).placeholder, "Enter a number")
		assertEquals((result.attributes as any).readonly, false)
	})

	await t.step("should accept global attributes", () => {
		const attributes = {
			id: "number-input",
			class: "form-control numeric",
			tabindex: "0",
		}
		const result = InputNumber(attributes)
		assertEquals((result.attributes as any).id, "number-input")
		assertEquals((result.attributes as any).class, "form-control numeric")
		assertEquals((result.attributes as any).tabindex, "0")
	})

	await t.step("should filter out invalid attributes", () => {
		const attributes = {
			name: "quantity",
			invalidattr: "should be removed",
			checked: true, // invalid for number input
			minlength: 5, // invalid for number input
			maxlength: 10, // invalid for number input
		} as any
		const result = InputNumber(attributes)
		assertEquals((result.attributes as any).name, "quantity")
		assertEquals((result.attributes as any).invalidattr, undefined)
		assertEquals((result.attributes as any).checked, undefined)
		assertEquals((result.attributes as any).minlength, undefined)
		assertEquals((result.attributes as any).maxlength, undefined)
	})

	await t.step("should handle value attribute", () => {
		const attributes = { value: "42" }
		const result = InputNumber(attributes)
		assertEquals((result.attributes as any).value, "42")
	})

	await t.step("should handle numeric value attribute", () => {
		const attributes = { value: 42 }
		const result = InputNumber(attributes)
		assertEquals((result.attributes as any).value, 42)
	})

	await t.step("should handle list attribute for datalist", () => {
		const attributes = { list: "number-suggestions" }
		const result = InputNumber(attributes)
		assertEquals((result.attributes as any).list, "number-suggestions")
	})

	await t.step(
		"should maintain type='number' even if type attribute provided",
		() => {
			const attributes = { type: "text" } as any
			const result = InputNumber(attributes)
			assertEquals(result.attributes.type, "number")
		},
	)

	await t.step("should handle special properties", () => {
		const attributes = {
			name: "quantity",
			calculation: "quantityCalc",
			dataset: { validation: "numeric" },
			display: "block",
			scripts: ["number-validator.js"],
			stylesheets: ["number.css"],
		}
		const result = InputNumber(attributes)
		assertEquals((result as any).calculation, "quantityCalc")
		assertEquals((result as any).dataset, { validation: "numeric" })
		assertEquals((result as any).display, "block")
		assertEquals((result as any).scripts, ["number-validator.js"])
		assertEquals((result as any).stylesheets, ["number.css"])
	})
})
