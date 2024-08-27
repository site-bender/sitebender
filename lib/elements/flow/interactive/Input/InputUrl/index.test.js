// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../../rendering/renderTo"
import { AUTOCOMPLETE } from "../../../../../rendering/constants"
import InputUrl from "./"

test(`[InputUrl] (constructors::flow::interactive::Input) returns a <input type="url">`, () => {
	renderTo(document.body)(InputUrl())()

	const url = document.body.querySelector("input")

	expect(url?.id).toBeDefined()
	expect(url?.type).toEqual("url")

	document.body.innerHTML = ""
})

test(`[InputUrl] (constructors::flow::interactive::Input) returns <input type="url"> element with supplied attributes`, () => {
	renderTo(document.body)(
		InputUrl({
			autocomplete: AUTOCOMPLETE.uRL,
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
			value: "url",
		}),
	)()

	expect(document.body.innerHTML).toEqual(
		`<input id="id" autocomplete="url" dirname="dirname" form="formId" ` +
			`list="list" maxlength="50" minlength="10" name="name" pattern="pattern" ` +
			`placeholder="placeholder" readonly="" required="" size="32" value="url" ` +
			`inputmode="url" type="url">`,
	)

	document.body.innerHTML = ""
})
