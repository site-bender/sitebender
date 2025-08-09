import { assertEquals } from "@std/assert"

import TextArea from "../../../../../../constructors/elements/flow/interactive/TextArea/index.ts"

Deno.test("TextArea constructor", async (t) => {
	await t.step("should create a textarea element", () => {
		const result = TextArea({})("")
		assertEquals(result.tag, "textarea")
		assertEquals(result.children, undefined)
	})

	await t.step("should accept textarea-specific attributes", () => {
		const attributes = {
			name: "message",
			rows: 4,
			cols: 50,
			placeholder: "Enter your message",
			maxLength: 500,
			minLength: 10,
			required: true,
			disabled: false,
			readOnly: false,
		}
		const result = TextArea(attributes)("")
		assertEquals(result.tag, "textarea")
		assertEquals(result.attributes.name, "message")
		assertEquals(result.attributes.rows, 4)
		assertEquals(result.attributes.cols, 50)
		assertEquals(result.attributes.placeholder, "Enter your message")
		assertEquals(result.attributes.maxLength, 500)
		assertEquals(result.attributes.minLength, 10)
		assertEquals(result.attributes.required, true)
		assertEquals(result.attributes.disabled, false)
		assertEquals(result.attributes.readOnly, false)
	})

	await t.step("should accept form attributes", () => {
		const attributes = {
			form: "messageForm",
			autoComplete: "on",
			dirName: "message.dir",
			wrap: "soft",
		}
		const result = TextArea(attributes)("")
		assertEquals(result.attributes.form, "messageForm")
		assertEquals(result.attributes.autoComplete, "on")
		assertEquals(result.attributes.dirName, "message.dir")
		assertEquals(result.attributes.wrap, "soft")
	})

	await t.step("should accept global attributes", () => {
		const attributes = {
			id: "textarea-input",
			class: "form-control",
			tabindex: "0",
		}
		const result = TextArea(attributes)("")
		assertEquals(result.tag, "textarea")
		assertEquals(result.attributes.id, "textarea-input")
		assertEquals(result.attributes.class, "form-control")
		assertEquals(result.attributes.tabindex, "0")
	})

	await t.step("should accept text content", () => {
		const content = "Default textarea content"
		const result = TextArea({})(content)
		assertEquals(result.tag, "textarea")
		assertEquals(result.children?.length, 1)
		assertEquals(result.children?.[0].tag, "TextNode")
	})

	await t.step("should handle empty content", () => {
		const result = TextArea({})("")
		assertEquals(result.tag, "textarea")
		assertEquals(result.children, undefined)
	})

	await t.step("should filter out invalid attributes", () => {
		const attributes = {
			name: "message",
			invalidattr: "should be removed",
			onclick: "handleClick()",
		} as any
		const result = TextArea(attributes)("")
		assertEquals(result.attributes.name, "message")
		assertEquals("invalidattr" in result.attributes, false)
		assertEquals("onclick" in result.attributes, false)
	})

	await t.step("should handle special properties", () => {
		const attributes = {
			name: "message",
			calculation: "textareaCalc",
			dataset: { validation: "text" },
			display: "block",
			scripts: ["textarea.js"],
			stylesheets: ["textarea.css"],
		}
		const result = TextArea(attributes)("")
		assertEquals(result.tag, "textarea")
		assertEquals(result.calculation, "textareaCalc")
		assertEquals(result.dataset, { validation: "text" })
		assertEquals(result.display, "block")
		assertEquals(result.scripts, ["textarea.js"])
		assertEquals(result.stylesheets, ["textarea.css"])
	})
})
