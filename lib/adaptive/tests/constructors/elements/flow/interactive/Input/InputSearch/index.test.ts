import { assertEquals } from "@std/assert"

import InputSearch from "../../../../../../../constructors/elements/flow/interactive/Input/InputSearch/index.ts"

Deno.test("InputSearch constructor", async (t) => {
	await t.step("should create an input element with type='search'", () => {
		const result = InputSearch({})
		assertEquals(result.tag, "input")
		assertEquals(result.attributes.type, "search")
		assertEquals(result.children, [])
	})

	await t.step("should accept form attributes", () => {
		const attributes = {
			form: "searchForm",
			name: "query",
			autocomplete: "off",
			required: false,
		}
		const result = InputSearch(attributes)
		assertEquals((result.attributes as any).form, "searchForm")
		assertEquals((result.attributes as any).name, "query")
		assertEquals((result.attributes as any).autocomplete, "off")
		assertEquals((result.attributes as any).required, false)
	})

	await t.step("should accept text input attributes", () => {
		const attributes = {
			minlength: 1,
			maxlength: 200,
			placeholder: "Search...",
			readonly: false,
			pattern: "[a-zA-Z0-9\\s]+",
			size: 30,
		}
		const result = InputSearch(attributes)
		assertEquals((result.attributes as any).minlength, 1)
		assertEquals((result.attributes as any).maxlength, 200)
		assertEquals((result.attributes as any).placeholder, "Search...")
		assertEquals((result.attributes as any).readonly, false)
		assertEquals((result.attributes as any).pattern, "[a-zA-Z0-9\\s]+")
		assertEquals((result.attributes as any).size, 30)
	})

	await t.step("should accept global attributes", () => {
		const attributes = {
			id: "search-input",
			class: "form-control search-box",
			tabindex: "0",
		}
		const result = InputSearch(attributes)
		assertEquals((result.attributes as any).id, "search-input")
		assertEquals((result.attributes as any).class, "form-control search-box")
		assertEquals((result.attributes as any).tabindex, "0")
	})

	await t.step("should filter out invalid attributes", () => {
		const attributes = {
			name: "query",
			invalidattr: "should be removed",
			checked: true, // invalid for search input
			multiple: true, // invalid for search input
		} as any
		const result = InputSearch(attributes)
		assertEquals((result.attributes as any).name, "query")
		assertEquals((result.attributes as any).invalidattr, undefined)
		assertEquals((result.attributes as any).checked, undefined)
		assertEquals((result.attributes as any).multiple, undefined)
	})

	await t.step("should handle value attribute", () => {
		const attributes = { value: "search term" }
		const result = InputSearch(attributes)
		assertEquals((result.attributes as any).value, "search term")
	})

	await t.step("should handle dirname attribute", () => {
		const attributes = {
			name: "query",
			dirname: "query.dir",
		}
		const result = InputSearch(attributes)
		assertEquals((result.attributes as any).dirname, "query.dir")
	})

	await t.step("should handle list attribute for datalist", () => {
		const attributes = { list: "search-suggestions" }
		const result = InputSearch(attributes)
		assertEquals((result.attributes as any).list, "search-suggestions")
	})

	await t.step(
		"should maintain type='search' even if type attribute provided",
		() => {
			const attributes = { type: "text" } as any
			const result = InputSearch(attributes)
			assertEquals(result.attributes.type, "search")
		},
	)

	await t.step("should handle special properties", () => {
		const attributes = {
			name: "query",
			calculation: "searchCalc",
			dataset: { validation: "search" },
			display: "block",
			scripts: ["search-handler.js"],
			stylesheets: ["search.css"],
		}
		const result = InputSearch(attributes)
		assertEquals((result as any).calculation, "searchCalc")
		assertEquals((result as any).dataset, { validation: "search" })
		assertEquals((result as any).display, "block")
		assertEquals((result as any).scripts, ["search-handler.js"])
		assertEquals((result as any).stylesheets, ["search.css"])
	})
})
