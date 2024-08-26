// @vitest-environment jsdom

import { expect, test } from "vitest"

import render from "../../../../../rendering"
import {
	FORM_METHOD,
	FORM_TARGET,
	POPOVER_TARGET_ACTION,
} from "../../../../../rendering/constants"
import InputImage from "./"

test(`[InputImage] (constructors::flow::interactive::Input) returns a <input type="image">`, () => {
	render(document.body)(InputImage())()

	const image = document.body.querySelector("input")

	expect(image?.id).toBeDefined()
	expect(image?.type).toEqual("image")

	document.body.innerHTML = ""
})

test(`[InputImage] (constructors::flow::interactive::Input) returns <input type="image"> element with supplied attributes`, () => {
	render(document.body)(
		InputImage({
			alt: "alt",
			form: "formId",
			formAction: "/",
			formEncType: "application/json",
			formMethod: FORM_METHOD.get,
			formNoValidate: true,
			formTarget: FORM_TARGET._self,
			grizmo: "gribbet",
			height: 20,
			id: "id",
			name: "name",
			popoverTarget: "popoverTarget",
			popoverTargetAction: POPOVER_TARGET_ACTION.show,
			src: "src",
			value: "image",
			width: 40,
		}),
	)()

	expect(document.body.innerHTML).toEqual(
		`<input id="id" alt="alt" form="formId" formaction="/" formenctype="application/json" ` +
			`formmethod="GET" formnovalidate="" formtarget="_self" height="20" name="name" ` +
			`popovertarget="popoverTarget" popovertargetaction="show" src="src" value="image" ` +
			`width="40" type="image">`,
	)

	document.body.innerHTML = ""
})
