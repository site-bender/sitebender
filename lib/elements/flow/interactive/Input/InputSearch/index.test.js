// @vitest-environment jsdom

import { expect, test } from "vitest"

import { AUTOCOMPLETE } from "../../../../../rendering/constants"
import renderTo from "../../../../../rendering/renderTo"
import InputSearch from "./"

test(`[InputSearch] (constructors::flow::interactive::Input) returns a <input type="search">`, () => {
	renderTo(document.body)(InputSearch())()

	const search = document.body.querySelector("input")

	expect(search?.id).toBeDefined()
	expect(search?.type).toEqual("search")

	document.body.innerHTML = ""
})

test(`[InputSearch] (constructors::flow::interactive::Input) returns <input type="search"> element with supplied attributes`, () => {
	renderTo(document.body)(
		InputSearch({
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
			value: "search",
		}),
	)()

	expect(document.body.innerHTML).toEqual(
		`<input id="id" autocomplete="email" dirname="dirname" form="formId" ` +
			`list="list" maxlength="50" minlength="10" name="name" pattern="pattern" ` +
			`placeholder="placeholder" readonly="" required="" size="32" value="search" ` +
			`inputmode="search" type="search">`,
	)

	document.body.innerHTML = ""
})
