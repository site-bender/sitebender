import { assertEquals } from "jsr:@std/assert"
import _isBodyContentElement from "./index.ts"

Deno.test(
	"_isBodyContentElement predicate",
	async function testIsBodyContentElement(t) {
		await t.step(
			"returns true for DIV element",
			function returnsTrueForDiv() {
				const divElement = {
					_tag: "element" as const,
					tagName: "DIV",
					attributes: {},
					children: [],
				}

				assertEquals(_isBodyContentElement(divElement), true)
			},
		)

		await t.step(
			"returns true for MAIN element",
			function returnsTrueForMain() {
				const mainElement = {
					_tag: "element" as const,
					tagName: "MAIN",
					attributes: {},
					children: [],
				}

				assertEquals(_isBodyContentElement(mainElement), true)
			},
		)

		await t.step(
			"returns false for TITLE element",
			function returnsFalseForTitle() {
				const titleElement = {
					_tag: "element" as const,
					tagName: "TITLE",
					attributes: {},
					children: [],
				}

				assertEquals(_isBodyContentElement(titleElement), false)
			},
		)
	},
)
