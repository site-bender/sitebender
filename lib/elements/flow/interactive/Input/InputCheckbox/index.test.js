// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../../rendering/renderTo"
import InputCheckbox from "./"

test(`[InputCheckbox] (constructors::flow::interactive::Input) returns a <input type="checkbox">`, () => {
	renderTo(document.body)(InputCheckbox())()

	const checkbox = document.body.querySelector("input")

	expect(checkbox?.id).toBeDefined()
	expect(checkbox?.type).toEqual("checkbox")

	document.body.innerHTML = ""
})

test(`[InputCheckbox] (constructors::flow::interactive::Input) returns <input type="checkbox"> element with supplied attributes`, () => {
	renderTo(document.body)(
		InputCheckbox({
			checked: true,
			form: "formId",
			grizmo: "gribbet",
			id: "id",
			name: "name",
			required: true,
			value: "checkbox",
		}),
	)()

	expect(document.body.innerHTML).toEqual(
		`<input id="id" checked="" form="formId" name="name" required="" value="checkbox" type="checkbox">`,
	)

	document.body.innerHTML = ""
})
