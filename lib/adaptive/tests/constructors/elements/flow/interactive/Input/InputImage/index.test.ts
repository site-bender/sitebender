import { assertEquals } from "@std/assert"

import InputImage from "../../../../../../../constructors/elements/flow/interactive/Input/InputImage/index.ts"

Deno.test("InputImage constructor", async (t) => {
	await t.step("should create an input element with type='image'", () => {
		const result = InputImage({})
		assertEquals(result.tag, "input")
		assertEquals(result.attributes.type, "image")
		assertEquals(result.children, [])
	})

	await t.step("should accept form attributes", () => {
		const attributes = {
			form: "imageForm",
			name: "imageButton",
			src: "/images/submit.png",
			alt: "Submit Button",
		}
		const result = InputImage(attributes)
		assertEquals((result.attributes as any).form, "imageForm")
		assertEquals((result.attributes as any).name, "imageButton")
		assertEquals((result.attributes as any).src, "/images/submit.png")
		assertEquals((result.attributes as any).alt, "Submit Button")
	})

	await t.step("should accept image-specific attributes", () => {
		const attributes = {
			src: "/images/button.png",
			alt: "Image Button",
			width: 100,
			height: 50,
			formaction: "/submit",
			formenctype: "multipart/form-data",
			formmethod: "post",
			formnovalidate: true,
			formtarget: "_blank",
		}
		const result = InputImage(attributes)
		assertEquals((result.attributes as any).src, "/images/button.png")
		assertEquals((result.attributes as any).alt, "Image Button")
		assertEquals((result.attributes as any).width, 100)
		assertEquals((result.attributes as any).height, 50)
		assertEquals((result.attributes as any).formaction, "/submit")
		assertEquals((result.attributes as any).formenctype, "multipart/form-data")
		assertEquals((result.attributes as any).formmethod, "post")
		assertEquals((result.attributes as any).formnovalidate, true)
		assertEquals((result.attributes as any).formtarget, "_blank")
	})

	await t.step("should accept global attributes", () => {
		const attributes = {
			id: "image-input",
			class: "image-button",
			tabindex: "0",
		}
		const result = InputImage(attributes)
		assertEquals((result.attributes as any).id, "image-input")
		assertEquals((result.attributes as any).class, "image-button")
		assertEquals((result.attributes as any).tabindex, "0")
	})

	await t.step("should filter out invalid attributes", () => {
		const attributes = {
			name: "imageButton",
			invalidattr: "should be removed",
			checked: true, // invalid for image input
			minlength: 5, // invalid for image input
			maxlength: 10, // invalid for image input
			placeholder: "not valid", // invalid for image input
			min: 0, // invalid for image input
			max: 255, // invalid for image input
			step: 1, // invalid for image input
			required: true, // invalid for image input
			readonly: true, // invalid for image input
			value: "invalid", // invalid for image input
		} as any
		const result = InputImage(attributes)
		assertEquals((result.attributes as any).name, "imageButton")
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
		assertEquals((result.attributes as any).value, undefined)
	})

	await t.step("should handle src attribute", () => {
		const attributes = { src: "/images/custom-button.png" }
		const result = InputImage(attributes)
		assertEquals((result.attributes as any).src, "/images/custom-button.png")
	})

	await t.step("should handle alt attribute", () => {
		const attributes = { alt: "Custom Image Button" }
		const result = InputImage(attributes)
		assertEquals((result.attributes as any).alt, "Custom Image Button")
	})

	await t.step("should handle width and height attributes", () => {
		const attributes = { width: 200, height: 100 }
		const result = InputImage(attributes)
		assertEquals((result.attributes as any).width, 200)
		assertEquals((result.attributes as any).height, 100)
	})

	await t.step(
		"should maintain type='image' even if type attribute provided",
		() => {
			const attributes = { type: "text" } as any
			const result = InputImage(attributes)
			assertEquals(result.attributes.type, "image")
		},
	)

	await t.step("should handle special properties", () => {
		const attributes = {
			name: "imageButton",
			calculation: "imageCalc",
			dataset: { validation: "image" },
			display: "block",
			scripts: ["image-handler.js"],
			stylesheets: ["image.css"],
		}
		const result = InputImage(attributes)
		assertEquals((result as any).calculation, "imageCalc")
		assertEquals((result as any).dataset, { validation: "image" })
		assertEquals((result as any).display, "block")
		assertEquals((result as any).scripts, ["image-handler.js"])
		assertEquals((result as any).stylesheets, ["image.css"])
	})
})
