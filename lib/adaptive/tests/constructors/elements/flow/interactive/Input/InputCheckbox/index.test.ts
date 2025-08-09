import { assertEquals } from "@std/assert"

import InputCheckbox from "../../../../../../../constructors/elements/flow/interactive/Input/InputCheckbox/index.ts"

Deno.test("InputCheckbox constructor", async (t) => {
	await t.step("should create an input element with type='checkbox'", () => {
		const result = InputCheckbox({})
		assertEquals(result.tag, "input")
		assertEquals(result.attributes.type, "checkbox")
		assertEquals(result.children, [])
	})

	await t.step("should accept form attributes", () => {
		const attributes = {
			form: "settingsForm",
			name: "notifications",
			required: true,
		}
		const result = InputCheckbox(attributes)
		assertEquals((result.attributes as any).form, "settingsForm")
		assertEquals((result.attributes as any).name, "notifications")
		assertEquals((result.attributes as any).required, true)
	})

	await t.step("should accept checkbox-specific attributes", () => {
		const attributes = {
			checked: true,
			value: "enabled",
		}
		const result = InputCheckbox(attributes)
		assertEquals((result.attributes as any).checked, true)
		assertEquals((result.attributes as any).value, "enabled")
	})

	await t.step("should accept global attributes", () => {
		const attributes = {
			id: "checkbox-input",
			class: "form-check-input",
			tabindex: "0",
		}
		const result = InputCheckbox(attributes)
		assertEquals((result.attributes as any).id, "checkbox-input")
		assertEquals((result.attributes as any).class, "form-check-input")
		assertEquals((result.attributes as any).tabindex, "0")
	})

	await t.step("should filter out invalid attributes", () => {
		const attributes = {
			name: "notifications",
			invalidattr: "should be removed",
			minlength: 5, // invalid for checkbox input
			maxlength: 10, // invalid for checkbox input
			placeholder: "not valid", // invalid for checkbox input
		} as any
		const result = InputCheckbox(attributes)
		assertEquals((result.attributes as any).name, "notifications")
		assertEquals((result.attributes as any).invalidattr, undefined)
		assertEquals((result.attributes as any).minlength, undefined)
		assertEquals((result.attributes as any).maxlength, undefined)
		assertEquals((result.attributes as any).placeholder, undefined)
	})

	await t.step("should handle checked attribute as boolean", () => {
		const attributes = { checked: true }
		const result = InputCheckbox(attributes)
		assertEquals((result.attributes as any).checked, true)
	})

	await t.step("should handle checked attribute as false", () => {
		const attributes = { checked: false }
		const result = InputCheckbox(attributes)
		assertEquals((result.attributes as any).checked, false)
	})

	await t.step("should handle value attribute", () => {
		const attributes = { value: "yes" }
		const result = InputCheckbox(attributes)
		assertEquals((result.attributes as any).value, "yes")
	})

	await t.step(
		"should maintain type='checkbox' even if type attribute provided",
		() => {
			const attributes = { type: "text" } as any
			const result = InputCheckbox(attributes)
			assertEquals(result.attributes.type, "checkbox")
		},
	)

	await t.step("should handle special properties", () => {
		const attributes = {
			name: "notifications",
			calculation: "checkboxCalc",
			dataset: { validation: "boolean" },
			display: "block",
			scripts: ["checkbox-handler.js"],
			stylesheets: ["checkbox.css"],
		}
		const result = InputCheckbox(attributes)
		assertEquals((result as any).calculation, "checkboxCalc")
		assertEquals((result as any).dataset, { validation: "boolean" })
		assertEquals((result as any).display, "block")
		assertEquals((result as any).scripts, ["checkbox-handler.js"])
		assertEquals((result as any).stylesheets, ["checkbox.css"])
	})
})
