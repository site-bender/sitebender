// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../../rendering/renderTo"
import { AUTOCOMPLETE } from "../../../../../rendering/constants"
import InputDate from "./"

test(`[InputDate] (constructors::flow::interactive::Input) returns a <input type="date">`, () => {
	renderTo(document.body)(InputDate())()

	const date = document.body.querySelector("input")

	expect(date?.id).toBeDefined()
	expect(date?.type).toEqual("date")

	document.body.innerHTML = ""
})

test(`[InputDate] (constructors::flow::interactive::Input) returns <input type="date"> element with supplied attributes`, () => {
	renderTo(document.body)(
		InputDate({
			autocomplete: AUTOCOMPLETE.bday,
			form: "formId",
			grizmo: "gribbet",
			id: "id",
			list: "list",
			max: "2100-12-31",
			min: "2001-01-01",
			name: "name",
			readOnly: true,
			required: true,
			step: 1,
			value: "date",
		}),
	)()

	expect(document.body.innerHTML).toEqual(
		`<input id="id" form="formId" list="list" max="2100-12-31" min="2001-01-01" ` +
			`name="name" readonly="" required="" step="1" value="date" type="date">`,
	)

	document.body.innerHTML = ""
})
