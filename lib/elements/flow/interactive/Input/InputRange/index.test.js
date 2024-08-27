// @vitest-environment jsdom

import { expect, test } from "vitest"

import { AUTOCOMPLETE } from "../../../../../rendering/constants"
import renderTo from "../../../../../rendering/renderTo"
import InputRange from "./"

test(`[InputRange] (constructors::flow::interactive::Input) returns a <input type="range">`, () => {
	renderTo(document.body)(InputRange())()

	const range = document.body.querySelector("input")

	expect(range?.id).toBeDefined()
	expect(range?.type).toEqual("range")

	document.body.innerHTML = ""
})

test(`[InputRange] (constructors::flow::interactive::Input) returns <input type="range"> element with supplied attributes`, () => {
	renderTo(document.body)(
		InputRange({
			autocomplete: AUTOCOMPLETE.creditCardType,
			form: "formId",
			grizmo: "gribbet",
			id: "id",
			list: "list",
			max: 100,
			min: 0,
			name: "name",
			step: 0.5,
			value: "range",
		}),
	)()

	expect(document.body.innerHTML).toEqual(
		`<input id="id" autocomplete="cc-type" form="formId" list="list" ` +
			`max="100" min="0" name="name" step="0.5" value="range" type="range">`,
	)

	document.body.innerHTML = ""
})
