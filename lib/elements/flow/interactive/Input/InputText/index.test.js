// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../../rendering"
import { AUTOCOMPLETE } from "../../../../../rendering/constants"
import InputText from "./"

test(`[InputText] (constructors::flow::interactive::Input) returns a <input type="text">`, () => {
	render(document.body)(InputText())()

	const text = document.body.querySelector("input")

	expect(text?.id).toBeDefined()
	expect(text?.type).toEqual("text")

	document.body.innerHTML = ""
})

test(`[InputText] (constructors::flow::interactive::Input) returns <input type="text"> element with supplied attributes`, () => {
	render(document.body)(
		InputText({
			autocomplete: AUTOCOMPLETE.additionalName,
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
			value: "text",
		}),
	)()

	expect(document.body.innerHTML).toEqual(
		`<input id="id" autocomplete="additional-name" dirname="dirname" ` +
			`form="formId" list="list" maxlength="50" minlength="10" name="name" ` +
			`pattern="pattern" placeholder="placeholder" readonly="" required="" ` +
			`size="32" value="text" type="text">`,
	)

	document.body.innerHTML = ""
})
