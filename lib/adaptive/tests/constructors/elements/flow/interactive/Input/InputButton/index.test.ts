import { assertEquals } from "@std/assert"

import InputButton from "../../../../../../../constructors/elements/flow/interactive/Input/InputButton/index.ts"

Deno.test("InputButton constructor", async (t) => {
	await t.step("should create an input element with type='button'", () => {
		const result = InputButton({})
		assertEquals(result.tag, "input")
		assertEquals(result.attributes.type, "button")
		assertEquals(result.children, [])
	})

	await t.step("should accept form attributes", () => {
		const attributes = {
			form: "buttonForm",
			name: "customButton",
			value: "Click Me",
		}
		const result = InputButton(attributes)
		assertEquals((result.attributes as any).form, "buttonForm")
		assertEquals((result.attributes as any).name, "customButton")
		assertEquals((result.attributes as any).value, "Click Me")
	})

	await t.step("should accept global attributes", () => {
		const attributes = {
			id: "button-input",
			class: "btn btn-primary",
			tabindex: "0",
		}
		const result = InputButton(attributes)
		assertEquals((result.attributes as any).id, "button-input")
		assertEquals((result.attributes as any).class, "btn btn-primary")
		assertEquals((result.attributes as any).tabindex, "0")
	})

	await t.step("should filter out invalid attributes", () => {
		const attributes = {
			name: "customButton",
			invalidattr: "should be removed",
			checked: true, // invalid for button input
			minlength: 5, // invalid for button input
			maxlength: 10, // invalid for button input
			placeholder: "not valid", // invalid for button input
			min: 0, // invalid for button input
			max: 255, // invalid for button input
			step: 1, // invalid for button input
			required: true, // invalid for button input
			readonly: true, // invalid for button input
		} as any
		const result = InputButton(attributes)
		assertEquals((result.attributes as any).name, "customButton")
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
		const attributes = { value: "Custom Button Text" }
		const result = InputButton(attributes)
		assertEquals((result.attributes as any).value, "Custom Button Text")
	})

	await t.step(
		"should maintain type='button' even if type attribute provided",
		() => {
			const attributes = { type: "text" } as any
			const result = InputButton(attributes)
			assertEquals(result.attributes.type, "button")
		},
	)

	await t.step("should handle special properties", () => {
		const attributes = {
			name: "customButton",
			calculation: "buttonCalc",
			dataset: { validation: "button" },
			display: "block",
			scripts: ["button-handler.js"],
			stylesheets: ["button.css"],
		}
		const result = InputButton(attributes)
		assertEquals((result as any).calculation, "buttonCalc")
		assertEquals((result as any).dataset, { validation: "button" })
		assertEquals((result as any).display, "block")
		assertEquals((result as any).scripts, ["button-handler.js"])
		assertEquals((result as any).stylesheets, ["button.css"])
	})
})
