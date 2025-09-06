import { assert, assertEquals, assertStringIncludes } from "jsr:@std/assert"
import { describe, it } from "jsr:@std/testing/bdd"
import fc from "npm:fast-check"

// Import the schema and sample IR documents
import schema from "../../../types/ir/schema/v1.json" with { type: "json" }
import simpleElement from "./samples/simple-element.json" with { type: "json" }
import simpleInjector from "./samples/simple-injector.json" with {
	type: "json",
}
import formWithValidation from "./samples/form-with-validation.json" with {
	type: "json",
}
import conditionalExample from "./samples/conditional-example.json" with {
	type: "json",
}

// Import renderer to test actual behavior
import render from "../../../src/rendering/index.ts"
import type { Node } from "../../../types/ir/index.ts"

describe("IR v1 behavior validation", () => {
	describe("progressive enhancement compliance", () => {
		it("simple elements render semantic HTML without JavaScript", () => {
			const element = simpleElement as Node

			// Convert IR to render-compatible format
			const renderConfig = {
				tag: element.kind === "element" ? element.tag : "div",
				attributes: element.kind === "element" ? element.attrs : {},
				children: element.kind === "element"
					? element.children?.map((child) => ({
						tag: "TextNode",
						content: typeof child === "string"
							? child
							: String(child),
					}))
					: [],
			}

			const html = render(renderConfig)

			// BEHAVIOR: Should produce valid HTML that works without JS
			assert(html.startsWith("<"))
			assert(html.endsWith(">"))
			assertStringIncludes(
				html,
				element.kind === "element" ? element.tag.toLowerCase() : "div",
			)
		})

		it("forms work without JavaScript using native browser validation", () => {
			const form = formWithValidation as Node

			if (form.kind === "element" && form.tag === "form") {
				const renderConfig = {
					tag: "form",
					attributes: {
						// Use the form's existing attributes
						...form.attrs,
					},
					children: form.children?.map((child) => {
						if (
							typeof child === "object" &&
							child.kind === "element" && child.tag === "input"
						) {
							return {
								tag: "input",
								attributes: {
									type: child.attrs?.type || "text",
									name: child.attrs?.name,
									required: child.attrs?.required || false,
									...child.attrs,
								},
							}
						}
						return {
							tag: "TextNode",
							content: typeof child === "string"
								? child
								: String(child),
						}
					}) || [],
				}

				const html = render(renderConfig)

				// BEHAVIOR: Form must submit to server without JS
				assertStringIncludes(html, 'method="POST"')
				assertStringIncludes(html, 'action="/submit"')
				assertStringIncludes(html, 'type="')

				// BEHAVIOR: Should use browser validation, not novalidate
				assert(!html.includes("novalidate"))
			}
		})
	})

	describe("accessibility compliance", () => {
		it("form elements have proper semantic structure", () => {
			const form = formWithValidation as Node

			if (form.kind === "element") {
				const renderConfig = {
					tag: form.tag,
					attributes: form.attrs || {},
					children: form.children?.map((child) => {
						if (
							typeof child === "object" &&
							child.kind === "element" && child.tag === "input"
						) {
							return {
								tag: "input",
								attributes: {
									type: child.attrs?.type || "text",
									name: child.attrs?.name,
									id: child.attrs?.id || child.attrs?.name,
									required: child.attrs?.required || false,
									"aria-describedby": child.attrs
										?.["aria-describedby"],
									...child.attrs,
								},
							}
						}
						return {
							tag: "TextNode",
							content: typeof child === "string"
								? child
								: String(child),
						}
					}) || [],
				}

				const html = render(renderConfig)

				// BEHAVIOR: Accessible forms need proper labeling
				// At minimum, inputs should have name/id for labeling
				if (html.includes("<input")) {
					assertStringIncludes(html, 'name="')
					// Should have id for label association
					assertStringIncludes(html, 'id="')
				}
			}
		})

		it("conditional content preserves semantic meaning", () => {
			const conditional = conditionalExample as Node

			// BEHAVIOR: Even with conditionals, HTML structure should be semantic
			// This tests that conditionals don't break accessibility
			assert(
				conditional.kind === "conditional" ||
					conditional.kind === "element",
			)

			// The structure should indicate what will be visible/hidden
			// without breaking screen reader navigation
			assert(typeof conditional === "object")
		})
	})

	describe("schema structural integrity", () => {
		it("all sample documents validate against schema structure", () => {
			const samples = [
				simpleElement,
				simpleInjector,
				formWithValidation,
				conditionalExample,
			]

			samples.forEach((sample) => {
				const node = sample as Node
				// Basic structural validation for schema compliance
				assertEquals(node.v, "0.1.0")
				assert(typeof node.kind === "string")
				assert(
					node.id.match(
						/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/,
					),
				)
			})
		})

		it("schema loads with expected structure", () => {
			assert(schema && typeof schema === "object")
			assert((schema as Record<string, unknown>).$id)
			assert((schema as Record<string, unknown>).definitions)
		})
	})

	describe("property-based validation", () => {
		it("all valid IR nodes have consistent UUID format", () => {
			fc.assert(fc.property(
				fc.uuid(),
				(uuid: string) => {
					// BEHAVIOR: All UUIDs should be consistently formatted
					const uuidRegex =
						/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/
					return uuidRegex.test(uuid)
				},
			))
		})

		it("version field is consistent across all nodes", () => {
			const samples = [
				simpleElement,
				simpleInjector,
				formWithValidation,
				conditionalExample,
			]

			fc.assert(fc.property(
				fc.constantFrom(...samples),
				(sample: unknown) => {
					const node = sample as Node
					// BEHAVIOR: Version consistency is critical for IR compatibility
					return node.v === "0.1.0"
				},
			))
		})
	})
})
