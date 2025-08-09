import { assertEquals } from "@std/assert"

import InputUrl from "../../../../../../../constructors/elements/flow/interactive/Input/InputUrl/index.ts"

Deno.test("InputUrl constructor", async (t) => {
	await t.step("should create an input element with type='url'", () => {
		const result = InputUrl({})
		assertEquals(result.tag, "input")
		assertEquals(result.attributes.type, "url")
		assertEquals(result.children, [])
	})

	await t.step("should accept form attributes", () => {
		const attributes = {
			form: "linkForm",
			name: "website",
			autocomplete: "url",
			required: true,
		}
		const result = InputUrl(attributes)
		assertEquals((result.attributes as any).form, "linkForm")
		assertEquals((result.attributes as any).name, "website")
		assertEquals((result.attributes as any).autocomplete, "url")
		assertEquals((result.attributes as any).required, true)
	})

	await t.step("should accept text input attributes", () => {
		const attributes = {
			minlength: 10,
			maxlength: 2048,
			placeholder: "https://example.com",
			readonly: false,
			pattern: "https?://.+",
			size: 50,
		}
		const result = InputUrl(attributes)
		assertEquals((result.attributes as any).minlength, 10)
		assertEquals((result.attributes as any).maxlength, 2048)
		assertEquals((result.attributes as any).placeholder, "https://example.com")
		assertEquals((result.attributes as any).readonly, false)
		assertEquals((result.attributes as any).pattern, "https?://.+")
		assertEquals((result.attributes as any).size, 50)
	})

	await t.step("should accept global attributes", () => {
		const attributes = {
			id: "url-input",
			class: "form-control",
			tabindex: "0",
		}
		const result = InputUrl(attributes)
		assertEquals((result.attributes as any).id, "url-input")
		assertEquals((result.attributes as any).class, "form-control")
		assertEquals((result.attributes as any).tabindex, "0")
	})

	await t.step("should filter out invalid attributes", () => {
		const attributes = {
			name: "website",
			invalidattr: "should be removed",
			checked: true, // invalid for url input
			multiple: true, // invalid for url input
		} as any
		const result = InputUrl(attributes)
		assertEquals((result.attributes as any).name, "website")
		assertEquals((result.attributes as any).invalidattr, undefined)
		assertEquals((result.attributes as any).checked, undefined)
		assertEquals((result.attributes as any).multiple, undefined)
	})

	await t.step("should handle value attribute", () => {
		const attributes = { value: "https://example.com" }
		const result = InputUrl(attributes)
		assertEquals((result.attributes as any).value, "https://example.com")
	})

	await t.step("should handle dirname attribute", () => {
		const attributes = {
			name: "website",
			dirname: "website.dir",
		}
		const result = InputUrl(attributes)
		assertEquals((result.attributes as any).dirname, "website.dir")
	})

	await t.step("should handle list attribute for datalist", () => {
		const attributes = { list: "url-suggestions" }
		const result = InputUrl(attributes)
		assertEquals((result.attributes as any).list, "url-suggestions")
	})

	await t.step(
		"should maintain type='url' even if type attribute provided",
		() => {
			const attributes = { type: "text" } as any
			const result = InputUrl(attributes)
			assertEquals(result.attributes.type, "url")
		},
	)

	await t.step("should handle special properties", () => {
		const attributes = {
			name: "website",
			calculation: "urlCalc",
			dataset: { validation: "url" },
			display: "block",
			scripts: ["url-validator.js"],
			stylesheets: ["url.css"],
		}
		const result = InputUrl(attributes)
		assertEquals((result as any).calculation, "urlCalc")
		assertEquals((result as any).dataset, { validation: "url" })
		assertEquals((result as any).display, "block")
		assertEquals((result as any).scripts, ["url-validator.js"])
		assertEquals((result as any).stylesheets, ["url.css"])
	})
})
