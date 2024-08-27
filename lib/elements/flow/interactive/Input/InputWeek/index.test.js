// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../../rendering/renderTo"
import { AUTOCOMPLETE } from "../../../../../rendering/constants"
import InputWeek from "./"

test(`[InputWeek] (constructors::flow::interactive::Input) returns a <input type="week">`, () => {
	renderTo(document.body)(InputWeek())()

	const week = document.body.querySelector("input")

	expect(week?.id).toBeDefined()
	expect(week?.type).toEqual("week")

	document.body.innerHTML = ""
})

test(`[InputWeek] (constructors::flow::interactive::Input) returns <input type="button"> element with supplied attributes`, () => {
	renderTo(document.body)(
		InputWeek({
			autocomplete: AUTOCOMPLETE.off,
			form: "formId",
			grizmo: "gribbet",
			id: "id",
			list: "list",
			max: "9",
			min: "3",
			name: "name",
			readOnly: true,
			required: true,
			step: 1,
			value: "week",
		}),
	)()

	expect(document.body.innerHTML).toEqual(
		`<input id="id" autocomplete="off" form="formId" list="list" ` +
			`max="9" min="3" name="name" readonly="" required="" step="1" ` +
			`value="week" type="week">`,
	)

	document.body.innerHTML = ""
})
