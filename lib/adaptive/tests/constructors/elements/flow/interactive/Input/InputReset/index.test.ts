import { assertEquals } from "@std/assert"

import InputReset from "../../../../../../../constructors/elements/flow/interactive/Input/InputReset/index.ts"

Deno.test("InputReset constructor", async (t) => {
	await t.step("should create an input element with type='reset'", () => {
		const result = InputReset({})
		assertEquals(result.tag, "input")
		assertEquals(result.attributes.type, "reset")
		assertEquals(result.children, [])
	})

	await t.step("should accept form attributes", () => {
		const attributes = {
			form: "resetForm",
			name: "resetButton",
			value: "Reset Form",
		}
		const result = InputReset(attributes)
		assertEquals((result.attributes as any).form, "resetForm")
		assertEquals((result.attributes as any).name, "resetButton")
		assertEquals((result.attributes as any).value, "Reset Form")
	})

	await t.step("should accept global attributes", () => {
		const attributes = {
			id: "reset-input",
			class: "btn btn-secondary",
			tabindex: "0",
		}
		const result = InputReset(attributes)
		assertEquals((result.attributes as any).id, "reset-input")
		assertEquals((result.attributes as any).class, "btn btn-secondary")
		assertEquals((result.attributes as any).tabindex, "0")
	})

	await t.step("should filter out invalid attributes", () => {
		const attributes = {
			name: "resetButton",
			invalidattr: "should be removed",
			checked: true, // invalid for reset input
			minlength: 5, // invalid for reset input
			maxlength: 10, // invalid for reset input
			placeholder: "not valid", // invalid for reset input
			min: 0, // invalid for reset input
			max: 255, // invalid for reset input
			step: 1, // invalid for reset input
			required: true, // invalid for reset input
			readonly: true, // invalid for reset input
		} as any
		const result = InputReset(attributes)
		assertEquals((result.attributes as any).name, "resetButton")
		assertEquals((result.attributes as any).invalidattr, undefined)
		assertEquals((result.attributes as any).checked, undefined)
		assertEquals((result.attributes as any).minlength, undefined)
		assertEquals((result.attributes as any).maxlength, undefined)
		assertEquals((result.attributes as any).placeholder, undefined)
		assertEquals((result.attributes as any).min, undefined)
		assertEquals((result.attributes as any).max, undefined)
		assertEquals((result.attributes as any).step, undefined)
		assertEquals((result.attributes as any).required, undefined)
		assertEquals((result.attributes as any).readonly, undefined)
	})

	await t.step("should handle value attribute", () => {
		const attributes = { value: "Clear All" }
		const result = InputReset(attributes)
		assertEquals((result.attributes as any).value, "Clear All")
	})

	await t.step(
		"should maintain type='reset' even if type attribute provided",
		() => {
			const attributes = { type: "text" } as any
			const result = InputReset(attributes)
			assertEquals(result.attributes.type, "reset")
		},
	)

	await t.step("should handle special properties", () => {
		const attributes = {
			name: "resetButton",
			calculation: "resetCalc",
			dataset: { validation: "reset" },
			display: "block",
			scripts: ["reset-handler.js"],
			stylesheets: ["reset.css"],
		}
		const result = InputReset(attributes)
		assertEquals((result as any).calculation, "resetCalc")
		assertEquals((result as any).dataset, { validation: "reset" })
		assertEquals((result as any).display, "block")
		assertEquals((result as any).scripts, ["reset-handler.js"])
		assertEquals((result as any).stylesheets, ["reset.css"])
	})
})
