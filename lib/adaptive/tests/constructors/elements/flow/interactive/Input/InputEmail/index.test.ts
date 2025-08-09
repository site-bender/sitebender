import { assertEquals } from "@std/assert"

import InputEmail from "../../../../../../../constructors/elements/flow/interactive/Input/InputEmail/index.ts"

Deno.test("InputEmail constructor", async (t) => {
	await t.step("should create an input element with type='email'", () => {
		const result = InputEmail({})
		assertEquals(result.tag, "input")
		assertEquals(result.attributes.type, "email")
		assertEquals(result.children, [])
	})

	await t.step("should accept form attributes", () => {
		const attributes = {
			form: "contactForm",
			name: "email",
			autocomplete: "email",
			required: true,
		}
		const result = InputEmail(attributes)
		assertEquals((result.attributes as any).form, "contactForm")
		assertEquals((result.attributes as any).name, "email")
		assertEquals((result.attributes as any).autocomplete, "email")
		assertEquals((result.attributes as any).required, true)
	})

	await t.step("should accept text input attributes", () => {
		const attributes = {
			minlength: 5,
			maxlength: 254,
			placeholder: "user@example.com",
			readonly: false,
			pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
			size: 30,
		}
		const result = InputEmail(attributes)
		assertEquals((result.attributes as any).minlength, 5)
		assertEquals((result.attributes as any).maxlength, 254)
		assertEquals((result.attributes as any).placeholder, "user@example.com")
		assertEquals((result.attributes as any).readonly, false)
		assertEquals(
			(result.attributes as any).pattern,
			"[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
		)
		assertEquals((result.attributes as any).size, 30)
	})

	await t.step("should accept email-specific attributes", () => {
		const attributes = {
			multiple: true,
			list: "email-suggestions",
		}
		const result = InputEmail(attributes)
		assertEquals((result.attributes as any).multiple, true)
		assertEquals((result.attributes as any).list, "email-suggestions")
	})

	await t.step("should accept global attributes", () => {
		const attributes = {
			id: "email-input",
			class: "form-control",
			tabindex: "0",
		}
		const result = InputEmail(attributes)
		assertEquals((result.attributes as any).id, "email-input")
		assertEquals((result.attributes as any).class, "form-control")
		assertEquals((result.attributes as any).tabindex, "0")
	})

	await t.step("should filter out invalid attributes", () => {
		const attributes = {
			name: "email",
			invalidattr: "should be removed",
			checked: true, // invalid for email input
		} as any
		const result = InputEmail(attributes)
		assertEquals((result.attributes as any).name, "email")
		assertEquals((result.attributes as any).invalidattr, undefined)
		assertEquals((result.attributes as any).checked, undefined)
	})

	await t.step("should handle value attribute", () => {
		const attributes = { value: "user@example.com" }
		const result = InputEmail(attributes)
		assertEquals((result.attributes as any).value, "user@example.com")
	})

	await t.step("should handle dirname attribute", () => {
		const attributes = {
			name: "email",
			dirname: "email.dir",
		}
		const result = InputEmail(attributes)
		assertEquals((result.attributes as any).dirname, "email.dir")
	})

	await t.step(
		"should maintain type='email' even if type attribute provided",
		() => {
			const attributes = { type: "text" } as any
			const result = InputEmail(attributes)
			assertEquals(result.attributes.type, "email")
		},
	)

	await t.step("should handle special properties", () => {
		const attributes = {
			name: "email",
			calculation: "emailCalc",
			dataset: { validation: "strict" },
			display: "block",
			scripts: ["email-validator.js"],
			stylesheets: ["email.css"],
		}
		const result = InputEmail(attributes)
		assertEquals((result as any).calculation, "emailCalc")
		assertEquals((result as any).dataset, { validation: "strict" })
		assertEquals((result as any).display, "block")
		assertEquals((result as any).scripts, ["email-validator.js"])
		assertEquals((result as any).stylesheets, ["email.css"])
	})
})
