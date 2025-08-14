import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import * as fc from "fast-check"
import { DOMParser, Element, HTMLDocument } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"
import getValue from "./index.ts"

// Set up global document for getValue to use
let globalDocument: HTMLDocument

// Helper to create and set a real DOM document
const setupDocument = (html: string): HTMLDocument => {
	const parser = new DOMParser()
	const doc = parser.parseFromString(
		`<!DOCTYPE html><html><body>${html}</body></html>`,
		"text/html",
	)
	if (!doc) throw new Error("Failed to create document")
	
	// Set global document for getValue to access
	globalDocument = doc as HTMLDocument
	;(globalThis as any).document = doc
	
	return doc as HTMLDocument
}

// Clean up after each test
const cleanupDocument = () => {
	delete (globalThis as any).document
}

describe("getValue with real DOM implementation", () => {
	describe("when getting values from input elements", () => {
		it("gets value from text input", () => {
			const doc = setupDocument(`<input id="name" type="text" value="John Doe" />`)
			
			const result = getValue({ id: "name" })()
			
			expect(result).toEqual({ right: "John Doe" })
			cleanupDocument()
		})

		it("gets value from input by name attribute", () => {
			const doc = setupDocument(`<input name="username" type="text" value="alice123" />`)
			
			const result = getValue({ name: "username", tag: "input" })()
			
			expect(result).toEqual({ right: "alice123" })
			cleanupDocument()
		})

		it("gets checked state from checkbox", () => {
			setupDocument(`
				<input id="agree" type="checkbox" checked />
				<input id="disagree" type="checkbox" />
			`)
			
			const checkedResult = getValue({ id: "agree" })()
			const uncheckedResult = getValue({ id: "disagree" })()
			
			// Checkbox returns "on" when checked, empty when not
			expect(checkedResult).toEqual({ right: "on" })
			expect(uncheckedResult).toEqual({ right: "" })
			cleanupDocument()
		})

		it("gets value from number input", () => {
			setupDocument(`<input id="age" type="number" value="25" />`)
			
			const result = getValue({ id: "age" })()
			
			expect(result).toEqual({ right: "25" })
			cleanupDocument()
		})

		it("gets value from email input", () => {
			setupDocument(`<input id="email" type="email" value="test@example.com" />`)
			
			const result = getValue({ id: "email" })()
			
			expect(result).toEqual({ right: "test@example.com" })
			cleanupDocument()
		})

		it("handles empty input values", () => {
			setupDocument(`<input id="empty" type="text" value="" />`)
			
			const result = getValue({ id: "empty" })()
			
			expect(result).toEqual({ right: "" })
			cleanupDocument()
		})
	})

	describe("when getting values from select elements", () => {
		it("gets selected option value", () => {
			setupDocument(`
				<select id="country">
					<option value="us">United States</option>
					<option value="uk" selected>United Kingdom</option>
					<option value="ca">Canada</option>
				</select>
			`)
			
			const result = getValue({ id: "country" })()
			
			expect(result).toEqual({ right: "uk" })
			cleanupDocument()
		})

		it("gets first option when none selected", () => {
			setupDocument(`
				<select id="color">
					<option value="red">Red</option>
					<option value="blue">Blue</option>
				</select>
			`)
			
			const result = getValue({ id: "color" })()
			
			// Should get first option by default
			expect(result).toEqual({ right: "red" })
			cleanupDocument()
		})
	})

	describe("when getting values from textarea elements", () => {
		it("gets text content from textarea", () => {
			setupDocument(`
				<textarea id="message">Hello World
This is a test</textarea>
			`)
			
			const result = getValue({ id: "message" })()
			
			expect(result).toEqual({ right: "Hello World\nThis is a test" })
			cleanupDocument()
		})

		it("handles empty textarea", () => {
			setupDocument(`<textarea id="empty"></textarea>`)
			
			const result = getValue({ id: "empty" })()
			
			expect(result).toEqual({ right: "" })
			cleanupDocument()
		})
	})

	describe("when getting values from data elements", () => {
		it("gets value from data element", () => {
			setupDocument(`<data id="product" value="12345">Product Name</data>`)
			
			const result = getValue({ id: "product" })()
			
			expect(result).toEqual({ right: "12345" })
			cleanupDocument()
		})
	})

	describe("when getting values from table elements", () => {
		it("gets dataset value from table", () => {
			setupDocument(`
				<table id="stats" data-value="100">
					<tr><td>Data</td></tr>
				</table>
			`)
			
			const result = getValue({ id: "stats" })()
			
			expect(result).toEqual({ right: "100" })
			cleanupDocument()
		})
	})

	describe("when getting values from generic elements", () => {
		it("gets dataset value when available", () => {
			setupDocument(`<div id="item" data-value="test-value">Content</div>`)
			
			const result = getValue({ id: "item" })()
			
			expect(result).toEqual({ right: "test-value" })
			cleanupDocument()
		})

		it("gets innerHTML when no dataset value", () => {
			setupDocument(`<div id="content">Plain text content</div>`)
			
			const result = getValue({ id: "content" })()
			
			expect(result).toEqual({ right: "Plain text content" })
			cleanupDocument()
		})

		it("gets innerHTML from span elements", () => {
			setupDocument(`<span class="label">Label Text</span>`)
			
			const result = getValue({ selector: ".label" })()
			
			expect(result).toEqual({ right: "Label Text" })
			cleanupDocument()
		})
	})

	describe("when using local values", () => {
		it("returns local value when provided", () => {
			setupDocument(`<input id="field" value="dom-value" />`)
			
			const localValues = { id: "field", value: "local-value" }
			const result = getValue({ id: "field" })(localValues)
			
			// Should prefer local value over DOM
			expect(result).toBe("local-value")
			cleanupDocument()
		})

		it("falls back to DOM when no local value", () => {
			setupDocument(`<input id="field" value="dom-value" />`)
			
			const localValues = { id: "other-field", value: "local-value" }
			const result = getValue({ id: "field" })(localValues)
			
			expect(result).toEqual({ right: "dom-value" })
			cleanupDocument()
		})
	})

	describe("error handling", () => {
		it("returns error when selector is invalid", () => {
			setupDocument(`<div>Test</div>`)
			
			// No selector properties provided
			const result = getValue({})()
			
			expect(result.left).toBeDefined()
			expect(result.left[0].message).toContain("Invalid selector")
			cleanupDocument()
		})

		it("returns error when element not found", () => {
			setupDocument(`<div id="exists">Test</div>`)
			
			const result = getValue({ id: "does-not-exist" })()
			
			expect(result.left).toBeDefined()
			expect(result.left[0].message).toContain("not found")
			cleanupDocument()
		})

		it("returns error when document is not available", () => {
			// Don't set up document
			const result = getValue({ id: "test" })()
			
			expect(result.left).toBeDefined()
			expect(result.left[0].message).toContain("Cannot find window.document")
		})
	})

	describe("complex selector scenarios", () => {
		it("works with complex CSS selectors", () => {
			setupDocument(`
				<form>
					<div class="field-group">
						<input type="text" name="nested" value="nested-value" />
					</div>
				</form>
			`)
			
			const result = getValue({ selector: ".field-group input[name='nested']" })()
			
			expect(result).toEqual({ right: "nested-value" })
			cleanupDocument()
		})

		it("prioritizes id over other selectors", () => {
			setupDocument(`
				<input id="priority" name="also-this" class="and-this" value="found-by-id" />
			`)
			
			const result = getValue({ 
				id: "priority",
				name: "also-this",
				selector: ".and-this"
			})()
			
			expect(result).toEqual({ right: "found-by-id" })
			cleanupDocument()
		})
	})

	describe("property-based tests", () => {
		it("always returns Either type", () => {
			fc.assert(
				fc.property(
					fc.record({
						id: fc.option(fc.string()),
						name: fc.option(fc.string()),
						tag: fc.option(fc.string()),
						selector: fc.option(fc.string()),
					}),
					(config) => {
						setupDocument(`<div id="test">content</div>`)
						const result = getValue(config)()
						
						// Should have either left (error) or right (value)
						expect(result.left || result.right).toBeDefined()
						cleanupDocument()
					},
				),
			)
		})

		it("returns consistent values for same input", () => {
			fc.assert(
				fc.property(
					fc.string({ minLength: 1, maxLength: 100 }),
					fc.string({ minLength: 1, maxLength: 20 }),
					(value, id) => {
						// Create valid HTML id (alphanumeric only)
						const validId = id.replace(/[^a-zA-Z0-9]/g, 'x') || 'test'
						setupDocument(`<input id="${validId}" value="${value.replace(/"/g, '&quot;')}" />`)
						
						const results = Array(5).fill(0).map(() =>
							getValue({ id: validId })()
						)
						
						// All results should be identical
						results.forEach(result => {
							expect(result).toEqual({ right: value })
						})
						cleanupDocument()
					},
				),
			)
		})

		it("handles various HTML structures", () => {
			fc.assert(
				fc.property(
					fc.oneof(
						fc.constant('input'),
						fc.constant('textarea'),
						fc.constant('select'),
						fc.constant('div'),
						fc.constant('span'),
					),
					fc.string({ minLength: 1, maxLength: 50 }),
					(tag, content) => {
						const safeContent = content.replace(/[<>]/g, '')
						let html = ''
						
						switch(tag) {
							case 'input':
								html = `<input id="test" value="${safeContent}" />`
								break
							case 'textarea':
								html = `<textarea id="test">${safeContent}</textarea>`
								break
							case 'select':
								html = `<select id="test"><option value="${safeContent}">Option</option></select>`
								break
							default:
								html = `<${tag} id="test">${safeContent}</${tag}>`
						}
						
						setupDocument(html)
						const result = getValue({ id: "test" })()
						
						expect(result.right).toBeDefined()
						expect(typeof result.right).toBe("string")
						cleanupDocument()
					},
				),
			)
		})
	})

	describe("realistic form scenarios", () => {
		it("handles a complete user registration form", () => {
			setupDocument(`
				<form id="registration">
					<input name="username" type="text" value="johndoe" />
					<input name="email" type="email" value="john@example.com" />
					<input name="password" type="password" value="secret123" />
					<input name="age" type="number" value="30" />
					<select name="country">
						<option value="us">USA</option>
						<option value="uk" selected>UK</option>
					</select>
					<textarea name="bio">Software developer from London</textarea>
					<input name="terms" type="checkbox" checked />
					<input name="newsletter" type="checkbox" />
				</form>
			`)
			
			const formData = {
				username: getValue({ name: "username", tag: "input" })(),
				email: getValue({ name: "email", tag: "input" })(),
				password: getValue({ name: "password", tag: "input" })(),
				age: getValue({ name: "age", tag: "input" })(),
				country: getValue({ name: "country", tag: "select" })(),
				bio: getValue({ name: "bio", tag: "textarea" })(),
				terms: getValue({ name: "terms", tag: "input" })(),
				newsletter: getValue({ name: "newsletter", tag: "input" })(),
			}
			
			expect(formData.username).toEqual({ right: "johndoe" })
			expect(formData.email).toEqual({ right: "john@example.com" })
			expect(formData.password).toEqual({ right: "secret123" })
			expect(formData.age).toEqual({ right: "30" })
			expect(formData.country).toEqual({ right: "uk" })
			expect(formData.bio).toEqual({ right: "Software developer from London" })
			expect(formData.terms).toEqual({ right: "on" })
			expect(formData.newsletter).toEqual({ right: "" })
			
			cleanupDocument()
		})

		it("handles dynamic form with data attributes", () => {
			setupDocument(`
				<div class="product-list">
					<div class="product" data-value="SKU001">
						<span class="name">Product 1</span>
						<data value="29.99">$29.99</data>
					</div>
					<div class="product" data-value="SKU002">
						<span class="name">Product 2</span>
						<data value="49.99">$49.99</data>
					</div>
				</div>
			`)
			
			const product1 = getValue({ selector: ".product" })()
			const price1 = getValue({ selector: ".product data" })()
			
			expect(product1).toEqual({ right: "SKU001" })
			expect(price1).toEqual({ right: "29.99" })
			
			cleanupDocument()
		})
	})
})