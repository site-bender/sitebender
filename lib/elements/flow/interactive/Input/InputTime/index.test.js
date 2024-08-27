// @vitest-environment jsdom

import { expect, test } from "vitest"

import { AUTOCOMPLETE } from "../../../../../rendering/constants"
import renderTo from "../../../../../rendering/renderTo"
import InputTime from "./"

test(`[InputTime] (constructors::flow::interactive::Input) returns a <input type="time">`, () => {
	renderTo(document.body)(InputTime())()

	const time = document.body.querySelector("input")

	expect(time?.id).toBeDefined()
	expect(time?.type).toEqual("time")

	document.body.innerHTML = ""
})

test(`[InputTime] (constructors::flow::interactive::Input) returns <input type="time"> element with supplied attributes`, () => {
	renderTo(document.body)(
		InputTime({
			autocomplete: AUTOCOMPLETE.on,
			form: "formId",
			grizmo: "gribbet",
			id: "id",
			list: "list",
			max: "23:59:59",
			min: "00:00:00",
			name: "name",
			readOnly: true,
			required: true,
			step: 1,
			value: "time",
		}),
	)()

	expect(document.body.innerHTML).toEqual(
		`<input id="id" autocomplete="on" form="formId" list="list" ` +
			`max="23:59:59" min="00:00:00" name="name" readonly="" required="" ` +
			`step="1" value="time" type="time">`,
	)

	document.body.innerHTML = ""
})
