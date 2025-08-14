import { assertEquals } from "jsr:@std/assert"
import fc from "npm:fast-check"

import getSelector from "./index.ts"

Deno.test("getSelector basic functionality", async (t) => {
	await t.step("should return selector when provided", () => {
		assertEquals(getSelector({ selector: ".custom-class" }), ".custom-class")
		assertEquals(getSelector({ selector: "#custom-id" }), "#custom-id")
		assertEquals(getSelector({ selector: "div > p" }), "div > p")
	})

	await t.step("should generate ID selector", () => {
		assertEquals(getSelector({ id: "myId" }), "#myId")
		assertEquals(getSelector({ id: "user-profile" }), "#user-profile")
		assertEquals(getSelector({ id: "123" }), "#123")
	})

	await t.step("should generate name selector with tag", () => {
		assertEquals(getSelector({ name: "username", tag: "input" }), "input[name=username]")
		assertEquals(getSelector({ name: "email", tag: "INPUT" }), "input[name=email]")
		assertEquals(getSelector({ name: "message", tag: "TextArea" }), "textarea[name=message]")
	})

	await t.step("should generate name selector without tag", () => {
		assertEquals(getSelector({ name: "username" }), "[name=username]")
		assertEquals(getSelector({ name: "email" }), "[name=email]")
	})

	await t.step("should generate tag selector only", () => {
		assertEquals(getSelector({ tag: "div" }), "div")
		assertEquals(getSelector({ tag: "INPUT" }), "input")
		assertEquals(getSelector({ tag: "TextArea" }), "textarea")
	})

	await t.step("should handle form context", () => {
		assertEquals(getSelector({ form: "myForm", tag: "input" }), "#myForm input")
		assertEquals(getSelector({ form: "loginForm", name: "username", tag: "input" }), "#loginForm input[name=username]")
		assertEquals(getSelector({ form: "contact", id: "email" }), "#email") // ID takes precedence
	})

	await t.step("should handle empty input", () => {
		assertEquals(getSelector({}), "")
		assertEquals(getSelector({ tag: "" }), "")
	})
})

Deno.test("getSelector priority handling", async (t) => {
	await t.step("selector has highest priority", () => {
		assertEquals(getSelector({
			selector: ".override",
			id: "myId",
			name: "myName",
			tag: "input"
		}), ".override")
	})

	await t.step("id has priority over name", () => {
		assertEquals(getSelector({
			id: "myId",
			name: "myName",
			tag: "input"
		}), "#myId")
	})

	await t.step("name has priority over tag alone", () => {
		assertEquals(getSelector({
			name: "myName",
			tag: "input"
		}), "input[name=myName]")
	})
})

Deno.test("getSelector edge cases", async (t) => {
	await t.step("should handle undefined source", () => {
		// @ts-ignore - testing runtime behavior
		assertEquals(getSelector(undefined), "")
	})

	await t.step("should handle null source", () => {
		// @ts-ignore - testing runtime behavior
		assertEquals(getSelector(null), "")
	})

	await t.step("should handle special characters in values", () => {
		assertEquals(getSelector({ id: "my-id_123" }), "#my-id_123")
		assertEquals(getSelector({ name: "field[0]" }), "[name=field[0]]")
		assertEquals(getSelector({ form: "form-1", tag: "input" }), "#form-1 input")
	})

	await t.step("should handle empty strings", () => {
		assertEquals(getSelector({ id: "" }), "")  // Empty id returns empty string
		assertEquals(getSelector({ name: "", tag: "input" }), "input")  // Empty name falls back to tag
		assertEquals(getSelector({ form: "", tag: "input" }), "input")  // Empty form doesn't add prefix
	})
})

Deno.test("getSelector property-based tests", () => {
	fc.assert(fc.property(
		fc.string({ minLength: 1, maxLength: 50 }),
		(selector) => {
			const result = getSelector({ selector })
			assertEquals(result, selector)
		}
	), { numRuns: 100 })

	fc.assert(fc.property(
		fc.string({ minLength: 1, maxLength: 50 }).filter(s => /^[a-zA-Z][a-zA-Z0-9_-]*$/.test(s)),
		(id) => {
			const result = getSelector({ id })
			assertEquals(result, `#${id}`)
		}
	), { numRuns: 100 })

	fc.assert(fc.property(
		fc.string({ minLength: 1, maxLength: 50 }).filter(s => /^[a-zA-Z][a-zA-Z0-9_-]*$/.test(s)),
		fc.string({ minLength: 1, maxLength: 20 }).filter(s => /^[a-zA-Z][a-zA-Z0-9_-]*$/.test(s)),
		fc.string({ minLength: 1, maxLength: 20 }).filter(s => /^[a-zA-Z]+$/.test(s)),
		(name, form, tag) => {
			const result = getSelector({ name, form, tag })
			assertEquals(result, `#${form} ${tag.toLowerCase()}[name=${name}]`)
		}
	), { numRuns: 50 })

	fc.assert(fc.property(
		fc.string({ minLength: 1, maxLength: 20 }).filter(s => /^[a-zA-Z]+$/.test(s)),
		(tag) => {
			const result = getSelector({ tag })
			assertEquals(result, tag.toLowerCase())
		}
	), { numRuns: 100 })
})

Deno.test("getSelector integration scenarios", async (t) => {
	await t.step("should handle realistic form scenarios", () => {
		// Login form
		assertEquals(getSelector({ form: "loginForm", name: "username", tag: "input" }), "#loginForm input[name=username]")
		assertEquals(getSelector({ form: "loginForm", name: "password", tag: "input" }), "#loginForm input[name=password]")
		assertEquals(getSelector({ form: "loginForm", id: "submit-btn" }), "#submit-btn")

		// Contact form
		assertEquals(getSelector({ name: "email", tag: "input" }), "input[name=email]")
		assertEquals(getSelector({ name: "message", tag: "textarea" }), "textarea[name=message]")
		assertEquals(getSelector({ name: "country", tag: "select" }), "select[name=country]")
	})

	await t.step("should handle complex selectors", () => {
		assertEquals(getSelector({ selector: "div.container > form#contact input[type=email]" }),
			"div.container > form#contact input[type=email]")
		assertEquals(getSelector({ selector: ".nav-item:nth-child(2) a" }),
			".nav-item:nth-child(2) a")
	})

	await t.step("should handle mixed case tags consistently", () => {
		const testCases = [
			{ tag: "INPUT", expected: "input" },
			{ tag: "Select", expected: "select" },
			{ tag: "TEXTAREA", expected: "textarea" },
			{ tag: "DiV", expected: "div" },
			{ tag: "button", expected: "button" }
		]

		testCases.forEach(({ tag, expected }) => {
			assertEquals(getSelector({ tag }), expected)
		})
	})
})