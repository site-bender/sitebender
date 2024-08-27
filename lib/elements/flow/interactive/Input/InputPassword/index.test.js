// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../../rendering/renderTo"
import { AUTOCOMPLETE } from "../../../../../rendering/constants"
import InputPassword from "./"

test(`[InputPassword] (constructors::flow::interactive::Input) returns a <input type="password">`, () => {
	renderTo(document.body)(InputPassword())()

	const password = document.body.querySelector("input")

	expect(password?.id).toBeDefined()
	expect(password?.type).toEqual("password")

	document.body.innerHTML = ""
})

test(`[InputPassword] (constructors::flow::interactive::Input) returns <input type="password"> element with supplied attributes`, () => {
	renderTo(document.body)(
		InputPassword({
			autocomplete: AUTOCOMPLETE.newPassword,
			dirname: "dirname",
			form: "formId",
			grizmo: "gribbet",
			id: "id",
			maxLength: 48,
			minLength: 16,
			name: "name",
			pattern: "pattern",
			placeholder: "placeholder",
			readOnly: true,
			required: true,
			size: 32,
			value: "password",
		}),
	)()

	expect(document.body.innerHTML).toEqual(
		`<input id="id" autocomplete="new-password" dirname="dirname" ` +
			`form="formId" maxlength="48" minlength="16" name="name" pattern="pattern" ` +
			`placeholder="placeholder" readonly="" required="" size="32" ` +
			`value="password" type="password">`,
	)

	document.body.innerHTML = ""
})
