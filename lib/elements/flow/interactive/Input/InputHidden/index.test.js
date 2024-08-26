// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../../rendering"
import { AUTOCOMPLETE } from "../../../../../rendering/constants"
import InputHidden from "./"

test(`[InputHidden] (constructors::flow::interactive::Input) returns a <input type="hidden">`, () => {
	render(document.body)(InputHidden())()

	const hidden = document.body.querySelector("input")

	expect(hidden?.id).toBeDefined()
	expect(hidden?.type).toEqual("hidden")

	document.body.innerHTML = ""
})

test(`[InputHidden] (constructors::flow::interactive::Input) returns <input type="hidden"> element with supplied attributes`, () => {
	render(document.body)(
		InputHidden({
			autocomplete: AUTOCOMPLETE.country,
			dirname: "dirname",
			form: "formId",
			grizmo: "gribbet",
			id: "id",
			name: "name",
			value: "hidden",
		}),
	)()

	expect(document.body.innerHTML).toEqual(
		`<input id="id" autocomplete="country" dirname="dirname" form="formId" ` +
			`name="name" value="hidden" type="hidden">`,
	)

	document.body.innerHTML = ""
})
