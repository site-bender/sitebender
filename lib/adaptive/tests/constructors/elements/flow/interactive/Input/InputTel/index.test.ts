import { assertEquals } from "@std/assert"

import InputTel from "../../../../../../../constructors/elements/flow/interactive/Input/InputTel/index.ts"

Deno.test("InputTel constructor", async (t) => {
	await t.step("should create an input element with type='tel'", () => {
		const result = InputTel({})
		assertEquals(result.tag, "input")
		assertEquals(result.attributes.type, "tel")
		assertEquals(result.children, [])
	})

	await t.step("should accept form attributes", () => {
		const attributes = {
			form: "contactForm",
			name: "phone",
			autocomplete: "tel",
			required: true,
		}
		const result = InputTel(attributes)
		assertEquals((result.attributes as any).form, "contactForm")
		assertEquals((result.attributes as any).name, "phone")
		assertEquals((result.attributes as any).autocomplete, "tel")
		assertEquals((result.attributes as any).required, true)
	})

	await t.step("should accept text input attributes", () => {
		const attributes = {
			minlength: 10,
			maxlength: 15,
			placeholder: "+1 555 123 4567",
			readonly: false,
			pattern: "\\+?[0-9\\s\\-\\(\\)]+",
			size: 20,
		}
		const result = InputTel(attributes)
		assertEquals((result.attributes as any).minlength, 10)
		assertEquals((result.attributes as any).maxlength, 15)
		assertEquals((result.attributes as any).placeholder, "+1 555 123 4567")
		assertEquals((result.attributes as any).readonly, false)
		assertEquals((result.attributes as any).pattern, "\\+?[0-9\\s\\-\\(\\)]+")
		assertEquals((result.attributes as any).size, 20)
	})

	await t.step("should accept global attributes", () => {
		const attributes = {
			id: "tel-input",
			class: "form-control",
			tabindex: "0",
		}
		const result = InputTel(attributes)
		assertEquals((result.attributes as any).id, "tel-input")
		assertEquals((result.attributes as any).class, "form-control")
		assertEquals((result.attributes as any).tabindex, "0")
	})

	await t.step("should filter out invalid attributes", () => {
		const attributes = {
			name: "phone",
			invalidattr: "should be removed",
			checked: true, // invalid for tel input
			multiple: true, // invalid for tel input
		} as any
		const result = InputTel(attributes)
		assertEquals((result.attributes as any).name, "phone")
		assertEquals((result.attributes as any).invalidattr, undefined)
		assertEquals((result.attributes as any).checked, undefined)
		assertEquals((result.attributes as any).multiple, undefined)
	})

	await t.step("should handle value attribute", () => {
		const attributes = { value: "+1 555 123 4567" }
		const result = InputTel(attributes)
		assertEquals((result.attributes as any).value, "+1 555 123 4567")
	})

	await t.step("should handle dirname attribute", () => {
		const attributes = {
			name: "phone",
			dirname: "phone.dir",
		}
		const result = InputTel(attributes)
		assertEquals((result.attributes as any).dirname, "phone.dir")
	})

	await t.step("should handle list attribute for datalist", () => {
		const attributes = { list: "phone-suggestions" }
		const result = InputTel(attributes)
		assertEquals((result.attributes as any).list, "phone-suggestions")
	})

	await t.step(
		"should maintain type='tel' even if type attribute provided",
		() => {
			const attributes = { type: "text" } as any
			const result = InputTel(attributes)
			assertEquals(result.attributes.type, "tel")
		},
	)

	await t.step("should handle special properties", () => {
		const attributes = {
			name: "phone",
			calculation: "telCalc",
			dataset: { validation: "phone" },
			display: "block",
			scripts: ["tel-validator.js"],
			stylesheets: ["tel.css"],
		}
		const result = InputTel(attributes)
		assertEquals((result as any).calculation, "telCalc")
		assertEquals((result as any).dataset, { validation: "phone" })
		assertEquals((result as any).display, "block")
		assertEquals((result as any).scripts, ["tel-validator.js"])
		assertEquals((result as any).stylesheets, ["tel.css"])
	})
})
