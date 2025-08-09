import { assertEquals } from "@std/assert"

import InputHidden from "../../../../../../../constructors/elements/flow/interactive/Input/InputHidden/index.ts"

Deno.test("InputHidden constructor", async (t) => {
	await t.step("should create an input element with type='hidden'", () => {
		const result = InputHidden({})
		assertEquals(result.tag, "input")
		assertEquals(result.attributes.type, "hidden")
		assertEquals(result.children, [])
	})

	await t.step("should accept form attributes", () => {
		const attributes = {
			form: "hiddenForm",
			name: "token",
			value: "abc123",
		}
		const result = InputHidden(attributes)
		assertEquals((result.attributes as any).form, "hiddenForm")
		assertEquals((result.attributes as any).name, "token")
		assertEquals((result.attributes as any).value, "abc123")
	})

	await t.step("should accept global attributes", () => {
		const attributes = {
			id: "hidden-input",
			class: "hidden-field",
		}
		const result = InputHidden(attributes)
		assertEquals((result.attributes as any).id, "hidden-input")
		assertEquals((result.attributes as any).class, "hidden-field")
	})

	await t.step("should filter out invalid attributes", () => {
		const attributes = {
			name: "token",
			invalidattr: "should be removed",
			checked: true, // invalid for hidden input
			minlength: 5, // invalid for hidden input
			maxlength: 10, // invalid for hidden input
			placeholder: "not valid", // invalid for hidden input
			required: true, // invalid for hidden input
			readonly: true, // invalid for hidden input
			tabindex: "0", // invalid for hidden input
		} as any
		const result = InputHidden(attributes)
		assertEquals((result.attributes as any).name, "token")
		assertEquals((result.attributes as any).invalidattr, undefined)
		assertEquals((result.attributes as any).checked, undefined)
		assertEquals((result.attributes as any).minlength, undefined)
		assertEquals((result.attributes as any).maxlength, undefined)
		assertEquals((result.attributes as any).placeholder, undefined)
		assertEquals((result.attributes as any).required, undefined)
		assertEquals((result.attributes as any).readonly, undefined)
		assertEquals((result.attributes as any).tabindex, undefined)
	})

	await t.step("should handle value attribute", () => {
		const attributes = { value: "secret-token-123" }
		const result = InputHidden(attributes)
		assertEquals((result.attributes as any).value, "secret-token-123")
	})

	await t.step("should handle numeric value attribute", () => {
		const attributes = { value: 42 }
		const result = InputHidden(attributes)
		assertEquals((result.attributes as any).value, 42)
	})

	await t.step(
		"should maintain type='hidden' even if type attribute provided",
		() => {
			const attributes = { type: "text" } as any
			const result = InputHidden(attributes)
			assertEquals(result.attributes.type, "hidden")
		},
	)

	await t.step("should handle special properties", () => {
		const attributes = {
			name: "token",
			calculation: "hiddenCalc",
			dataset: { validation: "hidden" },
			display: "none",
			scripts: ["hidden-handler.js"],
			stylesheets: ["hidden.css"],
		}
		const result = InputHidden(attributes)
		assertEquals((result as any).calculation, "hiddenCalc")
		assertEquals((result as any).dataset, { validation: "hidden" })
		assertEquals((result as any).display, "none")
		assertEquals((result as any).scripts, ["hidden-handler.js"])
		assertEquals((result as any).stylesheets, ["hidden.css"])
	})
})
