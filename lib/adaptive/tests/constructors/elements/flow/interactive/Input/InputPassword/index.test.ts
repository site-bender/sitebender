import { assertEquals } from "@std/assert"

import InputPassword from "../../../../../../../constructors/elements/flow/interactive/Input/InputPassword/index.ts"

Deno.test("InputPassword constructor", async (t) => {
	await t.step("should create an input element with type='password'", () => {
		const result = InputPassword({})
		assertEquals(result.tag, "input")
		assertEquals(result.attributes.type, "password")
		assertEquals(result.children, [])
	})

	await t.step("should accept form attributes", () => {
		const attributes = {
			form: "loginForm",
			name: "password",
			autocomplete: "current-password",
			required: true,
		}
		const result = InputPassword(attributes)
		assertEquals((result.attributes as any).form, "loginForm")
		assertEquals((result.attributes as any).name, "password")
		assertEquals((result.attributes as any).autocomplete, "current-password")
		assertEquals((result.attributes as any).required, true)
	})

	await t.step("should accept text input attributes", () => {
		const attributes = {
			minlength: 8,
			maxlength: 128,
			placeholder: "Enter your password",
			readonly: false,
			pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,}$",
			size: 20,
		}
		const result = InputPassword(attributes)
		assertEquals((result.attributes as any).minlength, 8)
		assertEquals((result.attributes as any).maxlength, 128)
		assertEquals((result.attributes as any).placeholder, "Enter your password")
		assertEquals((result.attributes as any).readonly, false)
		assertEquals(
			(result.attributes as any).pattern,
			"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,}$",
		)
		assertEquals((result.attributes as any).size, 20)
	})

	await t.step("should accept global attributes", () => {
		const attributes = {
			id: "password-input",
			class: "form-control secure",
			tabindex: "0",
		}
		const result = InputPassword(attributes)
		assertEquals((result.attributes as any).id, "password-input")
		assertEquals((result.attributes as any).class, "form-control secure")
		assertEquals((result.attributes as any).tabindex, "0")
	})

	await t.step("should filter out invalid attributes", () => {
		const attributes = {
			name: "password",
			invalidattr: "should be removed",
			checked: true, // invalid for password input
			multiple: true, // invalid for password input
		} as any
		const result = InputPassword(attributes)
		assertEquals((result.attributes as any).name, "password")
		assertEquals((result.attributes as any).invalidattr, undefined)
		assertEquals((result.attributes as any).checked, undefined)
		assertEquals((result.attributes as any).multiple, undefined)
	})

	await t.step("should handle value attribute", () => {
		const attributes = { value: "secret123" }
		const result = InputPassword(attributes)
		assertEquals((result.attributes as any).value, "secret123")
	})

	await t.step("should handle dirname attribute", () => {
		const attributes = {
			name: "password",
			dirname: "password.dir",
		}
		const result = InputPassword(attributes)
		assertEquals((result.attributes as any).dirname, "password.dir")
	})

	await t.step(
		"should maintain type='password' even if type attribute provided",
		() => {
			const attributes = { type: "text" } as any
			const result = InputPassword(attributes)
			assertEquals(result.attributes.type, "password")
		},
	)

	await t.step("should handle special properties", () => {
		const attributes = {
			name: "password",
			calculation: "passwordCalc",
			dataset: { security: "high" },
			display: "block",
			scripts: ["security.js"],
			stylesheets: ["password.css"],
		}
		const result = InputPassword(attributes)
		assertEquals((result as any).calculation, "passwordCalc")
		assertEquals((result as any).dataset, { security: "high" })
		assertEquals((result as any).display, "block")
		assertEquals((result as any).scripts, ["security.js"])
		assertEquals((result as any).stylesheets, ["password.css"])
	})
})
