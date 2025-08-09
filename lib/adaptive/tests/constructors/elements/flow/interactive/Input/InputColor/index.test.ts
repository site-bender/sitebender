import { assertEquals } from "@std/assert"

import InputColor from "../../../../../../../constructors/elements/flow/interactive/Input/InputColor/index.ts"

Deno.test("InputColor constructor", async (t) => {
	await t.step("should create an input element with type='color'", () => {
		const result = InputColor({})
		assertEquals(result.tag, "input")
		assertEquals(result.attributes.type, "color")
		assertEquals(result.children, [])
	})

	await t.step("should accept form attributes", () => {
		const attributes = {
			form: "colorForm",
			name: "backgroundcolor",
			autocomplete: "off",
			required: false,
		}
		const result = InputColor(attributes)
		assertEquals((result.attributes as any).form, "colorForm")
		assertEquals((result.attributes as any).name, "backgroundcolor")
		assertEquals((result.attributes as any).autocomplete, "off")
		assertEquals((result.attributes as any).required, false)
	})

	await t.step("should accept global attributes", () => {
		const attributes = {
			id: "color-input",
			class: "form-control color-picker",
			tabindex: "0",
		}
		const result = InputColor(attributes)
		assertEquals((result.attributes as any).id, "color-input")
		assertEquals((result.attributes as any).class, "form-control color-picker")
		assertEquals((result.attributes as any).tabindex, "0")
	})

	await t.step("should filter out invalid attributes", () => {
		const attributes = {
			name: "backgroundcolor",
			invalidattr: "should be removed",
			checked: true, // invalid for color input
			minlength: 5, // invalid for color input
			maxlength: 10, // invalid for color input
			placeholder: "not valid", // invalid for color input
			min: 0, // invalid for color input
			max: 255, // invalid for color input
			step: 1, // invalid for color input
		} as any
		const result = InputColor(attributes)
		assertEquals((result.attributes as any).name, "backgroundcolor")
		assertEquals((result.attributes as any).invalidattr, undefined)
		assertEquals((result.attributes as any).checked, undefined)
		assertEquals((result.attributes as any).minlength, undefined)
		assertEquals((result.attributes as any).maxlength, undefined)
		assertEquals((result.attributes as any).placeholder, undefined)
		assertEquals((result.attributes as any).min, undefined)
		assertEquals((result.attributes as any).max, undefined)
		assertEquals((result.attributes as any).step, undefined)
	})

	await t.step("should handle value attribute with hex color", () => {
		const attributes = { value: "#ff0000" }
		const result = InputColor(attributes)
		assertEquals((result.attributes as any).value, "#ff0000")
	})

	await t.step("should handle value attribute with uppercase hex color", () => {
		const attributes = { value: "#FF0000" }
		const result = InputColor(attributes)
		assertEquals((result.attributes as any).value, "#FF0000")
	})

	await t.step("should handle list attribute for datalist", () => {
		const attributes = { list: "color-suggestions" }
		const result = InputColor(attributes)
		assertEquals((result.attributes as any).list, "color-suggestions")
	})

	await t.step(
		"should maintain type='color' even if type attribute provided",
		() => {
			const attributes = { type: "text" } as any
			const result = InputColor(attributes)
			assertEquals(result.attributes.type, "color")
		},
	)

	await t.step("should handle special properties", () => {
		const attributes = {
			name: "backgroundcolor",
			calculation: "colorCalc",
			dataset: { validation: "color" },
			display: "block",
			scripts: ["color-handler.js"],
			stylesheets: ["color.css"],
		}
		const result = InputColor(attributes)
		assertEquals((result as any).calculation, "colorCalc")
		assertEquals((result as any).dataset, { validation: "color" })
		assertEquals((result as any).display, "block")
		assertEquals((result as any).scripts, ["color-handler.js"])
		assertEquals((result as any).stylesheets, ["color.css"])
	})
})
