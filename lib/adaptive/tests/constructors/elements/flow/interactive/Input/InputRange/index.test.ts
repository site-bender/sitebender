import { assertEquals } from "@std/assert"

import InputRange from "../../../../../../../constructors/elements/flow/interactive/Input/InputRange/index.ts"

Deno.test("InputRange constructor", async (t) => {
	await t.step("should create an input element with type='range'", () => {
		const result = InputRange({})
		assertEquals(result.tag, "input")
		assertEquals(result.attributes.type, "range")
		assertEquals(result.children, [])
	})

	await t.step("should accept form attributes", () => {
		const attributes = {
			form: "rangeForm",
			name: "volume",
			autocomplete: "off",
			required: false,
		}
		const result = InputRange(attributes)
		assertEquals((result.attributes as any).form, "rangeForm")
		assertEquals((result.attributes as any).name, "volume")
		assertEquals((result.attributes as any).autocomplete, "off")
		assertEquals((result.attributes as any).required, false)
	})

	await t.step("should accept range input attributes", () => {
		const attributes = {
			min: 0,
			max: 100,
			step: 5,
			value: 50,
		}
		const result = InputRange(attributes)
		assertEquals((result.attributes as any).min, 0)
		assertEquals((result.attributes as any).max, 100)
		assertEquals((result.attributes as any).step, 5)
		assertEquals((result.attributes as any).value, 50)
	})

	await t.step("should accept global attributes", () => {
		const attributes = {
			id: "range-input",
			class: "form-control range-slider",
			tabindex: "0",
		}
		const result = InputRange(attributes)
		assertEquals((result.attributes as any).id, "range-input")
		assertEquals((result.attributes as any).class, "form-control range-slider")
		assertEquals((result.attributes as any).tabindex, "0")
	})

	await t.step("should filter out invalid attributes", () => {
		const attributes = {
			name: "volume",
			invalidattr: "should be removed",
			checked: true, // invalid for range input
			minlength: 5, // invalid for range input
			maxlength: 10, // invalid for range input
			placeholder: "not valid", // invalid for range input
		} as any
		const result = InputRange(attributes)
		assertEquals((result.attributes as any).name, "volume")
		assertEquals((result.attributes as any).invalidattr, undefined)
		assertEquals((result.attributes as any).checked, undefined)
		assertEquals((result.attributes as any).minlength, undefined)
		assertEquals((result.attributes as any).maxlength, undefined)
		assertEquals((result.attributes as any).placeholder, undefined)
	})

	await t.step("should handle numeric value attribute", () => {
		const attributes = { value: 75 }
		const result = InputRange(attributes)
		assertEquals((result.attributes as any).value, 75)
	})

	await t.step("should handle string value attribute", () => {
		const attributes = { value: "25" }
		const result = InputRange(attributes)
		assertEquals((result.attributes as any).value, "25")
	})

	await t.step("should handle list attribute for datalist", () => {
		const attributes = { list: "range-suggestions" }
		const result = InputRange(attributes)
		assertEquals((result.attributes as any).list, "range-suggestions")
	})

	await t.step(
		"should maintain type='range' even if type attribute provided",
		() => {
			const attributes = { type: "text" } as any
			const result = InputRange(attributes)
			assertEquals(result.attributes.type, "range")
		},
	)

	await t.step("should handle special properties", () => {
		const attributes = {
			name: "volume",
			calculation: "rangeCalc",
			dataset: { validation: "range" },
			display: "block",
			scripts: ["range-handler.js"],
			stylesheets: ["range.css"],
		}
		const result = InputRange(attributes)
		assertEquals((result as any).calculation, "rangeCalc")
		assertEquals((result as any).dataset, { validation: "range" })
		assertEquals((result as any).display, "block")
		assertEquals((result as any).scripts, ["range-handler.js"])
		assertEquals((result as any).stylesheets, ["range.css"])
	})
})
