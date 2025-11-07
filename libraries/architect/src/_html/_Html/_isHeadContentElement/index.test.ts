import { assertEquals } from "@std/assert"
import _isHeadContentElement from "./index.ts"

Deno.test(
	"_isHeadContentElement predicate",
	async function testIsHeadContentElement(t) {
		await t.step(
			"returns true for TITLE element",
			function returnsTrueForTitle() {
				const titleElement = {
					_tag: "element" as const,
					tagName: "TITLE",
					attributes: {},
					children: [],
				}

				assertEquals(_isHeadContentElement(titleElement), true)
			},
		)

		await t.step(
			"returns true for META element",
			function returnsTrueForMeta() {
				const metaElement = {
					_tag: "element" as const,
					tagName: "META",
					attributes: {},
					children: [],
				}

				assertEquals(_isHeadContentElement(metaElement), true)
			},
		)

		await t.step(
			"returns false for DIV element",
			function returnsFalseForDiv() {
				const divElement = {
					_tag: "element" as const,
					tagName: "DIV",
					attributes: {},
					children: [],
				}

				assertEquals(_isHeadContentElement(divElement), false)
			},
		)
	},
)
