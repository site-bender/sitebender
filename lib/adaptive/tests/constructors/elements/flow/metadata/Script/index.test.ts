import { assertEquals } from "@std/assert"

import Script from "../../../../../../constructors/elements/flow/metadata/Script/index.ts"

Deno.test("Script constructor", async (t) => {
	await t.step("should create a script element", () => {
		const result = Script({})([])
		assertEquals(result.tag, "Script")
		assertEquals(result.children, [])
	})

	await t.step("should accept script-specific attributes", () => {
		const attributes = {
			src: "/js/app.js",
			type: "module",
			async: true,
			defer: true,
			crossorigin: "anonymous",
			integrity: "sha384-abc123",
			referrerpolicy: "no-referrer",
			nomodule: true,
		}
		const result = Script(attributes)([])
		assertEquals((result.attributes as any).src, "/js/app.js")
		assertEquals((result.attributes as any).type, "module")
		assertEquals((result.attributes as any).async, true)
		assertEquals((result.attributes as any).defer, true)
		assertEquals((result.attributes as any).crossorigin, "anonymous")
		assertEquals((result.attributes as any).integrity, "sha384-abc123")
		assertEquals((result.attributes as any).referrerpolicy, "no-referrer")
		assertEquals((result.attributes as any).nomodule, true)
	})

	await t.step("should accept global attributes", () => {
		const attributes = {
			id: "main-script",
			class: "app-script",
		}
		const result = Script(attributes)([])
		assertEquals((result.attributes as any).id, "main-script")
		assertEquals((result.attributes as any).class, "app-script")
	})

	await t.step("should accept script content as children", () => {
		const children = ["console.log('Hello World');"]
		const result = Script({})(children)
		assertEquals(result.children.length, 1)
		assertEquals(result.children[0], "console.log('Hello World');")
	})

	await t.step("should handle inline script with JavaScript code", () => {
		const children = [
			"function init() { console.log('initialized'); }",
			"window.addEventListener('load', init);",
		]
		const result = Script({})(children)
		assertEquals(result.children.length, 2)
		assertEquals(
			result.children[0],
			"function init() { console.log('initialized'); }",
		)
		assertEquals(result.children[1], "window.addEventListener('load', init);")
	})

	await t.step("should filter out invalid attributes", () => {
		const attributes = {
			src: "/js/app.js",
			invalidattr: "should be removed",
			onclick: "handleClick()", // event handler attributes should be filtered
		} as any
		const result = Script(attributes)([])
		assertEquals((result.attributes as any).src, "/js/app.js")
		assertEquals((result.attributes as any).invalidattr, undefined)
		assertEquals((result.attributes as any).onclick, undefined)
	})

	await t.step("should handle empty children array", () => {
		const result = Script({})([])
		assertEquals(result.children, [])
	})

	await t.step("should handle external script with src", () => {
		const attributes = { src: "https://cdn.example.com/lib.js" }
		const result = Script(attributes)([])
		assertEquals(
			(result.attributes as any).src,
			"https://cdn.example.com/lib.js",
		)
		assertEquals(result.children, [])
	})

	await t.step(
		"should handle type attribute for different script types",
		() => {
			const attributes = { type: "application/json" }
			const children = ['{"config": {"theme": "dark"}}']
			const result = Script(attributes)(children)
			assertEquals((result.attributes as any).type, "application/json")
			assertEquals(result.children[0], '{"config": {"theme": "dark"}}')
		},
	)

	await t.step("should handle special properties", () => {
		const attributes = {
			src: "/js/app.js",
			calculation: "scriptCalc",
			dataset: { validation: "script" },
			display: "none",
			scripts: ["dependencies.js"],
			stylesheets: ["script.css"],
		}
		const result = Script(attributes)([])
		assertEquals((result as any).calculation, "scriptCalc")
		assertEquals((result as any).dataset, { validation: "script" })
		assertEquals((result as any).display, "none")
		assertEquals((result as any).scripts, ["dependencies.js"])
		assertEquals((result as any).stylesheets, ["script.css"])
	})
})
