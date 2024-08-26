// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../../rendering"
import { POPOVER_TARGET_ACTION } from "../../../../../rendering/constants"
import InputReset from "./"

test(`[InputReset] (constructors::flow::interactive::Input) returns a <input type="reset">`, () => {
	render(document.body)(InputReset())()

	const reset = document.body.querySelector("input")

	expect(reset?.id).toBeDefined()
	expect(reset?.type).toEqual("reset")

	document.body.innerHTML = ""
})

test(`[InputReset] (constructors::flow::interactive::Input) returns <input type="reset"> element with supplied attributes`, () => {
	render(document.body)(
		InputReset({
			form: "formId",
			grizmo: "gribbet",
			id: "id",
			popoverTarget: "popoverTarget",
			popoverTargetAction: POPOVER_TARGET_ACTION.show,
			value: "reset",
		}),
	)()

	expect(document.body.innerHTML).toEqual(
		`<input id="id" form="formId" popovertarget="popoverTarget" ` +
			`popovertargetaction="show" value="reset" type="reset">`,
	)

	document.body.innerHTML = ""
})