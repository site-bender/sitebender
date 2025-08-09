import { assertEquals } from "@std/assert"

import InputSubmit from "../../../../../../../constructors/elements/flow/interactive/Input/InputSubmit/index.ts"

Deno.test("InputSubmit constructor", async (t) => {
	await t.step("should create an input element with type='submit'", () => {
		const result = InputSubmit({})
		assertEquals(result.tag, "input")
		assertEquals(result.attributes.type, "submit")
		assertEquals(result.children, [])
	})

	await t.step("should accept form attributes", () => {
		const attributes = {
			form: "submitForm",
			name: "submitButton",
			value: "Submit Form",
		}
		const result = InputSubmit(attributes)
		assertEquals((result.attributes as any).form, "submitForm")
		assertEquals((result.attributes as any).name, "submitButton")
		assertEquals((result.attributes as any).value, "Submit Form")
	})

	await t.step("should accept submit-specific attributes", () => {
		const attributes = {
			formaction: "/submit",
			formenctype: "multipart/form-data",
			formmethod: "post",
			formnovalidate: true,
			formtarget: "_blank",
		}
		const result = InputSubmit(attributes)
		assertEquals((result.attributes as any).formaction, "/submit")
		assertEquals((result.attributes as any).formenctype, "multipart/form-data")
		assertEquals((result.attributes as any).formmethod, "post")
		assertEquals((result.attributes as any).formnovalidate, true)
		assertEquals((result.attributes as any).formtarget, "_blank")
	})

	await t.step("should accept global attributes", () => {
		const attributes = {
			id: "submit-input",
			class: "btn btn-primary",
			tabindex: "0",
		}
		const result = InputSubmit(attributes)
		assertEquals((result.attributes as any).id, "submit-input")
		assertEquals((result.attributes as any).class, "btn btn-primary")
		assertEquals((result.attributes as any).tabindex, "0")
	})

	await t.step("should filter out invalid attributes", () => {
		const attributes = {
			name: "submitButton",
			invalidattr: "should be removed",
			checked: true, // invalid for submit input
			minlength: 5, // invalid for submit input
			maxlength: 10, // invalid for submit input
			placeholder: "not valid", // invalid for submit input
			min: 0, // invalid for submit input
			max: 255, // invalid for submit input
			step: 1, // invalid for submit input
			required: true, // invalid for submit input
			readonly: true, // invalid for submit input
		} as any
		const result = InputSubmit(attributes)
		assertEquals((result.attributes as any).name, "submitButton")
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
		const attributes = { value: "Submit Now" }
		const result = InputSubmit(attributes)
		assertEquals((result.attributes as any).value, "Submit Now")
	})

	await t.step(
		"should maintain type='submit' even if type attribute provided",
		() => {
			const attributes = { type: "text" } as any
			const result = InputSubmit(attributes)
			assertEquals(result.attributes.type, "submit")
		},
	)

	await t.step("should handle special properties", () => {
		const attributes = {
			name: "submitButton",
			calculation: "submitCalc",
			dataset: { validation: "submit" },
			display: "block",
			scripts: ["submit-handler.js"],
			stylesheets: ["submit.css"],
		}
		const result = InputSubmit(attributes)
		assertEquals((result as any).calculation, "submitCalc")
		assertEquals((result as any).dataset, { validation: "submit" })
		assertEquals((result as any).display, "block")
		assertEquals((result as any).scripts, ["submit-handler.js"])
		assertEquals((result as any).stylesheets, ["submit.css"])
	})
})
