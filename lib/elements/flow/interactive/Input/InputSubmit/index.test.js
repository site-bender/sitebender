// @vitest-environment jsdom

import { expect, test } from "vitest"

import { POPOVER_TARGET_ACTION } from "../../../../../rendering/constants"
import renderTo from "../../../../../rendering/renderTo"
import InputSubmit from "./"

test(`[InputSubmit] (constructors::flow::interactive::Input) returns a <input type="submit">`, () => {
	renderTo(document.body)(InputSubmit())()

	const submit = document.body.querySelector("input")

	expect(submit?.id).toBeDefined()
	expect(submit?.type).toEqual("submit")

	document.body.innerHTML = ""
})

test(`[InputSubmit] (constructors::flow::interactive::Input) returns <input type="submit"> element with supplied attributes`, () => {
	renderTo(document.body)(
		InputSubmit({
			form: "formId",
			grizmo: "gribbet",
			id: "id",
			popoverTarget: "popoverTarget",
			popoverTargetAction: POPOVER_TARGET_ACTION.show,
			value: "submit",
		}),
	)()

	expect(document.body.innerHTML).toEqual(
		`<input id="id" form="formId" popovertarget="popoverTarget" ` +
			`popovertargetaction="show" value="submit" type="submit">`,
	)

	document.body.innerHTML = ""
})
