import { assertEquals } from "@std/assert"

import InputFile from "../../../../../../../constructors/elements/flow/interactive/Input/InputFile/index.ts"

Deno.test("InputFile constructor", async (t) => {
	await t.step("should create an input element with type='file'", () => {
		const result = InputFile({})
		assertEquals(result.tag, "input")
		assertEquals(result.attributes.type, "file")
		assertEquals(result.children, [])
	})

	await t.step("should accept form attributes", () => {
		const attributes = {
			form: "fileForm",
			name: "upload",
			required: true,
		}
		const result = InputFile(attributes)
		assertEquals((result.attributes as any).form, "fileForm")
		assertEquals((result.attributes as any).name, "upload")
		assertEquals((result.attributes as any).required, true)
	})

	await t.step("should accept file input attributes", () => {
		const attributes = {
			accept: "image/*",
			multiple: true,
			capture: "environment",
		}
		const result = InputFile(attributes)
		assertEquals((result.attributes as any).accept, "image/*")
		assertEquals((result.attributes as any).multiple, true)
		assertEquals((result.attributes as any).capture, "environment")
	})

	await t.step("should accept global attributes", () => {
		const attributes = {
			id: "file-input",
			class: "form-control file-upload",
			tabindex: "0",
		}
		const result = InputFile(attributes)
		assertEquals((result.attributes as any).id, "file-input")
		assertEquals((result.attributes as any).class, "form-control file-upload")
		assertEquals((result.attributes as any).tabindex, "0")
	})

	await t.step("should filter out invalid attributes", () => {
		const attributes = {
			name: "upload",
			invalidattr: "should be removed",
			checked: true, // invalid for file input
			minlength: 5, // invalid for file input
			maxlength: 10, // invalid for file input
			placeholder: "not valid", // invalid for file input
			min: 0, // invalid for file input
			max: 255, // invalid for file input
			step: 1, // invalid for file input
			value: "file.txt", // invalid for file input
		} as any
		const result = InputFile(attributes)
		assertEquals((result.attributes as any).name, "upload")
		assertEquals((result.attributes as any).invalidattr, undefined)
		assertEquals((result.attributes as any).checked, undefined)
		assertEquals((result.attributes as any).minlength, undefined)
		assertEquals((result.attributes as any).maxlength, undefined)
		assertEquals((result.attributes as any).placeholder, undefined)
		assertEquals((result.attributes as any).min, undefined)
		assertEquals((result.attributes as any).max, undefined)
		assertEquals((result.attributes as any).step, undefined)
		assertEquals((result.attributes as any).value, undefined)
	})

	await t.step("should handle accept attribute with multiple types", () => {
		const attributes = { accept: "image/*,video/*,.pdf" }
		const result = InputFile(attributes)
		assertEquals((result.attributes as any).accept, "image/*,video/*,.pdf")
	})

	await t.step("should handle readonly attribute", () => {
		const attributes = { readonly: true }
		const result = InputFile(attributes)
		assertEquals((result.attributes as any).readonly, true)
	})

	await t.step(
		"should maintain type='file' even if type attribute provided",
		() => {
			const attributes = { type: "text" } as any
			const result = InputFile(attributes)
			assertEquals(result.attributes.type, "file")
		},
	)

	await t.step("should handle special properties", () => {
		const attributes = {
			name: "upload",
			calculation: "fileCalc",
			dataset: { validation: "file" },
			display: "block",
			scripts: ["file-handler.js"],
			stylesheets: ["file.css"],
		}
		const result = InputFile(attributes)
		assertEquals((result as any).calculation, "fileCalc")
		assertEquals((result as any).dataset, { validation: "file" })
		assertEquals((result as any).display, "block")
		assertEquals((result as any).scripts, ["file-handler.js"])
		assertEquals((result as any).stylesheets, ["file.css"])
	})
})
