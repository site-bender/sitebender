import { assert, assertEquals, assertStringIncludes } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"
import fc from "npm:fast-check"

import renderIrToHtml from "../../../../src/rendering/renderIrToHtml/index.ts"
import type { Node } from "../../../../types/ir/index.ts"

describe("IR to HTML renderer behavior", () => {
	describe("security compliance", () => {
		it("escapes malicious attribute values to prevent XSS", () => {
			const maliciousNode: Node = {
				v: "0.1.0",
				id: "test-id",
				kind: "element",
				tag: "div",
				attrs: {
					"data-user": "<script>alert('XSS')</script>",
					"title": 'Tom & Jerry\'s "Adventure"',
					"onclick": "javascript:void(0)",
				},
				children: [],
			}

			const html = renderIrToHtml(maliciousNode)

			// BEHAVIOR: Should escape all dangerous characters in attributes
			assertStringIncludes(html, "&lt;script&gt;")
			assertStringIncludes(html, "&amp;")
			assertStringIncludes(html, "&quot;")
			assertStringIncludes(html, "&#39;")

			// BEHAVIOR: Should NOT contain unescaped dangerous content
			assert(!html.includes("<script>"))
			assert(!html.includes("javascript:"))
		})

		it("escapes malicious text content to prevent XSS", () => {
			const maliciousTextNode: Node = {
				v: "0.1.0",
				id: "text-1",
				kind: "text",
				content: "<script>document.cookie</script>",
			}

			const ampersandTextNode: Node = {
				v: "0.1.0",
				id: "text-2",
				kind: "text",
				content: "Tom & Jerry",
			}

			const quoteTextNode: Node = {
				v: "0.1.0",
				id: "text-3",
				kind: "text",
				content: 'She said "Hello"',
			}

			const maliciousNode: Node = {
				v: "0.1.0",
				id: "test-id",
				kind: "element",
				tag: "p",
				attrs: {},
				children: [maliciousTextNode, ampersandTextNode, quoteTextNode],
			}

			const html = renderIrToHtml(maliciousNode)

			// BEHAVIOR: Should escape dangerous text content
			assertStringIncludes(html, "&lt;script&gt;")
			assertStringIncludes(html, "&amp;")
			assertStringIncludes(html, "&quot;")

			// BEHAVIOR: Should NOT execute scripts
			assert(!html.includes("<script>"))
		})
	})

	describe("progressive enhancement compliance", () => {
		it("renders semantic HTML that works without JavaScript", () => {
			const inputNode: Node = {
				v: "0.1.0",
				id: "input-id",
				kind: "element",
				tag: "input",
				attrs: {
					type: "email",
					name: "email",
					required: true,
				},
				children: [],
			}

			const formNode: Node = {
				v: "0.1.0",
				id: "form-id",
				kind: "element",
				tag: "form",
				attrs: {
					method: "POST",
					action: "/submit",
				},
				children: [inputNode],
			}

			const html = renderIrToHtml(formNode)

			// BEHAVIOR: Form must work without JS
			assertStringIncludes(html, '<form method="POST" action="/submit">')
			assertStringIncludes(html, 'type="email"')
			assertStringIncludes(html, 'required="true"')
			assertStringIncludes(html, "<input")
		})

		it("properly handles self-closing elements", () => {
			const brNode: Node = {
				v: "0.1.0",
				id: "br-id",
				kind: "element",
				tag: "br",
				attrs: {},
				children: [],
			}

			const html = renderIrToHtml(brNode)

			// BEHAVIOR: Self-closing elements should use proper syntax
			assertEquals(html, "<br />")
		})
	})

	describe("structural integrity", () => {
		it("renders nested elements correctly", () => {
			const textNode: Node = {
				v: "0.1.0",
				id: "text-id",
				kind: "text",
				content: "Hello World",
			}

			const pNode: Node = {
				v: "0.1.0",
				id: "inner-id",
				kind: "element",
				tag: "p",
				attrs: {},
				children: [textNode],
			}

			const nestedNode: Node = {
				v: "0.1.0",
				id: "outer-id",
				kind: "element",
				tag: "div",
				attrs: { class: "container" },
				children: [pNode],
			}

			const html = renderIrToHtml(nestedNode)

			// BEHAVIOR: Should maintain proper nesting structure
			assertStringIncludes(html, '<div class="container">')
			assertStringIncludes(html, "<p>Hello World</p>")
			assertStringIncludes(html, "</div>")
		})

		it("handles empty attributes and children gracefully", () => {
			const emptyNode: Node = {
				v: "0.1.0",
				id: "empty-id",
				kind: "element",
				tag: "div",
				attrs: {},
				children: [],
			}

			const html = renderIrToHtml(emptyNode)

			// BEHAVIOR: Should render clean empty elements
			assertEquals(html, "<div></div>")
		})
	})

	describe("property-based validation", () => {
		it("always produces valid HTML structure", () => {
			fc.assert(fc.property(
				fc.string({ minLength: 1, maxLength: 20 }).filter((s) =>
					/^[a-zA-Z][a-zA-Z0-9]*$/.test(s)
				),
				fc.dictionary(fc.string(), fc.string()),
				(tag: string, attrs: Record<string, string>) => {
					const node: Node = {
						v: "0.1.0",
						id: "prop-test-id",
						kind: "element",
						tag,
						attrs,
						children: [],
					}

					const html = renderIrToHtml(node)

					// BEHAVIOR: Should always start and end with proper tags
					const expectedStart = `<${tag.toLowerCase()}`
					const expectedEnd = `</${tag.toLowerCase()}>`

					return html.startsWith(expectedStart) &&
						html.endsWith(expectedEnd)
				},
			))
		})

		it("never includes unescaped dangerous characters in text content", () => {
			fc.assert(fc.property(
				fc.string(),
				(dangerousContent: string) => {
					const textNode: Node = {
						v: "0.1.0",
						id: "text-test-id",
						kind: "text",
						content: dangerousContent,
					}

					const containerNode: Node = {
						v: "0.1.0",
						id: "danger-test-id",
						kind: "element",
						tag: "div",
						attrs: {},
						children: [textNode],
					}

					const html = renderIrToHtml(containerNode)

					// BEHAVIOR: Should never contain unescaped < or > in content
					const contentMatch = html.match(/<div[^>]*>(.*)<\/div>/)
					if (contentMatch) {
						const content = contentMatch[1]
						// Content should not have raw < or > characters
						return !content.includes("<") && !content.includes(">")
					}
					return true
				},
			))
		})
	})
})
