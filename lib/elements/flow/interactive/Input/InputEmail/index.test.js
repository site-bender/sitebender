// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../../rendering/renderTo"
import { AUTOCOMPLETE } from "../../../../../rendering/constants"
import InputEmail from "./"

test(`[InputEmail] (constructors::flow::interactive::Input) returns a <input type="email">`, () => {
	renderTo(document.body)(InputEmail())()

	const email = document.body.querySelector("input")

	expect(email?.id).toBeDefined()
	expect(email?.type).toEqual("email")

	document.body.innerHTML = ""
})

test(`[InputEmail] (constructors::flow::interactive::Input) returns <input type="email"> element with supplied attributes`, () => {
	renderTo(document.body)(
		InputEmail({
			autocomplete: AUTOCOMPLETE.email,
			dirname: "dirname",
			form: "formId",
			grizmo: "gribbet",
			id: "id",
			list: "list",
			maxLength: 50,
			minLength: 10,
			multiple: true,
			name: "name",
			pattern: "pattern",
			placeholder: "placeholder",
			readOnly: true,
			required: true,
			size: 32,
			value: "email",
		}),
	)()

	expect(document.body.innerHTML).toEqual(
		`<input id="id" autocomplete="email" dirname="dirname" form="formId" ` +
			`list="list" maxlength="50" minlength="10" multiple="" name="name" ` +
			`pattern="pattern" placeholder="placeholder" readonly="" required="" ` +
			`size="32" value="email" inputmode="email" type="email">`,
	)

	document.body.innerHTML = ""
})
