// @vitest-environment jsdom

import { expect, test } from "vitest"

import renderTo from "../../../../rendering/renderTo"
import {
	BUTTON_TYPES,
	FORM_METHODS,
	FORM_TARGETS,
	POPOVER_TARGET_ACTIONS,
} from "../../../../rendering/constants"
import { BUTTON_ROLES } from "../../../constants"
import Button from "."

test("[Button] (constructors::flow::interactive) returns a <button> with text content", () => {
	const content = "Checking the content!"

	renderTo(document.body)(Button()(content))()

	const button = document.body.querySelector("button")

	expect(button?.id).toBeDefined()
	expect(button?.innerHTML).toEqual(content)

	document.body.innerHTML = ""
})

test("[Button] (constructors::flow::interactive) returns <button> element with supplied attributes and children", () => {
	renderTo(document.body)(
		Button({
			autofocus: true,
			disabled: true,
			form: "formId",
			formAction: "/",
			formEncType: "plain/text",
			formMethod: FORM_METHODS.post,
			formNoValidate: true,
			formTarget: FORM_TARGETS._blank,
			grizmo: "gribbet",
			id: "id",
			name: "name",
			popoverTarget: "popoverTarget",
			popoverTargetAction: POPOVER_TARGET_ACTIONS.toggle,
			role: BUTTON_ROLES.switch,
			type: BUTTON_TYPES.submit,
			value: "Bob",
		})(),
	)()

	expect(document.body.innerHTML).toEqual(
		`<button id="id" autofocus="" disabled="" form="formId" formaction="/" ` +
			`formenctype="plain/text" formnovalidate="" name="name" popovertarget="popoverTarget" ` +
			`value="Bob"></button>`,
	)

	document.body.innerHTML = ""
})
