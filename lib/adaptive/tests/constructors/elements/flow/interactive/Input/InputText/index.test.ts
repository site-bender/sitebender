import { assertEquals } from "@std/assert"

import InputText from "../../../../../../../constructors/elements/flow/interactive/Input/InputText/index.ts"

Deno.test("InputText constructor", async (t) => {
	await t.step("should create an input element with type='text'", () => {
		const result = InputText({})
		assertEquals(result.tag, "input")
		assertEquals(result.attributes.type, "text")
		assertEquals(result.children, [])
	})

	await t.step("should accept form attributes", () => {
		const attributes = {
			form: "myForm",
			name: "username",
			autocomplete: "username",
			required: true,
		}
		const result = InputText(attributes)
		assertEquals((result.attributes as any).form, "myForm")
		assertEquals((result.attributes as any).name, "username")
		assertEquals((result.attributes as any).autocomplete, "username")
		assertEquals((result.attributes as any).required, true)
	})

	await t.step("should accept text input attributes", () => {
		const attributes = {
			minlength: 3,
			maxlength: 50,
			placeholder: "Enter your username",
			readonly: true,
			pattern: "[a-zA-Z0-9_]+",
			size: 20,
		}
		const result = InputText(attributes)
		assertEquals((result.attributes as any).minlength, 3)
		assertEquals((result.attributes as any).maxlength, 50)
		assertEquals((result.attributes as any).placeholder, "Enter your username")
		assertEquals((result.attributes as any).readonly, true)
		assertEquals((result.attributes as any).pattern, "[a-zA-Z0-9_]+")
		assertEquals((result.attributes as any).size, 20)
	})

	await t.step("should accept global attributes", () => {
		const attributes = {
			id: "text-input",
			class: "form-control",
			tabindex: "0",
		}
		const result = InputText(attributes)
		assertEquals((result.attributes as any).id, "text-input")
		assertEquals((result.attributes as any).class, "form-control")
		assertEquals((result.attributes as any).tabindex, "0")
	})

	await t.step("should filter out invalid attributes", () => {
		const attributes = {
			name: "username",
			invalidattr: "should be removed",
			checked: true, // invalid for text input
			multiple: true, // invalid for text input
		} as any
		const result = InputText(attributes)
		assertEquals((result.attributes as any).name, "username")
		assertEquals((result.attributes as any).invalidattr, undefined)
		assertEquals((result.attributes as any).checked, undefined)
		assertEquals((result.attributes as any).multiple, undefined)
	})

	await t.step("should handle value attribute", () => {
		const attributes = { value: "default text" }
		const result = InputText(attributes)
		assertEquals((result.attributes as any).value, "default text")
	})

	await t.step("should handle dirname attribute", () => {
		const attributes = {
			name: "comment",
			dirname: "comment.dir",
		}
		const result = InputText(attributes)
		assertEquals((result.attributes as any).dirname, "comment.dir")
	})

	await t.step("should handle list attribute for datalist", () => {
		const attributes = { list: "suggestions" }
		const result = InputText(attributes)
		assertEquals((result.attributes as any).list, "suggestions")
	})

	await t.step(
		"should maintain type='text' even if type attribute provided",
		() => {
			const attributes = { type: "password" } as any
			const result = InputText(attributes)
			assertEquals(result.attributes.type, "text")
		},
	)

	await t.step("should handle special properties", () => {
		const attributes = {
			name: "special",
			calculation: "textCalc",
			dataset: { validation: "strict" },
			display: "block",
			scripts: ["validator.js"],
			stylesheets: ["input.css"],
		}
		const result = InputText(attributes)
		assertEquals((result as any).calculation, "textCalc")
		assertEquals((result as any).dataset, { validation: "strict" })
		assertEquals((result as any).display, "block")
		assertEquals((result as any).scripts, ["validator.js"])
		assertEquals((result as any).stylesheets, ["input.css"])
	})
})
