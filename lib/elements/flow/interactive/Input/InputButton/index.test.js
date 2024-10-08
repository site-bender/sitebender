// @vitest-environment jsdom

import { expect, test } from "vitest"

import { POPOVER_TARGET_ACTION } from "../../../../../rendering/constants"
import renderTo from "../../../../../rendering/renderTo"
import InputButton from "./"

test(`[InputButton] (constructors::flow::interactive::Input) returns a <input type="button">`, () => {
	renderTo(document.body)(InputButton())()

	const button = document.body.querySelector("input")

	expect(button?.id).toBeDefined()
	expect(button?.type).toEqual("button")

	document.body.innerHTML = ""
})

test(`[InputButton] (constructors::flow::interactive::Input) returns <input type="button"> element with supplied attributes`, () => {
	renderTo(document.body)(
		InputButton({
			form: "formId",
			grizmo: "gribbet",
			id: "id",
			popoverTarget: "popoverTarget",
			popoverTargetAction: POPOVER_TARGET_ACTION.show,
			value: "button",
		}),
	)()

	expect(document.body.innerHTML).toEqual(
		`<input id="id" form="formId" popovertarget="popoverTarget" ` +
			`popovertargetaction="show" value="button" type="button">`,
	)

	document.body.innerHTML = ""
})
