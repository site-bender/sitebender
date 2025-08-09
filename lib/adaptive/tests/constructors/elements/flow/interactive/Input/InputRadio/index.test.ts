import { assertEquals } from "@std/assert"

import InputRadio from "../../../../../../../constructors/elements/flow/interactive/Input/InputRadio/index.ts"

Deno.test("InputRadio constructor", async (t) => {
	await t.step("should create an input element with type='radio'", () => {
		const result = InputRadio({})
		assertEquals(result.tag, "input")
		assertEquals(result.attributes.type, "radio")
		assertEquals(result.children, [])
	})

	await t.step("should accept form attributes", () => {
		const attributes = {
			form: "optionsForm",
			name: "choice",
			required: true,
		}
		const result = InputRadio(attributes)
		assertEquals((result.attributes as any).form, "optionsForm")
		assertEquals((result.attributes as any).name, "choice")
		assertEquals((result.attributes as any).required, true)
	})

	await t.step("should accept radio-specific attributes", () => {
		const attributes = {
			checked: true,
			value: "option1",
		}
		const result = InputRadio(attributes)
		assertEquals((result.attributes as any).checked, true)
		assertEquals((result.attributes as any).value, "option1")
	})

	await t.step("should accept global attributes", () => {
		const attributes = {
			id: "radio-input",
			class: "form-check-input",
			tabindex: "0",
		}
		const result = InputRadio(attributes)
		assertEquals((result.attributes as any).id, "radio-input")
		assertEquals((result.attributes as any).class, "form-check-input")
		assertEquals((result.attributes as any).tabindex, "0")
	})

	await t.step("should filter out invalid attributes", () => {
		const attributes = {
			name: "choice",
			invalidattr: "should be removed",
			minlength: 5, // invalid for radio input
			maxlength: 10, // invalid for radio input
			placeholder: "not valid", // invalid for radio input
			multiple: true, // invalid for radio input
		} as any
		const result = InputRadio(attributes)
		assertEquals((result.attributes as any).name, "choice")
		assertEquals((result.attributes as any).invalidattr, undefined)
		assertEquals((result.attributes as any).minlength, undefined)
		assertEquals((result.attributes as any).maxlength, undefined)
		assertEquals((result.attributes as any).placeholder, undefined)
		assertEquals((result.attributes as any).multiple, undefined)
	})

	await t.step("should handle checked attribute as boolean", () => {
		const attributes = { checked: true }
		const result = InputRadio(attributes)
		assertEquals((result.attributes as any).checked, true)
	})

	await t.step("should handle checked attribute as false", () => {
		const attributes = { checked: false }
		const result = InputRadio(attributes)
		assertEquals((result.attributes as any).checked, false)
	})

	await t.step("should handle value attribute", () => {
		const attributes = { value: "option2" }
		const result = InputRadio(attributes)
		assertEquals((result.attributes as any).value, "option2")
	})

	await t.step(
		"should maintain type='radio' even if type attribute provided",
		() => {
			const attributes = { type: "text" } as any
			const result = InputRadio(attributes)
			assertEquals(result.attributes.type, "radio")
		},
	)

	await t.step("should handle special properties", () => {
		const attributes = {
			name: "choice",
			calculation: "radioCalc",
			dataset: { validation: "radio" },
			display: "block",
			scripts: ["radio-handler.js"],
			stylesheets: ["radio.css"],
		}
		const result = InputRadio(attributes)
		assertEquals((result as any).calculation, "radioCalc")
		assertEquals((result as any).dataset, { validation: "radio" })
		assertEquals((result as any).display, "block")
		assertEquals((result as any).scripts, ["radio-handler.js"])
		assertEquals((result as any).stylesheets, ["radio.css"])
	})
})
