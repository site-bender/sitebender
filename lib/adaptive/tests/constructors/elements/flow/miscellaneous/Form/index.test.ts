import { assertEquals } from "@std/assert"

import Form from "../../../../../../constructors/elements/flow/miscellaneous/Form/index.ts"

Deno.test("Form constructor", async (t) => {
	await t.step("should create a form element", () => {
		const result = Form({})([])
		assertEquals(result.tag, "Form")
		assertEquals(result.children, [])
	})

	await t.step("should accept form-specific attributes", () => {
		const attributes = {
			action: "/submit",
			method: "post",
			enctype: "multipart/form-data",
			target: "_blank",
			autocomplete: "off",
			novalidate: true,
		}
		const result = Form(attributes)([])
		assertEquals((result.attributes as any).action, "/submit")
		assertEquals((result.attributes as any).method, "post")
		assertEquals((result.attributes as any).enctype, "multipart/form-data")
		assertEquals((result.attributes as any).target, "_blank")
		assertEquals((result.attributes as any).autocomplete, "off")
		assertEquals((result.attributes as any).novalidate, true)
	})

	await t.step("should accept global attributes", () => {
		const attributes = {
			id: "contact-form",
			class: "form-container",
			name: "contactForm",
		}
		const result = Form(attributes)([])
		assertEquals((result.attributes as any).id, "contact-form")
		assertEquals((result.attributes as any).class, "form-container")
		assertEquals((result.attributes as any).name, "contactForm")
	})

	await t.step("should accept valid flow content children", () => {
		const children = [
			{ tag: "div", attributes: {}, children: [] },
			{ tag: "p", attributes: {}, children: [] },
			{ tag: "input", attributes: { type: "text" }, children: [] },
		]
		const result = Form({})(children)
		assertEquals(result.children.length, 3)
		assertEquals((result.children[0] as any).tag, "div")
		assertEquals((result.children[1] as any).tag, "p")
		assertEquals((result.children[2] as any).tag, "input")
	})

	await t.step("should filter out invalid attributes", () => {
		const attributes = {
			action: "/submit",
			invalidattr: "should be removed",
			onclick: "handleClick()", // event handler attributes should be filtered
		} as any
		const result = Form(attributes)([])
		assertEquals((result.attributes as any).action, "/submit")
		assertEquals((result.attributes as any).invalidattr, undefined)
		assertEquals((result.attributes as any).onclick, undefined)
	})

	await t.step("should handle empty children array", () => {
		const result = Form({})([])
		assertEquals(result.children, [])
	})

	await t.step("should handle single child", () => {
		const child = { tag: "input", attributes: { type: "submit" }, children: [] }
		const result = Form({})(child)
		assertEquals(result.children.length, 1)
		assertEquals((result.children[0] as any).tag, "input")
	})

	await t.step("should handle special properties", () => {
		const attributes = {
			action: "/submit",
			calculation: "formCalc",
			dataset: { validation: "strict" },
			display: "block",
			scripts: ["form-validator.js"],
			stylesheets: ["form.css"],
		}
		const result = Form(attributes)([])
		assertEquals((result as any).calculation, "formCalc")
		assertEquals((result as any).dataset, { validation: "strict" })
		assertEquals((result as any).display, "block")
		assertEquals((result as any).scripts, ["form-validator.js"])
		assertEquals((result as any).stylesheets, ["form.css"])
	})
})
