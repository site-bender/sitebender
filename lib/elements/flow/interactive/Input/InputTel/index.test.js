// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../../rendering/renderTo"
import { AUTOCOMPLETE } from "../../../../../rendering/constants"
import InputTel from "./"

test(`[InputTel] (constructors::flow::interactive::Input) returns a <input type="tel">`, () => {
	renderTo(document.body)(InputTel())()

	const tel = document.body.querySelector("input")

	expect(tel?.id).toBeDefined()
	expect(tel?.type).toEqual("tel")

	document.body.innerHTML = ""
})

test(`[InputTel] (constructors::flow::interactive::Input) returns <input type="tel"> element with supplied attributes`, () => {
	renderTo(document.body)(
		InputTel({
			autocomplete: AUTOCOMPLETE.email,
			dirname: "dirname",
			form: "formId",
			grizmo: "gribbet",
			id: "id",
			list: "list",
			maxLength: 50,
			minLength: 10,
			name: "name",
			pattern: "pattern",
			placeholder: "placeholder",
			readOnly: true,
			required: true,
			size: 32,
			value: "tel",
		}),
	)()

	expect(document.body.innerHTML).toEqual(
		`<input id="id" autocomplete="email" dirname="dirname" form="formId" ` +
			`list="list" maxlength="50" minlength="10" name="name" pattern="pattern" ` +
			`placeholder="placeholder" readonly="" required="" size="32" value="tel" ` +
			`inputmode="tel" type="tel">`,
	)

	document.body.innerHTML = ""
})
